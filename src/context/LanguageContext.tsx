'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import id from '@/locales/id.json';
import en from '@/locales/en.json';

type Language = 'id' | 'en';

const translations = { id, en };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('rideasy-language') as Language | null;
    if (storedLanguage && (storedLanguage === 'id' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('rideasy-language', newLanguage);
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
