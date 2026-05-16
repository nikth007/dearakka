import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLang, useApp } from '../../context/AppContext';
import { CONDITIONS } from '../../data/conditions';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import SafeHeader from '../../components/common/SafeHeader';
import { t } from '../../data/strings';

export default function ConditionDetailScreen({ route, navigation }) {
  const { conditionId } = route.params;
  const lang = useLang();
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const c = CONDITIONS[conditionId];
  if (!c) return null;

  const name = c.name[lang] || c.name.en;
  const fullName = c.fullName[lang] || c.fullName.en;
  const tagline = c.tagline[lang] || c.tagline.en;
  const existingAssessment = state.assessments.find(a => a.conditionId === conditionId);

  return (
    <View style={styles.root}>
      <SafeHeader
        title={name}
        onBack={() => navigation.goBack()}
        gradient
      />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <LinearGradient colors={c.gradient} style={styles.hero}>
          <Text style={styles.heroEmoji}>{c.emoji}</Text>
          <Text style={[styles.heroTitle, { color: c.tagColor }]}>{fullName}</Text>
          <Text style={styles.heroTagline}>{tagline}</Text>
        </LinearGradient>

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('keyFacts', lang)}</Text>
          {c.overview.map((row, i) => (
            <View key={i} style={[styles.overviewRow, i < c.overview.length - 1 && styles.overviewRowBorder]}>
              <Text style={[styles.overviewLabel, { color: c.tagColor }]}>{row.label[lang] || row.label.en}</Text>
              <Text style={styles.overviewValue}>{row.value[lang] || row.value.en}</Text>
            </View>
          ))}
        </View>

        {/* Health tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('healthTips', lang)}</Text>
          {c.healthTips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipBullet, { backgroundColor: c.accentColor }]} />
              <Text style={styles.tipText}>{tip[lang] || tip.en}</Text>
            </View>
          ))}
        </View>

        {/* Assessment CTA */}
        <View style={styles.assessmentSection}>
          {existingAssessment ? (
            <>
              <View style={[styles.resultPreview, { borderColor: existingAssessment.result?.color || Colors.green }]}>
                <Text style={styles.resultPreviewLabel}>{lang === 'ta' ? 'கடைசி மதிப்பீடு முடிவு' : 'Last assessment result'}</Text>
                <Text style={[styles.resultPreviewLevel, { color: existingAssessment.result?.color }]}>
                  {existingAssessment.result?.level}
                </Text>
                <Text style={styles.resultPreviewAction}>{existingAssessment.result?.action}</Text>
              </View>
              <Pressable onPress={() => navigation.navigate('Assessment', { conditionId })} style={styles.retakeBtn}>
                <MaterialCommunityIcons name="refresh" size={18} color={Colors.teal} />
                <Text style={styles.retakeBtnText}>{t('retakeAssessment', lang)}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <View style={styles.assessmentInfo}>
                <MaterialCommunityIcons name="clipboard-check-outline" size={24} color={c.accentColor} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.assessmentInfoTitle}>
                    {lang === 'ta' ? 'சுய மதிப்பீடு' : 'Self Assessment'}
                  </Text>
                  <Text style={styles.assessmentInfoSub}>
                    {lang === 'ta'
                      ? `${c.questions.length} எளிய கேள்விகள் — AI இல்லை, நம்பகமான மருத்துவ தகவல்கள்`
                      : `${c.questions.length} simple questions — no AI, trusted medical info only`}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => navigation.navigate('Assessment', { conditionId })}>
                <LinearGradient colors={[c.accentColor, c.tagColor || c.accentColor]} style={styles.startBtn}>
                  <Text style={styles.startBtnText}>{t('startAssessment', lang)}</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.white} />
                </LinearGradient>
              </Pressable>
            </>
          )}
        </View>

        <Text style={styles.disclaimer}>{t('disclaimer', lang)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { gap: Spacing.base, paddingTop: 0 },
  hero: {
    alignItems: 'center', paddingVertical: 28, paddingHorizontal: 20,
  },
  heroEmoji: { fontSize: 48, marginBottom: 10 },
  heroTitle: { ...Typography.h2, textAlign: 'center', marginBottom: 8 },
  heroTagline: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },

  section: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    marginHorizontal: Spacing.base, padding: 16, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 12 },

  overviewRow: { paddingVertical: 10 },
  overviewRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  overviewLabel: { ...Typography.tiny, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  overviewValue: { ...Typography.bodyMd, color: Colors.textPrimary, lineHeight: 20 },

  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  tipBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  tipText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  assessmentSection: {
    marginHorizontal: Spacing.base, backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 16, ...Shadow.sm,
  },
  assessmentInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  assessmentInfoTitle: { ...Typography.h4, color: Colors.textPrimary },
  assessmentInfoSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2, lineHeight: 16 },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: Radius.lg,
  },
  startBtnText: { ...Typography.h4, color: Colors.white },

  resultPreview: {
    borderWidth: 1.5, borderRadius: Radius.lg, padding: 12, marginBottom: 12,
  },
  resultPreviewLabel: { ...Typography.tiny, color: Colors.textMuted, marginBottom: 4 },
  resultPreviewLevel: { ...Typography.h3, marginBottom: 4 },
  resultPreviewAction: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 16 },
  retakeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 10, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.teal,
  },
  retakeBtnText: { ...Typography.label, color: Colors.teal },

  disclaimer: {
    ...Typography.tiny, color: Colors.textMuted, textAlign: 'center',
    marginHorizontal: Spacing.xl, marginBottom: 8, lineHeight: 16,
  },
});
