import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getProfile, getCycleData, isOnboarded, getAssessments, getBadges, getStreak } from '../utils/storage';
import { computeCycleInfo } from '../utils/cycleCalc';

const AppContext = createContext(null);

const initialState = {
  loading: true,
  onboarded: false,
  lang: 'en',
  profile: null,          // { name, age, cycleLength }
  cycleData: null,        // { periodDates, cycleLength, lastPeriodStart }
  cycleInfo: null,        // computed: { dayOfCycle, phase, nextPeriodDate, daysUntilNext }
  assessments: [],
  badges: {},
  streak: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT_DONE':
      return { ...state, loading: false, ...action.payload };
    case 'SET_ONBOARDED':
      return { ...state, onboarded: true };
    case 'SET_LANG':
      return { ...state, lang: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_CYCLE':
      return {
        ...state,
        cycleData: action.payload,
        cycleInfo: computeCycleInfo(action.payload.lastPeriodStart, action.payload.cycleLength)
      };
    case 'ADD_ASSESSMENT': {
      const list = state.assessments.filter(a => a.conditionId !== action.payload.conditionId);
      return { ...state, assessments: [action.payload, ...list] };
    }
    case 'EARN_BADGE':
      return { ...state, badges: { ...state.badges, [action.payload]: { earned: true, date: new Date().toISOString() } } };
    case 'SET_STREAK':
      return { ...state, streak: action.payload };
    case 'CLEAR_ALL':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function init() {
      const [onboarded, profile, cycleData, assessments, badges, streak] = await Promise.all([
        isOnboarded(),
        getProfile(),
        getCycleData(),
        getAssessments(),
        getBadges(),
        getStreak(),
      ]);
      const cycleInfo = cycleData?.lastPeriodStart
        ? computeCycleInfo(cycleData.lastPeriodStart, cycleData.cycleLength || 28)
        : null;
      dispatch({
        type: 'INIT_DONE',
        payload: {
          onboarded: !!onboarded,
          lang: profile?.lang || 'en',
          profile,
          cycleData,
          cycleInfo,
          assessments: assessments || [],
          badges: badges || {},
          streak: streak || 0,
        }
      });
    }
    init();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useLang() {
  const { state } = useApp();
  return state.lang;
}
