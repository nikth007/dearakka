import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useLang, useApp } from '../../context/AppContext';
import { t } from '../../data/strings';
import { CONDITIONS, CONDITION_ORDER } from '../../data/conditions';
import { HEALTH_MYTHS, HEALTH_BADGES } from '../../data/selfCareContent';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { getAssessments, getBadges } from '../../utils/storage';
import SafeHeader from '../../components/common/SafeHeader';

const SECTIONS = ['conditions', 'guides', 'myths', 'badges'];

export default function LearnScreen({ navigation }) {
  const lang = useLang();
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const [assessments, setAssessments] = useState([]);
  const [badges, setBadges] = useState({});
  const [activeSection, setActiveSection] = useState('conditions');

  useFocusEffect(useCallback(() => {
    async function load() {
      const [a, b] = await Promise.all([getAssessments(), getBadges()]);
      setAssessments(a || []);
      setBadges(b || {});
    }
    load();
  }, []));

  function getAssessmentResult(conditionId) {
    return assessments.find(a => a.conditionId === conditionId)?.result || null;
  }

  return (
    <View style={styles.root}>
      <SafeHeader title={t('learnTitle', lang)} subtitle={t('disclaimer', lang)} gradient />

      {/* Section pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll} contentContainerStyle={styles.pillContent}>
        {[
          { key: 'conditions', label: lang === 'ta' ? '🩺 நிலைகள்' : '🩺 Conditions' },
          { key: 'guides', label: lang === 'ta' ? '📖 வழிகாட்டிகள்' : '📖 Guides' },
          { key: 'myths', label: lang === 'ta' ? '💡 மூடநம்பிக்கை' : '💡 Myths' },
          { key: 'badges', label: lang === 'ta' ? '🏆 சான்றிதழ்' : '🏆 Badges' },
        ].map(s => (
          <Pressable key={s.key} onPress={() => setActiveSection(s.key)}
            style={[styles.pill, activeSection === s.key && styles.pillActive]}>
            <Text style={[styles.pillText, activeSection === s.key && styles.pillTextActive]}>{s.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {activeSection === 'conditions' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta'
                ? 'ஒவ்வொரு நிலையையும் அறிந்து சுய மதிப்பீடு செய்யுங்கள்'
                : 'Learn about each condition and take a self-assessment'}
            </Text>
            {CONDITION_ORDER.map(id => {
              const c = CONDITIONS[id];
              const result = getAssessmentResult(id);
              return (
                <Pressable key={id} onPress={() => navigation.navigate('ConditionDetail', { conditionId: id })}>
                  <LinearGradient colors={c.gradient} style={styles.condCard}>
                    <View style={styles.condLeft}>
                      <Text style={styles.condEmoji}>{c.emoji}</Text>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={[styles.condName, { color: c.tagColor }]}>{c.name[lang] || c.name.en}</Text>
                        <Text style={styles.condTagline} numberOfLines={2}>{c.tagline[lang] || c.tagline.en}</Text>
                        {result && (
                          <View style={[styles.resultBadge, { backgroundColor: result.color + '22' }]}>
                            <Text style={[styles.resultBadgeText, { color: result.color }]}>{result.level}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={22} color={c.accentColor} />
                  </LinearGradient>
                </Pressable>
              );
            })}
          </>
        )}

        {activeSection === 'guides' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'சுய பராமரிப்பு வழிகாட்டிகள்' : 'Self-care guides and step-by-step walkthroughs'}
            </Text>
            <Pressable onPress={() => navigation.navigate('BreastExam')}>
              <LinearGradient colors={['#FCE7F3', '#FFF0F5']} style={styles.guideCard}>
                <Text style={styles.guideEmoji}>🎗️</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.guideName}>{t('breastExamGuide', lang)}</Text>
                  <Text style={styles.guideSub}>{t('breastExamSub', lang)}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.pink} />
              </LinearGradient>
            </Pressable>
            <LinearGradient colors={['#F0FDFA', '#CCFBF1']} style={styles.guideCard}>
              <Text style={styles.guideEmoji}>🧘‍♀️</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.guideName}>{lang === 'ta' ? 'மாதவிடாய் வலிக்கான யோகா' : 'Yoga for Period Pain'}</Text>
                <Text style={styles.guideSub}>{lang === 'ta' ? 'விரைவில் வருகிறது' : 'Coming soon'}</Text>
              </View>
              <View style={styles.comingSoonBadge}><Text style={styles.comingSoonText}>Soon</Text></View>
            </LinearGradient>
            <LinearGradient colors={['#EDE9FE', '#F5F3FF']} style={styles.guideCard}>
              <Text style={styles.guideEmoji}>🥗</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.guideName}>{lang === 'ta' ? 'இரும்புச் சத்து உணவுகள்' : 'Iron-Rich Foods Guide'}</Text>
                <Text style={styles.guideSub}>{lang === 'ta' ? 'விரைவில் வருகிறது' : 'Coming soon'}</Text>
              </View>
              <View style={styles.comingSoonBadge}><Text style={styles.comingSoonText}>Soon</Text></View>
            </LinearGradient>
          </>
        )}

        {activeSection === 'myths' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'பொதுவான மூடநம்பிக்கைகளை நிராகரிக்கவும்' : 'Busting common health myths with facts'}
            </Text>
            {HEALTH_MYTHS.map((item, idx) => (
              <View key={idx} style={styles.mythCard}>
                <View style={styles.mythHeader}>
                  <Text style={styles.mythEmoji}>{item.emoji}</Text>
                  <View style={styles.mythBadge}>
                    <Text style={styles.mythBadgeText}>{lang === 'ta' ? 'மூடநம்பிக்கை' : 'Myth'}</Text>
                  </View>
                </View>
                <Text style={styles.mythText}>{item.myth[lang] || item.myth.en}</Text>
                <View style={styles.factDivider}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={Colors.green} />
                  <Text style={styles.factLabel}>{lang === 'ta' ? 'உண்மை' : 'Fact'}</Text>
                </View>
                <Text style={styles.factText}>{item.fact[lang] || item.fact.en}</Text>
              </View>
            ))}
          </>
        )}

        {activeSection === 'badges' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'ஆரோக்கியமான பழக்கங்களுக்கு சான்றிதழ்கள் பெறுங்கள்' : 'Earn badges by building healthy habits'}
            </Text>
            <View style={styles.badgeGrid}>
              {HEALTH_BADGES.map(badge => {
                const earned = !!badges[badge.id];
                return (
                  <View key={badge.id} style={[styles.badgeCard, !earned && styles.badgeLocked]}>
                    <Text style={[styles.badgeIcon, !earned && { opacity: 0.4 }]}>{badge.icon}</Text>
                    <Text style={[styles.badgeTitle, !earned && { color: Colors.textMuted }]}>
                      {badge.title[lang] || badge.title.en}
                    </Text>
                    <Text style={styles.badgeDesc} numberOfLines={2}>
                      {badge.description[lang] || badge.description.en}
                    </Text>
                    {earned && (
                      <View style={styles.earnedBadge}>
                        <MaterialCommunityIcons name="check" size={10} color={Colors.white} />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  pillScroll: { backgroundColor: Colors.white, maxHeight: 52, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  pillContent: { paddingHorizontal: Spacing.base, paddingVertical: 8, gap: 8, alignItems: 'center' },
  pill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.divider },
  pillActive: { backgroundColor: Colors.teal, borderColor: Colors.teal },
  pillText: { ...Typography.label, color: Colors.textSecondary },
  pillTextActive: { color: Colors.white },

  scroll: { flex: 1 },
  content: { padding: Spacing.base, gap: Spacing.md },
  sectionDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 4 },

  condCard: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: Radius.xl, ...Shadow.sm,
  },
  condLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  condEmoji: { fontSize: 28 },
  condName: { ...Typography.h4, marginBottom: 2 },
  condTagline: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 16 },
  resultBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 4 },
  resultBadgeText: { ...Typography.tiny, fontWeight: '700' },

  guideCard: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderRadius: Radius.xl, ...Shadow.sm,
  },
  guideEmoji: { fontSize: 28 },
  guideName: { ...Typography.h4, color: Colors.textPrimary },
  guideSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  comingSoonBadge: { backgroundColor: Colors.goldLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  comingSoonText: { ...Typography.tiny, color: Colors.gold, fontWeight: '700' },

  mythCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm,
  },
  mythHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  mythEmoji: { fontSize: 22 },
  mythBadge: { backgroundColor: Colors.redLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  mythBadgeText: { ...Typography.tiny, color: Colors.red, fontWeight: '700' },
  mythText: { ...Typography.body, color: Colors.textPrimary, fontStyle: 'italic', marginBottom: 12 },
  factDivider: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  factLabel: { ...Typography.label, color: Colors.green },
  factText: { ...Typography.bodyMd, color: Colors.textPrimary, lineHeight: 20 },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badgeCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: 14, alignItems: 'center', ...Shadow.sm, position: 'relative',
  },
  badgeLocked: { backgroundColor: Colors.bg },
  badgeIcon: { fontSize: 32, marginBottom: 6 },
  badgeTitle: { ...Typography.label, color: Colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  badgeDesc: { ...Typography.tiny, color: Colors.textSecondary, textAlign: 'center', lineHeight: 14 },
  earnedBadge: {
    position: 'absolute', top: 8, right: 8,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center',
  },
});
