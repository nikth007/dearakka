import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Logo, { LogoMark } from '../components/Logo';
import PhoneMockup from '../components/PhoneMockup';
import { useLang } from '../content/i18n';
import { ShieldIcon, CheckIcon, ArrowIcon } from '../components/icons/Icons';

const T = '#0d9488', NAVY = '#1e3a5f';
const APP_URL = 'https://nikth007.github.io/dearakka/';

// ── Backend hookup point ───────────────────────────────────────────────
// Wire these to the Neon/Postgres backend when available. For now they are
// clearly-marked stubs that validate input and route into the app.
// Expected backend: POST /api/auth/signup { email, password, name }
//                   POST /api/auth/login  { email, password }
async function submitAuth({ mode, email, password, name }) {
  // TODO(backend): replace with real fetch to Neon-backed auth endpoint.
  // const res = await fetch(`/api/auth/${mode === 'signup' ? 'signup' : 'login'}`, {
  //   method: 'POST', headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password, name }),
  // });
  // if (!res.ok) throw new Error((await res.json()).message || 'Something went wrong');
  // return res.json();
  await new Promise((r) => setTimeout(r, 700)); // simulate latency
  return { ok: true, stub: true };
}

export default function Auth({ mode: initialMode = 'login' }) {
  const { t } = useLang();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', note: '' });

  const isSignup = mode === 'signup';
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: '', note: '' });
    if (!form.email.includes('@') || form.password.length < 6) {
      setStatus({ loading: false, error: t('Please enter a valid email and a password of at least 6 characters.', 'சரியான மின்னஞ்சல் மற்றும் குறைந்தது 6 எழுத்துகள் கொண்ட கடவுச்சொல்லை உள்ளிடவும்.'), note: '' });
      return;
    }
    try {
      const r = await submitAuth({ mode, ...form });
      if (r.stub) {
        // No live backend yet — take her into the app, which works offline & on-device.
        setStatus({ loading: false, error: '', note: t('Taking you to Dear Akka…', 'உங்களை Dear Akka-விற்கு அழைத்துச் செல்கிறோம்…') });
        setTimeout(() => { window.location.href = APP_URL; }, 900);
      } else {
        window.location.href = APP_URL;
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message, note: '' });
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr' }} className="auth-wrap">
      <Seo title={isSignup ? 'Create your account' : 'Log in'} path={isSignup ? '/signup' : '/login'} />

      {/* form side */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '32px clamp(24px, 6vw, 80px)' }}>
        <Link to="/" aria-label="Dear Akka home" style={{ marginBottom: 'auto' }}><Logo size={22} /></Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 420, margin: '32px 0', alignSelf: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px,3.6vw,36px)', marginBottom: 8 }}>
            {isSignup ? t('Create your account', 'உங்கள் கணக்கை உருவாக்குங்கள்') : t('Welcome back', 'மீண்டும் வரவேற்கிறோம்')}
          </h1>
          <p className="muted" style={{ fontSize: 16.5, marginBottom: 28 }}>
            {isSignup
              ? t('Your private space with Akka takes a moment to set up.', 'Akka-வுடன் உங்கள் தனிப்பட்ட இடம் ஒரு நொடியில் தயாராகும்.')
              : t('Akka has been waiting for you.', 'Akka உங்களுக்காகக் காத்திருந்தாள்.')}
          </p>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {isSignup && (
              <Field label={t('Your name', 'உங்கள் பெயர்')} value={form.name} onChange={set('name')}
                placeholder={t('What should Akka call you?', 'Akka உங்களை என்ன அழைக்க வேண்டும்?')} />
            )}
            <Field label={t('Email', 'மின்னஞ்சல்')} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            <Field label={t('Password', 'கடவுச்சொல்')} type="password" value={form.password} onChange={set('password')} placeholder={t('At least 6 characters', 'குறைந்தது 6 எழுத்துகள்')} />

            {!isSignup && (
              <div style={{ textAlign: 'right', marginTop: -6 }}>
                <button type="button" onClick={() => setStatus((s) => ({ ...s, note: t('Password reset is coming soon. For now, your data lives safely on your device.', 'கடவுச்சொல் மீட்டமைப்பு விரைவில் வரும்.') }))}
                  style={{ color: T, fontWeight: 600, fontSize: 14 }}>
                  {t('Forgot password?', 'கடவுச்சொல் மறந்துவிட்டதா?')}
                </button>
              </div>
            )}

            {status.error && <Banner tone="error">{status.error}</Banner>}
            {status.note && <Banner tone="ok">{status.note}</Banner>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={status.loading}>
              {status.loading ? t('Just a moment…', 'ஒரு நொடி…') : isSignup ? t('Create account', 'கணக்கை உருவாக்கு') : t('Log in', 'உள்நுழை')}
              {!status.loading && <ArrowIcon size={16} c="#fff" />}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8a97ac', fontSize: 14, margin: '22px 0' }}>
            <span style={{ flex: 1, height: 1, background: '#e8edf3' }} /> {t('or', 'அல்லது')} <span style={{ flex: 1, height: 1, background: '#e8edf3' }} />
          </div>

          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%' }}>
            {t('Continue without an account', 'கணக்கு இல்லாமல் தொடரவும்')}
          </a>
          <p className="muted center" style={{ fontSize: 13, marginTop: 10 }}>
            {t('Dear Akka works fully offline — an account just lets you sync later.', 'Dear Akka முழுமையாக ஆஃப்லைனில் வேலை செய்கிறது.')}
          </p>

          <p className="center" style={{ marginTop: 24, fontSize: 15.5, color: '#52617a' }}>
            {isSignup ? t('Already with Akka?', 'ஏற்கனவே Akka-வுடன்?') : t('New here?', 'புதியவரா?')}{' '}
            <button onClick={() => setMode(isSignup ? 'login' : 'signup')} style={{ color: T, fontWeight: 700 }}>
              {isSignup ? t('Log in', 'உள்நுழை') : t('Create an account', 'கணக்கை உருவாக்கு')}
            </button>
          </p>
        </motion.div>

        <p className="muted" style={{ fontSize: 12.5, marginTop: 'auto' }}>
          {t('By continuing you agree to our', 'தொடர்வதன் மூலம் நீங்கள் ஒப்புக்கொள்கிறீர்கள்')}{' '}
          <Link to="/terms" style={{ color: '#52617a', textDecoration: 'underline' }}>{t('Terms', 'விதிமுறைகள்')}</Link> & {' '}
          <Link to="/privacy" style={{ color: '#52617a', textDecoration: 'underline' }}>{t('Privacy Policy', 'தனியுரிமைக் கொள்கை')}</Link>.
        </p>
      </div>

      {/* brand side */}
      <div style={{ background: 'linear-gradient(160deg,#0d9488,#13273f)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, position: 'relative', overflow: 'hidden' }} className="auth-brand">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <PhoneMockup screen="home" width={250} />
        <div style={{ maxWidth: 360, textAlign: 'center', marginTop: 34, color: '#fff' }}>
          <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 12 }}>{t('Private by design', 'வடிவமைப்பால் தனிப்பட்டது')}</h2>
          {[
            t('Your health data stays on your device', 'உங்கள் தரவு உங்கள் சாதனத்தில் இருக்கும்'),
            t('Never sold, never shared, no ads', 'விற்கப்படாது, பகிரப்படாது, விளம்பரம் இல்லை'),
            t('Free, by Sundaram Medical Foundation', 'இலவசம், SMF மூலம்'),
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', margin: '10px 0', color: 'rgba(255,255,255,0.92)', fontSize: 15.5 }}>
              <CheckIcon size={20} c="#fff" /> {p}
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width:880px){
        .auth-wrap{ grid-template-columns:1fr !important; }
        .auth-brand{ display:none !important; }
      }`}</style>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 14, color: NAVY, marginBottom: 7 }}>{label}</span>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} required
        style={{
          width: '100%', padding: '14px 16px', fontSize: 16, fontFamily: "'Inter'",
          border: '1.5px solid #e3e9f0', borderRadius: 12, background: '#fbfcfe', color: NAVY, outline: 'none',
          transition: 'border-color .15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = T)}
        onBlur={(e) => (e.target.style.borderColor = '#e3e9f0')}
      />
    </label>
  );
}

function Banner({ tone, children }) {
  const ok = tone === 'ok';
  return (
    <div style={{
      display: 'flex', gap: 9, alignItems: 'center', padding: '11px 14px', borderRadius: 11, fontSize: 14.5,
      background: ok ? 'rgba(13,148,136,0.10)' : 'rgba(192,69,122,0.10)',
      color: ok ? '#0a7468' : '#9b1d54', border: `1px solid ${ok ? 'rgba(13,148,136,0.25)' : 'rgba(192,69,122,0.25)'}`,
    }}>
      {ok ? <ShieldIcon size={18} c="#0a7468" /> : <span style={{ fontWeight: 700 }}>!</span>}
      {children}
    </div>
  );
}
