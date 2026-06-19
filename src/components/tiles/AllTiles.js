import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Ellipse, G, Rect, Line } from 'react-native-svg';
import { C } from '../../theme/colors';

// ─── FLOW TILES ─────────────────────────────────────────────────────────────

export function SpottingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-8 C3,-4 6,0 6,4 C6,7.3 3.3,10 0,10 C-3.3,10 -6,7.3 -6,4 C-6,0 -3,-4 0,-8 Z"
        fill={color}
        opacity={0.85}
      />
    </Svg>
  );
}

export function LightFlowIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-14 C5,-7 10,0 10,7 C10,12.5 5.5,17 0,17 C-5.5,17 -10,12.5 -10,7 C-10,0 -5,-7 0,-14 Z"
        fill={color}
        opacity={0.85}
      />
    </Svg>
  );
}

export function MediumFlowIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-10,-14 C-7,-7 -4,0 -4,7 C-4,12.5 -6.5,17 -10,17 C-13.5,17 -16,12.5 -16,7 C-16,0 -13,-7 -10,-14 Z"
        fill={color}
        opacity={0.85}
      />
      <Path
        d="M10,-14 C13,-7 16,0 16,7 C16,12.5 13.5,17 10,17 C6.5,17 4,12.5 4,7 C4,0 7,-7 10,-14 Z"
        fill={color}
        opacity={0.85}
      />
    </Svg>
  );
}

export function HeavyFlowIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-22 C3,-16 6,-10 6,-4 C6,-0.7 3.3,2 0,2 C-3.3,2 -6,-0.7 -6,-4 C-6,-10 -3,-16 0,-22 Z"
        fill={color}
        opacity={0.85}
      />
      <Path
        d="M-13,-4 C-10,2 -7,8 -7,14 C-7,17.3 -9.7,20 -13,20 C-16.3,20 -19,17.3 -19,14 C-19,8 -16,2 -13,-4 Z"
        fill={color}
        opacity={0.85}
      />
      <Path
        d="M13,-4 C16,2 19,8 19,14 C19,17.3 16.3,20 13,20 C9.7,20 7,17.3 7,14 C7,8 10,2 13,-4 Z"
        fill={color}
        opacity={0.85}
      />
    </Svg>
  );
}

// ─── CRAMP TILES ────────────────────────────────────────────────────────────

export function NoCrampsIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={18} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={-9} y1={-9} x2={9} y2={9} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={9} y1={-9} x2={-9} y2={9} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function MildCrampsIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-20,-5 C-15,-5 -12,-1 -8,-1 C-4,-1 -1,-5 4,-5 C9,-5 12,-1 16,-1 C18,-1 20,-3 22,-5"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M-20,5 C-15,5 -12,1 -8,1 C-4,1 -1,5 4,5 C9,5 12,1 16,1 C18,1 20,3 22,5"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ModerateCrampsIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-22,-8 C-16,-8 -12,-2 -6,-2 C0,-2 4,-8 10,-8 C16,-8 20,-2 24,-2"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M-22,0 C-16,0 -12,6 -6,6 C0,6 4,0 10,0 C16,0 20,6 24,6"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M-22,8 C-16,8 -12,14 -6,14 C0,14 4,8 10,8 C16,8 20,14 24,14"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SevereCrampsIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-22,-14 L-14,-7 L-6,-14 L2,-7 L10,-14 L18,-7 L24,-14"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M-22,-6 L-14,1 L-6,-6 L2,1 L10,-6 L18,1 L24,-6"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M-22,2 L-14,9 L-6,2 L2,9 L10,2 L18,9 L24,2"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M-22,10 L-14,17 L-6,10 L2,17 L10,10 L18,17 L24,10"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── PAIN TILES ─────────────────────────────────────────────────────────────

