import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MULTILINGUAL_ROUTE_META, RouteMetaConfig, getRouteMeta, ROUTE_ALIASES } from '../data/seoData';
import { Language } from '../data/translations';

export { type RouteMetaConfig } from '../data/seoData';
export { MULTILINGUAL_ROUTE_META } from '../data/seoData';

// Legacy fallback map for backward compatibility
export const ROUTE_META_MAP: Record<string, RouteMetaConfig> = Object.entries(MULTILINGUAL_ROUTE_META).reduce(
  (acc, [route, metaByLang]) => {
    acc[route] = metaByLang.bs;
    return acc;
  },
  {} as Record<string, RouteMetaConfig>
);

/**
 * Helper to set or update a meta tag by name or property attribute.
 * Removes duplicate tags if multiple exist to prevent search engine confusion.
 */
function setOrCreateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  const elements = document.querySelectorAll(`meta[${attributeName}="${attributeValue}"]`);
  if (elements.length > 0) {
    elements[0].setAttribute('content', content);
    // Remove duplicates if any were previously injected
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode?.removeChild(elements[i]);
    }
  } else {
    const element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

/**
 * Helper to get or create a link tag (e.g. canonical or hreflang).
 */
function setOrCreateLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[0].setAttribute('href', href);
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode?.removeChild(elements[i]);
    }
  } else {
    const element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) {
      element.setAttribute('hreflang', hreflang);
    }
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
}

/**
 * Helper to inject or update JSON-LD Schema structured data
 */
function updateJsonLd(config: RouteMetaConfig, pathname: string, language: Language) {
  const scriptId = 'bh-dynamic-jsonld-schema';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const langCode = language === 'bs' ? 'bs-BA' : language === 'de' ? 'de-DE' : language === 'tr' ? 'tr-TR' : 'en-US';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bh-assistant.ba/#organization',
        'name': 'B&H Assistant d.o.o. Zenica',
        'url': 'https://bh-assistant.ba',
        'logo': 'https://i.imgur.com/cXebP1B.jpg',
        'description': 'Zvanična platforma IT firme B&H Assistant d.o.o. Zenica. Slogan: SPAJAMO KULTURE - STVARAMO ŠANSE. Digitalni alati, SCENA+ magazin i inovativni projekti.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Bulevar Ezhera Eze Arnautovića 8',
          'addressLocality': 'Zenica',
          'postalCode': '72000',
          'addressCountry': 'BA',
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+387 62 580 207',
          'contactType': 'customer support',
          'email': 'info@bh-assistant.ba',
          'availableLanguage': ['bs', 'en', 'de', 'tr'],
        },
        'sameAs': [
          'https://www.facebook.com/SpajamoKultureStvaramoSanse',
          'https://www.instagram.com/bh.asst',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bh-assistant.ba/#website',
        'url': 'https://bh-assistant.ba',
        'name': 'B&H Assistant d.o.o.',
        'publisher': {
          '@id': 'https://bh-assistant.ba/#organization',
        },
        'inLanguage': langCode,
      },
      {
        '@type': 'WebPage',
        '@id': `${config.canonical || 'https://bh-assistant.ba' + pathname}#webpage`,
        'url': config.canonical || `https://bh-assistant.ba${pathname}`,
        'name': config.title,
        'description': config.description,
        'isPartOf': {
          '@id': 'https://bh-assistant.ba/#website',
        },
        'inLanguage': langCode,
      },
    ],
  };

  script.textContent = JSON.stringify(structuredData);
}

/**
 * Custom hook for dynamically updating HTML meta titles and descriptions
 * for each route and language to maximize search engine indexing performance.
 */
