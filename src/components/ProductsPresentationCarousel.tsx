import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { 
  Sparkles, 
  Calculator, 
  FileText, 
  Compass, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Clock, 
  Award, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductsPresentationCarouselProps {
  onOpenKonverModal?: () => void;
  onOpenKonverVideo?: () => void;
}

export const ProductsPresentationCarousel: React.FC<ProductsPresentationCarouselProps> = ({
  onOpenKonverModal,
  onOpenKonverVideo,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  const SLIDE_DURATION = 10000; // 10 seconds per slide as requested

  const slides = [
    {
      id: 'bh-konver',
      badge: 'BH KONVER • 10 SEK. SPOTLIGHT',
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: 'BH KONVER',
      subtitle: 'Nagrađivani Sistem za Konverzije & Pravne Izjave',
      tagline: 'Pobjednik "Lovable App of the Week" • 100% Autorski BH Softver',
      description:
        'Sveobuhvatni digitalni kalkulator za konverziju valuta, valuta iz dijaspore, mjernih jedinica i automatsko kreiranje validnih pravnih izjava pod punom materijalnom odgovornošću. Prilagođen za sve uređaje.',
      features: [
        'Konverter valuta & kalkulator u realnom vremenu',
        'Generator pravnih izjava pod materijalnom odgovornošću',
        'Prilagođen za pametne telefone i desktop',
      ],
      primaryImage: IMAGES.bhKonverMockup,
      secondaryImage: IMAGES.bravoWinner,
      icon: Calculator,
      themeColor: '#00C9A7',
      primaryActionText: 'Isprobaj BH Konver Uživo',
      primaryActionLink: 'https://bh-konver.lovable.app',
      secondaryActionText: 'Pogledaj Demo Video',
      secondaryActionLink: 'https://youtu.be/shBDQQvmZiY',
    },
    {
      id: 'bh-papirfinder',
      badge: 'BH PAPIRFINDER • 10 SEK. SPOTLIGHT',
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: 'BH PAPIRFINDER',
      subtitle: 'Centralni Registar & Smart Pretraživač Dokumenata',
      tagline: 'Digitalizacija općinskih propisa, taksi i službenih glasnika FBiH',
      description:
        'Smart CMS baza za jednostavno pretraživanje propisa, administrativnih obrazaca, rješenja i općinskih odluka Zeničko-dobojskog kantona i cijele Federacije BiH. Štedi sate čekanja na šalterima.',
      features: [
        'Brza pretraga po općinama i kategorijama dokumenata',
        'Usklađeno sa zakonodavstvom i službenim novinama',
        'Optimizovano za tablete i laptope u javnom sektoru',
      ],
      primaryImage: IMAGES.bhPapirfinderMockup,
      secondaryImage: IMAGES.bhPapirfinderBanner,
      icon: FileText,
      themeColor: '#C9A84C',
      primaryActionText: 'Pretraži Bazu PapirFinder',
      primaryActionLink: '#papirfinder-demo',
      secondaryActionText: 'Pregledaj Općinske Odluke',
      secondaryActionLink: '#novosti',
    },
    {
      id: 'ornamenti-bosne',
      badge: 'ORNAMENTI BOSNE • 10 SEK. SPOTLIGHT',
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: 'DIGITALNI KATALOG ORNAMENTI BOSNE',
      subtitle: 'Prva Digitalna Vektorska Kolekcija Motiva sa Stećaka',
      tagline: 'Kulturna baština Bosne na USB Memory Sticku • Dostava Pouzećem',
      description:
        'Jedinstvena autorska zbirka visokokvalitetnih vektorskih ornamenata, simbola, spirala i reljefa sa bosanskih stećaka. Idealno za dizajnere, arhitekte, institucije i ljubitelje historije.',
      features: [
        'Preko 50 autentičnih vektorskih motiva u SVG / PNG formatu',
        'Isporučuje se na USB Memory Sticku na kućnu adresu',
        'Plaćanje sigurno po preuzimanju pošiljke (pouzećem)',
      ],
      primaryImage: IMAGES.ornamentiBosne,
      secondaryImage: IMAGES.okrugliCvijet,
      icon: Compass,
      themeColor: '#00C9A7',
      primaryActionText: 'Prelistaj E-Katalog (Canva)',
      primaryActionLink: 'https://www.canva.com/design/DAG2j_k6M_s/XWl8UfVq-rA4X6k5L0wQzA/view',
      secondaryActionText: 'Naruči na USB Sticku',
      secondaryActionLink: '#ornamenti-order',
    },
    {
      id: 'scena-magazin',
      badge: 'SCENA+ MAGAZIN • 10 SEK. SPOTLIGHT',
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: 'MAGAZIN SCENA+ (I. IZDANJE)',
      subtitle: 'Spajamo Kulture • Stvaramo Šanse • Print & E-Izdanje',
      tagline: 'Prvi urbani magazin ZDK sa ekskluzivnim pričama iz kulture, muzike i biznisa',
      description:
        'Prvo izdanje magazina SCENA+ donosi autentične priče iz Zenice i regije: Danilo Keso Art, BCX Krypto, domaće Craft Pivare, Gaming Parivantanam, endemska fauna i uspjesi žena u bankarstvu.',
      features: [
        'Podijeljeno prvih 300 besplatnih printanih primjeraka',
        'Dostupna interaktivna Canva e-verzija za sve uređaje',
        'Video prezentacija sa dinamičkim promo emitovanjem',
      ],
      primaryImage: IMAGES.scenaCover,
      secondaryImage: IMAGES.daniKesoArt,
      icon: Layers,
      themeColor: '#C9A84C',
      primaryActionText: 'Prelistaj Magazin (Canva)',
      primaryActionLink: 'https://canva.link/vxekpnx0ow1xvt9',
      secondaryActionText: 'Otvori Video Promo',
      secondaryActionLink: '#scena-video-box',
    },
  ];

  // Auto rotation timer & progress bar calculation (10 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update progress every 50ms for smooth bar
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((slide) => (slide + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div 
      className="mb-14 rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#14263F] border-2 border-[#00C9A7]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: slide.themeColor }}
      />

      {/* Top Header Controls & 10s Timer Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1A3152]/80 relative z-10">
        
        {/* Left: Product Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlide;
            const TabIcon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSlide(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20 scale-105'
                    : 'bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8]/70 border border-[#1A3152]'
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#0A1628]' : 'text-[#00C9A7]'}`} />
                <span>{s.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isCurrent ? 'bg-[#0A1628]/30 text-[#0A1628]' : 'bg-[#1A3152] text-[#C9A84C]'}`}>
                  10s
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Timer Progress & Carousel Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#00C9A7]">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Rotacija: {Math.max(1, Math.ceil(10 - (progress / 10)))}s</span>
            {isPaused && <span className="text-[#C9A84C] font-bold text-[10px] ml-1">(Pauzirano)</span>}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Prethodni proizvod"
              className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] border border-[#1A3152] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Nastavi rotaciju' : 'Pauziraj'}
              className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#C9A84C] text-[#F5F0E8] hover:text-[#0A1628] border border-[#1A3152] transition-colors"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              aria-label="Sljedeći proizvod"
              className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] border border-[#1A3152] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 10-Second Progress Line Bar */}
      <div className="w-full bg-[#1A3152]/60 h-1.5 rounded-full overflow-hidden my-4 relative z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C]"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Main Slide Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10"
        >
          {/* Left Column: Product Story & Specifications (6 cols) */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${slide.badgeColor}`}>
                {slide.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C] text-[11px] font-mono">
                {slide.tagline}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] leading-tight">
                {slide.title}
              </h3>
              <p className="text-sm font-syne font-semibold text-[#00C9A7]">
                {slide.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-sans leading-relaxed">
              {slide.description}
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-2 pt-1">
              {slide.features.map((feat, fidx) => (
                <div key={fidx} className="flex items-center gap-2.5 text-xs text-[#F5F0E8]/90 font-sans">
                  <div className="p-1 rounded-md bg-[#00C9A7]/20 text-[#00C9A7] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {slide.primaryActionLink.startsWith('http') ? (
                <a
                  href={slide.primaryActionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] hover:from-[#00E5BE] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>{slide.primaryActionText}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href={slide.primaryActionLink}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] hover:from-[#00E5BE] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>{slide.primaryActionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              {slide.secondaryActionLink && (
                <a
                  href={slide.secondaryActionLink}
                  target={slide.secondaryActionLink.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#C9A84C] border border-[#C9A84C]/40 font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{slide.secondaryActionText}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: High-Resolution Mockup Showcase (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full rounded-2xl bg-[#0A1628]/90 border border-[#1A3152] p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-center min-h-[320px] overflow-hidden group-hover:border-[#00C9A7]/60 transition-colors">
              
              {/* Product Artwork Preview */}
              <div className="w-full flex items-center justify-center relative">
                <SafeImage
                  src={slide.primaryImage}
                  alt={`${slide.title} Screenshot & Mockup`}
                  fallbackTitle={slide.title}
                  fallbackSubtitle={slide.subtitle}
                  className="w-full h-auto max-h-72 object-contain drop-shadow-2xl rounded-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Secondary badge overlay if available (e.g. winner badge) */}
                {slide.secondaryImage && (
                  <div className="absolute -bottom-2 right-2 w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl hover:scale-110 transition-transform">
                    <SafeImage
                      src={slide.secondaryImage}
                      alt={`${slide.title} Badge`}
                      fallbackTitle="B&H"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Multi-Device Tag */}
              <div className="mt-4 pt-3 border-t border-[#1A3152]/70 w-full flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/70">
                <span className="flex items-center gap-1 text-[#00C9A7]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Optimizovano za Web, Mobilne & Tablete</span>
                </span>
                <span className="text-[#C9A84C] font-bold">100% In-House BiH</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Multi-Device Ecosystem Full Banner Footnote */}
      <div className="mt-8 pt-6 border-t border-[#1A3152]/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/30 text-[#00C9A7] shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
              Jedinstveni Multi-Device Ekosistem B&H Assistant-a
            </h4>
            <p className="text-xs text-[#F5F0E8]/70 font-sans">
              Od pametnog telefona (BH Konver), preko tableta (PapirFinder), do desktop računara i USB isporuke (Ornamenti Bosne).
            </p>
          </div>
        </div>
        <div className="md:col-span-4 flex items-center justify-end">
          <div className="relative w-full max-w-[200px] h-16 flex items-center justify-center">
            <SafeImage
              src={IMAGES.ourProducts}
              alt="B&H Assistant Ecosystem"
              fallbackTitle="Naši Proizvodi"
              fallbackSubtitle="Konver • PapirFinder • Ornamenti"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
