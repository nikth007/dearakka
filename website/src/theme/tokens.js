// ═══════════════════════════════════════════════════════════════
// Dear Akka — Marketing site design tokens
// Warm + confident. Deeper and richer than a flat pastel wash.
// ═══════════════════════════════════════════════════════════════

export const colors = {
  // Brand core
  teal:       '#0d9488',   // primary — calm, clinical-warm
  tealDeep:   '#0a7468',
  tealSoft:   '#e6f6f4',
  amber:      '#f59e0b',   // accent — warmth, energy
  amberDeep:  '#d97706',
  amberSoft:  '#fef3e2',
  navy:       '#1e3a5f',   // headings / deep surfaces
  navyDeep:   '#13273f',
  blush:      '#fdf2f8',   // soft canvas tint

  // Phase accents (used sparingly, like the app)
  rose:       '#c0457a',   // menstrual
  green:      '#0d9488',   // follicular (= teal)
  gold:       '#f59e0b',   // ovulation (= amber)
  lavender:   '#7c4d8a',   // luteal

  // Neutrals
  ink:        '#1a2433',   // primary text
  inkSoft:    '#52617a',   // secondary text
  inkFaint:   '#8a97ac',   // hints / captions
  line:       '#e8edf3',   // hairlines
  lineSoft:   '#f1f4f8',
  surface:    '#ffffff',
  canvas:     '#fbfcfe',   // page background
  canvasWarm: '#fff9f4',   // warm section background
  white:      '#ffffff',

  // Dark surfaces (footer, dark CTA bands)
  darkBg:     '#13273f',
  darkSurface:'#1e3a5f',
  darkLine:   'rgba(255,255,255,0.12)',
  darkText:   '#e8eef6',
  darkTextSoft:'#a7b6cc',
};

export const phase = {
  menstrual:  { accent: colors.rose,     soft: 'rgba(192,69,122,0.12)',  label: 'Menstrual' },
  follicular: { accent: colors.teal,     soft: 'rgba(13,148,136,0.12)',  label: 'Follicular' },
  ovulation:  { accent: colors.amber,    soft: 'rgba(245,158,11,0.14)',  label: 'Ovulation' },
  luteal:     { accent: colors.lavender, soft: 'rgba(124,77,138,0.12)',  label: 'Luteal' },
};

export const font = {
  heading: "'Plus Jakarta Sans', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
  tamil:   "'Noto Sans Tamil', 'Inter', sans-serif",
};

export const radius = {
  sm: '10px',
  md: '16px',
  lg: '22px',
  xl: '28px',
  pill: '999px',
};

export const shadow = {
  sm:  '0 1px 3px rgba(30,58,95,0.06), 0 1px 2px rgba(30,58,95,0.04)',
  md:  '0 6px 20px rgba(30,58,95,0.08), 0 2px 6px rgba(30,58,95,0.04)',
  lg:  '0 18px 50px rgba(30,58,95,0.12), 0 6px 16px rgba(30,58,95,0.06)',
  glow:'0 14px 40px rgba(13,148,136,0.22)',
  amber:'0 14px 40px rgba(245,158,11,0.22)',
};

export const maxW = '1180px';
