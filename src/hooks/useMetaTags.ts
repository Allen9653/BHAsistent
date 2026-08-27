import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface RouteMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

export const ROUTE_META_MAP: Record<string, RouteMetaConfig> = {
  '/': {
    title: 'BH Assistant d.o.o. Zenica | Spajamo Kulture, Stvaramo Šanse',
    description: 'Zvanična web platforma IT firme B&H Assistant d.o.o. Zenica. Digitalni alati, BH KONVER softver, SCENA+ magazin, ZENTAXI i GUMMI projekti. >bd0c<',
    keywords: 'bh assistant, zenica, bih softver, bh konver, scena magazin, zentaxi, gummi, digitalna transformacija bih, it usluge',
    canonical: 'https://bh-assistant.ba/',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
  '/o-nama': {
    title: 'O Nama | B&H Assistant d.o.o. Zenica - Poslovni Plan & Registar',
    description: 'Upoznajte B&H Assistant d.o.o. Zenica: misija, vizija, zvanični video poslovnog plana, finansijski model i verifikacija u registrima (JIB: 4218884960007). >bd0c<',
    keywords: 'o nama, bh assistant d.o.o., firma zenica, registrovana firma bih, poslovni plan, financial model',
    canonical: 'https://bh-assistant.ba/o-nama',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
  '/alati': {
    title: 'Digitalni Alati & Usluge | BH KONVER, e-Uprava & Softver po Mjeri',
    description: 'Istražite BH digitalne alate, autorski softver BH KONVER za pravne izjave i kalkulacije, sisteme e-uprave i IT rješenja za privredu Bosne i Hercegovine.',
    keywords: 'bh konver, digitalni alati bih, softver za pravne izjave, digitalizacija poslovanja, kalkulatori bih',
    canonical: 'https://bh-assistant.ba/alati',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/gK97x3z.jpg',
  },
  '/scena-magazin': {
    title: 'SCENA+ Magazin | Kultura, Umjetnost, Intervjui & E-Izdanja - Zenica & BiH',
    description: 'SCENA+ multimedijalni i kulturni magazin u izdanju B&H Assistant d.o.o. Intervjui, umjetnost, kulturna baština, preporuke i interaktivna digitalna izdanja.',
    keywords: 'scena magazin, kulturni magazin bih, intervjui zenica, bh umjetnost, e-magazin bih',
    canonical: 'https://bh-assistant.ba/scena-magazin',
    ogType: 'article',
    ogImage: 'https://i.imgur.com/jf337m3.jpg',
  },
  '/novosti': {
    title: 'Novosti & Najave | B&H Assistant d.o.o. - IT Vijesti & Partnerstva',
    description: 'Pratite najnovije vijesti, objave, partnerstva, monday.com Work OS integracije i tehnološka ažuriranja iz redakcije B&H Assistant d.o.o.',
    keywords: 'vijesti bih, it novosti, monday.com bih, najave projekata, bh assistant obavijesti, clanci',
    canonical: 'https://bh-assistant.ba/novosti',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
  '/projekti': {
    title: 'Projekti & Partnerstva | ZENTAXI, GUMMI & Dječija Bojanka - B&H Assistant',
    description: 'Inovativni projekti koji traže investitore i partnere: ZENTAXI, GUMMI pametna reciklaža guma, te interaktivna dječija bojanka "Sretno djetinjstvo".',
    keywords: 'zentaxi, gummi reciklaza, djecija bojanka, investicije bih, startupi bih, partnerstva',
    canonical: 'https://bh-assistant.ba/projekti',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/3Yk05Qo.jpg',
  },
  '/shop': {
    title: 'Shop & Edukacija | Partneri, Kursevi, Alati & Affiliate Preporuke',
    description: 'Preporučeni digitalni kursevi, alati za produktivnost (monday.com, Alison, CloudTalk, Atoms) i edukativni resursi za profesionalni razvoj.',
    keywords: 'bh shop, edukacija bih, alison certifikati, monday.com radni tokovi, affiliate preporuke',
    canonical: 'https://bh-assistant.ba/shop',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
  '/zajednica': {
    title: 'Zajednica & Društvene Mreže | @bh.assistant.doo - Povežite se s Nama',
    description: 'Pridružite se B&H Assistant zajednici na društvenim mrežama, pratite naš zvanični Instagram nalog @bh.assistant.doo i budite u toku sa svim novostima.',
    keywords: 'instagram bh assistant, drustvene mreze, zajednica zenica, bh assistant instagram',
    canonical: 'https://bh-assistant.ba/zajednica',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
  '/kontakt': {
    title: 'Kontakt & Impressum | B&H Assistant d.o.o. Zenica - Javite nam se',
    description: 'Stupite u kontakt sa timom B&H Assistant d.o.o. Zenica. Adresa: Ul. Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica. E-mail: info@bh-assistant.ba, Tel: +387 62 580 207.',
    keywords: 'kontakt bh assistant, adresa zenica, telefon bh assistant, impressum, email kontakt',
    canonical: 'https://bh-assistant.ba/kontakt',
    ogType: 'website',
    ogImage: 'https://i.imgur.com/8Q9Z5bX.jpg',
  },
};

/**
 * Helper to get or create a meta tag by name or property attribute.
 */
function setOrCreateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to get or create a link tag (e.g. canonical).
 */
function setOrCreateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Helper to inject or update JSON-LD Schema structured data
 */
function updateJsonLd(config: RouteMetaConfig, pathname: string) {
  const scriptId = 'bh-dynamic-jsonld-schema';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bh-assistant.ba/#organization',
        'name': 'B&H Assistant d.o.o. Zenica',
        'url': 'https://bh-assistant.ba',
        'logo': 'https://i.imgur.com/8Q9Z5bX.jpg',
        'description': 'Zvanična platforma IT firme B&H Assistant d.o.o. Zenica. Slogan: SPAJAMO KULTURE - STVARAMO ŠANSE. >bd0c<',
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
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bh-assistant.ba/#website',
        'url': 'https://bh-assistant.ba',
        'name': 'B&H Assistant d.o.o.',
        'publisher': {
          '@id': 'https://bh-assistant.ba/#organization',
        },
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
        'inLanguage': 'bs',
      },
    ],
  };

  script.textContent = JSON.stringify(structuredData);
}

/**
 * Custom hook for dynamically updating HTML meta tags based on active route or overrides.
 */
export function useMetaTags(overrideConfig?: Partial<RouteMetaConfig>) {
  const location = useLocation();

  useEffect(() => {
    const matchedConfig = ROUTE_META_MAP[location.pathname] || ROUTE_META_MAP['/'];
    const activeConfig: RouteMetaConfig = {
      title: overrideConfig?.title || matchedConfig.title,
      description: overrideConfig?.description || matchedConfig.description,
      keywords: overrideConfig?.keywords || matchedConfig.keywords || 'bh assistant, zenica, bih',
      canonical: overrideConfig?.canonical || matchedConfig.canonical || `https://bh-assistant.ba${location.pathname}`,
      ogType: overrideConfig?.ogType || matchedConfig.ogType || 'website',
      ogImage: overrideConfig?.ogImage || matchedConfig.ogImage || 'https://i.imgur.com/8Q9Z5bX.jpg',
    };

    // 1. Update Document Title
    document.title = activeConfig.title;

    // 2. Update Standard SEO Meta Tags
    setOrCreateMetaTag('name', 'description', activeConfig.description);
    if (activeConfig.keywords) {
      setOrCreateMetaTag('name', 'keywords', activeConfig.keywords);
    }
    setOrCreateMetaTag('name', 'robots', 'index, follow, max-image-preview:large');

    // 3. Update Open Graph (Facebook / LinkedIn) Meta Tags
    setOrCreateMetaTag('property', 'og:title', activeConfig.title);
    setOrCreateMetaTag('property', 'og:description', activeConfig.description);
    setOrCreateMetaTag('property', 'og:url', activeConfig.canonical || `https://bh-assistant.ba${location.pathname}`);
    setOrCreateMetaTag('property', 'og:type', activeConfig.ogType || 'website');
    setOrCreateMetaTag('property', 'og:site_name', 'B&H Assistant d.o.o.');
    if (activeConfig.ogImage) {
      setOrCreateMetaTag('property', 'og:image', activeConfig.ogImage);
    }

    // 4. Update Twitter Card Meta Tags
    setOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    setOrCreateMetaTag('name', 'twitter:title', activeConfig.title);
    setOrCreateMetaTag('name', 'twitter:description', activeConfig.description);
    if (activeConfig.ogImage) {
      setOrCreateMetaTag('name', 'twitter:image', activeConfig.ogImage);
    }

    // 5. Update Canonical Link
    if (activeConfig.canonical) {
      setOrCreateLinkTag('canonical', activeConfig.canonical);
    }

    // 6. Update Structured Data (Schema JSON-LD)
    updateJsonLd(activeConfig, location.pathname);

  }, [location.pathname, overrideConfig]);
}
