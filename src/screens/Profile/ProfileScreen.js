import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  TextInput, Switch, Alert, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Gradients, Radius, Spacing, Shadow } from '../../theme';
import { useApp } from '../../context/AppContext';
import { saveProfile, clearAll } from '../../utils/storage';
import { t } from '../../data/strings';

function SectionHeader({ label }) {
  return <Text style={styles.sectionHeader}>{label}</Text>;
}

function RowItem({ icon, iconColor = Colors.teal, label, value, onPress, right, danger }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      <View style={[styles.rowIcon, { backgroundColor: (iconColor || Colors.teal) + '22' }]}>
        <MaterialCommunityIcons name={icon} size={20} color={iconColor || Colors.teal} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, danger && { color: Colors.red }]}>{label}</Text>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      </View>
      {right || <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />}
    </Pressable>
  );
}

export default function ProfileScreen({ navigation }) {
  const { state, dispatch } = useApp();
  const lang = state.lang || 'en';
  const profile = state.profile || {};
  const insets = useSafeAreaInsets();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name || '');
  const [editAge, setEditAge] = useState(profile.age ? String(profile.age) : '');
  const [notifEnabled, setNotifEnabled] = useState(true);

  async function saveEdits() {
    if (!editName.trim()) {
      Alert.alert('', lang === 'ta' ? 'பெயரை உள்ளிடவும்' : 'Please enter your name');
      return;
    }
    const updated = { ...profile, name: editName.trim(), age: parseInt(editAge) || profile.age };
    await saveProfile(updated);
    dispatch({ type: 'SET_PROFILE', payload: updated });
    setEditing(false);
  }

  function switchLang(newLang) {
    dispatch({ type: 'SET_LANG', payload: newLang });
    saveProfile({ ...profile, lang: newLang });
    Alert.alert('', newLang === 'ta' ? 'மொழி மாற்றப்பட்டது' : 'Language updated');
  }

  function confirmClearData() {
    Alert.alert(
      lang === 'ta' ? 'அனைத்து தரவையும் அழிக்கவா?' : 'Clear all data?',
      lang === 'ta'
        ? 'இது உங்கள் சுயவிவரம், சுழற்சி தரவு மற்றும் மதிப்பீடுகளை அழிக்கும். இதை செயல்தவிர்க்க முடியாது.'
        : 'This will erase your profile, cycle data, and assessments. This cannot be undone.',
      [
        { text: lang === 'ta' ? 'ரத்து' : 'Cancel', style: 'cancel' },
        {
          text: lang === 'ta' ? 'அழி' : 'Clear', style: 'destructive',
          onPress: async () => {
            await clearAll();
            dispatch({ type: 'CLEAR_ALL' });
          },
        },
      ]
    );
  }

  const initials = (profile.name || 'A').slice(0, 2).toUpperCase();
  const badgeCount = Object.keys(state.badges || {}).length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.header}>
        <View style={styles.avatarWrap}>
          <LinearGradient colors={Gradients.primary} style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          {badgeCount > 0 && (
            <View style={styles.badgePill}>
              <MaterialCommunityIcons name="medal" size={12} color={Colors.gold} />
              <Text style={styles.badgePillText}>{badgeCount}</Text>
            </View>
          )}
        </View>

        {editing ? (
          <View style={styles.editForm}>
            <TextInput
              style={styles.editInput}
              value={editName}
              onChangeText={setEditName}
              placeholder={t('namePlaceholder', lang)}
              placeholderTextColor={Colors.textMuted}
              autoFocus
            />
            <TextInput
              style={styles.editInput}
              value={editAge}
              onChangeText={setEditAge}
              placeholder={t('agePlaceholder', lang)}
              placeholderTextColor={Colors.textMuted}
              keyboardType="number-pad"
            />
            <View style={styles.editBtns}>
              <Pressable onPress={() => setEditing(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>{t('back', lang)}</Text>
              </Pressable>
              <Pressable onPress={saveEdits} style={{ flex: 1 }}>
                <LinearGradient colors={Gradients.primary} style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>{t('done', lang)}</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.nameRow}>
            <View>
              <Text style={styles.profileName}>{profile.name || 'Akka'}</Text>
              {profile.age ? (
                <Text style={styles.profileAge}>{lang === 'ta' ? `${profile.age} வயது` : `Age ${profile.age}`}</Text>
              ) : null}
            </View>
            <Pressable onPress={() => setEditing(true)} style={styles.editIconBtn}>
              <MaterialCommunityIcons name="pencil" size={18} color={Colors.teal} />
            </Pressable>
          </View>
        )}

        {state.streak > 0 && (
          <View style={styles.streakRow}>
            <MaterialCommunityIcons name="fire" size={16} color={Colors.gold} />
            <Text style={styles.streakText}>
              {state.streak} {lang === 'ta' ? 'நாள் தொடர்ச்சி' : 'day streak'}
            </Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        {/* Language */}
        <SectionHeader label={lang === 'ta' ? 'மொழி' : 'Language'} />
        <View style={styles.card}>
          <Pressable
            onPress={() => switchLang('en')}
            style={[styles.langOption, lang === 'en' && styles.langOptionActive]}
          >
            <Text style={styles.langFlag}>🇬🇧</Text>
            <Text style={[styles.langLabel, lang === 'en' && { color: Colors.teal, fontWeight: '700' }]}>English</Text>
            {lang === 'en' && <MaterialCommunityIcons name="check-circle" size={18} color={Colors.teal} style={{ marginLeft: 'auto' }} />}
          </Pressable>
          <View style={styles.langDivider} />
          <Pressable
            onPress={() => switchLang('ta')}
            style={[styles.langOption, lang === 'ta' && styles.langOptionActive]}
          >
            <Text style={styles.langFlag}>🇮🇳</Text>
            <Text style={[styles.langLabel, lang === 'ta' && { color: Colors.teal, fontWeight: '700' }]}>தமிழ்</Text>
            {lang === 'ta' && <MaterialCommunityIcons name="check-circle" size={18} color={Colors.teal} style={{ marginLeft: 'auto' }} />}
          </Pressable>
        </View>

        {/* Notifications */}
        <SectionHeader label={lang === 'ta' ? 'அறிவிப்புகள்' : 'Notifications'} />
        <View style={styles.card}>
          <RowItem
            icon="bell-outline"
            label={lang === 'ta' ? 'ஆரோக்கிய நினைவூட்டல்கள்' : 'Health Reminders'}
            right={
              <Switch
                value={notifEnabled}
                onValueChange={setNotifEnabled}
                trackColor={{ false: Colors.divider, true: Colors.teal }}
                thumbColor={Colors.white}
              />
            }
          />
        </View>

        {/* About */}
        <SectionHeader label={lang === 'ta' ? 'பற்றி' : 'About'} />
        <View style={styles.card}>
          <RowItem
            icon="information-outline"
            label={lang === 'ta' ? 'Dear Akka பற்றி' : 'About Dear Akka'}
            onPress={() =>
              Alert.alert(
                'Dear Akka',
                lang === 'ta'
                  ? 'Sundaram Medical Foundation (SMF) உருவாக்கிய பெண்கள் ஆரோக்கிய செயலி. அனைத்து தரவும் உங்கள் தொலைபேசியிலேயே பாதுகாப்பாக சேமிக்கப்படும்.'
                  : "Dear Akka is a women's health companion by Sundaram Medical Foundation (SMF). All your data is stored safely on your device — nothing is shared externally.",
                [{ text: 'OK' }]
              )
            }
          />
          <RowItem
            icon="phone-outline"
            iconColor={Colors.green}
            label={lang === 'ta' ? 'SMF உதவி எண்' : 'SMF Helpline'}
            value="044 3569 3070"
            onPress={() => Linking.openURL('tel:04435693070')}
          />
          <RowItem
            icon="whatsapp"
            iconColor="#25D366"
            label={lang === 'ta' ? 'WhatsApp-இல் Dear Akka' : 'Dear Akka on WhatsApp'}
            value="044 3569 3070"
            onPress={() => Linking.openURL('https://wa.me/914435693070')}
          />
          <RowItem
            icon="web"
            iconColor={Colors.purple}
            label={lang === 'ta' ? 'SMF இணையதளம்' : 'SMF Website'}
            onPress={() => Linking.openURL('https://www.smfonline.org')}
          />
        </View>

        {/* Privacy */}
        <View style={styles.privacyCard}>
          <MaterialCommunityIcons name="shield-check" size={20} color={Colors.teal} />
          <Text style={styles.privacyText}>
            {lang === 'ta'
              ? 'உங்கள் அனைத்து தரவும் உங்கள் தொலைபேசியில் மட்டுமே சேமிக்கப்படுகிறது. எந்த சேவையகத்திலும் அனுப்பப்படுவதில்லை.'
              : 'All your data is stored only on your phone. Nothing is sent to any server or shared externally.'}
          </Text>
        </View>

        {/* Danger zone */}
        <SectionHeader label={lang === 'ta' ? 'தரவு' : 'Data'} />
        <View style={styles.card}>
          <RowItem
            icon="delete-outline"
            iconColor={Colors.red}
            label={lang === 'ta' ? 'அனைத்து தரவையும் அழி' : 'Clear All Data'}
            danger
            onPress={confirmClearData}
          />
        </View>

        <Text style={styles.version}>Dear Akka v1.0 · Sundaram Medical Foundation</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background || '#FAF9F7' },
  header: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl, paddingTop: Spacing.base, gap: 12 },
  avatarWrap: { alignSelf: 'center', position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.white },
  badgePill: {
    position: 'absolute', bottom: -4, right: -8,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2,
    ...Shadow.sm,
  },
  badgePillText: { ...Typography.tiny, color: Colors.gold, fontWeight: '700' },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  profileName: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  profileAge: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
  editIconBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center',
  },
  streakRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  streakText: { ...Typography.label, color: Colors.gold },
  editForm: { gap: 10 },
  editInput: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 14,
    ...Typography.bodyMd, color: Colors.textPrimary, ...Shadow.sm,
    borderWidth: 1, borderColor: Colors.divider,
  },
  editBtns: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    paddingHorizontal: 20, paddingVertical: 13, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.divider, alignItems: 'center',
  },
  cancelBtnText: { ...Typography.label, color: Colors.textSecondary },
  saveBtn: { paddingVertical: 13, borderRadius: Radius.lg, alignItems: 'center' },
  saveBtnText: { ...Typography.label, color: Colors.white },
  scroll: { flex: 1 },
  sectionHeader: { ...Typography.label, color: Colors.textMuted, paddingHorizontal: Spacing.base, marginTop: Spacing.lg, marginBottom: 6 },
  card: { marginHorizontal: Spacing.base, backgroundColor: Colors.white, borderRadius: Radius.xl, ...Shadow.sm, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  rowContent: { flex: 1 },
  rowLabel: { ...Typography.bodyMd, color: Colors.textPrimary },
  rowValue: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },
  langOption: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  langOptionActive: { backgroundColor: Colors.tealLight + '55' },
  langDivider: { height: 1, backgroundColor: Colors.divider, marginHorizontal: 14 },
  langFlag: { fontSize: 22 },
  langLabel: { ...Typography.bodyMd, color: Colors.textPrimary },
  privacyCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    marginHorizontal: Spacing.base, marginTop: Spacing.lg,
    backgroundColor: Colors.tealLight, borderRadius: Radius.lg, padding: 14,
  },
  privacyText: { ...Typography.caption, color: Colors.tealDark, flex: 1, lineHeight: 18 },
  version: { ...Typography.tiny, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.xl },
});
