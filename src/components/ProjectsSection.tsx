import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEVELOPMENT_PROJECTS, COMPANY_SERVICES, DIGITAL_TOOLS } from '../data/companyData';
import { DevelopmentProject, CompanyService } from '../types';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ImageUploadModal } from './ImageUploadModal';
import { getAllCustomImages, onCustomImagesChange } from '../utils/customImagesStorage';
import { getAllCustomContent, onCustomContentChange, ContentOverride } from '../utils/customContentStorage';
import { EditableText } from './cms/EditableText';
import {
  ExternalLink,
  Download,
  Users,
  Handshake,
  Sparkles,
  CheckCircle2,
  Share2,
  Linkedin,
  Facebook,
  Twitter,
  Copy,
  Check,
  Play,
  X,
  FileText,
  Layers,
  Award,
  Target,
  Megaphone,
  Code,
  Globe,
  Compass,
  Zap,
  Smartphone,
  Briefcase,
  ArrowRight,
  Send,
  HelpCircle,
  Camera,
  Archive,
  Image as ImageIcon,
  Server,
  Sliders
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedServices, getLocalizedProjects } from '../data/localizedContent';
import { useAdminAuth } from '../context/AdminAuthContext';

interface ProjectsSectionProps {
  onOpenBojanka: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBojanka }) => {
  const { t, language } = useLanguage();
  const localizedServices = getLocalizedServices(language);
  const localizedProjects = getLocalizedProjects(language);
  const { isAdmin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'usluge' | 'proizvodi' | 'bojanka'>('usluge');
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<DevelopmentProject | null>(null);
  const [selectedService, setSelectedService] = useState<CompanyService | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => getAllCustomImages());
  const [customContent, setCustomContent] = useState<Record<string, ContentOverride>>(() => getAllCustomContent());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [uploadModal, setUploadModal] = useState<{
    isOpen: boolean;
    itemId: string;
    itemTitle: string;
    itemType: 'usluga' | 'proizvod';
    currentImage?: string | null;
  }>({
    isOpen: false,
    itemId: '',
    itemTitle: '',
    itemType: 'usluga',
    currentImage: null
  });

  useEffect(() => {
    const unsubImages = onCustomImagesChange(() => {
      setCustomImages(getAllCustomImages());
    });
    const unsubContent = onCustomContentChange(() => {
      setCustomContent(getAllCustomContent());
    });
    return () => {
      unsubImages();
      unsubContent();
    };
  }, []);

  const showToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => {
      setShareToast(null);
    }, 2600);
  };

  const handleShare = (
    platform: 'linkedin' | 'facebook' | 'twitter' | 'copy',
    project: DevelopmentProject,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const shareUrl = window.location.origin + '/proizvodi-i-usluge';
    const shareText = `${project.title} - ${project.subtitle} | B&H Assistant d.o.o. Zenica`;

    if (platform === 'linkedin') {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
    } else if (platform === 'facebook') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
    } else if (platform === 'twitter') {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
    } else if (platform === 'copy') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
      }
      setCopiedProjectId(project.id);
      showToast(`Link za "${project.title}" je kopiran! 📋`);
      setTimeout(() => {
        setCopiedProjectId(null);
      }, 2500);
    }
  };

  // Helper to map icon names to Lucide icons
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Target':
        return Target;
      case 'Megaphone':
        return Megaphone;
      case 'Code':
        return Code;
      case 'Globe':
        return Globe;
      case 'Compass':
        return Compass;
      case 'Zap':
        return Zap;
      case 'Smartphone':
        return Smartphone;
      case 'Archive':
        return Archive;
      case 'Layers':
      default:
        return Layers;
    }
  };

  // Unsplash stock photos mapped per service (visuals that match the service theme)
  const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
    'lead-generation-target-market-mapping': {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      alt: 'Poslovna analitika i graf networkinga za B2Bリード generisanje',
    },
    'full-cycle-digital-pr-social-media': {
      src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
      alt: 'Digitalni mediji i upravljanje društvenim mrežama',
    },
    'custom-web-digital-tool-setup': {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
      alt: 'Moderni web kod editor i digitalni alat za digitalizaciju',
    },
    'multilingual-content-localization-copywriting': {
      src: 'https://images.unsplash.com/photo-1532876980330-2a317e17818c?q=80&w=1000&auto=format&fit=crop',
      alt: 'Višejezični prevod i globalna komunikacija',
    },
    'digitalizacija-arhive-poslovnih-dokumenata-saas': {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
      alt: 'Digitalizacija arhive i poslovnih dokumenata',
    },
    'web-performance-seo-deep-dive': {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
      alt: 'Web brzina i PageSpeed Lighthouse analiza',
    },
    'custom-mobile-app-development': {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
      alt: 'Mobilna aplikacija na pametnom telefonu',
    },
    'web-to-app-transformation': {
      src: 'https://images.unsplash.com/photo-1460925895917-af9be35fbbf7?q=80&w=1000&auto=format&fit=crop',
      alt: 'Transformacija web sajta u mobilnu PWA aplikaciju',
    },
  };

  return (
    <section id="proizvodi-i-usluge" className="py-20 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* HERO SEKCIJA: REDIZAJNIRANA SA NOVI TEKSTOM */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-20 px-6 rounded-3xl shadow-2xl my-8 border border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-sky-500/20 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" /> B&H Assistant d.o.o. Zenica • Službeni Portfolio
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">
            PROIZVODI &amp; USLUGE B&H Assistant d.o.o.
          </h1>

          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ponuda autorskih i partnerskih softverskih rješenja, B2B/B2G usluga i startnih paketa digitalizacije od <strong className="text-white font-bold">900 KM</strong> za unaprećenje Vašeg rada.
          </p>

          {/* BRZI SKOK NA SEKCIJE */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a href="#usluge-grid" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5">
              Pregledajte Usluge i Proizvode
            </a>
            <a href="https://www.bh-assistant.ba/kontakt" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 transition-all">
              Zatražite Konsultacije
            </a>
          </div>
        </div>
      </section>

      {/* Tab Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0F2038] border border-[#1A3152] gap-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('usluge')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'usluge'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{t('projects.tab.usluge', '8 IT Usluga')}</span>          </button>

          <button
            onClick={() => setActiveTab('proizvodi')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'proizvodi'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{t('projects.tab.proizvodi', 'Naši Proizvodi')}</span>          </button>

          <button
            onClick={() => setActiveTab('bojanka')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'bojanka'
                ? 'bg-[#C9A84C] text-[#0A1628] shadow-lg shadow-[#C9A84C]/20'
                : 'text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t('projects.tab.bojanka', 'Besplatni Digitalni Proizvodi')}</span>
          </button>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: 8 PROFESIONALNIH IT USLUGA B&H ASSISTANT D.O.O.        */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'usluge' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#00C9A7] uppercase tracking-wider block">
                <EditableText
                  contentKey="services.hero.kicker"
                  defaultValue={t('projects.services.kicker', 'Stručne B2B & B2G IT Usluge')}
                  as="span"
                />
              </span>
              <EditableText
                contentKey="services.hero.title"
                defaultValue={t('projects.services.title', 'Kompletna lepeza usluga za digitalni rast Vašeg biznisa')}
                as="h2"
                className="font-syne font-bold text-2xl text-[#F5F0E8]"
              />
              <EditableText
                contentKey="services.hero.desc"
                defaultValue={t('projects.services.desc', 'Od istraživanja tržišta i akvizicije kupaca do namjenskog web razvoja, SEO optimizacije i izrade mobilnih aplikacija.')}
                as="p"
                multiline={true}
                className="text-xs text-[#F5F0E8]/70 font-sans"
              />
            </div>

            <div id="usluge-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {localizedServices.map((serv) => { 
                const IconComponent = getServiceIcon(serv.iconName);
                const customImg = customImages[serv.id];
                const override = customContent[serv.id];
                const isPublished = override?.published !== false;
                if (!isPublished && !isAdmin) return null;
                const displayTitle = override?.title || serv.title;
                const displayShortDesc = override?.shortDescription !== undefined ? override.shortDescription : serv.shortDescription;
                const displayDesc = override?.description || serv.description;

                return (
                  <motion.div
                    key={serv.id}
                    whileHover={{ y: -6, borderColor: 'rgba(0, 201, 167, 0.6)' }}
                    className="p-6 rounded-3xl bg-[#0F2038] border border-[#1A3152] flex flex-col justify-between space-y-5 transition-all shadow-xl group hover:shadow-2xl hover:shadow-[#00C9A7]/10"
                  >
                    <div className="space-y-4">
                      {/* Top Photo / Image Container with Upload Trigger */}
                      <div className="relative w-full h-48 overflow-hidden rounded-xl border border-[#1A3152] bg-[#0A1628] mb-4 group/img">
                        {customImg ? (
                          <img
                            src={customImg}
                            alt={serv.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <>
                            <img
                              src={SERVICE_IMAGES[serv.id]?.src || ''}
                              alt={SERVICE_IMAGES[serv.id]?.alt || `Ilustracija za ${serv.title}`}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                setFailedImages((prev) => new Set([...prev, serv.id]));
                              }}
                            />
                            {/* Fallback icon when Unsplash image fails to load */}
                            {failedImages.has(serv.id) && (
                              <div className="w-full h-48 flex flex-col items-center justify-center p-3 bg-[#0A1628] text-center space-y-1.5">
                                <div className="w-9 h-9 rounded-xl bg-[#0A1628] border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-mono text-[#F5F0E8]/60">
                                  Usluga 0{serv.number} • Foto zona
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Genuine Photo Badge */}
                        {customImg && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                            Originalna foto
                          </span>
                        )}

                        {/* Interactive Upload / Change Photo Button - Visible ONLY to Authenticated Admin */}
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadModal({
                                isOpen: true,
                                itemId: serv.id,
                                itemTitle: `Usluga 0${serv.number}: ${serv.title}`,
                                itemType: 'usluga',
                                currentImage: customImg || null
                              });
                            }}
                            title="Postavite originalnu sliku za ovu uslugu (preporučeno za Google AdSense)"
                            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                          >
                            <Camera className="w-3 h-3" />
                            <span>{customImg ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                          </button>
                        )}
                      </div>

                      {/* Header: Number + Icon */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#0A1628] border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] group-hover:scale-105 transition-transform shadow-md">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C]">
                          0{serv.number}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-syne font-extrabold text-base text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors leading-snug">
                            {displayTitle}
                          </h3>
                          {!isPublished && isAdmin && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                              Nacrt (Skriveno)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-[#C9A84C] mt-0.5">
                          {serv.subtitle}
                        </p>
                      </div>

                      {/* Short Description (Google AdSense & Visitors Quick Scan) */}
                      {displayShortDesc && (
                        <div className="p-2.5 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-xs text-[#00C9A7] font-medium leading-relaxed font-sans">
                          {displayShortDesc}
                        </div>
                      )}

                      {/* Full Detailed Description */}
                      <p className="text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
                        {displayDesc}
                      </p>

                      {/* Engagement Model Badge */}
                      <div className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[11px] font-mono text-[#00C9A7]">
                        <strong className="text-[#F5F0E8]/60 block text-[9.5px] uppercase">Model saradnje:</strong>
                        {serv.model}
                      </div>

                      {/* Key Features List */}
                      {serv.features && (
                        <ul className="space-y-1.5 pt-2 text-[11px] text-[#F5F0E8]/80 font-sans">
                          {serv.features.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-4 border-t border-[#1A3152]/80">
                      <Link
                        to={`/kontakt?usluga=${encodeURIComponent(serv.title)}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center justify-between group-hover:shadow-md"
                      >
                        <span>{t('projects.requestOffer', 'Zatražite Ponudu')}</span>                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct Consultation Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F2038] via-[#1A3152] to-[#0F2038] border-2 border-[#00C9A7]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-wider block">
                  Trebate prilagođeni digitalni paket?
                </span>
                <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8]">
                  {t('projects.consult.title', 'Besplatne konsultacije i specifikacija projekta')}                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/75 font-sans max-w-xl">
                  Kontaktirajte naš tim za besplatnu analizu vašeg poslovanja i preporuku najefikasnijeg modela saradnje.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/kontakt"
                  className="px-6 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wider shadow-lg shadow-[#00C9A7]/20 transition-all hover:scale-105"
                >
                  {t('projects.consult.btn', 'Pošaljite Upit za Uslugu')}                </Link>
                <a
                  href="mailto:info@bh-assistant.ba"
                  className="px-6 py-3 rounded-xl bg-[#0A1628] hover:bg-[#0F2038] border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-xs transition-colors"
                >
                  info@bh-assistant.ba
                </a>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: NAŠI SOFTVERSKI PROIZVODI (BH KONVER, PAPIRFINDER ITD) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'proizvodi' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#00C9A7] uppercase tracking-wider block">
                {t('projects.products.kicker', 'Autorska Rješenja i Aplikacije')}
              </span>
              <h2 className="font-syne font-bold text-2xl text-[#F5F0E8]">
                {t('projects.products.title', 'Digitalni proizvodi kreirani za građane, privredu i dijasporu')}              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* 1. BH KONVER */}
              <div className="p-7 rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] text-[10px] font-mono font-bold">
                      POBJEDNIK SEDMICE & NATIVNI APP 🏆
                    </span>
                    <span className="text-xs font-mono text-[#C9A84C]">Aktivno</span>
                  </div>

                  {/* Image container with custom upload */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] group/img">
                    <SafeImage
                      src={customImages['product-bh-konver'] || IMAGES.bhKonverMockup}
                      alt="BH Konver Softverski Proizvod"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['product-bh-konver'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'product-bh-konver',
                            itemTitle: 'BH KONVER (www.bh-konver.com)',
                            itemType: 'proizvod',
                            currentImage: customImages['product-bh-konver'] || null
                          });
                        }}
                        title="Postavite originalnu sliku za BH KONVER"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['product-bh-konver'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      BH KONVER
                    </h3>
                    <p className="text-xs font-mono text-[#00C9A7] mt-0.5">
                      Univerzalni BH digitalni kalkulator i pravni generator
                    </p>
                  </div>

                  <p className="text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
                    Nagrađivano softversko rješenje za brze proračune poreza, valuta, mjernih jedinica i automatizovano generisanje pravno važećih izjava pod krivičnom i materijalnom odgovornošću. U toku je razvoj nativnih mobilnih aplikacija (Lovable).
                  </p>

                  <div className="p-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#00C9A7]">
                    Zvanična javna adresa: <strong className="text-white">www.bh-konver.com</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A3152]">
                  <a
                    href="https://www.bh-konver.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/25"
                  >
                    <span>Otvori www.bh-konver.com</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 2. BH PAPIRFINDER */}
              <div className="p-7 rounded-3xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/40 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                      AKTIVNO ONLINE
                    </span>
                    <span className="text-xs font-mono text-[#00C9A7]">e-Uprava</span>
                  </div>

                  {/* Image container with custom upload */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] group/img">
                    <SafeImage
                      src={customImages['product-bh-papirfinder'] || IMAGES.bhPapirfinderMockup}
                      alt="BH PapirFinder Proizvod"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['product-bh-papirfinder'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'product-bh-papirfinder',
                            itemTitle: 'BH PapirFinder (papir-finder.vercel.app)',
                            itemType: 'proizvod',
                            currentImage: customImages['product-bh-papirfinder'] || null
                          });
                        }}
                        title="Postavite originalnu sliku za BH PapirFinder"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['product-bh-papirfinder'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      BH PapirFinder
                    </h3>
                    <p className="text-xs font-mono text-[#C9A84C] mt-0.5">
                      Centralni registar i vodič za besplatne općinske obrasce
                    </p>
                  </div>

                  <p className="text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
                    Digitalni vodič kroz općinske takse, zahtjeve i obrasce lokalne samouprave (Olovo, Gračanica, Banja Luka, Jajce, Travnik). Dostupan na novoj adresi: <strong className="text-white">papir-finder.vercel.app</strong> (budući domen: www.papir-finder.com).
                  </p>

                  <div className="p-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-emerald-400">
                    Aktivna adresa: <strong className="text-white">papir-finder.vercel.app</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A3152]">
                  <a
                    href="https://papir-finder.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/25"
                  >
                    <span>Otvori papir-finder.vercel.app</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 3. ORNAMENTI BOSNE */}
              <div className="p-7 rounded-3xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/40 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-mono font-bold">
                      KULTURNA BAŠTINA & USB DOSTAVA
                    </span>
                    <span className="text-xs font-mono text-[#00C9A7]">Autorski Proizvod</span>
                  </div>

                  {/* Image container with custom upload */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] group/img">
                    <SafeImage
                      src={customImages['product-ornamenti-bosne'] || IMAGES.ornamentiBosne}
                      alt="Ornamenti Bosne Proizvod"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['product-ornamenti-bosne'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'product-ornamenti-bosne',
                            itemTitle: 'Ornamenti Bosne (Kodirani Stećci)',
                            itemType: 'proizvod',
                            currentImage: customImages['product-ornamenti-bosne'] || null
                          });
                        }}
                        title="Postavite originalnu sliku za Ornamente Bosne"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['product-ornamenti-bosne'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      Ornamenti Bosne
                    </h3>
                    <p className="text-xs font-mono text-[#C9A84C] mt-0.5">
                      Kodirani Stećci • Vektorski digitalni motivi (SVG/HTML/CSS)
                    </p>
                  </div>

                  <p className="text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
                    Prva digitalna kolekcija autentičnih motiva sa bh. stećaka. Jedini digitalni proizvod koji se dostavlja na USB sticku sa plaćanjem pouzećem na Vašu adresu u BiH.
                  </p>

                  <div className="p-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#00C9A7]">
                    Dostava: <strong className="text-white">USB Memory Stick + Pouzeće</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A3152] flex items-center gap-2">
                  <a
                    href="https://canva.link/8dwxeack5cwn18l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>E-Katalog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://youtu.be/CyJx3h3nGyA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white font-syne font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>

                </div>

                {/* Partner & Affiliate Products Grid */}
                <section className="mt-12 space-y-6">
                  <div className="text-center mb-10">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-md">
                      Preporučeni Alati & Partneri
                    </span>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
                      Softverski Alati Naših Partnera
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                      Provjerene globalne platforme i alati koje preporučujemo u svakodnevnom radu.
                    </p>
                  </div>

                  {/* GRID ZA 4 AFFILIATE PARTNERA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Partner 1: W.A. Production */}
                    <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                          Audio & Kreativa
                        </span>
                        <h3 className="text-lg font-bold text-white mt-3 group-hover:text-sky-300 transition-colors">
                          W.A. Production
                        </h3>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Vrhunski audio plugins, sample paketi i alati za muzičku produkciju i sound design.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <a
                          href="https://www.waproduction.com/#x3a36xuougf0v"
                          target="_blank"
                          rel="noopener sponsored"
                          className="text-sky-400 hover:text-sky-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Istražite alat â†’
                        </a>
                      </div>
                    </div>

                    {/* Partner 2: BoltAI */}
                    <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
                      <div>
                        <span className="text-[10px] font-bold text-sky-400 uppercase bg-sky-500/10 px-2 py-0.5 rounded">
                          AI / Desktop Client
                        </span>
                        <h3 className="text-lg font-bold text-white mt-3 group-hover:text-sky-300 transition-colors">
                          BoltAI
                        </h3>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Moćan AI klijent za macOS sa integrisanom podrškom za najnaprednije jezičke modele.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <a
                          href="https://boltai.pxf.io/KB6aLN"
                          target="_blank"
                          rel="noopener sponsored"
                          className="text-sky-400 hover:text-sky-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Istražite alat â†’
                        </a>
                      </div>
                    </div>

                    {/* Partner 3: Base44 */}
                    <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">
                          Developer Tools
                        </span>
                        <h3 className="text-lg font-bold text-white mt-3 group-hover:text-sky-300 transition-colors">
                          Base44
                        </h3>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Napredna platforma i developer ekosistem za automatizaciju i web rješenja.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <a
                          href="https://base44.pxf.io/c/6640161/2049275/25619?trafcat=lp"
                          target="_blank"
                          rel="noopener sponsored"
                          className="text-sky-400 hover:text-sky-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Istražite alat â†’
                        </a>
                      </div>
                    </div>

                    {/* Partner 4: Automattic */}
                    <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
                      <div>
                        <span className="text-[10px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded">
                          Web & Hosting
                        </span>
                        <h3 className="text-lg font-bold text-white mt-3 group-hover:text-sky-300 transition-colors">
                          Automattic
                        </h3>
                        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                          Infrastruktura iza WordPress.com, WooCommerce-a i vrhunskih web alata.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <a
                          href="https://automattic.pxf.io/yq7d2V"
                          target="_blank"
                          rel="noopener sponsored"
                          className="text-sky-400 hover:text-sky-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Istražite alat â†’
                        </a>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Inovativni Razvojni Projekti (ZENTAXI) */}
            <div className="mt-12 space-y-6">
              <h3 className="font-syne font-bold text-xl text-[#F5F0E8] flex items-center gap-2">
                <Handshake className="w-5 h-5 text-[#00C9A7]" />
                <span>{t('projects.development.title', 'Razvojni Projekti Otvoreni za Partnere & Investitore')}</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {localizedProjects.map((proj) => {                  const projImg = customImages[`project-${proj.id}`] || proj.bannerImage || proj.image;

                  return (
                    <div
                      key={proj.id}
                      onClick={() => setActiveProjectModal(proj)}
                      className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8 shadow-xl flex flex-col justify-between space-y-5 hover:border-[#00C9A7]/50 transition-all cursor-pointer group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3.5 py-1 rounded-full bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] text-[11px] font-mono font-bold uppercase">
                            {proj.status}
                          </span>
                          <span className="text-xs font-mono text-[#C9A84C]">
                            Ciljna grupa: {proj.targetAudience}
                          </span>
                        </div>

                        {/* Image container with custom upload button */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] group/img">
                          <SafeImage
                            src={projImg}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {customImages[`project-${proj.id}`] && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                              Originalna foto
                            </span>
                          )}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadModal({
                                  isOpen: true,
                                  itemId: `project-${proj.id}`,
                                  itemTitle: proj.title,
                                  itemType: 'proizvod',
                                  currentImage: customImages[`project-${proj.id}`] || null
                                });
                              }}
                              title="Postavite originalnu sliku za ovaj projekat"
                              className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                            >
                              <Camera className="w-3 h-3" />
                              <span>{customImages[`project-${proj.id}`] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                            </button>
                          )}
                        </div>

                        <div>
                          <h4 className="font-syne font-extrabold text-2xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                            {proj.title}
                          </h4>
                          <p className="text-xs font-mono text-[#C9A84C] mt-1">
                            "{proj.subtitle}"
                          </p>
                        </div>

                        <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans bg-[#0A1628] p-4 rounded-xl border border-[#1A3152]">
                          {proj.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1A3152] flex flex-wrap items-center gap-3">
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                        >
                          <span>Prezentacija na Canva</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        {proj.videoUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProjectModal(proj);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000] text-[#FF4E4E] hover:text-white border border-[#FF0000]/40 font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Video</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SEKCIJA: POKLON ZA POSJETIOCE (BESPLATNI RESURSI I PLUGINI) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'bojanka' && (
          <section className="max-w-6xl mx-auto my-16 px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Besplatni Resursi & Alati
              </span>
              <EditableText
                contentKey="free.products.title"
                defaultValue="Besplatni digitalni proizvodi"
                as="h2"
                className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3"
              />
              <EditableText
                contentKey="free.products.subtitle"
                defaultValue="Edukativne publikacije za najmlađe, te profesionalni audio plugini i studijski alati za sve muzičare, producente i kreativce."
                as="p"
                multiline={true}
                className="text-slate-400 mt-2 max-w-2xl mx-auto text-sm"
              />
            </div>

            {/* GRID SA KARTICAMA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* 1. KARTICA: EDUKATIVNA BOJANKA GUMMI (Autorski poklon) */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all shadow-xl group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded">Društvena odgovornost</span>
                    <span className="text-[10px] text-slate-400">PDF • A4 Print</span>
                  </div>

                  {/* Visual Container with Admin Upload Option */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] mb-4 group/img">
                    <SafeImage
                      src={customImages['free-product-gummi'] || IMAGES.gummiBojanka || '/images/gummi_bojanka.png'}
                      alt="Bojanka GUMMI"
                      fallbackTitle="Bojanka GUMMI"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['free-product-gummi'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow z-10">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'free-product-gummi',
                            itemTitle: 'Bojanka GUMMI (Edukativna publikacija)',
                            itemType: 'proizvod',
                            currentImage: customImages['free-product-gummi'] || null
                          });
                        }}
                        title="Postavite ili zamijenite sliku za Bojanku GUMMI"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['free-product-gummi'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <EditableText
                    contentKey="free.gummi.title"
                    defaultValue="Bojanka GUMMI"
                    as="h3"
                    className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors"
                  />
                  <EditableText
                    contentKey="free.gummi.desc"
                    defaultValue={'"Učimo pisati štampana i pisana slova kroz igru i smijeh." Poklon izdanje za roditelje, vrtiće i škole prilagođeno za kućni printer.'}
                    as="p"
                    multiline={true}
                    className="text-slate-300 text-xs mt-3 leading-relaxed"
                  />
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href="https://archive.org/download/gummi-bojanka/gummi-bojanka.pdf"
                    onClick={(e) => {
                      if (onOpenBojanka) {
                        e.preventDefault();
                        onOpenBojanka();
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    Preuzmi PDF →
                  </a>
                  <a
                    href="https://canva.link/tna306bm8p462xm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Prelistaj ↗
                  </a>
                </div>
              </div>

              {/* 2. KARTICA: MULTIBENDER CM / FREQUENCY MULTIBAND DELAY (Partner Plugin 1) */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all shadow-xl group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">VST / AU / AAX Plugin</span>
                    <span className="text-[10px] text-slate-400">W.A. Production Partner</span>
                  </div>

                  {/* Visual Container with Admin Upload Option */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] mb-4 group/img">
                    <SafeImage
                      src={customImages['free-product-multibender'] || 'https://archive.org/download/w.-a.-production-bh-assistant/W.A.Production_BH_Assistant.png'}
                      alt="Multiband Delay & FX"
                      fallbackTitle="Multiband Delay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['free-product-multibender'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow z-10">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'free-product-multibender',
                            itemTitle: 'Multiband Delay & FX (W.A. Production)',
                            itemType: 'proizvod',
                            currentImage: customImages['free-product-multibender'] || null
                          });
                        }}
                        title="Postavite ili zamijenite sliku za Multiband Delay"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['free-product-multibender'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <EditableText
                    contentKey="free.multibender.title"
                    defaultValue="Multiband Delay & FX"
                    as="h3"
                    className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors"
                  />
                  <EditableText
                    contentKey="free.multibender.desc"
                    defaultValue="Audio efekt koji dijeli signal u 3 frekvencijska opsega uz zaseban delay, saturaciju, bitcrushing i detune modul za analogni osjećaj."
                    as="p"
                    multiline={true}
                    className="text-slate-300 text-xs mt-3 leading-relaxed"
                  />
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">ZIP Arhiva</span>
                  <a
                    href="https://savedly.net/f/z9vff6dv"
                    target="_blank"
                    rel="noopener sponsored"
                    className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md inline-flex items-center gap-1"
                  >
                    ⬇ Preuzmi Plugin (.zip)
                  </a>
                </div>
              </div>

              {/* 3. KARTICA: MTURBODELAY - MELDA PRODUCTION (Partner Plugin 2) */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all shadow-xl group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">MeldaProduction</span>
                    <span className="text-[10px] text-slate-400">Specijalni Poklon</span>
                  </div>

                  {/* Visual Container with Admin Upload Option */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] mb-4 group/img">
                    <SafeImage
                      src={customImages['free-product-mturbodelay'] || 'https://archive.org/download/w.-a.-production-bh-assistant/W.A.Production_BH_Assistant.png'}
                      alt="MTurboDelay MeldaProduction & W.A. Production"
                      fallbackTitle="MTurboDelay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {customImages['free-product-mturbodelay'] && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow z-10">
                        Originalna foto
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadModal({
                            isOpen: true,
                            itemId: 'free-product-mturbodelay',
                            itemTitle: 'MTurboDelay (MeldaProduction Poklon Plugin)',
                            itemType: 'proizvod',
                            currentImage: customImages['free-product-mturbodelay'] || null
                          });
                        }}
                        title="Postavite ili zamijenite sliku za MTurboDelay"
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/85 hover:bg-[#00C9A7] text-white hover:text-[#0A1628] text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20 hover:border-[#00C9A7] transition-all shadow-md z-10"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{customImages['free-product-mturbodelay'] ? 'Izmijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    )}
                  </div>

                  <EditableText
                    contentKey="free.mturbodelay.title"
                    defaultValue="MTurboDelay"
                    as="h3"
                    className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors"
                  />
                  <EditableText
                    contentKey="free.mturbodelay.desc"
                    defaultValue="Moćni delay plugin sa neograničenim modulacijama (LFO, envelope), emulacijama legendarnih tape/analog uredjaja i multi-tap sekcijom."
                    as="p"
                    multiline={true}
                    className="text-slate-300 text-xs mt-3 leading-relaxed"
                  />
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">ZIP Arhiva</span>
                  <a
                    href="https://savedly.net/f/cjzbefme"
                    target="_blank"
                    rel="noopener sponsored"
                    className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md inline-flex items-center gap-1"
                  >
                    ⬇ Preuzmi Plugin (.zip)
                  </a>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 4 PROFESSIONAL CTA AFFILIATE BANNERS                      */}
            {/* ========================================================= */}
            <div className="mt-14 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preporučeni Partnerski Alati & Resursi</span>
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  Istražite Vrhunske Digitalne Platforme
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Profesionalni alati za muzičku produkciju, rapidni razvoj aplikacija, web izgradnju i cloud infrastrukturu.
                </p>
              </div>

              {/* 4 Banners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* BANNER 1: Music & Production (W.A. Production) */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#0A1628] border border-[#00C9A7]/40 hover:border-[#00C9A7] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00C9A7]/20 group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-[#00C9A7]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00C9A7]/25 transition-all" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#00C9A7]/15 border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] shadow-inner group-hover:scale-110 transition-transform">
                        {/* Audio waveform / mixing console badge */}
                        <Sliders className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7]">
                        Muzika & Produkcija
                      </span>
                    </div>

                    <div>
                      <h4 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#00C9A7] transition-colors leading-snug">
                        Želite li više besplatnih sounds/plugins/templates za svoje muzicke projekte?
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Istražite profesionalne alate i zvukove.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1A3152]/80 relative z-10">
                    <a
                      href="https://waproduction.sjv.io/2R6oJQ"
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] hover:from-[#00E5BE] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#00C9A7]/20 transition-all transform active:scale-[0.98]"
                    >
                      <span>Istražite W.A. Production ovdje →</span>
                      <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  </div>
                </div>

                {/* BANNER 2: Development & App Builders (Bolt.new / Bolt AI) */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#0A1628] border border-sky-500/40 hover:border-sky-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/20 group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/25 transition-all" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-inner group-hover:scale-110 transition-transform">
                        {/* Code brackets / lightning fast deployment badge */}
                        <Zap className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400">
                        App Builders & Dev
                      </span>
                    </div>

                    <div>
                      <h4 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors leading-snug">
                        Odaberite predložak za portfolio, web shop ili aplikaciju.
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Brzo i jednostavno prilagodite i razvijte svoj projekat.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1A3152]/80 relative z-10">
                    <a
                      href="https://boltai.pxf.io/2RNyVQ"
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-syne font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/20 transition-all transform active:scale-[0.98]"
                    >
                      <span>Prilagodite ga u Bolt-u klikni ovdje →</span>
                      <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  </div>
                </div>

                {/* BANNER 3: Business & Web Creation (Base44) */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#0A1628] border border-[#C9A84C]/40 hover:border-[#C9A84C] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#C9A84C]/20 group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C9A84C]/25 transition-all" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] shadow-inner group-hover:scale-110 transition-transform">
                        {/* Business briefcase / corporate shield badge */}
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]">
                        Biznis & Web Kreacija
                      </span>
                    </div>

                    <div>
                      <h4 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#C9A84C] transition-colors leading-snug">
                        Besplatni račun za pojedince i firme.
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Kreirajte i pokrenite svoj moderni website bez komplikacija.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1A3152]/80 relative z-10">
                    <a
                      href="https://base44.pxf.io/c/6640161/2049275/25619?trafcat=lp"
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B08D38] hover:from-[#DFC271] hover:to-[#C9A84C] text-[#0A1628] font-syne font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#C9A84C]/20 transition-all transform active:scale-[0.98]"
                    >
                      <span>Izgradite uz Base44 ovdje →</span>
                      <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  </div>
                </div>

                {/* BANNER 4: Hosting & Infrastructure (Automattic) */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#0A1628] border border-purple-500/40 hover:border-purple-400 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/25 transition-all" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-inner group-hover:scale-110 transition-transform">
                        {/* Server rack / cloud infrastructure badge */}
                        <Server className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        Hosting & Cloud
                      </span>
                    </div>

                    <div>
                      <h4 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-purple-300 transition-colors leading-snug">
                        Treba Vam pouzdan hosting, stabilan website i više?
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                        Otkrijte vrhunska rješenja za rast vašeg poslovanja.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1A3152]/80 relative z-10">
                    <a
                      href="https://automattic.pxf.io/yq7d2V"
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-300 hover:to-indigo-400 text-white font-syne font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-500/20 transition-all transform active:scale-[0.98]"
                    >
                      <span>Istražite ponudu ovdje →</span>
                      <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

      {/* Modal for Detailed Project Preview */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/60 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#0A1628] text-[#F5F0E8]/70 hover:text-white border border-[#1A3152] transition-colors"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-mono font-bold uppercase">
                  {activeProjectModal.status}
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F5F0E8]">
                  {activeProjectModal.title}
                </h3>
                <p className="text-xs font-mono text-[#C9A84C]">
                  "{activeProjectModal.subtitle}"
                </p>
              </div>

              {activeProjectModal.videoEmbedUrl ? (
                <div className="rounded-2xl overflow-hidden border border-[#1A3152] aspect-video bg-black shadow-2xl">
                  <iframe
                    src={activeProjectModal.videoEmbedUrl}
                    title={activeProjectModal.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden border border-[#1A3152] aspect-video bg-[#0A1628]">
                  <SafeImage
                    src={activeProjectModal.bannerImage || activeProjectModal.image}
                    alt={activeProjectModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152]">
                <p className="text-xs sm:text-sm text-[#F5F0E8]/90 leading-relaxed font-sans">
                  {activeProjectModal.detailedSummary || activeProjectModal.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={activeProjectModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Prezentacija na Canva</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] font-syne font-bold text-xs"
                >
                  Zatvori
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#0F2038] border border-[#00C9A7] text-[#00C9A7] text-xs font-syne font-bold shadow-2xl shadow-black/80 flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Upload Modal for Services & Products */}
      <ImageUploadModal
        isOpen={uploadModal.isOpen}
        onClose={() => setUploadModal((prev) => ({ ...prev, isOpen: false }))}
        itemId={uploadModal.itemId}
        itemTitle={uploadModal.itemTitle}
        itemType={uploadModal.itemType}
        currentImage={uploadModal.currentImage}
        onImageSaved={(newImg) => {
          setCustomImages(getAllCustomImages());
        }}
      />
    </section>
  );
};

export default ProjectsSection;
