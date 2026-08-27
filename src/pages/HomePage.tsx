import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { StecakBackground } from '../components/StecakBackground';
import { PromoBannerCarousel } from '../components/PromoBannerCarousel';
import { PartnersAffiliatesSection } from '../components/PartnersAffiliatesSection';
import { NativeCommercialBanner } from '../components/NativeCommercialBanner';
import { SafeImage } from '../components/SafeImage';
import { IMAGES } from '../utils/images';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../data/companyData';
import {
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
  Cpu,
  Compass,
  CheckCircle2,
  Tv,
  Briefcase,
  Layers,
  GraduationCap,
  ShieldCheck,
  Building2,
  Mail,
  ChevronRight,
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  onOpenBojanka: () => void;
  onOpenAdmin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBojanka, onOpenAdmin }) => {
  const { t } = useLanguage();
  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showDetailedLegal, setShowDetailedLegal] = useState(false);

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
      linkTo: '/o-nama',
      linkText: t('hero.slide.brand.btn', 'Upoznaj Firmu & Video →')
    },
    {
      type: 'tool',
      badge: t('hero.slide.konver.badge', 'PRVI BH ALAT • FINANSIJE'),
      badgeColor: 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]',
      title: 'BH KONVER',
      motto: t('hero.slide.konver.motto', 'Sistem za konverziju i pravne izjave'),
      description: t('hero.slide.konver.desc', 'Brzi i precizni bh. digitalni kalkulator i konverter valuta, jedinica i kreiranje pravnih izjava pod materijalnom odgovornošću.'),
      image: IMAGES.bhKonverMockup,
      tags: ['Konverzija', 'Pravne Izjave', 'PDF Izvoz'],
      linkTo: '/alati',
      linkText: t('hero.slide.konver.btn', 'Otvori BH Konver →')
    },
    {
      type: 'magazine',
      badge: t('hero.slide.scena.badge', 'SCENA+ MAGAZIN • ZDK'),
      badgeColor: 'bg-[#C9A84C]/20 border-[#C9A84C]/40 text-[#C9A84C]',
      title: t('hero.slide.scena.title', 'SCENA+ Magazin'),
      motto: t('hero.slide.scena.motto', 'Spajamo kulture - stvaramo šanse'),
      description: t('hero.slide.scena.desc', 'Prvo fizičko i e-izdanje urbanog magazina sa pričama o bh. arheologiji, umjetnosti, BCX kriptu i craft pivarstvu.'),
      image: IMAGES.scenaCover,
      tags: ['Urbana Kultura', 'Umjetnost', 'Print & Digital'],
      linkTo: '/scena-magazin',
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
      tags: ['Stećci', 'Vektori (SVG/PNG)', 'USB Dostava'],
      linkTo: '/alati',
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
      id: 'alati',
      title: t('home.pillar.alati.title', 'BH Digitalni Alati'),
      subtitle: t('home.pillar.alati.subtitle', '3 Autorska Softvera'),
      desc: t('home.pillar.alati.desc', 'BH Konver (konverzije i pravne izjave), BH PapirFinder (baza e-uprave) i Ornamenti Bosne (kodirani stećci).'),
      icon: Compass,
      image: IMAGES.bhKonverMockup,
      badge: t('home.pillar.alati.badge', 'Softver & Web'),
      color: 'from-[#00C9A7]/20 to-[#00C9A7]/5 border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/alati'
    },
    {
      id: 'scena',
      title: t('home.pillar.scena.title', 'Magazin SCENA+'),
      subtitle: t('home.pillar.scena.subtitle', 'Urbano Izdanje ZDK'),
      desc: t('home.pillar.scena.desc', 'Autorski tekstovi o arheologiji stećaka, BCX kripto tehnologijama, zanatskom pivarstvu i kulturi.'),
      icon: BookOpen,
      image: IMAGES.scenaCover,
      badge: t('home.pillar.scena.badge', 'Izdavaštvo'),
      color: 'from-[#C9A84C]/20 to-[#C9A84C]/5 border-[#C9A84C]/40 text-[#C9A84C]',
      link: '/scena-magazin'
    },
    {
      id: 'onama',
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
      id: 'projekti',
      title: t('home.pillar.projekti.title', 'Projekti & Bojanka'),
      subtitle: t('home.pillar.projekti.subtitle', 'ZENTAXI & GUMMI'),
      desc: t('home.pillar.projekti.desc', 'Investicijski projekti, saradnja za partnere i besplatna edukativna bojanka Gummi za djecu i škole.'),
      icon: Sparkles,
      image: IMAGES.gummiBojanka,
      badge: t('home.pillar.projekti.badge', 'Društvena Odgovornost'),
      color: 'from-[#C9A84C]/20 to-[#0F2038] border-[#C9A84C]/40 text-[#C9A84C]',
      link: '/projekti'
    },
    {
      id: 'novosti',
      title: t('home.pillar.novosti.title', 'Novosti & CMS Obavijesti'),
      subtitle: t('home.pillar.novosti.subtitle', 'Zvanična Saopštenja'),
      desc: t('home.pillar.novosti.desc', 'Pratite novosti o razvoju kompanije, medijskim nastupima, novim alatima i događajima.'),
      icon: Layers,
      image: IMAGES.bravoWinner,
      badge: t('home.pillar.novosti.badge', 'Press & Media'),
      color: 'from-[#00C9A7]/20 to-[#0A1628] border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/novosti'
    },
    {
      id: 'shop',
      title: t('home.pillar.shop.title', 'Shop & Edukacija'),
      subtitle: t('home.pillar.shop.subtitle', 'Alison Besplatni Kursevi'),
      desc: t('home.pillar.shop.desc', 'Pristupite 100% besplatnim sertifikovanim IT kursevima, remote IT poslovima i AI platformama.'),
      icon: GraduationCap,
      image: IMAGES.alisonLogo,
      badge: t('home.pillar.shop.badge', 'Edukativni Centar'),
      color: 'from-[#00C9A7]/20 to-[#C9A84C]/10 border-[#00C9A7]/40 text-[#00C9A7]',
      link: '/shop'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
        <StecakBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Main Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-[#00C9A7]/10">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-ping" />
                <span>{t('hero.badge', 'PRVA SOFTVERSKA I IZDAVAČKA KUĆA U ZENICI')}</span>
              </div>

              <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E8] leading-[1.15] tracking-tight uppercase">
                {t('hero.title1', 'Digitalna rješenja')} <br />
                <span className="text-[#00C9A7]">{t('hero.title2', 'za')}</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C]">
                  {t('hero.title3', 'Bosnu i Hercegovinu')}
                </span>
              </h1>

              <p className="text-[#F5F0E8]/80 text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
                {t('hero.subtitle', 'B&H Assistant d.o.o. Zenica spaja moderne IT tehnologije, besplatne alate za bh. građane, urbani magazin SCENA+ i kulturnu baštinu stećaka u jedinstven ekosistem.')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/alati"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#00C9A7]/25 hover:shadow-[#00C9A7]/40 hover:scale-[1.02] transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t('hero.btnTools', 'Istraži Digitalne Alate')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/o-nama"
                  className="px-5 py-3 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8] font-syne font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <Tv className="w-4 h-4 text-[#00C9A7]" />
                  <span>{t('home.btnVideoAbout', 'Video Prezentacija & O Nama')}</span>
                </Link>

                <button
                  onClick={onOpenBojanka}
                  className="px-4 py-3 rounded-xl bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('home.btnDownloadBojanka', 'Preuzmi Bojanku Gummi (PDF)')}</span>
                </button>
              </div>

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
            <div className="lg:col-span-5 relative">
              <div
                className="relative mx-auto max-w-md lg:max-w-none"
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

      {/* 2. PROMINENT VERIFIED PARTNER (TOUCH E-COMMERCE HIGHLIGHT) */}
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

        {/* 6 Grid Cards */}
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
                <div className="pt-5 mt-4 border-t border-[#1A3152]/60">
                  <Link
                    to={p.link}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-xs font-syne font-bold text-[#F5F0E8] hover:text-[#0A1628] transition-all group-hover:shadow-md"
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

      {/* 3. PROMO CAROUSEL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBannerCarousel onOpenBojanka={onOpenBojanka} />
      </section>

      {/* 4. PREPORUČENI PARTNERI & GLOBALNE POGODNOSTI (AFFILIATE HUB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnersAffiliatesSection />
      </section>

      {/* 5. COMPANY STATS & TRUST BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#1A3152] border border-[#00C9A7]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left items-center">
            
            <div className="space-y-2 md:col-span-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
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

            <div className="flex flex-col gap-2.5 justify-center">
              <Link
                to="/kontakt"
                className="w-full text-center px-4 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs shadow-lg transition-colors min-h-[44px] flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{t('home.trust.contactBtn', 'Kontaktirajte Nas')}</span>
              </Link>
              <button
                onClick={() => setShowDetailedLegal(!showDetailedLegal)}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#00C9A7] font-mono font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{showDetailedLegal ? 'Sakrij Bankovne Račune ▲' : 'Svi Registarski & Bankovni Podaci ▼'}</span>
              </button>
            </div>

          </div>

          {/* Expandable Detailed Legal Registry & Banking Section */}
          {showDetailedLegal && (
            <div className="mt-8 pt-6 border-t border-[#1A3152] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-[#0A1628]/80 border border-[#1A3152]">
                <span className="text-[#F5F0E8]/40 block text-[10px] uppercase">Glavni Transakcijski Račun</span>
                <span className="text-[#00C9A7] font-bold text-sm block mt-0.5">1610000305820078</span>
                <span className="text-[10px] text-[#F5F0E8]/60">Raiffeisen Bank d.d. BiH</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628]/80 border border-[#1A3152]">
                <span className="text-[#F5F0E8]/40 block text-[10px] uppercase">Puno Registrovano Ime</span>
                <span className="text-[#F5F0E8] font-bold block mt-0.5">B&H ASSISTANT d.o.o. Zenica</span>
                <span className="text-[10px] text-[#F5F0E8]/60">Društvo sa ograničenom odgovornošću</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628]/80 border border-[#1A3152]">
                <span className="text-[#F5F0E8]/40 block text-[10px] uppercase">Zvanično Sjedište</span>
                <span className="text-[#F5F0E8] font-bold block mt-0.5">{COMPANY_INFO.address}</span>
                <span className="text-[10px] text-[#F5F0E8]/60">{COMPANY_INFO.city}, {COMPANY_INFO.postalCode}, BiH</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628]/80 border border-[#1A3152]">
                <span className="text-[#F5F0E8]/40 block text-[10px] uppercase">Bonitet & Verifikacija</span>
                <span className="text-[#C9A84C] font-bold block mt-0.5">CompanyWall Rejting</span>
                <span className="text-[10px] text-[#00C9A7]">Verifikovan Poslovni Subjekt</span>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default HomePage;
