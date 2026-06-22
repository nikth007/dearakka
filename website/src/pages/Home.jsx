import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal';
import PhoneMockup from '../components/PhoneMockup';
import { LogoMark } from '../components/Logo';
import { useLang } from '../content/i18n';
import {
  CalendarIcon, BrainIcon, SparkIcon, ChatIcon, LockIcon, HeartPulseIcon,
  ShieldIcon, StethoscopeIcon, LeafIcon, HandHeartIcon, CheckIcon, ArrowIcon, Tile,
} from '../components/icons/Icons';

const T = '#0d9488', NAVY = '#1e3a5f', AMBER = '#f59e0b';

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <Seo path="/" />
      <Hero t={t} />
      <TrustBar t={t} />
      <Features t={t} />
      <ProductTabs t={t} />
      <Privacy t={t} />
      <Science t={t} />
      <Testimonials t={t} />
      <Plans t={t} />
      <Mission t={t} />
      <FinalCta t={t} />
    </>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero({ t }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#fff9f4 0%, #fbfcfe 60%)' }}>
      {/* organic blobs */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle,#e6f6f4,transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -160, left: -100, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,#fef3e2,transparent 70%)' }} />
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center', padding: '72px 24px 86px' }}>
        <div className="hero-copy">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ marginBottom: 18 }}>
              <LogoMark size={20} /> {t('By Sundaram Medical Foundation', 'சுந்தரம் மெடிக்கல் ஃபவுண்டேஷன்')}
            </span>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 18 }}>
              {t('Understand your body,', 'உங்கள் உடலைப் புரிந்துகொள்ளுங்கள்,')}<br />
              <span style={{ color: T }}>{t('with a sister who knows.', 'அறிந்த அக்காவுடன்.')}</span>
            </h1>
            <p style={{ fontSize: 19, color: '#52617a', lineHeight: 1.6, maxWidth: 520, marginBottom: 28 }}>
              {t(
                'Dear Akka is a warm, private companion for your cycle, mood and health — built by doctors who care, free for every woman.',
                'Dear Akka உங்கள் சுழற்சி, மனநிலை மற்றும் ஆரோக்கியத்திற்கான ஒரு அன்பான, தனிப்பட்ட துணை — அக்கறையுள்ள மருத்துவர்களால் உருவாக்கப்பட்டது, ஒவ்வொரு பெண்ணுக்கும் இலவசம்.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t('Get started — it’s free', 'இலவசமாகத் தொடங்குங்கள்')} <ArrowIcon size={17} c="#fff" />
              </a>
              <Link to="/about" className="btn btn-ghost">{t('Why we built this', 'நாங்கள் ஏன் உருவாக்கினோம்')}</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 26, color: '#52617a', fontSize: 14.5 }}>
              <ShieldIcon size={22} />
              {t('Private by design · Your data never leaves your control · No ads, ever',
                 'வடிவமைப்பால் தனிப்பட்டது · உங்கள் தரவு உங்கள் கட்டுப்பாட்டை விட்டு வெளியேறாது · விளம்பரங்கள் இல்லை')}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneMockup screen="home" tilt={2} width={290} />
        </motion.div>
      </div>
      <style>{`@media (max-width: 880px){
        section .hero-copy{ text-align:center; }
        section .hero-copy .eyebrow{ justify-content:center; }
        .container > div[style*="grid-template-columns: 1.05fr"]{ grid-template-columns: 1fr !important; }
      }`}</style>
    </section>
  );
}

