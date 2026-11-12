import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Language, LANGUAGES, LanguageOption, TRANSLATIONS } from '../data/translations';

export const LANGUAGE_STORAGE_KEY = 'bh_assistant_language';
export const DEFAULT_LANGUAGE: Language = 'bs';
export const SUPPORTED_LANGUAGES: readonly Language[] = ['bs', 'en', 'de', 'tr'];

export interface LanguageContextType {
  /** Aktivni jezik */
  language: Language;
  /** Promijeni jezik + URL ?lang= (sačuva ostale parametre) */
  setLanguage: (lang: Language, updateUrl?: boolean) => void;
  /** Alias za setLanguage sa updateUrl=true (za LanguageSwitcher) */
  changeLanguage: (lang: Language) => void;
  /** Prevod: TRANSLATIONS[lang] → TRANSLATIONS.bs → fallback → ključ */
  t: (key: string, fallback?: string) => string;
  /** Hook stil pristup prijevodu (useTranslation).i18n.t) */
  translation: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  /** URL string npr. ?lang=en (za LanguageAwareLink) */
  langSearch: string;
}

/** Alias hook (traženi useTranslation) */
export const useTranslation = (): { t: LanguageContextType['t']; language: Language } => {
  const { t, language } = useLanguage();
  return { t, language };
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Validates whether a value is one of our supported language codes
 */
export function isValidLanguage(val: string | null | undefined): val is Language {
  return val === 'bs' || val === 'en' || val === 'de' || val === 'tr';
}

/**
 * 1. Čita ?lang= iz URL-a (window.location.search). Pouzdano i van React Routera. */
export function getUrlLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang')?.toLowerCase().trim();
    if (isValidLanguage(langParam)) return langParam;
  } catch {
    /* ignore */  }
  return null;
}

/**
 * 2. Detekcija jezika preglednika:
 * - bs/hr/sr/cnr -> bs
 * - de -> de, tr -> tr, en -> en
 * - ostalo -> bs (default / fallback prema zahtjevu, host je B&H)
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;  try {
    const rawLangs: string[] =
      navigator.languages && navigator.languages.length > 0
        ? [...navigator.languages]
        : [navigator.language];
    for (const raw of rawLangs) {
      if (!raw) continue;
      const clean = raw.toLowerCase().trim();
      if (clean.startsWith('bs') || clean.startsWith('hr') || clean.startsWith('sr') || clean.startsWith('cnr')) {
        return 'bs';
      }
      if (clean.startsWith('de')) return 'de';
      if (clean.startsWith('tr')) return 'tr';
      if (clean.startsWith('en')) return 'en';
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Prioritet: 1) ?lang= iz URL-a → 2) localStorage → 3) browser detect → default bs
 */
export function resolveInitialLanguage(): Language {  const urlLang = getUrlLanguage();
  if (urlLang) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, urlLang);
    } catch {}
    return urlLang;
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isValidLanguage(saved)) return saved;
    } catch {}
  }  const detected = detectBrowserLanguage();
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
  } catch {}
  return detected;
}

/** Sinhronizuje <html lang> i og:locale */
export function syncHtmlLanguageAttributes(lang: Language): void {
  if (typeof document === 'undefined') return;
  try {
    document.documentElement.lang = lang;    const localeMap: Record<Language, string> = {
      bs: 'bs_BA',
      en: 'en_US',
      de: 'de_DE',
      tr: 'tr_TR',
    };
    const ogLocale = localeMap[lang] || 'bs_BA';    let ogMeta = document.querySelector('meta[property="og:locale"]');
    if (ogMeta) {
      ogMeta.setAttribute('content', ogLocale);
    } else {
      ogMeta = document.createElement('meta');
      ogMeta.setAttribute('property', 'og:locale');
      ogMeta.setAttribute('content', ogLocale);
      document.head.appendChild(ogMeta);
    }
  } catch {
    /* ignore */
  }
}

/** Čita trenutni lang iz URLSearchParams-a (ako je provider unutar Routera) */
function langFromSearchParams(params: URLSearchParams): Language | null {
  const v = params.get('lang')?.toLowerCase().trim();
  return isValidLanguage(v) ? v : null;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mora biti unutar BrowserRouter-a (vidi main.tsx) da useSearchParams radi.
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguageState] = useState<Language>(() => {
    const initial = resolveInitialLanguage();
    syncHtmlLanguageAttributes(initial);
    return initial;
  });

  const urlLang = langFromSearchParams(searchParams);

  // Kada se URL query promijeni (klik na link sa ?lang=, back/forward, paste url-a,
  // rucna promjena), state se odmah sinhronizuje — bez refresh-a.
  useEffect(() => {
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, urlLang);
      } catch {}
    }
  }, [urlLang, language]);

  // Sinhronizuj DOM kada se jezik promijeni
  useEffect(() => {
    syncHtmlLanguageAttributes(language);
  }, [language]);

  const setLanguage = useCallback(
    (newLang: Language, updateUrl: boolean = true) => {
      if (!isValidLanguage(newLang)) return;
      setLanguageState(newLang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      } catch {}
      syncHtmlLanguageAttributes(newLang);
      if (updateUrl) {
        // setSearchParams čuva ostale parametre (?clanak=, ?usluga=, ...) i radi replace:true
        // da ne zatrpava history. React Router re-renderuje sve komponente odmah.
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.set('lang', newLang);
            return next;
          },
          { replace: true },
        );
      }
    },
    [setSearchParams],
  );

  const changeLanguage = useCallback(
    (newLang: Language) => {
      setLanguage(newLang, true);
    },
    [setLanguage],
  );

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langDict = TRANSLATIONS[language];
      if (langDict && langDict[key]) return langDict[key];
      // Precizno prema zahtjevu: fallback je bosanski (bs), ne engleski.
      const defaultDict = TRANSLATIONS[DEFAULT_LANGUAGE];
      if (defaultDict && defaultDict[key]) return defaultDict[key];
      if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) return TRANSLATIONS['en'][key];
      return fallback ?? key;
    },
    [language],
  );

  const langSearch = useMemo(() => {
    return language ? `?lang=${language}` : '';
  }, [language]);

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      changeLanguage,
      t,
      translation: t,
      languages: LANGUAGES,
      langSearch,
    }),
    [language, setLanguage, changeLanguage, t, langSearch],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ---------------------------------------------------------------------------
// SVG zastave (ostaju nepromijenjene)
// ---------------------------------------------------------------------------

export const FlagBS: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (  <svg viewBox="0 0 500 250" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
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

export const FlagEN: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg viewBox="0 0 60 30" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />    </g>
  </svg>
);

export const FlagDE: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (  <svg viewBox="0 0 5 3" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="5" height="1" y="0" fill="#000000" />
    <rect width="5" height="1" y="1" fill="#DD0000" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
);

export const FlagTR: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (  <svg viewBox="0 0 1200 800" className={`${className} rounded-sm shadow-sm shrink-0 inline-block align-middle`}>
    <rect width="1200" height="800" fill="#E30A17" />
    <circle cx="425" cy="400" r="200" fill="#FFFFFF" />
    <circle cx="475" cy="400" r="160" fill="#E30A17" />
    <polygon points="583,400 706,440 630,335 630,465 706,360" fill="#FFFFFF" transform="rotate(-15 630 400)" />  </svg>
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
