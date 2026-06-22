import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import Reveal, { RevealGroup, RevealItem } from '../../components/Reveal';
import { CATEGORIES } from './categories';
import { ALL_ARTICLES } from './articles';
import { useLang } from '../../content/i18n';
import {
  DropIcon, HeartPulseIcon, SeedlingIcon, MoonIcon, BrainIcon, FlowerIcon, ArrowIcon, Tile,
} from '../../components/icons/Icons';

const ICONS = { drop: DropIcon, heart: HeartPulseIcon, seedling: SeedlingIcon, moon: MoonIcon, brain: BrainIcon, flower: FlowerIcon };

export default function Library() {
  const { t } = useLang();
  const featured = ALL_ARTICLES.slice(0, 3);
  return (
    <>
      <Seo title="Health Library" path="/health-library"
        description="Evidence-based, warmly written articles on the menstrual cycle, PCOS, fertility, perimenopause and mental wellbeing — by Dear Akka and SMF." />

      <section style={{ background: 'linear-gradient(180deg,#eefaf8,#fbfcfe)', padding: '64px 0 48px' }}>
        <div className="container center" style={{ maxWidth: 760 }}>
          <Reveal>
            <span className="eyebrow">{t('Health Library', 'ஆரோக்கிய நூலகம்')}</span>
            <h1 style={{ fontSize: 'clamp(32px,4.6vw,50px)', margin: '14px 0 16px' }}>
              {t('Knowledge is the kindest medicine', 'அறிவே மிக அன்பான மருந்து')}
            </h1>
            <p style={{ fontSize: 19, color: '#52617a', lineHeight: 1.6 }}>
              {t('Clear, caring, evidence-based answers about your body — written in Akka’s warm voice and reviewed by the doctors at Sundaram Medical Foundation.',
                 'உங்கள் உடலைப் பற்றிய தெளிவான, அக்கறையான, ஆதார அடிப்படையிலான பதில்கள் — சுந்தரம் மெடிக்கல் ஃபவுண்டேஷன் மருத்துவர்களால் சரிபார்க்கப்பட்டது.')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* categories */}
      <section className="section-tight">
        <div className="container">
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon] || DropIcon;
              const count = ALL_ARTICLES.filter((a) => a.categoryId === c.id).length;
              return (
                <RevealItem key={c.id}>
                  <Link to={`/health-library/${c.id}`} className="card lib-card"
                    style={{ display: 'block', padding: 28, height: '100%' }}>
                    <Tile size={54} bg={c.soft}><Icon size={28} c={c.accent} /></Tile>
                    <h3 style={{ fontSize: 20, margin: '18px 0 8px' }}>{t(c.title[0], c.title[1])}</h3>
                    <p className="muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14 }}>{t(c.blurb[0], c.blurb[1])}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: c.accent, fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 14 }}>
                      {count} {t('articles', 'கட்டுரைகள்')} <ArrowIcon size={15} c={c.accent} />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* featured */}
      <section className="section" style={{ background: '#fff9f4' }}>
        <div className="container">
          <Reveal><h2 style={{ fontSize: 28, marginBottom: 28 }}>{t('Start here', 'இங்கே தொடங்குங்கள்')}</h2></Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
            {featured.map((a) => <RevealItem key={a.id}><ArticleCard a={a} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>

      <DisclaimerStrip t={t} />
      <style>{`
        .lib-card{ transition: transform .2s, box-shadow .2s; }
        .lib-card:hover{ transform: translateY(-4px); box-shadow: 0 18px 50px rgba(30,58,95,0.12); }
        @media (max-width:880px){ .feat-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:560px){ .feat-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </>
  );
}

export function ArticleCard({ a }) {
  const cat = CATEGORIES.find((c) => c.id === a.categoryId);
  return (
    <Link to={`/health-library/${a.categoryId}/${a.id}`} className="card lib-card" style={{ display: 'block', padding: 24, height: '100%' }}>
      <span style={{ display: 'inline-block', background: cat?.soft, color: cat?.accent, fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 12, padding: '5px 12px', borderRadius: 999, marginBottom: 14 }}>
        {cat?.title[0]}
      </span>
      <h3 style={{ fontSize: 19, lineHeight: 1.25, marginBottom: 10 }}>{a.title}</h3>
      <p className="muted" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14 }}>{a.excerpt}</p>
      <span className="muted" style={{ fontSize: 13.5 }}>{a.readTime}</span>
    </Link>
  );
}

export function DisclaimerStrip({ t }) {
  return (
    <div style={{ background: '#f4f9f8', borderTop: '1px solid #e8edf3' }}>
      <div className="container" style={{ padding: '22px 24px', textAlign: 'center' }}>
        <p className="muted" style={{ fontSize: 14, maxWidth: 760, margin: '0 auto' }}>
          {t('Dear Akka’s Health Library is for general information and education. It reflects SMF’s clinical grounding but is not a substitute for personal medical advice. Always consult a doctor for your own situation.',
             'Dear Akka-வின் ஆரோக்கிய நூலகம் பொதுத் தகவலுக்கானது. இது தனிப்பட்ட மருத்துவ ஆலோசனைக்கு மாற்றாகாது. உங்கள் சூழ்நிலைக்கு எப்போதும் மருத்துவரை அணுகவும்.')}
        </p>
      </div>
    </div>
  );
}
