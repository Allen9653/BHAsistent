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
  Briefcase,
  Users,
  FileText,
} from 'lucide-react';
import { IMAGES } from '../utils/images';
import { SafeImage } from './SafeImage';

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
            {/* SLIDE 0: SkilledBridge d.o.o. – Rješenje za Radnu Snagu   */}
            {/* ========================================================= */}
            {currentSlide === 0 && (
              <motion.div
                key="slide-skilledbridge-b2b"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#071328] via-[#0E2445] to-[#0A1A33] border-y border-[#00C9A7]/50 p-5 sm:p-7 group"
              >
                {/* Ambient Teal & Emerald Glows */}
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#00C9A7]/15 via-[#C9A84C]/10 to-transparent pointer-events-none rounded-r-3xl" />
                <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-[#00C9A7]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute right-20 top-0 w-48 h-48 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Shimmer Border Line with Teal & Gold */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C9A7] via-[#C9A84C] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 px-6 sm:px-10 lg:px-12">
                  
                  {/* Left Column: Icon + Presentation Text */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 w-full lg:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C9A7]/25 to-[#C9A84C]/25 border border-[#00C9A7]/60 flex items-center justify-center shrink-0 text-[#00C9A7] shadow-lg shadow-[#00C9A7]/20 group-hover:scale-105 transition-transform">
                      <Briefcase className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00C9A7] to-[#00A887] text-[#0A1628] text-[10px] font-extrabold font-mono tracking-wider shadow-sm flex items-center gap-1.5">
                          <span>💼 B2B RJEŠENJE • SKILLEDBRIDGE</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C9A84C] font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Uvoz Radne Snage iz Azije
                        </span>
                        <span className="text-[11px] font-mono text-[#00E5BE]">
                          100% Pravna Sigurnost
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-syne font-bold text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                        Rješenje za nedostatak radne snage u Vašoj firmi!
                      </h3>

                      <p className="text-xs sm:text-sm text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-sans">
                        Nedostaju Vam radnici u građevinarstvu, proizvodnji, ugostiteljstvu ili uslugama? <strong className="text-[#00C9A7]">SkilledBridge d.o.o.</strong> pruža kompletne usluge regrutacije, uvoza i cjelokupne pravne dokumentacije za edukovanu radnu snagu iz Azije po modelu &quot;ključ u ruke&quot;.
                      </p>

                      {/* Bullet highlights */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap text-xs text-[#F5F0E8]/85 font-mono">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00C9A7]" />
                          Brza realizacija i uvoz
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" />
                          Radne dozvole i vize
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00E5BE]" />
                          Pažljiva selekcija kadra
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview Card + CTA Actions */}
                  <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-center sm:items-end gap-3.5">
                    
                    {/* Visual Card with link to SkilledBridge Article */}
                    <Link
                      to="/novosti?clanak=rjesenje-za-nedostatak-radne-snage-skilledbridge"
                      title="Pročitajte detaljan članak o uslugama SkilledBridge d.o.o."
                      className="group/img relative rounded-xl overflow-hidden border border-[#00C9A7]/50 shadow-md shadow-[#00C9A7]/20 hover:border-[#00C9A7] transition-all max-w-[200px] sm:max-w-[230px] aspect-[16/9] hidden sm:block shrink-0 bg-[#0A1628]"
                    >
                      <SafeImage
                        src={IMAGES.skilledBridgeAdBanner}
                        alt="SkilledBridge d.o.o. - Uvoz Radne Snage"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        fallbackTitle="SkilledBridge d.o.o."
                        fallbackSubtitle="Uvoz stručne radne snage"
                      />
                      {/* Logo overlay badge on the image */}
                      <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/95 border border-[#00C9A7]/60 backdrop-blur-sm flex items-center gap-1 shadow-md">
                        <img
                          src={IMAGES.skilledBridgeLogoLocal}
                          alt="SkilledBridge Logo"
                          className="h-3.5 w-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = IMAGES.skilledBridgeArchiveLogoDirect;
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center p-1.5">
                        <span className="text-[10px] font-mono text-[#00C9A7] font-semibold flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> Otvori Članak
                        </span>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-2">
                      <a
                        href="https://www.skilledbridge.ba/kontakt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-syne font-extrabold text-xs tracking-wide shadow-xl shadow-[#00C9A7]/25 hover:shadow-[#C9A84C]/30 hover:scale-[1.02] transition-all min-h-[44px]"
                      >
                        <Briefcase className="w-4 h-4 text-[#0A1628]" />
                        <span>Prijavite Potrebe Firme (Web)</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <Link
                        to="/novosti?clanak=rjesenje-za-nedostatak-radne-snage-skilledbridge"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1628]/80 hover:bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8]/80 hover:text-[#00C9A7] font-mono text-[11px] transition-colors min-h-[36px]"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#00C9A7]" />
                        <span>Pročitaj Cijeli Članak</span>
                      </Link>
                    </div>

                    <span className="text-[10px] font-mono text-[#F5F0E8]/50">
                      Upiti za BiH: alen.jusufovic@skilledbridge.ba
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
              aria-label="Prikaži SkilledBridge Radna Snaga baner"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                currentSlide === 0
                  ? 'bg-[#00C9A7]/20 text-[#00C9A7] border border-[#00C9A7]/50 font-bold'
                  : 'bg-[#0A1628] text-[#F5F0E8]/60 hover:text-[#F5F0E8] border border-[#1A3152]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  currentSlide === 0 ? 'bg-[#00C9A7] animate-pulse' : 'bg-[#1A3152]'
                }`}
              />
              <span className="hidden sm:inline">1. SkilledBridge (Radna Snaga)</span>
              <span className="sm:hidden">1. SkilledBridge</span>
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
