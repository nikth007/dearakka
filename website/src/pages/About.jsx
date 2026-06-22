import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { useLang } from '../content/i18n';
import {
  HandHeartIcon, ShieldIcon, StethoscopeIcon, LeafIcon, ArrowIcon, Tile,
} from '../components/icons/Icons';

const NAVY = '#1e3a5f', T = '#0d9488';

export default function About() {
  const { t } = useLang();
  const values = [
    [HandHeartIcon, t('Care without judgement', 'தீர்ப்பு இல்லாத அக்கறை'), t('Every woman deserves a guide who meets her with warmth, never shame — whatever her question, whatever her background.', 'ஒவ்வொரு பெண்ணும் அன்புடன் சந்திக்கும் வழிகாட்டிக்கு தகுதியானவள்.')],
    [StethoscopeIcon, t('Grounded in medicine', 'மருத்துவத்தில் வேரூன்றியது'), t('Akka’s warmth is matched by rigour. Guidance is evidence-based and reviewed by SMF clinicians.', 'Akka-வின் அன்பு கடுமையுடன் இணைந்துள்ளது. வழிகாட்டுதல் மருத்துவர்களால் சரிபார்க்கப்படுகிறது.')],
    [ShieldIcon, t('Privacy as a principle', 'தனியுரிமை ஒரு கொள்கை'), t('We will never sell or exploit women’s health data. Your information stays yours, fully and forever.', 'பெண்களின் ஆரோக்கியத் தரவை நாங்கள் ஒருபோதும் விற்க மாட்டோம்.')],
    [LeafIcon, t('Free, for everyone', 'அனைவருக்கும் இலவசம்'), t('Built by a not-for-profit hospital, Dear Akka’s essentials will always be free, regardless of what you can afford.', 'ஒரு தொண்டு மருத்துவமனையால் உருவாக்கப்பட்டது, அத்தியாவசியங்கள் எப்போதும் இலவசம்.')],
  ];
  return (
    <>
      <Seo title="About Akka" path="/about"
        description="Why Sundaram Medical Foundation built Dear Akka — the meaning of Akka, women-led care, and our promise on privacy." />

      {/* hero */}
      <section style={{ background: 'linear-gradient(180deg,#fdf2f8,#fbfcfe)', padding: '64px 0 56px' }}>
        <div className="container center" style={{ maxWidth: 760 }}>
          <Reveal>
            <LogoMark size={72} />
            <h1 style={{ fontSize: 'clamp(32px,4.6vw,50px)', margin: '20px 0 16px' }}>
              {t('Meet the sister behind the app', 'செயலிக்குப் பின்னால் உள்ள அக்காவைச் சந்திக்கவும்')}
            </h1>
            <p style={{ fontSize: 19, color: '#52617a', lineHeight: 1.6 }}>
              {t('Dear Akka was born from a simple belief: every woman deserves a knowledgeable, caring guide to her own body — one that respects her privacy and never makes her feel ashamed.',
                 'ஒவ்வொரு பெண்ணும் தன் உடலுக்கு ஒரு அறிவார்ந்த, அக்கறையான வழிகாட்டிக்கு தகுதியானவள் என்ற நம்பிக்கையில் Dear Akka பிறந்தது.')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* meaning of akka */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="priv-grid">
            <Reveal>
              <span className="eyebrow">{t('The meaning of Akka', 'அக்கா என்பதன் பொருள்')}</span>
              <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', margin: '14px 0 18px' }}>
                {t('In Tamil, “Akka” means elder sister', 'தமிழில், “அக்கா” என்றால் மூத்த சகோதரி')}
              </h2>
              <p style={{ fontSize: 17.5, color: '#52617a', lineHeight: 1.7, marginBottom: 16 }}>
                {t('She is the one you turn to with the questions you can’t ask anyone else. She doesn’t lecture or judge — she listens, explains gently, and tells you the truth because she loves you.',
                   'வேறு யாரிடமும் கேட்க முடியாத கேள்விகளுடன் நீங்கள் திரும்பும் ஒருவள் அவள். அவள் தீர்ப்பளிக்க மாட்டாள் — அன்புடன் விளக்குகிறாள்.')}
              </p>
              <p style={{ fontSize: 17.5, color: '#52617a', lineHeight: 1.7 }}>
                {t('We named this app Dear Akka because that is exactly the relationship we wanted to build: trustworthy, warm, and always on your side.',
                   'இந்த செயலிக்கு Dear Akka என்று பெயரிட்டோம், ஏனெனில் அதுவே நாங்கள் உருவாக்க விரும்பிய உறவு.')}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ borderRadius: 28, padding: 48, textAlign: 'center', background: 'linear-gradient(160deg,#e6f6f4,#fdf2f8)', border: '1px solid #eef2f7' }}>
                <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: 700, fontSize: 64, color: NAVY, lineHeight: 1 }}>அக்கா</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 22, color: T, marginTop: 10 }}>Akka</div>
                <div className="muted" style={{ fontSize: 16, marginTop: 4 }}>{t('/ak·ka / — elder sister', '/அக்·கா/ — மூத்த சகோதரி')}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* mission band */}
      <section className="section" style={{ background: '#fff9f4' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="eyebrow" style={{ color: '#d97706' }}>{t('Why SMF built this', 'SMF ஏன் இதை உருவாக்கியது')}</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', margin: '14px 0 22px' }}>
              {t('A not-for-profit hospital, caring beyond its walls', 'சுவர்களுக்கு அப்பால் அக்கறை கொள்ளும் ஒரு தொண்டு மருத்துவமனை')}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="prose" style={{ fontSize: 18 }}>
              <p>{t('Sundaram Medical Foundation has served the families of Chennai since 1989, as a trusted not-for-profit hospital built on the idea that good care should reach everyone — not only those who can pay for it.',
                    'சுந்தரம் மெடிக்கல் ஃபவுண்டேஷன் 1989 முதல் சென்னை குடும்பங்களுக்கு சேவை செய்து வருகிறது.')}</p>
              <p>{t('In our clinics, we kept meeting women who had carried confusion and silence about their own bodies for years — not because they lacked intelligence or interest, but because no one had ever explained things to them with patience and respect. Many had absorbed shame instead of knowledge.',
                    'எங்கள் மருத்துவமனைகளில், தங்கள் சொந்த உடல்களைப் பற்றிய குழப்பத்தை வருடக்கணக்காகச் சுமந்த பெண்களை நாங்கள் சந்தித்தோம்.')}</p>
              <p>{t('Dear Akka is our way of bringing that patient, respectful explanation to every woman with a phone — wherever she lives, whatever her background. It carries the same clinical care we offer in person, in a form that fits in her pocket and protects her privacy.',
                    'Dear Akka என்பது அந்த பொறுமையான, மரியாதையான விளக்கத்தை ஒவ்வொரு பெண்ணுக்கும் கொண்டு வரும் எங்கள் வழி.')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="section">
        <div className="container">
          <Reveal><div className="center" style={{ marginBottom: 44 }}>
            <span className="eyebrow">{t('What we stand for', 'நாங்கள் எதற்காக நிற்கிறோம்')}</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)', marginTop: 14 }}>{t('Four promises we won’t break', 'நாங்கள் மீறாத நான்கு வாக்குறுதிகள்')}</h2>
          </div></Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }} className="plan-grid">
            {values.map(([Icon, title, body], i) => (
              <RevealItem key={i}>
                <div className="card" style={{ padding: 28, display: 'flex', gap: 18, height: '100%' }}>
                  <Tile size={54}><Icon size={28} /></Tile>
                  <div>
                    <h3 style={{ fontSize: 19, marginBottom: 8 }}>{title}</h3>
                    <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.6 }}>{body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* cta */}
      <section style={{ background: 'linear-gradient(150deg,#0d9488,#0a7468)', padding: '76px 0' }}>
        <div className="container center">
          <Reveal>
            <h2 style={{ color: '#fff', fontSize: 'clamp(26px,3.6vw,38px)', marginBottom: 14 }}>
              {t('Let Akka walk beside you', 'Akka உங்கள் அருகில் நடக்கட்டும்')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, maxWidth: 520, margin: '0 auto 28px' }}>
              {t('Free, private, and made with love in Chennai.', 'இலவசம், தனிப்பட்டது, சென்னையில் அன்புடன் உருவாக்கப்பட்டது.')}
            </p>
            <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#fff', color: T }}>
              {t('Open Dear Akka', 'Dear Akka திறக்கவும்')} <ArrowIcon size={17} c={T} />
            </a>
          </Reveal>
        </div>
      </section>
      <style>{`@media (max-width:880px){ .priv-grid{ grid-template-columns:1fr !important; } }
        @media (max-width:680px){ .plan-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}
