import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable,
  Linking, StatusBar, Image, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useApp, useLang } from '../../context/AppContext';
import { t } from '../../data/strings';
import { Colors, Gradients, Typography, Shadow, Spacing, Radius } from '../../theme';
import { CYCLE_PHASES, DAILY_TIPS } from '../../data/selfCareContent';
import { getGreeting, formatDateDisplay } from '../../utils/cycleCalc';
import { getStreak, getLastBreastExam, getDailyLog } from '../../utils/storage';
import { toDateStr, today } from '../../utils/cycleCalc';
import GradientCard from '../../components/common/GradientCard';

const WHATSAPP_NUMBER = '+919003579070'; // Placeholder — update with Bitvoice WA number

export default function HomeScreen({ navigation }) {
  const { state } = useApp();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const [streak, setStreak] = useState(0);
  const [lastExam, setLastExam] = useState(null);
  const [todayLogged, setTodayLogged] = useState(false);
  const [tip, setTip] = useState('');

  useFocusEffect(useCallback(() => {
    async function load() {
      const [s, exam, log] = await Promise.all([
        getStreak(),
        getLastBreastExam(),
        getDailyLog(toDateStr(today())),
      ]);
      setStreak(s);
      setLastExam(exam);
      setTodayLogged(!!log);
      setTip(DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)]);
    }
    load();
  }, []));

  const { cycleInfo, profile, assessments } = state;
  const phase = cycleInfo ? CYCLE_PHASES[cycleInfo.phase] : null;
  const greeting = getGreeting(lang);
  const name = profile?.name || '';

  function openWhatsApp() {
    const url = `whatsapp://send?phone=${WHATSAPP_NUMBER}`;
    Linking.canOpenURL(url).then(can => {
      if (can) Linking.openURL(url);
      else Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`);
    });
  }

  function openSMFWebsite() {
    Linking.openURL('https://smf.in/');
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.tealDark} />

      {/* Gradient header */}
      <LinearGradient
        colors={Gradients.primary}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.name} numberOfLines={1}>{name || 'there'} 🌸</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Profile')} style={styles.avatarBtn}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩‍⚕️</Text>
            </View>
          </Pressable>
        </View>
        {/* Streak pill */}
        {streak > 0 && (
          <View style={styles.streakPill}>
            <MaterialCommunityIcons name="fire" size={14} color={Colors.gold} />
            <Text style={styles.streakText}>{streak} {t('streakDays', lang)}</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Cycle Widget */}
        {cycleInfo && phase ? (
          <Pressable onPress={() => navigation.navigate('Track')} activeOpacity={0.9}>
            <LinearGradient colors={phase.gradient} style={styles.cycleCard}>
              <View style={styles.cycleTop}>
                <View>
                  <Text style={[styles.cycleEmoji]}>{phase.emoji}</Text>
                  <Text style={[styles.cyclePhaseName, { color: phase.color }]}>{phase.name[lang] || phase.name.en}</Text>
                </View>
                <View style={styles.cycleDayBadge}>
                  <Text style={styles.cycleDayNum}>{cycleInfo.dayOfCycle}</Text>
                  <Text style={styles.cycleDayLabel}>{t('cycleDay', lang)}</Text>
                </View>
              </View>
              <Text style={styles.cycleDesc} numberOfLines={2}>
                {phase.akkaMessage[lang] || phase.akkaMessage.en}
              </Text>
              {cycleInfo.daysUntilNext > 0 && (
                <View style={styles.nextPeriodRow}>
                  <MaterialCommunityIcons name="calendar-clock" size={14} color={Colors.textSecondary} />
                  <Text style={styles.nextPeriodText}>
                    {t('nextPeriod', lang)} {cycleInfo.daysUntilNext} {t('days', lang)}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.navigate('Track')}>
            <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.cycleCard}>
              <View style={styles.noCycleInner}>
                <MaterialCommunityIcons name="calendar-plus" size={32} color={Colors.teal} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.noCycleTitle}>Set up your cycle tracker</Text>
                  <Text style={styles.noCycleSub}>Tap to add your last period date</Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        )}

        {/* Quick check-in */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>{t('quickCheckin', lang)}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Track')}
          style={[styles.checkinCard, todayLogged && styles.checkinDone]}
        >
          <MaterialCommunityIcons
            name={todayLogged ? 'check-circle' : 'plus-circle-outline'}
            size={22}
            color={todayLogged ? Colors.green : Colors.teal}
          />
          <Text style={[styles.checkinText, todayLogged && { color: Colors.green }]}>
            {todayLogged
              ? (lang === 'ta' ? 'இன்று பதிவு செய்தீர்கள்! 💗' : 'Today\'s log done! 💗')
              : t('logToday', lang)}
          </Text>
          {!todayLogged && <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />}
        </Pressable>

        {/* Breast exam reminder */}
        <Pressable onPress={() => navigation.navigate('BreastExam')} style={{ marginHorizontal: Spacing.base }}>
          <LinearGradient colors={['#FCE7F3', '#FFF0F5']} style={styles.examCard}>
            <View style={styles.examLeft}>
              <Text style={styles.examEmoji}>🎗️</Text>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.examTitle}>{t('breastExam', lang)}</Text>
                <Text style={styles.examSub}>
                  {lastExam
                    ? (lang === 'ta' ? `கடைசியாக: ${formatDateDisplay(lastExam.date, lang)}` : `Last done: ${formatDateDisplay(lastExam.date, lang)}`)
                    : t('neverDone', lang)}
                </Text>
              </View>
            </View>
            <View style={[styles.examBadge, { backgroundColor: Colors.pinkLight }]}>
              <Text style={[styles.examBadgeText, { color: Colors.pinkDark }]}>
                {lang === 'ta' ? 'வழிகாட்டி' : 'Guide'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Today's tip */}
        {tip ? (
          <>
            <View style={[styles.sectionRow, { marginTop: Spacing.lg }]}>
              <Text style={styles.sectionTitle}>{t('todaysTip', lang)}</Text>
            </View>
            <GradientCard colors={['#F0FDFA', '#CCFBF1']} style={{ marginHorizontal: Spacing.base }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <MaterialCommunityIcons name="lightbulb-on" size={20} color={Colors.teal} style={{ marginTop: 1 }} />
                <Text style={[styles.tipText, { marginLeft: 8 }]}>{lang === 'ta' ? tip.ta : tip.en}</Text>
              </View>
            </GradientCard>
          </>
        ) : null}

        {/* Recent assessments */}
        {assessments.length > 0 && (
          <>
            <View style={[styles.sectionRow, { marginTop: Spacing.lg }]}>
              <Text style={styles.sectionTitle}>{t('assessments', lang)}</Text>
              <Pressable onPress={() => navigation.navigate('Learn')} hitSlop={8}>
                <Text style={styles.seeAll}>{lang === 'ta' ? 'எல்லாம்' : 'See all'}</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: Spacing.base, gap: 10 }}>
              {assessments.slice(0, 4).map(a => (
                <Pressable key={a.conditionId} onPress={() => navigation.navigate('ConditionDetail', { conditionId: a.conditionId })}>
                  <View style={styles.assessmentChip}>
                    <Text style={styles.assessmentEmoji}>{getConditionEmoji(a.conditionId)}</Text>
                    <Text style={styles.assessmentLabel}>{getConditionName(a.conditionId, lang)}</Text>
                    <View style={[styles.assessmentDot, { backgroundColor: a.result?.color || Colors.green }]} />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        {/* Chat with Akka CTA */}
        <View style={[styles.sectionRow, { marginTop: Spacing.xl }]}>
          <Text style={styles.sectionTitle}>{lang === 'ta' ? 'WhatsApp அக்கா' : 'WhatsApp Akka'}</Text>
        </View>
        <Pressable onPress={openWhatsApp} style={{ marginHorizontal: Spacing.base }}>
          <LinearGradient colors={['#DCF8C6', '#F0FFF0']} style={styles.whatsappCard}>
            <View style={styles.whatsappLeft}>
              <View style={styles.whatsappIcon}>
                <MaterialCommunityIcons name="whatsapp" size={28} color="#25D366" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.whatsappTitle}>{t('chatWithAkka', lang)}</Text>
                <Text style={styles.whatsappSub}>{t('chatWithAkkaSub', lang)}</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textSecondary} />
          </LinearGradient>
        </Pressable>

        {/* SMF link */}
        <Pressable onPress={openSMFWebsite} style={styles.smfLink}>
          <MaterialCommunityIcons name="web" size={14} color={Colors.teal} />
          <Text style={styles.smfLinkText}>smf.in</Text>
          <MaterialCommunityIcons name="open-in-new" size={12} color={Colors.teal} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function getConditionEmoji(id) {
  const map = { pcos: '🔄', breast: '🎗️', uti: '💧', ovarian: '🌸', menopause: '🌺', thyroid: '🦋', cervical: '🎀' };
  return map[id] || '❤️';
}
function getConditionName(id, lang) {
  const map = {
    pcos: { en: 'PCOS', ta: 'PCOS' },
    breast: { en: 'Breast', ta: 'மார்பகம்' },
    uti: { en: 'UTI', ta: 'UTI' },
    ovarian: { en: 'Ovarian', ta: 'சினைப்பை' },
    menopause: { en: 'Menopause', ta: 'மாதவிடாய்' },
    thyroid: { en: 'Thyroid', ta: 'தைராய்டு' },
    cervical: { en: 'Cervical', ta: 'கர்ப்பப்பை' },
  };
  return map[id] ? (lang === 'ta' ? map[id].ta : map[id].en) : id;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flex: 1 },
  greeting: { ...Typography.body, color: 'rgba(255,255,255,0.85)' },
  name: { ...Typography.h2, color: Colors.white, marginTop: 2 },
  avatarBtn: {},
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 24 },
  streakPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12, marginTop: 10,
  },
  streakText: { ...Typography.caption, color: Colors.white, fontWeight: '600' },

  scroll: { flex: 1 },
  content: { paddingTop: 20, gap: 0 },

  cycleCard: {
    marginHorizontal: Spacing.base, borderRadius: Radius.xl, padding: 18,
    marginBottom: Spacing.base, ...Shadow.md,
  },
  cycleTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cycleEmoji: { fontSize: 28, marginBottom: 2 },
  cyclePhaseName: { ...Typography.h4 },
  cycleDayBadge: {
    backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center',
    ...Shadow.sm,
  },
  cycleDayNum: { ...Typography.h1, color: Colors.textPrimary, lineHeight: 28 },
  cycleDayLabel: { ...Typography.tiny, color: Colors.textSecondary },
  cycleDesc: { ...Typography.bodyMd, color: Colors.textPrimary, lineHeight: 20, marginBottom: 10 },
  nextPeriodRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nextPeriodText: { ...Typography.caption, color: Colors.textSecondary },

  noCycleInner: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  noCycleTitle: { ...Typography.h4, color: Colors.teal },
  noCycleSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginHorizontal: Spacing.base, marginBottom: 10, marginTop: 4,
  },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary },
  seeAll: { ...Typography.caption, color: Colors.teal, fontWeight: '600' },

  checkinCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: Spacing.base, backgroundColor: Colors.white,
    borderRadius: Radius.lg, padding: 14, marginBottom: Spacing.base,
    ...Shadow.sm, borderWidth: 1, borderColor: Colors.tealLight,
  },
  checkinDone: { borderColor: Colors.greenLight, backgroundColor: Colors.greenLight },
  checkinText: { ...Typography.body, flex: 1, color: Colors.teal },

  examCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, borderRadius: Radius.xl, marginBottom: Spacing.base, ...Shadow.sm,
  },
  examLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  examEmoji: { fontSize: 26 },
  examTitle: { ...Typography.h4, color: Colors.pinkDark },
  examSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  examBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  examBadgeText: { ...Typography.caption, fontWeight: '700' },

  tipText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  assessmentChip: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    paddingHorizontal: 14, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    ...Shadow.sm, borderWidth: 1, borderColor: Colors.divider,
  },
  assessmentEmoji: { fontSize: 18 },
  assessmentLabel: { ...Typography.label, color: Colors.textPrimary },
  assessmentDot: { width: 8, height: 8, borderRadius: 4 },

  whatsappCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, borderRadius: Radius.xl, ...Shadow.sm, marginBottom: 8,
  },
  whatsappLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  whatsappIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(37,211,102,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  whatsappTitle: { ...Typography.h4, color: Colors.textPrimary },
  whatsappSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  smfLink: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    justifyContent: 'center', paddingVertical: 12, marginTop: 4,
  },
  smfLinkText: { ...Typography.caption, color: Colors.teal, fontWeight: '600' },
});
