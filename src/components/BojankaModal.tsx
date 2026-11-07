import React, { useState } from 'react';
import { Download, ExternalLink, X, Sparkles, BookOpen, CheckCircle, Play } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';

interface BojankaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BojankaModal: React.FC<BojankaModalProps> = ({ isOpen, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);
  if (!isOpen) return null;

  const canvaPreviewUrl = "https://canva.link/tna306bm8p462xm";
  const archiveDownloadUrl = "https://archive.org/details/gummi-bojanka";
  const gummiPromoVideoUrl = "https://youtu.be/SxWVktly_vA";
  const gummiPromoEmbedUrl = "https://www.youtube.com/embed/SxWVktly_vA?rel=0&modestbranding=1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0F2038] border-2 border-[#C9A84C]/60 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#C9A84C]/20 text-[#C9A84C]">
              <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg text-[#F5F0E8]">
                Edukativna Bojanka GUMMI (PDF)
              </h3>
              <p className="text-xs text-[#00C9A7] font-mono">
                Poklon izdanje B&H Assistant d.o.o. Zenica
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-3 text-center flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#C9A84C] text-[#0A1628] font-syne font-bold text-[11px] uppercase">
                100% BESPLATAN DOWNLOAD
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF4E4E] font-syne font-bold text-[11px] uppercase flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" />
                VIDEO PROMOCIJA
              </span>
            </div>

            {/* Video or Coloring Book Cover Toggle */}
            {showVideo ? (
              <div className="w-full aspect-video my-2 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A84C]/60 bg-black">
                <iframe
                  className="w-full h-full border-0"
                  src={gummiPromoEmbedUrl}
                  title="GUMMI Promo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-52 aspect-[2/3] my-2 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A84C]/60 bg-[#0F2038]">
                <SafeImage
                  src={IMAGES.gummiBojanka}
                  alt="GUMMI Bojanka za Djecu i Roditelje Naslovna Strana"
                  fallbackTitle="GUMMI Bojanka"
                  fallbackSubtitle="Učimo pisati slova"
                  fallbackIcon={<BookOpen className="w-8 h-8 text-[#C9A84C]" />}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Video / Cover Toggle Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowVideo(!showVideo)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7] text-xs font-mono text-[#00C9A7] transition-all flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{showVideo ? 'Prikaži Naslovnicu Bojanke' : 'Pusti Promotivni Video'}</span>
              </button>

              <a
                href={gummiPromoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000] border border-[#FF0000]/30 text-xs font-mono text-[#FF4E4E] hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>YouTube Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h4 className="font-syne font-extrabold text-2xl text-[#F5F0E8] pt-2">
              "Učimo Pisati Štampana i Pisana Slova"
            </h4>

            <p className="text-xs text-[#F5F0E8]/80 font-sans max-w-lg mx-auto leading-relaxed">
              Kroz igru, smijeh i druženje sa voljenim junakom GUMMI-jem! Ova edukativna bojanka pripremljena je za sve roditelje, odgajatelje i djecu predškolskog i mlađeg školskog uzrasta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-sans text-[#00C9A7] pt-2 w-full">
              <div className="p-2 rounded-lg bg-[#0F2038] border border-[#1A3152]">✓ Štampana i pisana slova</div>
              <div className="p-2 rounded-lg bg-[#0F2038] border border-[#1A3152]">✓ Vježbe motorike i crtanja</div>
              <div className="p-2 rounded-lg bg-[#0F2038] border border-[#1A3152]">✓ Spremno za printanje</div>
            </div>
          </div>

          {/* Action Download & Preview Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={archiveDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 px-6 rounded-xl bg-[#C9A84C] hover:bg-[#FFD700] text-[#0A1628] font-syne font-bold text-xs tracking-wider shadow-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Preuzmi PDF Verziju (Archive.org)</span>
            </a>

            <a
              href={canvaPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#00C9A7]/50 text-[#00C9A7] font-syne font-bold text-xs tracking-wider shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Pretpregled (Canva Link)</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-4 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] font-syne font-bold text-xs hover:border-[#00C9A7]"
            >
              Zatvori
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
