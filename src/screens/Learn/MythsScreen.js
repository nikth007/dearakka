import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLang } from '../../context/AppContext';
import { HEALTH_MYTHS } from '../../data/selfCareContent';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import SafeHeader from '../../components/common/SafeHeader';

export default function MythsScreen({ navigation }) {
  const lang = useLang();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <SafeHeader title={lang === 'ta' ? 'மூடநம்பிக்கை vs உண்மை' : 'Myths vs Facts'} onBack={() => navigation.goBack()} gradient />
      <ScrollView contentContainerStyle={{ padding: Spacing.base, paddingBottom: insets.bottom + 24, gap: Spacing.md }}>
        {HEALTH_MYTHS.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.mythHeader}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.mythBadge}><Text style={styles.mythBadgeText}>{lang === 'ta' ? 'மூடநம்பிக்கை' : 'Myth'}</Text></View>
            </View>
            <Text style={styles.mythText}>{item.myth[lang] || item.myth.en}</Text>
            <View style={styles.divider}>
              <MaterialCommunityIcons name="check-circle" size={16} color={Colors.green} />
              <Text style={styles.factLabel}>{lang === 'ta' ? 'உண்மை' : 'Fact'}</Text>
            </View>
            <Text style={styles.factText}>{item.fact[lang] || item.fact.en}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 16, ...Shadow.sm },
  mythHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  emoji: { fontSize: 22 },
  mythBadge: { backgroundColor: Colors.redLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  mythBadgeText: { ...Typography.tiny, color: Colors.red, fontWeight: '700' },
  mythText: { ...Typography.body, color: Colors.textPrimary, fontStyle: 'italic', marginBottom: 12 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  factLabel: { ...Typography.label, color: Colors.green },
  factText: { ...Typography.bodyMd, color: Colors.textPrimary, lineHeight: 20 },
});