export function HeadacheIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={5} rx={12} ry={16} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={0} y1={-13} x2={0} y2={-20} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={5.5} y1={-12} x2={8.5} y2={-18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-5.5} y1={-12} x2={-8.5} y2={-18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={9.5} y1={-9} x2={14} y2={-13} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-9.5} y1={-9} x2={-14} y2={-13} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={-4} x2={18} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-12} y1={-4} x2={-18} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BackPainIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-22 C6,-14 -6,-6 0,2 C6,10 -6,18 0,24"
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Line x1={-8} y1={-12} x2={8} y2={-12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-8} y1={2} x2={8} y2={2} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-8} y1={14} x2={8} y2={14} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BloatingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={10} rx={16} ry={12} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={0} cy={-5} r={6} fill="none" stroke={color} strokeWidth={1.8} />
      <Circle cx={0} cy={-5} r={11} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={0} cy={-5} r={16} fill="none" stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function BreastTendernessIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-20 C6,-12 14,-4 14,6 C14,14 7.7,20 0,20 C-7.7,20 -14,14 -14,6 C-14,-4 -6,-12 0,-20 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
      <Path
        d="M0,-4 C1.5,-6 4,-6 4,-4 C4,-2 2,-0.5 0,1 C-2,-0.5 -4,-2 -4,-4 C-4,-6 -1.5,-6 0,-4 Z"
        fill={color}
      />
    </Svg>
  );
}

export function FatigueIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={10} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M0,-14 C2,-16 4,-20 2,-23" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M9.9,-9.9 C12,-9 15,-11 16,-14" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M14,0 C16,2 20,2 22,0" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M9.9,9.9 C12,12 14,16 12,19" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M0,14 C-2,16 -4,20 -2,23" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M-9.9,9.9 C-12,12 -14,16 -12,19" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M-14,0 C-16,2 -20,2 -22,0" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M-9.9,-9.9 C-12,-9 -15,-11 -16,-14" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── MOOD TILES ─────────────────────────────────────────────────────────────

export function JoyIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-5} cy={-4} r={1.8} fill={color} />
      <Circle cx={5} cy={-4} r={1.8} fill={color} />
      <Path d="M-7,4 C-4,9 4,9 7,4" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={-18} x2={0} y2={-22} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={9} y1={-16} x2={11} y2={-20} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={16} y1={-9} x2={19} y2={-11} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-9} y1={-16} x2={-11} y2={-20} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-16} y1={-9} x2={-19} y2={-11} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CalmIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={-7} y1={-4} x2={-3} y2={-4} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={3} y1={-4} x2={7} y2={-4} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M-5,5 C-2,8 2,8 5,5" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function HopefulIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,20 C-5,10 -12,2 -10,-6 C-8,-14 -2,-18 4,-14 C10,-10 10,-2 4,4 C-2,10 4,14 6,8"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M6,-14 L7,-17 L8,-14 L11,-13 L8,-12 L7,-9 L6,-12 L3,-13 Z"
        fill={color}
      />
    </Svg>
  );
}

export function AnxiousIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={-4} cy={0} r={13} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-8} cy={-4} r={1.5} fill={color} />
      <Circle cx={0} cy={-4} r={1.5} fill={color} />
      <Path d="M-9,5 C-7,3 -5,4 -3,3 C-1,2 0,4 1,5" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M13,-8 L10,-2 L14,-2 L11,6" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LowMoodIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={8} r={13} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-5} cy={4} r={1.8} fill={color} />
      <Circle cx={5} cy={4} r={1.8} fill={color} />
      <Path d="M-6,15 C-3,11 3,11 6,15" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M-10,-10 C-10,-14 -8,-16 -8,-18" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M-3,-8 C-3,-12 -1,-14 -1,-16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4,-10 C4,-14 6,-16 6,-18" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function IrritableIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-5} cy={-3} r={1.8} fill={color} />
      <Circle cx={5} cy={-3} r={1.8} fill={color} />
      <Path d="M-8,4 L-4,7 L0,4 L4,7 L8,4" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={-10} y1={-9} x2={-5} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={5} y1={-6} x2={10} y2={-9} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function OverwhelmedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={8} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-3} cy={-2} r={1.2} fill={color} />
      <Circle cx={3} cy={-2} r={1.2} fill={color} />
      <Path d="M-3,3 C-1,5 1,5 3,3" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M0,-12 C8,-12 14,-6 14,0 C14,8 8,14 0,14 C-8,14 -14,8 -14,0 C-14,-8 -8,-14 0,-14"
        fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
      <Path d="M0,-18 C12,-18 22,-9 22,0 C22,12 12,22 0,22 C-12,22 -22,12 -22,0 C-22,-12 -12,-22 0,-20"
        fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" opacity={0.4} />
    </Svg>
  );
}