export function useMetaTags(overrideConfig?: Partial<RouteMetaConfig>) {
  const location = useLocation();
  const { language } = useLanguage();

  const useHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useHook(() => {
    // Normalize path (strip query params, hash and trailing slash)
    const rawPath = location.pathname.split('?')[0].split('#')[0];
    const cleanPath = rawPath.length > 1 && rawPath.endsWith('/')
      ? rawPath.slice(0, -1)
      : rawPath;
    const resolvedPath = ROUTE_ALIASES[cleanPath] || cleanPath;

    const localizedMeta = getRouteMeta(resolvedPath, language);

    const activeConfig: RouteMetaConfig = {
      title: overrideConfig?.title || localizedMeta.title,
      description: overrideConfig?.description || localizedMeta.description,
      keywords: overrideConfig?.keywords || localizedMeta.keywords || 'bh assistant, zenica, bih software',
      canonical: overrideConfig?.canonical || localizedMeta.canonical || `https://bh-assistant.ba${resolvedPath === '/' ? '/' : resolvedPath}`,
      ogType: overrideConfig?.ogType || localizedMeta.ogType || 'website',
      ogImage: overrideConfig?.ogImage || localizedMeta.ogImage || 'https://i.imgur.com/cXebP1B.jpg',
      ogImageAlt: overrideConfig?.ogImageAlt || localizedMeta.ogImageAlt || 'B&H Assistant d.o.o. Zenica',
    };

    // 1. Update Document Title immediately (ensures unique page title for tab & indexer)
    document.title = activeConfig.title;

    // 2. Update Standard SEO Meta Tags
    setOrCreateMetaTag('name', 'description', activeConfig.description);
    if (activeConfig.keywords) {
      setOrCreateMetaTag('name', 'keywords', activeConfig.keywords);
    }
    setOrCreateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setOrCreateMetaTag('name', 'author', 'B&H Assistant d.o.o. Zenica');

    // 3. Update Open Graph (Facebook, LinkedIn, Viber, WhatsApp) Meta Tags
    setOrCreateMetaTag('property', 'og:title', activeConfig.title);
    setOrCreateMetaTag('property', 'og:description', activeConfig.description);
    setOrCreateMetaTag('property', 'og:url', activeConfig.canonical || `https://bh-assistant.ba${resolvedPath}`);
    setOrCreateMetaTag('property', 'og:type', activeConfig.ogType || 'website');
    setOrCreateMetaTag('property', 'og:site_name', 'B&H Assistant d.o.o. Zenica');
    const ogLocale = language === 'bs' ? 'bs_BA' : language === 'de' ? 'de_DE' : language === 'tr' ? 'tr_TR' : 'en_US';
    setOrCreateMetaTag('property', 'og:locale', ogLocale);
    
    if (activeConfig.ogImage) {
      setOrCreateMetaTag('property', 'og:image', activeConfig.ogImage);
      setOrCreateMetaTag('property', 'og:image:secure_url', activeConfig.ogImage);
      if (activeConfig.ogImageAlt) {
        setOrCreateMetaTag('property', 'og:image:alt', activeConfig.ogImageAlt);
      }
    }

    // 4. Update Twitter Card Meta Tags
    setOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    setOrCreateMetaTag('name', 'twitter:title', activeConfig.title);
    setOrCreateMetaTag('name', 'twitter:description', activeConfig.description);
    setOrCreateMetaTag('name', 'twitter:url', activeConfig.canonical || `https://bh-assistant.ba${resolvedPath}`);
    if (activeConfig.ogImage) {
      setOrCreateMetaTag('name', 'twitter:image', activeConfig.ogImage);
      if (activeConfig.ogImageAlt) {
        setOrCreateMetaTag('name', 'twitter:image:alt', activeConfig.ogImageAlt);
      }
    }

    // 5. Update Canonical Link
    const cleanCanonical = activeConfig.canonical || `https://bh-assistant.ba${resolvedPath === '/' ? '/' : resolvedPath}`;
    setOrCreateLinkTag('canonical', cleanCanonical);

    // 6. Set Multi-Language Hreflang Tags for Search Engine Indexing
    setOrCreateLinkTag('alternate', cleanCanonical, 'x-default');
    setOrCreateLinkTag('alternate', cleanCanonical, 'bs');
    setOrCreateLinkTag('alternate', cleanCanonical, 'en');
    setOrCreateLinkTag('alternate', cleanCanonical, 'de');
    setOrCreateLinkTag('alternate', cleanCanonical, 'tr');

    // 7. Update Structured Data (Schema JSON-LD)
    updateJsonLd(activeConfig, resolvedPath, language);

  }, [location.pathname, language, overrideConfig]);
}
