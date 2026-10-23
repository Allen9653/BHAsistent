import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, LANGUAGES, LanguageOption, TRANSLATIONS } from '../data/translations';

export const LANGUAGE_STORAGE_KEY = 'bh_assistant_language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language, updateUrl?: boolean) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Validates whether a value is one of our supported language codes
 */
export function isValidLanguage(val: string | null | undefined): val is Language {
  return val === 'bs' || val === 'en' || val === 'de' || val === 'tr';
}

/**
 * 1. Checks if the URL contains a valid `lang` query parameter (e.g., `?lang=en` or `?lang=bs`).
 */
export function getUrlLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang')?.toLowerCase().trim();
    if (isValidLanguage(langParam)) {
      return langParam;
    }
  } catch (e) {
    // Ignore errors in environments where window.location is restricted
  }
  return null;
}

/**
 * 2. Automatic Browser Language Detection (Fallback):
 *    - If starts with 'bs', 'hr', or 'sr' -> 'bs' (Bosnian)
 *    - If starts with 'de' -> 'de' (German)
 *    - If starts with 'tr' -> 'tr' (Turkish)
 *    - If starts with 'en' -> 'en' (English)
 *    - For all other non-ex-Yu / international languages -> defaults to 'en'
 *      (Ensures global platform moderators & international users land on English by default)
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  try {
    const rawLangs: string[] =
      navigator.languages && navigator.languages.length > 0
        ? [...navigator.languages]
        : [navigator.language];

    for (const raw of rawLangs) {
      if (!raw) continue;
      const clean = raw.toLowerCase().trim();

      // Ex-Yu languages map to Bosnian (bs)
      if (clean.startsWith('bs') || clean.startsWith('hr') || clean.startsWith('sr') || clean.startsWith('cnr')) {
        return 'bs';
      }
      if (clean.startsWith('de')) {
        return 'de';
      }
      if (clean.startsWith('tr')) {
        return 'tr';
      }
      if (clean.startsWith('en')) {
        return 'en';
      }
    }
  } catch (e) {
    // Ignore navigator errors
  }

  // Default to English for international users and moderators
  return 'en';
}

/**
 * Determines the initial active language according to strict priority:
 * Priority 1: URL Query Parameter (?lang=en)
 * Priority 2: Saved user preference in localStorage
 * Priority 3: Automatic browser language detection (fallback)
 */
export function resolveInitialLanguage(): Language {
  // 1. URL Query Parameter Handling (?lang=en)
  const urlLang = getUrlLanguage();
  if (urlLang) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, urlLang);
    } catch {}
    return urlLang;
  }

  // 2. Saved user preference in localStorage (persistence for returning users)
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isValidLanguage(saved)) {
        return saved;
      }
    } catch {}
  }

  // 3. Automatic browser language detection
  const detected = detectBrowserLanguage();
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
  } catch {}
  return detected;
}

/**
 * Synchronizes the HTML root attribute <html lang="..."> and Open Graph locale metadata
 */
export function syncHtmlLanguageAttributes(lang: Language): void {
  if (typeof document === 'undefined') return;

  try {
    // 3. Update root HTML tag dynamically: <html lang="en"> or <html lang="bs">
    document.documentElement.lang = lang;

    // Update Open Graph locale meta tag
    const localeMap: Record<Language, string> = {
      bs: 'bs_BA',
      en: 'en_US',
      de: 'de_DE',
      tr: 'tr_TR',
    };
    const ogLocale = localeMap[lang] || 'en_US';
    let ogMeta = document.querySelector('meta[property="og:locale"]');
    if (ogMeta) {
      ogMeta.setAttribute('content', ogLocale);
    } else {
      ogMeta = document.createElement('meta');
      ogMeta.setAttribute('property', 'og:locale');
      ogMeta.setAttribute('content', ogLocale);
      document.head.appendChild(ogMeta);
    }
  } catch (e) {
    // Ignore DOM modification errors in sandboxes
  }
}

/**
 * Synchronizes the URL query parameter (?lang=en) without triggering a full page reload
 */
export function syncUrlLanguageParam(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url.toString());
    }
  } catch (e) {
    // Ignore history API errors
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const initial = resolveInitialLanguage();
    syncHtmlLanguageAttributes(initial);
    return initial;
  });

  /**
   * Set language handler:
   * - Updates state
   * - Persists preference to localStorage
   * - Updates root <html lang="..."> and Open Graph meta tags
   * - Updates URL query parameter ?lang=...
   */
  const setLanguage = useCallback((newLang: Language, updateUrl: boolean = true) => {
    setLanguageState(newLang);

    // 1. Persist to localStorage
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {}

    // 2. Update HTML attributes and Open Graph locale
    syncHtmlLanguageAttributes(newLang);

    // 3. Update URL query parameter (?lang=...) if requested
    if (updateUrl) {
      syncUrlLanguageParam(newLang);
    }
  }, []);

  // Synchronize initial URL state on mount & monitor popstate (back/forward navigation)
  useEffect(() => {
    syncHtmlLanguageAttributes(language);

    const handlePopState = () => {
      const urlLang = getUrlLanguage();
      if (urlLang && urlLang !== language) {
        setLanguage(urlLang, false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language, setLanguage]);

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
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
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
    <rect width="5" height="1" y="0" fill="#000000" />
    <rect width="5" height="1" y="1" fill="#DD0000" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
);

export const FlagTR: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 1200 800" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="1200" height="800" fill="#E30A17" />
    <circle cx="425" cy="400" r="200" fill="#FFFFFF" />
    <circle cx="475" cy="400" r="160" fill="#E30A17" />
    <polygon
      points="583,400 706,440 630,335 630,465 706,360"
      fill="#FFFFFF"
      transform="rotate(-15 630 400)"
    />
  </svg>
);

export const FlagIcon: React.FC<{ code: Language; className?: string }> = ({ code, className }) => {
  switch (code) {
    case 'bs':
      return <FlagBS className={className} />;
    case 'en':
      return <FlagEN className={className} />;
    case 'de':
      return <FlagDE className={className} />;
    case 'tr':
      return <FlagTR className={className} />;
    default:
      return null;
  }
};
