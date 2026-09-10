import React, { useState, useEffect } from 'react';
import { Play, MessageSquare, Sparkles, ExternalLink, X, CheckCircle, ArrowRight, Video } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/images';

interface SpecialOfferSectionProps {
  className?: string;
  onOpenContact?: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  className = '',
  onOpenContact,
}) => {
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (onOpenContact) {
      e.preventDefault();
      onOpenContact();
    } else {
      const contactEl = document.getElementById('kontakt') || document.querySelector('footer');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="usluga-po-mjeri"
      aria-label="Usluga po mjeri - Specijalna ponuda"
      className={`w-full max-w-7xl mx-auto my-8 sm:my-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E2E] via-[#0F2438] to-[#0A1628] border-2 border-[#00C9A7]/50 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 hover:border-[#00C9A7] group">
        
        {/* Glow lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00C9A7]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00C9A7] to-transparent opacity-80" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image with Play Video Overlay (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="relative w-full max-w-[480px] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-[#00C9A7]/60 hover:border-[#C9A84C] bg-[#04131A] shadow-2xl shadow-[#00C9A7]/20 transition-all duration-300 hover:scale-[1.02] group/img cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              title="Kliknite za pokretanje video prezentacije specijalne ponude"
            >
              <SafeImage
                src={IMAGES.specijalnaPonudaBanner}
                alt="Specijalna ponuda za sve - B&H Assistant"
                fallbackTitle="Specijalna Ponuda"
                fallbackSubtitle="Usluga Po Mjeri"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent" />

              {/* Play button overlay in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] flex items-center justify-center shadow-2xl group-hover/img:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current translate-x-0.5 text-[#0A1628]" />
                </div>
              </div>

              {/* Bottom tag bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                <span className="px-3 py-1 rounded-lg bg-[#0A1628]/95 border border-[#00C9A7]/40 text-[#00E5BE] font-bold flex items-center gap-1.5 shadow-md">
                  <Video className="w-3.5 h-3.5 text-[#00C9A7]" />
                  <span>Video Prezentacija</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#C9A84C] text-[#0A1628] font-extrabold shadow-md">
                  Pogledaj Video ▶
                </span>
              </div>
            </button>
            
            <p className="mt-2.5 text-[11px] font-mono text-[#F5F0E8]/60 text-center">
              💡 Kliknite na sliku ili dugme ispod za pokretanje video prezentacije
            </p>
          </div>

          {/* Right Column: Information & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-md uppercase">
                {t('banner.tool.badge', 'USLUGA PO MJERI')}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0F2038] border border-[#00C9A7]/40 text-[#00E5BE] font-mono text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>B&H Assistant d.o.o. Zenica</span>
              </span>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight leading-tight">
                {t('banner.tool.title', 'SPECIJALNA PONUDA!')}
              </h2>
              <p className="text-sm sm:text-base font-mono text-[#00C9A7] mt-1 font-semibold">
                Prilagođeni digitalni alati, e-uprava i softverska rješenja po Vašoj mjeri
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#F5F0E8]/85 leading-relaxed">
              {t(
                'banner.tool.desc',
                'Tim B&H Assistant d.o.o. Zenica nudi izradu specifičnih kalkulatora, baze obrazaca, API integracija i web platformi po Vašim zahtjevima.'
              )}
            </p>

            {/* Bullet points of service capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-[#F5F0E8]/90 font-medium">
                <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                <span>Specifični kalkulatori i digitalni pretvarači</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5F0E8]/90 font-medium">
                <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                <span>Baza obrazaca i općinska e-uprava</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5F0E8]/90 font-medium">
                <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                <span>Povezivanje eksternih API servisa i baza</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5F0E8]/90 font-medium">
                <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                <span>Brza isporuka, podrška i održavanje</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {/* Primary Video Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs sm:text-sm tracking-wider shadow-lg shadow-[#00C9A7]/30 transition-all hover:scale-105 flex items-center gap-2.5 min-h-[46px]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t('banner.tool.video', 'Video Prezentacija')}</span>
              </button>

              {/* Contact Button */}
              <a
                href="#kontakt"
                onClick={handleContactClick}
                className="px-6 py-3.5 rounded-2xl bg-[#0F2038] hover:bg-[#1A3152] text-[#F5F0E8] border border-[#00C9A7]/40 hover:border-[#00C9A7] font-syne font-bold text-xs sm:text-sm tracking-wider transition-all hover:scale-105 flex items-center gap-2 min-h-[46px]"
              >
                <MessageSquare className="w-4 h-4 text-[#00C9A7]" />
                <span>{t('banner.tool.btn', 'Kontaktirajte Nas Odmah')}</span>
                <ArrowRight className="w-4 h-4 text-[#00C9A7]" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Video Presentation Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video Prezentacija - Specijalna Ponuda"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1A3152] bg-[#0A1628]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00C9A7]/20 text-[#00C9A7]">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-base sm:text-lg text-[#F5F0E8] flex items-center gap-2">
                    <span>SPECIJALNA PONUDA — Video Prezentacija</span>
                  </h3>
                  <p className="text-[11px] font-mono text-[#00C9A7]">
                    B&H Assistant d.o.o. Zenica • Službena video prezentacija ponude
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-xl bg-[#1A3152]/80 hover:bg-rose-500/20 text-[#F5F0E8]/70 hover:text-rose-400 border border-[#1A3152] transition-colors"
                aria-label="Zatvori video prezentaciju"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-3 sm:p-5 bg-black flex items-center justify-center">
              <video
                src={IMAGES.specijalnaPonudaVideo}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[60vh] rounded-xl object-contain shadow-2xl"
              >
                Vaš internet preglednik ne podržava direktnu reprodukciju HTML5 videa.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0A1628] border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3">
              <a
                href={IMAGES.specijalnaPonudaVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00C9A7] hover:text-[#00E5BE] flex items-center gap-1.5 font-mono underline underline-offset-4"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Otvori direktan link videa (.mp4)</span>
              </a>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1A3152] hover:bg-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors ml-auto"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
