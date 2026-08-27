import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layers, Image as ImageIcon } from 'lucide-react';

export interface LazyBlurredImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatioClass?: string;
  containerClassName?: string;
  placeholderClassName?: string;
  blurIntensity?: 'low' | 'medium' | 'high';
  priority?: boolean;
  blurPlaceholderColor?: string;
}

// Map of Imgur hash IDs to their fallback paths
const IMGUR_TO_LOCAL_MAP: Record<string, string[]> = {
  'qb26j1I': ['/images/alison_logo.jpg', '/images/alison_logo.png'],
  '4aXGBJy': ['/images/atoms_dev_affiliated.png', '/images/atoms_dev_affiliated.jpg'],
  'cXebP1B': ['/images/bh_assistant_logo.jpg', '/images/bh_assistant_logo.png', '/images/bh_assistant_logo.jpeg'],
  'qI85OyS': ['/images/bh_assistant_presentation.jpg', '/images/bh_assistant_presentation.png'],
  'WIdimeI': ['/images/bh_konver_mockup.jpg', '/images/bh_konver_banner.jpg', '/images/bh_konver_mockup.png'],
  'QfHNQIV': ['/images/bh_papirfinder_mockup.jpg', '/images/bh_papirfinder_banner.jpg', '/images/bh_papirfinder_mockup.png'],
  'kWsWhS5': ['/images/bravo_winner.png', '/images/bravo_winner.jpg'],
  'mkbxU6I': ['/images/business_plan.jpg', '/images/business_plan.png'],
  '5rTpp9F': ['/images/cloudtalk_banner.jpg', '/images/cloudtalk_banner.png'],
  '65sjyhp': ['/images/digitalni_spavac_bh_assistant.png', '/images/digitalni_spavac_bh_assistant.jpg'],
  'l7CMGP8': ['/images/gummi_bojanka.png', '/images/gummi_bojanka.jpg'],
  'j5QDDA1': ['/images/gummi_vas_jaran.png', '/images/gummi_vas_jaran.jpg'],
  'lfhiFqo': ['/images/okrugli_cvijet.png', '/images/fauna.png', '/images/okrugli_cvijet.jpg'],
  'nWGl9Gf': ['/images/ornamenti_bosne.jpg', '/images/ornamenti_bosne.png'],
  'RGLT2Ls': ['/images/our_products.png', '/images/our_products.jpg'],
  'sbCmVan': ['/images/posaljite_poruku_nasem_timu.png', '/images/posaljite_poruku_nasem_timu.jpg'],
  'XZpyxty': ['/images/remote_rocket_affilliated.jpg', '/images/remote_rocket_affilliated.png'],
  'jf337m3': ['/images/scena_cover.jpg', '/images/scena_cover.png'],
  '7GCX5oO': ['/images/tryhackme_banner.png', '/images/tryhackme_banner.jpg'],
  'nyGuQYP': ['/images/zentaxi_logo.png', '/images/zentaxi_logo.jpg'],
  '9xHhYZJ': ['/images/zentaxi_logo_za_reklamu.png', '/images/zentaxi_logo_za_reklamu.jpg'],
};

const CANVA_TO_LOCAL_MAP: Record<string, string[]> = {
  'jby4js35s2iizx7': ['https://i.imgur.com/jf337m3.jpg', '/images/scena_cover.jpg'],
  '9kf68sd8mgd2p0f': ['https://i.imgur.com/65sjyhp.jpg', '/images/digitalni_spavac_bh_assistant.png'],
  'ozbqeb4w30s7nbp': ['https://i.imgur.com/jf337m3.jpg', '/images/scena_cover.jpg'],
  'tna306bm8p462xm': ['https://i.imgur.com/l7CMGP8.jpg', '/images/gummi_bojanka.png'],
  'vxekpnx0ow1xvt9': ['https://i.imgur.com/jf337m3.jpg', '/images/scena_cover.jpg'],
};

const POSTIMG_MAP: Record<string, string[]> = {
  'cStfPQP': [
    'https://i.ytimg.com/vi/_z1ssf9ycqA/maxresdefault.jpg',
    'https://img.youtube.com/vi/_z1ssf9ycqA/hqdefault.jpg',
    'https://i.imgur.com/cXebP1B.jpg'
  ]
};

