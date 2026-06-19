// ─────────────────────────────────────────────────────────────
// Dear Akka — CareScreen.js
// Self-care recommendations organised by cycle phase
// Expandable accordion cards + breast exam reminder + daily tip
// ─────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import { MiniPetal } from '../components/NaadhiArc';
import Akka from '../components/Akka';
import { getCyclePhase, currentCycleDay } from '../utils/cycleCalc';

// ── Phase-specific care content ────────────────────────────────
const CARE_CONTENT = {
  menstrual: {
    movement: [
      "Restorative yoga — child's pose, reclined butterfly, legs up the wall",
      'Slow 20-minute walks in fresh air to ease cramping naturally',
      'Gentle stretching: hip flexors and lower back release',
      'Rest entirely if your body asks — this is valid movement too',
    ],
    nutrition: [
      'Iron-rich foods: horsegram (kollu), sesame seeds, spinach, dates',
      'Warm, cooked meals — porridges, soups, rasam with pepper and turmeric',
      'Ginger tea or warm cumin water for cramps and bloating',
      'Avoid icy drinks, excessive raw food, and caffeine if cramps are severe',
    ],
    rest: [
      'Sleep 8–9 hours if possible; your body needs extra repair time',
      'Use a warm water bottle on your lower belly to ease cramping',
      'Limit screen time before bed — melatonin supports deep healing sleep',
      'Napping is absolutely fine; honour the tiredness without guilt',
    ],
    mind: [
      'Journal — your menstrual phase brings unusual clarity and honesty',
      'Avoid overcommitting socially; say no without guilt this week',
      'Meditate with gentle breath work, even 5 minutes helps',
      'Let yourself grieve or feel fully — this is an emotionally permeable time',
    ],
  },
  follicular: {
    movement: [
      'Try something new: a dance class, a new gym routine, cycling',
      'Strength training responds very well to estrogen — great time to build',
      'HIIT workouts feel energising and effective this phase',
      'Run a new route or explore a new park — novelty energises you now',
    ],
    nutrition: [
      'Fermented foods: idli, dosa, yoghurt, kombucha to support gut health',
      'Sprouts and fresh greens — your metabolism handles lightness well',
      'Protein with each meal to support muscle building from your workouts',
      'Varied, colourful meals — this is a great phase for trying new recipes',
    ],
    rest: [
      'Sleep 7–8 hours; energy is rising so you may need slightly less',
      'Your dreams may be more vivid this phase — keep a dream journal',
      'Morning sunlight exposure helps regulate your circadian rhythm',
      'Wind down with light reading rather than screens for quality sleep',
    ],
    mind: [
      'Start new projects, brainstorm, set intentions for the month',
      'Connect with friends and make plans — social energy is high',
      'Try a new creative skill: drawing, writing, cooking something new',
      'Optimism is natural now — capture your ideas and goals in writing',
    ],
  },
  ovulation: {
    movement: [
      'Peak performance window: push yourself in workouts and enjoy it',
      'Group exercise classes — your energy and sociability are both high',
      'Running, cycling, swimming at your best pace feels wonderful now',
      'Try something adventurous: rock climbing, paddleboarding, hiking',
    ],
    nutrition: [
      'Anti-inflammatory foods: turmeric, ginger, berries, olive oil',
      "Light, fresh meals that don't slow you down",
      'Stay hydrated — your basal body temperature rises around ovulation',
      'Zinc-rich foods (pumpkin seeds, chickpeas) support egg health',
    ],
    rest: [
      'Sleep quality is good this phase — maintain your regular schedule',
      'You may feel you need less rest — use the extra energy wisely',
      'Avoid burning out by doing too much; pace your peak energy',
      'Evening walks and outdoor time feel especially restorative now',
    ],
    mind: [
      'Have important conversations, negotiations, and presentations now',
      'Your communication is at its peak — use it meaningfully',
      'Connect deeply with people you love; intimacy feels natural',
      'Celebrate yourself — your confidence and charisma are genuinely high',
    ],
  },
  luteal: {
    movement: [
      'Pilates, yoga, and slow strength sessions are ideal this phase',
      'Long walks with no time pressure; nature is especially soothing now',
      'Swimming and gentle cycling feel supportive and grounding',
      'Listen closely — drop intensity if your body signals fatigue',
    ],
    nutrition: [
      'Magnesium-rich foods: dark chocolate, pumpkin seeds, almonds, banana',
      'Complex carbohydrates for stable serotonin: sweet potato, oats, brown rice',
      'Reduce salt and processed food to manage bloating',
      'Vitamin B6: chickpeas, sunflower seeds, fish — supports mood stability',
    ],
    rest: [
      'Sleep is extra important — progesterone raises body temperature, disrupting rest',
      'Cool room, light linen, and a consistent bedtime matter more now',
      'Wind down 1 hour before bed: no news, soft music, warm tea',
      'Short afternoon rest or yoga nidra can restore mid-day energy dips',
    ],
    mind: [
      'Journal your feelings without judgment — PMS often surfaces real truths',
      'Simplify your schedule; protect your energy rather than over-extending',
      'Gentle creative work (writing, crafting, music) suits this inward phase',
      'Be extra compassionate with yourself — your sensitivity is valid',
    ],
  },
  none: {
    movement: [
      'Any movement that feels good is the right movement today',
      'A 20–30 minute daily walk is one of the most powerful health habits',
      "Find a form of exercise you genuinely enjoy — that's the sustainable one",
      'Rest is also a movement strategy: allow recovery between active days',
    ],
    nutrition: [
      'Eat mostly warm, home-cooked meals with plenty of vegetables',
      'Protein at every meal supports energy, mood, and hormonal health',
      'Stay well-hydrated — aim for 6–8 glasses of water daily',
      'Minimize ultra-processed foods and refined sugars where you can',
    ],
    rest: [
      'Consistent sleep and wake times regulate hormones powerfully',
      'Aim for 7–9 hours of quality sleep each night',
      'Create a calming bedtime ritual — your sleep is worth protecting',
      'Limit caffeine after 2pm for deeper, more restorative sleep',
    ],
    mind: [
      'Daily journalling — even one sentence — builds self-awareness',
      'Set a 5-minute daily mindfulness or breathing practice',
      'Protect time for things that restore rather than drain you',
      'Connection with people who love you is genuine medicine',
    ],
  },
};