// ─── ENERGY TILES ───────────────────────────────────────────────────────────

export function ExhaustedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Rect x={-18} y={4} width={36} height={14} rx={4} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={0} cy={-8} r={6} fill="none" stroke={color} strokeWidth={2} />
      <Path d="M-6,-2 L6,-2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3,-22 L5,-18 L8,-18" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10,-18 L12,-14 L15,-14" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17,-14 L19,-10 L22,-10" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LowEnergyIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={-16} r={5} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={0} y1={-11} x2={0} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={0} x2={-8} y2={-6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={0} x2={8} y2={-6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={8} x2={-7} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={8} x2={7} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M0,14 L-4,20 L4,20 L0,26" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function OkEnergyIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={-16} r={5} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={0} y1={-11} x2={0} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={0} x2={-8} y2={-6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={0} x2={8} y2={-6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={8} x2={-7} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={8} x2={7} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function EnergizedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={-14} r={5} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={0} y1={-9} x2={0} y2={6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={-2} x2={-8} y2={-8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={-2} x2={8} y2={-8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={6} x2={-6} y2={16} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={0} y1={6} x2={6} y2={16} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={-12} y1={-22} x2={-10} y2={-18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={-22} x2={10} y2={-18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-18} y1={-14} x2={-14} y2={-12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={18} y1={-14} x2={14} y2={-12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-18} y1={-6} x2={-14} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={18} y1={-6} x2={14} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── SLEEP TILES ────────────────────────────────────────────────────────────

export function TroubleSleepIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M6,-18 C0,-16 -6,-10 -6,0 C-6,10 0,16 8,18 C-4,18 -16,8 -16,-4 C-16,-16 -6,-24 6,-18 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M-12,10 C-8,10 -4,14 0,14 C4,14 8,10 12,10"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LightSleepIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M6,-18 C0,-16 -6,-10 -6,0 C-6,10 0,16 8,18 C-4,18 -16,8 -16,-4 C-16,-16 -6,-24 6,-18 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Circle cx={10} cy={-5} r={2.5} fill={color} />
      <Circle cx={14} cy={5} r={2.5} fill={color} />
    </Svg>
  );
}

export function OkSleepIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M6,-18 C0,-16 -6,-10 -6,0 C-6,10 0,16 8,18 C-4,18 -16,8 -16,-4 C-16,-16 -6,-24 6,-18 Z"
        fill={color}
        opacity={0.4}
        stroke={color}
        strokeWidth={2.5}
      />
      <Path
        d="M6,-18 C0,-16 -6,-10 -6,0 C-6,10 0,16 8,18 C-4,18 -16,8 -16,-4 C-16,-16 -6,-24 6,-18 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function DeepSleepIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M-18,-16 L-17,-19 L-16,-16 L-13,-15 L-16,-14 L-17,-11 L-18,-14 L-21,-15 Z" fill={color} />
      <Path d="M14,-18 L15,-20 L16,-18 L18,-17 L16,-16 L15,-14 L14,-16 L12,-17 Z" fill={color} />
      <Path d="M18,10 L19,8 L20,10 L22,11 L20,12 L19,14 L18,12 L16,11 Z" fill={color} />
    </Svg>
  );
}

export function RefreshedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-16,8 C-16,-0.7 -8.8,-8 0,-8 C8.8,-8 16,-0.7 16,8 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Line x1={-18} y1={8} x2={18} y2={8} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={0} y1={-12} x2={0} y2={-18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={-10} x2={11} y2={-15} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={14} y1={-4} x2={19} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-8} y1={-10} x2={-11} y2={-15} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={-14} y1={-4} x2={-19} y2={-6} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── MIND TILES ─────────────────────────────────────────────────────────────

