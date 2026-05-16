import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Gradients, Radius, Spacing } from '../../theme';
import { useApp } from '../../context/AppContext';

export default function LanguageScreen({ navigation }) {
  const { dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);

  function proceed() {
    if (!selected) return;
    dispatch({ type: 'SET_LANG', payload: selected });
    navigation.navigate('ProfileSetup', { lang: selected });
  }

  return (
    <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.root}>
      <View style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.emoji}>🌐</Text>
        <Text style={styles.title}>Choose your language</Text>
        <Text style={styles.ta}>மொழியைத் தேர்ந்தெடுக்கவும்</Text>

        <View style={styles.options}>
          <Pressable onPress={() => setSelected('en')}
            style={[styles.option, selected === 'en' && styles.optionActive]}>
            <Text style={styles.flag}>🇬🇧</Text>
            <View>
              <Text style={[styles.optionTitle, selected === 'en' && { color: Colors.teal }]}>English</Text>
              <Text style={styles.optionSub}>All content in English</Text>
            </View>
            {selected === 'en' && <View style={styles.checkmark}><Text>✓</Text></View>}
          </Pressable>

          <Pressable onPress={() => setSelected('ta')}
            style={[styles.option, selected === 'ta' && styles.optionActive]}>
            <Text style={styles.flag}>🇮🇳</Text>
            <View>
              <Text style={[styles.optionTitle, selected === 'ta' && { color: Colors.teal }]}>தமிழ்</Text>
              <Text style={styles.optionSub}>அனைத்து உள்ளடக்கமும் தமிழில்</Text>
            </View>
            {selected === 'ta' && <View style={styles.checkmark}><Text>✓</Text></View>}
          </Pressable>
        </View>

        <Text style={styles.note}>You can change this anytime in Profile • Profile-இல் எப்போதும் மாற்றலாம்</Text>

        <Pressable onPress={proceed} style={{ opacity: selected ? 1 : 0.4 }} disabled={!selected}>
          <LinearGradient colors={Gradients.primary} style={styles.btn}>
            <Text style={styles.btnText}>{selected === 'ta' ? 'தொடர்க' : 'Continue'}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.base, alignItems: 'center', justifyContent: 'center', gap: Spacing.lg },
  emoji: { fontSize: 48 },
  title: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  ta: { ...Typography.h4, color: Colors.textSecondary, textAlign: 'center', marginTop: -8 },
  options: { width: '100%', gap: 12 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: 18,
    borderWidth: 2, borderColor: Colors.divider,
  },
  optionActive: { borderColor: Colors.teal, backgroundColor: Colors.tealLight + '66' },
  flag: { fontSize: 28 },
  optionTitle: { ...Typography.h4, color: Colors.textPrimary },
  optionSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  checkmark: {
    marginLeft: 'auto', width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center',
  },
  note: { ...Typography.tiny, color: Colors.textMuted, textAlign: 'center' },
  btn: { width: 280, alignItems: 'center', paddingVertical: 15, borderRadius: Radius.lg },
  btnText: { ...Typography.h4, color: Colors.white },
});
