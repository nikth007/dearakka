import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Animated, Easing, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import { predict } from '../utils/prediction';
import { getCyclePhase, currentCycleDay, formatDateDisplay, toDateStr, addDays, fromDateStr } from '../utils/cycleCalc';
import NaadhiArc, { MiniPetal } from '../components/NaadhiArc';
import Akka from '../components/Akka';

const { width: SW } = Dimensions.get('window');
const ARC_W = Math.min(SW, 430);

// Phase-aware content
const PHASE_INSIGHT = {
  menstrual: {
    en: { title: 'Rest is productive', body: "Your body is doing deep work right now. Iron-rich foods, warmth, and gentle movement are your best medicine today." },
    ta: { title: 'ஓய்வு உற்பத்தியானது', body: "உங்கள் உடல் இப்போது ஆழமான வேலை செய்கிறது. இரும்புச்சத்து நிறைந்த உணவும் சிறு இயக்கமும் உதவும்." },
  },
  follicular: {
    en: { title: 'Energy is rising', body: "Oestrogen is climbing and your mind is sharpening. A great time to start something new, have brave conversations, or dive into creative work." },
    ta: { title: 'ஆற்றல் உயர்கிறது', body: "ஈஸ்ட்ரோஜன் அதிகரிக்கிறது, மனம் கூர்மையாகிறது. புதிதாக ஏதாவது தொடங்க இது சரியான நேரம்." },
  },
  ovulation: {
    en: { title: 'You are in full bloom', body: "Peak energy, peak confidence. Your communication is at its clearest. Connect, create, lead — your body is at its most radiant." },
    ta: { title: 'நீங்கள் முழு மலர்ச்சியில்', body: "உச்ச ஆற்றல், உச்ச நம்பிக்கை. உங்கள் உடல் மிகவும் பிரகாசமாக உள்ளது." },
  },
  luteal: {
    en: { title: 'Turn inward gently', body: "Progesterone is rising. Cravings and emotions may feel bigger — that is your nervous system asking for care, not weakness." },
    ta: { title: 'மெதுவாக உள்நோக்கி திரும்புங்கள்', body: "ப்ரோஜெஸ்டீரோன் அதிகரிக்கிறது. உணர்ச்சிகள் கொஞ்சம் அதிகமாக இருக்கலாம் — இது பலவீனம் அல்ல." },
  },
  none: {
    en: { title: 'Log your first period', body: "Once you log your first period start date, Dear Akka will start learning your unique rhythm and give you personalised insights." },
    ta: { title: 'உங்கள் முதல் மாதவிடாயை பதிவு செய்யுங்கள்', body: "உங்கள் சுழற்சியை பதிவு செய்தால், Dear Akka உங்கள் தனித்துவமான தாளத்தை கற்றுக்கொள்ளும்." },
  },
};

const GREETINGS = {
  morning: {
    en: ['Good morning 🌿', 'Rise gently today 🌅', 'A fresh day begins 🌱'],
    ta: ['காலை வணக்கம் 🌿', 'நல்ல காலை 🌅'],
  },
  afternoon: {
    en: ['Good afternoon 🌤', 'Checking in with you 🫶', 'How is your day going? 🌸'],
    ta: ['மதிய வணக்கம் 🌤'],
  },
  evening: {
    en: ['Good evening 🌙', 'Winding down? ✨', 'Evening check-in 💛'],
    ta: ['மாலை வணக்கம் 🌙', 'நல்ல இரவு ✨'],
  },
};

