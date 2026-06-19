export { C, PHASE_COLORS, phaseColors, PHASE_LABEL } from './colors';

import { StyleSheet } from 'react-native';
import { C } from './colors';

// Web font injection (runs once on web)
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
  document.head.appendChild(link);
}

export const FONTS = {
  heading: 'Plus Jakarta Sans',
  body:    'Inter',
};

// Reusable style factories
export const card = (extra = {}) => ({
  backgroundColor: C.bgMid,
  borderRadius: 20,
  padding: 20,
  ...extra,
});

export const elevatedCard = (extra = {}) => ({
  backgroundColor: C.bgElevated,
  borderRadius: 20,
  padding: 20,
  shadowColor: C.shadow,
  shadowOpacity: 0.35,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 8,
  ...extra,
});

export const T = StyleSheet.create({
  h1: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 28, color: C.textPrimary, letterSpacing: -0.4 },
  h2: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 22, color: C.textPrimary, letterSpacing: -0.3 },
  h3: { fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: 18, color: C.textPrimary },
  h4: { fontFamily: 'Plus Jakarta Sans', fontWeight: '600', fontSize: 15, color: C.textPrimary },
  body: { fontFamily: 'Inter', fontWeight: '500', fontSize: 16, color: C.textPrimary, lineHeight: 24 },
  bodySmall: { fontFamily: 'Inter', fontWeight: '400', fontSize: 14, color: C.textSecondary, lineHeight: 20 },
  label: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: C.textSecondary, letterSpacing: 0.2 },
  caption: { fontFamily: 'Inter', fontWeight: '400', fontSize: 11, color: C.textHint },
});
