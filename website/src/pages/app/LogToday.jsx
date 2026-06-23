import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toDateStr } from '../../utils/cycleCalc';

const FLOW_OPTIONS = ['None', 'Light', 'Medium', 'Heavy'];
const MOODS = ['Happy', 'Calm', 'Anxious', 'Irritable', 'Sad', 'Energetic', 'Tired', 'Focused'];
const SYMPTOMS = ['Cramps', 'Bloating', 'Headache', 'Breast tenderness', 'Acne', 'Back pain', 'Fatigue', 'Nausea'];

export default function LogToday() {
  const { api } = useAuth();
  const today = toDateStr(new Date());
  const [flow, setFlow] = useState(0);
  const [moods, setMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [energy, setEnergy] = useState(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadedDate, setLoadedDate] = useState(null);

  useEffect(() => {
    api('/api/cycle/logs').then(d => {
      const log = d.logs.find(l => l.log_date?.slice(0,10) === today);
      if (log) {
        setFlow(log.flow || 0);
        setMoods(log.moods || []);
        setSymptoms(log.symptoms || []);
        setEnergy(log.energy);
        setNote(log.note || '');
        setLoadedDate(today);
      }
    }).catch(console.error);
  }, [api, today]);

  function toggle(arr, setArr, val) {
    setArr(a => a.includes(val) ? a.filter(x => x !== val) : [...a, val]);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await api('/api/cycle/logs', { method: 'POST', body: { log_date: today, flow, moods, symptoms, energy, note } });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'clamp(24px,4vw,48px)' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: 'var(--ink-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 style={{ fontSize: 'clamp(24px,3.5vw,32px)', margin: 0 }}>How are you today?</h1>
      </div>

      {/* Flow */}
      <Section title="Flow">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {FLOW_OPTIONS.map((opt, i) => (
            <button key={opt} onClick={() => setFlow(i)}
              style={{ padding: '9px 20px', borderRadius: 999, border: `1.5px solid ${flow === i ? 'var(--teal)' : 'var(--line)'}`, background: flow === i ? 'var(--teal-soft)' : '#fff', color: flow === i ? 'var(--teal-deep)' : 'var(--ink-soft)', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .15s' }}>
              {opt}
            </button>
          ))}
        </div>
      </Section>

      {/* Moods */}
      <Section title="Mood">
        <Chips options={MOODS} selected={moods} onToggle={(v) => toggle(moods, setMoods, v)} color="var(--teal)" bg="var(--teal-soft)" />
      </Section>

      {/* Symptoms */}
      <Section title="Symptoms">
        <Chips options={SYMPTOMS} selected={symptoms} onToggle={(v) => toggle(symptoms, setSymptoms, v)} color="#5e35b1" bg="#ede7f6" />
      </Section>

      {/* Energy */}
      <Section title="Energy level">
        <div style={{ display: 'flex', gap: 8 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setEnergy(n)} style={{
              width: 44, height: 44, borderRadius: 12, border: `1.5px solid ${energy >= n ? 'var(--teal)' : 'var(--line)'}`,
              background: energy >= n ? 'var(--teal)' : '#fff', color: energy >= n ? '#fff' : 'var(--ink-soft)',
              fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'all .15s',
            }}>{n}</button>
          ))}
          {energy && <button onClick={() => setEnergy(null)} style={{ fontSize: 13, color: 'var(--ink-faint)', padding: '0 8px' }}>clear</button>}
        </div>
      </Section>

      {/* Note */}
      <Section title="Notes (optional)">
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Anything else on your mind..."
          style={{ width: '100%', minHeight: 100, padding: '14px 16px', fontSize: 15, fontFamily: "'Inter'", border: '1.5px solid var(--line)', borderRadius: 14, background: '#fbfcfe', color: 'var(--ink)', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = 'var(--teal)'}
          onBlur={e => e.target.style.borderColor = 'var(--line)'}
        />
      </Section>

      <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
        {saving ? 'Saving…' : saved ? '✓ Saved' : loadedDate ? 'Update log' : 'Save log'}
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>{title}</p>
      {children}
    </div>
  );
}

function Chips({ options, selected, onToggle, color, bg }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button key={opt} onClick={() => onToggle(opt)}
            style={{ padding: '8px 16px', borderRadius: 999, border: `1.5px solid ${active ? color : 'var(--line)'}`, background: active ? bg : '#fff', color: active ? color : 'var(--ink-soft)', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .15s' }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}