const DAILY_TIPS = [
  "Drink a glass of warm water with lemon first thing tomorrow morning. Small rituals compound into real wellbeing.",
  "Before you sleep tonight, write down one thing your body did for you today that you're grateful for.",
  "Step outside for 10 minutes of sunlight before noon. It regulates your cortisol and helps you sleep better tonight.",
  "Check in: are you eating because you're hungry, or because you're tired? Both are valid — just good to notice.",
  "Put your phone face-down for the next hour. Your nervous system will thank you with calm and clarity.",
  "Say something kind to yourself today that you would say to your best friend. You deserve your own softness.",
  "Breathe out twice as long as you breathe in. Try 4 counts in, 8 counts out, five times. This is instant calm.",
];

const ACCORDION_ITEMS = [
  { key: 'movement', icon: 'walk-outline', label: 'Movement' },
  { key: 'nutrition', icon: 'nutrition-outline', label: 'Nutrition' },
  { key: 'rest', icon: 'moon-outline', label: 'Rest' },
  { key: 'mind', icon: 'heart-outline', label: 'Mind' },
];

export default function CareScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cycleData } = useApp();
  const [examDone, setExamDone] = useState(false);

  const cycleDay = currentCycleDay(cycleData?.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData?.cycleLength || 28) : 'none';
  const pc = phaseColors(phase);
  const content = CARE_CONTENT[phase] || CARE_CONTENT.none;

  // Pick a stable daily tip based on date
  const todayNum = new Date().getDate();
  const tip = DAILY_TIPS[todayNum % DAILY_TIPS.length];

  const warmLines = {
    menstrual: 'Rest deeply today, akka 🌙',
    follicular: 'New energy is blooming for you, akka 🌱',
    ovulation: "You\'re radiant right now, akka ✨",
    luteal: 'Be gentle with yourself today, akka 🤍',
    none: 'Here for you today, akka 💛',
  };

  return (
    <ScrollView
      style={[styles.root, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Care</Text>
          <Text style={[styles.headerSub, { color: pc.accent }]}>{warmLines[phase] || warmLines.none}</Text>
        </View>
        <View style={styles.headerRight}>
          <MiniPetal phase={phase} size={26} />
          <Akka phase={phase} size={44} />
        </View>
      </View>

      {/* Accordion cards */}
      {ACCORDION_ITEMS.map((item) => (
        <AccordionCard
          key={item.key}
          icon={item.icon}
          label={item.label}
          bullets={content[item.key]}
          pc={pc}
        />
      ))}

      {/* Breast exam reminder */}
      <View style={styles.examCard}>
        <View style={styles.examLeft}>
          <Ionicons name="ribbon-outline" size={22} color={C.menstrual} style={{ marginBottom: 4 }} />
          <Text style={styles.examTitle}>Monthly Breast Exam</Text>
          <Text style={styles.examSub}>Best done a few days after your period ends, once each month.</Text>
        </View>
        <TouchableOpacity
          style={[styles.examTick, { backgroundColor: examDone ? C.menstrual : C.bgElevated, borderColor: C.menstrual }]}
          onPress={() => setExamDone(v => !v)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={examDone ? 'checkmark' : 'checkmark-outline'}
            size={20}
            color={examDone ? C.white : C.menstrual}
          />
        </TouchableOpacity>
      </View>
      {examDone && (
        <Text style={styles.examConfirm}>Done this month — well done, akka 💗</Text>
      )}

      {/* Akka's Tip */}
      <View style={[styles.tipCard, { borderLeftColor: pc.accent }]}>
        <View style={styles.tipHeader}>
          <Akka phase={phase} size={28} />
          <Text style={[styles.tipLabel, { color: pc.accent }]}>Akka's Tip</Text>
        </View>
        <Text style={styles.tipText}>"{tip}"</Text>
      </View>
    </ScrollView>
  );
}

function AccordionCard({ icon, label, bullets, pc }) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = useCallback(() => {
    const toValue = open ? 0 : 1;
    Animated.timing(anim, {
      toValue,
      duration: 260,
      useNativeDriver: false,
    }).start();
    setOpen(v => !v);
  }, [open, anim]);

  const maxH = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bullets.length * 58 + 16],
  });
  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });

  return (
    <View style={styles.accordion}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggle} activeOpacity={0.8}>
        <View style={[styles.accordionIcon, { backgroundColor: pc.soft }]}>
          <Ionicons name={icon} size={20} color={pc.accent} />
        </View>
        <Text style={styles.accordionLabel}>{label}</Text>
        <Animated.View style={{ transform: [{ rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
          <Ionicons name="chevron-down" size={18} color={C.textSecondary} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.accordionBody, { maxHeight: maxH, opacity }]}>
        {bullets.map((b, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={[styles.bulletDot, { backgroundColor: pc.accent }]} />
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    ...T.h1,
  },
  headerSub: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accordion: {
    backgroundColor: C.bgMid,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.divider,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  accordionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionLabel: {
    ...T.h4,
    flex: 1,
    fontSize: 15,
  },
  accordionBody: {
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  bulletText: {
    ...T.bodySmall,
    color: C.textPrimary,
    flex: 1,
    lineHeight: 21,
    fontSize: 14,
  },
  examCard: {
    backgroundColor: C.bgMid,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: 'rgba(192,69,122,0.3)',
  },
  examLeft: {
    flex: 1,
    gap: 2,
  },
  examTitle: {
    ...T.h4,
    fontSize: 15,
    color: C.menstrual,
  },
  examSub: {
    ...T.bodySmall,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  examTick: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  examConfirm: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: C.menstrual,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: -6,
  },
  tipCard: {
    backgroundColor: C.bgMid,
    borderRadius: 18,
    padding: 18,
    borderLeftWidth: 3,
    gap: 10,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tipLabel: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  tipText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'italic',
    color: C.textPrimary,
    lineHeight: 23,
    opacity: 0.9,
  },
});
