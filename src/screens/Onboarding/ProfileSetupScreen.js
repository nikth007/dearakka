import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Gradients, Radius, Spacing, Shadow } from '../../theme';
import { useApp } from '../../context/AppContext';
import { saveProfile, setOnboarded, saveCycleData } from '../../utils/storage';
import { computeCycleInfo } from '../../utils/cycleCalc';
import { t } from '../../data/strings';

const IS_WEB = Platform.OS === 'web';

export default function ProfileSetupScreen({ route }) {
  const lang = route.params?.lang || 'en';
  const { dispatch } = useApp();
  const insets = useSafeAreaInsets();

  // Web starts at step -1 (email), native starts at 0
  const [step, setStep] = useState(IS_WEB ? -1 : 0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');

  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function finish() {
    if (step === -1) {
      if (!email.trim() || !validateEmail(email.trim())) {
        Alert.alert('', 'Please enter a valid email address');
        return;
      }
      setStep(0); return;
    }
    if (step === 0 && !name.trim()) {
      Alert.alert('', lang === 'ta' ? 'பெயரை உள்ளிடவும்' : 'Please enter your name'); return;
    }
    if (step === 1 && (!age || isNaN(parseInt(age)))) {
      Alert.alert('', lang === 'ta' ? 'வயதை உள்ளிடவும்' : 'Please enter your age'); return;
    }
    if (step < 2) { setStep(s => s + 1); return; }

    const profile = { name: name.trim(), age: parseInt(age), lang, ...(IS_WEB && email ? { email: email.trim() } : {}) };
    const cl = parseInt(cycleLength, 10) || 28;
    const cycleData = { lastPeriodStart: lastPeriod || null, cycleLength: cl, periodDates: [] };

    await saveProfile(profile);
    await saveCycleData(cycleData);
    await setOnboarded();

    dispatch({ type: 'SET_PROFILE', payload: profile });
    dispatch({ type: 'SET_LANG', payload: lang });
    if (cycleData.lastPeriodStart) dispatch({ type: 'SET_CYCLE', payload: cycleData });
    dispatch({ type: 'SET_ONBOARDED' });
  }

  const emailStep = {
    emoji: '✉️',
    title: 'Sign in with your email',
    content: (
      <View style={{ gap: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
          placeholderTextColor={Colors.textMuted}
        />
        <Text style={styles.skipNote}>
          Your email stays on your device. We don't send any emails.
        </Text>
      </View>
    ),
  };

  const mainSteps = [
    {
      emoji: '💗',
      title: t('whatsYourName', lang),
      content: (
        <TextInput
          style={styles.input}
          placeholder={t('namePlaceholder', lang)}
          value={name}
          onChangeText={setName}
          autoFocus
          placeholderTextColor={Colors.textMuted}
        />
      ),
    },
    {
      emoji: '🌸',
      title: t('howOldAreYou', lang),
      content: (
        <TextInput
          style={styles.input}
          placeholder={t('agePlaceholder', lang)}
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          autoFocus
          placeholderTextColor={Colors.textMuted}
        />
      ),
    },
    {
      emoji: '📅',
      title: t('lastPeriod', lang),
      content: (
        <View style={{ gap: 12 }}>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD (e.g. 2024-12-01)"
            value={lastPeriod}
            onChangeText={setLastPeriod}
            keyboardType="numbers-and-punctuation"
            placeholderTextColor={Colors.textMuted}
          />
          <Text style={styles.inputLabel}>{t('avgCycleLength', lang)}</Text>
          <TextInput
            style={styles.input}
            placeholder="28"
            value={cycleLength}
            onChangeText={setCycleLength}
            keyboardType="number-pad"
            placeholderTextColor={Colors.textMuted}
          />
          <Text style={styles.skipNote}>
            {lang === 'ta' ? 'நீங்கள் இதை பின்னர் Track tab-இல் சேர்க்கலாம்' : 'You can add this later in the Track tab'}
          </Text>
        </View>
      ),
    },
  ];

  const allSteps = IS_WEB ? [emailStep, ...mainSteps] : mainSteps;
  const displayStep = IS_WEB ? step + 1 : step; // index into allSteps
  const current = allSteps[displayStep] || allSteps[0];
  const totalDots = allSteps.length;
  const dotIndex = IS_WEB ? step + 1 : step;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.root}>
        <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
          {/* Progress dots */}
          <View style={styles.progressDots}>
            {allSteps.map((_, i) => (
              <View key={i} style={[styles.dot, i === dotIndex && styles.dotActive, i < dotIndex && styles.dotDone]} />
            ))}
          </View>

          <Text style={styles.emoji}>{current.emoji}</Text>
          <Text style={styles.title}>{current.title}</Text>

          <View style={styles.inputContainer}>
            {current.content}
          </View>

          <View style={styles.btnRow}>
            {step > (IS_WEB ? -1 : 0) && (
              <Pressable onPress={() => setStep(s => s - 1)} style={styles.backBtn}>
                <MaterialCommunityIcons name="arrow-left" size={20} color={Colors.teal} />
                <Text style={styles.backBtnText}>{t('back', lang)}</Text>
              </Pressable>
            )}
            <Pressable onPress={finish} style={{ flex: 1 }}>
              <LinearGradient colors={Gradients.primary} style={styles.nextBtn}>
                <Text style={styles.nextBtnText}>
                  {step < 2 ? t('next', lang) : t('done', lang)}
                </Text>
                <MaterialCommunityIcons name={step < 2 ? 'arrow-right' : 'check'} size={20} color={Colors.white} />
              </LinearGradient>
            </Pressable>
          </View>

          {step === 2 && (
            <Pressable onPress={finish} style={styles.skipBtn}>
              <Text style={styles.skipBtnText}>{lang === 'ta' ? 'இப்போது தவிர்' : 'Skip for now'}</Text>
            </Pressable>
          )}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, gap: Spacing.xl, alignItems: 'center' },
  progressDots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.divider },
  dotActive: { width: 24, backgroundColor: Colors.teal },
  dotDone: { backgroundColor: Colors.tealMid },
  emoji: { fontSize: 48 },
  title: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  inputContainer: { width: '100%' },
  input: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16,
    ...Typography.h4, color: Colors.textPrimary, ...Shadow.sm,
    borderWidth: 1, borderColor: Colors.divider,
  },
  inputLabel: { ...Typography.label, color: Colors.textSecondary, marginTop: 4, marginBottom: 6 },
  skipNote: { ...Typography.caption, color: Colors.textMuted, textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 12, width: '100%' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 15, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.teal },
  backBtnText: { ...Typography.label, color: Colors.teal },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: Radius.lg },
  nextBtnText: { ...Typography.h4, color: Colors.white },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipBtnText: { ...Typography.label, color: Colors.textSecondary },
});
