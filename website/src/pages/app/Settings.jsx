import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toDateStr } from '../../utils/cycleCalc';

export default function Settings() {
  const { user, api } = useAuth();
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api('/api/cycle/data').then(d => {
      if (d.data) {
        setLastPeriodStart(d.data.last_period_start?.slice(0,10) || '');
        setCycleLength(d.data.cycle_length || 28);
        setPeriodLength(d.data.period_length || 5);
      }
    }).catch(console.error);
  }, [api]);

  async function handleSave(e) {
    e.preventDefault();
    if (!lastPeriodStart) return;
    setSaving(true);
    try {
      await api('/api/cycle/data', { method: 'POST', body: { last_period_start: lastPeriodStart, cycle_length: cycleLength, period_length: periodLength } });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(24px,4vw,48px)' }}>
      <h1 style={{ fontSize: 'clamp(24px,3.5vw,32px)', marginBottom: 8 }}>Settings</h1>
      <p className="muted" style={{ marginBottom: 36 }}>Update your cycle details for accurate predictions.</p>

      {/* Account */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Account</p>
        <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{user?.name || '—'}</p>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>{user?.email}</p>
      </div>

      {/* Cycle settings */}
      <form onSubmit={handleSave}>
        <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>Cycle settings</p>

          <FieldGroup label="Last period start date">
            <input type="date" value={lastPeriodStart} onChange={e => setLastPeriodStart(e.target.value)} required max={toDateStr(new Date())}
              style={{ width: '100%', padding: '13px 16px', fontSize: 15, fontFamily: "'Inter'", border: '1.5px solid var(--line)', borderRadius: 12, background: '#fbfcfe', color: 'var(--navy)', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--teal)'}
              onBlur={e => e.target.style.borderColor = 'var(--line)'}
            />
          </FieldGroup>

          <FieldGroup label={`Average cycle length: ${cycleLength} days`}>
            <input type="range" min={21} max={40} value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--teal)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-faint)', marginTop: 4 }}>
              <span>21 days</span><span>40 days</span>
            </div>
          </FieldGroup>

          <FieldGroup label={`Average period length: ${periodLength} days`}>
            <input type="range" min={2} max={10} value={periodLength} onChange={e => setPeriodLength(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--teal)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-faint)', marginTop: 4 }}>
              <span>2 days</span><span>10 days</span>
            </div>
          </FieldGroup>
        </div>

        <button type="submit" disabled={saving || !lastPeriodStart} className="btn btn-primary" style={{ width: '100%' }}>
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save settings'}
        </button>
      </form>
    </div>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--navy)', fontFamily: "'Plus Jakarta Sans'", marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}
