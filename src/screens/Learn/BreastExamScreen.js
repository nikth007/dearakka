import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useLang, useApp } from '../../context/AppContext';
import { BREAST_EXAM_STEPS, BREAST_EXAM_WARNINGS } from '../../data/selfCareContent';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { getLastBreastExam, logBreastExam, earnBadge } from '../../utils/storage';
import { toDateStr, today, formatDateDisplay } from '../../utils/cycleCalc';
import SafeHeader from '../../components/common/SafeHeader';
import { t } from '../../data/strings';

export default function BreastExamScreen({ navigation }) {
  const lang = useLang();
  const { dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [lastExam, setLastExam] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState('overview'); // 'overview' | 'guide' | 'done'
  const [completedSteps, setCompletedSteps] = useState([]);

  useFocusEffect(useCallback(() => {
    getLastBreastExam().then(setLastExam);
  }, []));

  async function markDone() {
    const dateStr = toDateStr(today());
    await logBreastExam(dateStr);
    setLastExam({ date: dateStr, completed: true });
    const isFirst = await earnBadge('first_exam');
    if (isFirst) dispatch({ type: 'EARN_BADGE', payload: 'first_exam' });
    setMode('done');
    Alert.alert(
      lang === 'ta' ? '🎉 அருமை!' : '🎉 Well done!',
      lang === 'ta' ? 'உங்கள் மாதாந்திர மார்பக சுய பரிசோதனை முடிந்தது. நீங்கள் உங்கள் ஆரோக்கியத்தைக் கவனித்துக்கொள்கிறீர்கள்! 💗'
        : 'Your monthly breast self-exam is complete. You\'re taking great care of your health! 💗',
      [{ text: t('ok', lang) }]
    );
  }

  function nextStep() {
    const updated = [...completedSteps, currentStep];
    setCompletedSteps(updated);
    if (currentStep < BREAST_EXAM_STEPS.length - 1) {
      setCurrentStep(i => i + 1);
    } else {
      markDone();
    }
  }

  return (
    <View style={styles.root}>
      <SafeHeader
        title={t('breastExamGuide', lang)}
        onBack={() => navigation.goBack()}
        gradient
      />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {mode === 'overview' && (
          <>
            {/* Hero */}
            <LinearGradient colors={['#FCE7F3', '#FFF0F5']} style={styles.hero}>
              <Text style={styles.heroEmoji}>🎗️</Text>
              <Text style={styles.heroTitle}>{t('breastExamGuide', lang)}</Text>
              <Text style={styles.heroSub}>{t('breastExamSub', lang)}</Text>
              <View style={styles.bestTimeRow}>
                <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.pinkDark} />
                <Text style={styles.bestTimeText}>
                  {t('bestTime', lang)} {t('bestTimeVal', lang)}
                </Text>
              </View>
            </LinearGradient>

            {/* Last exam status */}
            <View style={styles.statusCard}>
              <MaterialCommunityIcons
                name={lastExam ? 'check-circle' : 'calendar-alert'}
                size={22}
                color={lastExam ? Colors.green : Colors.gold}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.statusTitle}>
                  {lastExam ? t('lastDone', lang) : t('neverDone', lang)}
                </Text>
                {lastExam && (
                  <Text style={styles.statusDate}>{formatDateDisplay(lastExam.date, lang)}</Text>
                )}
              </View>
            </View>

            {/* Steps overview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{lang === 'ta' ? '5 படிகள்' : '5 Steps'}</Text>
              {BREAST_EXAM_STEPS.map((step, i) => (
                <View key={step.id} style={styles.stepPreview}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNum}>{step.id}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.stepIcon}>{step.icon}</Text>
                    <Text style={styles.stepPreviewTitle}>{step.title[lang] || step.title.en}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Warning signs */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{lang === 'ta' ? 'எப்போது மருத்துவரை சந்திக்க வேண்டும்?' : 'When to see a doctor'}</Text>
              {BREAST_EXAM_WARNINGS.map((w, i) => (
                <View key={i} style={styles.warningRow}>
                  <MaterialCommunityIcons name="alert-circle-outline" size={16} color={Colors.red} />
                  <Text style={styles.warningText}>{w[lang] || w.en}</Text>
                </View>
              ))}
            </View>

            <Pressable onPress={() => setMode('guide')}>
              <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.startBtn}>
                <Text style={styles.startBtnText}>{lang === 'ta' ? 'வழிகாட்டி தொடங்கவும்' : 'Start Guided Exam'}</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.white} />
              </LinearGradient>
            </Pressable>
          </>
        )}

        {mode === 'guide' && (
          <>
            {/* Progress */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${((currentStep + 1) / BREAST_EXAM_STEPS.length) * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {lang === 'ta' ? `படி ${currentStep + 1} / ${BREAST_EXAM_STEPS.length}` : `Step ${currentStep + 1} of ${BREAST_EXAM_STEPS.length}`}
              </Text>
            </View>

            {/* Step card */}
            <LinearGradient colors={['#FCE7F3', '#FFF8FF']} style={styles.stepCard}>
              <Text style={styles.stepCardEmoji}>{BREAST_EXAM_STEPS[currentStep].icon}</Text>
              <Text style={styles.stepCardTitle}>{BREAST_EXAM_STEPS[currentStep].title[lang] || BREAST_EXAM_STEPS[currentStep].title.en}</Text>
              <Text style={styles.stepCardInstruction}>{BREAST_EXAM_STEPS[currentStep].instruction[lang] || BREAST_EXAM_STEPS[currentStep].instruction.en}</Text>
              <View style={styles.tipBox}>
                <MaterialCommunityIcons name="lightbulb-on" size={16} color={Colors.teal} />
                <Text style={styles.tipBoxText}>{BREAST_EXAM_STEPS[currentStep].tip[lang] || BREAST_EXAM_STEPS[currentStep].tip.en}</Text>
              </View>
            </LinearGradient>

            {/* Step dots */}
            <View style={styles.dotsRow}>
              {BREAST_EXAM_STEPS.map((_, i) => (
                <View key={i} style={[styles.dot,
                  completedSteps.includes(i) && styles.dotDone,
                  i === currentStep && styles.dotCurrent
                ]} />
              ))}
            </View>

            <Pressable onPress={nextStep}>
              <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.nextBtn}>
                <Text style={styles.nextBtnText}>
                  {currentStep < BREAST_EXAM_STEPS.length - 1
                    ? (lang === 'ta' ? 'அடுத்த படி' : 'Next Step')
                    : (lang === 'ta' ? 'முடிந்தது என குறிக்கவும்' : 'Mark Complete')}
                </Text>
                <MaterialCommunityIcons name={currentStep < BREAST_EXAM_STEPS.length - 1 ? 'arrow-right' : 'check'} size={20} color={Colors.white} />
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => setMode('overview')} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>{lang === 'ta' ? 'வழிகாட்டியை ரத்து செய்' : 'Cancel guide'}</Text>
            </Pressable>
          </>
        )}

        {mode === 'done' && (
          <View style={styles.doneContainer}>
            <Text style={styles.doneEmoji}>🎉</Text>
            <Text style={styles.doneTitle}>{lang === 'ta' ? 'சுய பரிசோதனை முடிந்தது!' : 'Self-exam complete!'}</Text>
            <Text style={styles.doneSub}>
              {lang === 'ta'
                ? 'நீங்கள் உங்கள் ஆரோக்கியத்தைக் கவனித்துக்கொள்கிறீர்கள். அடுத்த மாதம் மீண்டும் செய்யுங்கள்.'
                : 'You\'re taking great care of your health. Remember to check again next month.'}
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <LinearGradient colors={Gradients.primary} style={styles.startBtn}>
                <Text style={styles.startBtnText}>{lang === 'ta' ? 'முகப்புக்கு திரும்பு' : 'Back to home'}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: Spacing.base, gap: Spacing.md },

  hero: { borderRadius: Radius.xl, padding: 20, alignItems: 'center', ...Shadow.sm },
  heroEmoji: { fontSize: 40, marginBottom: 8 },
  heroTitle: { ...Typography.h3, color: Colors.pinkDark, textAlign: 'center', marginBottom: 6 },
  heroSub: { ...Typography.bodyMd, color: Colors.textSecondary, textAlign: 'center', marginBottom: 10 },
  bestTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.pinkLight, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  bestTimeText: { ...Typography.caption, color: Colors.pinkDark },

  statusCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: Radius.lg, padding: 14, ...Shadow.sm,
  },
  statusTitle: { ...Typography.label, color: Colors.textPrimary },
  statusDate: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  section: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 12 },

  stepPreview: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  stepNumCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.pinkLight, alignItems: 'center', justifyContent: 'center' },
  stepNum: { ...Typography.label, color: Colors.pinkDark },
  stepIcon: { fontSize: 16 },
  stepPreviewTitle: { ...Typography.bodyMd, color: Colors.textPrimary },

  warningRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  warningText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: Radius.lg },
  startBtnText: { ...Typography.h4, color: Colors.white },

  // Guide mode
  progressContainer: { gap: 6 },
  progressBg: { height: 6, backgroundColor: Colors.divider, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.pink, borderRadius: 3 },
  progressText: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'right' },

  stepCard: { borderRadius: Radius.xxl, padding: 24, alignItems: 'center', ...Shadow.md },
  stepCardEmoji: { fontSize: 48, marginBottom: 12 },
  stepCardTitle: { ...Typography.h3, color: Colors.pinkDark, textAlign: 'center', marginBottom: 12 },
  stepCardInstruction: { ...Typography.body, color: Colors.textPrimary, textAlign: 'center', lineHeight: 24, marginBottom: 16 },
  tipBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: Colors.tealLight, borderRadius: Radius.md, padding: 12,
  },
  tipBoxText: { ...Typography.caption, color: Colors.tealDark, flex: 1, lineHeight: 16 },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.divider },
  dotDone: { backgroundColor: Colors.pink },
  dotCurrent: { width: 20, backgroundColor: Colors.pinkDark },

  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: Radius.lg },
  nextBtnText: { ...Typography.h4, color: Colors.white },

  cancelBtn: { alignItems: 'center', paddingVertical: 10 },
  cancelBtnText: { ...Typography.label, color: Colors.textSecondary },

  // Done mode
  doneContainer: { alignItems: 'center', paddingVertical: 40, gap: 16 },
  doneEmoji: { fontSize: 60 },
  doneTitle: { ...Typography.h2, color: Colors.teal, textAlign: 'center' },
  doneSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
});
