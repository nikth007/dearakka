import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PHASE_COLORS, getCyclePhase } from '../../utils/cycleCalc';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function History() {
  const { api } = useAuth();
  const today = new Date();
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [logs, setLogs] = useState([]);
  const [cycleData, setCycleData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      api('/api/cycle/logs').then(d => setLogs(d.logs || [])),
      api('/api/cycle/data').then(d => setCycleData(d.data)),
    ]).catch(console.error);
  }, [api]);

  const { year, month } = viewDate;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = new Date(year, month, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const logMap = {};
  logs.forEach(l => { if (l.log_date) logMap[l.log_date.slice(0,10)] = l; });

  function prevMonth() {
    setViewDate(v => {
      const m = v.month === 0 ? 11 : v.month - 1;
      const y = v.month === 0 ? v.year - 1 : v.year;
      return { year: y, month: m };
    });
  }
  function nextMonth() {
    setViewDate(v => {
      const m = v.month === 11 ? 0 : v.month + 1;
      const y = v.month === 11 ? v.year + 1 : v.year;
      return { year: y, month: m };
    });
  }

  function getPhaseForDate(dayNum) {
    if (!cycleData?.last_period_start) return 'none';
    const start = new Date(cycleData.last_period_start + 'T00:00:00');
    const date = new Date(year, month, dayNum);
    date.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    const diff = Math.floor((date - start) / 86400000) + 1;
    if (diff < 1) return 'none';
    return getCyclePhase(diff, cycleData.cycle_length || 28);
  }

  const selectedLog = selected ? logMap[`${year}-${String(month+1).padStart(2,'0')}-${String(selected).padStart(2,'0')}`] : null;

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(24px,4vw,48px)' }}>
      <h1 style={{ fontSize: 'clamp(24px,3.5vw,32px)', marginBottom: 32 }}>Cycle History</h1>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 280px' : '1fr', gap: 20, alignItems: 'start' }}>
        <div className="card" style={{ padding: 'clamp(16px,3vw,28px)' }}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={prevMonth} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>‹</button>
            <h2 style={{ fontSize: 17, margin: 0 }}>{monthName}</h2>
            <button onClick={nextMonth} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', padding: '4px 0' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
              const log = logMap[dateKey];
              const phase = getPhaseForDate(day);
              const pc = PHASE_COLORS[phase];
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selected;
              return (
                <button key={day} onClick={() => setSelected(isSelected ? null : day)}
                  style={{
                    aspectRatio: '1', borderRadius: 10, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2, cursor: 'pointer',
                    border: isSelected ? `2px solid ${pc.text}` : isToday ? `2px solid var(--teal)` : '2px solid transparent',
                    background: isSelected ? pc.bg : phase !== 'none' ? `${pc.bg}80` : '#fff',
                    transition: 'all .12s',
                  }}>
                  <span style={{ fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--teal)' : 'var(--ink)' }}>{day}</span>
                  {log && <span style={{ width: 5, height: 5, borderRadius: '50%', background: pc.text, display: 'block' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        {selected && (
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, margin: 0 }}>{new Date(year, month, selected).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</h3>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--ink-faint)', fontSize: 18, lineHeight: 1 }}>×</button>
            </div>
            {selectedLog ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedLog.flow > 0 && <Detail label="Flow" value={['', 'Light', 'Medium', 'Heavy'][selectedLog.flow]} />}
                {selectedLog.moods?.length > 0 && <Detail label="Mood" value={(selectedLog.moods).join(', ')} />}
                {selectedLog.symptoms?.length > 0 && <Detail label="Symptoms" value={(selectedLog.symptoms).join(', ')} />}
                {selectedLog.energy && <Detail label="Energy" value={`${selectedLog.energy}/5`} />}
                {selectedLog.note && <Detail label="Note" value={selectedLog.note} />}
              </div>
            ) : (
              <p className="muted" style={{ fontSize: 14 }}>No log for this day.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</p>
      <p style={{ fontSize: 14, color: 'var(--ink)' }}>{value}</p>
    </div>
  );
}
