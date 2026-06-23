import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { currentCycleDay, getCyclePhase, predict, PHASE_COLORS, toDateStr, fromDateStr } from '../../utils/cycleCalc';

const PHASE_DESC = {
  menstrual: 'Rest, iron-rich foods, and warmth. Your body is doing deep work.',
  follicular: 'Energy rising. Great time to start something new or have brave conversations.',
  ovulation: 'Peak energy and clarity. Connect, create, lead — you are at your most radiant.',
  luteal: 'Turn inward gently. Emotions may feel bigger — that is your body asking for care.',
  none: 'Log your first period to unlock personalised cycle insights.',
};

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function formatDate(str) {
  if (!str) return '';
  return fromDateStr(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function Dashboard() {
  const { user, api } = useAuth();
  const [cycleData, setCycleData] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api('/api/cycle/data').then(d => setCycleData(d.data)),
      api('/api/cycle/logs').then(d => {
        const today = toDateStr(new Date());
        setTodayLog(d.logs.find(l => l.log_date?.slice(0,10) === today) || null);
      }),
    ]).catch(console.error).finally(() => setLoading(false));
  }, [api]);

  const cycleDay = cycleData ? currentCycleDay(cycleData.last_period_start) : null;
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData?.cycle_length) : 'none';
  const pc = PHASE_COLORS[phase];
  const prediction = cycleData ? predict(cycleData.last_period_start, cycleData.cycle_length) : null;

  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const cd = cycleDay ? cycleDay + i : null;
    const p = cd ? getCyclePhase(cd, cycleData?.cycle_length) : 'none';
    return { d, phase: p, isToday: i === 0 };
  });

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--teal)', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(24px,4vw,48px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: 'var(--ink-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
          Good {timeOfDay()}
        </p>
        <h1 style={{ fontSize: 'clamp(26px,3.5vw,34px)', margin: 0 }}>
          {user?.name ? `${user.name}` : 'Your Dashboard'}
        </h1>
      </div>

      {!cycleData ? (
        /* No cycle data onboarding card */
        <div className="card" style={{ padding: 36, textAlign: 'center', borderTop: '4px solid var(--teal)' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌱</div>
          <h2 style={{ fontSize: 22, marginBottom: 10 }}>Set up your cycle</h2>
          <p className="muted" style={{ marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
            Add your last period date so Dear Akka can personalise your insights, predictions, and phase guidance.
          </p>
          <Link to="/app/settings" className="btn btn-primary">Get started</Link>
        </div>
      ) : (
        <>
          {/* Phase hero card */}
          <div className="card" style={{ padding: 'clamp(24px,4vw,36px)', marginBottom: 20, borderTop: `4px solid ${pc.text}`, background: pc.bg, borderColor: 'var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: pc.bg, border: `1.5px solid ${pc.text}33`, borderRadius: 999, padding: '5px 14px', marginBottom: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: pc.text, display: 'inline-block' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: pc.text, fontFamily: "'Plus Jakarta Sans'" }}>{pc.label} phase</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 'clamp(48px,8vw,64px)', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
                    {cycleDay}
                  </span>
                  <span style={{ fontSize: 18, color: 'var(--ink-soft)', fontWeight: 600 }}>/ {cycleData.cycle_length}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-soft)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cycle day</p>
                <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: 420, lineHeight: 1.6 }}>{PHASE_DESC[phase]}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {todayLog ? (
                  <Link to="/app/log" style={{ fontSize: 14, color: 'var(--teal)', fontWeight: 600 }}>✓ Logged today · Edit</Link>
                ) : (
                  <Link to="/app/log" className="btn btn-primary btn-sm">Log today</Link>
                )}
              </div>
            </div>
          </div>

          {/* Week ahead */}
          <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>This week</p>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
              {weekDays.map(({ d, phase: p, isToday }, i) => {
                const wpc = PHASE_COLORS[p];
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 4px', borderRadius: 12, background: isToday ? wpc.bg : 'transparent' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isToday ? wpc.text : 'var(--ink-faint)' }}>{dayNames[d.getDay()]}</span>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: wpc.text, display: 'block', opacity: isToday ? 1 : 0.5 }} />
                    <span style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? wpc.text : 'var(--ink-soft)' }}>{d.getDate()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Predictions */}
          {prediction && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Next period', date: prediction.nextPeriodDate, color: PHASE_COLORS.menstrual.text, detail: `in ${prediction.daysUntilNext} day${prediction.daysUntilNext !== 1 ? 's' : ''}` },
                { label: 'Ovulation', date: prediction.ovulationDate, color: PHASE_COLORS.ovulation.text, detail: '' },
                { label: 'PMS starts', date: prediction.pmsStart, color: PHASE_COLORS.luteal.text, detail: '' },
              ].map(item => (
                <div key={item.label} className="card" style={{ padding: '16px 18px', borderTop: `3px solid ${item.color}` }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: item.color, fontFamily: "'Plus Jakarta Sans'", marginBottom: 2 }}>{formatDate(item.date)}</p>
                  {item.detail && <p style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 2 }}>{item.detail}</p>}
                  <p style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
