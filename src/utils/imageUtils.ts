/**
 * B&H Assistant Image Optimization & CORS Utility
 * 
 * Provides robust candidate resolution, CORS handling, client-side caching,
 * and server proxy fallbacks for external CDN assets (Archive.org, Imgur, etc.).
 */

// In-memory cache of tested and working image URLs to prevent repeated network failures
const resolvedImageCache = new Map<string, string>();
const failedCandidateCache = new Set<string>();

const CACHE_NAME = 'bh-assistant-image-cache-v1';

/**
 * Normalizes Archive.org /details/ or /download/ URLs into direct asset endpoints
 */
export function normalizeArchiveOrgUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Known SkilledBridge mappings
  if (trimmed.includes('skilledbridge_header') || trimmed.includes('skilledbridge-header')) {
    return 'https://archive.org/download/skilledbridge_header/skilledbridge_header.png';
  }
  if (trimmed.includes('skilled-bridge-d.o.o.-logotype') || trimmed.includes('skilledbridge_logo')) {
    return 'https://archive.org/download/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png';
  }

  // General Archive.org URL transforms
  if (trimmed.includes('archive.org/details/')) {
    return trimmed.replace('archive.org/details/', 'archive.org/download/');
  }

  return trimmed;
}

/**
 * Returns a server-side proxy URL with permissive CORS & aggressive caching
 */
export function getProxyImageUrl(url: string): string {
  if (!url || typeof window === 'undefined') return url;
  if (url.startsWith('/images/') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}

/**
 * Builds an ordered list of candidate URLs for maximum resilience:
 * 1. Local statically served copy (fastest, zero CORS restriction)
 * 2. Server-side proxy (guarantees Access-Control-Allow-Origin: * and immutable caching)
 * 3. Direct cluster storage node (bypasses Archive.org 302 redirects)
 * 4. Original external download link
 */
export function getResilientImageCandidates(rawSrc: string): string[] {
  if (!rawSrc) return [];
  const trimmed = rawSrc.trim();
  const candidates: string[] = [];

  const add = (candidate: string) => {
    if (candidate && !candidates.includes(candidate) && !failedCandidateCache.has(candidate)) {
      candidates.push(candidate);
    }
  };

  // If already resolved in cache, prioritize it
  const cached = resolvedImageCache.get(trimmed);
  if (cached) {
    add(cached);
  }

  // 1. SkilledBridge d.o.o. Dedicated Resolution
  if (trimmed.includes('skilledbridge') || trimmed.includes('skilled-bridge')) {
    if (trimmed.includes('header')) {
      add('/images/skilledbridge_header.png');
      add(getProxyImageUrl('https://archive.org/download/skilledbridge_header/skilledbridge_header.png'));
      add('https://ia800100.us.archive.org/16/items/skilledbridge_header/skilledbridge_header.png');
      add('https://archive.org/download/skilledbridge_header/skilledbridge_header.png');
    } else if (trimmed.includes('logo')) {
      add('/images/skilledbridge_logo.png');
      add(getProxyImageUrl('https://archive.org/download/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png'));
      add('https://ia800503.us.archive.org/13/items/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png');
      add('https://ia600503.us.archive.org/13/items/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png');
      add('https://archive.org/download/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png');
    } else {
      add('/images/skilledbridge_b2b_ad.jpg');
      add('/images/skilledbridge_header.png');
      add(getProxyImageUrl('https://archive.org/download/skilledbridge_header/skilledbridge_header.png'));
      add('https://archive.org/download/skilledbridge_header/skilledbridge_header.png');
    }
    return candidates;
  }

  // 2. Generic Archive.org URLs
  if (trimmed.includes('archive.org')) {
    const directUrl = normalizeArchiveOrgUrl(trimmed);
    add(directUrl);
    add(getProxyImageUrl(directUrl));
    add(trimmed);
    return candidates;
  }

  // 3. Imgur URLs
  if (trimmed.includes('imgur.com')) {
    add(trimmed);
    add(getProxyImageUrl(trimmed));
    return candidates;
  }

  // 4. Default / Local URLs
  add(trimmed);
  if (!trimmed.startsWith('http') && !trimmed.startsWith('/images/') && !trimmed.startsWith('data:')) {
    add(`/images/${trimmed.replace(/^\/+/, '')}`);
  }

  return candidates;
}

/**
 * Preloads an image into browser memory and CacheStorage if available
 */
export async function preloadAndCacheImage(src: string): Promise<string> {
  if (!src || typeof window === 'undefined') return src;

  // Check memory cache first
  if (resolvedImageCache.has(src)) {
    return resolvedImageCache.get(src)!;
  }

  const candidates = getResilientImageCandidates(src);

  for (const candidate of candidates) {
    try {
      const loaded = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.crossOrigin = 'anonymous';

        img.onload = () => resolve(candidate);
        img.onerror = () => reject(new Error(`Failed to load ${candidate}`));

        img.src = candidate;
      });

      // Save to memory cache
      resolvedImageCache.set(src, loaded);

      // Optionally cache via CacheStorage API in supported browsers
      if ('caches' in window && window.location.protocol.startsWith('http')) {
        window.caches.open(CACHE_NAME).then((cache) => {
          fetch(loaded, { mode: 'cors', credentials: 'omit', redirect: 'follow' })
            .then((res) => {
              if (res.ok) cache.put(loaded, res);
            })
            .catch(() => {});
        }).catch(() => {});
      }

      return loaded;
    } catch {
      failedCandidateCache.add(candidate);
    }
  }

  // Fallback to initial src
  return src;
}

/**
 * Marks a candidate URL as working for instant lookup
 */
export function recordWorkingImageUrl(originalSrc: string, workingCandidate: string): void {
  resolvedImageCache.set(originalSrc, workingCandidate);
}

/**
 * Background pre-warmer for critical partnership and brand visuals
 */
export function warmupCriticalPartnershipImages(): void {
  if (typeof window === 'undefined') return;

  const critical = [
    '/images/skilledbridge_logo.png',
    '/images/skilledbridge_header.png',
    '/images/skilledbridge_b2b_ad.jpg',
    'https://archive.org/download/skilled-bridge-d.o.o.-logotype/SkilledBridge%20d.o.o._logotype.png',
    'https://archive.org/download/skilledbridge_header/skilledbridge_header.png',
  ];

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      critical.forEach((url) => {
        preloadAndCacheImage(url).catch(() => {});
      });
    });
  } else {
    setTimeout(() => {
      critical.forEach((url) => {
        preloadAndCacheImage(url).catch(() => {});
      });
    }, 1200);
  }
}
