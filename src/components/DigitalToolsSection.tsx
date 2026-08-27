import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIGITAL_TOOLS } from '../data/companyData';
import { DigitalTool } from '../types';
import { SafeImage } from './SafeImage';
import {
  ExternalLink,
  Check,
  Calculator,
  FileText,
  Compass,
  Sparkles,
  Play,
  Video,
  X,
  CheckCircle2,
  BookOpen,
  HardDrive,
  Package,
  Truck,
  ShieldCheck,
  Send
} from 'lucide-react';
import { BhKonverVideoModal } from './BhKonverVideoModal';
import { ExternalToolEmbedModal } from './ExternalToolEmbedModal';
import { PromoBannerCarousel } from './PromoBannerCarousel';
import { ProductsPresentationCarousel } from './ProductsPresentationCarousel';
import { useLanguage } from '../context/LanguageContext';

interface DigitalToolsSectionProps {
  onOpenContact?: () => void;
  onOpenBojanka?: () => void;
}

export const DigitalToolsSection: React.FC<DigitalToolsSectionProps> = ({
  onOpenContact,
  onOpenBojanka,
}) => {
  const [showKonverModal, setShowKonverModal] = useState(false);
  const [activeToolVideo, setActiveToolVideo] = useState<DigitalTool | null>(null);
  const [selectedVideoVersion, setSelectedVideoVersion] = useState<'bos' | 'eng'>('bos');
  const [previewTool, setPreviewTool] = useState<{ title: string; url: string; futureDomain: string; badge: string } | null>(null);
  const { t } = useLanguage();

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#00C9A7]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#C9A84C]" />;
      case 'Compass':
      default:
        return <Compass className="w-6 h-6 text-[#00C9A7]" />;
    }
  };

  return (
    <section id="alati" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]/60">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('tools.badge', 'BH DIGITALNI ALATI & PLATFORME')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('tools.title', 'Autorska Softverska Rješenja B&H Assistant-a')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed max-w-3xl mx-auto">
            {t('tools.subtitle', 'Spajamo funkcionalnost, kulturnu baštinu i brze proračune prilagođene zakonodavstvu i identitetu Bosne i Hercegovine.')}
          </p>
        </div>

        {/* High-Impact 10-Second Auto-Rotating Product Presentation Showcase */}
        <ProductsPresentationCarousel
          onOpenKonverModal={() => setShowKonverModal(true)}
          onOpenKonverVideo={() => {
            const konverTool = DIGITAL_TOOLS.find((t) => t.id === 'bh-konver');
            if (konverTool) {
              setActiveToolVideo(konverTool);
              setSelectedVideoVersion('bos');
            }
          }}
        />

        {/* 3 Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {DIGITAL_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="group relative rounded-3xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/60 transition-all duration-300 p-7 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#00C9A7]/10 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C9A7] via-[#C9A84C] to-[#00C9A7] opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Subtle Shimmer Loading Effect Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-shimmer" />
              </div>

              <div>
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#1A3152] group-hover:scale-110 transition-transform">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#0A1628] border border-[#1A3152] text-[#C9A84C] text-[11px] font-mono font-bold tracking-wider">
                    {tool.badge}
                  </span>
                </div>

                {/* Article Mockup Image Preview */}
                {tool.image && (
                  <div className="mb-5 rounded-2xl overflow-hidden border border-[#1A3152] group-hover:border-[#00C9A7]/40 transition-colors bg-[#0A1628] aspect-video relative">
                    <SafeImage
                      src={tool.image}
                      alt={tool.name}
                      fallbackTitle={tool.name}
                      fallbackSubtitle={tool.tagline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2038] via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* BH KONVER Video Play Badge */}
                    {tool.id === 'bh-konver' && (
                      <button
                        onClick={() => setShowKonverModal(true)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#00C9A7]/90 hover:bg-[#00E5BE] text-[#0A1628] flex items-center justify-center shadow-lg shadow-[#00C9A7]/30 transition-transform hover:scale-110 z-20"
                        title="Pogledajte promotivni video snimak BH KONVER"
                      >
                        <Play className="w-5 h-5 fill-[#0A1628] ml-0.5" />
                      </button>
                    )}

                    {/* ORNAMENTI BOSNE Video Play Badge */}
                    {tool.videoEmbedUrl && tool.id === 'ornamenti-bosne' && (
                      <button
                        onClick={() => {
                          setSelectedVideoVersion('bos');
                          setActiveToolVideo(tool);
                        }}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#FF0000]/90 hover:bg-[#FF0000] text-white flex items-center justify-center shadow-lg shadow-[#FF0000]/40 transition-transform hover:scale-110 z-20"
                        title="Pogledajte zvaničnu video prezentaciju ORNAMENTI BOSNE"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Title & Tagline */}
                <h3 className="font-syne font-bold text-2xl text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors mb-2">
                  {tool.id === 'bh-konver'
                    ? t('tools.konver.title', tool.name)
                    : tool.id === 'bh-papirfinder'
                    ? t('tools.papir.title', tool.name)
                    : t('tools.stecak.title', tool.name)}
                </h3>

                <p className="text-xs font-mono text-[#00C9A7] mb-4 font-semibold">
                  {tool.id === 'bh-konver'
                    ? t('tools.konver.tagline', tool.tagline)
                    : tool.id === 'bh-papirfinder'
                    ? t('tools.papir.tagline', tool.tagline)
                    : t('tools.stecak.tagline', tool.tagline)}
                </p>

                {/* Highlighted Feature Block for Each Project */}
                {tool.deliveryBadge && (
                  <div className={`mb-4 p-3 rounded-2xl border space-y-1.5 ${
                    tool.id === 'ornamenti-bosne'
                      ? 'bg-gradient-to-r from-[#C9A84C]/15 to-[#00C9A7]/15 border-[#C9A84C]/40'
                      : tool.id === 'bh-konver'
                      ? 'bg-gradient-to-r from-[#00C9A7]/15 to-[#0F2038] border-[#00C9A7]/40'
                      : 'bg-gradient-to-r from-[#C9A84C]/15 to-[#0F2038] border-[#C9A84C]/40'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-syne font-bold text-[#C9A84C]">
                      {tool.id === 'ornamenti-bosne' ? (
                        <HardDrive className="w-4 h-4 text-[#00C9A7]" />
                      ) : tool.id === 'bh-konver' ? (
                        <Sparkles className="w-4 h-4 text-[#00C9A7]" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#C9A84C]" />
                      )}
                      <span>{tool.id === 'ornamenti-bosne' ? t('order.deliveryBadge', tool.deliveryBadge) : tool.deliveryBadge}</span>
                    </div>
                    <p className="text-[11px] text-[#F5F0E8]/90 font-sans leading-snug">
                      {tool.id === 'ornamenti-bosne' ? t('tools.stecak.deliveryNotice', tool.deliveryNotice) : tool.deliveryNotice}
                    </p>
                  </div>
                )}

                {/* Promo Info */}
                <div className="bg-[#0A1628]/80 p-4 rounded-2xl border border-[#1A3152]/80 mb-6 text-xs text-[#F5F0E8]/80 leading-relaxed min-h-[72px]">
                  {tool.id === 'bh-konver'
                    ? t('tools.konver.desc', tool.description)
                    : tool.id === 'bh-papirfinder'
                    ? t('tools.papir.desc', tool.description)
                    : t('tools.stecak.desc', tool.description)}
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8 text-xs text-[#F5F0E8]/70 font-sans">
                  {tool.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#00C9A7]/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#00C9A7]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Link Launcher Buttons */}
              <div className="space-y-2">
                {tool.id === 'bh-konver' && (
                  <button
                    onClick={() => setShowKonverModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00C9A7]/15 hover:bg-[#00C9A7]/25 border border-[#00C9A7]/50 text-[#00C9A7] font-syne font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-[#00C9A7]" />
                    <span>{t('tools.konver.videoBtn', 'Pogledajte Prezentacijski Video')}</span>
                  </button>
                )}

                {tool.videoEmbedUrl && tool.id === 'ornamenti-bosne' && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedVideoVersion('bos');
                        setActiveToolVideo(tool);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000] border border-[#FF0000]/40 text-[#FF4E4E] hover:text-white font-syne font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t('tools.stecak.videoBtn', 'Video Prezentacija (YouTube)')}</span>
                    </button>

                    {onOpenContact && (
                      <button
                        onClick={onOpenContact}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#C9A84C]/15 hover:bg-[#C9A84C] border border-[#C9A84C]/60 text-[#C9A84C] hover:text-[#0A1628] font-syne font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <Package className="w-4 h-4" />
                        <span>{t('tools.stecak.orderUsbBtn', 'Naruči na USB Sticku (Pouzećem)')}</span>
                      </button>
                    )}
                  </>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/20"
                  >
                    <span>{tool.id === 'ornamenti-bosne' ? t('tools.stecak.btn', 'Prelistaj E-Katalog') : `Pokreni ${tool.name}`}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setPreviewTool({
                        title: tool.name,
                        url: tool.url,
                        futureDomain: tool.id === 'bh-konver' ? 'bh-konver.ba' : tool.id === 'bh-papirfinder' ? 'bh-papirfinder.ba' : 'ornamenti-bosne.ba',
                        badge: tool.badge || 'DIGITALNI ALAT',
                      });
                    }}
                    title="Brzi pregled aplikacije u prozoru"
                    className="py-3 px-3 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8]/80 hover:text-[#00C9A7] text-xs font-mono font-bold transition-all flex items-center justify-center"
                  >
                    ⚡
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Right-To-Left Promo Banner Carousel Component */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono font-bold uppercase tracking-wider">
              {t('carousel.badge', 'PROMOTIVNI BANERI & NAJAVE')}
            </span>
            <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8]">
              {t('carousel.title', 'B&H Assistant Promotivni Centar')}
            </h3>
            <p className="text-xs text-[#F5F0E8]/70 font-sans">
              {t('carousel.subtitle', 'Prelistajte naše ključne inicijative, digitalne alate, partnerstva i promotivne ponude.')}
            </p>
          </div>

          <PromoBannerCarousel
            onOpenContact={onOpenContact}
            onOpenBojanka={onOpenBojanka}
          />
        </div>

      </div>

      {/* External Tool In-App Sandboxed Preview Modal */}
      {previewTool && (
        <ExternalToolEmbedModal
          isOpen={!!previewTool}
          onClose={() => setPreviewTool(null)}
          title={previewTool.title}
          externalUrl={previewTool.url}
          futureDomain={previewTool.futureDomain}
          badge={previewTool.badge}
        />
      )}

      {/* BH KONVER Video Modal */}
      <BhKonverVideoModal
        isOpen={showKonverModal}
        onClose={() => setShowKonverModal(false)}
      />

      {/* ORNAMENTS OF BOSNIA (and Tools) Video Player Modal */}
      <AnimatePresence>
        {activeToolVideo && activeToolVideo.videoEmbedUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0F2038] border-2 border-[#C9A84C]/60 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FF0000]/20 text-[#FF4E4E] border border-[#FF0000]/30">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-syne font-extrabold text-lg sm:text-2xl text-[#F5F0E8]">
                        ORNAMENTI BOSNE • Video Prezentacija
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-mono font-bold">
                        USB DOSTAVA & POUZEĆE 📦
                      </span>
                    </div>
                    <p className="text-xs text-[#00C9A7] font-mono mt-0.5">
                      Zvanična video prezentacija digitalnog proizvoda i kataloga • B&H Assistant d.o.o. Zenica
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveToolVideo(null)}
                  className="p-2.5 rounded-2xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Version Toggle (Bosanski vs English) */}
              <div className="flex items-center justify-between flex-wrap gap-2 p-2 rounded-2xl bg-[#0A1628] border border-[#1A3152]">
                <span className="text-xs font-mono text-[#F5F0E8]/70 px-2 font-semibold">
                  Odaberite video prezentaciju:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedVideoVersion('bos')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all flex items-center gap-1.5 ${
                      selectedVideoVersion === 'bos'
                        ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/30'
                        : 'text-[#F5F0E8]/70 hover:text-white bg-[#0F2038]'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Zvanični Video (Bosanski 🇧🇦)</span>
                  </button>
                  <button
                    onClick={() => setSelectedVideoVersion('eng')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all flex items-center gap-1.5 ${
                      selectedVideoVersion === 'eng'
                        ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/30'
                        : 'text-[#F5F0E8]/70 hover:text-white bg-[#0F2038]'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Digital Catalogue (English 🇬🇧)</span>
                  </button>
                </div>
              </div>

              {/* YouTube Video Player Embed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00C9A7] flex items-center gap-1.5 font-bold uppercase">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {selectedVideoVersion === 'bos'
                      ? 'Zvanični YouTube Video: https://youtu.be/CyJx3h3nGyA'
                      : 'English Video Catalogue: https://youtu.be/VXc7aCa-Auc'}
                  </span>
                  <a
                    href={selectedVideoVersion === 'bos' ? (activeToolVideo.videoUrl || 'https://youtu.be/CyJx3h3nGyA') : (activeToolVideo.englishVideoUrl || 'https://youtu.be/VXc7aCa-Auc')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#FF4E4E] hover:underline flex items-center gap-1"
                  >
                    <span>Gledaj na YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-[#1A3152] shadow-2xl bg-black aspect-video">
                  <iframe
                    key={selectedVideoVersion}
                    className="w-full h-full border-0"
                    src={selectedVideoVersion === 'bos' ? activeToolVideo.videoEmbedUrl : (activeToolVideo.englishVideoEmbedUrl || 'https://www.youtube.com/embed/VXc7aCa-Auc?rel=0&modestbranding=1')}
                    title="Ornaments of Bosnia Video Presentation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* EXCLUSIVE USB MEMORY STICK DELIVERY NOTICE */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#C9A84C]/15 via-[#0F2038] to-[#00C9A7]/15 border-2 border-[#C9A84C]/50 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] font-bold uppercase tracking-wider">
                  <Truck className="w-5 h-5 text-[#00C9A7]" />
                  <span>JEDINI DIGITALNI PROIZVOD KOJI SE DOSTAVLJA NA ADRESU NA USB MEMORY STICKU</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F0E8] leading-relaxed font-sans">
                  Kolekcija <strong>"Ornamenti Bosne"</strong> je jedinstvena po tome što je <strong>jedini digitalni proizvod koji možete naručiti s fizičkom dostavom na Vašu kućnu ili poslovnu adresu na USB Memory Sticku</strong>, uz <strong>sigurno plaćanje tek po preuzimanju pošiljke (pouzećem)</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#F5F0E8]/90 font-sans">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                    <HardDrive className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    <span>USB Memory Stick sa SVG & PNG fajlovima</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                    <ShieldCheck className="w-4 h-4 text-[#00C9A7] shrink-0" />
                    <span>Plaćanje po preuzimanju (pouzećem)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0" />
                    <span>HTML & CSS kodovi za veb i dizajn</span>
                  </div>
                </div>
              </div>

              {/* Catalogue Overview Information */}
              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00C9A7] font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#00C9A7]" />
                  <span>O digitalnoj kolekciji i e-katalogu "Ornamenti Bosne"</span>
                </div>
                <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans">
                  Digitalna zbirka donosi digitalizovane i stilizovane simbole i motive sa srednjovjekovnih bosanskih stećaka, pažljivo pripremljene za moderne dizajnere, veb projekte, arhitekte, istraživače i modne kreatore.
                </p>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#00C9A7] flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  B&H Assistant d.o.o. Zenica • Autorska Digitalna Baština
                </span>

                <div className="flex flex-wrap items-center gap-2.5">
                  {onOpenContact && (
                    <button
                      onClick={() => {
                        setActiveToolVideo(null);
                        onOpenContact();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-[#C9A84C]/20"
                    >
                      <Package className="w-4 h-4" />
                      <span>Naruči na USB Sticku (Pouzećem)</span>
                    </button>
                  )}

                  <a
                    href={activeToolVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Otvori E-Katalog na Canva</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setActiveToolVideo(null)}
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
    </section>
  );
};



