import React, { useState, useEffect } from 'react';
import { StecakBackground } from './StecakBackground';
import { ArrowRight, Sparkles, Download, Layers, BookOpen, Compass, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Briefcase, Cpu, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { SafeImage } from './SafeImage';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/images';

interface HeroSectionProps {
  onOpenBojanka: () => void;
  onNavigateSection: (secId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBojanka, onNavigateSection }) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const heroSlides = [
    {
      type: 'brand',
      badge: 'B&H ASSISTANT d.o.o.',
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.brand.title', 'B&H ASSISTANT d.o.o.'),
      motto: t('hero.slide.brand.motto', COMPANY_INFO.motto),
      description: t('hero.slide.brand.desc', 'Inovativni bh. digitalni ekosistem sa sjedištem u Zenici. Spajamo tehnološki napredak, kulturnu baštinu i društvenu odgovornost.'),
      image: IMAGES.logo,
      tags: ['BH KONVER', 'PAPIRFINDER', 'ORNAMENTI'],
      footerText: t('hero.slide.brand.desc', 'U potrazi ste za partnerstvom ili investicijom?'),
      footerAction: () => onNavigateSection('projekti'),
      footerButton: t('hero.slide.brand.btn', 'Detalji Projekata →')
    },
    {
      type: 'affiliate',
      badge: 'AFFILIATE PARTNER • AI PLATFORMA',
      badgeColor: 'bg-[#00C9A7] text-[#0A1628]',
      title: t('hero.slide.atoms.title', 'Atoms AI Platforma'),
      motto: t('hero.slide.atoms.motto', 'Pretvori Ideju u Realnost'),
      description: t('hero.slide.atoms.desc', 'Inovativna AI i cloud platforma za brzo kreiranje, testiranje i skaliranje pametnih web aplikacija i samostalnih agenata.'),
      icon: Cpu,
      image: IMAGES.atomsDev,
      url: 'https://atoms.dev/?utm_source=affiliate&via=pretvori-ideju-u-realnost',
      tags: ['AI Agenti', 'No-Code/Low-Code', 'Cloud App'],
      footerText: t('hero.slide.atoms.motto', 'Gradite pametne aplikacije odmah uz Atoms'),
      footerButton: t('hero.slide.atoms.btn', 'Otvori Atoms.dev →')
    },
    {
      type: 'affiliate',
      badge: 'AFFILIATE PARTNER • REMOTE POSLOVI',
      badgeColor: 'bg-[#C9A84C] text-[#0A1628]',
      title: t('hero.slide.remote.title', 'Remote Rocketship'),
      motto: t('hero.slide.remote.motto', 'Najbolja stranica za Remote Poslove u BiH!'),
      description: t('hero.slide.remote.desc', 'Pretražite stotine plaćenih poslova od kuće u IT-ju, marketingu, dizajnu i korisničkoj podršci sa fleksibilnim radnim vremenom.'),
      icon: Briefcase,
      image: IMAGES.remoteRocket,
      url: 'https://tolt.link/remote-poslovi',
      tags: ['Rad od kuće', 'EU & SAD Poslodavci', 'IT & Podrška'],
      footerText: t('hero.slide.remote.motto', 'Pronađite vaš idealan remote posao u BiH'),
      footerButton: t('hero.slide.remote.btn', 'Traži Remote Poslove →')
    },
    {
      type: 'tool',
      badge: 'PRVI BH ALAT • FINANSIJE',
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.konver.title', 'BH KONVER'),
      motto: t('hero.slide.konver.motto', 'Sistem za konverziju i pravne izjave'),
      description: t('hero.slide.konver.desc', 'Brzi i precizni bh. digitalni kalkulator i konverter valuta, jedinica i kreiranje pravnih izjava pod materijalnom odgovornošću.'),
      image: IMAGES.bhKonverMockup,
      tags: ['Konverzija', 'Pravne Izjave', 'PDF Izvoz'],
      footerText: t('hero.slide.konver.motto', 'Sveobuhvatni bh. alat za konverzije'),
      footerAction: () => onNavigateSection('alati'),
      footerButton: t('hero.slide.konver.btn', 'Otvori BH Konver →')
    },
    {
      type: 'heritage',
      badge: 'KULTURNA BAŠTINA • USB DOSTAVA',
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: 'Ornamenti Bosne',
      motto: 'Digitalna Kolekcija Motiva sa Stećaka (I. Izdanje 2026)',
      description: 'Stilizirani motivi bh. baštine kodirani u SVG, PNG, HTML i CSS. Jedini digitalni proizvod sa dostavom na USB sticku i plaćanjem pouzećem.',
      image: IMAGES.ornamentiBosne,
      tags: ['Stećci', 'Vektori (SVG/PNG)', 'USB Dostava'],
      footerText: 'Naručite USB stick sa dostavom na adresu',
      footerAction: () => onNavigateSection('alati'),
      footerButton: 'Detalji i Narudžba →'
    },
    {
      type: 'magazine',
      badge: 'SCENA+ MAGAZIN • ZDK',
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.scena.title', 'SCENA+ Magazin'),
      motto: t('hero.slide.scena.motto', 'Spajamo kulture - stvaramo šanse'),
      description: t('hero.slide.scena.desc', 'Prvo fizičko i e-izdanje urbanog magazina sa pričama o bh. arheologiji, umjetnosti, BCX kriptu i craft pivarstvu.'),
      image: IMAGES.scenaCover,
      tags: ['Urbana Kultura', 'Umjetnost', 'Print & Digital'],
      footerText: t('hero.slide.scena.motto', 'Besplatno e-čitanje magazina SCENA+'),
      footerAction: () => onNavigateSection('scena-magazin'),
      footerButton: t('hero.slide.scena.btn', 'Prelistaj Magazin →')
    }
  ];

  // Auto rotate every 5000ms (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const activeHeroSlide = heroSlides[heroSlide];

  return (
    <section id="pocetna" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Interactive Stećak Geometry Motif Backdrop */}
      <StecakBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Typography & Pitch (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-[#00C9A7]/10">
              <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-ping" />
              <span>{t('hero.badge', 'PRVA SOFTVERSKA I IZDAVAČKA KUĆA U ZENICI')}</span>
            </div>

            {/* Main Syne Heading */}
            <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E8] leading-[1.15] tracking-tight uppercase">
              {t('hero.title1', 'Digitalna rješenja')}{' '}
              <span className="text-[#00C9A7]">{t('hero.title2', 'za')}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C]">
                {t('hero.title3', 'Bosnu i Hercegovinu')}
              </span>
            </h1>

            {/* Subtitle / Intro */}
            <p className="text-[#F5F0E8]/80 text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
              {t('hero.subtitle', 'B&H Assistant d.o.o. Zenica spaja moderne IT tehnologije, besplatne alate za bh. građane, urbani magazin SCENA+ i kulturnu baštinu stećaka u jedinstven ekosistem.')}
            </p>

            {/* Key Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#0F2038]/80 border border-[#1A3152] backdrop-blur-sm flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#00C9A7]/20 text-[#00C9A7]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F0E8] font-syne">3 {t('hero.statTools', 'BH Digitalna Alata')}</h4>
                  <p className="text-[11px] text-[#F5F0E8]/70">Konver, PapirFinder, Ornamenti</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0F2038]/80 border border-[#1A3152] backdrop-blur-sm flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#C9A84C]/20 text-[#C9A84C]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F0E8] font-syne">{t('nav.scena', 'Magazin SCENA+')}</h4>
                  <p className="text-[11px] text-[#F5F0E8]/70">Prvi urbani magazin ZDK</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0F2038]/80 border border-[#1A3152] backdrop-blur-sm flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#00C9A7]/20 text-[#00C9A7]">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F0E8] font-syne">{t('nav.freeBojanka', 'Free Bojanka')}</h4>
                  <p className="text-[11px] text-[#F5F0E8]/70">Edukativni Gummi PDF</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onNavigateSection('alati')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#00C9A7]/25 hover:shadow-[#00C9A7]/40 hover:scale-[1.02] transition-all flex items-center gap-2 min-h-[44px]"
              >
                <span>{t('hero.btnTools', 'Istraži Digitalne Alate')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateSection('scena-magazin')}
                className="px-5 py-3 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8] font-syne font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-[#00C9A7]" />
                <span>{t('scena.readNow', 'Prelistaj SCENA+')}</span>
              </button>

              <a
                href="https://canva.link/ssrtaw2m4nymjcr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#D4B356] text-[#0A1628] font-syne font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-lg min-h-[44px] hover:scale-105"
                title="Otvorite zvanični 20-stranični Canva Poslovni Plan i Pitch Deck"
              >
                <Sparkles className="w-4 h-4" />
                <span>Canva {t('hero.btnBizPlan', 'Poslovni Plan (20 Stranica)')}</span>
              </a>

              <button
                onClick={onOpenBojanka}
                className="px-4 py-3 rounded-xl bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>{t('hero.btnBojanka', 'Preuzmi Gummi Bojanku')}</span>
              </button>
            </div>

            {/* Legal Company Banner */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#F5F0E8]/60 border-t border-[#1A3152]/60">
              <span className="flex items-center gap-1.5 text-[#00C9A7]">
                <CheckCircle2 className="w-3.5 h-3.5" /> JIB: {COMPANY_INFO.jib}
              </span>
              <span>MBS: {COMPANY_INFO.mbs}</span>
              <span>Grad: {COMPANY_INFO.city} 72000</span>
            </div>

          </div>

          {/* Right Showcase Visual Box - Automated 5s Rotating Carousel */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-md lg:max-w-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Outer Decorative Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00C9A7] via-[#C9A84C] to-[#00C9A7] rounded-3xl blur-xl opacity-30 animate-glow-shift" />

              {/* Main Laptop & Brand Visual Card */}
              <div className="relative rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 p-6 shadow-2xl space-y-5 overflow-hidden transition-all duration-500">
                
                {/* 5s Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152]">
                  <div
                    key={heroSlide}
                    className="h-full bg-gradient-to-r from-[#00C9A7] to-[#C9A84C] animate-[progress_5s_linear]"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                  />
                </div>

                {/* Header Badge inside card */}
                <div className="flex items-center justify-between border-b border-[#1A3152] pb-3 pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-[#F5F0E8]/60 ml-1.5">www.bh-assistant.ba</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold font-mono ${activeHeroSlide.badgeColor}`}>
                    {activeHeroSlide.badge}
                  </span>
                </div>

                {/* Main Logo & Graphic Frame */}
                <div className="relative group rounded-2xl overflow-hidden bg-[#0A1628] border border-[#1A3152] p-5 text-center space-y-4 min-h-[280px] flex flex-col justify-center items-center">
                  
                  {/* Slide Visual Icon or Image */}
                  {activeHeroSlide.image ? (
                    <div className="mx-auto w-full max-w-[260px] h-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#00C9A7]/40 bg-[#0F2038] shadow-lg shadow-[#00C9A7]/20 flex items-center justify-center p-1.5">
                      <SafeImage
                        src={activeHeroSlide.image}
                        alt={activeHeroSlide.title}
                        fallbackTitle={activeHeroSlide.title}
                        fallbackSubtitle={activeHeroSlide.motto}
                        priority={true}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : activeHeroSlide.icon ? (
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00C9A7]/20 via-[#0F2038] to-[#C9A84C]/20 border border-[#00C9A7]/50 p-4 shadow-lg flex items-center justify-center text-[#00C9A7]">
                      <activeHeroSlide.icon className="w-10 h-10" />
                    </div>
                  ) : null}

                  <div>
                    <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8]">
                      {activeHeroSlide.title}
                    </h3>
                    <p className="text-xs font-mono text-[#C9A84C] mt-1 font-semibold">
                      {activeHeroSlide.motto}
                    </p>
                  </div>

                  <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans px-2">
                    {activeHeroSlide.description}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-[#00C9A7]">
                    {activeHeroSlide.tags.map((tItem, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#1A3152] border border-[#1A3152]">
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-3.5 rounded-xl bg-[#0A1628]/80 border border-[#1A3152] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Sparkles className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    <span className="text-[#F5F0E8]/90 font-medium truncate">{activeHeroSlide.footerText}</span>
                  </div>

                  {activeHeroSlide.url ? (
                    <a
                      href={activeHeroSlide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#00C9A7] text-[#0A1628] font-syne font-bold hover:bg-[#00E5BE] transition-colors shrink-0 flex items-center gap-1"
                    >
                      <span>{activeHeroSlide.footerButton}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={activeHeroSlide.footerAction}
                      className="px-3 py-1.5 rounded-lg bg-[#00C9A7] text-[#0A1628] font-syne font-bold hover:bg-[#00E5BE] transition-colors shrink-0"
                    >
                      {activeHeroSlide.footerButton}
                    </button>
                  )}
                </div>

                {/* Slide Controls & Indicators */}
                <div className="flex items-center justify-between pt-1 border-t border-[#1A3152]">
                  <button
                    onClick={() => setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    className="p-1.5 rounded-lg bg-[#0A1628] hover:bg-[#00C9A7]/20 border border-[#1A3152] text-[#F5F0E8] transition-colors"
                    aria-label="Prethodni slajd"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          heroSlide === idx ? 'w-5 bg-[#00C9A7]' : 'w-1.5 bg-[#1A3152]'
                        }`}
                        aria-label={`Slajd ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="p-1.5 rounded-lg bg-[#0A1628] hover:bg-[#00C9A7]/20 border border-[#1A3152] text-[#F5F0E8] transition-colors"
                    aria-label="Sjedeći slajd"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

