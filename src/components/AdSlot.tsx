import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

export interface AdSlotProps {
  /**
   * Google AdSense Ad Unit ID (from AdSense dashboard, e.g., "1234567890")
   * If omitted, a layout-safe placeholder is rendered (useful before ad unit creation).
   */
  slotId?: string;

  /**
   * AdSense Publisher ID (defaults to official account ca-pub-4192839247871586)
   */
  adClient?: string;

  /**
   * Ad unit layout format:
   * - 'auto': Responsive unit (default)
   * - 'horizontal': Leaderboard / Banner (728x90, 970x90, 320x50, 320x100)
   * - 'rectangle': Medium/Large Rectangle (300x250, 336x280)
   * - 'vertical': Skyscraper / Half-page (300x600, 160x600)
   * - 'fluid': Native In-Article unit
   */
  adFormat?: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'fluid';

  /**
   * Layout key for in-article / in-feed native AdSense units (e.g. "-gw-3+1f-3d+2z")
   */
  layoutKey?: string;

  /**
   * Enables responsive full-width behavior on mobile devices (data-full-width-responsive)
   */
  fullWidthResponsive?: boolean;

  /**
   * Mandatory AdSense label above the unit.
   * Google policy strictly requires distinguishing advertisements from editorial content.
   */
  label?: string;

  /**
   * Custom outer container className
   */
  className?: string;

  /**
   * Explicit minimum height in pixels or CSS string to lock layout and prevent Cumulative Layout Shift (CLS)
   */
  minHeight?: number | string;

  /**
   * Optional custom maximum width (e.g., '728px', '970px', '300px')
   */
  maxWidth?: string;

  /**
   * When true, displays an informative placeholder in development / staging environments
   */
  showDevPlaceholder?: boolean;
}

/**
 * AdSlot - Production-grade, zero-CLS Google AdSense wrapper component.
 * 
 * Features:
 * 1. Strict Cumulative Layout Shift (CLS) protection via pre-allocated container heights.
 * 2. React 19 / SPA duplicate-push protection (prevents "All 'ins' elements already have ads" warning).
 * 3. Google Publisher Policy compliance (prominent "Oglas / Reklama" disclaimers).
 * 4. Fallback placeholder that seamlessly blends with B&H Assistant corporate theme.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  adClient = 'ca-pub-4192839247871586',
  adFormat = 'auto',
  layoutKey,
  fullWidthResponsive = true,
  label = 'Oglas / Reklama',
  className = '',
  minHeight,
  maxWidth,
  showDevPlaceholder = false,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [adStatus, setAdStatus] = useState<'idle' | 'loading' | 'filled' | 'unfilled'>('idle');

  // Compute default safe minimum heights based on ad format to lock aspect ratio (Zero-CLS)
  const defaultMinHeight = (() => {
    if (minHeight) return typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
    switch (adFormat) {
      case 'horizontal':
        return '100px'; // 320x50/320x100 on mobile, 728x90 on desktop
      case 'rectangle':
        return '280px'; // 300x250 or 336x280
      case 'vertical':
        return '600px'; // 300x600 half-page
      case 'fluid':
        return '120px'; // Fluid in-article
      case 'auto':
      default:
        return '120px'; // Safe fallback reservation
    }
  })();

  const defaultMaxWidth = (() => {
    if (maxWidth) return maxWidth;
    switch (adFormat) {
      case 'horizontal':
        return '970px';
      case 'rectangle':
        return '360px';
      case 'vertical':
        return '320px';
      case 'fluid':
        return '100%';
      case 'auto':
      default:
        return '728px';
    }
  })();

  useEffect(() => {
    // Only attempt to load if slotId is provided and we are in the browser
    if (!slotId || typeof window === 'undefined') {
      return;
    }

    const ins = adRef.current;
    if (!ins) return;

    // Check if AdSense already processed this ins element to prevent duplicate push errors in SPA
    const alreadyProcessed =
      ins.getAttribute('data-adsbygoogle-status') ||
      ins.innerHTML.trim().length > 0;

    if (alreadyProcessed) {
      return;
    }

    try {
      setAdStatus('loading');
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      (window as any).adsbygoogle = adsbygoogle;
      setAdLoaded(true);

      // Observe if the ad is filled or unfilled via mutation observer
      const observer = new MutationObserver(() => {
        const status = ins.getAttribute('data-ad-status');
        if (status === 'filled') {
          setAdStatus('filled');
        } else if (status === 'unfilled') {
          setAdStatus('unfilled');
        }
      });

      observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status', 'data-adsbygoogle-status'] });

      return () => {
        observer.disconnect();
      };
    } catch (err) {
      console.warn('[AdSense AdSlot Warning]: Failed to push ad unit', err);
      setAdStatus('unfilled');
    }
  }, [slotId, adClient]);

  const isDevelopment =
    typeof process !== 'undefined' &&
    process.env &&
    process.env.NODE_ENV === 'development';

  const shouldDisplayPlaceholderNotice =
    (!slotId && (showDevPlaceholder || isDevelopment)) || adStatus === 'unfilled';

  return (
    <div
      ref={containerRef}
      className={`ad-slot-wrapper w-full my-6 flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Policy Compliance Micro-Label (Google requires clear ad differentiation) */}
      <div className="w-full max-w-[728px] flex items-center justify-between px-2 mb-1 text-[10px] font-mono tracking-widest text-[#F5F0E8]/40 uppercase">
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#C9A84C]" />
          <span>{label}</span>
        </span>
        <span className="text-[9px] text-[#00C9A7]/60 font-mono">
          B&H Assistant Media
        </span>
      </div>

      {/* CLS-Locked Outer Ad Container */}
      <div
        style={{
          minHeight: defaultMinHeight,
          maxWidth: defaultMaxWidth,
        }}
        className="w-full relative rounded-2xl bg-[#0F2038]/60 border border-[#1A3152]/70 overflow-hidden flex items-center justify-center transition-all duration-300 shadow-inner"
      >
        {/* Subtle Shimmer Background Placeholder during ad fetch */}
        {!adLoaded && (
          <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#0F2038]/40 via-white/[0.03] to-[#0F2038]/40 animate-pulse" />
        )}

        {/* Real Google AdSense Unit */}
        {slotId ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{
              display: 'block',
              width: '100%',
              minHeight: defaultMinHeight,
              textAlign: 'center',
            }}
            data-ad-client={adClient}
            data-ad-slot={slotId}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />
        ) : null}

        {/* Informative Staging / Development / Unfilled Placeholder */}
        {shouldDisplayPlaceholderNotice && (
          <div className="p-4 text-center z-10 flex flex-col items-center justify-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A1628] border border-[#00C9A7]/30 text-[#00C9A7] text-[10px] font-mono">
              <Info className="w-3 h-3 text-[#C9A84C]" />
              <span>AdSense Oglasna Pozicija (Zero-CLS Slot)</span>
            </div>
            <p className="text-[11px] font-mono text-[#F5F0E8]/70 max-w-md">
              Klijent: <span className="text-[#00C9A7]">{adClient}</span> • Format: <span className="text-[#C9A84C]">{adFormat}</span>
            </p>
            <p className="text-[10px] text-[#F5F0E8]/40 font-mono">
              {slotId
                ? 'Oglasna jedinica je povezana i čeka verifikaciju AdSense mreže.'
                : 'Rezervisan prostor sa nultim pomakom rasporeda (CLS = 0.00). Unesite slotId iz AdSense konzole.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSlot;
