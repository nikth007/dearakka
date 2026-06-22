// ─────────────────────────────────────────────────────────────
// Dear Akka — Logo (wordmark + symbol)
//
// PLACEHOLDER MARK — designed to be swapped for the user's own
// Claude-designed logo later. Keep the same props API (size, tone,
// variant) and the rest of the site picks up the new mark for free.
//
// Concept: a cyclical "embrace" — an open crescent (the elder
// sister's protective arm) curving around a small bloom (the cycle
// renewing). Reads as warmth + rhythm + womanhood. One-colour safe.
// ─────────────────────────────────────────────────────────────
import React from 'react';

export function LogoMark({ size = 36, tone = 'color', title = 'Dear Akka' }) {
  // tone: 'color' | 'light' | 'dark'
  const teal = tone === 'light' ? '#ffffff' : '#0d9488';
  const amber = tone === 'light' ? 'rgba(255,255,255,0.65)' : '#f59e0b';
  const seed = tone === 'light' ? '#ffffff' : '#1e3a5f';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* protective embrace crescent */}
      <path
        d="M40 24c0 8.84-7.16 16-16 16-8.84 0-16-7.16-16-16C8 15.16 15.16 8 24 8c3.0 0 5.81.82 8.2 2.26"
        stroke={teal}
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      {/* opening of the embrace — amber tip (warmth) */}
      <path
        d="M32.2 10.26c1.9 1.14 3.55 2.64 4.86 4.4"
        stroke={amber}
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      {/* central bloom / seed — the cycle renewing */}
      <path
        d="M24 17c2.8 2.2 4.2 4.5 4.2 6.9 0 2.7-1.88 4.6-4.2 4.6s-4.2-1.9-4.2-4.6c0-2.4 1.4-4.7 4.2-6.9z"
        fill={seed}
      />
      <circle cx="24" cy="31.4" r="2.1" fill={amber} />
    </svg>
  );
}

export default function Logo({ size = 30, tone = 'color', wordmark = true }) {
  const dearColor = tone === 'light' ? 'rgba(255,255,255,0.78)' : '#52617a';
  const akkaColor = tone === 'light' ? '#ffffff' : '#1e3a5f';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={size + 14} tone={tone} />
      {wordmark && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: size,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: dearColor, fontWeight: 600 }}>Dear&nbsp;</span>
          <span style={{ color: akkaColor }}>Akka</span>
        </span>
      )}
    </span>
  );
}
