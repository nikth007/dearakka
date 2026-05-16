import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable,
  Linking, Alert, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useLang, useApp } from '../../context/AppContext';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { t } from '../../data/strings';
import { getReminders, addReminder, updateReminder, deleteReminder, getLastBreastExam } from '../../utils/storage';
import { formatDateDisplay, toDateStr, today } from '../../utils/cycleCalc';
import SafeHeader from '../../components/common/SafeHeader';

const SMF_PHONE = '04435693070';
const WHATSAPP_NUMBER = '+919003579070'; // Update with actual Bitvoice WA number

const REMINDER_TEMPLATES = [
  {
    type: 'breast_exam',
    icon: '🎗️',
    title: { en: 'Monthly Breast Self-Exam', ta: 'மாதாந்திர மார்பக சுய பரிசோதனை' },
    desc: { en: 'Reminded on the 7th of each month', ta: 'ஒவ்வொரு மாதமும் 7-ஆம் தேதி நினைவூட்டல்' },
    color: Colors.pink,
    bgColor: Colors.pinkLight,
  },
  {
    type: 'cervical_screen',
    icon: '🎀',
    title: { en: 'Cervical Cancer Screening', ta: 'கர்ப்பப்பை வாய் புற்றுநோய் பரிசோதனை' },
    desc: { en: 'Recommended every 5 years (ages 30–65)', ta: '5 ஆண்டுக்கு ஒருமுறை (30–65 வயது)' },
    color: Colors.red,
    bgColor: Colors.redLight,
  },
  {
    type: 'mammogram',
    icon: '🩺',
    title: { en: 'Mammogram Reminder', ta: 'மேமோகிராம் நினைவூட்டல்' },
    desc: { en: 'Recommended annually after age 40', ta: '40 வயதுக்குப் பிறகு வருடாந்திரம்' },
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
  {
    type: 'gynec_visit',
    icon: '🏥',
    title: { en: 'Gynecologist Visit', ta: 'மகப்பேறு மருத்துவர் சந்திப்பு' },
    desc: { en: 'Annual well-woman check-up', ta: 'வருடாந்திர பெண் ஆரோக்கிய பரிசோதனை' },
    color: Colors.teal,
    bgColor: Colors.tealLight,
  },
];

const SMF_CLINICS = [
  {
    name: 'Sundaram Medical Foundation',
    address: 'Chennai, Tamil Nadu',
    phone: '044 3569 3070',
    website: 'smf.in',
  },
];

export default function CareScreen({ navigation }) {
  const lang = useLang();
  const { state } = useApp();
  const insets = useSafeAreaInsets();
  const [reminders, setReminders] = useState([]);
  const [lastExam, setLastExam] = useState(null);
  const [activeSection, setActiveSection] = useState('reminders');

  useFocusEffect(useCallback(() => {
    async function load() {
      const [r, e] = await Promise.all([getReminders(), getLastBreastExam()]);
      setReminders(r || []);
      setLastExam(e);
    }
    load();
  }, []));

  function isReminderActive(type) {
    return reminders.some(r => r.type === type && r.enabled);
  }

  async function toggleReminder(template) {
    const existing = reminders.find(r => r.type === template.type);
    if (existing) {
      await updateReminder(existing.id, { enabled: !existing.enabled });
      setReminders(prev => prev.map(r => r.id === existing.id ? { ...r, enabled: !r.enabled } : r));
    } else {
      const newReminder = {
        id: `${template.type}_${Date.now()}`,
        type: template.type,
        title: template.title,
        enabled: true,
        createdAt: new Date().toISOString(),
      };
      await addReminder(newReminder);
      setReminders(prev => [...prev, newReminder]);
      Alert.alert('', lang === 'ta' ? `நினைவூட்டல் சேர்க்கப்பட்டது!` : 'Reminder added!', [{ text: t('ok', lang) }]);
    }
  }

  function callSMF() { Linking.openURL(`tel:${SMF_PHONE}`); }
  function openWhatsApp() {
    const url = `whatsapp://send?phone=${WHATSAPP_NUMBER}`;
    Linking.canOpenURL(url).then(c => c ? Linking.openURL(url) : Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`));
  }
  function openSMFWebsite() { Linking.openURL('https://smf.in/'); }

  function requestIVRSCall() {
    Alert.alert(
      lang === 'ta' ? '📞 நினைவூட்டல் அழைப்பு' : '📞 Request Reminder Call',
      lang === 'ta'
        ? 'SMF அக்கா உங்களுக்கு நினைவூட்டல் அழைப்பு செய்வார். இப்போது 044 3569 3070-ஐ அழைக்கவும்.'
        : 'Akka from SMF will call you with a health reminder. Call 044 3569 3070 now to request.',
      [
        { text: t('cancel', lang), style: 'cancel' },
        { text: lang === 'ta' ? 'அழைக்கவும்' : 'Call Now', onPress: callSMF },
      ]
    );
  }

  return (
    <View style={styles.root}>
      <SafeHeader title={t('careTitle', lang)} gradient />

      {/* Section pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll} contentContainerStyle={styles.pillContent}>
        {[
          { key: 'reminders', label: lang === 'ta' ? '🔔 நினைவூட்டல்' : '🔔 Reminders' },
          { key: 'ivrs', label: lang === 'ta' ? '📞 அழைப்புகள்' : '📞 Akka Calls' },
          { key: 'clinics', label: lang === 'ta' ? '🏥 மருத்துவமனை' : '🏥 Clinics' },
          { key: 'emergency', label: lang === 'ta' ? '🆘 அவசரம்' : '🆘 Emergency' },
        ].map(s => (
          <Pressable key={s.key} onPress={() => setActiveSection(s.key)}
            style={[styles.pill, activeSection === s.key && styles.pillActive]}>
            <Text style={[styles.pillText, activeSection === s.key && styles.pillTextActive]}>{s.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {activeSection === 'reminders' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'உங்கள் ஆரோக்கிய நினைவூட்டல்களை இயக்கவும் அல்லது நிறுத்தவும்' : 'Toggle your health reminders on or off'}
            </Text>
            {REMINDER_TEMPLATES.map(template => {
              const active = isReminderActive(template.type);
              return (
                <View key={template.type} style={[styles.reminderCard, { borderColor: active ? template.color : Colors.divider }]}>
                  <View style={[styles.reminderIcon, { backgroundColor: template.bgColor }]}>
                    <Text style={styles.reminderEmoji}>{template.icon}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.reminderTitle}>{template.title[lang] || template.title.en}</Text>
                    <Text style={styles.reminderDesc}>{template.desc[lang] || template.desc.en}</Text>
                  </View>
                  <Switch
                    value={active}
                    onValueChange={() => toggleReminder(template)}
                    trackColor={{ false: Colors.divider, true: template.color + '66' }}
                    thumbColor={active ? template.color : Colors.textMuted}
                  />
                </View>
              );
            })}

            {/* Breast exam status widget */}
            <Pressable onPress={() => navigation.navigate('BreastExam')}>
              <LinearGradient colors={['#FCE7F3', '#FFF0F5']} style={styles.examStatusCard}>
                <View style={styles.examStatusLeft}>
                  <Text style={styles.examStatusEmoji}>🎗️</Text>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.examStatusTitle}>{lang === 'ta' ? 'மாதாந்திர சுய பரிசோதனை' : 'Monthly Self-Exam'}</Text>
                    <Text style={styles.examStatusSub}>
                      {lastExam
                        ? (lang === 'ta' ? `கடைசி: ${formatDateDisplay(lastExam.date, lang)}` : `Last: ${formatDateDisplay(lastExam.date, lang)}`)
                        : (lang === 'ta' ? 'இன்னும் செய்யவில்லை' : 'Not done yet this month')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.examStatusBtn}>{lang === 'ta' ? 'செய்' : 'Do it'} →</Text>
              </LinearGradient>
            </Pressable>
          </>
        )}

        {activeSection === 'ivrs' && (
          <>
            <LinearGradient colors={['#F0FDFA', '#CCFBF1']} style={styles.ivrsHero}>
              <Text style={styles.ivrsEmoji}>📞</Text>
              <Text style={styles.ivrsTitle}>{t('ivrsCalls', lang)}</Text>
              <Text style={styles.ivrsSub}>{t('ivrsSubtitle', lang)}</Text>
            </LinearGradient>

            <View style={styles.ivrsCard}>
              <Text style={styles.ivrsCardTitle}>{lang === 'ta' ? 'நினைவூட்டல் அழைப்பு என்னவென்றால்?' : 'What is an Akka reminder call?'}</Text>
              <Text style={styles.ivrsCardText}>
                {lang === 'ta'
                  ? 'SMF-இன் Interactive Voice Response System (IVRS) மூலம், அக்கா உங்களுக்கு மாதாந்திர மார்பக சுய பரிசோதனை, கர்ப்பப்பை வாய் பரிசோதனை மற்றும் பிற முக்கியமான சுகாதார சோதனைகள் பற்றி நினைவூட்டும் அழைப்பு செய்வார்.'
                  : 'Through SMF\'s Interactive Voice Response System (IVRS), Akka will call you to remind you about your monthly breast self-exam, cervical screening, and other important health checkups.'}
              </Text>
              <View style={styles.ivrsFeatures}>
                {[
                  lang === 'ta' ? '✓ தமிழ் மற்றும் ஆங்கிலத்தில்' : '✓ Available in Tamil & English',
                  lang === 'ta' ? '✓ முற்றிலும் இலவசம்' : '✓ Completely free',
                  lang === 'ta' ? '✓ AI இல்லை — SMF அக்கா மட்டுமே' : '✓ No AI — only Akka from SMF',
                ].map((f, i) => (
                  <Text key={i} style={styles.ivrsFeatureText}>{f}</Text>
                ))}
              </View>
            </View>

            <Pressable onPress={requestIVRSCall}>
              <LinearGradient colors={Gradients.primary} style={styles.ivrsBtn}>
                <MaterialCommunityIcons name="phone-outgoing" size={22} color={Colors.white} />
                <View>
                  <Text style={styles.ivrsBtnText}>{t('requestCall', lang)}</Text>
                  <Text style={styles.ivrsBtnSub}>{t('smfHelpline', lang)}</Text>
                </View>
              </LinearGradient>
            </Pressable>

            {/* WhatsApp Akka */}
            <Pressable onPress={openWhatsApp} style={styles.contactCard}>
              <View style={[styles.contactIcon, { backgroundColor: '#DCF8C6' }]}>
                <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.contactTitle}>{t('openWhatsApp', lang)}</Text>
                <Text style={styles.contactSub}>{lang === 'ta' ? 'அறிகுறி பரிசோதனைக்கு' : 'For symptom assessment'}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />
            </Pressable>
          </>
        )}

        {activeSection === 'clinics' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'SMF மருத்துவமனை மற்றும் தொடர்பு விவரங்கள்' : 'SMF clinic and contact details'}
            </Text>
            {SMF_CLINICS.map((clinic, i) => (
              <View key={i} style={styles.clinicCard}>
                <View style={styles.clinicHeader}>
                  <MaterialCommunityIcons name="hospital-building" size={24} color={Colors.teal} />
                  <Text style={styles.clinicName}>{clinic.name}</Text>
                </View>
                <View style={styles.clinicRow}>
                  <MaterialCommunityIcons name="map-marker-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.clinicInfo}>{clinic.address}</Text>
                </View>
                <View style={styles.clinicRow}>
                  <MaterialCommunityIcons name="phone-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.clinicInfo}>{clinic.phone}</Text>
                </View>
                <View style={styles.clinicRow}>
                  <MaterialCommunityIcons name="web" size={16} color={Colors.textSecondary} />
                  <Text style={styles.clinicInfo}>{clinic.website}</Text>
                </View>
                <View style={styles.clinicBtns}>
                  <Pressable onPress={callSMF} style={[styles.clinicBtn, { backgroundColor: Colors.tealLight }]}>
                    <MaterialCommunityIcons name="phone" size={16} color={Colors.teal} />
                    <Text style={[styles.clinicBtnText, { color: Colors.teal }]}>{lang === 'ta' ? 'அழைக்கவும்' : 'Call'}</Text>
                  </Pressable>
                  <Pressable onPress={openSMFWebsite} style={[styles.clinicBtn, { backgroundColor: Colors.pinkLight }]}>
                    <MaterialCommunityIcons name="web" size={16} color={Colors.pinkDark} />
                    <Text style={[styles.clinicBtnText, { color: Colors.pinkDark }]}>{lang === 'ta' ? 'வலைதளம்' : 'Website'}</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <View style={styles.freeScreeningCard}>
              <Text style={styles.freeScreeningTitle}>{lang === 'ta' ? '🆓 இலவச திரையிடல்' : '🆓 Free Screenings'}</Text>
              {[
                lang === 'ta' ? '✓ 30–65 வயது பெண்களுக்கு 5 ஆண்டுக்கு ஒருமுறை இலவச VIA திரையிடல்' : '✓ Free VIA screening every 5 years (ages 30–65)',
                lang === 'ta' ? '✓ 14 வயது பெண்களுக்கு HPV தடுப்பூசி — அரசு மையங்களில் இலவசம்' : '✓ HPV vaccine FREE for 14-year-old girls at government centers',
              ].map((f, i) => (
                <Text key={i} style={styles.freeScreeningText}>{f}</Text>
              ))}
            </View>
          </>
        )}

        {activeSection === 'emergency' && (
          <>
            <Text style={styles.sectionDesc}>
              {lang === 'ta' ? 'அவசர தொடர்பு எண்கள் மற்றும் ஆதரவு' : 'Emergency contacts and support'}
            </Text>
            {[
              { icon: 'phone', title: lang === 'ta' ? 'SMF Dear Akka உதவி' : 'SMF Dear Akka Helpline', sub: '044 3569 3070', color: Colors.teal, bg: Colors.tealLight, action: callSMF },
              { icon: 'ambulance', title: lang === 'ta' ? 'அம்புலன்ஸ்' : 'Ambulance', sub: '108', color: Colors.red, bg: Colors.redLight, action: () => Linking.openURL('tel:108') },
              { icon: 'hospital', title: lang === 'ta' ? 'தேசிய சுகாதார உதவி' : 'National Health Helpline', sub: '1800-180-1104', color: Colors.purple, bg: Colors.purpleLight, action: () => Linking.openURL('tel:18001801104') },
            ].map((item, i) => (
              <Pressable key={i} onPress={item.action} style={[styles.emergencyCard, { borderColor: item.color }]}>
                <View style={[styles.contactIcon, { backgroundColor: item.bg }]}>
                  <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.contactTitle}>{item.title}</Text>
                  <Text style={[styles.contactSub, { color: item.color, fontWeight: '700' }]}>{item.sub}</Text>
                </View>
                <MaterialCommunityIcons name="phone-forward" size={20} color={item.color} />
              </Pressable>
            ))}

            <View style={styles.safetyNote}>
              <MaterialCommunityIcons name="shield-heart" size={20} color={Colors.teal} />
              <Text style={styles.safetyNoteText}>
                {lang === 'ta'
                  ? 'உங்கள் ஆரோக்கியம் முக்கியம். எந்த அறிகுறியையும் புறக்கணிக்காதீர்கள் — உதவி கேட்பது வலிமையின் அடையாளம்.'
                  : 'Your health matters. Never ignore symptoms — asking for help is a sign of strength.'}
              </Text>
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
  sectionDesc: { ...Typography.bodyMd, color: Colors.textSecondary },

  reminderCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 14, ...Shadow.sm, borderWidth: 1,
  },
  reminderIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  reminderEmoji: { fontSize: 20 },
  reminderTitle: { ...Typography.label, color: Colors.textPrimary },
  reminderDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  examStatusCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, borderRadius: Radius.xl, ...Shadow.sm,
  },
  examStatusLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  examStatusEmoji: { fontSize: 24 },
  examStatusTitle: { ...Typography.label, color: Colors.pinkDark },
  examStatusSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  examStatusBtn: { ...Typography.label, color: Colors.pink },

  ivrsHero: { borderRadius: Radius.xl, padding: 20, alignItems: 'center', ...Shadow.sm },
  ivrsEmoji: { fontSize: 36, marginBottom: 8 },
  ivrsTitle: { ...Typography.h3, color: Colors.teal, marginBottom: 6 },
  ivrsSub: { ...Typography.bodyMd, color: Colors.textSecondary, textAlign: 'center' },

  ivrsCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm },
  ivrsCardTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 8 },
  ivrsCardText: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 22, marginBottom: 12 },
  ivrsFeatures: { gap: 4 },
  ivrsFeatureText: { ...Typography.bodyMd, color: Colors.teal },

  ivrsBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 12, paddingVertical: 16, borderRadius: Radius.lg,
  },
  ivrsBtnText: { ...Typography.h4, color: Colors.white },
  ivrsBtnSub: { ...Typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  contactCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 14, ...Shadow.sm,
  },
  contactIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  contactTitle: { ...Typography.label, color: Colors.textPrimary },
  contactSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  clinicCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm },
  clinicHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  clinicName: { ...Typography.h4, color: Colors.textPrimary },
  clinicRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  clinicInfo: { ...Typography.bodyMd, color: Colors.textSecondary },
  clinicBtns: { flexDirection: 'row', gap: 10, marginTop: 12 },
  clinicBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: Radius.md },
  clinicBtnText: { ...Typography.label },

  freeScreeningCard: { backgroundColor: Colors.tealLight, borderRadius: Radius.xl, padding: 16 },
  freeScreeningTitle: { ...Typography.h4, color: Colors.teal, marginBottom: 8 },
  freeScreeningText: { ...Typography.bodyMd, color: Colors.tealDark, lineHeight: 22, marginBottom: 4 },

  emergencyCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 14, ...Shadow.sm, borderWidth: 1,
  },
  safetyNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: Colors.tealLight, borderRadius: Radius.lg, padding: 14,
  },
  safetyNoteText: { ...Typography.bodyMd, color: Colors.tealDark, flex: 1, lineHeight: 20 },
});
