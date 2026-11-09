import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEVELOPMENT_PROJECTS, COMPANY_SERVICES, DIGITAL_TOOLS } from '../data/companyData';
import { DevelopmentProject, CompanyService } from '../types';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ImageUploadModal } from './ImageUploadModal';
import { getAllCustomImages, onCustomImagesChange } from '../utils/customImagesStorage';
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
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminAuth } from '../context/AdminAuthContext';

interface ProjectsSectionProps {
  onOpenBojanka: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBojanka }) => {
  const { t } = useLanguage();
  const { isAdmin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'usluge' | 'proizvodi' | 'bojanka'>('usluge');
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<DevelopmentProject | null>(null);
  const [selectedService, setSelectedService] = useState<CompanyService | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => getAllCustomImages());
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
    const unsubscribe = onCustomImagesChange(() => {
      setCustomImages(getAllCustomImages());
    });
    return unsubscribe;
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

  return (
    <section id="proizvodi-i-usluge" className="py-20 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PORTFOLIO KOMPANIJE • PROIZVODI & USLUGE</span>
          </div>

          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            Proizvodi & Usluge B&H Assistant d.o.o.
          </h1>

          <p className="text-[#F5F0E8]/75 text-sm sm:text-base font-sans leading-relaxed max-w-3xl mx-auto">
            Jasno definisana ponuda autorskih softverskih proizvoda, 8 profesionalnih IT usluga po mjeri i besplatnih edukativnih publikacija za zajednicu.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0F2038] border border-[#1A3152] gap-1 max-w-md mx-auto mt-4">
            <button
              onClick={() => setActiveTab('usluge')}
              className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'usluge'
                  ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                  : 'text-[#F5F0E8]/70 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>8 IT Usluga</span>
            </button>

            <button
              onClick={() => setActiveTab('proizvodi')}
              className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'proizvodi'
                  ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                  : 'text-[#F5F0E8]/70 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Naši Proizvodi</span>
            </button>

            <button
              onClick={() => setActiveTab('bojanka')}
              className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'bojanka'
                  ? 'bg-[#C9A84C] text-[#0A1628] shadow-lg shadow-[#C9A84C]/20'
                  : 'text-[#F5F0E8]/70 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Free Bojanka</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: 8 PROFESIONALNIH IT USLUGA B&H ASSISTANT D.O.O.        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'usluge' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#00C9A7] uppercase tracking-wider block">
                Stručne B2B & B2G IT Usluge
              </span>
              <h2 className="font-syne font-bold text-2xl text-[#F5F0E8]">
                Kompletna lepeza usluga za digitalni rast Vašeg biznisa
              </h2>
              <p className="text-xs text-[#F5F0E8]/70 font-sans">
                Od istraživanja tržišta i akvizicije kupaca do namjenskog web razvoja, SEO optimizacije i izrade mobilnih aplikacija.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMPANY_SERVICES.map((serv) => {
                const IconComponent = getServiceIcon(serv.iconName);
                const customImg = customImages[serv.id];

                return (
                  <motion.div
                    key={serv.id}
                    whileHover={{ y: -6, borderColor: 'rgba(0, 201, 167, 0.6)' }}
                    className="p-6 rounded-3xl bg-[#0F2038] border border-[#1A3152] flex flex-col justify-between space-y-5 transition-all shadow-xl group hover:shadow-2xl hover:shadow-[#00C9A7]/10"
                  >
                    <div className="space-y-4">
                      {/* Top Photo / Image Container with Upload Trigger */}
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] group/img">
                        {customImg ? (
                          <img
                            src={customImg}
                            alt={serv.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#0F2038] to-[#0A1628] text-center space-y-1.5">
                            <div className="w-9 h-9 rounded-xl bg-[#0A1628] border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono text-[#F5F0E8]/60">
                              Usluga 0{serv.number} • Foto zona
                            </span>
                          </div>
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
                        <h3 className="font-syne font-extrabold text-base text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors leading-snug">
                          {serv.title}
                        </h3>
                        <p className="text-[11px] font-mono text-[#C9A84C] mt-0.5">
                          {serv.subtitle}
                        </p>
                      </div>

                      {/* Short Description (Google AdSense & Visitors Quick Scan) */}
                      {serv.shortDescription && (
                        <div className="p-2.5 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-xs text-[#00C9A7] font-medium leading-relaxed font-sans">
                          {serv.shortDescription}
                        </div>
                      )}

                      {/* Full Detailed Description */}
                      <p className="text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
                        {serv.description}
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
                        <span>Zatražite Ponudu</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                  Besplatne konsultacije i specifikacija projekta
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/75 font-sans max-w-xl">
                  Kontaktirajte naš tim za besplatnu analizu vašeg poslovanja i preporuku najefikasnijeg modela saradnje.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/kontakt"
                  className="px-6 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wider shadow-lg shadow-[#00C9A7]/20 transition-all hover:scale-105"
                >
                  Pošaljite Upit za Uslugu
                </Link>
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

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: NAŠI SOFTVERSKI PROIZVODI (BH KONVER, PAPIRFINDER ITD) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'proizvodi' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#00C9A7] uppercase tracking-wider block">
                Autorska Rješenja i Aplikacije
              </span>
              <h2 className="font-syne font-bold text-2xl text-[#F5F0E8]">
                Digitalni proizvodi kreirani za građane, privredu i dijasporu
              </h2>
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
                    <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-mono font-bold">
                      U RAZVOJU • BUDUĆA ADRESA
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
                            itemTitle: 'BH PapirFinder (www.papir-finder.com)',
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
                    Digitalni vodič kroz općinske takse, zahtjeve i obrasce lokalne samouprave (Olovo, Gračanica, Banja Luka, Jajce, Travnik). Zvanični domen po završetku izrade: <strong className="text-white">www.papir-finder.com</strong>.
                  </p>

                  <div className="p-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#C9A84C]">
                    Budući domen: <strong className="text-white">www.papir-finder.com</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A3152]">
                  <a
                    href="https://bhpapirfinder.atoms.world/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#00C9A7]/40 text-[#00C9A7] font-syne font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>Testni Prototip (Atoms)</span>
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

            {/* Inovativni Razvojni Projekti (ZENTAXI) */}
            <div className="mt-12 space-y-6">
              <h3 className="font-syne font-bold text-xl text-[#F5F0E8] flex items-center gap-2">
                <Handshake className="w-5 h-5 text-[#00C9A7]" />
                <span>Razvojni Projekti Otvoreni za Partnere & Investitore</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {DEVELOPMENT_PROJECTS.map((proj) => {
                  const projImg = customImages[`project-${proj.id}`] || proj.bannerImage || proj.image;

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
        {/* TAB 3: E-PUBLIKACIJE & BESPLATNA BOJANKA GUMMI (FREE DOWNLOAD)*/}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'bojanka' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider block font-bold">
                Besplatne Edukativne Publikacije
              </span>
              <h2 className="font-syne font-bold text-2xl text-[#F5F0E8]">
                Društvena odgovornost i besplatni resursi za najmlađe
              </h2>
              <p className="text-xs text-[#F5F0E8]/70 font-sans">
                Edukativna bojanka Gummi je dio naših e-publikacija koje nudimo svima potpuno besplatno za download (za roditelje, vrtiće i škole).
              </p>
            </div>

            {/* Highlight Showcase Banner for Free Bojanka */}
            <div className="rounded-3xl bg-gradient-to-r from-[#0F2038] via-[#1A3152] to-[#0F2038] border-2 border-[#C9A84C]/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Bojanka Image Thumbnail */}
                <div className="lg:col-span-3 flex justify-center">
                  <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#C9A84C]/80 bg-[#0A1628] shadow-2xl hover:scale-105 transition-transform duration-300">
                    <SafeImage
                      src={IMAGES.gummiBojanka}
                      alt="Bojanka Gummi Naslovnica"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 text-left">
                  <div className="inline-flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[11px] font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>BESPLATNO ZA SVE POSJETIOCE • FREE DOWNLOAD</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF4E4E] text-[11px] font-mono font-bold">
                      <Play className="w-3 h-3 fill-current" />
                      <span>VIDEO PROMO</span>
                    </span>
                  </div>

                  <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F5F0E8]">
                    Edukativna Bojanka <span className="text-[#C9A84C]">GUMMI</span> (PDF Izdanje)
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed font-sans">
                    "Učimo pisati štampana i pisana slova kroz igru, smijeh i druženje" — Poklanjamo besplatno svim roditeljima, odgajateljima, vrtićima i školama prvi digitalni primjerak edukativne bojanke Gummi u PDF formatu prilagođenom za standardni kućni printer (A4 format).
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00C9A7]">
                    <span>✓ Bez registracije</span>
                    <span>•</span>
                    <span>✓ Spreman za print (A4)</span>
                    <span>•</span>
                    <span>✓ 100% Besplatno</span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href="https://archive.org/details/gummi-bojanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#C9A84C] hover:bg-[#FFD700] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-2xl transition-transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 animate-bounce" />
                    <span>Preuzmi Besplatni PDF (Archive.org)</span>
                  </a>

                  <button
                    onClick={onOpenBojanka}
                    className="w-full py-3 px-6 rounded-2xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Brzi Pregled u Aplikaciji</span>
                  </button>

                  <a
                    href="https://canva.link/tna306bm8p462xm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-6 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/50 hover:border-[#00C9A7] text-[#00C9A7] font-syne font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>Prelistaj E-Izdanje (Canva)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

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
