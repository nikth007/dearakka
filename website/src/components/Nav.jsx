import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { GlobeIcon, ArrowIcon } from './icons/Icons';
import { useLang } from '../content/i18n';

const PRODUCTS = [
  { to: '/products/period-tracking', en: 'Period Tracking', ta: 'மாதவிடாய் கண்காணிப்பு', desc: 'Log in seconds, see your rhythm' },
  { to: '/products/mood-mind', en: 'Mood & Mind', ta: 'மனநிலை', desc: 'How your cycle shapes your feelings' },
  { to: '/products/symptom-tracking', en: 'Symptom Tracking', ta: 'அறிகுறி கண்காணிப்பு', desc: 'Cramps, sleep, skin, energy & more' },
  { to: '/products/predictions', en: 'Personalised Predictions', ta: 'கணிப்புகள்', desc: 'Period, PMS & fertile windows' },
  { to: '/products/ask-akka', en: 'Ask Akka', ta: 'அக்காவிடம் கேள்', desc: 'A warm companion for your questions' },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);   // mobile
  const [openProd, setOpenProd] = useState(false);   // desktop dropdown
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpenMenu(false); setOpenProd(false); }, [loc.pathname]);

  const navLink = ({ isActive }) => ({
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600, fontSize: 15.5,
    color: isActive ? '#0d9488' : '#1e3a5f',
    padding: '8px 2px', position: 'relative',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
      backdropFilter: 'saturate(180%) blur(14px)',
      borderBottom: scrolled ? '1px solid #e8edf3' : '1px solid transparent',
      transition: 'all .25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" aria-label="Dear Akka home"><Logo size={22} /></Link>

        {/* desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <NavLink to="/" style={navLink} end>{t('Home', 'முகப்பு')}</NavLink>

          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setOpenProd(true)}
            onMouseLeave={() => setOpenProd(false)}
          >
            <button style={{ ...navLink({ isActive: loc.pathname.startsWith('/products') }), display: 'flex', alignItems: 'center', gap: 5 }}>
              {t('Products', 'தயாரிப்புகள்')}
              <svg width="12" height="12" viewBox="0 0 24 24" style={{ transform: openProd ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence>
              {openProd && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginTop: 12, width: 340, background: '#fff', borderRadius: 18,
                    boxShadow: '0 18px 50px rgba(30,58,95,0.16)', border: '1px solid #eef2f7', padding: 10,
                  }}
                >
                  {PRODUCTS.map((p) => (
                    <Link key={p.to} to={p.to} style={{ display: 'block', padding: '11px 13px', borderRadius: 12 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f4f9f8')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 14.5, color: '#1e3a5f' }}>{t(p.en, p.ta)}</div>
                      <div style={{ fontSize: 12.5, color: '#8a97ac' }}>{p.desc}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/health-library" style={navLink}>{t('Health Library', 'ஆரோக்கிய நூலகம்')}</NavLink>
          <NavLink to="/about" style={navLink}>{t('About Akka', 'அக்கா பற்றி')}</NavLink>

          <button
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#52617a', fontWeight: 600, fontSize: 14.5, fontFamily: "'Plus Jakarta Sans'" }}
            aria-label="Toggle language"
          >
            <GlobeIcon size={19} />
            {lang === 'en' ? 'தமிழ்' : 'EN'}
          </button>

          <Link to="/login" className="btn btn-primary btn-sm" style={{ marginLeft: 4 }}>
            {t('Log in', 'உள்நுழை')}
          </Link>
        </nav>

        {/* mobile hamburger */}
        <button className="mobile-burger" onClick={() => setOpenMenu(true)} aria-label="Open menu"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}>
          <span style={{ width: 24, height: 2.4, background: '#1e3a5f', borderRadius: 2 }} />
          <span style={{ width: 24, height: 2.4, background: '#1e3a5f', borderRadius: 2 }} />
          <span style={{ width: 24, height: 2.4, background: '#1e3a5f', borderRadius: 2 }} />
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15,36,65,0.4)', zIndex: 200 }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(86vw, 360px)',
                background: '#fff', zIndex: 201, padding: 22, overflowY: 'auto',
                boxShadow: '-20px 0 50px rgba(30,58,95,0.18)',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Logo size={20} />
                <button onClick={() => setOpenMenu(false)} aria-label="Close" style={{ fontSize: 26, color: '#52617a', lineHeight: 1 }}>×</button>
              </div>
              <MobileLink to="/" label={t('Home', 'முகப்பு')} />
              <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 13, color: '#8a97ac', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '16px 0 6px' }}>
                {t('Products', 'தயாரிப்புகள்')}
              </div>
              {PRODUCTS.map((p) => <MobileLink key={p.to} to={p.to} label={t(p.en, p.ta)} sub />)}
              <div style={{ height: 14 }} />
              <MobileLink to="/health-library" label={t('Health Library', 'ஆரோக்கிய நூலகம்')} />
              <MobileLink to="/about" label={t('About Akka', 'அக்கா பற்றி')} />
              <div style={{ height: 18 }} />
              <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#52617a', fontWeight: 600, marginBottom: 16, fontFamily: "'Plus Jakarta Sans'" }}>
                <GlobeIcon size={20} /> {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>
              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                {t('Log in / Sign up', 'உள்நுழை / பதிவு')} <ArrowIcon size={16} c="#fff" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function MobileLink({ to, label, sub }) {
  return (
    <NavLink to={to} end={to === '/'}
      style={({ isActive }) => ({
        display: 'block', padding: sub ? '9px 12px' : '11px 0',
        fontFamily: "'Plus Jakarta Sans'", fontWeight: sub ? 600 : 700,
        fontSize: sub ? 15 : 17, color: isActive ? '#0d9488' : '#1e3a5f',
        marginLeft: sub ? 4 : 0,
      })}>
      {label}
    </NavLink>
  );
}
