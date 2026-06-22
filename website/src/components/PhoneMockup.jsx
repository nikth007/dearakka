// ─────────────────────────────────────────────────────────────
// Dear Akka — device mockup + in-frame app screens
// Renders crisp, on-brand representations of the actual app UI
// (deep-navy canvas, Naadhi arc, phase petals) inside a phone frame.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { LogoMark } from './Logo';

const NAVY = '#0F2441';
const NAVY_MID = '#1A3458';
const NAVY_CARD = '#243B5C';
const TEXT = '#F0EDE8';
const TEXT2 = '#94A3B8';

export default function PhoneMockup({ children, screen = 'home', tilt = 0, glow = 'teal', width = 270 }) {
  const glowColor = glow === 'amber' ? 'rgba(245,158,11,0.30)' : glow === 'rose' ? 'rgba(192,69,122,0.28)' : 'rgba(13,148,136,0.30)';
  return (
    <div style={{
      position: 'relative',
      width,
      transform: tilt ? `rotate(${tilt}deg)` : 'none',
      filter: `drop-shadow(0 30px 60px ${glowColor})`,
    }}>
      <div style={{
        background: '#0a1424',
        borderRadius: 40,
        padding: 11,
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.06)',
      }}>
        <div style={{
          background: NAVY,
          borderRadius: 30,
          overflow: 'hidden',
          aspectRatio: '9 / 19',
          position: 'relative',
        }}>
          {/* notch */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 22, background: '#0a1424', borderRadius: 12, zIndex: 5,
          }} />
          {children || <AppScreen screen={screen} />}
        </div>
      </div>
    </div>
  );
}

