import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Gradients, Radius, Spacing } from '../../theme';

const FEATURES = [
  { icon: 'heart-pulse', color: Colors.pink, text: 'Know your body — 7 health conditions explained' },
  { icon: 'calendar-heart', color: Colors.teal, text: 'Track your cycle, mood and symptoms daily' },
  { icon: 'magnify-scan', color: Colors.purple, text: 'Self-assessments — not a chatbot, just trusted info' },
  { icon: 'bell-ring', color: Colors.gold, text: 'Reminders & IVRS calls from SMF Akka' },
];

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.root}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>👩‍⚕️</Text>
          <Text style={styles.title}>Dear Akka</Text>
          <Text style={styles.tagline}>Your personal women's health companion</Text>
          <Text style={styles.sub}>By Sundaram Medical Foundation</Text>
        </View>

        <View style={styles.features}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: f.color + '22' }]}>
                <MaterialCommunityIcons name={f.icon} size={22} color={f.color} />
              </View>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.privacyNote}>
          <MaterialCommunityIcons name="shield-check" size={16} color={Colors.teal} />
          <Text style={styles.privacyText}>Your data stays on your phone. Nothing is shared or stored externally.</Text>
        </View>

        <Pressable onPress={() => navigation.navigate('LanguageSelect')}>
          <LinearGradient colors={Gradients.primary} style={styles.btn}>
            <Text style={styles.btnText}>Get Started</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.white} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, gap: Spacing.xl },
  hero: { alignItems: 'center' },
  emoji: { fontSize: 72, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.teal, marginBottom: 6 },
  tagline: { ...Typography.h4, color: Colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  sub: { ...Typography.caption, color: Colors.textSecondary },
  features: { gap: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 12 },
  featureIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  featureText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1, lineHeight: 20 },
  privacyNote: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.tealLight, borderRadius: Radius.lg, padding: 12 },
  privacyText: { ...Typography.caption, color: Colors.tealDark, flex: 1, lineHeight: 16 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: Radius.lg },
  btnText: { ...Typography.h4, color: Colors.white },
});
