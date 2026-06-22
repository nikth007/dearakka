import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../../components/Seo';
import Reveal, { RevealGroup, RevealItem } from '../../components/Reveal';
import PhoneMockup from '../../components/PhoneMockup';
import { CheckIcon, ArrowIcon, Tile } from '../../components/icons/Icons';
import { useLang } from '../../content/i18n';

const T = '#0d9488', NAVY = '#1e3a5f';

// data-driven product page — every product page shares this exact structure
export default function ProductPage({ data }) {
  const { t } = useLang();
  // accepts either a [en, ta] tuple or a plain string
  const d = (v) => (Array.isArray(v) ? t(v[0], v[1]) : v);

  return (
    <>
      <Seo title={d(data.title)} description={d(data.metaDesc)} path={data.path} />

      {/* hero */}
      <section style={{ background: `linear-gradient(180deg,${data.tintTop} 0%, #fbfcfe 65%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -120, width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle,${data.blob},transparent 70%)` }} />
        <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center', padding: '64px 24px 78px' }}>
          <div className="hero-copy">
            <Reveal>
              <span className="eyebrow" style={{ color: data.accent }}>{d(data.eyebrow)}</span>
              <h1 style={{ fontSize: 'clamp(32px,4.6vw,50px)', fontWeight: 800, lineHeight: 1.06, margin: '14px 0 18px' }}>{d(data.heroTitle)}</h1>
              <p style={{ fontSize: 19, color: '#52617a', lineHeight: 1.62, maxWidth: 520, marginBottom: 26 }}>{d(data.heroBody)}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {d(['Try it free', 'இலவசமாக முயற்சிக்கவும்'])} <ArrowIcon size={17} c="#fff" />
                </a>
                <Link to="/health-library" className="btn btn-ghost">{d(['Learn the science', 'அறிவியலை அறிக'])}</Link>
              </div>
            </Reveal>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen={data.screen} glow={data.glow} width={286} tilt={2} />
          </motion.div>
        </div>
        <style>{`@media (max-width:880px){
          .container > div[style*="grid-template-columns: 1.05fr"]{ grid-template-columns:1fr !important; }
          .hero-copy{ text-align:center; } .hero-copy .eyebrow{ justify-content:center; }
        }`}</style>
      </section>

      {/* how it works */}
      <section className="section">
        <div className="container">
          <Reveal><div className="center" style={{ maxWidth: 640, margin: '0 auto 50px' }}>
            <span className="eyebrow">{d(['How it works', 'எப்படி வேலை செய்கிறது'])}</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', marginTop: 14 }}>{d(data.howTitle)}</h2>
          </div></Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
            {data.steps.map((s, i) => (
              <RevealItem key={i}>
                <div className="card" style={{ padding: 28, height: '100%' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: data.soft, color: data.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 18, marginBottom: 16 }}>{i + 1}</div>
                  <h3 style={{ fontSize: 19, marginBottom: 8 }}>{d(s.title)}</h3>
                  <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.6 }}>{d(s.body)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* benefits split */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#fbfcfe,#f4f9f8)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="priv-grid">
            <Reveal>
              <span className="eyebrow" style={{ color: data.accent }}>{d(['Why it helps', 'ஏன் உதவுகிறது'])}</span>
              <h2 style={{ fontSize: 'clamp(24px,3.4vw,34px)', margin: '14px 0 22px' }}>{d(data.benefitsTitle)}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.benefits.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon size={22} c={data.accent} /></span>
                    <span style={{ fontSize: 16.5, color: '#28344a' }}>{d(b)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PhoneMockup screen={data.screen2 || data.screen} glow={data.glow} width={258} tilt={-2} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq items={data.faq} d={d} />

      {/* CTA */}
      <section style={{ background: `linear-gradient(150deg,${data.accent},${data.accentDeep})`, padding: '76px 0' }}>
        <div className="container center">
          <Reveal>
            <h2 style={{ color: '#fff', fontSize: 'clamp(26px,3.6vw,38px)', marginBottom: 14 }}>{d(data.ctaTitle)}</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, maxWidth: 520, margin: '0 auto 28px' }}>{d(data.ctaBody)}</p>
            <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#fff', color: data.accentDeep }}>
              {d(['Open Dear Akka', 'Dear Akka திறக்கவும்'])} <ArrowIcon size={17} c={data.accentDeep} />
            </a>
          </Reveal>
        </div>
      </section>

      <style>{`@media (max-width:880px){
        .feat-grid{ grid-template-columns:1fr 1fr !important; } .priv-grid{ grid-template-columns:1fr !important; }
      } @media (max-width:560px){ .feat-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}

function Faq({ items, d }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <Reveal><div className="center" style={{ marginBottom: 36 }}>
          <span className="eyebrow">{d(['Good to know', 'தெரிந்துகொள்ள'])}</span>
          <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', marginTop: 14 }}>{d(['Questions women often ask', 'பெண்கள் அடிக்கடி கேட்கும் கேள்விகள்'])}</h2>
        </div></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 24px', textAlign: 'left' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 17, color: NAVY }}>{d(it.q)}</span>
                <span style={{ fontSize: 24, color: T, transform: open === i ? 'rotate(45deg)' : 'none', transition: '.2s', lineHeight: 1 }}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p style={{ padding: '0 24px 22px', fontSize: 16, color: '#52617a', lineHeight: 1.65 }}>{d(it.a)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
