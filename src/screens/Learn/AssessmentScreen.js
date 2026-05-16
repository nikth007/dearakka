import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLang, useApp } from '../../context/AppContext';
import { CONDITIONS, getRecommendation } from '../../data/conditions';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { saveAssessment, earnBadge } from '../../utils/storage';
import { t } from '../../data/strings';

export default function AssessmentScreen({ route, navigation }) {
  const { conditionId } = route.params;
  const lang = useLang();
  const { dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const c = CONDITIONS[conditionId];
  const questions = c.questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState([]);
  const [lastResponse, setLastResponse] = useState(null); // { answer, explanation }

  const current = questions[currentIdx];
  const progress = (currentIdx + 1) / questions.length;
  const isLast = currentIdx === questions.length - 1;

  async function handleAnswer(answer) {
    const q = questions[currentIdx];
    const explanation = answer === 'yes'
      ? (q.yesResponse[lang] || q.yesResponse.en)
      : (q.noResponse[lang] || q.noResponse.en);
    const response = { questionId: q.id, answer, severity: q.severity, explanation };
    const newResponses = [...responses, response];
    setLastResponse({ answer, explanation, isCaution: answer === 'yes' && (q.severity === 'HIGH' || q.severity === 'CRITICAL') });

    if (isLast) {
      // compute result
      const yesCount = newResponses.filter(r => r.answer === 'yes').length;
      const highSeverity = newResponses.filter(r => r.answer === 'yes' && (r.severity === 'HIGH' || r.severity === 'CRITICAL')).length;
      const hasCritical = newResponses.some(r => r.answer === 'yes' && r.severity === 'CRITICAL');
      const result = getRecommendation(conditionId, yesCount, highSeverity, hasCritical, lang);
      const assessment = {
        id: `${conditionId}_${Date.now()}`,
        conditionId,
        date: new Date().toISOString(),
        responses: newResponses,
        result,
        yesCount,
      };
      await saveAssessment(assessment);
      dispatch({ type: 'ADD_ASSESSMENT', payload: assessment });
      const isFirst = await earnBadge('first_assessment');
      if (isFirst) dispatch({ type: 'EARN_BADGE', payload: 'first_assessment' });

      // Navigate to results after brief pause
      setTimeout(() => navigation.replace('AssessmentResult', { assessment, conditionId }), 1000);
    } else {
      setResponses(newResponses);
      setTimeout(() => {
        setLastResponse(null);
        setCurrentIdx(i => i + 1);
      }, 1400);
    }
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <LinearGradient colors={Gradients.primary} style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.white} />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.headerTitle}>{c.emoji} {c.name[lang] || c.name.en}</Text>
          <Text style={styles.headerSub}>
            {lang === 'ta' ? `கேள்வி ${currentIdx + 1} / ${questions.length}` : `Question ${currentIdx + 1} of ${questions.length}`}
          </Text>
        </View>
      </LinearGradient>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: c.accentColor }]} />
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        {/* Question card */}
        {!lastResponse ? (
          <View style={styles.questionArea}>
            <View style={styles.qBadge}>
              <Text style={[styles.qBadgeText, { color: c.accentColor }]}>
                {lang === 'ta' ? `கேள்வி ${currentIdx + 1}` : `Q${currentIdx + 1}`}
              </Text>
            </View>
            <Text style={styles.questionText}>{current.text[lang] || current.text.en}</Text>
            {current.severity === 'CRITICAL' && (
              <View style={styles.criticalNote}>
                <MaterialCommunityIcons name="alert-circle-outline" size={16} color={Colors.red} />
                <Text style={styles.criticalNoteText}>
                  {lang === 'ta' ? 'இந்த கேள்வி மிக முக்கியமானது' : 'This question is critical'}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={[styles.explanationCard, lastResponse.isCaution && styles.explanationCaution]}>
            <View style={styles.answerRow}>
              <MaterialCommunityIcons
                name={lastResponse.answer === 'yes' ? 'check-circle' : 'close-circle'}
                size={22}
                color={lastResponse.answer === 'yes' ? (lastResponse.isCaution ? Colors.red : Colors.green) : Colors.teal}
              />
              <Text style={[styles.answerText, { color: lastResponse.answer === 'yes' ? (lastResponse.isCaution ? Colors.red : Colors.green) : Colors.teal }]}>
                {lastResponse.answer === 'yes' ? t('yes', lang) : t('no', lang)}
              </Text>
            </View>
            <Text style={styles.explanationText}>{lastResponse.explanation}</Text>
            {isLast && (
              <View style={styles.analyzingRow}>
                <MaterialCommunityIcons name="loading" size={16} color={Colors.teal} />
                <Text style={styles.analyzingText}>{lang === 'ta' ? 'முடிவுகளை பகுப்பாய்வு செய்கிறோம்...' : 'Analyzing your responses...'}</Text>
              </View>
            )}
          </View>
        )}

        {/* Answer buttons */}
        {!lastResponse && (
          <View style={styles.btnArea}>
            <Text style={styles.btnAreaHint}>
              {lang === 'ta' ? 'நேர்மையாக பதில் தரவும் — தவறான பதில்கள் இல்லை' : 'Answer honestly — there are no wrong answers'}
            </Text>
            <View style={styles.answerBtns}>
              <Pressable style={({ pressed }) => [styles.answerBtn, styles.yesBtn, pressed && styles.btnPressed]}
                onPress={() => handleAnswer('yes')}>
                <MaterialCommunityIcons name="check" size={22} color={Colors.white} />
                <Text style={styles.answerBtnText}>{t('yes', lang)}</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.answerBtn, styles.noBtn, pressed && styles.btnPressed]}
                onPress={() => handleAnswer('no')}>
                <MaterialCommunityIcons name="close" size={22} color={Colors.white} />
                <Text style={styles.answerBtnText}>{t('no', lang)}</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Dots indicator */}
        <View style={styles.dotsRow}>
          {questions.map((_, i) => (
            <View key={i} style={[styles.dot,
              i < currentIdx && styles.dotDone,
              i === currentIdx && [styles.dotCurrent, { backgroundColor: c.accentColor }]
            ]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { ...Typography.h4, color: Colors.white },
  headerSub: { ...Typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  progressBg: { height: 4, backgroundColor: Colors.divider },
  progressFill: { height: 4, borderRadius: 2 },

  content: { flex: 1, padding: Spacing.base, justifyContent: 'space-between' },

  questionArea: {
    flex: 1, justifyContent: 'center',
    backgroundColor: Colors.white, borderRadius: Radius.xxl, padding: 24, ...Shadow.md,
    marginVertical: Spacing.base,
  },
  qBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.bg,
    borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 16,
  },
  qBadgeText: { ...Typography.label, fontWeight: '700' },
  questionText: { ...Typography.h3, color: Colors.textPrimary, lineHeight: 28 },
  criticalNote: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 16, backgroundColor: Colors.redLight, borderRadius: 8,
    padding: 10,
  },
  criticalNoteText: { ...Typography.caption, color: Colors.red, flex: 1 },

  explanationCard: {
    flex: 1, justifyContent: 'center',
    backgroundColor: Colors.white, borderRadius: Radius.xxl, padding: 24, ...Shadow.md,
    borderLeftWidth: 3, borderLeftColor: Colors.teal,
    marginVertical: Spacing.base,
  },
  explanationCaution: { borderLeftColor: Colors.red },
  answerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  answerText: { ...Typography.h4 },
  explanationText: { ...Typography.body, color: Colors.textPrimary, lineHeight: 24 },
  analyzingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  analyzingText: { ...Typography.caption, color: Colors.teal },

  btnArea: {},
  btnAreaHint: { ...Typography.caption, color: Colors.textMuted, textAlign: 'center', marginBottom: 12 },
  answerBtns: { flexDirection: 'row', gap: 12 },
  answerBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, borderRadius: Radius.lg,
  },
  yesBtn: { backgroundColor: Colors.green },
  noBtn: { backgroundColor: Colors.red },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  answerBtnText: { ...Typography.h4, color: Colors.white },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: Spacing.lg },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.divider },
  dotDone: { backgroundColor: Colors.tealMid },
  dotCurrent: { width: 16 },
});
