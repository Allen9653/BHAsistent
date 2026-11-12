import type { NewsArticle } from '../types';
import type { Language } from './translations';

/**
 * Helper: lokalizovani prikaz članka.
 * - Ako članak ima translations[lang], prikazuje title/excerpt/content tog jezika.
 * - Ako nema (većina postojećih članaka), fallback na BS original.
 * - Kategorija/autor/datum/date ostaju nepromijenjeni (tradicionalno su na BS-u,
 *   osim ako se jednog dana dodaju prijevodi kategorija).
 */
export function localizeArticle<T extends NewsArticle>(
  article: T,
  language: Language,
): { article: T; title: string; excerpt: string; content: string } {
  const tr = article.translations?.[language as 'en' | 'de' | 'tr'];
  if (!tr) {
    return { article, title: article.title, excerpt: article.excerpt, content: article.content };
  }
  return {
    article,
    title: tr.title,
    excerpt: tr.excerpt,
    content: tr.content,
  };
}
