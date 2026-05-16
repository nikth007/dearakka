import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PROFILE: '@dear_akka_profile',
  CYCLE_DATA: '@dear_akka_cycle',
  DAILY_LOGS: '@dear_akka_logs',
  ASSESSMENTS: '@dear_akka_assessments',
  REMINDERS: '@dear_akka_reminders',
  BADGES: '@dear_akka_badges',
  BREAST_EXAMS: '@dear_akka_breast_exams',
  ONBOARDED: '@dear_akka_onboarded',
};

async function get(key) {
  try {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

async function set(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

// User profile
export async function getProfile() { return get(KEYS.USER_PROFILE); }
export async function saveProfile(profile) { return set(KEYS.USER_PROFILE, profile); }

// Onboarding
export async function isOnboarded() { return get(KEYS.ONBOARDED); }
export async function setOnboarded() { return set(KEYS.ONBOARDED, true); }

// Cycle data: { periodDates: ['2024-01-01', ...], cycleLength: 28, lastPeriodStart: '2024-01-01' }
export async function getCycleData() { return get(KEYS.CYCLE_DATA) || { periodDates: [], cycleLength: 28, lastPeriodStart: null }; }
export async function saveCycleData(data) { return set(KEYS.CYCLE_DATA, data); }

// Daily logs: { '2024-01-01': { mood, energy, sleep, flow, physicalSymptoms, emotionalSymptoms, notes } }
export async function getDailyLogs() { return get(KEYS.DAILY_LOGS) || {}; }
export async function saveDailyLog(date, log) {
  const logs = await getDailyLogs();
  logs[date] = log;
  return set(KEYS.DAILY_LOGS, logs);
}
export async function getDailyLog(date) {
  const logs = await getDailyLogs();
  return logs[date] || null;
}

// Assessments: [{ id, conditionId, date, responses, result }]
export async function getAssessments() { return get(KEYS.ASSESSMENTS) || []; }
export async function saveAssessment(assessment) {
  const list = await getAssessments();
  const existing = list.findIndex(a => a.conditionId === assessment.conditionId);
  if (existing >= 0) list[existing] = assessment;
  else list.unshift(assessment);
  return set(KEYS.ASSESSMENTS, list);
}

// Breast exam log: [{ date, completed }]
export async function getBreastExams() { return get(KEYS.BREAST_EXAMS) || []; }
export async function logBreastExam(date) {
  const list = await getBreastExams();
  list.unshift({ date, completed: true });
  return set(KEYS.BREAST_EXAMS, list);
}
export async function getLastBreastExam() {
  const list = await getBreastExams();
  return list.length > 0 ? list[0] : null;
}

// Reminders: [{ id, type, title, date, enabled }]
export async function getReminders() { return get(KEYS.REMINDERS) || []; }
export async function saveReminders(reminders) { return set(KEYS.REMINDERS, reminders); }
export async function addReminder(reminder) {
  const list = await getReminders();
  list.push(reminder);
  return set(KEYS.REMINDERS, list);
}
export async function updateReminder(id, updates) {
  const list = await getReminders();
  const idx = list.findIndex(r => r.id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...updates };
  return set(KEYS.REMINDERS, list);
}
export async function deleteReminder(id) {
  const list = await getReminders();
  return set(KEYS.REMINDERS, list.filter(r => r.id !== id));
}

// Badges: { badgeId: { earned: true, date: '...' } }
export async function getBadges() { return get(KEYS.BADGES) || {}; }
export async function earnBadge(badgeId) {
  const badges = await getBadges();
  if (!badges[badgeId]) {
    badges[badgeId] = { earned: true, date: new Date().toISOString() };
    await set(KEYS.BADGES, badges);
    return true; // newly earned
  }
  return false;
}

// Tracking streak
export async function getStreak() {
  const logs = await getDailyLogs();
  const dates = Object.keys(logs).sort().reverse();
  if (dates.length === 0) return 0;
  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);
  for (let i = 0; i < dates.length; i++) {
    const logDate = new Date(dates[i]);
    logDate.setHours(0, 0, 0, 0);
    const diff = (current - logDate) / (1000 * 60 * 60 * 24);
    if (diff <= 1) { streak++; current = logDate; }
    else break;
  }
  return streak;
}

export async function clearAll() {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
