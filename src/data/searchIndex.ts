import { DIGITAL_TOOLS, DEVELOPMENT_PROJECTS, SCENA_MAGAZINE, AFFILIATE_COURSES } from './companyData';
import { INITIAL_NEWS, getStoredNews } from './newsData';

export type SearchCategory = 'all' | 'tools' | 'projects' | 'articles' | 'education' | 'company';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  categoryLabel: string;
  route: string;
  externalUrl?: string;
  tags: string[];
  badge?: string;
  image?: string;
}

/**
 * Normalizes text for diacritic-insensitive search matching in Bosnian/Croatian/Serbian and English
 */
export function normalizeSearchString(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .trim();
}

/**
 * Builds the complete searchable catalog across all platforms, tools, projects, and articles
 */
export function getAllSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Digital Tools
  for (const tool of DIGITAL_TOOLS) {
    items.push({
      id: `tool-${tool.id}`,
      title: tool.name,
      description: tool.description,
      category: 'tools',
      categoryLabel: 'Digitalni Alat',
      route: '/alati',
      externalUrl: tool.url,
      tags: [tool.category, tool.tagline, ...(tool.features || [])],
      badge: tool.badge,
      image: tool.mockupImage || tool.image,
    });
  }

  // 2. Development Projects
  for (const proj of DEVELOPMENT_PROJECTS) {
    items.push({
      id: `project-${proj.id}`,
      title: proj.title,
      description: proj.description,
      category: 'projects',
      categoryLabel: 'Inovativni Projekat',
      route: '/projekti',
      externalUrl: proj.url,
      tags: [proj.subtitle, proj.targetAudience, ...(proj.highlights || [])],
      badge: proj.status,
      image: proj.image,
    });
  }

  // 3. Articles & News (incorporate both storage and initial items)
  const allArticles = typeof window !== 'undefined' ? getStoredNews() : INITIAL_NEWS;
  for (const art of allArticles) {
    items.push({
      id: `article-${art.id}`,
      title: art.title,
      description: art.excerpt,
      category: 'articles',
      categoryLabel: 'Članak & Novost',
      route: '/novosti',
      externalUrl: art.externalUrl,
      tags: [art.category, ...(art.tags || []), art.author],
      badge: art.date,
      image: art.imageUrl,
    });
  }

  // 4. SCENA+ Magazine Topics
  for (const topic of SCENA_MAGAZINE.topics || []) {
    items.push({
      id: `scena-${topic.title.replace(/\s+/g, '-').toLowerCase()}`,
      title: `SCENA+: ${topic.title}`,
      description: topic.desc,
      category: 'articles',
      categoryLabel: 'SCENA+ Magazin',
      route: '/scena-magazin',
      tags: [topic.category, 'SCENA+ Magazin', 'Kultura ZDK', 'Umjetnost', 'Zenica'],
      badge: topic.category,
      image: topic.image || SCENA_MAGAZINE.coverImage,
    });
  }

  // 5. Digital Products & Educational Resources
  for (const course of AFFILIATE_COURSES) {
    items.push({
      id: `course-${course.id}`,
      title: course.title,
      description: course.description,
      category: 'education',
      categoryLabel: 'Edukacija & Shop',
      route: '/shop',
      externalUrl: course.affiliateUrl,
      tags: [course.provider, course.category, ...(course.bullets || [])],
      badge: course.badge,
      image: course.image,
    });
  }

  // 6. Core Pages & Specialized Features
  items.push(
    {
      id: 'page-onama',
      title: 'O Nama — Poslovni Profil & Prezentacija',
      description: 'Zvanični podaci kompanije B&H Assistant d.o.o. Zenica, misija, vizija, CompanyWall bonitet i HD video poslovnog plana.',
      category: 'company',
      categoryLabel: 'Kompanija',
      route: '/o-nama',
      tags: ['poslovni plan', 'bonitet', 'zenica', 'registracija', 'tim', 'video prezentacija'],
      badge: 'Zvanični Profil',
    },
    {
      id: 'feature-bojanka',
      title: 'Edukativna Gummi Bojanka za Djecu (PDF)',
      description: 'Besplatna interaktivna i printana dječija bojanka "Sretno djetinjstvo" posvećena ekologiji i učenju.',
      category: 'projects',
      categoryLabel: 'Edukativni Projekat',
      route: '/projekti',
      tags: ['bojanka', 'djeca', 'skole', 'pdf preuzimanje', 'edukacija'],
      badge: 'Besplatan PDF',
    },
    {
      id: 'page-kontakt',
      title: 'Kontakt & Lokacija B&H Assistant d.o.o.',
      description: 'Ul. Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica. Telefon: +387 62 580 207, E-mail: info@bh-assistant.ba.',
      category: 'company',
      categoryLabel: 'Kontakt & Impressum',
      route: '/kontakt',
      tags: ['adresa', 'telefon', 'email', 'zenica', 'radno vrijeme', 'impressum', '4219296620005'],
      badge: 'Podrška',
    },
    {
      id: 'page-privatnost',
      title: 'Politika Privatnosti & Zaštita Podataka (GDPR)',
      description: 'Pravila privatnosti, prava ispitanika i obrada ličnih podataka u skladu sa Zakonom o zaštiti ličnih podataka BiH i GDPR regulativom.',
      category: 'company',
      categoryLabel: 'Pravni Dokumenti',
      route: '/politika-privatnosti',
      tags: ['gdpr', 'zastita podataka', 'kolacici', 'prava korisnika', 'voditelj obrade'],
      badge: 'GDPR Usklađeno',
    },
    {
      id: 'page-uslovi',
      title: 'Opći Uslovi Korištenja Platforme',
      description: 'Pravni okvir, autorska prava, intelektualno vlasništvo nad softverima i nadležnost suda u Zenici.',
      category: 'company',
      categoryLabel: 'Pravni Dokumenti',
      route: '/uslovi-koristenja',
      tags: ['uslovi koristenja', 'autorska prava', 'nadleznost suda', 'pravila platforme'],
      badge: 'Pravni Okvir',
    }
  );

  return items;
}

/**
 * Filter search items using a fast client-side scoring algorithm
 */
export function filterSearchCatalog(
  items: SearchItem[],
  query: string,
  category: SearchCategory = 'all'
): SearchItem[] {
  const normalizedQuery = normalizeSearchString(query);

  return items.filter((item) => {
    // 1. Filter by category
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // 2. If query is empty, return all category items
    if (!normalizedQuery) {
      return true;
    }

    // 3. Multi-field match
    const titleNorm = normalizeSearchString(item.title);
    const descNorm = normalizeSearchString(item.description);
    const catNorm = normalizeSearchString(item.categoryLabel);
    const tagsNorm = item.tags.map(normalizeSearchString).join(' ');

    return (
      titleNorm.includes(normalizedQuery) ||
      descNorm.includes(normalizedQuery) ||
      catNorm.includes(normalizedQuery) ||
      tagsNorm.includes(normalizedQuery)
    );
  });
}
