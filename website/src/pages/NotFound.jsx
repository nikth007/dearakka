import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { LogoMark } from '../components/Logo';
import { useLang } from '../content/i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Seo title="Page not found" path="/404" />
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container center" style={{ maxWidth: 520 }}>
          <LogoMark size={72} />
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '20px 0 12px' }}>
            {t('This page wandered off', 'இந்தப் பக்கம் தொலைந்துவிட்டது')}
          </h1>
          <p className="muted" style={{ fontSize: 18, marginBottom: 26 }}>
            {t('We couldn’t find what you were looking for — but Akka is still here for you.', 'நீங்கள் தேடியதைக் கண்டுபிடிக்க முடியவில்லை — ஆனால் Akka இன்னும் இங்கே இருக்கிறாள்.')}
          </p>
          <Link to="/" className="btn btn-primary">{t('Back to home', 'முகப்புக்குத் திரும்பு')}</Link>
        </div>
      </section>
    </>
  );
}
