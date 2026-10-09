import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ArrowUpRight,
  Download,
  Flame,
  CheckCircle2,
  Sparkles,
  Compass,
} from 'lucide-react';
import { IMAGES } from '../utils/images';

interface NativeCommercialBannerProps {
  className?: string;
}

const SLIDE_DURATION_MS = 8000; // 8 seconds auto-rotation as requested

export const NativeCommercialBanner: React.FC<NativeCommercialBannerProps> = ({
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const totalSlides = 2;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // 8-second auto-rotation timer with smooth progress indicator
  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION_MS) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= SLIDE_DURATION_MS) {
        goToNext();
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused, currentSlide, goToNext]);

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      goToNext(); // Swipe Left -> Next
    } else if (distance < -50) {
      goToPrev(); // Swipe Right -> Prev
    }
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      aria-label="Promotivni i zvanični carousel"
      className={`w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#081220] border border-[#1A3152] shadow-2xl transition-all duration-300">
        
        {/* Subtle 8-Second Auto-Rotation Progress Bar at Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A1628] z-30 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ease-linear ${
              currentSlide === 0
                ? 'bg-gradient-to-r from-[#0088FF] via-[#C9A84C] to-[#00C9A7]'
                : 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Floating Slide Navigation Controls (Left & Right Arrows) */}
        <div className="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center pointer-events-none">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Prethodni baner"
            className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A1628]/85 hover:bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/60 text-[#F5F0E8] hover:text-[#00C9A7] flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9A7]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center pointer-events-none">
          <button
            type="button"
            onClick={goToNext}
            aria-label="Sljedeći baner"
            className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A1628]/85 hover:bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/60 text-[#F5F0E8] hover:text-[#00C9A7] flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9A7]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Slide Track with AnimatePresence */}
        <div className="relative min-h-[380px] sm:min-h-[290px] lg:min-h-[260px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* ========================================================= */}
            {/* SLIDE 0: Zvanična Čestitka Reprezentaciji BiH (Zmajevi)   */}
            {/* ========================================================= */}
            {currentSlide === 0 && (
              <motion.div
                key="slide-bih-pobjeda"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#071328] via-[#0D2248] to-[#08152D] border-y border-[#0088FF]/50 p-5 sm:p-7 group"
              >
                {/* Ambient Blue & Gold Flag Glows */}
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#C9A84C]/15 via-[#0088FF]/10 to-transparent pointer-events-none rounded-r-3xl" />
                <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-[#0088FF]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute right-20 top-0 w-48 h-48 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Shimmer Border Line with BiH Colors */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0088FF] via-[#C9A84C] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 px-6 sm:px-10 lg:px-12">
                  
                  {/* Left Column: Icon + Presentation Text */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full lg:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0055FF]/25 to-[#C9A84C]/25 border border-[#C9A84C]/60 flex items-center justify-center shrink-0 text-[#C9A84C] shadow-lg shadow-[#0088FF]/20 group-hover:scale-105 transition-transform">
                      <Trophy className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#0088FF] to-[#0055CC] text-[#FFFFFF] text-[10px] font-extrabold font-mono tracking-wider shadow-sm flex items-center gap-1.5">
                          <span>⚽ PONOS BIH • LIGA NACIJA</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C9A84C] font-semibold">
                          <Flame className="w-3.5 h-3.5 text-[#C9A84C]" /> Pobjeda nad Poljskom!
                        </span>
                        <span className="text-[11px] font-mono text-[#00C9A7]">
                          Zvanična Čestitka
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-syne font-bold text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                        Bravo Zmajevi! Čestitka Reprezentaciji BiH na Pobjedi nad Poljskom!
                      </h3>

                      <p className="text-xs sm:text-sm text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-sans">
                        B&amp;H Assistant d.o.o. Zenica od srca čestita našim momcima i stručnom štabu fudbalske reprezentacije Bosne i Hercegovine na borbenosti, vrhunskoj igri i večerašnjoj velikoj pobjedi protiv Poljske!
                      </p>

                      {/* Bullet highlights */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap text-xs text-[#F5F0E8]/85 font-mono">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" />
                          Borbenost za grb BiH
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#0088FF]" />
                          Trijumf u Ligi Nacija
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00C9A7]" />
                          Zenica i BiH slave
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview Card + CTA Actions */}
                  <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-center sm:items-end gap-3.5">
                    
                    {/* Visual Card with link to Archive.org Release */}
                    <a
                      href={IMAGES.bihPobjedaArchiveDetails}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Otvori zvaničnu čestitku na Archive.org"
                      className="group/img relative rounded-xl overflow-hidden border border-[#C9A84C]/50 shadow-md shadow-[#0088FF]/20 hover:border-[#C9A84C] transition-all max-w-[200px] sm:max-w-[220px] aspect-[16/9] hidden sm:block shrink-0"
                    >
                      <img
                        src={IMAGES.bihPobjedaBanner}
                        alt="Čestitka za naše momke 2026 - Pobjeda BiH nad Poljskom"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center p-1.5">
                        <span className="text-[10px] font-mono text-[#C9A84C] font-semibold flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> Povećaj (Archive.org)
                        </span>
                      </div>
                    </a>

                    {/* Action Buttons */}
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-2">
                      <a
                        href={IMAGES.bihPobjedaArchiveDetails}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#0088FF] via-[#0066EE] to-[#C9A84C] text-[#FFFFFF] font-syne font-extrabold text-xs tracking-wide shadow-xl shadow-[#0088FF]/25 hover:shadow-[#C9A84C]/30 hover:scale-[1.02] transition-all min-h-[44px]"
                      >
                        <Trophy className="w-4 h-4 text-[#FFD700]" />
                        <span>Pogledaj Čestitku i Detalje</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={IMAGES.bihPobjedaArchiveDirect}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1628]/80 hover:bg-[#0F2038] border border-[#1A3152] hover:border-[#C9A84C]/50 text-[#F5F0E8]/80 hover:text-[#C9A84C] font-mono text-[11px] transition-colors min-h-[36px]"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C9A84C]" />
                        <span>Preuzmi HD Grafiku (Archive.org)</span>
                      </a>
                    </div>

                    <span className="text-[10px] font-mono text-[#F5F0E8]/40">
                      Službena objava B&amp;H Assistant d.o.o. Zenica
                    </span>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* SLIDE 1: Autorski Softverski Ekosistem (BH Konver & Alati) */}
            {/* ========================================================= */}
            {currentSlide === 1 && (
              <motion.div
                key="slide-bh-digitalni-alati"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#0F2038] via-[#132A4A] to-[#0A1628] border-y border-[#00C9A7]/40 p-5 sm:p-7 group"
              >
                {/* Subtle Ambient Teal Accent Glows */}
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#00C9A7]/10 via-[#00C9A7]/5 to-transparent pointer-events-none rounded-r-3xl" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Shimmer Ambient Border Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C9A7] via-[#C9A84C] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 px-6 sm:px-10 lg:px-12">
                  {/* Presentation Info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full lg:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-[#00C9A7]/15 border border-[#00C9A7]/40 flex items-center justify-center shrink-0 text-[#00C9A7] shadow-lg shadow-[#00C9A7]/10 group-hover:scale-105 transition-transform">
                      <Compass className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] text-[10px] font-extrabold font-mono tracking-wider shadow-sm">
                          AUTORSKI SOFTVER • B&amp;H ASSISTANT
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[#00C9A7]">
                          <Sparkles className="w-3.5 h-3.5" /> Lovable Pobjednik
                        </span>
                        <span className="text-[11px] font-mono text-[#C9A84C]">
                          100% Besplatno za Građane
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-syne font-bold text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                        BH Digitalni Alati – BH Konver &amp; BH PapirFinder
                      </h3>

                      <p className="text-xs sm:text-sm text-[#F5F0E8]/75 max-w-2xl leading-relaxed font-sans">
                        Pobjednički bh. kalkulator i automatizovani sistem za pravne izjave pod materijalnom odgovornošću, uz pametni registar obrazaca i taksi lokalne samouprave u BiH.
                      </p>

                      {/* Bullet highlights */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap text-xs text-[#F5F0E8]/80 font-mono">
                        {['Pravne izjave i konverzije', 'Centralni registar obrazaca', 'Ornamenti Bosne na USB sticku'].map((hl, i) => (
                          <span key={i} className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#00C9A7]" />
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="w-full lg:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
                    <Link
                      to="/alati"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-extrabold text-xs tracking-wide shadow-xl shadow-[#00C9A7]/20 hover:shadow-[#00C9A7]/40 hover:scale-[1.02] transition-all min-h-[46px]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Istraži Sve Naše Alate</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-[10px] font-mono text-[#F5F0E8]/40">
                      Zvanični proizvodi B&amp;H Assistant d.o.o. Zenica
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Carousel Bottom Control Bar: Slide Indicators + Counter + Play/Pause Toggle */}
        <div className="bg-[#050D18] border-t border-[#1A3152]/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          
          {/* Left: Interactive Navigation Dots / Tabs */}
          <div className="flex items-center gap-2">
            {/* Slide 0 Pill */}
            <button
              type="button"
              onClick={() => goToSlide(0)}
              aria-label="Prikaži Čestitku Zmajevima baner"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                currentSlide === 0
                  ? 'bg-[#0088FF]/20 text-[#00C9A7] border border-[#0088FF]/50 font-bold'
                  : 'bg-[#0A1628] text-[#F5F0E8]/60 hover:text-[#F5F0E8] border border-[#1A3152]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  currentSlide === 0 ? 'bg-[#00C9A7] animate-pulse' : 'bg-[#1A3152]'
                }`}
              />
              <span className="hidden sm:inline">1. Čestitka Zmajevima (BiH)</span>
              <span className="sm:hidden">1. BiH Čestitka</span>
            </button>

            {/* Slide 1 Pill */}
            <button
              type="button"
              onClick={() => goToSlide(1)}
              aria-label="Prikaži BH Digitalne Alate"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                currentSlide === 1
                  ? 'bg-[#00C9A7]/20 text-[#00C9A7] border border-[#00C9A7]/50 font-bold'
                  : 'bg-[#0A1628] text-[#F5F0E8]/60 hover:text-[#F5F0E8] border border-[#1A3152]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  currentSlide === 1 ? 'bg-[#00C9A7] animate-pulse' : 'bg-[#1A3152]'
                }`}
              />
              <span className="hidden sm:inline">2. BH Digitalni Alati</span>
              <span className="sm:hidden">2. BH Alati</span>
            </button>
          </div>

          {/* Right: Slide Counter + Timer Indicator + Pause/Play toggle */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#F5F0E8]/60">
            <span className="text-[11px] text-[#C9A84C]">
              Rotacija svakih 8s
            </span>
            <span className="text-[#1A3152]">|</span>
            <span className="text-xs">
              <strong className="text-[#F5F0E8]">{currentSlide + 1}</strong> / {totalSlides}
            </span>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Pokreni rotaciju' : 'Pauziraj rotaciju'}
              aria-label={isPaused ? 'Pokreni rotaciju karusela' : 'Pauziraj rotaciju karusela'}
              className="p-1 rounded-md bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/70 hover:text-[#00C9A7] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9A7]"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#00C9A7]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default NativeCommercialBanner;
