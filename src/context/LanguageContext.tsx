import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, LANGUAGES, LanguageOption, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bh_assistant_language');
    if (saved && (saved === 'bs' || saved === 'en' || saved === 'de' || saved === 'tr')) {
      return saved as Language;
    }
    return 'bs';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bh_assistant_language', lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors in restricted iframes
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const t = useCallback((key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English if not BS, then to Bosnian, then key/fallback
    if (language !== 'en' && TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    const defaultDict = TRANSLATIONS['bs'];
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    languages: LANGUAGES
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
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

// SVG Flag Components for maximum visual appeal & browser compatibility
export const FlagBS: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 500 250" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="500" height="250" fill="#002395" />
    <polygon points="125,0 375,0 375,250" fill="#FECB00" />
    <g fill="#FFFFFF">
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(10, 10) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(45, 45) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(80, 80) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(115, 115) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(150, 150) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(185, 185) scale(0.6)" />
      <polygon points="107,0 115,-20 123,0 131,0 125,10 128,25 115,15 102,25 105,10 99,0" transform="translate(220, 220) scale(0.6)" />
    </g>
  </svg>
);

export const FlagEN: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 60 30" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 L60,30 H0 Z M30,15 L0,30 V0 Z M30,15 L60,0 V30 Z M30,15 L0,0 H60 Z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export const FlagDE: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 5 3" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

export const FlagTR: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 1200 800" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="1200" height="800" fill="#E30A17"/>
    <circle cx="425" cy="400" r="200" fill="#FFFFFF"/>
    <circle cx="475" cy="400" r="160" fill="#E30A17"/>
    <polygon points="583.333,400 706.852,440.132 630.509,335.068 630.509,464.932 706.852,359.868" fill="#FFFFFF"/>
  </svg>
);

export const FlagIcon: React.FC<{ code: Language; className?: string }> = ({ code, className }) => {
  switch (code) {
    case 'bs': return <FlagBS className={className} />;
    case 'en': return <FlagEN className={className} />;
    case 'de': return <FlagDE className={className} />;
    case 'tr': return <FlagTR className={className} />;
    default: return <FlagBS className={className} />;
  }
};
