// ─────────────────────────────────────────────────────────────
// Dear Akka — ProfileScreen.js
// User profile + settings screen
// Cycle length stepper, language toggle, sign out
// ─────────────────────────────────────────────────────────────

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { C, phaseColors, PHASE_LABEL } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import Akka from '../components/Akka';
import { MiniPetal } from '../components/NaadhiArc';
import { getCyclePhase, currentCycleDay, formatDateDisplay } from '../utils/cycleCalc';

const APP_VERSION = '1.0.0';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, saveUser, cycleData, saveCycleData, lang, setLang, signOut } = useApp();

  const cycleDay = currentCycleDay(cycleData?.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData?.cycleLength || 28) : 'none';
  const pc = phaseColors(phase);
  const phaseLabel = PHASE_LABEL[lang]?.[phase] || PHASE_LABEL.en[phase] || 'Tracking';

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [cycleLength, setCycleLength] = useState(cycleData?.cycleLength || 28);

  const handleSaveName = useCallback(() => {
    const trimmed = nameInput.trim();
    if (trimmed.length === 0) return;
    saveUser({ ...(user || {}), name: trimmed });
    setEditingName(false);
  }, [nameInput, user, saveUser]);

  const handleCycleLengthChange = useCallback((delta) => {
    const next = Math.min(40, Math.max(21, cycleLength + delta));
    setCycleLength(next);
    saveCycleData({ cycleLength: next });
  }, [cycleLength, saveCycleData]);

  const handleSignOut = useCallback(() => {
    const title = lang === 'ta' ? 'வெளியேறுகிறீர்களா?' : 'Sign out?';
    const body = lang === 'ta'
      ? 'உங்கள் சுழற்சி தரவு மற்றும் பதிவுகள் நீக்கப்படாது.'
      : 'Your cycle data and logs will not be deleted.';

    // Alert.alert is a no-op on react-native-web, so confirm in the browser.
    if (Platform.OS === 'web') {
      // eslint-disable-next-line no-alert
      if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${body}`)) {
        signOut();
      }
      return;
    }

    Alert.alert(title, body, [
      { text: lang === 'ta' ? 'ரத்து' : 'Cancel', style: 'cancel' },
      {
        text: lang === 'ta' ? 'வெளியேறு' : 'Sign Out',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  }, [lang, signOut]);

  return (
    <ScrollView
      style={[styles.root, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main'))}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={22} color={C.textPrimary} />
        <Text style={styles.backText}>{lang === 'ta' ? 'பின்' : 'Back'}</Text>
      </TouchableOpacity>

      {/* Profile hero */}
      <View style={styles.hero}>
        <View style={[styles.avatarWrap, { borderColor: pc.accent }]}>
          <Akka phase={phase} size={64} />
        </View>

        {/* Name row */}
        {editingName ? (
          <View style={styles.nameEditRow}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              autoFocus
              placeholder="Your name"
              placeholderTextColor={C.textHint}
              returnKeyType="done"
              onSubmitEditing={handleSaveName}
            />
            <TouchableOpacity style={[styles.nameEditBtn, { backgroundColor: pc.accent }]} onPress={handleSaveName}>
              <Ionicons name="checkmark" size={18} color={C.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameCancelBtn} onPress={() => setEditingName(false)}>
              <Ionicons name="close" size={18} color={C.textSecondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user?.name || 'Dear Akka'}</Text>
            <TouchableOpacity onPress={() => { setNameInput(user?.name || ''); setEditingName(true); }} style={styles.editIcon}>
              <Ionicons name="pencil-outline" size={16} color={C.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Phase info */}
        <View style={styles.phaseRow}>
          <MiniPetal phase={phase} size={18} />
          <Text style={[styles.phaseLabel, { color: pc.accent }]}>{phaseLabel}</Text>
          {cycleDay && (
            <Text style={styles.cycleDay}>
              {lang === 'ta' ? `நாள் ${cycleDay}` : `Day ${cycleDay}`}
            </Text>
          )}
        </View>
      </View>

      {/* Cycle Settings */}
      <SectionHeader title={lang === 'ta' ? 'சுழற்சி அமைப்புகள்' : 'Cycle Settings'} icon="sync-outline" />
      <View style={styles.card}>
        {/* Cycle length */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingLabel}>{lang === 'ta' ? 'சுழற்சி நீளம்' : 'Cycle Length'}</Text>
            <Text style={styles.settingHint}>{lang === 'ta' ? '21–40 நாட்கள்' : '21–40 days'}</Text>
          </View>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: pc.accent }]}
              onPress={() => handleCycleLengthChange(-1)}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color={pc.accent} />
            </TouchableOpacity>
            <Text style={[styles.stepValue, { color: pc.accent }]}>{cycleLength}</Text>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: pc.accent }]}
              onPress={() => handleCycleLengthChange(1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={pc.accent} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerLine} />

        {/* First day of period */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingLabel}>{lang === 'ta' ? 'கடைசி மாதவிடாய் தேதி' : 'Last Period Start'}</Text>
            <Text style={styles.settingHint}>
              {cycleData?.lastPeriodStart
                ? formatDateDisplay(cycleData.lastPeriodStart, lang)
                : (lang === 'ta' ? 'பதிவு செய்யப்படவில்லை' : 'Not logged yet')}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.smallBtn, { borderColor: pc.mid }]}
            onPress={() => navigation.navigate('Main', { screen: 'Track' })}
            activeOpacity={0.8}
          >
            <Text style={[styles.smallBtnText, { color: pc.accent }]}>
              {lang === 'ta' ? 'திருத்து' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language */}
      <SectionHeader title={lang === 'ta' ? 'மொழி' : 'Language'} icon="language-outline" />
      <View style={styles.card}>
        <View style={styles.langRow}>
          <LangPill label="English" value="en" active={lang === 'en'} pc={pc} onPress={() => setLang('en')} />
          <LangPill label="தமிழ்" value="ta" active={lang === 'ta'} pc={pc} onPress={() => setLang('ta')} />
        </View>
      </View>

      {/* About */}
      <SectionHeader title={lang === 'ta' ? 'பயன்பாட்டு பற்றி' : 'About'} icon="information-circle-outline" />
      <View style={styles.card}>
        <AboutRow
          label={lang === 'ta' ? 'பதிப்பு' : 'Version'}
          value={APP_VERSION}
        />
        <View style={styles.dividerLine} />
        <AboutRow
          label={lang === 'ta' ? 'உருவாக்கியது' : 'Created by'}
          value="SMF Health"
        />
        <View style={styles.dividerLine} />
        <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
          <Text style={styles.settingLabel}>{lang === 'ta' ? 'தனியுரிமை கொள்கை' : 'Privacy Policy'}</Text>
          <Ionicons name="chevron-forward" size={16} color={C.textSecondary} />
        </TouchableOpacity>
        <View style={styles.dividerLine} />
        <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
          <Text style={styles.settingLabel}>{lang === 'ta' ? 'பயன்பாட்டு விதிமுறைகள்' : 'Terms of Use'}</Text>
          <Ionicons name="chevron-forward" size={16} color={C.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* SMF credit */}
      <View style={styles.creditCard}>
        <Ionicons name="heart" size={14} color={C.menstrual} />
        <Text style={styles.creditText}>
          {lang === 'ta'
            ? 'SMF Health-ன் அன்போடு கட்டப்பட்டது. பெண்களின் ஆரோக்கியம் ஒவ்வொரு பெண்ணின் உரிமை.'
            : 'Built with love by SMF Health. Women\'s health is every woman\'s right.'}
        </Text>
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={18} color="#EF4444" />
        <Text style={styles.signOutText}>{lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={15} color={C.textSecondary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function LangPill({ label, value, active, pc, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.langPill,
        active
          ? { backgroundColor: pc.accent, borderColor: pc.accent }
          : { backgroundColor: C.bgElevated, borderColor: C.dividerMid },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.langPillText, active && { color: C.white, fontWeight: '700' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function AboutRow({ label, value }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingValue}>{value}</Text>
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
    gap: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 12,
    marginLeft: -4,
  },
  backText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '500',
    color: C.textPrimary,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: C.bgMid,
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    ...T.h2,
    fontSize: 22,
  },
  editIcon: {
    padding: 4,
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameInput: {
    backgroundColor: C.bgElevated,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: C.textPrimary,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 20,
    minWidth: 160,
    borderWidth: 1,
    borderColor: C.dividerMid,
  },
  nameEditBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameCancelBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.bgElevated,
    borderWidth: 1,
    borderColor: C.dividerMid,
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phaseLabel: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
  cycleDay: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: C.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
    paddingLeft: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 11,
    color: C.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: C.bgMid,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.divider,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLeft: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 15,
    color: C.textPrimary,
  },
  settingHint: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: C.textSecondary,
    marginTop: 1,
  },
  settingValue: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: C.textSecondary,
  },
  dividerLine: {
    height: 1,
    backgroundColor: C.divider,
    marginHorizontal: 16,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 18,
    minWidth: 28,
    textAlign: 'center',
  },
  smallBtn: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  smallBtnText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 13,
  },
  langRow: {
    flexDirection: 'row',
    padding: 14,
    gap: 10,
  },
  langPill: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  langPillText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 15,
    color: C.textSecondary,
  },
  creditCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: C.bgMid,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.divider,
  },
  creditText: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'italic',
    color: C.textSecondary,
    lineHeight: 18,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.10)',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(239,68,68,0.25)',
    marginTop: 6,
    marginBottom: 8,
  },
  signOutText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 15,
    color: '#EF4444',
  },
});
