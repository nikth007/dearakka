import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import Reveal from '../../components/Reveal';
import { LogoMark } from '../../components/Logo';
import { useLang } from '../../content/i18n';

const LEGAL_LINKS = [
  ['Privacy Policy', '/privacy'],
  ['Terms of Use', '/terms'],
  ['Cookie Settings', '/cookies'],
  ['Medical Disclaimer', '/medical-disclaimer'],
];

function Block({ b }) {
  if (b.t === 'h2') return <h2>{b.x}</h2>;
  if (b.t === 'h3') return <h3>{b.x}</h3>;
  if (b.t === 'ul') return <ul>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
  if (b.t === 'quote') return <blockquote>{b.x}</blockquote>;
  return <p>{b.x}</p>;
}

export default function LegalPage({ title, updated, intro, blocks, path }) {
  const { t } = useLang();
  return (
    <>
      <Seo title={title} path={path} description={intro} />
      <section style={{ background: 'linear-gradient(180deg,#f4f9f8,#fbfcfe)', padding: '48px 0 36px' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Reveal>
            <LogoMark size={48} />
            <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '16px 0 10px' }}>{title}</h1>
            <p className="muted" style={{ fontSize: 14.5 }}>{t('Last updated', 'கடைசியாக புதுப்பிக்கப்பட்டது')}: {updated}</p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '40px 0 64px' }}>
        <div className="container" style={{ maxWidth: 760, display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          <div className="prose">
            <p style={{ fontSize: 19, color: '#28344a' }}>{intro}</p>
            {blocks.map((b, i) => <Block key={i} b={b} />)}
          </div>

          <div style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid #e8edf3' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, color: '#1e3a5f', fontSize: 14, marginBottom: 12 }}>
              {t('More information', 'மேலும் தகவல்')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {LEGAL_LINKS.filter(([, to]) => to !== path).map(([label, to]) => (
                <Link key={to} to={to} className="btn btn-ghost btn-sm">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
