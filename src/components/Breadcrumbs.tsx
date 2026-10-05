import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Building2,
  Wrench,
  Newspaper,
  Layers,
  FolderGit2,
  GraduationCap,
  Users,
  Mail,
  Shield,
  FileText,
  ArrowLeft,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { ROUTE_ALIASES } from '../data/seoData';

interface RouteBreadcrumbInfo {
  label: Record<Language, string>;
  icon: React.ComponentType<{ className?: string }>;
  parentPath?: string;
  parentLabel?: Record<Language, string>;
}

const ROUTE_BREADCRUMBS: Record<string, RouteBreadcrumbInfo> = {
  '/o-nama': {
    label: {
      bs: 'O Nama',
      en: 'About Us',
      de: 'Über Uns',
      tr: 'Hakkımızda',
    },
    icon: Building2,
  },
  '/alati': {
    label: {
      bs: 'Digitalni Alati',
      en: 'Digital Tools',
      de: 'Digitale Werkzeuge',
      tr: 'Dijital Araçlar',
    },
    icon: Wrench,
  },
  '/scena-magazin': {
    label: {
      bs: 'SCENA+ Magazin',
      en: 'SCENA+ Magazine',
      de: 'SCENA+ Magazin',
      tr: 'SCENA+ Dergisi',
    },
    icon: Newspaper,
  },
  '/novosti': {
    label: {
      bs: 'Novosti & Najave',
      en: 'News & Announcements',
      de: 'Neuigkeiten',
      tr: 'Haberler',
    },
    icon: Layers,
  },
  '/projekti': {
    label: {
      bs: 'Projekti & Partnerstva',
      en: 'Projects & Partnerships',
      de: 'Projekte',
      tr: 'Projeler',
    },
    icon: FolderGit2,
  },
  '/shop': {
    label: {
      bs: 'Shop & Edukacija',
      en: 'Shop & Education',
      de: 'Shop & Weiterbildung',
      tr: 'Mağaza & Eğitim',
    },
    icon: GraduationCap,
  },
  '/zajednica': {
    label: {
      bs: 'Zajednica (@bh.asst)',
      en: 'Community (@bh.asst)',
      de: 'Community (@bh.asst)',
      tr: 'Topluluk (@bh.asst)',
    },
    icon: Users,
  },
  '/kontakt': {
    label: {
      bs: 'Kontakt & Impressum',
      en: 'Contact & Impressum',
      de: 'Kontakt & Impressum',
      tr: 'İletişim & Künye',
    },
    icon: Mail,
  },
  '/politika-privatnosti': {
    label: {
      bs: 'Politika Privatnosti (GDPR)',
      en: 'Privacy Policy (GDPR)',
      de: 'Datenschutzerklärung (DSGVO)',
      tr: 'Gizlilik Politikası',
    },
    icon: Shield,
  },
  '/uslovi-koristenja': {
    label: {
      bs: 'Uslovi Korištenja',
      en: 'Terms of Service',
      de: 'Nutzungsbedingungen',
      tr: 'Kullanım Şartları',
    },
    icon: FileText,
  },
};

const HOME_LABELS: Record<Language, string> = {
  bs: 'Početna',
  en: 'Home',
  de: 'Startseite',
  tr: 'Ana Sayfa',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  // Normalize path
  const rawPath = location.pathname.split('?')[0].split('#')[0];
  const cleanPath = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
  const resolvedPath = ROUTE_ALIASES[cleanPath] || cleanPath;

  // Automatically hide on homepage /
  const isHome = resolvedPath === '' || resolvedPath === '/';

  // Inject BreadcrumbList JSON-LD Schema for search engine crawlers
  useEffect(() => {
    if (isHome) {
      // Remove any existing breadcrumb JSON-LD on homepage
      const existing = document.getElementById('bh-breadcrumb-jsonld');
      if (existing) existing.remove();
      return;
    }

    const routeInfo = ROUTE_BREADCRUMBS[resolvedPath];
    const currentLabel = routeInfo ? routeInfo.label[language] || routeInfo.label.bs : cleanPath.replace(/^\//, '');
    const homeLabel = HOME_LABELS[language] || 'Početna';

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': homeLabel,
          'item': 'https://bh-assistant.ba/',
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': currentLabel,
          'item': `https://bh-assistant.ba${resolvedPath}`,
        },
      ],
    };

    let script = document.getElementById('bh-breadcrumb-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'bh-breadcrumb-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbJsonLd);

    return () => {
      const el = document.getElementById('bh-breadcrumb-jsonld');
      if (el) el.remove();
    };
  }, [resolvedPath, language, isHome, cleanPath]);

  if (isHome) {
    return null;
  }

  const routeInfo = ROUTE_BREADCRUMBS[resolvedPath];
  const currentLabel = routeInfo ? routeInfo.label[language] || routeInfo.label.bs : cleanPath.replace(/^\//, '');
  const CurrentIcon = routeInfo?.icon || Compass;
  const homeLabel = HOME_LABELS[language] || 'Početna';

  return (
    <div
      className="w-full bg-[#07101D]/90 border-b border-[#1A3152]/70 backdrop-blur-md pt-[76px] sm:pt-[82px] transition-all duration-200"
      aria-label="Breadcrumb Navigation Container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Semantic Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center text-xs font-mono"
          >
            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              className="flex items-center gap-1.5 sm:gap-2 flex-wrap list-none m-0 p-0"
            >
              {/* Home Item */}
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                <Link
                  to="/"
                  itemProp="item"
                  className="flex items-center gap-1.5 text-[#F5F0E8]/70 hover:text-[#00C9A7] transition-colors py-1 px-1.5 -mx-1.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9A7]"
                  title={`Nazad na ${homeLabel}`}
                >
                  <Home className="w-3.5 h-3.5 text-[#00C9A7]" aria-hidden="true" />
                  <span itemProp="name">{homeLabel}</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="text-[#1A3152] flex items-center select-none">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>

              {/* Current Active Page Leaf */}
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center text-[#F5F0E8]"
                aria-current="page"
              >
                <span
                  itemProp="item"
                  className="flex items-center gap-1.5 font-semibold text-[#00C9A7] bg-[#00C9A7]/10 border border-[#00C9A7]/25 px-2 py-0.5 rounded-lg"
                >
                  <CurrentIcon className="w-3.5 h-3.5 text-[#00C9A7]" aria-hidden="true" />
                  <span itemProp="name">{currentLabel}</span>
                </span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/* Quick Back to Previous Page / Home Action */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F5F0E8]/60 hover:text-[#C9A84C] transition-colors py-1 px-2 rounded-md hover:bg-[#0F2038] border border-transparent hover:border-[#1A3152]"
              title="Povratak na početnu stranicu"
            >
              <ArrowLeft className="w-3 h-3 text-[#C9A84C]" />
              <span>{homeLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
