import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ExternalLink, MessageSquare, Download, Layers, Briefcase, Plus, Image as ImageIcon, Globe, PhoneCall, Bot } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/images';

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
}

interface PromoBannerCarouselProps {
  onOpenContact?: () => void;
  onOpenBojanka?: () => void;
}

export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  onOpenContact,
  onOpenBojanka,
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const bannerSlides: BannerSlide[] = [
    {
      id: 'bh-konver-app',
      badgeKey: 'banner.konver.badge',
      badgeDefault: 'BH KONVER • AUTOMATIZACIJA DOKUMENATA',
      titleKey: 'banner.konver.title',
      titleDefault: 'BH KONVER – Kreira pravne dokumente, prevodi i konvertuje za Vas!',
      descKey: 'banner.konver.desc',
      descDefault: 'Zvanični bh. digitalni asistent za automatsku izradu, prevođenje i konverziju pravnih dokumenata, izjava, obrazaca i ugovora. Isprobajte besplatno na bh-konver.lovable.app!',
      btnKey: 'banner.konver.btn',
      btnDefault: 'Otvori BH KONVER Aplikaciju',
      btnUrl: 'https://bh-konver.lovable.app/',
      isExternal: true,
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      accentBg: 'from-[#0F2038] via-[#1A3152] to-[#0A1628]',
      icon: Sparkles,
      bannerImage: IMAGES.bhKonverBanner
    },
    {
      id: 'bh-papirfinder-app',
      badgeKey: 'banner.papirfinder.badge',
      badgeDefault: 'BH PAPIRFINDER • E-UPRAVA ASISTENT',
      titleKey: 'banner.papirfinder.title',
      titleDefault: 'BH PapirFinder – Više ne ganjate papire, oni dolaze Vama!',
      descKey: 'banner.papirfinder.desc',
      descDefault: 'Pametna administracija bez čekanja u redovima! BH PapirFinder pronalazi, organizuje i priprema sve potrebne općinske i kantonalne papire, takse i obrasce direktno za Vas na bhpapirfinder.atoms.world.',
      btnKey: 'banner.papirfinder.btn',
      btnDefault: 'Pristupi BH PapirFinder-u',
      btnUrl: 'https://bhpapirfinder.atoms.world',
      isExternal: true,
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      accentBg: 'from-[#0F2038] via-[#2A2A15] to-[#0A1628]',
      icon: Layers,
      bannerImage: IMAGES.bhPapirfinderBanner
    },
    {
      id: 'lovable-bh-konver',
      badgeKey: 'banner.lovable.badge',
      badgeDefault: 'APLIKACIJA SEDMICE & LOVABLE',
      titleKey: 'banner.lovable.title',
      titleDefault: 'BH KONVER izglasana za Aplikaciju Sedmice! Lovable gradi i finansira iOS & Android app',
      descKey: 'banner.lovable.desc',
      descDefault: 'Sjajne vijesti za B&H Assistant d.o.o. Zenica! Naš autorski alat BH KONVER izglasan je za Aplikaciju Sedmice, te je osigurao podršku tima Lovable koji će u potpunosti izraditi i finansirati zvanične mobilne aplikacije za iOS i Android uređaje.',
      btnKey: 'banner.lovable.btn',
      btnDefault: 'Saznajte Više o BH KONVER-u',
      btnUrl: 'https://bh-konver.lovable.app/',
      isExternal: true,
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      accentBg: 'from-[#0F2038] via-[#1A3152] to-[#0A1628]',
      icon: Sparkles,
      bannerImage: IMAGES.bravoWinner
    },
    {
      id: 'mitgo-xpuvo-deals',
      badgeKey: 'banner.xpuvo.badge',
      badgeDefault: 'MITGO GLOBAL DEALS & PARTNER 🌟',
      titleKey: 'banner.xpuvo.title',
      titleDefault: 'Ekskluzivne Partnerske Ponude & Globalni Popusti – B&H Assistant Mreža',
      descKey: 'banner.xpuvo.desc',
      descDefault: 'Iskoristite provjerene pogodnosti, digitalne alate i popuste vodećih svjetskih brendova kroz zvaničnu B&H Assistant partnersku mrežu. Siguran pristup i direktne pogodnosti.',
      btnKey: 'banner.xpuvo.btn',
      btnDefault: 'Istraži Partnerske Ponude',
      btnUrl: 'https://xpuvo.com/g/ofc53p8nisfe02eff231e94db72a90/',
      isExternal: true,
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      accentBg: 'from-[#0F2038] via-[#1A3152] to-[#0A1628]',
      icon: Globe,
      bannerImage: IMAGES.xpuvoLogo
    },
    {
      id: 'admitad-renewed-partner',
      badgeKey: 'banner.admitad.badge',
      badgeDefault: 'ADMITAD / MITGO OBNOVLJENI GATEWAY 🌐',
      titleKey: 'banner.admitad.title',
      titleDefault: 'Zvanični Verifikovani Admitad & Mitgo Partnerski Portal',
      descKey: 'banner.admitad.desc',
      descDefault: 'Obnovljeni gateway B&H Assistant d.o.o. Zenica u vodećoj globalnoj partnerskoj mreži. Pristupite stotinama certifikovanih oglašivača i digitalnih servisa.',
      btnKey: 'banner.admitad.btn',
      btnDefault: 'Otvori Admitad Gateway',
      btnUrl: 'https://rzekl.com/g/1e8d114494fe02eff23116525dc3e8/',
      isExternal: true,
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      accentBg: 'from-[#0F2038] via-[#2A2A15] to-[#0A1628]',
      icon: Sparkles,
      bannerImage: IMAGES.rzeklLogo
    },
    {
      id: 'custom-tool',
      badgeKey: 'banner.tool.badge',
      badgeDefault: 'USLUGA PO MJERI',
      titleKey: 'banner.tool.title',
      titleDefault: 'Želite prilagođeni digitalni alat ili e-upravu za Vašu firmu ili općinu?',
      descKey: 'banner.tool.desc',
      descDefault: 'Tim B&H Assistant d.o.o. Zenica nudi izradu specifičnih kalkulatora, baze obrazaca, API integracija i web platformi po Vašim zahtjevima.',
      btnKey: 'banner.tool.btn',
      btnDefault: 'Kontaktirajte Nas Odmah',
      btnUrl: '#kontakt',
      onClickAction: onOpenContact,
      tagColor: 'bg-[#00C9A7] text-[#0A1628]',
      accentBg: 'from-[#0F2038] via-[#1A3152] to-[#0A1628]',
      icon: MessageSquare,
      bannerImage: IMAGES.bhKonverMockup
    },
    {
      id: 'scena-magazine',
      badgeKey: 'banner.scena.badge',
      badgeDefault: 'MARKETING & MEDIJI',
      titleKey: 'banner.scena.title',
      titleDefault: 'Magazin SCENA+ • Oglašavajte Vaš Brend u Zeničko-dobojskom Kantonu',
      descKey: 'banner.scena.desc',
      descDefault: 'Promovišite vaše poslovanje kroz prvo fizičko i digitalno izdanje urbanog magazina za kulturu, umjetnost, kripto i privredu.',
      btnKey: 'banner.scena.btn',
      btnDefault: 'Prelistaj E-Izdanje SCENA+',
      btnUrl: 'https://canva.link/vxekpnx0ow1xvt9',
      isExternal: true,
      tagColor: 'bg-[#C9A84C] text-[#0A1628]',
      accentBg: 'from-[#1A3152] via-[#0F2038] to-[#0A1628]',
      icon: Layers,
      bannerImage: IMAGES.scenaCover
    },
    {
      id: 'zentaxi-network',
      badgeKey: 'banner.zentaxi.badge',
      badgeDefault: 'STARTUP MREŽA',
      titleKey: 'banner.zentaxi.title',
      titleDefault: 'ZENTAXI - Pametna Taksi Mreža • Pridružite Se Mreži Vozača u Zenici!',
      descKey: 'banner.zentaxi.desc',
      descDefault: 'Pozivamo samostalne taksiste i prevoznike da se priključe novoj digitalnoj dispečerskoj platformi B&H Assistant-a.',
      btnKey: 'banner.zentaxi.btn',
      btnDefault: 'Saznajte Više o ZENTAXI-ju',
      btnUrl: 'https://canva.link/xyqzerrxvkxbfy2',
      isExternal: true,
      tagColor: 'bg-[#00E5BE] text-[#0A1628]',
      accentBg: 'from-[#0F2038] via-[#112847] to-[#0A1628]',
      icon: Sparkles,
      bannerImage: IMAGES.zentaxiLogo
    },
    {
      id: 'gummi-bojanka',
      badgeKey: 'banner.gummi.badge',
      badgeDefault: 'BESPLATNA EDUKACIJA',
      titleKey: 'banner.gummi.title',
      titleDefault: 'GUMMI Bojanka • Besplatan Edukativni PDF Poklon za Djecu i Škole',
      descKey: 'banner.gummi.desc',
      descDefault: 'Preuzmite i odštampajte autorsku bojanku za predškolce i osnovce sa vježbama grafomotorike i učenjem slova.',
      btnKey: 'banner.gummi.btn',
      btnDefault: 'Preuzmi Bojanku PDF',
      btnUrl: '#projekti',
      onClickAction: onOpenBojanka,
      tagColor: 'bg-[#C9A84C] text-[#0A1628]',
      accentBg: 'from-[#1A3152] via-[#112847] to-[#0F2038]',
      icon: Download,
      bannerImage: IMAGES.gummiVasJaran
    },
    {
      id: 'stecak-vector',
      badgeKey: 'banner.stecak.badge',
      badgeDefault: 'USB DOSTAVA & POUZEĆE 📦',
      titleKey: 'banner.stecak.title',
      titleDefault: 'Ornamenti Bosne • Jedini Digitalni Proizvod sa Dostavom na USB Memory Sticku',
      descKey: 'banner.stecak.desc',
      descDefault: 'Autentični vektorski motivi i kodovi sa bh. stećaka. Jedini digitalni proizvod koji se dostavlja direktno na Vašu adresu na USB sticku uz plaćanje po preuzimanju (pouzećem). Pogledajte i video prezentaciju!',
      btnKey: 'banner.stecak.btn',
      btnDefault: 'Istraži Kolekciju i Video',
      btnUrl: '#alati',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] to-[#00C9A7] text-[#0A1628] font-bold',
      accentBg: 'from-[#0F2038] via-[#1A3152] to-[#0A1628]',
      icon: ImageIcon,
      bannerImage: IMAGES.ornamentiBosne
    },
    {
      id: 'remote-career',
      badgeKey: 'banner.remote.badge',
      badgeDefault: 'EDUKACIJA & KARIJERA',
      titleKey: 'banner.remote.title',
      titleDefault: 'Pronađite Remote Poslove u BiH & Besplatne Certificirane Kurseve',
      descKey: 'banner.remote.desc',
      descDefault: 'Povežite se sa inostranim poslodavcima ili upišite besplatne online edukacije u saradnji sa Alison akademijom.',
      btnKey: 'banner.remote.btn',
      btnDefault: 'Otvori SHOP & Partnerstva',
      btnUrl: '#shop',
      tagColor: 'bg-[#00E5BE] text-[#0A1628]',
      accentBg: 'from-[#0A1628] via-[#0F2038] to-[#1A3152]',
      icon: Briefcase,
      bannerImage: IMAGES.remoteRocket
    },
    {
      id: 'future-sponsor-slot',
      badgeKey: 'banner.future.badge',
      badgeDefault: 'REZERVIŠITE OGLAS',
      titleKey: 'banner.future.title',
      titleDefault: 'Vaš Oglas ili Partnerski Banner Ovdje • Postanite Sponzor B&H Assistant-a',
      descKey: 'banner.future.desc',
      descDefault: 'Rezervišite promotivni prostor u našem karuselu i predstavite Vaše usluge hiljadama posjetilaca naših platformi.',
      btnKey: 'banner.future.btn',
      btnDefault: 'Zakupite Oglasni Prostor',
      btnUrl: '#kontakt',
      onClickAction: onOpenContact,
      tagColor: 'bg-[#C9A84C] text-[#0A1628]',
      accentBg: 'from-[#1A3152] via-[#0F2038] to-[#0A1628]',
      icon: Plus
    }
  ];

  // Auto right-to-left slide rotation every 6 seconds (6000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      // Right to left increment
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, bannerSlides.length]);

  const handleNext = () => {
    // Right to left step (next slide moves in from right)
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  // Touch Swipe Handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext(); // swipe left advances slide right-to-left
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === ' ') {
      setIsPaused(!isPaused);
    }
  };

  const slide = bannerSlides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div
      className="w-full my-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="B&H Assistant Promotivni Karusel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Carousel Wrapper Box */}
      <div
        ref={carouselRef}
        className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#1A3152] to-[#0A1628] border-2 border-[#00C9A7]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden group transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Top Animated Timer Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152]/80 z-20">
          <div
            key={currentSlide}
            className="h-full bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] animate-[progress_6s_linear]"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          />
        </div>

        {/* Backdrop Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container with Smooth Right-To-Left Animation Key */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 min-h-[220px]">
          
          {/* Main Content Info (8 cols) */}
          <div className="lg:col-span-8 space-y-4 text-left transition-all duration-500 transform animate-fadeIn">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full font-syne font-black text-xs uppercase tracking-wider shadow-md ${slide.tagColor}`}>
                {t(slide.badgeKey, slide.badgeDefault)}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0A1628]/80 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                <span>B&H ASSISTANT PROMOTIVNI BANER</span>
              </span>
            </div>

            <div>
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#F5F0E8] leading-tight">
                {t(slide.titleKey, slide.titleDefault)}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-sans leading-relaxed bg-[#0A1628]/70 p-4 rounded-2xl border border-[#1A3152]/80">
              {t(slide.descKey, slide.descDefault)}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {slide.onClickAction ? (
                <button
                  onClick={slide.onClickAction}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t(slide.btnKey, slide.btnDefault)}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ) : slide.isExternal ? (
                <a
                  href={slide.btnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t(slide.btnKey, slide.btnDefault)}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href={slide.btnUrl}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-xl hover:scale-105 transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t(slide.btnKey, slide.btnDefault)}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              )}

              <span className="text-[11px] font-mono text-[#F5F0E8]/50 hidden sm:inline-block">
                {t('carousel.pauseOnHover', 'Pređite mišem za pauziranje prelistavanja')}
              </span>
            </div>

          </div>

          {/* Right Visual Image / Icon Preview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center text-center">
            {slide.bannerImage ? (
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#00C9A7]/40 bg-[#0A1628] shadow-xl relative group-hover:scale-[1.02] transition-transform">
                <SafeImage
                  src={slide.bannerImage}
                  alt={slide.titleDefault}
                  fallbackTitle={slide.titleDefault}
                  fallbackSubtitle={slide.badgeDefault}
                  fallbackIcon={<IconComponent className="w-6 h-6 text-[#00C9A7]" />}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#00C9A7] pointer-events-none">
                  <span className="bg-[#0A1628]/90 px-2 py-0.5 rounded border border-[#00C9A7]/30">
                    B&H Assistant Media
                  </span>
                  <IconComponent className="w-4 h-4 text-[#C9A84C]" />
                </div>
              </div>
            ) : (
              <div className="w-full py-10 px-6 rounded-2xl bg-[#0A1628]/90 border-2 border-[#00C9A7]/30 shadow-xl flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7]">
                  <IconComponent className="w-8 h-8 animate-bounce" />
                </div>
                <span className="text-xs font-syne font-bold text-[#F5F0E8]">
                  Oglasni Prostor Otvoren
                </span>
                <span className="text-[10px] font-mono text-[#C9A84C]">
                  Kontaktirajte B&H Assistant
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Carousel Bottom Controls & Navigation Bar */}
        <div className="mt-8 pt-4 border-t border-[#1A3152] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-3 text-xs font-mono text-[#F5F0E8]/70">
            <span className="text-[#00C9A7] font-bold">
              {t('carousel.slideNum', 'Baner')} {currentSlide + 1} {t('carousel.of', 'od')} {bannerSlides.length}
            </span>
            <span>•</span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs transition-colors"
              title={isPaused ? "Pokreni automatsko prelistavanje" : "Pauziraj karusel"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#00C9A7]" /> : <Pause className="w-3.5 h-3.5 text-[#C9A84C]" />}
              <span>{isPaused ? 'Nastavi' : 'Pauza'}</span>
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-8 bg-[#00C9A7] shadow-lg shadow-[#00C9A7]/40'
                    : 'w-2.5 bg-[#1A3152] hover:bg-[#00C9A7]/40'
                }`}
                aria-label={`Prikaži baner ${idx + 1}`}
              />
            ))}
          </div>

          {/* Directional Arrows (Right-To-Left Flow) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] transition-all shadow-md min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Prethodni baner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] transition-all shadow-md min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Sjedeći baner (desno na lijevo)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
