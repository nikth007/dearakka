import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../theme/colors';
import Akka from './Akka';
import { MiniPetal } from './NaadhiArc';

export default function FloatingTabBar({ state, descriptors, navigation, phase }) {
  const insets = useSafeAreaInsets();
  const tabs = state.routes;

  const ICONS = {
    Home:    { label: 'Home',   icon: '⌂' },
    Track:   { label: 'Track',  icon: '◎' },
    Chat:    { label: 'Akka',   icon: null },  // uses photo
    Learn:   { label: 'Learn',  icon: '◈' },
    Care:    { label: 'Care',   icon: '♡' },
  };

  return (
    <View style={[styles.host, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.pill}>
        {tabs.map((route, i) => {
          const focused = state.index === i;
          const isChat = route.name === 'Chat';
          const info = ICONS[route.name] || { label: route.name, icon: '·' };

          if (isChat) {
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.chatBtn}
                onPress={() => navigation.navigate(route.name)}
                activeOpacity={0.85}
              >
                <Akka phase={phase} size={52} animated />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, focused && styles.tabActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, focused && { color: C.textPrimary }]}>
                {info.icon}
              </Text>
              <Text style={[styles.tabLabel, focused && { color: C.textPrimary, fontWeight: '600' }]}>
                {info.label}
              </Text>
              {focused && <MiniPetal phase={phase} size={10} style={styles.activePetal} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: C.bgElevated,
    borderRadius: 36,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 20,
    borderWidth: 1,
    borderColor: C.dividerMid,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 24,
    minWidth: 60,
    minHeight: 44,
  },
  tabActive: {
    backgroundColor: C.bgHighlight,
  },
  tabIcon: {
    fontSize: 16,
    color: C.textSecondary,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter',
    color: C.textSecondary,
    letterSpacing: 0.2,
  },
  activePetal: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  chatBtn: {
    marginHorizontal: 6,
    marginBottom: 6,
    shadowColor: C.follicular,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
});
