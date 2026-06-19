/**
 * NaadhiArc — The Dear Akka signature visual.
 *
 * A flowing organic arc (like a jasmine vine on a trellis) that travels the
 * full screen width. Four botanical forms grow from it at their phase positions.
 * A glowing dot marks TODAY on the arc and pulses gently.
 *
 * Rendered as react-native-svg. Animated with React Native Animated API.
 * No external dependencies beyond what the project already uses.
 */
import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, {
  Path, Circle, Ellipse, G, Defs, RadialGradient, Stop, ClipPath, Rect,
} from 'react-native-svg';
import { C } from '../theme/colors';

// ── Arc geometry ──────────────────────────────────────────────────────────
// ViewBox 375 × 200. The arc is a cubic Bézier: two curves joined at midpoint.
// Control points are tuned for a natural, vine-like sweep.
const VW = 375;
const VH = 200;
const ARC = `M 18 162 C 75 82, 145 178, 188 124 C 232 70, 302 160, 357 108`;

// Phase positions on the arc (x, y, and t 0-1 for pulse position)
const PHASES = [
  { key: 'menstrual',  x: 40,  y: 148, t: 0.03  },
  { key: 'follicular', x: 148, y: 158, t: 0.32  },
  { key: 'ovulation',  x: 188, y: 124, t: 0.50  },
  { key: 'luteal',     x: 308, y: 142, t: 0.80  },
];

const PHASE_COLOR = {
  menstrual:  C.menstrual,
  follicular: C.follicular,
  ovulation:  C.ovulation,
  luteal:     C.luteal,
};

// Interpolate a point on the 2-segment cubic Bézier path
function bezierPoint(t) {
  // Segment 1: M18,162 C75,82,145,178,188,124  (t=0..0.5 → s=0..1)
  // Segment 2: M188,124 C232,70,302,160,357,108 (t=0.5..1 → s=0..1)
  if (t <= 0.5) {
    const s = t * 2;
    const mt = 1 - s;
    return {
      x: mt*mt*mt*18   + 3*mt*mt*s*75   + 3*mt*s*s*145  + s*s*s*188,
      y: mt*mt*mt*162  + 3*mt*mt*s*82   + 3*mt*s*s*178  + s*s*s*124,
    };
  } else {
    const s = (t - 0.5) * 2;
    const mt = 1 - s;
    return {
      x: mt*mt*mt*188  + 3*mt*mt*s*232  + 3*mt*s*s*302  + s*s*s*357,
      y: mt*mt*mt*124  + 3*mt*mt*s*70   + 3*mt*s*s*160  + s*s*s*108,
    };
  }
}

// ── Botanical SVG components ──────────────────────────────────────────────

function RoseBud({ color, size = 28 }) {
  // Deep crimson rose bud: gathered petals, inward-facing. Menstrual phase.
  const s = size / 28;
  return (
    <G>
      {/* outer petals */}
      <Ellipse cx={0} cy={-6*s} rx={5*s} ry={8*s} fill={color} opacity={0.6} transform={`rotate(-25 0 0)`} />
      <Ellipse cx={0} cy={-6*s} rx={5*s} ry={8*s} fill={color} opacity={0.6} transform={`rotate(25 0 0)`} />
      {/* inner petals — tighter */}
      <Ellipse cx={0} cy={-5*s} rx={3.5*s} ry={7*s} fill={color} opacity={0.85} transform={`rotate(-10 0 0)`} />
      <Ellipse cx={0} cy={-5*s} rx={3.5*s} ry={7*s} fill={color} opacity={0.85} transform={`rotate(10 0 0)`} />
      {/* bud center */}
      <Ellipse cx={0} cy={-3*s} rx={2.5*s} ry={4*s} fill={color} />
      {/* stem */}
      <Path d={`M0 3 L0 ${10*s}`} stroke={color} strokeWidth={1.8*s} strokeLinecap="round" opacity={0.7} />
      {/* tiny leaf */}
      <Ellipse cx={3.5*s} cy={6*s} rx={3*s} ry={1.4*s} fill={color} opacity={0.5} transform={`rotate(-30 ${3.5*s} ${6*s})`} />
      {/* falling droplets */}
      <Circle cx={-6*s} cy={2*s}  r={1.2*s} fill={color} opacity={0.4} />
      <Circle cx={-8*s} cy={5*s}  r={0.9*s} fill={color} opacity={0.3} />
    </G>
  );
}

