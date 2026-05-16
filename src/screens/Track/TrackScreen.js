import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable,
  TextInput, Alert, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { useApp, useLang } from '../../context/AppContext';
import { t } from '../../data/strings';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { CYCLE_PHASES } from '../../data/selfCareContent';
import {
  getDailyLog, saveDailyLog, getCycleData, saveCycleData,
  getStreak, earnBadge,
} from '../../utils/storage';
import { toDateStr, today, formatDateDisplay, computeCycleInfo } from '../../utils/cycleCalc';
import { computeCycleInfo as computeCycle } from '../../utils/cycleCalc';
import SafeHeader from '../../components/common/SafeHeader';

const MOODS = [
  { key: 'great', emoji: '😄', label: { en: 'Great', ta: 'அருமை' }, color: '#10B981' },
  { key: 'good', emoji: '🙂', label: { en: 'Good', ta: 'நன்று' }, color: '#0D9488' },
  { key: 'okay', emoji: '😐', label: { en: 'Okay', ta: 'சரி' }, color: '#F59E0B' },
  { key: 'low', emoji: '😔', label: { en: 'Low', ta: 'குறைவு' }, color: '#8B5CF6' },
  { key: 'rough', emoji: '😞', label: { en: 'Rough', ta: 'கஷ்டம்' }, color: '#EF4444' },
];

const ENERGY_LEVELS = [
  { key: 'high', label: { en: '⚡ High', ta: '⚡ அதிகம்' } },
  { key: 'medium', label: { en: '🌤 Medium', ta: '🌤 நடுத்தரம்' } },
  { key: 'low', label: { en: '🌙 Low', ta: '🌙 குறைவு' } },
];

const FLOW_LEVELS = [
  { key: 'none', label: { en: 'None', ta: 'இல்லை' } },
  { key: 'spotting', label: { en: 'Spotting', ta: 'சொட்டு' }, color: '#FECDD3' },
  { key: 'light', label: { en: 'Light', ta: 'குறைவு' }, color: '#F9A8D4' },
  { key: 'medium', label: { en: 'Medium', ta: 'நடுத்தரம்' }, color: '#F472B6' },
  { key: 'heavy', label: { en: 'Heavy', ta: 'அதிகம்' }, color: '#DB2777' },
];

const PHYSICAL_SYMPTOMS = [
  'cramps', 'headache', 'bloating', 'backache', 'nausea', 'fatigue', 'breastTenderness', 'acne',
];
const EMOTIONAL_SYMPTOMS = [
  'anxious', 'irritable', 'sad', 'calm', 'happy', 'motivated', 'tired', 'emotional',
];

const SLEEP_QUALITY = [
  { key: 'poor', label: { en: '😴 Poor', ta: '😴 மோசம்' } },
  { key: 'fair', label: { en: '🌙 Fair', ta: '🌙 சரி' } },
  { key: 'good', label: { en: '✨ Good', ta: '✨ நல்லது' } },
  { key: 'excellent', label: { en: '🌟 Excellent', ta: '🌟 சிறப்பு' } },
];

const TABS = ['log', 'cycle'];

