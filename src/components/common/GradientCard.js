import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Shadow } from '../../theme';

export default function GradientCard({ children, colors, style, onPress, padded = true }) {
  const CardContent = (
    <LinearGradient
      colors={colors || ['#FFFFFF', '#F9FAFB']}
      style={[styles.card, padded && styles.padded, style]}
    >
      {children}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        {CardContent}
      </Pressable>
    );
  }
  return CardContent;
}

export function PlainCard({ children, style, onPress }) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.plainCard, style, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.plainCard, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    ...Shadow.md,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
  plainCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: 16,
    ...Shadow.sm,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