export function ForgetfulIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={0} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path
        d="M-4,-8 C-4,-12 0,-14 4,-12 C8,-10 8,-4 4,-2 C2,-1 0,0 0,2"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Circle cx={0} cy={8} r={2} fill={color} />
    </Svg>
  );
}

export function BrainFogIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-14,-2 C-14,-10 -8,-16 0,-16 C8,-16 14,-10 14,-2 C14,4 8,8 8,8 L-8,8 C-8,8 -14,4 -14,-2 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path d="M-8,8 C-8,10 -9,14 -10,18" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M0,8 C0,10 0,14 0,18" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M8,8 C8,10 9,14 10,18" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function CalmMindIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={0} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M0,-6 L1,-9 L2,-6 L5,-5 L2,-4 L1,-1 L0,-4 L-3,-5 Z" fill={color} />
      <Line x1={0} y1={-10} x2={0} y2={-13} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={3.5} y1={-8.5} x2={5.5} y2={-10.5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={-3.5} y1={-8.5} x2={-5.5} y2={-10.5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function StressedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={5} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M-12,-16 C-8,-20 8,-20 12,-16" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M-10,-20 C-6,-24 6,-24 10,-20" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M-8,-24 C-4,-27 4,-27 8,-24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── SKIN TILES ─────────────────────────────────────────────────────────────

export function ClearSkinIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={2} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M0,-6 L1.5,-9 L3,-6 L6,-5 L3,-4 L1.5,-1 L0,-4 L-3,-5 Z" fill={color} />
    </Svg>
  );
}

export function AcneIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={2} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-5} cy={-6} r={2.5} fill={color} opacity={0.8} />
      <Circle cx={5} cy={-4} r={2.5} fill={color} opacity={0.8} />
      <Circle cx={-8} cy={4} r={2.5} fill={color} opacity={0.8} />
      <Circle cx={2} cy={8} r={2.5} fill={color} opacity={0.8} />
      <Circle cx={8} cy={2} r={2.5} fill={color} opacity={0.8} />
    </Svg>
  );
}

export function DrySkinIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={2} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M-6,-6 L-3,-2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6,-4 L3,0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M-4,4 L-2,8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4,6 L6,10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M-8,0 L-5,2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function OilySkinIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={2} rx={16} ry={20} fill="none" stroke={color} strokeWidth={2.5} />
      <Path d="M-7,-7 C-6,-9 -4,-9 -4,-7 C-4,-5 -6,-4 -7,-5" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4,-5 C5,-7 7,-7 7,-5 C7,-3 5,-2 4,-3" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M-3,6 C-2,4 0,4 0,6 C0,8 -2,9 -3,8" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── CRAVING TILES ──────────────────────────────────────────────────────────

export function SweetCravingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-18 L16,0 L0,18 L-16,0 Z"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Circle cx={0} cy={0} r={2.5} fill={color} />
      <Circle cx={0} cy={-8} r={2} fill={color} opacity={0.7} />
      <Circle cx={8} cy={0} r={2} fill={color} opacity={0.7} />
      <Circle cx={0} cy={8} r={2} fill={color} opacity={0.7} />
      <Circle cx={-8} cy={0} r={2} fill={color} opacity={0.7} />
    </Svg>
  );
}

export function SaltyCravingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Rect x={-18} y={-12} width={36} height={24} rx={4} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={-8} cy={-4} r={2} fill={color} opacity={0.7} />
      <Circle cx={0} cy={-4} r={2} fill={color} opacity={0.7} />
      <Circle cx={8} cy={-4} r={2} fill={color} opacity={0.7} />
      <Circle cx={-4} cy={4} r={2} fill={color} opacity={0.7} />
      <Circle cx={4} cy={4} r={2} fill={color} opacity={0.7} />
    </Svg>
  );
}

