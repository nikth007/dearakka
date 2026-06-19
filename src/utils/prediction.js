import { fromDateStr, toDateStr, addDays, daysBetween, today } from './cycleCalc';
import { getCyclePhase } from './cycleCalc';

export function analysePeriodHistory(periodDates = [], fallbackLength = 28) {
  const sorted = [...new Set(periodDates)].filter(Boolean).sort();
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) {
    const g = daysBetween(sorted[i - 1], sorted[i]);
    if (g >= 18 && g <= 60) gaps.push(g);
  }
  let cycleLength = fallbackLength;
  let variability = 0;
  let confidence = 'new';

  if (gaps.length >= 1) {
    cycleLength = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
    if (gaps.length >= 2) {
      const mean = cycleLength;
      const variance = gaps.reduce((a, g) => a + (g - mean) ** 2, 0) / gaps.length;
      variability = Math.round(Math.sqrt(variance));
    }
  }
  if (gaps.length >= 3 && variability <= 3) confidence = 'high';
  else if (gaps.length >= 2 && variability <= 6) confidence = 'medium';
  else if (gaps.length >= 1) confidence = 'low';

  return { cycleLength, variability, confidence, cyclesLogged: gaps.length + (sorted.length ? 1 : 0), lastStart: sorted[sorted.length - 1] || null };
}

export function analysePeriodLengths(periodLengths = [], fallback = 5) {
  const valid = periodLengths.filter(n => Number.isFinite(n) && n >= 1 && n <= 12);
  if (!valid.length) return { avg: fallback, variability: 0, logged: 0 };
  const avg = Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
  let variability = 0;
  if (valid.length >= 2) {
    const variance = valid.reduce((a, n) => a + (n - avg) ** 2, 0) / valid.length;
    variability = Math.round(Math.sqrt(variance));
  }
  return { avg, variability, logged: valid.length };
}

export function predict(lastPeriodStart, periodDates = [], periodLength = 5, periodLengths = []) {
  if (!lastPeriodStart) return null;
  const stats = analysePeriodHistory(periodDates.length ? periodDates : [lastPeriodStart]);
  const cycleLength = stats.cycleLength;
  const start = fromDateStr(lastPeriodStart);
  if (isNaN(start.getTime())) return null;

  const lenStats = analysePeriodLengths(periodLengths, periodLength || 5);
  const predictedPeriodLength = lenStats.avg;

  const nextPeriod = addDays(start, cycleLength);
  const nextPeriodEnd = addDays(nextPeriod, predictedPeriodLength - 1);
  const ovulationDate = addDays(nextPeriod, -14);
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = addDays(ovulationDate, 1);
  const pmsStart = addDays(nextPeriod, -5);
  const todayD = today();
  const windowDays = stats.variability > 0 ? Math.max(1, stats.variability) : (stats.confidence === 'new' ? 3 : 2);

  return {
    cycleLength, periodLength, predictedPeriodLength,
    periodLengthVariability: lenStats.variability,
    confidence: stats.confidence, variability: stats.variability,
    cyclesLogged: stats.cyclesLogged,
    nextPeriodDate: toDateStr(nextPeriod),
    nextPeriodEndDate: toDateStr(nextPeriodEnd),
    nextWindowFrom: toDateStr(addDays(nextPeriod, -windowDays)),
    nextWindowTo: toDateStr(addDays(nextPeriod, windowDays)),
    daysUntilNext: Math.max(0, daysBetween(todayD, nextPeriod)),
    ovulationDate: toDateStr(ovulationDate),
    daysUntilOvulation: daysBetween(todayD, ovulationDate),
    fertileStart: toDateStr(fertileStart),
    fertileEnd: toDateStr(fertileEnd),
    pmsStart: toDateStr(pmsStart),
    periodEnd: toDateStr(addDays(start, (periodLength || predictedPeriodLength) - 1)),
  };
}

export function confidenceLabel(confidence, lang = 'en') {
  const map = {
    new:    { en: 'Just learning your rhythm', ta: 'உங்கள் சுழற்சியை அறிகிறேன்' },
    low:    { en: 'Early estimate', ta: 'ஆரம்ப மதிப்பீடு' },
    medium: { en: 'Getting more accurate', ta: 'மேலும் துல்லியமாகிறது' },
    high:   { en: 'Confident prediction', ta: 'நம்பிக்கையான கணிப்பு' },
  };
  return (map[confidence] || map.new)[lang] || '';
}