const AFFIRMATIONS = {
  en: [
    "Your rhythm knows the way. Trust it. 💛",
    "Every cycle is a chance to know yourself better. 🌿",
    "You are not behind your schedule — you are on your rhythm. 🌸",
    "Rest is not laziness. It is how your body heals. 💛",
  ],
  ta: [
    "உங்கள் தாளம் வழி அறியும். நம்புங்கள். 💛",
    "ஒவ்வொரு சுழற்சியும் உங்களை அறியும் வாய்ப்பு. 🌿",
  ],
};

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function pick(arr) { return arr[Math.floor(Date.now() / 86400000) % arr.length]; }

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cycleData, dailyLogs, lang, user } = useApp();
  const l = lang || 'en';

  const cycleDay = currentCycleDay(cycleData.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData.cycleLength) : 'none';
  const pc = phaseColors(phase);

  const prediction = useMemo(() =>
    predict(cycleData.lastPeriodStart, cycleData.periodDates, 5, cycleData.periodLengths),
    [cycleData]
  );

  const insight = (PHASE_INSIGHT[phase] || PHASE_INSIGHT.none)[l] || PHASE_INSIGHT[phase]?.en || PHASE_INSIGHT.none.en;
  const tod = timeOfDay();
  const greetArr = (GREETINGS[tod] || GREETINGS.morning)[l] || GREETINGS[tod]?.en || GREETINGS.morning.en;
  const greetBase = pick(greetArr);
  const greeting = user?.name ? greetBase.replace(/[🌿🌅🌱🌤🫶🌸🌙✨💛]/u, '').trim() + `, ${user.name} ` + greetBase.match(/[🌿🌅🌱🌤🫶🌸🌙✨💛]/u)?.[0] : greetBase;
  const affirmation = pick((AFFIRMATIONS[l] || AFFIRMATIONS.en));

  // Week-ahead days
  const weekAhead = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = toDateStr(d);
      const cd = cycleDay ? cycleDay + i : null;
      const p = cd ? getCyclePhase(cd, cycleData.cycleLength) : 'none';
      return { d, dateStr, cycleDay: cd, phase: p };
    });
  }, [cycleDay, cycleData.cycleLength]);

  const dayNames = l === 'ta'
    ? ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 130 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* ── Greeting strip ─────────────────────────────── */}
          <View style={styles.greetingRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}
              accessibilityLabel="Open profile and settings"
            >
              <Akka phase={phase} size={48} showPetal />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={T.h4}>{greeting}</Text>
              <Text style={[T.bodySmall, { marginTop: 2, fontStyle: 'italic', color: pc.accent }]}>
                {phase !== 'none' ? `${l === 'ta' ? 'நாள்' : 'Day'} ${cycleDay} · ${phase.charAt(0).toUpperCase() + phase.slice(1)}` : (l === 'ta' ? 'உங்கள் சுழற்சியை தொடங்குங்கள்' : 'Start tracking your cycle')}
              </Text>
            </View>
          </View>

          {/* ── Naadhi Arc hero ─────────────────────────────── */}
          <View style={styles.arcCard}>
            <NaadhiArc
              cycleDay={cycleDay || 1}
              cycleLength={cycleData.cycleLength || 28}
              phase={phase}
              width={ARC_W - 32}
              showLabels
            />
            {/* Phase info pill */}
            {prediction && (
              <View style={[styles.phasePill, { backgroundColor: pc.soft, borderColor: pc.accent }]}>
                <Text style={[styles.phasePillText, { color: pc.accent }]}>
                  {l === 'ta'
                    ? `அடுத்த மாதவிடாய் ${prediction.daysUntilNext} நாட்களில்`
                    : `Next period in ${prediction.daysUntilNext} day${prediction.daysUntilNext !== 1 ? 's' : ''}`}
                </Text>
              </View>
            )}
          </View>

          {/* ── Today insight card ──────────────────────────── */}
          <LinearGradient
            colors={[pc.soft, 'transparent']}
            style={styles.insightCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <View style={[styles.insightAccent, { backgroundColor: pc.accent }]} />
            <View style={{ flex: 1, paddingLeft: 14 }}>
              <Text style={[T.h4, { color: pc.accent, marginBottom: 4 }]}>{insight.title}</Text>
              <Text style={[T.bodySmall, { color: C.textSecondary, lineHeight: 20 }]}>{insight.body}</Text>
            </View>
          </LinearGradient>

          {/* ── Log today CTA ───────────────────────────────── */}
          <TouchableOpacity
            style={[styles.logCTA, { borderColor: pc.accent }]}
            onPress={() => navigation.navigate('Track')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[pc.accent, pc.deep]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              borderRadius={20}
            />
            <MiniPetal phase={phase} size={28} />
            <View style={{ marginLeft: 14 }}>
              <Text style={[T.h3, { color: C.white }]}>
                {l === 'ta' ? 'இன்று எப்படி இருக்கிறீர்கள்?' : 'How are you today?'}
              </Text>
              <Text style={[T.label, { color: 'rgba(255,255,255,0.75)', marginTop: 2 }]}>
                {l === 'ta' ? 'பதிவு செய்யுங்கள்' : 'Log flow, mood & symptoms'}
              </Text>
            </View>
            <Text style={{ color: C.white, fontSize: 20, marginLeft: 'auto' }}>→</Text>
          </TouchableOpacity>

          {/* ── Week ahead ─────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={[T.h4, { marginBottom: 12 }]}>
              {l === 'ta' ? 'அடுத்த வாரம்' : 'Week ahead'}
            </Text>
            <View style={styles.weekRow}>
              {weekAhead.map((day, i) => {
                const dayPc = phaseColors(day.phase);
                const isToday = i === 0;
                return (
                  <View key={day.dateStr} style={[styles.weekDay, isToday && { backgroundColor: dayPc.soft, borderRadius: 14 }]}>
                    <Text style={[styles.weekDayName, { color: isToday ? dayPc.accent : C.textSecondary }]}>
                      {dayNames[day.d.getDay()]}
                    </Text>
                    <MiniPetal phase={day.phase} size={22} />
                    <Text style={[styles.weekDayNum, { color: isToday ? dayPc.accent : C.textHint }]}>
                      {day.d.getDate()}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ── Prediction detail ──────────────────────────── */}
          {prediction && (
            <View style={styles.predictionRow}>
              {[
                { label: l === 'ta' ? 'அண்டவிடுப்பு' : 'Ovulation', date: prediction.ovulationDate, color: C.ovulation },
                { label: l === 'ta' ? 'PMS' : 'PMS starts', date: prediction.pmsStart, color: C.luteal },
                { label: l === 'ta' ? 'மாதவிடாய்' : 'Next period', date: prediction.nextPeriodDate, color: C.menstrual },
              ].map(item => (
                <View key={item.label} style={[styles.predCard, { borderTopColor: item.color }]}>
                  <Text style={[styles.predDate, { color: item.color }]}>{formatDateDisplay(item.date, l)}</Text>
                  <Text style={styles.predLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ── Akka's affirmation ─────────────────────────── */}
          <View style={styles.affirmation}>
            <Akka phase={phase} size={32} animated={false} />
            <Text style={[T.bodySmall, { flex: 1, marginLeft: 10, fontStyle: 'italic', color: C.textSecondary }]}>
              {affirmation}
            </Text>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16 },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  arcCard: {
    backgroundColor: C.bgMid,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  phasePill: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  phasePillText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.2,
  },

  insightCard: {
    flexDirection: 'row',
    backgroundColor: C.bgMid,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  insightAccent: {
    width: 4,
    borderRadius: 2,
    alignSelf: 'stretch',
    minHeight: 40,
  },

  logCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    minHeight: 72,
  },

  section: { marginBottom: 20 },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    alignItems: 'center',
    padding: 6,
    flex: 1,
  },
  weekDayName: {
    fontSize: 10,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  weekDayNum: {
    fontSize: 10,
    fontFamily: 'Inter',
    marginTop: 2,
  },

  predictionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  predCard: {
    flex: 1,
    backgroundColor: C.bgMid,
    borderRadius: 14,
    padding: 12,
    borderTopWidth: 3,
  },
  predDate: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 15,
  },
  predLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: C.textSecondary,
    marginTop: 2,
  },

  affirmation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgMid,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
});
