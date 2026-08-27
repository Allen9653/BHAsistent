import React from 'react';
import { Smartphone, Zap, ShieldCheck, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface NativeCommercialBannerProps {
  partnerId?: string;
  title?: string;
  tagline?: string;
  badge?: string;
  trackingUrl?: string;
  highlights?: string[];
  ctaText?: string;
  className?: string;
}

export const NativeCommercialBanner: React.FC<NativeCommercialBannerProps> = ({
  partnerId = 'touch-ecommerce-cpc',
  title = 'TOUCH E-Commerce (touch.com.ua)',
  tagline = 'Smartfoni (Apple iPhone, Xiaomi, Samsung), EcoFlow & Bluetti prijenosno napajanje i originalna audio-tehnika.',
  badge = 'VERIFIKOVANI E-COMMERCE PARTNER 📱',
  trackingUrl = 'https://wbbsv.com/c/ynys1f2mjpfe02eff2310e81904d8b/',
  highlights = ['Apple & Android uređaji', 'EcoFlow generatori', 'Provjerena outlet ponuda'],
  ctaText = 'Istraži Ponudu i Pogodnosti',
  className = '',
}) => {
  const handleBannerClick = () => {
    // Non-blocking telemetry tracking using sendBeacon or asynchronous fetch
    try {
      const payload = JSON.stringify({
        partner: partnerId,
        timestamp: new Date().toISOString(),
        referrer: window.location.pathname,
        placement: 'native_commercial_banner',
      });
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track-partner-click', blob);
      }
    } catch {
      // Never block the user navigation even if tracking endpoint is unreachable
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F2038] via-[#16273E] to-[#0F2038] border border-[#FF7A00]/40 p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#FF7A00]/70 group">
        {/* Subtle Ambient Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#FF7A00]/10 via-[#FF7A00]/5 to-transparent pointer-events-none rounded-r-3xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#00C9A7]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Shimmer Ambient Border Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          {/* Partner Presentation Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full lg:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center shrink-0 text-[#FF7A00] shadow-lg shadow-[#FF7A00]/10 group-hover:scale-105 transition-transform">
              <Smartphone className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9433] text-[#0A1628] text-[10px] font-extrabold font-mono tracking-wider shadow-sm">
                  {badge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-[#00C9A7]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verifikovano
                </span>
                <span className="text-[11px] font-mono text-[#C9A84C]">
                  Direktan Pristup
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-syne font-bold text-[#F5F0E8] group-hover:text-[#FF9433] transition-colors">
                {title}
              </h3>

              <p className="text-xs sm:text-sm text-[#F5F0E8]/75 max-w-2xl leading-relaxed font-sans">
                {tagline}
              </p>

              {/* Bullet highlights */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap text-xs text-[#F5F0E8]/80 font-mono">
                {highlights.map((hl, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00C9A7]" />
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* High-Converting CTA Button */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBannerClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFA14A] text-[#0A1628] font-syne font-extrabold text-xs tracking-wide shadow-xl shadow-[#FF7A00]/20 hover:shadow-[#FF7A00]/40 hover:scale-[1.02] transition-all min-h-[46px]"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-[10px] font-mono text-[#F5F0E8]/40">
              Službena partnerska kampanja B&H Assistant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NativeCommercialBanner;
