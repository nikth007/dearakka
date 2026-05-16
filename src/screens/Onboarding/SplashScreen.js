import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '../../theme';

export default function SplashScreen() {
  return (
    <LinearGradient colors={['#FFF0F5', '#F0FDFA']} style={styles.root}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>👩‍⚕️</Text>
        <Text style={styles.title}>Dear Akka</Text>
        <Text style={styles.sub}>Sundaram Medical Foundation</Text>
        <ActivityIndicator size="small" color={Colors.teal} style={{ marginTop: 32 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { ...Typography.display, color: Colors.teal, marginBottom: 8 },
  sub: { ...Typography.body, color: Colors.textSecondary },
});