/* ───────────────────────── TRUST BAR ───────────────────────── */
function TrustBar({ t }) {
  const items = [
    [StethoscopeIcon, t('Built with SMF doctors', 'SMF மருத்துவர்களுடன்')],
    [HandHeartIcon, t('Women-led care', 'பெண்கள் வழிநடத்தும் சேவை')],
    [ShieldIcon, t('Privacy-first, never sold', 'தனியுரிமை முதன்மை')],
    [LeafIcon, t('Free & not-for-profit', 'இலவசம் & இலாப நோக்கற்றது')],
  ];
  return (
    <div style={{ borderBottom: '1px solid #eef2f7', background: '#fff' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, padding: '22px 24px' }}>
        {items.map(([Icon, label], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: NAVY, fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 15 }}>
            <Icon size={24} /> {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── FEATURES ───────────────────────── */
function Features({ t }) {
  const feats = [
    [CalendarIcon, t('Track in seconds', 'நொடிகளில் பதிவு'), t('Log your period, flow and symptoms with a single warm tap. No clutter, no judgement.', 'ஒரே தட்டலில் உங்கள் மாதவிடாயைப் பதிவு செய்யுங்கள்.')],
    [BrainIcon, t('See your mood patterns', 'மனநிலை வடிவங்கள்'), t('Watch how each phase shapes your energy and emotions, so nothing feels random anymore.', 'ஒவ்வொரு கட்டமும் உங்கள் உணர்வுகளை எவ்வாறு வடிவமைக்கிறது என்பதைப் பாருங்கள்.')],
    [SparkIcon, t('Know what’s coming', 'என்ன வரப்போகிறது'), t('Get gentle heads-up for your period, PMS and ovulation — never caught off guard.', 'உங்கள் மாதவிடாய், PMS மற்றும் அண்டவிடுப்புக்கு முன்னறிவிப்பு.')],
    [HeartPulseIcon, t('Predictions that learn you', 'உங்களைக் கற்கும் கணிப்புகள்'), t('The more you log, the more Akka understands your unique rhythm — not an average.', 'நீங்கள் பதிவு செய்யும்தோறும், Akka உங்கள் தனித்துவமான தாளத்தைப் புரிந்துகொள்கிறது.')],
    [ChatIcon, t('Ask Akka anything', 'அக்காவிடம் கேள்'), t('A warm, science-aware companion to answer the questions you can’t always ask aloud.', 'உரக்கக் கேட்க முடியாத கேள்விகளுக்கு பதிலளிக்கும் துணை.')],
    [LockIcon, t('Your private space', 'உங்கள் தனிப்பட்ட இடம்'), t('Everything stays on your device. No selling, no sharing, no ads. Just you and Akka.', 'எல்லாம் உங்கள் சாதனத்திலேயே இருக்கும். விற்பனை இல்லை.')],
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="center" style={{ maxWidth: 680, margin: '0 auto 56px' }}>
            <span className="eyebrow">{t('Get to know your rhythm', 'உங்கள் தாளத்தை அறியுங்கள்')}</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '14px 0 14px' }}>
              {t('Everything you need to feel at home in your body', 'உங்கள் உடலில் வசதியாக உணர தேவையான அனைத்தும்')}
            </h2>
            <p className="muted" style={{ fontSize: 18 }}>
              {t('Six gentle tools, one calm space — designed around how women in India actually live.',
                 'ஆறு மென்மையான கருவிகள், ஒரு அமைதியான இடம்.')}
            </p>
          </div>
        </Reveal>
        <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="feat-grid">
          {feats.map(([Icon, title, body], i) => (
            <RevealItem key={i}>
              <div className="card" style={{ padding: 26, height: '100%' }}>
                <Tile size={54}><Icon size={28} /></Tile>
                <h3 style={{ fontSize: 20, margin: '18px 0 8px' }}>{title}</h3>
                <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.6 }}>{body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <style>{`@media (max-width:880px){ .feat-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:560px){ .feat-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ───────────────────────── PRODUCT TABS ───────────────────────── */
function ProductTabs({ t }) {
  const tabs = [
    { key: 'home', label: t('Period Tracking', 'மாதவிடாய்'), to: '/products/period-tracking', glow: 'rose',
      title: t('A whole month, at a glance', 'ஒரு மாதம் முழுவதும், ஒரே பார்வையில்'),
      body: t('Your signature cycle view shows exactly where you are today and what’s ahead — calm, clear and personal.', 'உங்கள் சுழற்சிக் காட்சி இன்று நீங்கள் எங்கே இருக்கிறீர்கள் என்பதைக் காட்டுகிறது.') },
    { key: 'mood', label: t('Mood & Mind', 'மனநிலை'), to: '/products/mood-mind', glow: 'teal',
      title: t('Your feelings, finally explained', 'உங்கள் உணர்வுகள், விளக்கப்பட்டது'),
      body: t('See the link between your hormones and your heart. Understanding why brings so much relief.', 'உங்கள் ஹார்மோன்களுக்கும் உணர்வுகளுக்கும் இடையிலான தொடர்பைப் பாருங்கள்.') },
    { key: 'track', label: t('Symptom Tracking', 'அறிகுறிகள்'), to: '/products/symptom-tracking', glow: 'rose',
      title: t('Notice the patterns that matter', 'முக்கியமான வடிவங்களைக் கவனியுங்கள்'),
      body: t('Cramps, sleep, skin, cravings and more — logged in seconds, turned into insight you can act on.', 'வலி, தூக்கம், சருமம் — நொடிகளில் பதிவு செய்யப்படுகிறது.') },
    { key: 'predict', label: t('Predictions', 'கணிப்புகள்'), to: '/products/predictions', glow: 'teal',
      title: t('Predictions made just for you', 'உங்களுக்காகவே கணிப்புகள்'),
      body: t('Not a textbook 28-day average — Akka learns your real cycle and tells you what’s likely, with honest confidence.', 'பாடநூல் சராசரி அல்ல — Akka உங்கள் உண்மையான சுழற்சியைக் கற்கிறது.') },
    { key: 'chat', label: t('Ask Akka', 'அக்காவிடம் கேள்'), to: '/products/ask-akka', glow: 'teal',
      title: t('The sister you can ask anything', 'எதையும் கேட்கக்கூடிய அக்கா'),
      body: t('Warm, private, judgement-free answers grounded in real health science — whenever you need them.', 'அன்பான, தனிப்பட்ட, தீர்ப்பு இல்லாத பதில்கள்.') },
  ];
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg,#fbfcfe,#f4f9f8)' }}>
      <div className="container">
        <Reveal><div className="center" style={{ marginBottom: 36 }}>
          <span className="eyebrow">{t('One app, five gentle tools', 'ஒரு செயலி, ஐந்து கருவிகள்')}</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 14 }}>{t('Explore what Akka can do', 'Akka என்ன செய்ய முடியும்')}</h2>
        </div></Reveal>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {tabs.map((tb, i) => (
            <button key={tb.key} onClick={() => setActive(i)}
              style={{
                padding: '10px 20px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 14.5,
                background: i === active ? T : '#fff', color: i === active ? '#fff' : NAVY,
                border: `1.5px solid ${i === active ? T : '#e3e9f0'}`, transition: 'all .2s',
                boxShadow: i === active ? '0 8px 20px rgba(13,148,136,0.22)' : 'none',
              }}>
              {tb.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab.key}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }} className="tab-grid">
            <div className="tab-copy">
              <h3 style={{ fontSize: 'clamp(24px,3.4vw,32px)', marginBottom: 14 }}>{tab.title}</h3>
              <p style={{ fontSize: 18, color: '#52617a', lineHeight: 1.65, marginBottom: 24 }}>{tab.body}</p>
              <Link to={tab.to} className="btn btn-ghost">{t('Learn more', 'மேலும் அறிக')} <ArrowIcon size={16} /></Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PhoneMockup screen={tab.key} glow={tab.glow} width={264} tilt={-2} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`@media (max-width:880px){ .tab-grid{ grid-template-columns:1fr !important; }
        .tab-copy{ text-align:center; order:2; } }`}</style>
    </section>
  );
}

/* ───────────────────────── PRIVACY ───────────────────────── */
function Privacy({ t }) {
  const points = [
    t('Your cycle data lives on your device, not on our servers.', 'உங்கள் தரவு உங்கள் சாதனத்தில் வாழ்கிறது.'),
    t('We never sell or share your information — there is no one to sell it to.', 'நாங்கள் உங்கள் தகவலை விற்கவோ பகிரவோ இல்லை.'),
    t('No advertising trackers. No data brokers. No hidden agendas.', 'விளம்பர டிராக்கர்கள் இல்லை.'),
    t('You can export or delete everything, any time, in one tap.', 'எப்போது வேண்டுமானாலும் அழிக்கலாம்.'),
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="priv-grid">
          <Reveal>
            <div style={{
              background: 'linear-gradient(150deg,#0d9488,#0a7468)', borderRadius: 28, padding: '46px 40px',
              color: '#fff', boxShadow: '0 24px 60px rgba(13,148,136,0.28)',
            }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <ShieldIcon size={34} c="#fff" />
              </div>
              <h2 style={{ color: '#fff', fontSize: 30, marginBottom: 14 }}>{t('Your data is safe with us', 'உங்கள் தரவு எங்களிடம் பாதுகாப்பானது')}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>
                {t('In a world that sells women’s health data, we made a different choice. Your most private information stays yours — fully, and forever.',
                   'பெண்களின் ஆரோக்கியத் தரவை விற்கும் உலகில், நாங்கள் வேறு வழியைத் தேர்ந்தெடுத்தோம். உங்கள் தகவல் உங்களுடையதாகவே இருக்கும்.')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">{t('Privacy-first, always', 'எப்போதும் தனியுரிமை முதன்மை')}</span>
              <h3 style={{ fontSize: 26, margin: '14px 0 22px' }}>{t('A promise, not a setting', 'ஒரு அமைப்பு அல்ல, ஒரு வாக்குறுதி')}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {points.map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon size={22} /></span>
                    <span style={{ fontSize: 16.5, color: '#28344a' }}>{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/privacy" className="btn btn-ghost" style={{ marginTop: 26 }}>
                {t('Read our privacy promise', 'எங்கள் தனியுரிமை வாக்குறுதியைப் படியுங்கள்')} <ArrowIcon size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width:880px){ .priv-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ───────────────────────── SCIENCE ───────────────────────── */
function Science({ t }) {
  const stats = [
    ['1989', t('SMF caring for Chennai since', 'சென்னையில் அக்கறை')],
    [t('Doctor-led', 'மருத்துவர் வழிநடத்தும்'), t('Every word reviewed by clinicians', 'ஒவ்வொரு வார்த்தையும் மருத்துவர்களால்')],
    [t('Evidence-based', 'ஆதார அடிப்படையில்'), t('Grounded in current medical research', 'தற்போதைய மருத்துவ ஆராய்ச்சி')],
  ];
  return (
    <section className="section" style={{ background: '#fff9f4' }}>
      <div className="container">
        <Reveal><div className="center" style={{ maxWidth: 720, margin: '0 auto 44px' }}>
          <span className="eyebrow" style={{ color: AMBER }}>{t('Built on real care', 'உண்மையான அக்கறையில்')}</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '14px 0 16px' }}>
            {t('Warmth you can feel. Science you can trust.', 'நீங்கள் உணரக்கூடிய அன்பு. நம்பக்கூடிய அறிவியல்.')}
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t('Akka speaks like a sister, but every piece of guidance is grounded in evidence and reviewed by the clinicians at Sundaram Medical Foundation.',
               'Akka ஒரு அக்காவைப் போல பேசுகிறது, ஆனால் ஒவ்வொரு வழிகாட்டுதலும் சுந்தரம் மெடிக்கல் ஃபவுண்டேஷனின் மருத்துவர்களால் சரிபார்க்கப்படுகிறது.')}
          </p>
        </div></Reveal>
        <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
          {stats.map(([big, small], i) => (
            <RevealItem key={i}>
              <div className="card" style={{ padding: '32px 26px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 30, color: T, marginBottom: 8 }}>{big}</div>
                <p className="muted" style={{ fontSize: 15.5 }}>{small}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
function Testimonials({ t }) {
  const quotes = [
    [t('“For the first time, my mood swings made sense. Akka showed me they followed my cycle — I’m so much gentler with myself now.”', '“முதல் முறையாக, என் மனநிலை மாற்றங்கள் புரிந்தன.”'), t('Illustrative — a Dear Akka user’s voice', 'விளக்கமான — பயனர் குரல்')],
    [t('“It feels like talking to an elder sister who actually studied medicine. Warm, but never vague.”', '“மருத்துவம் படித்த அக்காவிடம் பேசுவது போல் உணர்கிறது.”'), t('Illustrative — a Dear Akka user’s voice', 'விளக்கமான — பயனர் குரல்')],
    [t('“I love that nothing leaves my phone. My health is finally my own private business.”', '“என் தொலைபேசியை விட்டு எதுவும் வெளியேறாது என்பது எனக்குப் பிடிக்கும்.”'), t('Illustrative — a Dear Akka user’s voice', 'விளக்கமான — பயனர் குரல்')],
  ];
  const [i, setI] = useState(0);
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal><div className="center" style={{ marginBottom: 36 }}>
          <span className="eyebrow">{t('In her own words', 'அவளுடைய வார்த்தைகளில்')}</span>
          <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', marginTop: 14 }}>{t('Care that women feel', 'பெண்கள் உணரும் அக்கறை')}</h2>
        </div></Reveal>
        <div className="card" style={{ padding: '46px 44px', textAlign: 'center', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 'clamp(20px,2.6vw,26px)', color: NAVY, lineHeight: 1.45, marginBottom: 20 }}>
                {quotes[i][0]}
              </p>
              <p className="muted" style={{ fontSize: 14 }}>{quotes[i][1]}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 26 }}>
            {quotes.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Quote ${n + 1}`}
                style={{ width: n === i ? 26 : 9, height: 9, borderRadius: 999, background: n === i ? T : '#d7dee8', transition: 'all .25s' }} />
            ))}
          </div>
        </div>
        <p className="center muted" style={{ fontSize: 13, marginTop: 16 }}>
          {t('These are illustrative testimonials reflecting our community’s voice, not specific named patients.',
             'இவை எங்கள் சமூகத்தின் குரலைப் பிரதிபலிக்கும் விளக்கமான கருத்துக்கள்.')}
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── PLANS ───────────────────────── */
function Plans({ t }) {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg,#f4f9f8,#fbfcfe)' }}>
      <div className="container" style={{ maxWidth: 920 }}>
        <Reveal><div className="center" style={{ marginBottom: 44 }}>
          <span className="eyebrow">{t('Honest and simple', 'நேர்மையானது')}</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 14 }}>{t('Free today. Free for what matters, always.', 'இன்று இலவசம். எப்போதும் இலவசம்.')}</h2>
        </div></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }} className="plan-grid">
          <Reveal>
            <div className="card" style={{ padding: 34, height: '100%', border: `2px solid ${T}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h3 style={{ fontSize: 24 }}>{t('Dear Akka Free', 'Dear Akka இலவசம்')}</h3>
                <span style={{ background: T, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans'" }}>
                  {t('Available now', 'இப்போது கிடைக்கிறது')}
                </span>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 38, color: NAVY, marginBottom: 18 }}>₹0</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
                {[t('Full cycle, period & symptom tracking', 'முழு சுழற்சி கண்காணிப்பு'),
                  t('Personalised predictions that learn you', 'தனிப்பயன் கணிப்புகள்'),
                  t('Ask Akka companion', 'Ask Akka துணை'),
                  t('Complete Health Library', 'முழு ஆரோக்கிய நூலகம்'),
                  t('Private, on-device data', 'தனிப்பட்ட தரவு')].map((f, n) => (
                  <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16 }}>
                    <CheckIcon size={21} /> <span style={{ color: '#28344a' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                {t('Start free', 'இலவசமாகத் தொடங்குங்கள்')}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card" style={{ padding: 34, height: '100%', background: '#fbfcfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h3 style={{ fontSize: 24, color: '#52617a' }}>{t('Dear Akka Plus', 'Dear Akka பிளஸ்')}</h3>
                <span style={{ background: '#eef2f7', color: '#52617a', fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans'" }}>
                  {t('In the works', 'வரவிருக்கிறது')}
                </span>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 38, color: '#8a97ac', marginBottom: 18 }}>
                {t('Later', 'பின்னர்')}
              </div>
              <p className="muted" style={{ fontSize: 15.5, marginBottom: 16 }}>
                {t('One day we may add deeper reports, doctor-connect and family sharing. If we do, the essentials above stay free — that’s our promise.',
                   'ஒரு நாள் நாங்கள் ஆழமான அறிக்கைகள், மருத்துவர் இணைப்பு சேர்க்கலாம். அப்படிச் செய்தால், மேலே உள்ள அத்தியாவசியங்கள் இலவசமாகவே இருக்கும்.')}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[t('In-depth cycle & health reports', 'ஆழமான அறிக்கைகள்'),
                  t('Connect with an SMF doctor', 'SMF மருத்துவருடன் இணைப்பு'),
                  t('Care notes you can share', 'பகிரக்கூடிய குறிப்புகள்')].map((f, n) => (
                  <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, color: '#8a97ac' }}>
                    <span style={{ width: 21, textAlign: 'center' }}>○</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width:760px){ .plan-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

/* ───────────────────────── MISSION ───────────────────────── */
function Mission({ t }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center' }} className="priv-grid">
          <Reveal>
            <div style={{
              borderRadius: 28, padding: 48, textAlign: 'center',
              background: 'linear-gradient(160deg,#fdf2f8,#e6f6f4)', border: '1px solid #eef2f7',
            }}>
              <LogoMark size={96} />
              <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 22, color: NAVY, margin: '20px 0 6px' }}>
                {t('“Akka” means elder sister', '“அக்கா” என்றால் மூத்த சகோதரி')}
              </p>
              <p className="muted" style={{ fontSize: 16 }}>
                {t('The one who guides you, gently and without judgement.', 'மென்மையாக, தீர்ப்பு இல்லாமல் உங்களை வழிநடத்துபவள்.')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">{t('Built by SMF, for every woman', 'ஒவ்வொரு பெண்ணுக்கும்')}</span>
              <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', margin: '14px 0 18px' }}>
                {t('Good health advice shouldn’t depend on what you can afford', 'நல்ல ஆரோக்கிய ஆலோசனை உங்கள் வசதியைப் பொறுத்ததாக இருக்கக்கூடாது')}
              </h2>
              <p style={{ fontSize: 17.5, color: '#52617a', lineHeight: 1.7, marginBottom: 18 }}>
                {t('Too many women grow up with shame and silence around their bodies. We built Dear Akka so that every woman — whatever her background — has a trustworthy, caring guide in her pocket.',
                   'பல பெண்கள் தங்கள் உடல்களைப் பற்றிய வெட்கத்துடனும் மௌனத்துடனும் வளர்கிறார்கள். ஒவ்வொரு பெண்ணுக்கும் ஒரு நம்பகமான வழிகாட்டி இருக்க வேண்டும் என்பதற்காக Dear Akka-வை உருவாக்கினோம்.')}
              </p>
              <p style={{ fontSize: 17.5, color: '#52617a', lineHeight: 1.7, marginBottom: 24 }}>
                {t('Sundaram Medical Foundation has served Chennai families since 1989. Dear Akka carries that same not-for-profit spirit into your phone.',
                   'சுந்தரம் மெடிக்கல் ஃபவுண்டேஷன் 1989 முதல் சென்னை குடும்பங்களுக்கு சேவை செய்து வருகிறது.')}
              </p>
              <Link to="/about" className="btn btn-primary">{t('Read our full story', 'எங்கள் கதையைப் படியுங்கள்')} <ArrowIcon size={16} c="#fff" /></Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FINAL CTA ───────────────────────── */
function FinalCta({ t }) {
  return (
    <section style={{ background: 'linear-gradient(150deg,#1e3a5f,#13273f)', padding: '88px 0' }}>
      <div className="container center">
        <Reveal>
          <LogoMark size={64} tone="light" />
          <h2 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,42px)', margin: '20px 0 16px' }}>
            {t('Your body has a rhythm. Let’s understand it together.', 'உங்கள் உடலுக்கு ஒரு தாளம் உள்ளது. அதை ஒன்றாகப் புரிந்துகொள்வோம்.')}
          </h2>
          <p style={{ color: '#a7b6cc', fontSize: 18, maxWidth: 560, margin: '0 auto 30px' }}>
            {t('Free, private and made with love in Chennai. Akka is ready whenever you are.',
               'இலவசம், தனிப்பட்டது, சென்னையில் அன்புடன் உருவாக்கப்பட்டது.')}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn btn-amber">
              {t('Open Dear Akka', 'Dear Akka திறக்கவும்')} <ArrowIcon size={17} c="#3a2400" />
            </a>
            <Link to="/health-library" className="btn btn-light">{t('Explore the Health Library', 'ஆரோக்கிய நூலகம்')}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
