/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
const Context = createContext(null);
export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const explicit = new URLSearchParams(window.location.search).get('lang');
    if (explicit === 'en' || explicit === 'zh') return explicit;
    try {
      return localStorage.getItem('uie-locale') === 'en' ? 'en' : 'zh';
    } catch {
      return 'zh';
    }
  });
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    try {
      localStorage.setItem('uie-locale', locale);
    } catch {
      /* storage is optional */
    }
  }, [locale]);
  const t = useCallback((zh, en) => (locale === 'zh' ? zh : en), [locale]);
  return <Context.Provider value={{ locale, setLocale, t }}>{children}</Context.Provider>;
}
export function useLocale() {
  return useContext(Context) || { locale: 'en', t: (_, en) => en };
}
