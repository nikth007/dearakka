import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import { C } from '../theme/colors';
import { MiniPetal } from './NaadhiArc';

const MASCOT = require('../../assets/akka-mascot.jpg');

const PHASE_GLOW = {
  menstrual:  C.menstrualSoft,
  follicular: C.follicularSoft,
  ovulation:  C.ovulationSoft,
  luteal:     C.lutealSoft,
  none:       C.follicularSoft,
};

export default function Akka({ phase = 'none', size = 56, animated = true, style, showPetal = false }) {
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated]);

  const translateY = breathe.interpolate({ inputRange: [0, 1], outputRange: [0, -1.5] });
  const scale = breathe.interpolate({ inputRange: [0, 1], outputRange: [1, 1.015] });
  const glowColor = PHASE_GLOW[phase] || PHASE_GLOW.none;

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      {/* phase glow ring */}
      <View style={{
        position: 'absolute',
        width: size + 6, height: size + 6,
        borderRadius: (size + 6) / 2,
        backgroundColor: glowColor,
      }} />
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        <Image
          source={MASCOT}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      </Animated.View>
      {showPetal && (
        <View style={{ position: 'absolute', bottom: -2, right: -2 }}>
          <MiniPetal phase={phase} size={16} />
        </View>
      )}
    </View>
  );
}
