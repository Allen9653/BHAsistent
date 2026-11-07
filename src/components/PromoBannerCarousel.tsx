import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BannerSlide {
  id: string;
  badgeKey: string;
  badgeDefault: string;
  titleKey: string;
  titleDefault: string;
  descKey: string;
  descDefault: string;
  btnKey: string;
  btnDefault: string;
  btnUrl: string;
  isExternal?: boolean;
  onClickAction?: () => void;
  tagColor: string;
  accentBg: string;
  icon: React.ElementType;
  bgPattern?: string;
  bannerImage?: string;
  videoUrl?: string;
  videoTitle?: string;
}

interface PromoBannerCarouselProps {
  onOpenContact?: () => void;
  onOpenBojanka?: () => void;
  slides?: BannerSlide[];
}

export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  onOpenContact,
  onOpenBojanka,
  slides = [],
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const bannerSlides = slides;

  useEffect(() => {
    if (isPaused || selectedVideo || bannerSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, selectedVideo, bannerSlides.length]);

  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) setSelectedVideo(null);
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [selectedVideo]);

  const handleNext = () => bannerSlides.length && setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const handlePrev = () => bannerSlides.length && setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'ArrowLeft') handlePrev();
    else if (e.key === ' ') setIsPaused((v) => !v);
  };

  if (bannerSlides.length === 0) {
    return (
      <div
        className="w-full my-8"
        role="region"
        aria-roledescription="carousel"
        aria-label={t('carousel.title', 'Promotivni Karusel')}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Prazan strukturalni wrapper — spreman za ubacivanje novog materijala */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#1A3152] to-[#0A1628] border-2 border-dashed border-[#1A3152] p-10 sm:p-14 shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center space-y-3">
          <Sparkles className="w-8 h-8 text-[#00C9A7]/40" />
          <p className="text-xs font-mono text-[#F5F0E8]/50">
            {t('carousel.empty', 'Carousel je prazan — spreman za novi materijal')}
          </p>
        </div>
      </div>
    );
  }

  const slide = bannerSlides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div
      className="w-full my-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('carousel.title', 'Promotivni Karusel')}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#1A3152] to-[#0A1628] border-2 border-[#00C9A7]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152]/80 z-20">
          <div key={currentSlide} className="h-full bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] animate-[progress_6s_linear]" style={{ animationPlayState: isPaused ? 'paused' : 'running' }} />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 min-h-[220px]">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full font-syne font-black text-xs uppercase tracking-wider shadow-md ${slide.tagColor}`}>{t(slide.badgeKey, slide.badgeDefault)}</span>
              <span className="px-3 py-1 rounded-full bg-[#0A1628]/80 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C9A84C]" /><span>B&H ASSISTANT PROMOTIVNI BANER</span>
              </span>
            </div>
            <div><h3 className="font-syne font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#F5F0E8] leading-tight">{t(slide.titleKey, slide.titleDefault)}</h3></div>
            <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-sans leading-relaxed bg-[#0A1628]/70 p-4 rounded-2xl border border-[#1A3152]/80">{t(slide.descKey, slide.descDefault)}</p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {slide.onClickAction ? (
                <button onClick={slide.onClickAction} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"><span>{t(slide.btnKey, slide.btnDefault)}</span><ExternalLink className="w-4 h-4" /></button>
              ) : slide.isExternal ? (
                <a href={slide.btnUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"><span>{t(slide.btnKey, slide.btnDefault)}</span><ExternalLink className="w-4 h-4" /></a>
              ) : (
                <a href={slide.btnUrl} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"><span>{t(slide.btnKey, slide.btnDefault)}</span><ChevronRight className="w-4 h-4" /></a>
              )}
              {slide.videoUrl && (
                <button type="button" onClick={() => { setSelectedVideo({ url: slide.videoUrl!, title: slide.videoTitle || t(slide.titleKey, slide.titleDefault) }); setIsPaused(true); }} className="px-5 py-3 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#00E5BE] hover:text-[#C9A84C] border-2 border-[#00C9A7]/60 font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"><Play className="w-4 h-4 fill-current text-[#00E5BE]" /><span>{t('banner.tool.video', 'Video Prezentacija')}</span></button>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center items-center text-center">
            <div className="w-full py-10 px-6 rounded-2xl bg-[#0A1628]/90 border-2 border-[#00C9A7]/30 shadow-xl flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7]"><IconComponent className="w-8 h-8 animate-bounce" /></div>
              <span className="text-xs font-syne font-bold text-[#F5F0E8]">Oglasni Prostor Otvoren</span>
              <span className="text-[10px] font-mono text-[#C9A84C]">Kontaktirajte B&H Assistant</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#1A3152] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3 text-xs font-mono text-[#F5F0E8]/70">
            <span className="text-[#00C9A7] font-bold">{t('carousel.slideNum', 'Baner')} {currentSlide + 1} {t('carousel.of', 'od')} {bannerSlides.length}</span>
            <span>•</span>
            <button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs transition-colors">{isPaused ? <Play className="w-3.5 h-3.5 text-[#00C9A7]" /> : <Pause className="w-3.5 h-3.5 text-[#C9A84C]" />}<span>{isPaused ? 'Nastavi' : 'Pauza'}</span></button>
          </div>
          <div className="flex items-center gap-2">
            {bannerSlides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-[#00C9A7] shadow-lg shadow-[#00C9A7]/40' : 'w-2.5 bg-[#1A3152] hover:bg-[#00C9A7]/40'}`} aria-label={`Prikaži baner ${idx + 1}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] transition-all shadow-md min-h-[40px] min-w-[40px] flex items-center justify-center" aria-label="Prethodni baner"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={handleNext} className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] transition-all shadow-md min-h-[40px] min-w-[40px] flex items-center justify-center" aria-label="Sjedeći baner"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedVideo(null)} role="dialog" aria-modal="true" aria-label={selectedVideo.title}>
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1A3152] bg-[#0A1628]">
              <div className="flex items-center gap-3"><div className="p-2 rounded-xl bg-[#00C9A7]/20 text-[#00C9A7]"><Play className="w-5 h-5 fill-current" /></div><div><h3 className="font-syne font-extrabold text-base sm:text-lg text-[#F5F0E8]">{selectedVideo.title}</h3><p className="text-[11px] font-mono text-[#00C9A7]">B&H Assistant • Službena video prezentacija ponude</p></div></div>
              <button onClick={() => setSelectedVideo(null)} className="p-2 rounded-xl bg-[#1A3152]/80 hover:bg-rose-500/20 text-[#F5F0E8]/70 hover:text-rose-400 border border-[#1A3152] transition-colors" aria-label="Zatvori video prezentaciju"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-3 sm:p-5 bg-black flex items-center justify-center"><video src={selectedVideo.url} controls autoPlay playsInline className="w-full max-h-[60vh] rounded-xl object-contain shadow-2xl">Vaš preglednik ne podržava HTML5 video.</video></div>
            <div className="p-4 bg-[#0A1628] border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3">
              <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00C9A7] hover:text-[#00E5BE] flex items-center gap-1.5 font-mono underline underline-offset-4"><ExternalLink className="w-3.5 h-3.5" /><span>Otvori direktan link videa (.mp4)</span></a>
              <button onClick={() => setSelectedVideo(null)} className="px-5 py-2 rounded-xl bg-[#1A3152] hover:bg-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors ml-auto">Zatvori</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoBannerCarousel;
