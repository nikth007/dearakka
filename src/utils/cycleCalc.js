export function toDateStr(d) {
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fromDateStr(s) {
  if (!s) return new Date(NaN);
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function daysBetween(aStr, bDate) {
  const a = typeof aStr === 'string' ? fromDateStr(aStr) : aStr;
  const b = typeof bDate === 'string' ? fromDateStr(bDate) : bDate;
  return Math.round((b - a) / 86400000);
}

export function today() { return toDateStr(new Date()); }

export function getCyclePhase(cycleDay, cycleLength = 28) {
  if (cycleDay <= 5) return 'menstrual';
  if (cycleDay <= Math.floor(cycleLength * 0.45)) return 'follicular';
  if (cycleDay <= Math.floor(cycleLength * 0.55)) return 'ovulation';
  return 'luteal';
}

export function currentCycleDay(lastPeriodStart) {
  if (!lastPeriodStart) return null;
  const d = daysBetween(lastPeriodStart, today());
  return d >= 0 ? d + 1 : null;
}

export function formatDateDisplay(dateStr, lang = 'en') {
  if (!dateStr) return '';
  const d = fromDateStr(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = lang === 'ta'
    ? ['ஜன','பிப','மார்','ஏப்','மே','ஜூன்','ஜூலை','ஆக','செப்','அக்','நவ','டிச']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
