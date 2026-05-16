import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, Typography } from '../../theme';

// Only wraps on web — on native, renders children directly
export default function WebShell({ children }) {
  if (Platform.OS !== 'web') return children;

  return (
    <View style={styles.backdrop}>
      {/* Left brand panel */}
      <View style={styles.brandPanel}>
        <Text style={styles.brandEmoji}>👩‍⚕️</Text>
        <Text style={styles.brandTitle}>Dear Akka</Text>
        <Text style={styles.brandTagline}>Your personal women's{'\n'}health companion</Text>
        <View style={styles.brandDivider} />
        <Text style={styles.brandBy}>By Sundaram Medical Foundation</Text>

        <View style={styles.featureList}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <Text style={styles.featureDot}>●</Text>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <View style={styles.privacyRow}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>All data stored locally.{'\n'}Nothing shared externally.</Text>
        </View>
      </View>

      {/* Phone frame */}
      <View style={styles.phoneFrame}>
        <View style={styles.phoneBrow}>
          <View style={styles.phoneSpeaker} />
        </View>
        <View style={styles.phoneScreen}>
          {children}
        </View>
        <View style={styles.phoneHome} />
      </View>

      {/* Right info panel */}
      <View style={styles.infoPanel}>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>📱</Text>
          <Text style={styles.infoTitle}>Also on mobile</Text>
          <Text style={styles.infoText}>Download the Dear Akka app on Android or iOS for the full experience with push reminders.</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>🤙</Text>
          <Text style={styles.infoTitle}>WhatsApp Akka</Text>
          <Text style={styles.infoText}>Chat with Dear Akka on WhatsApp at{'\n'}044 3569 3070</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>🏥</Text>
          <Text style={styles.infoTitle}>SMF Helpline</Text>
          <Text style={styles.infoText}>044 3569 3070{'\n'}Free screenings & consultations</Text>
        </View>
      </View>
    </View>
  );
}

const FEATURES = [
  '7 women\'s health conditions explained',
  'Track cycle, mood & symptoms daily',
  'Card-based self-assessments',
  'Breast self-examination guide',
  'Health myths busted',
  'SMF clinic & helpline info',
];

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF9',
    gap: 48,
    padding: 40,
    minHeight: '100vh',
  },
  brandPanel: {
    width: 260,
    gap: 12,
    alignItems: 'flex-start',
  },
  brandEmoji: { fontSize: 52 },
  brandTitle: { fontSize: 28, fontWeight: '800', color: Colors.teal },
  brandTagline: { ...Typography.bodyMd, color: Colors.textPrimary, lineHeight: 22 },
  brandDivider: { width: 40, height: 3, backgroundColor: Colors.teal, borderRadius: 2, marginVertical: 4 },
  brandBy: { ...Typography.caption, color: Colors.textSecondary },
  featureList: { marginTop: 8, gap: 8 },
  featureItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  featureDot: { color: Colors.teal, fontSize: 8, marginTop: 5 },
  featureText: { ...Typography.caption, color: Colors.textPrimary, flex: 1, lineHeight: 18 },
  privacyRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: Colors.tealLight, borderRadius: 10, padding: 10, marginTop: 8,
  },
  privacyIcon: { fontSize: 14 },
  privacyText: { ...Typography.tiny, color: Colors.tealDark, flex: 1, lineHeight: 16 },

  phoneFrame: {
    width: 390,
    height: 760,
    backgroundColor: '#1a1a1a',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 30,
    alignItems: 'center',
  },
  phoneBrow: {
    width: '100%', height: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  phoneSpeaker: {
    width: 80, height: 5, borderRadius: 3, backgroundColor: '#444',
  },
  phoneScreen: {
    flex: 1,
    width: '100%',
    borderRadius: 38,
    overflow: 'hidden',
    backgroundColor: '#FFF0F5',
  },
  phoneHome: {
    width: 120, height: 5, borderRadius: 3, backgroundColor: '#444', marginTop: 10,
  },

  infoPanel: {
    width: 220,
    gap: 16,
    alignItems: 'flex-start',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  infoEmoji: { fontSize: 24 },
  infoTitle: { ...Typography.label, color: Colors.textPrimary },
  infoText: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 18 },
});
