import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { StecakBackground } from '../components/StecakBackground';
import { PromoBannerCarousel } from '../components/PromoBannerCarousel';
import { SpecialOfferSection } from '../components/SpecialOfferSection';
import { NativeCommercialBanner } from '../components/NativeCommercialBanner';
import { SafeImage } from '../components/SafeImage';
import { IMAGES } from '../utils/images';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../data/companyData';
import { SEOHead } from '../components/SEOHead';
import { PageSeo } from '../components/PageSeo';
import { EditableText } from '../components/cms/EditableText';
import { EditableImage } from '../components/cms/EditableImage';
import {
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
  Cpu,
  Compass,
  CheckCircle2,
  Tv,
  Layers,
  Briefcase
} from 'lucide-react';

interface HomePageProps {
  onOpenBojanka: () => void;
  onOpenAdmin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBojanka, onOpenAdmin: _onOpenAdmin }) => {
  const { t } = useLanguage();
  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      type: 'brand',
      badge: t('hero.slide.brand.badge', 'B&H ASSISTANT d.o.o.'),
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: t('hero.slide.brand.title', 'B&H ASSISTANT d.o.o.'),
      motto: t('hero.slide.brand.motto', COMPANY_INFO.motto),
      description: t('hero.slide.brand.desc', 'Inovativni bh. digitalni ekosistem sa sjedištem u Zenici. Spajamo tehnološki napredak, kulturnu baštinu i društvenu odgovornost.'),
      image: IMAGES.logo,
      tags: ['BH KONVER', 'PAPIRFINDER', 'ORNAMENTI'],
      linkTo: '/o-nama',
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
      tags: ['Konverzija', 'Pravne Izjave', 'PDF Izvoz'],
      linkTo: '/proizvodi-i-usluge',
      linkText: t('hero.slide.konver.btn', 'Otvori BH Konver →')
    },
    {
      type: 'magazine',
      badge: t('hero.slide.scena.badge', 'NOVOSTI & CMS • ZDK'),
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.scena.title', 'Novosti & CMS'),
      motto: t('hero.slide.scena.motto', 'Spajamo kulture - stvaramo šanse'),
      description: t('hero.slide.scena.desc', 'Zvanična saopštenja, novosti i CMS obavijesti iz B&H Assistant d.o.o. Zenica, grupa SCENA+ magazin i kulturne priče ZDK.'),
      image: IMAGES.scenaCover,
      tags: ['Urbana Kultura', 'Umjetnost', 'Print & Digital'],
      linkTo: '/novosti',
      linkText: t('hero.slide.scena.btn', 'Pročitaj Novosti →')
    },
    {
      type: 'heritage',
      badge: t('hero.slide.stecak.badge', 'KULTURNA BAŠTINA • USB DOSTAVA'),
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.stecak.title', 'Ornamenti Bosne'),
      motto: t('hero.slide.stecak.motto', 'Digitalna Kolekcija Motiva sa Stećaka (I. Izdanje 2026)'),
      description: t('hero.slide.stecak.desc', 'Stilizirani motivi bh. baštine kodirani u SVG, PNG, HTML i CSS. Jedini digitalni proizvod sa dostavom na USB sticku i plaćanjem pouzećem.'),
      image: IMAGES.ornamentiBosne,
      tags: ['Stećci', 'Vektori (SVG/PNG)', 'USB Dostava'],
      linkTo: '/proizvodi-i-usluge',
      linkText: t('hero.slide.stecak.btn', 'Detalji i Narudžba →')
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const activeHeroSlide = heroSlides[heroSlide];

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
      color: 'from-[#00C9A7]/20 to-[#00C9A7]/5 border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/proizvodi-i-usluge'
    },
    {
      id: 'pillar-scena',
      title: t('nav.novosti', 'Novosti & CMS'),
      subtitle: t('home.pillar.scena.subtitle', 'Zvanična Saopštenja & SCENA+'),
      desc: t('home.pillar.scena.desc', 'Novosti o razvoju kompanije, medijskim nastupima i kulturnim temama SCENA+ magazina ZDK.'),
      icon: BookOpen,
      image: IMAGES.scenaCover,
      badge: 'Press & Media',
      color: 'from-[#C9A84C]/20 to-[#C9A84C]/5 border-[#C9A84C]/40 text-[#C9A84C]',
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
      color: 'from-[#00C9A7]/20 to-[#0F2038] border-[#00C9A7]/40 text-[#00C9A7]',
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
      color: 'from-[#00C9A7]/20 to-[#0F2038] border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/proizvodi-i-usluge'
    },
    {
      id: 'pillar-novosti',
      title: t('home.pillar.novosti.title', 'Novosti & CMS Obavijesti'),
      subtitle: t('home.pillar.novosti.subtitle', 'Zvanična Saopštenja'),
      desc: t('home.pillar.novosti.desc', 'Pratite novosti o razvoju kompanije, medijskim nastupima, novim alatima i događajima.'),
      icon: Layers,
      image: IMAGES.ourProducts,
      badge: t('home.pillar.novosti.badge', 'Press & Media'),
      color: 'from-[#00C9A7]/20 to-[#0A1628] border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/novosti'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      <SEOHead
        title="B&H Assistant d.o.o. Zenica | Spajamo Kulture, Stvaramo Šanse"
        description="Zvanična web platforma IT firme B&H Assistant d.o.o. Zenica. Istražite domaće digitalne alate BH Konver i BH PapirFinder, magazin SCENA+ i IT projekte."
        canonical="https://bh-assistant.ba/"
        ogType="website"
        ogImage="https://i.imgur.com/cXebP1B.jpg"
        ogImageAlt="B&H Assistant d.o.o. Zenica — Logo i brend"
      />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] min-h-[85dvh] flex items-center pt-24 pb-12 overflow-x-clip">
        <StecakBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Main Typography */}
            <div className="lg:col-span-7 min-w-0 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-[#00C9A7]/10">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-ping" />
                <EditableText
                  contentKey="home.hero.badge"
                  defaultValue={t('hero.badge', 'PRVA SOFTVERSKA I IZDAVAČKA KUĆA U ZENICI')}
                  as="span"
                />
              </div>

              <h1 className="font-syne font-extrabold text-[clamp(1.6rem,2.4vw+0.25rem,2.35rem)] xl:text-[2.65rem] text-[#F5F0E8] leading-[1.18] tracking-tight uppercase break-normal">
                <span className="block">{t('hero.title1', 'Digitalna rješenja')}</span>
                <span className="block mt-1 sm:mt-1.5">
                  <span className="text-[#00C9A7] mr-2">{t('hero.title2', 'za')}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] inline-block">
                    <span className="inline-block whitespace-nowrap">Bosnu i</span>{' '}
                    <span className="inline-block whitespace-nowrap">Hercegovinu</span>
                  </span>
                </span>
              </h1>

              {/* Slogan Entrance Animation: Fade in & slide up gracefully */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0F2038]/90 border border-[#C9A84C]/50 text-[#C9A84C] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#C9A84C]/5 backdrop-blur-md max-w-full overflow-hidden text-ellipsis"
              >
                <Sparkles className="w-4 h-4 text-[#00C9A7] shrink-0 animate-pulse" />
                <EditableText
                  contentKey="home.hero.motto"
                  defaultValue={t('hero.motto', 'SPAJAMO KULTURE - STVARAMO ŠANSE')}
                  as="span"
                />
              </motion.div>

              <EditableText
                contentKey="home.hero.subtitle"
                defaultValue={t('hero.subtitle', 'B&H Assistant d.o.o. Zenica spaja moderne IT tehnologije, besplatne alate za bh. građane, urbani magazin SCENA+ i kulturnu baštinu stećaka u jedinstven ekosistem.')}
                as="p"
                multiline={true}
                className="text-[#F5F0E8]/80 text-base sm:text-lg max-w-2xl font-sans leading-relaxed"
              />

              {/* Primary Action Buttons: Stack cleanly on mobile with minimum 48px touch targets */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <Link
                  to="/proizvodi-i-usluge"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#00C9A7]/25 hover:shadow-[#00C9A7]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <span>{t('hero.btnTools', 'Istraži Proizvode i Usluge')}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

                <Link
                  to="/o-nama"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8] font-syne font-bold text-xs sm:text-sm tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <Tv className="w-4 h-4 text-[#00C9A7] shrink-0" />
                  <span>{t('home.btnVideoAbout', 'Video Prezentacija & O Nama')}</span>
                </Link>

                <button
                  onClick={onOpenBojanka}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-xs sm:text-sm tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{t('home.btnDownloadBojanka', 'Preuzmi Bojanku Gummi (PDF)')}</span>
                </button>
              </motion.div>

              {/* Legal Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#F5F0E8]/60 border-t border-[#1A3152]/60">
                <span className="flex items-center gap-1.5 text-[#00C9A7]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> JIB: {COMPANY_INFO.jib}
                </span>
                <span>MBS: {COMPANY_INFO.mbs}</span>
                <span>{COMPANY_INFO.city} 72000</span>
              </div>

            </div>

            {/* Right Interactive Carousel Preview */}
            <div className="lg:col-span-5 relative w-full">
              <div
                className="relative mx-auto max-w-md lg:max-w-none w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00C9A7] via-[#C9A84C] to-[#00C9A7] rounded-3xl blur-xl opacity-30 animate-glow-shift" />

                <div className="relative rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 p-6 shadow-2xl space-y-4 overflow-hidden">
                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152]">
                    <div
                      key={heroSlide}
                      className="h-full bg-gradient-to-r from-[#00C9A7] to-[#C9A84C] animate-[progress_5s_linear]"
                      style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b border-[#1A3152] pb-3 pt-1">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${activeHeroSlide.badgeColor}`}>
                      {activeHeroSlide.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#F5F0E8]/50">
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
                    <h3 className="font-syne font-bold text-lg text-[#F5F0E8]">
                      {activeHeroSlide.title}
                    </h3>
                    <p className="text-xs text-[#00C9A7] font-mono mb-1">
                      {activeHeroSlide.motto}
                    </p>
                    <p className="text-xs text-[#F5F0E8]/70 line-clamp-2">
                      {activeHeroSlide.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      to={activeHeroSlide.linkTo}
                      className="px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs shadow-md transition-colors"
                    >
                      {activeHeroSlide.linkText}
                    </Link>

                    <div className="flex items-center gap-1">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroSlide(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            heroSlide === idx ? 'bg-[#00C9A7] w-6' : 'bg-[#1A3152] hover:bg-[#00C9A7]/50'
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SLUŽBENE OBJAVE & ISTAKNUTI BANERI (ČESTITKA ZMAJEVIMA & BH DIGITALNI ALATI) */}
      <NativeCommercialBanner />

      {/* 3. CORE PILLARS & FAST NAVIGATION HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('home.sections.badge', 'ISTRAŽITE NAŠE SEKCIJE')}</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight uppercase">
            {t('home.sections.title', 'Ekosistem B&H Assistant')}
          </h2>
          <p className="text-sm text-[#F5F0E8]/70">
            {t('home.sections.subtitle', 'Odaberite oblast i posjetite zasebnu stranicu sa kompletnim alatima, interaktivnim funkcijama i multimedijalnim sadržajima.')}
          </p>
        </div>

        {/* 5 Grid Cards */}
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
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#1A3152] text-[#00C9A7] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C]">
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
                    <h3 className="font-syne font-bold text-lg text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00C9A7] mb-1">
                      {p.subtitle}
                    </p>
                    <p className="text-xs text-[#F5F0E8]/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Link CTA */}
                <div className="pt-5 mt-4 border-t border-[#1A3152]/60 flex items-center gap-2">
                  <Link
                    to={p.link}
                    className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-xs font-syne font-bold text-[#F5F0E8] hover:text-[#0A1628] transition-all group-hover:shadow-md"
                  >
                    <span>{t('home.openPage', 'Otvori Stranicu')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DEDICATED FEATURE: USLUGA PO MJERI > SPECIJALNA PONUDA */}
      <SpecialOfferSection />

      {/* 4. PROMO CAROUSEL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBannerCarousel onOpenBojanka={onOpenBojanka} />
      </section>

      {/* 5. DYNAMIC NEWSFEED (IT Trends, Company Achievements & Community Events) */}
      {/* NewsFeed je premješten na /novosti (NewsPage) — na homepageu ostaje samo link ka stranici */}

      {/* 6. COMPANY REGISTRY TEASER (kompletni trust blok je na /o-nama) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#1A3152] border border-[#00C9A7]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left items-center">

            <div className="space-y-2 md:col-span-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('home.trust.badge', 'Zvanični Podaci')}</span>
              </div>
              <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8]">
                B&H Assistant
              </h3>
              <p className="text-xs text-[#F5F0E8]/70">
                {t('home.trust.entity', 'Pravni subjekt registrovan u Zenici, ZDK.')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1628]/60 border border-[#1A3152] space-y-1">
              <span className="text-[11px] font-mono text-[#C9A84C] uppercase">{t('home.trust.jibLabel', 'Jedinstveni ID Broj')}</span>
              <p className="font-mono font-bold text-base text-[#F5F0E8]">{COMPANY_INFO.jib}</p>
              <span className="text-[10px] text-[#F5F0E8]/50 block">{t('home.trust.taxAuth', 'Poreska Uprava FBiH')}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1628]/60 border border-[#1A3152] space-y-1">
              <span className="text-[11px] font-mono text-[#00C9A7] uppercase">{t('home.trust.mbsLabel', 'Matični Broj Subjekta')}</span>
              <p className="font-mono font-bold text-base text-[#F5F0E8]">{COMPANY_INFO.mbs}</p>
              <span className="text-[10px] text-[#F5F0E8]/50 block">{t('home.trust.court', 'Općinski Sud Zenica')}</span>
            </div>

          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1A3152]">
            <p className="text-xs text-[#F5F0E8]/60 text-center sm:text-left">
              {t('home.trust.entity', 'Pravni subjekt registrovan u Zenici, ZDK.')}            </p>
            <Link
              to="/o-nama"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs shadow-lg transition-colors min-h-[44px]"
            >
              <span>{t('home.trust.bizPlanLink', 'O Nama & Registarski Podaci')}</span>              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
