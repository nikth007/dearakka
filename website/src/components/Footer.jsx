import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { GlobeIcon } from './icons/Icons';
import { useLang } from '../content/i18n';

const COLUMNS = [
  {
    title: 'Company', titleTa: 'நிறுவனம்',
    links: [
      ['About Akka', '/about'],
      ['Our mission', '/about'],
      ['Sundaram Medical Foundation', '/about'],
      ['Contact', '/about'],
    ],
  },
  {
    title: 'App', titleTa: 'செயலி',
    links: [
      ['Period Tracking', '/products/period-tracking'],
      ['Mood & Mind', '/products/mood-mind'],
      ['Symptom Tracking', '/products/symptom-tracking'],
      ['Predictions', '/products/predictions'],
      ['Ask Akka', '/products/ask-akka'],
    ],
  },
  {
    title: 'Health Library', titleTa: 'ஆரோக்கிய நூலகம்',
    links: [
      ['Menstrual Cycle', '/health-library/menstrual-cycle'],
      ['PCOS & Conditions', '/health-library/pcos-conditions'],
      ['Fertility', '/health-library/fertility'],
      ['Perimenopause', '/health-library/perimenopause'],
      ['Mental Wellbeing', '/health-library/mental-wellbeing'],
    ],
  },
  {
    title: 'Information', titleTa: 'தகவல்',
    links: [
      ['Privacy Policy', '/privacy'],
      ['Terms of Use', '/terms'],
      ['Cookie Settings', '/cookies'],
      ['Medical Disclaimer', '/medical-disclaimer'],
    ],
  },
];

function QR() {
  // simple decorative QR-style mark
  const cells = [
    '1111111010101111111','1000001011001000001','1011101001101011101','1011101000001011101',
    '1011101010101011101','1000001001001000001','1111111010101111111','0000000011100000000',
    '1101011101011010110','0010110010110101001','1110001110001011101','0101110100110100010',
    '1011011011101011011','0000000101011010010','1111111001100110110','1000001011010101011',
    '1011101000111010001','1011101011001011010','1111111001011100111',
  ];
  return (
    <svg width="92" height="92" viewBox="0 0 19 19" shapeRendering="crispEdges" style={{ background: '#fff', borderRadius: 10, padding: 6, boxSizing: 'content-box' }}>
      {cells.map((row, y) => row.split('').map((c, x) => c === '1' && (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1e3a5f" />
      )))}
    </svg>
  );
}

export default function Footer() {
  const { lang, setLang, t } = useLang();
  return (
    <footer style={{ background: '#13273f', color: '#a7b6cc', paddingTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 36, paddingBottom: 48 }} className="footer-grid">
          <div>
            <Logo size={20} tone="light" />
            <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.65, maxWidth: 280 }}>
              {t(
                'A warm, private women’s health companion built by Sundaram Medical Foundation, a trusted not-for-profit hospital in Chennai.',
                'சென்னையில் உள்ள நம்பகமான தொண்டு மருத்துவமனையான சுந்தரம் மெடிக்கல் ஃபவுண்டேஷனால் உருவாக்கப்பட்ட ஒரு அன்பான, தனிப்பட்ட மகளிர் ஆரோக்கிய துணை.'
              )}
            </p>
            <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#e8eef6', fontWeight: 600, marginTop: 18, fontFamily: "'Plus Jakarta Sans'", fontSize: 14 }}>
              <GlobeIcon size={18} c="#a7b6cc" /> {lang === 'en' ? 'தமிழில் பார்' : 'View in English'}
            </button>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 style={{ color: '#fff', fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 16 }}>
                {t(col.title, col.titleTa)}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize: 14.5, transition: 'color .15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#a7b6cc')}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* download band */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', padding: '26px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <QR />
          <div>
            <div style={{ color: '#fff', fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              {t('Take Akka with you', 'அக்காவை உங்களுடன் எடுத்துச் செல்லுங்கள்')}
            </div>
            <div style={{ fontSize: 13.5, marginBottom: 12 }}>
              {t('Scan to open the app, or use it free in your browser.', 'செயலியைத் திறக்க ஸ்கேன் செய்யுங்கள், அல்லது உலாவியில் இலவசமாகப் பயன்படுத்துங்கள்.')}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <StoreBadge top="Open the" bottom="Web App" href="https://nikth007.github.io/dearakka/" />
              <StoreBadge top="Coming soon to" bottom="App Store" muted />
              <StoreBadge top="Coming soon to" bottom="Google Play" muted />
            </div>
          </div>
        </div>

        {/* legal bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
          padding: '22px 0 34px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13,
        }}>
          <span>© {new Date().getFullYear()} Sundaram Medical Foundation, Chennai. All rights reserved.</span>
          <span style={{ maxWidth: 520, textAlign: 'right', color: '#7e8ea6' }}>
            {t(
              'Dear Akka provides general health information and is not a substitute for professional medical advice.',
              'Dear Akka பொது ஆரோக்கிய தகவலை வழங்குகிறது, இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாகாது.'
            )}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function StoreBadge({ top, bottom, href, muted }) {
  const inner = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px',
      border: '1px solid rgba(255,255,255,0.22)', borderRadius: 12,
      background: muted ? 'transparent' : 'rgba(255,255,255,0.06)', opacity: muted ? 0.55 : 1,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a4 4 0 0 0-4 4v1H6.5A2.5 2.5 0 0 0 4 9.5v9A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 17.5 7H16V6a4 4 0 0 0-4-4Zm0 2a2 2 0 0 1 2 2v1h-4V6a2 2 0 0 1 2-2Z"/></svg>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 10, color: '#a7b6cc' }}>{top}</div>
        <div style={{ fontSize: 14, color: '#fff', fontFamily: "'Plus Jakarta Sans'", fontWeight: 700 }}>{bottom}</div>
      </div>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
}
