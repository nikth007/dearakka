import React, { createContext, useContext, useState, useEffect } from 'react';

const LangCtx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') return localStorage.getItem('da_site_lang') || 'en';
    return 'en';
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('da_site_lang', lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  // t('English text', 'தமிழ்') — returns the active language string
  const t = (en, ta) => (lang === 'ta' && ta ? ta : en);

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
