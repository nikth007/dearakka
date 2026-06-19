import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { today } from '../utils/cycleCalc';

const KEY = {
  USER:   'da_user',
  CYCLE:  'da_cycle_v2',
  LOGS:   'da_logs_v2',
  LANG:   'da_lang',
  ONBOARDED: 'da_onboarded',
};

const DEFAULT_CYCLE = {
  lastPeriodStart: null,
  periodDates: [],
  periodLengths: [],
  cycleLength: 28,
};

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser]         = useState(null);
  const [cycleData, setCycleData] = useState(DEFAULT_CYCLE);
  const [dailyLogs, setDailyLogs] = useState({});
  const [lang, setLangState]    = useState('en');
  const [loading, setLoading]   = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [u, c, l, lg, ob] = await Promise.all([
          AsyncStorage.getItem(KEY.USER),
          AsyncStorage.getItem(KEY.CYCLE),
          AsyncStorage.getItem(KEY.LANG),
          AsyncStorage.getItem(KEY.LOGS),
          AsyncStorage.getItem(KEY.ONBOARDED),
        ]);
        if (u)  setUser(JSON.parse(u));
        if (c)  setCycleData({ ...DEFAULT_CYCLE, ...JSON.parse(c) });
        if (l)  setLangState(l);
        if (lg) setDailyLogs(JSON.parse(lg));
        if (ob) setIsOnboarded(true);
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  const saveUser = useCallback(async (u) => {
    setUser(u);
    await AsyncStorage.setItem(KEY.USER, JSON.stringify(u));
  }, []);

  const saveCycleData = useCallback(async (data) => {
    const next = { ...cycleData, ...data };
    setCycleData(next);
    await AsyncStorage.setItem(KEY.CYCLE, JSON.stringify(next));
  }, [cycleData]);

  const logPeriod = useCallback(async ({ startDate, length, flow }) => {
    const next = {
      lastPeriodStart: startDate,
      periodDates: [...new Set([...cycleData.periodDates, startDate])].sort().slice(-24),
      periodLengths: [...cycleData.periodLengths, length].slice(-12),
      cycleLength: cycleData.cycleLength,
    };
    setCycleData(next);
    await AsyncStorage.setItem(KEY.CYCLE, JSON.stringify(next));
    // also save in daily log
    const d = today();
    const logs = { ...dailyLogs, [d]: { ...(dailyLogs[d] || {}), flow, periodStart: startDate } };
    setDailyLogs(logs);
    await AsyncStorage.setItem(KEY.LOGS, JSON.stringify(logs));
  }, [cycleData, dailyLogs]);

  const logDay = useCallback(async (dateStr, data) => {
    const logs = { ...dailyLogs, [dateStr]: { ...(dailyLogs[dateStr] || {}), ...data } };
    setDailyLogs(logs);
    await AsyncStorage.setItem(KEY.LOGS, JSON.stringify(logs));
  }, [dailyLogs]);

  const setLang = useCallback(async (l) => {
    setLangState(l);
    await AsyncStorage.setItem(KEY.LANG, l);
  }, []);

  const completeOnboarding = useCallback(async (userData) => {
    if (userData) await saveUser(userData);
    setIsOnboarded(true);
    await AsyncStorage.setItem(KEY.ONBOARDED, '1');
  }, [saveUser]);

  const signOut = useCallback(async () => {
    setUser(null);
    setIsOnboarded(false);
    await AsyncStorage.multiRemove([KEY.USER, KEY.ONBOARDED]);
  }, []);

  return (
    <Ctx.Provider value={{
      user, saveUser,
      cycleData, saveCycleData, logPeriod, logDay,
      dailyLogs,
      lang, setLang,
      loading,
      isOnboarded, completeOnboarding,
      signOut,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