function Sprout({ color, size = 28 }) {
  // Fresh teal-green sprout with unfurling fronds. Follicular phase.
  const s = size / 28;
  return (
    <G>
      {/* stem */}
      <Path d={`M0 ${8*s} C0 0 -${2*s} -${6*s} -${1*s} -${10*s}`} stroke={color} strokeWidth={2.2*s} fill="none" strokeLinecap="round" />
      {/* left frond */}
      <Path d={`M-${1*s} -${4*s} C-${8*s} -${10*s} -${12*s} -${6*s} -${10*s} -${2*s}`} stroke={color} strokeWidth={2*s} fill="none" strokeLinecap="round" />
      {/* right frond */}
      <Path d={`M-${1*s} -${6*s} C${6*s} -${12*s} ${11*s} -${8*s} ${9*s} -${3*s}`} stroke={color} strokeWidth={2*s} fill="none" strokeLinecap="round" />
      {/* tiny top shoot */}
      <Path d={`M-${1*s} -${10*s} C-${3*s} -${15*s} ${2*s} -${15*s} ${1*s} -${12*s}`} stroke={color} strokeWidth={1.5*s} fill="none" strokeLinecap="round" />
      {/* soil dots */}
      <Circle cx={-3*s} cy={9*s} r={1.2*s} fill={color} opacity={0.35} />
      <Circle cx={3*s}  cy={9.5*s} r={1*s} fill={color} opacity={0.25} />
    </G>
  );
}

function JasmineBloom({ color, size = 34 }) {
  // 5-petal open jasmine — Akka's signature flower. Ovulation / peak.
  const s = size / 34;
  const petals = [0, 72, 144, 216, 288];
  return (
    <G>
      {petals.map((a, i) => {
        const r = (a * Math.PI) / 180;
        const px = Math.cos(r) * 9 * s;
        const py = Math.sin(r) * 9 * s;
        return (
          <Ellipse
            key={i}
            cx={px} cy={py}
            rx={4.5 * s} ry={7.5 * s}
            fill={color}
            opacity={0.88}
            transform={`rotate(${a} ${px} ${py})`}
          />
        );
      })}
      {/* inner petal overlay — lighter */}
      {petals.map((a, i) => {
        const r = (a * Math.PI) / 180;
        const px = Math.cos(r) * 6 * s;
        const py = Math.sin(r) * 6 * s;
        return (
          <Ellipse
            key={`i${i}`}
            cx={px} cy={py}
            rx={3 * s} ry={5.5 * s}
            fill="#FFFFFF"
            opacity={0.22}
            transform={`rotate(${a} ${px} ${py})`}
          />
        );
      })}
      {/* stamen center */}
      <Circle cx={0} cy={0} r={4.5 * s} fill={color} />
      <Circle cx={0} cy={0} r={2.5 * s} fill="#FCE9A0" />
      <Circle cx={0} cy={0} r={1.2 * s} fill="#FFFFFF" opacity={0.7} />
    </G>
  );
}

function LavenderBloom({ color, size = 26 }) {
  // Half-closed lavender bloom + crescent moon. Luteal / dusk.
  const s = size / 26;
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <G>
      {petals.map((a, i) => {
        const r = (a * Math.PI) / 180;
        const openness = a < 180 ? 0.72 : 0.55; // upper petals more open
        const px = Math.cos(r) * 7 * s * openness;
        const py = Math.sin(r) * 7 * s * openness;
        return (
          <Ellipse
            key={i}
            cx={px} cy={py}
            rx={3.5 * s} ry={6.5 * s * openness}
            fill={color}
            opacity={0.75}
            transform={`rotate(${a} ${px} ${py})`}
          />
        );
      })}
      <Circle cx={0} cy={0} r={3 * s} fill={color} />
      {/* crescent moon */}
      <G transform={`translate(${12*s} ${-12*s})`}>
        <Circle cx={0} cy={0} r={5*s} fill={color} opacity={0.65} />
        <Circle cx={2.5*s} cy={0} r={4*s} fill={C.bg} />
      </G>
    </G>
  );
}

