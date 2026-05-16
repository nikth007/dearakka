import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLang } from '../../context/AppContext';
import { CONDITIONS } from '../../data/conditions';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { t } from '../../data/strings';

export default function AssessmentResultScreen({ route, navigation }) {
  const { assessment, conditionId } = route.params;
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const c = CONDITIONS[conditionId];
  const result = assessment.result;
  const yesCount = assessment.yesCount;
  const totalCount = assessment.responses.length;

  function callSMF() { Linking.openURL('tel:04435693070'); }
  function openWhatsApp() { Linking.openURL('https://wa.me/919003579070'); }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {/* Top summary */}
        <LinearGradient colors={Gradients.primary} style={[styles.topBg, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.topEmoji}>{c.emoji}</Text>
          <Text style={styles.topTitle}>{lang === 'ta' ? 'மதிப்பீடு முடிந்தது' : 'Assessment Complete'}</Text>
          <Text style={styles.topCondition}>{c.name[lang] || c.name.en}</Text>
        </LinearGradient>

        {/* Score cards */}
        <View style={styles.scoreRow}>
          <View style={[styles.scoreCard, { backgroundColor: Colors.redLight }]}>
            <Text style={[styles.scoreNum, { color: Colors.red }]}>{yesCount}</Text>
            <Text style={styles.scoreLabel}>{t('yes', lang)}</Text>
          </View>
          <View style={[styles.scoreCard, { backgroundColor: Colors.greenLight }]}>
            <Text style={[styles.scoreNum, { color: Colors.green }]}>{totalCount - yesCount}</Text>
            <Text style={styles.scoreLabel}>{t('no', lang)}</Text>
          </View>
          <View style={[styles.scoreCard, { backgroundColor: Colors.tealLight }]}>
            <Text style={[styles.scoreNum, { color: Colors.teal }]}>{totalCount}</Text>
            <Text style={styles.scoreLabel}>{lang === 'ta' ? 'மொத்தம்' : 'Total'}</Text>
          </View>
        </View>

        {/* Result card */}
        <View style={[styles.resultCard, { borderColor: result.color }]}>
          <Text style={[styles.resultLevel, { color: result.color }]}>{result.level}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
          <Text style={styles.resultAction}>{result.action}</Text>
        </View>

        {/* Health tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('healthTips', lang)}</Text>
          {c.healthTips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={[styles.tipBullet, { color: c.accentColor }]}>✦</Text>
              <Text style={styles.tipText}>{tip[lang] || tip.en}</Text>
            </View>
          ))}
        </View>

        {/* Contact if needed */}
        {result.needsConsultation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{lang === 'ta' ? 'தொடர்பு கொள்ளுங்கள்' : 'Get in touch'}</Text>
            <Pressable onPress={callSMF} style={styles.contactRow}>
              <View style={[styles.contactIcon, { backgroundColor: Colors.tealLight }]}>
                <MaterialCommunityIcons name="phone" size={20} color={Colors.teal} />
              </View>
              <View>
                <Text style={styles.contactTitle}>{t('smfHelpline', lang)}</Text>
                <Text style={styles.contactSub}>{lang === 'ta' ? 'அக்கா உதவி எண்' : 'Dear Akka Helpline'}</Text>
              </View>
            </Pressable>
            <Pressable onPress={openWhatsApp} style={styles.contactRow}>
              <View style={[styles.contactIcon, { backgroundColor: '#DCF8C6' }]}>
                <MaterialCommunityIcons name="whatsapp" size={20} color="#25D366" />
              </View>
              <View>
                <Text style={styles.contactTitle}>{t('chatWithAkka', lang)}</Text>
                <Text style={styles.contactSub}>{lang === 'ta' ? 'WhatsApp-இல் பேசுங்கள்' : 'Chat on WhatsApp'}</Text>
              </View>
            </Pressable>
          </View>
        )}

        <Text style={styles.disclaimer}>{t('disclaimer', lang)}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable onPress={() => navigation.navigate('Assessment', { conditionId })} style={styles.retakeBtn}>
            <MaterialCommunityIcons name="refresh" size={18} color={Colors.teal} />
            <Text style={styles.retakeBtnText}>{t('retakeAssessment', lang)}</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Main', { screen: 'Learn' })}>
            <LinearGradient colors={Gradients.primary} style={styles.doneBtn}>
              <Text style={styles.doneBtnText}>{lang === 'ta' ? 'முகப்புக்கு திரும்பு' : 'Back to Learn'}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { gap: Spacing.base },
  topBg: { alignItems: 'center', paddingBottom: 28, paddingHorizontal: 20 },
  topEmoji: { fontSize: 48, marginBottom: 8 },
  topTitle: { ...Typography.h3, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  topCondition: { ...Typography.h2, color: Colors.white },

  scoreRow: { flexDirection: 'row', gap: Spacing.md, marginHorizontal: Spacing.base },
  scoreCard: { flex: 1, borderRadius: Radius.lg, padding: 12, alignItems: 'center' },
  scoreNum: { ...Typography.display, lineHeight: 32 },
  scoreLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  resultCard: {
    marginHorizontal: Spacing.base, backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 18, borderWidth: 1.5, ...Shadow.sm,
  },
  resultLevel: { ...Typography.h3, marginBottom: 6 },
  resultMessage: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 8 },
  resultAction: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 20 },

  section: {
    marginHorizontal: Spacing.base, backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 16, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 10 },
  tipRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  tipBullet: { fontSize: 10, marginTop: 5 },
  tipText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  contactIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  contactTitle: { ...Typography.label, color: Colors.textPrimary },
  contactSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  disclaimer: {
    ...Typography.tiny, color: Colors.textMuted, textAlign: 'center',
    marginHorizontal: Spacing.xl, lineHeight: 16,
  },
  actions: { marginHorizontal: Spacing.base, gap: Spacing.sm },
  retakeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 12, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.teal,
  },
  retakeBtnText: { ...Typography.label, color: Colors.teal },
  doneBtn: { alignItems: 'center', paddingVertical: 14, borderRadius: Radius.lg },
  doneBtnText: { ...Typography.h4, color: Colors.white },
});
