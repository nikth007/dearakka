// ─────────────────────────────────────────────────────────────
// Dear Akka — inline SVG icon set (original, duotone)
// Each icon: 28×28 viewBox, accepts size + color (+ soft accent).
// ─────────────────────────────────────────────────────────────
import React from 'react';

const base = (size) => ({
  width: size, height: size, viewBox: '0 0 28 28',
  fill: 'none', xmlns: 'http://www.w3.org/2000/svg',
});

// Soft rounded-square backdrop helper
function Tile({ children, size = 52, bg = 'rgba(13,148,136,0.10)' }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 15, background: bg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </span>
  );
}

export const DropIcon = ({ size = 28, c = '#c0457a' }) => (
  <svg {...base(size)}>
    <path d="M14 3.5c4 5.2 6.4 8.6 6.4 11.7A6.4 6.4 0 0 1 14 21.6a6.4 6.4 0 0 1-6.4-6.4C7.6 12.1 10 8.7 14 3.5Z"
      fill="currentColor" fillOpacity=".16" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M11 14.6a3 3 0 0 0 3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MoonIcon = ({ size = 28, c = '#7c4d8a' }) => (
  <svg {...base(size)}>
    <path d="M22 16.2A8.5 8.5 0 0 1 11.8 6 8.5 8.5 0 1 0 22 16.2Z"
      fill="currentColor" fillOpacity=".16" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="17.5" cy="9" r="1" fill={c} />
  </svg>
);

export const CalendarIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <rect x="4.5" y="6" width="19" height="17" rx="3.5" fill="currentColor" fillOpacity=".12" stroke={c} strokeWidth="1.8" />
    <path d="M4.5 11h19M9 4v4M19 4v4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="14" cy="17" r="2.2" fill={c} />
  </svg>
);

export const SparkIcon = ({ size = 28, c = '#f59e0b' }) => (
  <svg {...base(size)}>
    <path d="M14 3.5c.7 4.7 2.3 6.3 7 7-4.7.7-6.3 2.3-7 7-.7-4.7-2.3-6.3-7-7 4.7-.7 6.3-2.3 7-7Z"
      fill="currentColor" fillOpacity=".18" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M22 17.5c.3 1.8.9 2.4 2.7 2.7-1.8.3-2.4.9-2.7 2.7-.3-1.8-.9-2.4-2.7-2.7 1.8-.3 2.4-.9 2.7-2.7Z" fill={c} />
  </svg>
);

export const ChatIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <path d="M4.5 12.5c0-4 3.6-7 8.5-7s8.5 3 8.5 7-3.6 7-8.5 7c-1 0-2-.1-2.9-.3L6 21.5l.8-3.2A6.6 6.6 0 0 1 4.5 12.5Z"
      fill="currentColor" fillOpacity=".12" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 12.5h6M10 9.8h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const LockIcon = ({ size = 28, c = '#1e3a5f' }) => (
  <svg {...base(size)}>
    <rect x="6" y="12" width="16" height="11" rx="3.2" fill="currentColor" fillOpacity=".10" stroke={c} strokeWidth="1.8" />
    <path d="M9.5 12V9.5a4.5 4.5 0 0 1 9 0V12" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="14" cy="17.2" r="1.8" fill={c} />
  </svg>
);

export const HeartPulseIcon = ({ size = 28, c = '#c0457a' }) => (
  <svg {...base(size)}>
    <path d="M14 22S4.5 16.5 4.5 10.6A4.6 4.6 0 0 1 14 8.2a4.6 4.6 0 0 1 9.5 2.4C23.5 16.5 14 22 14 22Z"
      fill="currentColor" fillOpacity=".14" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 13.2h3l1.6-2.8 2 5 1.6-3 1 1.3h3" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LeafIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <path d="M21 5c-9 0-15 4-15 11 0 3 1.6 6 1.6 6S21 21 21 5Z"
      fill="currentColor" fillOpacity=".14" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8 21C12 13 16 10 19 8.5" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const BrainIcon = ({ size = 28, c = '#7c4d8a' }) => (
  <svg {...base(size)}>
    <path d="M11 5.5A3.2 3.2 0 0 0 7.8 9 3 3 0 0 0 6 14a3 3 0 0 0 2 4.4A3 3 0 0 0 11 22V5.5Z"
      fill="currentColor" fillOpacity=".14" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M14 5.5A3.2 3.2 0 0 1 17.2 9 3 3 0 0 1 19 14a3 3 0 0 1-2 4.4A3 3 0 0 1 14 22V5.5Z"
      stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M14 5.5v17" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const ShieldIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <path d="M14 3.5 22 6v6c0 5-3.4 8.7-8 10.5C9.4 20.7 6 17 6 12V6l8-2.5Z"
      fill="currentColor" fillOpacity=".12" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10.5 13.5 13 16l5-5.5" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StethoscopeIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <path d="M7 4v5a4 4 0 0 0 8 0V4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 13v3a5 5 0 0 0 10 0v-2.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="21" cy="11" r="2.4" fill="currentColor" fillOpacity=".14" stroke={c} strokeWidth="1.8" />
    <circle cx="7" cy="4" r="1.3" fill={c} /><circle cx="15" cy="4" r="1.3" fill={c} />
  </svg>
);

export const FlowerIcon = ({ size = 28, c = '#f59e0b' }) => (
  <svg {...base(size)}>
    <circle cx="14" cy="14" r="2.6" fill={c} />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <ellipse key={a} cx="14" cy="7.4" rx="2.4" ry="3.8" fill="currentColor" fillOpacity=".18"
        stroke={c} strokeWidth="1.4" transform={`rotate(${a} 14 14)`} />
    ))}
  </svg>
);

export const SeedlingIcon = ({ size = 28, c = '#0d9488' }) => (
  <svg {...base(size)}>
    <path d="M14 22v-7" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 15c0-3-2.2-5-6-5 0 3.2 2.4 5 6 5Z" fill="currentColor" fillOpacity=".16" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14 13c0-3 2.2-5 6-5 0 3.2-2.4 5-6 5Z" fill="currentColor" fillOpacity=".10" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const HandHeartIcon = ({ size = 28, c = '#c0457a' }) => (
  <svg {...base(size)}>
    <path d="M5 14v6a1.5 1.5 0 0 0 1.5 1.5H17a4 4 0 0 0 4-4v-2" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    <path d="M13.5 6.2c1.2-1.5 3.6-1.2 4.4.5.7 1.6-.4 3.3-4.4 6-4-2.7-5.1-4.4-4.4-6 .8-1.7 3.2-2 4.4-.5Z"
      fill="currentColor" fillOpacity=".16" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const GlobeIcon = ({ size = 22, c = '#52617a' }) => (
  <svg {...base(size)}>
    <circle cx="14" cy="14" r="9" stroke={c} strokeWidth="1.7" />
    <path d="M5 14h18M14 5c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" stroke={c} strokeWidth="1.7" />
  </svg>
);

export const ArrowIcon = ({ size = 18, c = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckIcon = ({ size = 20, c = '#0d9488' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12.5 10 17l9-10" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export { Tile };