// ── Today dot (glowing pulse) ─────────────────────────────────────────────
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function TodayDot({ x, y, color, anim }) {
  const outerScale = anim.interpolate({ inputRange: [0,1], outputRange: [1, 2.2] });
  const outerOpacity = anim.interpolate({ inputRange: [0,1], outputRange: [0.65, 0] });
  const innerScale = anim.interpolate({ inputRange: [0,1], outputRange: [1, 1.15] });

  return (
    <G x={x - 8} y={y - 8}>
      {/* outer pulse ring */}
      <AnimatedCircle
        cx={8} cy={8} r={8}
        fill={color}
        opacity={outerOpacity}
        scale={outerScale}
      />
      {/* inner dot */}
      <AnimatedCircle
        cx={8} cy={8} r={5.5}
        fill={color}
        scale={innerScale}
      />
      <Circle cx={8} cy={8} r={2.5} fill="#FFFFFF" opacity={0.9} />
    </G>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function NaadhiArc({
  cycleDay = 1,
  cycleLength = 28,
  phase = 'follicular',
  width = VW,
  showLabels = true,
  style,
}) {
  const scale = width / VW;
  const height = VH * scale;

  // Pulse animation for today's dot
  const pulse = useRef(new Animated.Value(0)).current;
  // Scale animation for current phase bloom
  const breathe = useRef(new Animated.Value(0)).current;
  // Fade-in for botanicals
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 200, useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathe, { toValue: 1, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(breathe, { toValue: 0, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ),
      Animated.timing(fadeIn, { toValue: 1, duration: 900, delay: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  // Today position on arc
  const t = Math.max(0, Math.min(1, (cycleDay - 1) / Math.max(cycleLength - 1, 1)));
  const todayPt = bezierPoint(t);

  // Which botanical is current phase?
  const currentPhaseColor = PHASE_COLOR[phase] || C.follicular;

  const AnimatedG = Animated.createAnimatedComponent(G);

  return (
    <View style={[{ width, height }, style]}>
      <Svg width={width} height={height} viewBox={`0 0 ${VW} ${VH}`}>
        <Defs>
          <RadialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={currentPhaseColor} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={currentPhaseColor} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Arc vine — the backbone */}
        <Path
          d={ARC}
          stroke={C.dividerMid}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />
        <Path
          d={ARC}
          stroke={currentPhaseColor}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
          opacity={0.35}
        />

        {/* Phase botanicals */}
        {PHASES.map((ph) => {
          const color = PHASE_COLOR[ph.key];
          const isCurrent = ph.key === phase;
          const breathScale = isCurrent
            ? breathe.interpolate({ inputRange: [0,1], outputRange: [1, 1.12] })
            : 1;

          const BotComp = ph.key === 'menstrual'  ? RoseBud
                        : ph.key === 'follicular' ? Sprout
                        : ph.key === 'ovulation'  ? JasmineBloom
                        : LavenderBloom;

          const node = (
            <G key={ph.key} x={ph.x} y={ph.y}>
              <BotComp color={color} size={ph.key === 'ovulation' ? 32 : 26} />
              {showLabels && (
                <Svg.Text
                  x={0} y={ph.key === 'ovulation' ? 24 : 20}
                  fontSize={8}
                  fill={color}
                  textAnchor="middle"
                  fontFamily="Inter"
                  opacity={0.7}
                >
                  {ph.key.charAt(0).toUpperCase() + ph.key.slice(1)}
                </Svg.Text>
              )}
            </G>
          );

          if (isCurrent) {
            return (
              <AnimatedG
                key={ph.key}
                x={ph.x} y={ph.y}
                scale={breathScale}
                originX={ph.x} originY={ph.y}
              >
                <BotComp color={color} size={ph.key === 'ovulation' ? 32 : 26} />
                {showLabels && (
                  <Svg.Text
                    x={0} y={ph.key === 'ovulation' ? 24 : 20}
                    fontSize={8}
                    fill={color}
                    textAnchor="middle"
                    fontFamily="Inter"
                    opacity={0.9}
                    fontWeight="600"
                  >
                    {ph.key.charAt(0).toUpperCase() + ph.key.slice(1)}
                  </Svg.Text>
                )}
              </AnimatedG>
            );
          }
          return node;
        })}

        {/* Today's dot */}
        <TodayDot
          x={todayPt.x}
          y={todayPt.y}
          color={currentPhaseColor}
          anim={pulse}
        />
      </Svg>
    </View>
  );
}

// ── Mini motif (small petal badge for headers/nav) ────────────────────────
export function MiniPetal({ phase = 'follicular', size = 24, style }) {
  const color = PHASE_COLOR[phase] || C.follicular;
  const BotComp = phase === 'menstrual'  ? RoseBud
                : phase === 'follicular' ? Sprout
                : phase === 'ovulation'  ? JasmineBloom
                : LavenderBloom;
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="-14 -14 28 28">
        <BotComp color={color} size={20} />
      </Svg>
    </View>
  );
}
