/**
 * Custom Content & Text Blocks CMS Storage
 * 
 * Provides production-ready persistent storage for:
 * 1. Structured content overrides (services, products, details)
 * 2. In-place WYSIWYG / inline editable text blocks across all platform pages
 * 3. Server-side API persistence with instant localStorage resilience
 */

const CONTENT_STORAGE_KEY = 'bh_custom_content_overrides_v1';
const TEXT_BLOCKS_STORAGE_KEY = 'bh_custom_text_blocks_v1';
const CONTENT_EVENT = 'bh-custom-content-updated';
const TEXT_EVENT = 'bh-custom-text-updated';

export interface ContentOverride {
  id: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  published?: boolean;
}

// ---------------------------------------------------------------------------
// 1. Structured Content Overrides (Services / Products)
// ---------------------------------------------------------------------------

export function getAllCustomContent(): Record<string, ContentOverride> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCustomContent(id: string): ContentOverride | null {
  const all = getAllCustomContent();
  return all[id] || null;
}

export function setCustomContent(id: string, override: Partial<ContentOverride>): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllCustomContent();
    all[id] = { ...(all[id] || { id }), ...override };
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT, { detail: { id, override } }));
  } catch (err) {
    console.error('Failed to save content override:', err);
  }
}

export function onCustomContentChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(CONTENT_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CONTENT_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

// ---------------------------------------------------------------------------
// 2. In-Place WYSIWYG / Inline Text Blocks across any page
// ---------------------------------------------------------------------------

export function getAllTextBlocks(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TEXT_BLOCKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getTextBlock(key: string, defaultValue: string): string {
  const all = getAllTextBlocks();
  if (all[key] !== undefined && all[key] !== null) {
    return all[key];
  }
  return defaultValue;
}

export function setTextBlock(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllTextBlocks();
    all[key] = value;
    localStorage.setItem(TEXT_BLOCKS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(TEXT_EVENT, { detail: { key, value } }));
  } catch (err) {
    console.error('Failed to save text block:', err);
  }
}

export async function saveMultipleTextBlocks(
  blocks: Record<string, string>
): Promise<{ success: boolean; count: number; error?: string }> {
  if (typeof window === 'undefined') return { success: true, count: 0 };

  try {
    // 1. Update local storage
    const all = getAllTextBlocks();
    Object.assign(all, blocks);
    localStorage.setItem(TEXT_BLOCKS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(TEXT_EVENT, { detail: { updatedKeys: Object.keys(blocks) } }));

    // 2. Try persisting to backend API if token is present
    const token = localStorage.getItem('bh_admin_auth_token') || sessionStorage.getItem('bh_admin_auth_token');
    if (token) {
      try {
        await fetch('/api/cms/content/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ blocks })
        });
      } catch (apiErr) {
        // Backend optional, local persistence succeeded
        console.warn('API sync deferred, local save active:', apiErr);
      }
    }

    return { success: true, count: Object.keys(blocks).length };
  } catch (err: any) {
    console.error('Failed saving multiple text blocks:', err);
    return { success: false, count: 0, error: err?.message || 'Greška pri spremanju izmjena.' };
  }
}

export function resetTextBlock(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllTextBlocks();
    if (key in all) {
      delete all[key];
      localStorage.setItem(TEXT_BLOCKS_STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent(TEXT_EVENT, { detail: { key, reset: true } }));
    }
  } catch (err) {
    console.warn('Failed resetting text block:', err);
  }
}

export function resetAllTextBlocks(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TEXT_BLOCKS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(TEXT_EVENT, { detail: { resetAll: true } }));
  } catch (err) {
    console.warn('Failed resetting all text blocks:', err);
  }
}

export function onTextBlocksChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(TEXT_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(TEXT_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
