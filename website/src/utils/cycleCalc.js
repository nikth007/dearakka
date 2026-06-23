export function toDateStr(d) {
  return d.toISOString().slice(0, 10);
}

export function fromDateStr(s) {
  return new Date(s + 'T00:00:00');
}

export function currentCycleDay(lastPeriodStart) {
  if (!lastPeriodStart) return null;
  const start = fromDateStr(lastPeriodStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return diff > 0 ? diff : null;
}

export function getCyclePhase(cycleDay, cycleLength = 28) {
  const d = ((cycleDay - 1) % cycleLength) + 1;
  if (d <= 5) return 'menstrual';
  if (d <= Math.round(cycleLength * 0.43)) return 'follicular';
  if (d <= Math.round(cycleLength * 0.57)) return 'ovulation';
  return 'luteal';
}

export function predict(lastPeriodStart, cycleLength = 28) {
  if (!lastPeriodStart) return null;
  const start = fromDateStr(lastPeriodStart);
  const nextPeriod = new Date(start);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilNext = Math.ceil((nextPeriod - today) / 86400000);

  const ovulation = new Date(start);
  ovulation.setDate(ovulation.getDate() + Math.round(cycleLength * 0.5));

  const pmsStart = new Date(nextPeriod);
  pmsStart.setDate(pmsStart.getDate() - 7);

  return {
    nextPeriodDate: toDateStr(nextPeriod),
    daysUntilNext,
    ovulationDate: toDateStr(ovulation),
    pmsStart: toDateStr(pmsStart),
  };
}

export const PHASE_COLORS = {
  menstrual:  { bg: '#fce4ec', text: '#c2185b', label: 'Menstrual' },
  follicular: { bg: '#e6f6f4', text: '#0a7468', label: 'Follicular' },
  ovulation:  { bg: '#fff8e1', text: '#e65100', label: 'Ovulation' },
  luteal:     { bg: '#ede7f6', text: '#5e35b1', label: 'Luteal' },
  none:       { bg: 'var(--line-soft)', text: 'var(--ink-faint)', label: 'No data' },
};