export default function TrackScreen() {
  const { state, dispatch } = useApp();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('log');
  const [log, setLog] = useState({ mood: null, energy: null, flow: 'none', physical: [], emotional: [], sleepQuality: null, sleepHours: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const [cycleData, setCycleData] = useState(null);
  const [lastPeriodInput, setLastPeriodInput] = useState('');
  const [cycleLengthInput, setCycleLengthInput] = useState('28');
  const [periodActive, setPeriodActive] = useState(false);

  useFocusEffect(useCallback(() => {
    async function load() {
      const todayStr = toDateStr(today());
      const [existingLog, cd] = await Promise.all([getDailyLog(todayStr), getCycleData()]);
      if (existingLog) { setLog(existingLog); setSaved(true); }
      else { setLog({ mood: null, energy: null, flow: 'none', physical: [], emotional: [], sleepQuality: null, sleepHours: '', notes: '' }); setSaved(false); }
      if (cd) {
        setCycleData(cd);
        setLastPeriodInput(cd.lastPeriodStart || '');
        setCycleLengthInput(String(cd.cycleLength || 28));
      }
    }
    load();
  }, []));

  function toggleSymptom(arr, key, field) {
    const current = log[field];
    const updated = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
    setLog(prev => ({ ...prev, [field]: updated }));
    setSaved(false);
  }

  async function saveLog() {
    const todayStr = toDateStr(today());
    await saveDailyLog(todayStr, log);
    const streak = await getStreak(dispatch);
    dispatch({ type: 'SET_STREAK', payload: streak });
    const isFirst = await earnBadge('first_log');
    if (isFirst) dispatch({ type: 'EARN_BADGE', payload: 'first_log' });
    setSaved(true);
    Alert.alert('', t('logSaved', lang), [{ text: t('ok', lang) }]);
  }

  async function saveCycle() {
    const date = lastPeriodInput.trim();
    // Validate YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert('', lang === 'ta' ? 'YYYY-MM-DD வடிவத்தில் தேதியை உள்ளிடவும்' : 'Enter date in YYYY-MM-DD format');
      return;
    }
    const cl = parseInt(cycleLengthInput, 10);
    if (isNaN(cl) || cl < 20 || cl > 45) {
      Alert.alert('', lang === 'ta' ? 'சுழற்சி நீளம் 20–45 நாட்களுக்கு இடையே இருக்க வேண்டும்' : 'Cycle length must be between 20–45 days');
      return;
    }
    const newData = { lastPeriodStart: date, cycleLength: cl, periodDates: cycleData?.periodDates || [] };
    await saveCycleData(newData);
    setCycleData(newData);
    const info = computeCycleInfo(date, cl);
    dispatch({ type: 'SET_CYCLE', payload: newData });
    Alert.alert('', lang === 'ta' ? 'சுழற்சி தகவல் சேமிக்கப்பட்டது!' : 'Cycle data saved!');
  }

  const phase = state.cycleInfo ? CYCLE_PHASES[state.cycleInfo.phase] : null;

  return (
    <View style={styles.root}>
      <SafeHeader title={t('trackTitle', lang)} gradient />

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <Pressable key={tab} style={[styles.tabItem, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'log' ? (lang === 'ta' ? 'தினசரி பதிவு' : 'Daily Log') : (lang === 'ta' ? 'சுழற்சி' : 'Cycle')}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>

        {activeTab === 'log' ? (
          <>
            {/* Mood */}
            <SectionCard title={lang === 'ta' ? 'இன்று உங்கள் மனநிலை?' : 'How are you feeling today?'}>
              <View style={styles.moodRow}>
                {MOODS.map(m => (
                  <Pressable key={m.key} onPress={() => { setLog(p => ({ ...p, mood: m.key })); setSaved(false); }} style={styles.moodItem}>
                    <View style={[styles.moodCircle, log.mood === m.key && { borderColor: m.color, borderWidth: 2 }, log.mood === m.key && { backgroundColor: m.color + '22' }]}>
                      <Text style={styles.moodEmoji}>{m.emoji}</Text>
                    </View>
                    <Text style={[styles.moodLabel, log.mood === m.key && { color: m.color, fontWeight: '700' }]}>
                      {m.label[lang] || m.label.en}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            {/* Energy */}
            <SectionCard title={lang === 'ta' ? 'ஆற்றல் நிலை' : 'Energy level'}>
              <View style={styles.chipRow}>
                {ENERGY_LEVELS.map(e => (
                  <Pressable key={e.key} onPress={() => { setLog(p => ({ ...p, energy: e.key })); setSaved(false); }}
                    style={[styles.chip, log.energy === e.key && styles.chipActive]}>
                    <Text style={[styles.chipText, log.energy === e.key && styles.chipTextActive]}>
                      {e.label[lang] || e.label.en}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            {/* Flow */}
            <SectionCard title={lang === 'ta' ? 'ரத்தப்போக்கு' : 'Period flow'}>
              <View style={styles.chipRow}>
                {FLOW_LEVELS.map(f => (
                  <Pressable key={f.key} onPress={() => { setLog(p => ({ ...p, flow: f.key })); setSaved(false); }}
                    style={[styles.chip, log.flow === f.key && { backgroundColor: f.color || Colors.tealLight, borderColor: f.color || Colors.teal }]}>
                    <Text style={[styles.chipText, log.flow === f.key && { color: f.color ? Colors.pinkDark : Colors.teal, fontWeight: '600' }]}>
                      {f.label[lang] || f.label.en}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            {/* Physical symptoms */}
            <SectionCard title={lang === 'ta' ? 'உடல் அறிகுறிகள்' : 'Physical symptoms'}>
              <View style={styles.chipWrap}>
                {PHYSICAL_SYMPTOMS.map(s => (
                  <Pressable key={s} onPress={() => toggleSymptom(null, s, 'physical')}
                    style={[styles.chipWrapItem, log.physical.includes(s) && styles.chipActive]}>
                    <Text style={[styles.chipText, log.physical.includes(s) && styles.chipTextActive]}>
                      {t(s, lang)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            {/* Emotional */}
            <SectionCard title={lang === 'ta' ? 'மனநிலை / உணர்ச்சிகள்' : 'Emotions'}>
              <View style={styles.chipWrap}>
                {EMOTIONAL_SYMPTOMS.map(s => (
                  <Pressable key={s} onPress={() => toggleSymptom(null, s, 'emotional')}
                    style={[styles.chipWrapItem, log.emotional.includes(s) && { backgroundColor: Colors.purpleLight, borderColor: Colors.purple }]}>
                    <Text style={[styles.chipText, log.emotional.includes(s) && { color: Colors.purple, fontWeight: '600' }]}>
                      {t(s, lang)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            {/* Sleep */}
            <SectionCard title={lang === 'ta' ? 'தூக்கம்' : 'Sleep'}>
              <View style={styles.chipRow}>
                {SLEEP_QUALITY.map(q => (
                  <Pressable key={q.key} onPress={() => { setLog(p => ({ ...p, sleepQuality: q.key })); setSaved(false); }}
                    style={[styles.chip, log.sleepQuality === q.key && styles.chipActive]}>
                    <Text style={[styles.chipText, log.sleepQuality === q.key && styles.chipTextActive]}>
                      {q.label[lang] || q.label.en}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                style={styles.sleepInput}
                placeholder={lang === 'ta' ? 'மணி நேரம் (எ.கா. 7.5)' : 'Hours slept (e.g. 7.5)'}
                keyboardType="decimal-pad"
                value={log.sleepHours}
                onChangeText={v => { setLog(p => ({ ...p, sleepHours: v })); setSaved(false); }}
                placeholderTextColor={Colors.textMuted}
              />
            </SectionCard>

            {/* Notes */}
            <SectionCard title={lang === 'ta' ? 'குறிப்புகள்' : 'Notes'}>
              <TextInput
                style={styles.notesInput}
                placeholder={t('notesPlaceholder', lang)}
                multiline
                value={log.notes}
                onChangeText={v => { setLog(p => ({ ...p, notes: v })); setSaved(false); }}
                placeholderTextColor={Colors.textMuted}
              />
            </SectionCard>

            <Pressable onPress={saveLog} style={styles.saveBtn}>
              <LinearGradient colors={Gradients.primary} style={styles.saveBtnInner}>
                <MaterialCommunityIcons name={saved ? 'check' : 'content-save-outline'} size={20} color={Colors.white} />
                <Text style={styles.saveBtnText}>{saved ? (lang === 'ta' ? 'பதிவு சேமிக்கப்பட்டது ✓' : 'Log saved ✓') : t('saveLog', lang)}</Text>
              </LinearGradient>
            </Pressable>
          </>
        ) : (
          // Cycle tab
          <>
            {phase && state.cycleInfo && (
              <LinearGradient colors={phase.gradient} style={styles.phaseCard}>
                <Text style={styles.phaseEmoji}>{phase.emoji}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.phaseName, { color: phase.color }]}>{phase.name[lang] || phase.name.en}</Text>
                  <Text style={styles.phaseDesc}>{phase.description[lang] || phase.description.en}</Text>
                </View>
              </LinearGradient>
            )}

            {state.cycleInfo && (
              <View style={styles.cycleStatsCard}>
                <StatItem icon="calendar-today" label={lang === 'ta' ? 'சுழற்சி நாள்' : 'Cycle Day'} value={String(state.cycleInfo.dayOfCycle)} color={Colors.teal} />
                <StatItem icon="calendar-arrow-right" label={lang === 'ta' ? 'அடுத்த மாதவிடாய்' : 'Next period'} value={`${state.cycleInfo.daysUntilNext} ${lang === 'ta' ? 'நாட்கள்' : 'days'}`} color={Colors.pink} />
                <StatItem icon="calendar-range" label={lang === 'ta' ? 'சுழற்சி நீளம்' : 'Cycle length'} value={`${state.cycleInfo.cycleLength} ${lang === 'ta' ? 'நாட்கள்' : 'days'}`} color={Colors.purple} />
              </View>
            )}

            {phase && (
              <SectionCard title={lang === 'ta' ? 'இந்த நிலையில் குறிப்புகள்' : 'Phase tips'}>
                {phase.tips.map((tip, i) => (
                  <View key={i} style={styles.tipRow}>
                    <Text style={styles.tipDot}>✦</Text>
                    <Text style={styles.phTipText}>{tip[lang] || tip.en}</Text>
                  </View>
                ))}
              </SectionCard>
            )}

            <SectionCard title={lang === 'ta' ? 'சுழற்சி அமைப்பு' : 'Cycle Setup'}>
              <Text style={styles.inputLabel}>{lang === 'ta' ? 'கடைசி மாதவிடாய் தொடக்கம் (YYYY-MM-DD)' : 'Last period start (YYYY-MM-DD)'}</Text>
              <TextInput
                style={styles.input}
                placeholder="2024-01-15"
                value={lastPeriodInput}
                onChangeText={setLastPeriodInput}
                keyboardType="numbers-and-punctuation"
                placeholderTextColor={Colors.textMuted}
              />
              <Text style={styles.inputLabel}>{lang === 'ta' ? 'சராசரி சுழற்சி நீளம் (நாட்கள்)' : 'Average cycle length (days)'}</Text>
              <TextInput
                style={styles.input}
                placeholder="28"
                value={cycleLengthInput}
                onChangeText={setCycleLengthInput}
                keyboardType="number-pad"
                placeholderTextColor={Colors.textMuted}
              />
              <Pressable onPress={saveCycle} style={styles.saveBtn}>
                <LinearGradient colors={Gradients.primary} style={styles.saveBtnInner}>
                  <Text style={styles.saveBtnText}>{lang === 'ta' ? 'சேமி' : 'Save cycle data'}</Text>
                </LinearGradient>
              </Pressable>
            </SectionCard>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function SectionCard({ title, children }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function StatItem({ icon, label, value, color }) {
  return (
    <View style={styles.statItem}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.teal },
  tabText: { ...Typography.label, color: Colors.textSecondary },
  tabTextActive: { color: Colors.teal },

  scroll: { flex: 1 },
  content: { padding: Spacing.base, gap: Spacing.md },

  phaseCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 16, borderRadius: Radius.xl, ...Shadow.sm,
  },
  phaseEmoji: { fontSize: 32 },
  phaseName: { ...Typography.h4, marginBottom: 4 },
  phaseDesc: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 20 },

  cycleStatsCard: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 16, ...Shadow.sm, justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { ...Typography.h3, color: Colors.textPrimary, marginTop: 4 },
  statLabel: { ...Typography.tiny, color: Colors.textSecondary, textAlign: 'center' },

  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 6 },
  tipDot: { color: Colors.pink, fontSize: 10, marginTop: 4 },
  phTipText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  sectionCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 12 },

  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem: { alignItems: 'center', gap: 4 },
  moodCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.divider,
  },
  moodEmoji: { fontSize: 24 },
  moodLabel: { ...Typography.tiny, color: Colors.textSecondary },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.full,
    backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.divider,
  },
  chipActive: { backgroundColor: Colors.tealLight, borderColor: Colors.teal },
  chipText: { ...Typography.label, color: Colors.textSecondary },
  chipTextActive: { color: Colors.teal },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipWrapItem: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.full,
    backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.divider,
  },

  sleepInput: {
    marginTop: 12, backgroundColor: Colors.bg, borderRadius: Radius.md,
    padding: 12, ...Typography.body, color: Colors.textPrimary,
    borderWidth: 1, borderColor: Colors.divider,
  },
  notesInput: {
    backgroundColor: Colors.bg, borderRadius: Radius.md, padding: 12,
    ...Typography.body, color: Colors.textPrimary, minHeight: 80,
    textAlignVertical: 'top', borderWidth: 1, borderColor: Colors.divider,
  },

  inputLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6, marginTop: 4 },
  input: {
    backgroundColor: Colors.bg, borderRadius: Radius.md, padding: 12,
    ...Typography.body, color: Colors.textPrimary, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.divider,
  },

  saveBtn: { marginTop: 16, borderRadius: Radius.lg, overflow: 'hidden' },
  saveBtnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  saveBtnText: { ...Typography.h4, color: Colors.white },
});
