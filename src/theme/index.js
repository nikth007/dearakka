export const Colors = {
  // Primary brand
  teal: '#0D9488',
  tealDark: '#0F766E',
  tealLight: '#CCFBF1',
  tealMid: '#5EEAD4',

  // Secondary brand
  pink: '#EC4899',
  pinkDark: '#DB2777',
  pinkLight: '#FCE7F3',
  pinkMid: '#F9A8D4',

  // Accent
  gold: '#F59E0B',
  goldLight: '#FEF3C7',

  // Semantic
  green: '#10B981',
  greenLight: '#D1FAE5',
  red: '#EF4444',
  redLight: '#FEE2E2',
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
  orange: '#F97316',
  orangeLight: '#FFEDD5',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#FFF9F5',
  bg: '#F8F7FF',
  bgPink: '#FFF0F5',
  card: '#FFFFFF',
  border: '#F3E8FF',
  divider: '#E5E7EB',

  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInvert: '#FFFFFF',

  // Cycle phases
  menstrual: '#EF4444',
  follicular: '#F59E0B',
  ovulation: '#10B981',
  luteal: '#8B5CF6',
};

export const Gradients = {
  primary: ['#0D9488', '#0F766E'],
  pink: ['#EC4899', '#DB2777'],
  sunset: ['#F97316', '#EC4899'],
  teal: ['#0D9488', '#06B6D4'],
  lavender: ['#8B5CF6', '#EC4899'],
  gold: ['#F59E0B', '#EF4444'],
  mint: ['#10B981', '#0D9488'],
  card: ['#FFF0F5', '#F0FDFA'],
  home: ['#FFF0F5', '#F0FDFA'],
  warm: ['#FFF7ED', '#FFF0F5'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  pink: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const Typography = {
  display: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '600' },
  h4: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  bodyMd: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500' },
  tiny: { fontSize: 11, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
};

export const HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };
