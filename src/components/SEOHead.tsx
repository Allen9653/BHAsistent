import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getRouteMeta, ROUTE_ALIASES, RouteMetaConfig } from '../data/seoData';
import { Language } from '../data/translations';

export interface SEOHeadProps {
  /** Optional custom title for the page or article */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom keywords */
  keywords?: string;
  /** Optional canonical URL override */
  canonical?: string;
  /** Open Graph type: 'website' or 'article' */
  ogType?: 'website' | 'article';
  /** Primary Open Graph and Twitter image URL */
  ogImage?: string;
  /** Alt text for the OG image */
  ogImageAlt?: string;
  /** Author name for articles */
  author?: string;
  /** ISO date string for published time */
  publishedTime?: string;
  /** ISO date string for modified time */
  modifiedTime?: string;
  /** Section / Category name */
  section?: string;
  /** Article tags */
  tags?: string[];
  /** Optional custom JSON-LD schema object or array */
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  /** Set to true to instruct robots not to index (e.g. 404 or admin modals) */
  noIndex?: boolean;
}

/**
 * Utility to set, update, or remove meta tags by attribute name/value
 */
function setMeta(attrName: 'name' | 'property', attrVal: string, content?: string | null) {
  const existing = document.querySelectorAll(`meta[${attrName}="${attrVal}"]`);
  if (!content) {
    existing.forEach((el) => el.parentNode?.removeChild(el));
    return;
  }
  if (existing.length > 0) {
    existing[0].setAttribute('content', content);
    for (let i = 1; i < existing.length; i++) {
      existing[i].parentNode?.removeChild(existing[i]);
    }
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute(attrName, attrVal);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

/**
 * Utility to set or update link tags (canonical, hreflang)
 */
function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  const existing = document.querySelectorAll(selector);
  if (existing.length > 0) {
    existing[0].setAttribute('href', href);
    for (let i = 1; i < existing.length; i++) {
      existing[i].parentNode?.removeChild(existing[i]);
    }
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (hreflang) {
      link.setAttribute('hreflang', hreflang);
    }
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }
}

/**
 * Injects or updates Schema.org JSON-LD structured data in the document head
 */
function injectJsonLd(data: Record<string, any>, scriptId = 'bh-seohead-jsonld') {
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * SEOHead Component
 * 
 * Dynamically manages HTML `<head>` tags:
 * - Dynamic `<title>` tags tailored to each route and language
 * - Primary `<meta name="description">`, `keywords`, `author`, `robots`
 * - Full Open Graph protocol headers (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `og:locale`)
 * - Article specific headers (`article:published_time`, `article:author`, `article:section`, `article:tag`)
 * - Twitter Card headers (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`)
 * - Canonical URLs (`<link rel="canonical">`) and multi-lingual `hreflang` tags
 * - Schema.org JSON-LD structured data for rich snippets and AdSense quality compliance
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType,
  ogImage,
  ogImageAlt,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  jsonLd,
  noIndex = false,
}) => {
  const location = useLocation();
  const { language } = useLanguage();

  const useHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useHook(() => {
    // 1. Resolve normalized route path and base fallback configuration
    const rawPath = location.pathname.split('?')[0].split('#')[0];
    const cleanPath = rawPath.length > 1 && rawPath.endsWith('/')
      ? rawPath.slice(0, -1)
      : rawPath;
    const resolvedPath = ROUTE_ALIASES[cleanPath] || cleanPath;

    const baseMeta = getRouteMeta(resolvedPath, language);

    // 2. Compute final active parameters
    const activeTitle = title || baseMeta.title;
    const activeDescription = description || baseMeta.description;
    const activeKeywords = keywords || baseMeta.keywords || 'bh assistant, zenica, bih softver, bh konver';
    const baseUrl = 'https://bh-assistant.ba';
    const resolvedCanonical = canonical || baseMeta.canonical || `${baseUrl}${resolvedPath === '/' ? '/' : resolvedPath}`;
    const activeOgType = ogType || baseMeta.ogType || 'website';
    const activeOgImage = ogImage || baseMeta.ogImage || 'https://i.imgur.com/cXebP1B.jpg';
    const activeOgImageAlt = ogImageAlt || baseMeta.ogImageAlt || 'B&H Assistant d.o.o. Zenica';
    const activeAuthor = author || 'B&H Assistant d.o.o. Zenica';

    // 3. Document Title
    document.title = activeTitle;

    // 4. Primary Standard Meta Tags
    setMeta('name', 'description', activeDescription);
    setMeta('name', 'keywords', activeKeywords);
    setMeta('name', 'author', activeAuthor);
    setMeta(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMeta('name', 'theme-color', '#0A1628');

    // 5. Canonical URL & Multi-lingual Hreflangs
    setLink('canonical', resolvedCanonical);
    setLink('alternate', resolvedCanonical, 'x-default');
    setLink('alternate', resolvedCanonical, 'bs');
    setLink('alternate', resolvedCanonical, 'en');
    setLink('alternate', resolvedCanonical, 'de');
    setLink('alternate', resolvedCanonical, 'tr');

    // 6. Open Graph Meta Tags
    setMeta('property', 'og:title', activeTitle);
    setMeta('property', 'og:description', activeDescription);
    setMeta('property', 'og:url', resolvedCanonical);
    setMeta('property', 'og:type', activeOgType);
    setMeta('property', 'og:site_name', 'B&H Assistant d.o.o. Zenica');
    const ogLocale = language === 'bs' ? 'bs_BA' : language === 'de' ? 'de_DE' : language === 'tr' ? 'tr_TR' : 'en_US';
    setMeta('property', 'og:locale', ogLocale);

    if (activeOgImage) {
      setMeta('property', 'og:image', activeOgImage);
      setMeta('property', 'og:image:secure_url', activeOgImage);
      setMeta('property', 'og:image:alt', activeOgImageAlt);
      setMeta('property', 'og:image:type', 'image/jpeg');
    }

    // Article Specific Open Graph tags
    if (activeOgType === 'article') {
      if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
      if (activeAuthor) setMeta('property', 'article:author', activeAuthor);
      if (section) setMeta('property', 'article:section', section);
      if (tags && tags.length > 0) {
        tags.forEach((tag) => setMeta('property', 'article:tag', tag));
      }
    }

    // 7. Twitter / X Card Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', activeTitle);
    setMeta('name', 'twitter:description', activeDescription);
    setMeta('name', 'twitter:url', resolvedCanonical);
    if (activeOgImage) {
      setMeta('name', 'twitter:image', activeOgImage);
      setMeta('name', 'twitter:image:alt', activeOgImageAlt);
    }
    setMeta('name', 'twitter:site', '@bh_assistant');
    setMeta('name', 'twitter:creator', '@bh_assistant');

    // 8. Structured Data (Schema.org JSON-LD)
    const langCode = language === 'bs' ? 'bs-BA' : language === 'de' ? 'de-DE' : language === 'tr' ? 'tr-TR' : 'en-US';

    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: 'B&H Assistant d.o.o. Zenica',
          url: baseUrl,
          logo: 'https://i.imgur.com/cXebP1B.jpg',
          description: 'Zvanična IT kompanija B&H Assistant d.o.o. Zenica. Razvoj autorskih digitalnih alata BH KONVER i BH PapirFinder, magazin SCENA+ i e-uprava u BiH.',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Bulevar Ezhera Eze Arnautovića 8',
            addressLocality: 'Zenica',
            postalCode: '72000',
            addressCountry: 'BA',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+387 62 580 207',
            contactType: 'customer support',
            email: 'info@bh-assistant.ba',
            availableLanguage: ['bs', 'en', 'de', 'tr'],
          },
          sameAs: [
            'https://www.facebook.com/SpajamoKultureStvaramoSanse',
            'https://www.instagram.com/bh.asst',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          url: baseUrl,
          name: 'B&H Assistant d.o.o.',
          publisher: {
            '@id': `${baseUrl}/#organization`,
          },
          inLanguage: langCode,
        },
        activeOgType === 'article'
          ? {
              '@type': 'Article',
              '@id': `${resolvedCanonical}#article`,
              isPartOf: {
                '@id': `${baseUrl}/#website`,
              },
              headline: activeTitle,
              description: activeDescription,
              image: activeOgImage,
              datePublished: publishedTime || new Date().toISOString(),
              dateModified: modifiedTime || publishedTime || new Date().toISOString(),
              author: {
                '@type': 'Person',
                name: activeAuthor,
              },
              publisher: {
                '@id': `${baseUrl}/#organization`,
              },
              inLanguage: langCode,
              mainEntityOfPage: resolvedCanonical,
            }
          : {
              '@type': 'WebPage',
              '@id': `${resolvedCanonical}#webpage`,
              url: resolvedCanonical,
              name: activeTitle,
              description: activeDescription,
              isPartOf: {
                '@id': `${baseUrl}/#website`,
              },
              inLanguage: langCode,
            },
      ],
    };

    const finalJsonLd = jsonLd ? jsonLd : defaultStructuredData;
    injectJsonLd(finalJsonLd);

  }, [
    location.pathname,
    language,
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    ogImageAlt,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    jsonLd,
    noIndex,
  ]);

  return null;
};

export default SEOHead;
