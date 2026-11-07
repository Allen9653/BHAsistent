import React, { useState } from 'react';
import { SCENA_MAGAZINE } from '../data/companyData';
import { SafeImage } from './SafeImage';
import { ScenaVideoPromotionBox } from './ScenaVideoPromotionBox';
import { BookOpen, ExternalLink, Sparkles, Layers, Disc, Flame, Shield, Award, Eye, X, Tv } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/images';

export const ScenaMagazineSection: React.FC = () => {
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [selectedMosaicImage, setSelectedMosaicImage] = useState<{ title: string; cat: string; img: string } | null>(null);
  const { t } = useLanguage();

  return (
    <section id="scena-magazin" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('scena.badge', 'URBANI MAGAZIN ZDK')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('scena.title', 'Magazin SCENA+ • Spajamo Kulture & Stvaramo Šanse')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed">
            {t('scena.subtitle', 'Promovišemo mlade talente, kulturno naslijeđe Zenice i inovativne bh. biznis priče kroz fizička i digitalna izdanja.')}
          </p>
        </div>

        {/* Magazine Main Feature Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8 lg:p-12 shadow-2xl relative">
          
          {/* Left Poster & Magazine Cover Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            <div className="relative max-w-md w-full rounded-3xl overflow-hidden border-2 border-[#C9A84C]/60 bg-[#0A1628] shadow-2xl hover:border-[#00C9A7] transition-all duration-300 flex flex-col group">
              
              {/* Top Header Badge & Meta */}
              <div className="p-3.5 bg-[#0A1628] border-b border-[#1A3152] flex items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-syne font-black text-[#C9A84C] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0F2038] border border-[#C9A84C]/40 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#00C9A7]" />
                    <span>PRINT & E-IZDANJE</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#00C9A7] px-2 py-0.5 rounded bg-[#00C9A7]/10 border border-[#00C9A7]/20 hidden sm:inline">
                    Broj 1 • 2026
                  </span>
                </div>
                <a
                  href={SCENA_MAGAZINE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-[#00C9A7]/10 hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/40 text-[10px] font-mono font-bold transition-all flex items-center gap-1"
                  title="Otvori na Canva platformi"
                >
                  <span>Canva E-Reader</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Magazine Cover Image Display - Fully filling the entire box */}
              <div 
                className="relative w-full aspect-[3/4] min-h-[420px] sm:min-h-[500px] overflow-hidden bg-[#0A1628] cursor-pointer"
                onClick={() => setShowReaderModal(true)}
              >
                <SafeImage
                  src={IMAGES.scenaCover}
                  alt="Magazin SCENA+ Naslovna Stranica - Spajamo Kulture Stvaramo Šanse"
                  fallbackTitle="MAGAZIN SCENA+"
                  fallbackSubtitle="Spajamo Kulture, Stvaramo Šanse • ZDK"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                {/* Interactive Hover Tag Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#0A1628]/90 backdrop-blur-md border border-[#1A3152] group-hover:border-[#00C9A7]/60 transition-all shadow-xl flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#00C9A7] font-bold block uppercase tracking-wider">
                      Prvo Izdanje • Septembar 2026
                    </span>
                    <span className="text-xs font-syne font-extrabold text-[#F5F0E8] block">
                      SCENA+ Spajamo Kulture Stvaramo Šanse
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReaderModal(true);
                    }}
                    className="p-2 rounded-xl bg-[#00C9A7] text-[#0A1628] hover:bg-[#00E5BE] font-bold text-xs shadow-md transition-transform hover:scale-105 shrink-0"
                    title="Uvećaj i prelistaj naslovnicu"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-3.5 bg-[#0F2038] border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setShowReaderModal(true)}
                  className="flex-1 min-w-[140px] py-2.5 px-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Brzi Pregled</span>
                </button>
                <a
                  href={SCENA_MAGAZINE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] py-2.5 px-3 rounded-xl bg-[#C9A84C] hover:bg-[#FFD700] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Canva Reader</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Magazine Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider block font-bold">
                {SCENA_MAGAZINE.subtitle} • {SCENA_MAGAZINE.date}
              </span>
              <h3 className="font-syne font-extrabold text-3xl text-[#F5F0E8]">
                Sadržaj i Teme <span className="text-[#00C9A7]">Prvog Izdanja</span>
              </h3>
            </div>

            <p className="text-sm text-[#F5F0E8]/80 leading-relaxed font-sans">
              SCENA+ donosi autentične priče iz Zeničko-dobojskog kantona i cijele Bosne i Hercegovine. Spajamo kulturno naslijeđe, moderne umjetničke pravce, digitalnu ekonomiju i lokalni poduzetnički duh u jedno pregledno i moderno izdanje.
            </p>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {SCENA_MAGAZINE.topics.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] space-y-2 flex flex-col justify-between">
                  {item.image && (
                    <div className="w-full h-24 rounded-lg overflow-hidden border border-[#1A3152] bg-[#0F2038]">
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        fallbackTitle={item.title}
                        fallbackSubtitle={item.category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#00C9A7] uppercase font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#F5F0E8]/70 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={SCENA_MAGAZINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8973B] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Prelistaj e-Izdanje Magazina (Canva Link)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowReaderModal(true)}
                className="px-5 py-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] hover:border-[#00C9A7] text-[#00C9A7] font-syne font-bold text-xs tracking-wide transition-all"
              >
                Interaktivni Prikaz
              </button>
            </div>

          </div>

        </div>

        {/* SCENA+ CANVA VIDEO PROMOTION PLAYER BOX (Replicating https://canva.link/vxekpnx0ow1xvt9) */}
        <div className="mb-16">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C]">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8]">
                  SCENA+ Video Prezentacija & Promo Emitovanje
                </h3>
                <p className="text-xs text-[#00C9A7] font-mono">
                  Interaktivni video player sa kontrolama (Stop / Return / Play / Canva Link)
                </p>
              </div>
            </div>
          </div>

          <ScenaVideoPromotionBox onOpenReader={() => setShowReaderModal(true)} />
        </div>

        {/* Visual Magazine Spread & Page Gallery */}
        <div className="mt-12 rounded-3xl bg-[#0F2038] border border-[#1A3152] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1A3152] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>GALERIJA IZDANJA & GRAFIČKI MOTIVI</span>
              </div>
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8] mt-1">
                Vizuelni Mozaik Magazina SCENA+
              </h3>
            </div>
            <a
              href={SCENA_MAGAZINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/40 text-xs font-mono font-bold transition-all shadow-md"
            >
              <span>Pregledaj Cijelo Canva Izdanje →</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { title: "Grafički Motivi & Art", cat: "Vizuelni Esej", img: "https://i.imgur.com/5nggK91.jpg" },
              { title: "Priče i Reportaže", cat: "Kultura & Društvo", img: "https://i.imgur.com/aJAQ3QQ.jpg" },
              { title: "Ekskluzivni Editorijal", cat: "SCENA+ Izdanje", img: "https://i.imgur.com/FAlBFNi.jpg" },
              { title: "Urbana Scena & Intervju", cat: "Kultura & Umjetnost", img: "https://i.imgur.com/dEfRPek.jpg" },
              { title: "Tematske Rubrike & IT", cat: "Biznis & Tehnologija", img: "https://i.imgur.com/Qaxqao8.jpg" },
              { title: "Priče sa Istočne Strane", cat: "Reportaža & Baština", img: "https://i.imgur.com/S4HjbRh.jpg" },
            ].map((galleryItem, gIdx) => (
              <div
                key={gIdx}
                onClick={() => setSelectedMosaicImage(galleryItem)}
                className="group relative rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] hover:border-[#00C9A7] transition-all cursor-pointer shadow-lg aspect-[4/5] flex flex-col justify-between p-2"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <SafeImage
                    src={galleryItem.img}
                    alt={galleryItem.title}
                    fallbackTitle={galleryItem.title}
                    fallbackSubtitle={galleryItem.cat}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[10px] font-mono text-[#00C9A7] block leading-tight font-bold">
                      {galleryItem.cat}
                    </span>
                    <h5 className="text-xs font-syne font-bold text-[#F5F0E8] truncate">
                      {galleryItem.title}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mosaic Image Detail Lightbox Modal */}
      {selectedMosaicImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/95 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
              <div>
                <span className="text-xs font-mono text-[#00C9A7] uppercase font-bold tracking-wider">
                  {selectedMosaicImage.cat} • Magazin SCENA+
                </span>
                <h3 className="font-syne font-bold text-xl text-[#F5F0E8] mt-0.5">
                  {selectedMosaicImage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMosaicImage(null)}
                className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#0A1628] border border-[#1A3152] max-h-[60vh] flex items-center justify-center">
              <SafeImage
                src={selectedMosaicImage.img}
                alt={selectedMosaicImage.title}
                fallbackTitle={selectedMosaicImage.title}
                fallbackSubtitle={selectedMosaicImage.cat}
                className="w-full h-auto max-h-[58vh] object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={SCENA_MAGAZINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Prelistaj Cijelo Canva Izdanje</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedMosaicImage(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1A3152] text-[#F5F0E8] text-xs font-semibold hover:bg-[#0A1628] transition-colors"
              >
                Zatvori Prikaz
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reader Modal */}
      {showReaderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowReaderModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>← Vrati se (Return)</span>
                </button>
                <div>
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-[#F5F0E8]">
                    SCENA+ Magazin — e-Verzija
                  </h3>
                  <p className="text-xs text-[#00C9A7] font-mono">
                    Prvo Izdanje • Septembar / Rujan 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReaderModal(false)}
                className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7]"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#F5F0E8]/80 font-sans">
                Zvanična e-verzija magazina SCENA+ dostojna je svakog digitalnog e-čitača. Klikom na dugme ispod možete otvoriti kompletno interaktivno izdanje na Canva e-platformi.
              </p>

              <div className="aspect-video w-full rounded-2xl bg-[#0A1628] border border-[#1A3152] p-8 flex flex-col items-center justify-center text-center space-y-4">
                <BookOpen className="w-16 h-16 text-[#C9A84C] animate-pulse" />
                <h4 className="font-syne font-bold text-lg text-[#F5F0E8]">
                  SCENA+ Spajamo Kulture Stvaramo Šanse
                </h4>
                <p className="text-xs text-[#F5F0E8]/70 max-w-md font-sans">
                  Prvi urbani magazin u ZDK sa ekskluzivnim temama: Danilo Keso Art, BCX Krypto, Craft Pivare, Endemska Fauna, Gaming Parvantanam, Emisija Propuh i priče o uspjehu.
                </p>
                <a
                  href={SCENA_MAGAZINE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-lg flex items-center gap-2 hover:bg-[#00E5BE]"
                >
                  <span>Otvori Magazin na Canva (Full Screen)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowReaderModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#1A3152] text-[#F5F0E8] text-xs font-semibold hover:bg-[#0A1628]"
              >
                Zatvori Pregled
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