export function SpicyCravingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M2,20 C-8,16 -12,8 -10,-2 C-8,-12 -2,-18 4,-20 C4,-14 0,-10 0,-4 C0,4 6,10 6,18 C4,20 2,22 0,20"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4,-20 C6,-22 10,-22 10,-18 C10,-14 6,-14 6,-18"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path d="M-2,-8 C0,-12 4,-12 4,-8" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
    </Svg>
  );
}

export function GreasyCravingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={10} rx={20} ry={8} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={-20} y1={10} x2={20} y2={10} stroke={color} strokeWidth={1.5} />
      <Path d="M-8,-6 C-8,-12 -5,-16 -5,-20" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M0,-4 C0,-10 3,-14 3,-18" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M8,-6 C8,-12 11,-16 11,-20" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ChocolateCravingIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Rect x={-16} y={-16} width={32} height={32} rx={3} fill="none" stroke={color} strokeWidth={2.5} />
      <Line x1={0} y1={-16} x2={0} y2={16} stroke={color} strokeWidth={2} />
      <Line x1={-16} y1={0} x2={16} y2={0} stroke={color} strokeWidth={2} />
      <Rect x={-14} y={-14} width={12} height={12} rx={2} fill={color} opacity={0.15} />
      <Rect x={2} y={-14} width={12} height={12} rx={2} fill={color} opacity={0.15} />
      <Rect x={-14} y={2} width={12} height={12} rx={2} fill={color} opacity={0.15} />
      <Rect x={2} y={2} width={12} height={12} rx={2} fill={color} opacity={0.15} />
    </Svg>
  );
}

// ─── DIGESTION TILES ────────────────────────────────────────────────────────

export function OkDigestionIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M0,-22 C10,-22 20,-12 20,0 C20,12 10,22 0,22 C-10,22 -20,14 -18,4 C-16,-6 -8,-2 -6,6 C-4,14 0,18 6,16 C14,12 18,6 18,0 C18,-10 10,-20 0,-20"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path d="M-10,2 L-4,8 L8,-6" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BloatedDigestionIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Ellipse cx={0} cy={8} rx={13} ry={10} fill="none" stroke={color} strokeWidth={2.5} />
      <Circle cx={0} cy={-6} r={5} fill="none" stroke={color} strokeWidth={1.8} />
      <Circle cx={0} cy={-6} r={9} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={0} cy={-6} r={13} fill="none" stroke={color} strokeWidth={1.2} />
    </Svg>
  );
}

export function GassyIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Path
        d="M-10,-6 C-14,-10 -14,-18 -6,-20 C2,-22 10,-16 10,-8 C10,0 4,4 4,10 C4,16 8,18 6,22"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Circle cx={14} cy={-10} r={3} fill="none" stroke={color} strokeWidth={1.8} />
      <Circle cx={20} cy={-4} r={2} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={16} cy={4} r={2.5} fill="none" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export function ConstipatedIcon({ color = C.primary, size = 52 }) {
  return (
    <Svg width={size} height={size} viewBox="-26 -26 52 52">
      <Line x1={-14} y1={-12} x2={14} y2={-12} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={-14} y1={-4} x2={14} y2={-4} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={-14} y1={4} x2={14} y2={4} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={-14} y1={12} x2={14} y2={12} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={-8} y1={-18} x2={8} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={8} y1={-18} x2={-8} y2={18} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── ILLUSTRATED TILE ───────────────────────────────────────────────────────

export function IllustratedTile({ icon: Icon, label, selected, onPress, color = C.primary, size = 88 }) {
  const bgOpacity = selected ? '59' : '2E'; // 35% vs 18% in hex
  const backgroundColor = color + bgOpacity;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.tile,
        { width: size, height: size, backgroundColor },
        selected && { borderWidth: 2, borderColor: color, transform: [{ scale: 1.06 }] },
      ]}
    >
      {Icon && <Icon color={color} size={52} />}
      {label ? (
        <Text
          style={[
            styles.label,
            { color: selected ? color : C.textSecondary },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter',
    marginTop: 2,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
