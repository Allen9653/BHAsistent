import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { StecakBackground } from '../components/StecakBackground';
import { PromoBannerCarousel } from '../components/PromoBannerCarousel';
import { SpecialOfferSection } from '../components/SpecialOfferSection';
import { AffiliateBannerCarousel } from '../components/AffiliateBannerCarousel';
import { SafeImage } from '../components/SafeImage';
import { IMAGES } from '../utils/images';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../data/companyData';
import { SEOHead } from '../components/SEOHead';
import { EditableText } from '../components/cms/EditableText';
import {
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
  Compass,
  CheckCircle2,
  Tv,
  Briefcase,
  Gift,
  ExternalLink,
  Newspaper,
  Calculator,
  Layers
} from 'lucide-react';

interface HomePageProps {
  onOpenBojanka: () => void;
  onOpenAdmin: () => void;
}

interface HeroSlide {
  type: string;
  badge: string;
  badgeColor: string;
  title: string;
  motto: string;
  description: string;
  image: string;
  tags: string[];
  linkTo: string;
  isExternal: boolean;
  linkText: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBojanka, onOpenAdmin: _onOpenAdmin }) => {
  const { t } = useLanguage();
  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides: HeroSlide[] = [
    {
      type: 'brand',
      badge: t('hero.slide.brand.badge', 'B&H ASSISTANT d.o.o.'),
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.brand.title', 'B&H ASSISTANT d.o.o.'),
      motto: t('hero.slide.brand.motto', 'Nova IT i Digital Marketing firma sa adresom u Zenici!'),
      description: t('hero.slide.brand.desc', 'Inovativni bh. digitalni ekosistem sa sjedištem u Zenici. Spajamo IT razvoj, digitalni marketing, kulturnu baštinu i društvenu odgovornost.'),
      image: IMAGES.logo,
      tags: ['IT Zenica', 'Digital Marketing', 'Softver'],
      linkTo: '/o-nama',
      isExternal: false,
      linkText: t('hero.slide.brand.btn', 'Upoznaj Firmu & Video →')
    },
    {
      type: 'tool',
      badge: t('hero.slide.konver.badge', 'PRVI BH ALAT • FINANSIJE'),
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.konver.title', 'BH KONVER'),
      motto: t('hero.slide.konver.motto', 'Sistem za konverziju i pravne izjave'),
      description: t('hero.slide.konver.desc', 'Brzi i precizni bh. digitalni kalkulator i konverter valuta, jedinica i kreiranje pravnih izjava pod materijalnom odgovornošću.'),
      image: IMAGES.bhKonverMockup,
      tags: ['Konverzija', 'Pravne Izjave', 'Web App'],
      linkTo: 'https://www.bh-konver.com/',
      isExternal: true,
      linkText: t('hero.slide.konver.btn', 'Otvori BH Konver →')
    },
    {
      type: 'news',
      badge: t('hero.slide.news.badge', 'NOVOSTI & CMS • IT INSAJDER'),
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.news.title', 'NOVOSTI & CMS'),
      motto: t('hero.slide.news.motto', 'IT & Tech Insajder'),
      description: t('hero.slide.news.desc', 'Ekskluzivne vijesti iz IT sektora BiH, regije i svijeta – dubinske analize, tehnološke preporuke, recenzije softvera i digitalni trendovi.'),
      image: IMAGES.scenaCover,
      tags: ['IT Vijesti', 'Analize', 'Tech Trendovi'],
      linkTo: '/novosti',
      isExternal: false,
      linkText: t('hero.slide.news.btn', 'Pročitaj Novosti →')
    },
    {
      type: 'magazine',
      badge: t('hero.slide.scena.badge', 'SCENA+ MAGAZIN • ZDK'),
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.scena.title', 'SCENA+ Magazin'),
      motto: t('hero.slide.scena.motto', 'Spajamo kulture - stvaramo šanse'),
      description: t('hero.slide.scena.desc', 'Prvo fizičko i e-izdanje urbanog magazina sa pričama o bh. arheologiji, umjetnosti, BCX kriptu i craft pivarstvu.'),
      image: IMAGES.scenaCover,
      tags: ['Urbana Kultura', 'Umjetnost', 'Canva Reader'],
      linkTo: 'https://canva.link/vxekpnx0ow1xvt9',
      isExternal: true,
      linkText: t('hero.slide.scena.btn', 'Prelistaj Magazin →')
    },
    {
      type: 'heritage',
      badge: t('hero.slide.stecak.badge', 'KULTURNA BAŠTINA • USB DOSTAVA'),
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.stecak.title', 'Ornamenti Bosne'),
      motto: t('hero.slide.stecak.motto', 'Digitalna Kolekcija Motiva sa Stećaka (I. Izdanje 2026)'),
      description: t('hero.slide.stecak.desc', 'Stilizirani motivi bh. baštine kodirani u SVG, PNG, HTML i CSS. Jedini digitalni proizvod sa dostavom na USB sticku i plaćanjem pouzećem.'),
      image: IMAGES.ornamentiBosne,
      tags: ['Stećci', 'Vektori (SVG/PNG)', 'Canva Katalog'],
      linkTo: 'https://canva.link/8dwxeack5cwn18l',
      isExternal: true,
      linkText: t('hero.slide.stecak.btn', 'Pogledaj Ornamenti Bosne →')
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const activeHeroSlide = heroSlides[heroSlide] || heroSlides[0];

  // Core Pillars of the Platform
  const pillars = [
    {
      id: 'pillar-alati',
      title: t('home.pillar.alati.title', 'BH Digitalni Alati'),
      subtitle: t('home.pillar.alati.subtitle', '3 Autorska Softvera'),
      desc: t('home.pillar.alati.desc', 'BH Konver (konverzije i pravne izjave), BH PapirFinder (baza e-uprave) i Ornamenti Bosne (kodirani stećci).'),
      icon: Compass,
      image: IMAGES.bhKonverMockup,
      badge: t('home.pillar.alati.badge', 'Softver & Web'),
      link: '/proizvodi-i-usluge'
    },
    {
      id: 'pillar-scena',
      title: t('home.pillar.newsInsider.title', 'NOVOSTI & CMS'),
      subtitle: t('home.pillar.newsInsider.subtitle', 'IT & Tech Insajder'),
      desc: t('home.pillar.newsInsider.desc', 'Ekskluzivne vijesti iz IT sektora BiH, regije i svijeta – dubinske analize, zanimljiva dešavanja, tehnološke preporuke, recenzije softvera i digitalni trendovi koji mijenjaju svakodnevicu.'),
      icon: Newspaper,
      image: IMAGES.scenaCover,
      badge: t('home.pillar.newsInsider.badge', 'IT & Tech Insajder'),
      link: '/novosti'
    },
    {
      id: 'pillar-onama',
      title: t('home.pillar.onama.title', 'O Nama & YouTube Video'),
      subtitle: t('home.pillar.onama.subtitle', 'Poslovni Plan & Podaci'),
      desc: t('home.pillar.onama.desc', 'Službeni podaci firme, CompanyWall rejting i integrisani HD video poslovnog plana na bosanskom i engleskom jeziku.'),
      icon: Tv,
      image: IMAGES.presentation,
      badge: t('home.pillar.onama.badge', 'Prezentacija'),
      link: '/o-nama'
    },
    {
      id: 'pillar-usluge',
      title: t('home.pillar.projekti.title', 'Proizvodi & Usluge'),
      subtitle: t('home.pillar.projekti.subtitle', '8 IT Usluga & Aplikacije'),
      desc: t('home.pillar.projekti.desc', 'Zvanična ponuda 8 profesionalnih IT usluga (B2B Lead Gen, Digital PR, Custom Web, SEO revizija, Mobile Apps), autorski softveri i besplatne e-publikacije.'),
      icon: Briefcase,
      image: IMAGES.ourProducts,
      badge: t('home.pillar.projekti.badge', 'B2B & IT Usluge'),
      link: '/proizvodi-i-usluge'
    }
  ];

  // Official PR Boxes with Direct External URLs
  const directPrBoxes = [
    {
      id: 'pr-bh-konver',
      badge: t('home.prBoxes.konver.badge', 'ZVANIČNA WEB APLIKACIJA'),
      title: t('home.prBoxes.konver.title', 'BH KONVER'),
      desc: t('home.prBoxes.konver.desc', 'Sistem za brzu konverziju valuta, jedinica i automatsko kreiranje pravnih izjava pod materijalnom odgovornošću.'),
      cta: t('home.prBoxes.konver.cta', 'Otvori BH Konver'),
      url: 'https://www.bh-konver.com/',
      image: IMAGES.bhKonverMockup,
      icon: Calculator,
      accentBorder: 'border-[#00C9A7]/35 hover:border-[#00C9A7]/70',
      accentText: 'text-[#00C9A7]',
      ctaStyle: 'bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628]'
    },
    {
      id: 'pr-scena-plus',
      badge: t('home.prBoxes.scena.badge', 'DIGITALNI ČITAČ MAGAZINA'),
      title: t('home.prBoxes.scena.title', 'SCENA+ Magazin'),
      desc: t('home.prBoxes.scena.desc', 'Prvo urbano izdanje magazina za Zeničko-dobojski kanton: arheologija, umjetnost, tehnologija i kultura.'),
      cta: t('home.prBoxes.scena.cta', 'Prelistaj SCENA+ Izdanje'),
      url: 'https://canva.link/vxekpnx0ow1xvt9',
      image: IMAGES.scenaCover,
      icon: BookOpen,
      accentBorder: 'border-[#C9A84C]/35 hover:border-[#C9A84C]/70',
      accentText: 'text-[#C9A84C]',
      ctaStyle: 'bg-gradient-to-r from-[#C9A84C] to-[#E5C158] text-[#0A1628]'
    },
    {
      id: 'pr-ornamenti-bosne',
      badge: t('home.prBoxes.ornamenti.badge', 'KULTURNA BAŠTINA • CANVA'),
      title: t('home.prBoxes.ornamenti.title', 'Ornamenti Bosne'),
      desc: t('home.prBoxes.ornamenti.desc', 'Digitalna kolekcija stiliziranih motiva srednjovjekovnih stećaka u SVG, PNG, HTML i CSS formatima.'),
      cta: t('home.prBoxes.ornamenti.cta', 'Pogledaj Ornamenti Bosne'),
      url: 'https://canva.link/8dwxeack5cwn18l',
      image: IMAGES.ornamentiBosne,
      icon: Layers,
      accentBorder: 'border-[#00C9A7]/35 hover:border-[#00C9A7]/70',
      accentText: 'text-[#00C9A7]',
      ctaStyle: 'bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/50 text-[#F5F0E8] hover:text-[#0A1628]'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      <SEOHead
        canonical="https://bh-assistant.ba/"
        ogType="website"
        ogImage="https://i.imgur.com/cXebP1B.jpg"
        ogImageAlt="B&H Assistant d.o.o. Zenica — IT firma i Digital Marketing Zenica"
      />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] min-h-[85dvh] flex items-center pt-24 pb-12 overflow-x-clip">
        <StecakBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Main Typography */}
            <div className="lg:col-span-7 min-w-0 space-y-5 sm:space-y-6 text-left">

              {/* Rebranded Official Company Header & Definition */}
              <div className="inline-flex flex-col gap-1 px-4 py-2.5 rounded-2xl bg-[#0F2038]/95 border border-[#00C9A7]/35 text-[#00C9A7] text-[0.8125rem] sm:text-[0.875rem] font-mono tracking-wide backdrop-blur-md shadow-lg shadow-[#00C9A7]/10 max-w-full">
                <div className="flex items-center gap-2 font-bold uppercase text-[#F5F0E8]">
                  <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-ping shrink-0" />
                  <span>{t('hero.brandHeader', 'B&H ASSISTANT d.o.o.')}</span>
                </div>
                <EditableText
                  contentKey="home.hero.badge"
                  defaultValue={t('hero.badge', 'Nova IT i Digital Marketing firma sa adresom u Zenici!')}
                  as="span"
                  className="text-[#00C9A7] font-semibold leading-snug break-words"
                />
              </div>

              <h1 className="font-syne font-extrabold text-[clamp(1.65rem,2.6vw+0.45rem,2.75rem)] text-[#F5F0E8] leading-[1.18] tracking-tight uppercase break-words">
                <span className="block">{t('hero.title1', 'Digitalna rješenja')}</span>
                <span className="block mt-1 sm:mt-1.5">
                  <span className="text-[#00C9A7] mr-2">{t('hero.title2', 'za')}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] inline">
                    {t('hero.title3', 'Bosnu i Hercegovinu')}
                  </span>
                </span>
              </h1>

              {/* Slogan Entrance Animation: Fade in & slide up gracefully */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0F2038]/90 border border-[#C9A84C]/50 text-[#C9A84C] text-[0.75rem] sm:text-[0.875rem] font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#C9A84C]/5 backdrop-blur-md max-w-full"
              >
                <Sparkles className="w-4 h-4 text-[#00C9A7] shrink-0 animate-pulse" />
                <EditableText
                  contentKey="home.hero.motto"
                  defaultValue={t('hero.motto', 'SPAJAMO KULTURE - STVARAMO ŠANSE')}
                  as="span"
                  className="break-words"
                />
              </motion.div>

              <EditableText
                contentKey="home.hero.subtitle"
                defaultValue={t(
                  'hero.subtitle',
                  'B&H Assistant d.o.o. iz Zenice spaja napredne IT tehnologije sa stvarnim preprekama u bh. društvu, gradeći digitalna rješenja za realne administrativne, edukativne i ekonomske izazove.\n\nKao mlada IT kompanija, cilj nam je da popunimo prazan prostor u domaćem sektoru kreirajući visokokorisne, isplative digitalne platforme i alate koji olakšavaju svakodnevicu građana i poslovanje firmi.'
                )}
                as="p"
                multiline={true}
                className="text-[#F5F0E8]/80 text-[1rem] sm:text-[1.125rem] max-w-2xl font-sans leading-relaxed whitespace-pre-line"
              />

              {/* Primary Action Buttons: Stack cleanly on mobile with minimum 48px touch targets */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2"
              >
                <Link
                  to="/proizvodi-i-usluge"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-bold text-[0.8125rem] sm:text-[0.875rem] tracking-wide shadow-xl shadow-[#00C9A7]/25 hover:shadow-[#00C9A7]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <span>{t('hero.btnTools', 'Istraži Digitalne Alate')}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

                <Link
                  to="/o-nama"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8] font-syne font-bold text-[0.8125rem] sm:text-[0.875rem] tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <Tv className="w-4 h-4 text-[#00C9A7] shrink-0" />
                  <span>{t('home.btnVideoAbout', 'Video Prezentacija & O Nama')}</span>
                </Link>

                <button
                  type="button"
                  onClick={onOpenBojanka}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-[0.8125rem] sm:text-[0.875rem] tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{t('home.btnDownloadBojanka', 'Preuzmi Bojanku Gummi (PDF)')}</span>
                </button>
              </motion.div>

              {/* Legal Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.75rem] font-mono text-[#F5F0E8]/60 border-t border-[#1A3152]/60">
                <span className="flex items-center gap-1.5 text-[#00C9A7]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> JIB: {COMPANY_INFO.jib}
                </span>
                <span>MBS: {COMPANY_INFO.mbs}</span>
                <span>{COMPANY_INFO.city} 72000</span>
              </div>

            </div>

            {/* Right Interactive Carousel Preview */}
            <div className="lg:col-span-5 relative w-full min-w-0">
              <div
                className="relative mx-auto max-w-md lg:max-w-none w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00C9A7] via-[#C9A84C] to-[#00C9A7] rounded-3xl blur-xl opacity-30 animate-glow-shift" />

                <div className="relative rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 p-5 sm:p-6 shadow-2xl space-y-4 overflow-hidden">
                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152]">
                    <div
                      key={heroSlide}
                      className="h-full bg-gradient-to-r from-[#00C9A7] to-[#C9A84C] animate-[progress_5s_linear]"
                      style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-[#1A3152] pb-3 pt-1">
                    <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-mono font-bold uppercase border truncate ${activeHeroSlide.badgeColor}`}>
                      {activeHeroSlide.badge}
                    </span>
                    <span className="text-[0.7rem] font-mono text-[#F5F0E8]/50 shrink-0">
                      {heroSlide + 1} / {heroSlides.length}
                    </span>
                  </div>

                  {/* Image container */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video group">
                    <SafeImage
                      src={activeHeroSlide.image}
                      alt={activeHeroSlide.title}
                      fallbackTitle={activeHeroSlide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <p className="font-syne font-bold text-[1.125rem] text-[#F5F0E8]">
                      {activeHeroSlide.title}
                    </p>
                    <p className="text-[0.75rem] text-[#00C9A7] font-mono mb-1">
                      {activeHeroSlide.motto}
                    </p>
                    <p className="text-[0.75rem] text-[#F5F0E8]/70 line-clamp-2 leading-relaxed">
                      {activeHeroSlide.description}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    {activeHeroSlide.isExternal ? (
                      <a
                        href={activeHeroSlide.linkTo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-[0.75rem] shadow-md transition-colors min-h-[44px] touch-manipulation"
                      >
                        <span>{activeHeroSlide.linkText}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ) : (
                      <Link
                        to={activeHeroSlide.linkTo}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-[0.75rem] shadow-md transition-colors min-h-[44px] touch-manipulation"
                      >
                        {activeHeroSlide.linkText}
                      </Link>
                    )}

                    <div className="flex items-center gap-1">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setHeroSlide(idx)}
                          className="min-h-[44px] min-w-[28px] flex items-center justify-center touch-manipulation"
                          aria-label={`Slide ${idx + 1}`}
                        >
                          <span
                            className={`block h-2.5 rounded-full transition-all ${
                              heroSlide === idx ? 'bg-[#00C9A7] w-6' : 'bg-[#1A3152] hover:bg-[#00C9A7]/50 w-2.5'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AFFILIATE PARTNER BANNER CAROUSEL (15s right-to-left) */}
      <AffiliateBannerCarousel />

      {/* 3. CORE PILLARS & FAST NAVIGATION HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-[0.75rem] font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t('home.sections.badge', 'ISTRAŽITE NAŠE SEKCIJE')}</span>
          </div>
          <h2 className="font-syne font-extrabold text-[clamp(1.6rem,2.5vw+0.5rem,2.25rem)] text-[#F5F0E8] tracking-tight uppercase">
            {t('home.sections.title', 'Ekosistem B&H Assistant')}
          </h2>
          <p className="text-[0.875rem] sm:text-[1rem] text-[#F5F0E8]/70">
            {t('home.sections.subtitle', 'Odaberite oblast i posjetite zasebnu stranicu sa kompletnim alatima, interaktivnim funkcijama i multimedijalnim sadržajima.')}
          </p>
        </div>

        {/* 4 Core Pillars + Featured PR & Quick Link Block ("Besplatni digitalni proizvodi") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="group relative rounded-3xl bg-[#0F2038]/90 border border-[#1A3152] hover:border-[#00C9A7]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00C9A7]/10"
              >
                <div className="space-y-4">
                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#1A3152] text-[#00C9A7] group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[0.6875rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C] text-right">
                      {p.badge}
                    </span>
                  </div>

                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video">
                    <SafeImage
                      src={p.image}
                      alt={p.title}
                      fallbackTitle={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="font-syne font-bold text-[1.125rem] text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[0.75rem] font-mono text-[#00C9A7] mb-1">
                      {p.subtitle}
                    </p>
                    <p className="text-[0.8125rem] text-[#F5F0E8]/75 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Link CTA */}
                <div className="pt-5 mt-4 border-t border-[#1A3152]/60 flex items-center gap-2">
                  <Link
                    to={p.link}
                    className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[0.75rem] font-syne font-bold text-[#F5F0E8] hover:text-[#0A1628] transition-all group-hover:shadow-md min-h-[44px] touch-manipulation"
                  >
                    <span>{t('home.openPage', 'Otvori Stranicu')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* PR I BRZI LINK BLOK: Besplatni digitalni proizvodi */}
          <div className="md:col-span-2 lg:col-span-2 group relative rounded-3xl bg-gradient-to-br from-[#0F2038]/95 via-[#132948]/95 to-[#0A1628]/95 border border-[#00C9A7]/35 hover:border-[#00C9A7]/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00C9A7]/15 overflow-hidden">
            {/* Ambient Highlight Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
              {/* Left Visual Column */}
              <div className="lg:col-span-5">
                <Link
                  to="/proizvodi-i-usluge#besplatni-proizvodi"
                  className="block relative rounded-2xl overflow-hidden border border-[#1A3152] group-hover:border-[#00C9A7]/50 bg-[#0A1628] aspect-video lg:aspect-[4/3] shadow-xl transition-colors"
                >
                  <SafeImage
                    src={IMAGES.besplatniDigitalniProizvodi}
                    alt={t('home.freeProducts.title', 'Besplatni digitalni proizvodi')}
                    fallbackTitle={t('home.freeProducts.title', 'Besplatni digitalni proizvodi')}
                    fallbackSubtitle={t('home.freeProducts.tag', 'Publikacije & Audio Plugini')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0A1628]/90 border border-[#00C9A7]/40 text-[#00C9A7] text-[0.625rem] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
                    {t('home.freeProducts.freeBadge', '100% Besplatno')}
                  </div>
                </Link>
              </div>

              {/* Right Content & CTA Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/35 text-[#00C9A7] text-[0.6875rem] font-mono font-bold uppercase tracking-wider">
                      <Gift className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('home.freeProducts.badge', 'PR & Brzi Pristup Resursima')}</span>
                    </div>
                    <span className="text-[0.625rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C]">
                      {t('home.freeProducts.tag', 'Publikacije & Audio Plugini')}
                    </span>
                  </div>

                  <h3 className="font-syne font-extrabold text-[1.25rem] sm:text-[1.5rem] text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                    {t('home.freeProducts.title', 'Besplatni digitalni proizvodi')}
                  </h3>

                  <p className="text-[0.8125rem] sm:text-[0.875rem] text-[#F5F0E8]/80 leading-relaxed font-sans">
                    {t('home.freeProducts.desc', 'Edukativne publikacije za najmlađe, te profesionalni audio plugini i studijski alati za sve muzičare, producente i kreativce.')}
                  </p>

                  {/* Quick Highlight Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[0.6875rem] font-mono text-[#F5F0E8]/75">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0A1628]/80 border border-[#1A3152]">
                      {t('home.freeProducts.tag1', 'Bojanka GUMMI (PDF)')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0A1628]/80 border border-[#1A3152]">
                      Multiband Delay &amp; FX
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0A1628]/80 border border-[#1A3152]">
                      MTurboDelay VST/AU/AAX
                    </span>
                  </div>
                </div>

                {/* CTA Buttons & Direct Link */}
                <div className="pt-4 border-t border-[#1A3152]/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to="/proizvodi-i-usluge#besplatni-proizvodi"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] hover:from-[#00E5BE] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-[0.75rem] tracking-wide shadow-lg shadow-[#00C9A7]/20 hover:shadow-[#00C9A7]/35 transition-all min-h-[44px] touch-manipulation"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>{t('home.freeProducts.cta', 'Preuzmi Besplatne Resurse')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                  </Link>

                  <Link
                    to="/proizvodi-i-usluge#besplatni-proizvodi"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#00C9A7] font-mono text-[0.75rem] font-semibold transition-all min-h-[44px] touch-manipulation"
                    title={t('home.freeProducts.title', 'Besplatni digitalni proizvodi')}
                  >
                    <span>{t('home.freeProducts.quickLink', 'Brzi Link')}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFICIAL PR BOXES WITH DIRECT EXTERNAL URLS (BH KONVER, SCENA+, ORNAMENTI BOSNE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2038] border border-[#C9A84C]/35 text-[#C9A84C] text-[0.75rem] font-mono tracking-wider uppercase">
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>{t('home.prBoxes.badge', 'ZVANIČNI PR BOKSOVI & DIREKTNI LINKOVI')}</span>
          </div>
          <h2 className="font-syne font-extrabold text-[clamp(1.5rem,2.2vw+0.5rem,2.125rem)] text-[#F5F0E8] tracking-tight uppercase">
            {t('home.prBoxes.title', 'Istaknuti Projekti & Publikacije')}
          </h2>
          <p className="text-[0.875rem] sm:text-[1rem] text-[#F5F0E8]/70">
            {t('home.prBoxes.subtitle', 'Direktan pristup zvaničnim web aplikacijama i digitalnim izdanjima platforme B&H Assistant d.o.o. Zenica.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directPrBoxes.map((box) => {
            const BoxIcon = box.icon;
            return (
              <a
                key={box.id}
                href={box.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-3xl bg-[#0F2038]/90 border ${box.accentBorder} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl touch-manipulation`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`p-3 rounded-2xl bg-[#0A1628] border border-[#1A3152] ${box.accentText} group-hover:scale-105 transition-transform shrink-0`}>
                      <BoxIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[0.65rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8]/80 text-right">
                      {box.badge}
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video">
                    <SafeImage
                      src={box.image}
                      alt={box.title}
                      fallbackTitle={box.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="font-syne font-bold text-[1.125rem] text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors flex items-center justify-between gap-2">
                      <span>{box.title}</span>
                      <ExternalLink className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
                    </h3>
                    <p className="text-[0.8125rem] text-[#F5F0E8]/75 leading-relaxed mt-1.5">
                      {box.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#1A3152]/60">
                  <span className={`w-full inline-flex items-center justify-between px-4 py-3 rounded-xl font-syne font-bold text-[0.75rem] shadow-md transition-all min-h-[44px] ${box.ctaStyle}`}>
                    <span>{box.cta}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. DEDICATED FEATURE: USLUGA PO MJERI > SPECIJALNA PONUDA */}
      <SpecialOfferSection />

      {/* 6. PROMO CAROUSEL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBannerCarousel onOpenBojanka={onOpenBojanka} />
      </section>

      {/* 7. COMPANY REGISTRY TEASER (kompletni trust blok je na /o-nama) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#1A3152] border border-[#00C9A7]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left items-center">

            <div className="space-y-2 md:col-span-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-[0.6875rem] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t('home.trust.badge', 'Zvanični Podaci')}</span>
              </div>
              <h2 className="font-syne font-extrabold text-[1.5rem] text-[#F5F0E8]">
                B&amp;H Assistant
              </h2>
              <p className="text-[0.75rem] text-[#F5F0E8]/70">
                {t('home.trust.entity', 'Pravni subjekt registrovan u Zenici, ZDK.')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1628]/60 border border-[#1A3152] space-y-1">
              <span className="text-[0.6875rem] font-mono text-[#C9A84C] uppercase">{t('home.trust.jibLabel', 'Jedinstveni ID Broj')}</span>
              <p className="font-mono font-bold text-[1rem] text-[#F5F0E8]">{COMPANY_INFO.jib}</p>
              <span className="text-[0.625rem] text-[#F5F0E8]/50 block">{t('home.trust.taxAuth', 'Poreska Uprava FBiH')}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1628]/60 border border-[#1A3152] space-y-1">
              <span className="text-[0.6875rem] font-mono text-[#00C9A7] uppercase">{t('home.trust.mbsLabel', 'Matični Broj Subjekta')}</span>
              <p className="font-mono font-bold text-[1rem] text-[#F5F0E8]">{COMPANY_INFO.mbs}</p>
              <span className="text-[0.625rem] text-[#F5F0E8]/50 block">{t('home.trust.court', 'Općinski Sud Zenica')}</span>
            </div>

          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1A3152]">
            <p className="text-[0.75rem] text-[#F5F0E8]/60 text-center sm:text-left">
              {t('home.trust.entity', 'Pravni subjekt registrovan u Zenici, ZDK.')}
            </p>
            <Link
              to="/o-nama"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-[0.75rem] shadow-lg transition-colors min-h-[44px] touch-manipulation"
            >
              <span>{t('home.trust.bizPlanLink', 'O Nama & Registarski Podaci')}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