function getCandidateUrls(rawSrc: string): string[] {
  if (!rawSrc) return [];
  const trimmed = rawSrc.trim();
  const candidates: string[] = [];

  const addCandidate = (url: string) => {
    if (url && !candidates.includes(url)) {
      candidates.push(url);
    }
  };

  // Postimages / Postimg URLs
  if (trimmed.includes('postimg.cc') || trimmed.includes('postimages.org')) {
    const galleryMatch = trimmed.match(/postimg\.cc\/(?:gallery\/)?([a-zA-Z0-9]+)/);
    if (galleryMatch && POSTIMG_MAP[galleryMatch[1]]) {
      POSTIMG_MAP[galleryMatch[1]].forEach(addCandidate);
    }
    addCandidate('https://i.ytimg.com/vi/_z1ssf9ycqA/maxresdefault.jpg');
    addCandidate('https://img.youtube.com/vi/_z1ssf9ycqA/hqdefault.jpg');
    if (trimmed.match(/\.(png|jpg|jpeg|webp|gif)$/i)) {
      addCandidate(trimmed);
    }
    return candidates;
  }

  // Canva URLs
  const canvaMatch = trimmed.match(/https?:\/\/(?:www\.)?canva\.link\/([a-zA-Z0-9]+)/);
  if (canvaMatch) {
    const hash = canvaMatch[1];
    addCandidate(trimmed);
    if (CANVA_TO_LOCAL_MAP[hash]) {
      CANVA_TO_LOCAL_MAP[hash].forEach(addCandidate);
    }
    return candidates;
  }

  // Imgur URLs
  const imgurMatch = trimmed.match(/https?:\/\/(?:i\.)?imgur\.com\/([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?/);
  if (imgurMatch) {
    const hash = imgurMatch[1];
    addCandidate(`https://i.imgur.com/${hash}.jpg`);
    addCandidate(`https://i.imgur.com/${hash}.png`);
    addCandidate(`https://i.imgur.com/${hash}.jpeg`);
    addCandidate(trimmed);

    if (IMGUR_TO_LOCAL_MAP[hash]) {
      IMGUR_TO_LOCAL_MAP[hash].forEach(addCandidate);
    }
    return candidates;
  }

  // Archive.org URLs
  if (trimmed.includes('archive.org')) {
    const directUrl = trimmed.includes('/details/')
      ? trimmed.replace('/details/', '/download/')
      : trimmed;
    
    // If it points to an item without specific file extension
    const hasExtension = /\.(png|jpe?g|webp|gif|svg)$/i.test(directUrl);
    if (!hasExtension) {
      const parts = directUrl.split('/');
      const itemId = parts[parts.length - 1] || parts[parts.length - 2];
      if (itemId) {
        addCandidate(`${directUrl}/${itemId}.png`);
        addCandidate(`${directUrl}/${itemId}.jpg`);
        addCandidate(`${directUrl}/${itemId}.jpeg`);
        addCandidate(`${directUrl}/touch_logo_promo_banner.png`);
        addCandidate(`${directUrl}/touch_logo_promo_banner.jpg`);
      }
      addCandidate(`${directUrl}.png`);
      addCandidate(`${directUrl}.jpg`);
    }

    addCandidate(directUrl);
    addCandidate(trimmed);
    return candidates;
  }

  // Absolute or data/blob URIs
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    addCandidate(trimmed);
    return candidates;
  }

  // Base filename variations
  const filename = trimmed
    .replace(/^(\.\/|\/)?images\//, '')
    .replace(/^\/+/, '')
    .replace(/^\.\//, '');

  const extMatch = filename.match(/\.(png|jpg|jpeg|svg|webp)$/i);
  const baseNameWithoutExt = extMatch ? filename.slice(0, -extMatch[0].length) : filename;
  const originalExt = extMatch ? extMatch[1].toLowerCase() : 'jpg';

  const extPriority = originalExt === 'png' 
    ? ['png', 'jpg', 'jpeg'] 
    : originalExt === 'jpg' 
    ? ['jpg', 'png', 'jpeg'] 
    : ['jpeg', 'jpg', 'png'];

  addCandidate(trimmed);

  for (const ext of extPriority) {
    addCandidate(`/images/${baseNameWithoutExt}.${ext}`);
  }
  for (const ext of extPriority) {
    addCandidate(`/${baseNameWithoutExt}.${ext}`);
  }

  return candidates;
}

/**
 * LazyBlurredImage
 * 
 * Custom high-performance image wrapper that implements:
 * 1. Viewport-based lazy loading with IntersectionObserver (with early lookahead rootMargin)
 * 2. Elegant blurred placeholder effect with shimmering animation during loading
 * 3. Smooth progressive blur-to-sharp scaling transition upon successful load
 * 4. Resilient multi-candidate fallback network retry for external URLs (Canva, Imgur, CDN)
 * 5. Zero layout shift (CLS protection) with native aspect ratio preservation
 */
export const LazyBlurredImage: React.FC<LazyBlurredImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  fallbackIcon,
  className = 'w-full h-full object-cover',
  aspectRatioClass = '',
  containerClassName = '',
  placeholderClassName = '',
  blurIntensity = 'medium',
  priority = false,
  blurPlaceholderColor = '#0A1628',
  onLoad,
  onError,
  ...props
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [candidateList, setCandidateList] = useState<string[]>(() => getCandidateUrls(src));
  const [candidateIndex, setCandidateIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync candidate list whenever src changes
  useEffect(() => {
    const list = getCandidateUrls(src);
    setCandidateList(list);
    setCandidateIndex(0);
    setHasError(list.length === 0);
    setIsLoaded(false);
  }, [src]);

  // Viewport Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const currentEl = containerRef.current;
    if (!currentEl) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px', // Start loading 250px before entering viewport for instantaneous appearance
        threshold: 0.01,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView]);

  // Check if image is already cached in browser memory
  useEffect(() => {
    if (isInView && imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      setHasError(false);
    }
  }, [isInView, candidateIndex, candidateList]);

  const currentSrc = candidateList[candidateIndex] || '';

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(e);
  }, [onLoad]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (candidateIndex < candidateList.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
      setIsLoaded(false);
      onError?.(e);
    }
  }, [candidateIndex, candidateList.length, onError]);

  const blurStyles = {
    low: 'blur-sm scale-102',
    medium: 'blur-md scale-105',
    high: 'blur-lg scale-110',
  }[blurIntensity];

  const title = fallbackTitle || alt || 'B&H Assistant';

  // Error fallback card
  if (hasError || (!currentSrc && !isInView)) {
    if (hasError) {
      return (
        <div
          ref={containerRef}
          className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#1A3152] border border-[#1A3152] rounded-xl text-center select-none shadow-inner ${containerClassName} ${aspectRatioClass}`}
        >
          <div className="w-10 h-10 rounded-xl bg-[#00C9A7]/15 border border-[#00C9A7]/30 flex items-center justify-center mb-2 text-[#00C9A7] shadow-sm">
            {fallbackIcon || <ImageIcon className="w-5 h-5" />}
          </div>
          <span className="font-syne font-bold text-xs text-[#F5F0E8] line-clamp-1">
            {title}
          </span>
          {fallbackSubtitle && (
            <span className="text-[10px] text-[#C9A84C] font-mono mt-0.5 line-clamp-1">
              {fallbackSubtitle}
            </span>
          )}
          <span className="text-[9px] text-[#F5F0E8]/40 font-mono mt-1">
            B&H Assistant d.o.o. Zenica
          </span>
        </div>
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full bg-[#0A1628] ${containerClassName} ${aspectRatioClass}`}
      style={{ backgroundColor: blurPlaceholderColor }}
    >
      {/* Blurred Shimmering Placeholder (visible until image completes loading) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ease-out pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } ${placeholderClassName}`}
        aria-hidden="true"
      >
        {/* Deep mesh gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F2038] to-[#1A3152]" />

        {/* Subtle luminous accent glow */}
        <div className="absolute -inset-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,201,167,0.08),transparent_70%)] animate-pulse" />

        {/* Shimmer wave effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* Actual Image with progressive blur-to-sharp animation */}
      {isInView && (
        <img
          ref={imgRef}
          {...props}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`relative z-10 w-full h-full transition-all duration-700 ease-out transform-gpu ${
            isLoaded
              ? 'opacity-100 filter-none scale-100'
              : `opacity-0 ${blurStyles}`
          } ${className}`}
        />
      )}
    </div>
  );
};

export default LazyBlurredImage;