function Petal({ color, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="12" cy="6.5" rx="2" ry="4" fill={color} fillOpacity="0.85"
          transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.1" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}

function Arc() {
  return (
    <svg viewBox="0 0 240 120" width="100%" style={{ display: 'block' }}>
      <path d="M14 96 C 50 50, 96 104, 122 74 C 150 44, 196 92, 226 64"
        stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* phase blooms */}
      <circle cx="30" cy="86" r="5" fill="#C0457A" />
      <circle cx="96" cy="92" r="5" fill="#0D9488" />
      <circle cx="122" cy="74" r="5" fill="#F59E0B" />
      <circle cx="196" cy="80" r="5" fill="#7C4D8A" />
      {/* today dot */}
      <circle cx="122" cy="74" r="9" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.5" />
      <circle cx="122" cy="74" r="4" fill="#fff" />
    </svg>
  );
}

export function AppScreen({ screen = 'home' }) {
  if (screen === 'chat') return <ChatScreen />;
  if (screen === 'track') return <TrackScreen />;
  if (screen === 'predict') return <PredictScreen />;
  if (screen === 'mood') return <MoodScreen />;
  return <HomeScreen />;
}

const wrap = { position: 'absolute', inset: 0, paddingTop: 44, paddingInline: 14, color: TEXT, fontFamily: "'Inter', sans-serif" };

function HomeScreen() {
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: 'linear-gradient(135deg,#0D9488,#7C4D8A)' }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "'Plus Jakarta Sans'" }}>Good morning, Priya</div>
          <div style={{ fontSize: 9.5, color: '#F59E0B' }}>Day 14 · Ovulation</div>
        </div>
      </div>
      <div style={{ background: NAVY_MID, borderRadius: 16, padding: '14px 10px 8px' }}>
        <Arc />
        <div style={{ textAlign: 'center', marginTop: 2 }}>
          <span style={{ fontSize: 9.5, color: '#F59E0B', background: 'rgba(245,158,11,0.15)', padding: '4px 10px', borderRadius: 10 }}>
            Next period in 14 days
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
        {[['Ovulation', '#F59E0B'], ['PMS', '#7C4D8A'], ['Period', '#C0457A']].map(([l, c]) => (
          <div key={l} style={{ flex: 1, background: NAVY_CARD, borderRadius: 12, padding: '9px 6px', borderTop: `2px solid ${c}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: "'Plus Jakarta Sans'" }}>Jul {l === 'Ovulation' ? 4 : l === 'PMS' ? 12 : 18}</div>
            <div style={{ fontSize: 8, color: TEXT2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, background: NAVY_MID, borderRadius: 14, padding: 10 }}>
        <Petal color="#F59E0B" size={20} />
        <div style={{ fontSize: 9.5, color: TEXT2, fontStyle: 'italic', lineHeight: 1.4 }}>
          You are in full bloom — peak energy and clarity today. ✨
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  const bubble = (text, me) => (
    <div style={{
      alignSelf: me ? 'flex-end' : 'flex-start',
      maxWidth: '82%',
      background: me ? '#0D9488' : NAVY_CARD,
      color: me ? '#fff' : TEXT,
      padding: '8px 11px', borderRadius: 14,
      borderBottomRightRadius: me ? 4 : 14, borderBottomLeftRadius: me ? 14 : 4,
      fontSize: 10, lineHeight: 1.45, marginBottom: 8,
    }}>{text}</div>
  );
  return (
    <div style={{ ...wrap, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: 'linear-gradient(135deg,#0D9488,#7C4D8A)' }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Ask Akka</div>
          <div style={{ fontSize: 8, color: '#34d399' }}>● always here for you</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, flex: 1 }}>
        {bubble('Akka, why am I so tired before my period?', true)}
        {bubble("That tiredness is real, kanna. In the luteal phase progesterone rises and can make you feel slower. It's your body asking for rest — not weakness. 💛")}
        {bubble('Iron-rich foods and gentle walks help. Want a few ideas?')}
      </div>
      <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '9px 12px', fontSize: 9.5, color: TEXT2, marginTop: 6 }}>
        Type your question…
      </div>
    </div>
  );
}

function TrackScreen() {
  const Cell = ({ label, c, on }) => (
    <div style={{
      background: on ? c : NAVY_CARD, borderRadius: 12, padding: '10px 4px',
      textAlign: 'center', fontSize: 8.5, color: on ? '#fff' : TEXT2,
      border: on ? 'none' : '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: 16, marginBottom: 2 }}>{label.split(' ')[0]}</div>
      {label.split(' ')[1]}
    </div>
  );
  return (
    <div style={wrap}>
      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 3 }}>How are you today?</div>
      <div style={{ fontSize: 9, color: TEXT2, marginBottom: 12 }}>Tap what you feel — it takes seconds</div>
      <div style={{ fontSize: 9.5, color: '#C0457A', fontWeight: 700, marginBottom: 6 }}>FLOW</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 12 }}>
        <Cell label="💧 Light" c="#C0457A" /><Cell label="🩸 Medium" c="#C0457A" on /><Cell label="🔴 Heavy" c="#C0457A" /><Cell label="· Spot" c="#C0457A" />
      </div>
      <div style={{ fontSize: 9.5, color: '#0D9488', fontWeight: 700, marginBottom: 6 }}>MOOD</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 12 }}>
        <Cell label="😊 Joy" c="#0D9488" on /><Cell label="😌 Calm" c="#0D9488" /><Cell label="😟 Anxious" c="#7C4D8A" /><Cell label="😞 Low" c="#7C4D8A" />
      </div>
      <div style={{ fontSize: 9.5, color: '#F59E0B', fontWeight: 700, marginBottom: 6 }}>ENERGY</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        <Cell label="🔋 High" c="#F59E0B" on /><Cell label="🙂 Ok" c="#F59E0B" /><Cell label="😴 Low" c="#7C4D8A" /><Cell label="💤 Tired" c="#7C4D8A" />
      </div>
    </div>
  );
}

function PredictScreen() {
  return (
    <div style={wrap}>
      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 12 }}>Your predictions</div>
      <div style={{ background: NAVY_MID, borderRadius: 16, padding: 14, marginBottom: 10, textAlign: 'center' }}>
        <Arc />
      </div>
      {[['Period window', 'Jul 18 – 23', '#C0457A', '92%'], ['Fertile window', 'Jul 1 – 6', '#0D9488', '88%'], ['PMS likely', 'Jul 12 – 17', '#7C4D8A', '85%']].map(([l, d, c, conf]) => (
        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, background: NAVY_CARD, borderRadius: 12, padding: '9px 11px', marginBottom: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700 }}>{l}</div>
            <div style={{ fontSize: 8.5, color: TEXT2 }}>{d}</div>
          </div>
          <div style={{ fontSize: 9, color: c, fontWeight: 700 }}>{conf}</div>
        </div>
      ))}
    </div>
  );
}

function MoodScreen() {
  return (
    <div style={wrap}>
      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 3 }}>Mood & your cycle</div>
      <div style={{ fontSize: 9, color: TEXT2, marginBottom: 14 }}>How your phases shape your feelings</div>
      <div style={{ background: NAVY_MID, borderRadius: 16, padding: 14, marginBottom: 12 }}>
        <svg viewBox="0 0 220 90" width="100%">
          <path d="M5 60 C 40 30, 70 25, 110 45 C 150 65, 180 70, 215 35"
            stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="110" cy="45" r="4" fill="#F59E0B" />
          {[0,1,2,3,4].map(i => <line key={i} x1={5+i*52} y1="78" x2={5+i*52} y2="82" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>)}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7.5, color: TEXT2, marginTop: 4 }}>
          <span>Period</span><span>Follicular</span><span>Ovulation</span><span>Luteal</span>
        </div>
      </div>
      <div style={{ background: NAVY_CARD, borderRadius: 14, padding: 11, fontSize: 9.5, color: TEXT2, lineHeight: 1.5 }}>
        <span style={{ color: '#F59E0B', fontWeight: 700 }}>Insight: </span>
        Your mood tends to dip 3 days before your period. Knowing this, you can plan gentleness for those days.
      </div>
    </div>
  );
}
