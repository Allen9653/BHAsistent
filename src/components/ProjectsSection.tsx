import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVELOPMENT_PROJECTS } from '../data/companyData';
import { DevelopmentProject } from '../types';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import {
  ExternalLink,
  Download,
  Users,
  Handshake,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
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
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsSectionProps {
  onOpenBojanka: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBojanka }) => {
  const { t } = useLanguage();
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<DevelopmentProject | null>(null);

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
    const shareUrl = project.url || window.location.href;
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

  return (
    <section id="projekti" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <Handshake className="w-3.5 h-3.5" />
            <span>{t('projects.badge', 'INVESTICIJE & BOJANKA ZA DJECU')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('projects.title', 'Razvojni Projekti & Društvena Odgovornost')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed max-w-3xl mx-auto">
            {t('projects.subtitle', 'Pored komercijalnih softvera, gradimo projekte od velikog značaja za lokalnu zajednicu i mlade generacije.')}
          </p>
        </div>

        {/* Development Projects Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {DEVELOPMENT_PROJECTS.map((proj) => (
            <motion.div
              key={proj.id}
              onClick={() => setActiveProjectModal(proj)}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: "0 0 35px -5px rgba(0, 201, 167, 0.3)",
                borderColor: "rgba(0, 201, 167, 0.7)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-pointer"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00C9A7]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#00C9A7]/25 transition-all duration-500" />

              {/* Floating Social Media Share Bar */}
              <div
                className="absolute top-6 right-6 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0A1628]/90 border border-[#1A3152] backdrop-blur-md shadow-lg shadow-black/40"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] font-mono text-[#F5F0E8]/40 px-1 hidden sm:inline-block">
                  <Share2 className="w-3 h-3 text-[#00C9A7] inline mr-1" />
                  Podijeli:
                </span>

                {/* LinkedIn Share */}
                <button
                  onClick={(e) => handleShare('linkedin', proj, e)}
                  title={`Podijeli ${proj.title} na LinkedIn`}
                  aria-label={`Podijeli ${proj.title} na LinkedIn`}
                  className="p-1.5 rounded-xl bg-[#0F2038] hover:bg-[#0A66C2] text-[#F5F0E8]/80 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>

                {/* Facebook Share */}
                <button
                  onClick={(e) => handleShare('facebook', proj, e)}
                  title={`Podijeli ${proj.title} na Facebook`}
                  aria-label={`Podijeli ${proj.title} na Facebook`}
                  className="p-1.5 rounded-xl bg-[#0F2038] hover:bg-[#1877F2] text-[#F5F0E8]/80 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </button>

                {/* Twitter / X Share */}
                <button
                  onClick={(e) => handleShare('twitter', proj, e)}
                  title={`Podijeli ${proj.title} na Twitter / X`}
                  aria-label={`Podijeli ${proj.title} na Twitter / X`}
                  className="p-1.5 rounded-xl bg-[#0F2038] hover:bg-[#1DA1F2] text-[#F5F0E8]/80 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>

                {/* Copy Link */}
                <button
                  onClick={(e) => handleShare('copy', proj, e)}
                  title={`Kopiraj link za ${proj.title}`}
                  aria-label={`Kopiraj link za ${proj.title}`}
                  className="p-1.5 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] transition-all transform hover:scale-110 active:scale-95"
                >
                  {copiedProjectId === proj.id ? (
                    <Check className="w-3.5 h-3.5 text-[#00C9A7] hover:text-[#0A1628]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="space-y-4">
                
                {/* Header Status Badge */}
                <div className="flex flex-wrap items-center gap-2 pr-32">
                  <span className="px-3.5 py-1 rounded-full bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] text-[11px] font-mono font-bold uppercase">
                    {proj.status}
                  </span>
                  <span className="text-xs font-mono text-[#C9A84C]">
                    Ciljna grupa: {proj.targetAudience}
                  </span>
                </div>

                {/* Project Visual Showcase (Banner & Secondary Logo) */}
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video relative group-hover:border-[#00C9A7]/40 transition-colors">
                    <SafeImage
                      src={proj.bannerImage || proj.image}
                      alt={`${proj.title} Vizuelni Prikaz`}
                      fallbackTitle={proj.title}
                      fallbackSubtitle={proj.subtitle}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2038] via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>

                  {proj.secondaryImage && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#1A3152] bg-[#0F2038] shrink-0 p-1">
                        <SafeImage
                          src={proj.secondaryImage}
                          alt={`${proj.title} Znak`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-[#00C9A7] font-bold block uppercase">
                          {proj.id === 'zentaxi' ? 'ZENTAXI Logo Znak' : 'GUMMI Bojanka Znak'}
                        </span>
                        <span className="text-[11px] text-[#F5F0E8]/70 font-sans">
                          {proj.id === 'zentaxi' ? 'Zvanični logotip brenda' : 'Preuzmite besplatno u PDF-u'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-syne font-extrabold text-3xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-[#C9A84C] font-semibold mt-1">
                    "{proj.subtitle}"
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans bg-[#0A1628]/80 p-4 rounded-2xl border border-[#1A3152]">
                  {proj.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono text-[#00C9A7] uppercase tracking-wider block font-bold">
                    Ključne Prednosti & Inovacije:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5F0E8]/80">
                    {proj.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons inside Card */}
              <div className="pt-4 border-t border-[#1A3152] flex flex-wrap items-center gap-3">
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-5 py-3 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs tracking-wide transition-all flex items-center gap-2"
                >
                  <span>Prezentacija na Canva</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {proj.videoUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProjectModal(proj);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000] text-[#FF4E4E] hover:text-white border border-[#FF0000]/40 font-syne font-bold text-xs tracking-wide transition-all flex items-center gap-2 shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Sažetak & Video (YouTube)</span>
                  </button>
                )}

                {proj.hasFreeDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBojanka();
                    }}
                    className="px-5 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#FFD700] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-lg transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 animate-bounce" />
                    <span>Free Bojanka Gummi (PDF)</span>
                  </button>
                )}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Highlight Banner for Free Edukativna Bojanka GUMMI & Video Promo */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F2038] via-[#1A3152] to-[#0F2038] border-2 border-[#C9A84C]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Bojanka Image Thumbnail */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#C9A84C]/60 bg-[#0A1628] shadow-2xl hover:scale-105 transition-transform duration-300">
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
                  <span>BESPLATNI POKLON ZA SVE POSJETIOCE</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF4E4E] text-[11px] font-mono font-bold">
                  <Play className="w-3 h-3 fill-current" />
                  <span>NOVI VIDEO PROMO</span>
                </span>
              </div>

              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F5F0E8]">
                Preuzmite Prvi Primjerak Edukativne Bojanke <span className="text-[#C9A84C]">GUMMI</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#F5F0E8]/80 leading-relaxed font-sans">
                "Učimo pisati štampana i pisana slova kroz igru, smijeh i druženje" — Poklanjamo besplatno svim zainteresovanim roditeljima, odgajateljima i djeci prvi digitalni primjerak edukativne bojanke Gummi u PDF formatu. Pogledajte i naš zvanični promotivni video na YouTube-u!
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <a
                href="https://archive.org/details/gummi-bojanka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#C9A84C] hover:bg-[#FFD700] text-[#0A1628] font-syne font-bold text-xs tracking-wider shadow-2xl transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Preuzmi PDF Verziju (Archive.org)</span>
              </a>

              <a
                href="https://canva.link/tna306bm8p462xm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/50 hover:border-[#00C9A7] text-[#00C9A7] font-syne font-bold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Pretpregled Bojanke (Canva Link)</span>
              </a>

              <button
                onClick={() => {
                  const gummiProj = DEVELOPMENT_PROJECTS.find(p => p.id === 'gummi');
                  if (gummiProj) setActiveProjectModal(gummiProj);
                }}
                className="w-full py-2.5 px-6 rounded-2xl bg-[#FF0000]/20 hover:bg-[#FF0000] border border-[#FF0000]/50 text-[#FF4E4E] hover:text-white font-syne font-bold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Gledaj Video Promociju (YouTube)</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Comprehensive Project Video & Summary Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0F2038] border-2 border-[#C9A84C]/60 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FF0000]/20 text-[#FF4E4E] border border-[#FF0000]/30">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-syne font-extrabold text-lg sm:text-2xl text-[#F5F0E8]">
                        {activeProjectModal.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] text-[10px] font-mono font-bold">
                        {activeProjectModal.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#C9A84C] font-mono mt-0.5">
                      "{activeProjectModal.subtitle}" • B&H Assistant d.o.o. Zenica
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2.5 rounded-2xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Video Player Embed if present */}
              {activeProjectModal.videoEmbedUrl && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00C9A7] flex items-center gap-1.5 font-bold uppercase">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Zvanična Video Prezentacija & Pregled Projekta
                    </span>
                    <a
                      href={activeProjectModal.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#FF4E4E] hover:underline flex items-center gap-1"
                    >
                      <span>Otvori na YouTube-u</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative w-full rounded-2xl overflow-hidden border border-[#1A3152] shadow-2xl bg-black aspect-video">
                    <iframe
                      className="w-full h-full border-0"
                      src={activeProjectModal.videoEmbedUrl}
                      title={`${activeProjectModal.title} Video Prezentacija`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Project Summary Block */}
              <div className="p-5 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#C9A84C]" />
                  <span>Sažetak Projekta & Misija</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/90 leading-relaxed font-sans">
                  {activeProjectModal.detailedSummary || activeProjectModal.description}
                </p>
              </div>

              {/* Structured Key Features / Highlights */}
              {activeProjectModal.features ? (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#00C9A7] font-bold uppercase tracking-wider block">
                    Ključne Tehnološke & Operativne Prednosti:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProjectModal.features.map((feat, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] space-y-1">
                        <div className="flex items-center gap-2 text-xs font-syne font-bold text-[#F5F0E8]">
                          <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0" />
                          <span>{feat.title}</span>
                        </div>
                        <p className="text-xs text-[#F5F0E8]/70 pl-6 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#00C9A7] font-bold uppercase tracking-wider block">
                    Ključne Stavke:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5F0E8]/80">
                    {activeProjectModal.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                        <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-[#F5F0E8]/60 font-mono text-xs">
                  Ciljna grupa: <strong className="text-[#00C9A7]">{activeProjectModal.targetAudience}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={activeProjectModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Otvori Prezentaciju na Canva</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {activeProjectModal.videoUrl && (
                    <a
                      href={activeProjectModal.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#D60000] text-white font-syne font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-white font-syne font-bold text-xs"
                  >
                    Zatvori
                  </button>
                </div>
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
    </section>
  );
};

