// ═══════════════════════════════════════════════════
// Dear Akka v2 — Deep Navy Color System
// Canvas: warm navy, not clinical black, not flat cream
// ═══════════════════════════════════════════════════

export const C = {
  // ── CANVAS LAYERS ──────────────────────────────
  bg:         '#0F2441',   // primary screen background
  bgMid:      '#1A3458',   // card / secondary surface
  bgElevated: '#243B5C',   // raised card, modal
  bgHighlight:'#2E4A72',   // selected / hover state

  // ── WARM ACCENT SURFACES (used sparingly) ──────
  cream:      '#F8F3ED',
  blush:      '#FDE8F0',
  mint:       '#E4F8F2',

  // ── TEXT ───────────────────────────────────────
  textPrimary:   '#F0EDE8',   // warm white
  textSecondary: '#94A3B8',   // cool grey
  textHint:      'rgba(240,237,232,0.4)',
  textInverse:   '#0F2441',   // for light-bg text

  // ── PHASE ACCENTS ──────────────────────────────
  menstrual:       '#C0457A',
  menstrualDeep:   '#9B1D54',
  menstrualSoft:   'rgba(192,69,122,0.18)',
  menstrualMid:    'rgba(192,69,122,0.35)',

  follicular:      '#0D9488',
  follicularDeep:  '#0A7468',
  follicularSoft:  'rgba(13,148,136,0.18)',
  follicularMid:   'rgba(13,148,136,0.35)',

  ovulation:       '#F59E0B',
  ovulationDeep:   '#D97706',
  ovulationSoft:   'rgba(245,158,11,0.18)',
  ovulationMid:    'rgba(245,158,11,0.35)',

  luteal:          '#7C4D8A',
  lutealDeep:      '#5B2D6E',
  lutealSoft:      'rgba(124,77,138,0.18)',
  lutealMid:       'rgba(124,77,138,0.35)',

  // ── UTILITY ────────────────────────────────────
  white:     '#FFFFFF',
  divider:   'rgba(255,255,255,0.07)',
  dividerMid:'rgba(255,255,255,0.14)',
  overlay:   'rgba(15,36,65,0.72)',
  shadow:    '#000000',
};

// Phase helpers
export const PHASE_COLORS = {
  menstrual:  { accent: C.menstrual,  deep: C.menstrualDeep,  soft: C.menstrualSoft,  mid: C.menstrualMid  },
  follicular: { accent: C.follicular, deep: C.follicularDeep, soft: C.follicularSoft, mid: C.follicularMid },
  ovulation:  { accent: C.ovulation,  deep: C.ovulationDeep,  soft: C.ovulationSoft,  mid: C.ovulationMid  },
  luteal:     { accent: C.luteal,     deep: C.lutealDeep,     soft: C.lutealSoft,     mid: C.lutealMid     },
  none:       { accent: C.follicular, deep: C.follicularDeep, soft: C.follicularSoft, mid: C.follicularMid },
};

export function phaseColors(phase) {
  return PHASE_COLORS[phase] || PHASE_COLORS.none;
}

export const PHASE_LABEL = {
  en: { menstrual: 'Menstrual', follicular: 'Follicular', ovulation: 'Ovulation', luteal: 'Luteal', none: 'Tracking' },
  ta: { menstrual: 'மாதவிடாய்', follicular: 'ஃபாலிகுலர்', ovulation: 'அண்டவிடுப்பு', luteal: 'லுட்டியல்', none: 'கண்காணிப்பு' },
};
