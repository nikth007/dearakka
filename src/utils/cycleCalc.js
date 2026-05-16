import { getCyclePhase } from '../data/selfCareContent';

export function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toDateStr(date) {
  return date.toISOString().split('T')[0];
}

export function fromDateStr(str) {
  const d = new Date(str + 'T00:00:00');
  return d;
}

export function daysBetween(a, b) {
  const msA = typeof a === 'string' ? fromDateStr(a).getTime() : a.getTime();
  const msB = typeof b === 'string' ? fromDateStr(b).getTime() : b.getTime();
  return Math.round((msB - msA) / (1000 * 60 * 60 * 24));
}

export function addDays(date, days) {
  const d = typeof date === 'string' ? fromDateStr(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function computeCycleInfo(lastPeriodStart, cycleLength = 28) {
  if (!lastPeriodStart) return null;
  const startDate = fromDateStr(lastPeriodStart);
  const todayDate = today();
  const dayOfCycle = daysBetween(startDate, todayDate) + 1;

  if (dayOfCycle > cycleLength + 7) {
    // Compute how many cycles have passed
    const cyclesPassed = Math.floor((dayOfCycle - 1) / cycleLength);
    const adjustedStart = addDays(startDate, cyclesPassed * cycleLength);
    const adjustedDay = daysBetween(adjustedStart, todayDate) + 1;
    const nextPeriodDate = addDays(adjustedStart, cycleLength);
    const daysUntilNext = daysBetween(todayDate, nextPeriodDate);
    return {
      dayOfCycle: Math.max(1, adjustedDay),
      cycleLength,
      phase: getCyclePhase(adjustedDay, cycleLength),
      nextPeriodDate: toDateStr(nextPeriodDate),
      daysUntilNext: Math.max(0, daysUntilNext),
      ovulationDay: cycleLength - 14,
      fertileWindowStart: cycleLength - 14 - 5,
      fertileWindowEnd: cycleLength - 14 + 1,
    };
  }

  const nextPeriodDate = addDays(startDate, cycleLength);
  const daysUntilNext = daysBetween(todayDate, nextPeriodDate);
  return {
    dayOfCycle: Math.max(1, dayOfCycle),
    cycleLength,
    phase: getCyclePhase(dayOfCycle, cycleLength),
    nextPeriodDate: toDateStr(nextPeriodDate),
    daysUntilNext: Math.max(0, daysUntilNext),
    ovulationDay: cycleLength - 14,
    fertileWindowStart: cycleLength - 14 - 5,
    fertileWindowEnd: cycleLength - 14 + 1,
  };
}

export function getPredictedPeriodDates(lastPeriodStart, cycleLength, count = 3) {
  const dates = [];
  for (let i = 1; i <= count; i++) {
    dates.push(toDateStr(addDays(lastPeriodStart, cycleLength * i)));
  }
  return dates;
}

export function formatDateDisplay(dateStr, lang = 'en') {
  if (!dateStr) return '';
  const d = fromDateStr(dateStr);
  if (lang === 'ta') {
    const months = ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatMonthYear(dateStr, lang = 'en') {
  if (!dateStr) return '';
  const d = fromDateStr(dateStr);
  if (lang === 'ta') {
    const months = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function getGreeting(lang = 'en') {
  const hour = new Date().getHours();
  if (lang === 'ta') {
    if (hour < 12) return 'காலை வணக்கம்';
    if (hour < 17) return 'மதிய வணக்கம்';
    return 'மாலை வணக்கம்';
  }
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getAge(ageInput) {
  return parseInt(ageInput, 10) || 0;
}

export function shouldShowMammogramReminder(age) {
  return age >= 40;
}
