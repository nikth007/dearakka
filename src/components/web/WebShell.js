import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { Colors, Typography } from '../../theme';

export default function WebShell({ children }) {
  if (Platform.OS !== 'web') return children;

  return (
    <View style={styles.root}>
      {/* Top nav bar */}
      <View style={styles.navbar}>
        <Text style={styles.navLogo}>👩‍⚕️ Dear Akka</Text>
        <Text style={styles.navBy}>by Sundaram Medical Foundation</Text>
      </View>

      {/* Main content */}
      <View style={styles.body}>
        {/* Left brand sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sideTitle}>Your personal{'\n'}women's health{'\n'}companion</Text>
          <View style={styles.divider} />
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureDot}>✦</Text>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
          <View style={styles.privacyBox}>
            <Text style={styles.privacyText}>🔒 All data stays on your device. Nothing is shared externally.</Text>
          </View>
        </View>

        {/* Phone frame */}
        <View style={styles.phoneOuter}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneBrow}>
              <View style={styles.phoneSpeaker} />
            </View>
            <View style={styles.phoneScreen}>
              {children}
            </View>
            <View style={styles.phoneChrome} />
          </View>
        </View>

        {/* Right info sidebar */}
        <View style={styles.sidebar}>
          {INFO.map((card, i) => (
            <View key={i} style={styles.infoCard}>
              <Text style={styles.infoEmoji}>{card.emoji}</Text>
              <Text style={styles.infoTitle}>{card.title}</Text>
              <Text style={styles.infoText}>{card.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Sundaram Medical Foundation · SMF Helpline: 044 3569 3070</Text>
      </View>
    </View>
  );
}

const FEATURES = [
  '7 women\'s health conditions explained',
  'Cycle, mood & symptom tracking',
  'Card-based self-assessments',
  'Breast self-examination guide',
  'Health myths busted',
  'SMF clinic & emergency info',
];

const INFO = [
  { emoji: '📱', title: 'Also on mobile', text: 'Install Dear Akka on Android or iOS for push reminders and offline access.' },
  { emoji: '💬', title: 'WhatsApp Akka', text: 'Chat with Dear Akka on WhatsApp at 044 3569 3070' },
  { emoji: '🏥', title: 'SMF Helpline', text: '044 3569 3070\nFree screenings & consultations' },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F0FDF9',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2F8F4',
  },
  navLogo: { fontSize: 18, fontWeight: '800', color: Colors.teal },
  navBy: { fontSize: 12, color: Colors.textSecondary },

  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 32,
  },

  sidebar: {
    width: 220,
    paddingHorizontal: 16,
    gap: 12,
  },
  sideTitle: { fontSize: 20, fontWeight: '700', color: Colors.teal, lineHeight: 28 },
  divider: { height: 2, backgroundColor: Colors.tealLight, width: 40, borderRadius: 2 },
  featureRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  featureDot: { color: Colors.teal, fontSize: 10, marginTop: 2 },
  featureText: { fontSize: 13, color: Colors.textPrimary, flex: 1, lineHeight: 18 },
  privacyBox: {
    backgroundColor: Colors.tealLight,
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  privacyText: { fontSize: 12, color: Colors.tealDark, lineHeight: 17 },

  phoneOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  phoneFrame: {
    width: 375,
    height: 750,
    backgroundColor: '#1C1C1E',
    borderRadius: 48,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 30,
  },
  phoneBrow: {
    width: 355,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneSpeaker: {
    width: 70,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3A3A3C',
  },
  phoneScreen: {
    flex: 1,
    width: 355,
    borderRadius: 38,
    overflow: 'hidden',
    backgroundColor: '#FFF0F5',
  },
  phoneChrome: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3A3A3C',
    marginTop: 8,
  },

  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoEmoji: { fontSize: 22 },
  infoTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  infoText: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },

  footer: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E2F8F4',
    alignItems: 'center',
  },
  footerText: { fontSize: 12, color: Colors.textMuted },
});
