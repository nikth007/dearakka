import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Animated, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import Akka from '../components/Akka';
import { MiniPetal } from '../components/NaadhiArc';

const { width: SW } = Dimensions.get('window');

const SLIDES = [
  {
    phase: 'follicular',
    emoji: '🌿',
    title: 'Dear Akka',
    titleTa: 'Dear Akka',
    body: 'Your personal women\'s health companion — warm, private, and built for you by Sundaram Medical Foundation.',
    bodyTa: 'உங்கள் தனிப்பட்ட மகளிர் ஆரோக்கிய தோழி — Sundaram Medical Foundation கட்டமைத்தது.',
  },
  {
    phase: 'menstrual',
    emoji: '🌸',
    title: 'Your cycle, your data',
    titleTa: 'உங்கள் சுழற்சி, உங்கள் தரவு',
    body: 'Track your period, mood, symptoms and energy. Everything stays on your device — Dear Akka never shares your data.',
    bodyTa: 'மாதவிடாய், மனநிலை, அறிகுறிகளை பதிவு செய்யுங்கள். எல்லாம் உங்கள் சாதனத்திலேயே இருக்கும்.',
  },
  {
    phase: 'ovulation',
    emoji: '✨',
    title: 'Personalised predictions',
    titleTa: 'தனிப்பயனாக்கப்பட்ட கணிப்புகள்',
    body: 'The more you log, the more Dear Akka learns your rhythm. No two cycles are the same — it learns YOUR pattern.',
    bodyTa: 'நீங்கள் எவ்வளவு பதிவு செய்கிறீர்களோ, அவ்வளவு Dear Akka உங்கள் தாளத்தை அறியும்.',
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding, setLang, lang } = useApp();
  const l = lang || 'en';
  const [slide, setSlide] = useState(0);
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  function goNext() {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setSlide(s => s + 1);
  }

  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <LinearGradient
        colors={[C.bgMid, C.bg]}
        style={StyleSheet.absoluteFill}
      />

      {/* Lang toggle */}
      <View style={styles.langRow}>
        {['en', 'ta'].map(lg => (
          <TouchableOpacity
            key={lg}
            style={[styles.langBtn, l === lg && styles.langBtnActive]}
            onPress={() => setLang(lg)}
          >
            <Text style={[styles.langText, l === lg && { color: C.textPrimary }]}>
              {lg === 'en' ? 'EN' : 'தமிழ்'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {!isLast ? (
        <Animated.View style={[styles.slideContainer, { opacity: fadeAnim }]}>
          <Akka phase={current.phase} size={100} />
          <Text style={styles.emoji}>{current.emoji}</Text>
          <Text style={[T.h2, { textAlign: 'center', marginBottom: 16 }]}>
            {l === 'ta' ? current.titleTa : current.title}
          </Text>
          <Text style={[T.body, { textAlign: 'center', color: C.textSecondary, lineHeight: 26 }]}>
            {l === 'ta' ? current.bodyTa : current.body}
          </Text>

          {/* Step dots */}
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <View key={i} style={[styles.dot, slide === i && styles.dotActive]} />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={styles.nextBtnText}>
              {l === 'ta' ? 'அடுத்து' : 'Next'} →
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.slideContainer}>
          <Akka phase="follicular" size={80} />
          <Text style={[T.h2, { textAlign: 'center', marginTop: 20, marginBottom: 8 }]}>
            {l === 'ta' ? 'உங்கள் பெயர் என்ன?' : "What's your name?"}
          </Text>
          <Text style={[T.bodySmall, { textAlign: 'center', color: C.textSecondary, marginBottom: 24 }]}>
            {l === 'ta' ? 'Dear Akka உங்களை இப்பெயரில் வரவேற்கும்' : 'Dear Akka will greet you by this name'}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={l === 'ta' ? 'உங்கள் பெயர்...' : 'Your name...'}
            placeholderTextColor={C.textHint}
            style={styles.nameInput}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.nextBtn, !name.trim() && { opacity: 0.5 }]}
            onPress={() => name.trim() && completeOnboarding({ name: name.trim() })}
            disabled={!name.trim()}
          >
            <Text style={styles.nextBtnText}>
              {l === 'ta' ? 'தொடங்குங்கள் 🌿' : 'Get started 🌿'}
            </Text>
          </TouchableOpacity>
          <Text style={[T.caption, { textAlign: 'center', marginTop: 16 }]}>
            {l === 'ta' ? 'Sundaram Medical Foundation' : 'By Sundaram Medical Foundation'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 8,
  },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: C.bgMid },
  langBtnActive: { backgroundColor: C.bgHighlight },
  langText: { fontFamily: 'Inter', fontSize: 13, color: C.textSecondary },

  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: { fontSize: 40, marginVertical: 16 },
  dots: { flexDirection: 'row', gap: 8, marginVertical: 28 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.bgHighlight },
  dotActive: { backgroundColor: C.follicular, width: 24 },

  nextBtn: {
    backgroundColor: C.follicular,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    marginTop: 8,
  },
  nextBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 17,
    color: C.white,
  },

  nameInput: {
    width: '100%',
    backgroundColor: C.bgMid,
    borderRadius: 16,
    padding: 18,
    color: C.textPrimary,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: C.follicularSoft,
  },
});
