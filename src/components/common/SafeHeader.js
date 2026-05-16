import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Gradients } from '../../theme';

export default function SafeHeader({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRightPress,
  gradient = false,
  light = false,
}) {
  const insets = useSafeAreaInsets();
  const bg = gradient ? Gradients.primary : [Colors.white, Colors.white];
  const textColor = gradient ? Colors.white : Colors.textPrimary;
  const subColor = gradient ? 'rgba(255,255,255,0.85)' : Colors.textSecondary;
  const iconColor = gradient ? Colors.white : Colors.textPrimary;

  const HeaderInner = (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={12}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={iconColor} />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={[styles.subtitle, { color: subColor }]} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
        {rightIcon ? (
          <Pressable onPress={onRightPress} style={styles.rightBtn} hitSlop={12}>
            <MaterialCommunityIcons name={rightIcon} size={24} color={iconColor} />
          </Pressable>
        ) : (
          <View style={styles.rightBtn} />
        )}
      </View>
    </View>
  );

  if (gradient) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={Colors.tealDark} />
        <LinearGradient colors={bg} style={styles.gradientWrap}>
          {HeaderInner}
        </LinearGradient>
      </>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={[styles.gradientWrap, { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider }]}>
        {HeaderInner}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gradientWrap: {},
  container: { paddingBottom: 12, paddingHorizontal: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  rightBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  titleArea: { flex: 1, alignItems: 'center' },
  title: { ...Typography.h3 },
  subtitle: { ...Typography.caption, marginTop: 2 },
});
