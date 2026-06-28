'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { Language } from '../types';
import { translations as esT, projects as esP, milestones as esM } from '../i18n/es';
import { translations as enT, projects as enP, milestones as enM } from '../i18n/en';
import type { LocalizedProject, LocalizedMilestone } from '../i18n/types';

function readLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang === 'es' || lang === 'en') return lang;
  return localStorage.getItem('lang') as Language | null;
}

function writeLanguage(lang: Language) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  projects: LocalizedProject[];
  experience: LocalizedMilestone[];
  bioTagline: string;
  bioLongBio: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const stored = readLanguage();
    if (stored) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    writeLanguage(lang);
  };

  useEffect(() => {
    writeLanguage(language);
    document.title = 'Josmary Pirela | Creative Software Engineer';
  }, [language]);

  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  const dict = language === 'es' ? esT : enT;
  const t = (key: string): string => dict[key] || key;
  const projects = language === 'es' ? esP : enP;
  const experience = language === 'es' ? esM : enM;
  const bioTagline = dict.bio_tagline || 'CREATIVE DEVELOPER — DESIGNER — OPTIMIZER';
  const bioLongBio = dict.bio_bio || '';

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, projects, experience, bioTagline, bioLongBio }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
