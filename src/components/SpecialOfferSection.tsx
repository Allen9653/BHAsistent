import React, { useState, useEffect } from 'react';
import { Play, MessageSquare, Sparkles, ExternalLink, X, CheckCircle2, ArrowRight, Video, Globe, Server, Mail, DollarSign, Share2, TrendingUp } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';

interface SpecialOfferSectionProps {
  className?: string;
  onOpenContact?: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  className = '',
  onOpenContact,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (onOpenContact) {
      e.preventDefault();
      onOpenContact();
    } else {
      const contactEl = document.getElementById('kontakt') || document.querySelector('footer');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const packageItems = [
    {
      icon: Globe,
      title: 'Moderan i interaktivan website',
      desc: 'Multimedijalni sadržaj, višejezična podrška (BHS + strani jezici) i napredna SEO optimizacija za pretraživače.'
    },
    {
      icon: Server,
      title: 'Domena i hosting',
      desc: 'Izbor željene domene (.ba, .com ili druga) uz pouzdan, brz i stabilan hosting server.'
    },
    {
      icon: Mail,
      title: 'Profesionalni privatni e-mail',
      desc: 'Poslovna adresa sa vašim domenom (npr. info@vasbiznis.ba) za ozbiljnu i pouzdanu komunikaciju.'
    },
    {
      icon: DollarSign,
      title: 'Sistem za zaradu',
      desc: 'Ugrađene opcije za iznajmljivanje reklamnog prostora i plasiranje profitabilnih affiliate linkova.'
    },
    {
      icon: Share2,
      title: 'Bonus marketing paket',
      desc: 'Profesionalno kreirane reklame i vizuali prilagođeni za Facebook, Instagram i LinkedIn mreže.'
    }
  ];

  return (
    <section
      id="usluga-po-mjeri"
      aria-label="Usluga po mjeri - Specijalna ponuda"
      className={`w-full max-w-7xl mx-auto my-8 sm:my-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E2E] via-[#0F2438] to-[#0A1628] border-2 border-[#00C9A7]/60 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 hover:border-[#00C9A7] group">
        
        {/* Glow lights & accent lines */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00C9A7]/20 via-[#00E5BE]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#C9A84C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00C9A7] to-transparent opacity-90" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image with Play Video Overlay (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <a
              href="https://postimg.cc/cK52rgww"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full max-w-[480px] aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#00C9A7]/70 hover:border-[#C9A84C] bg-[#04131A] shadow-2xl shadow-[#00C9A7]/25 transition-all duration-300 hover:scale-[1.02] group/img cursor-pointer block focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              title="Specijalna ponuda za sve - 900 KM (Kliknite za prikaz u punoj rezoluciji)"
            >
              <SafeImage
                src={IMAGES.specijalnaPonudaBanner}
                alt="specijalna-ponuda-za-sve-900"
                fallbackTitle="Specijalna Ponuda"
                fallbackSubtitle="Paket za 900 KM"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/25 to-transparent" />

              {/* Play video button button overlay */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsVideoOpen(true);
                }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                title="Pokreni video prezentaciju ponude"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] flex items-center justify-center shadow-2xl group-hover/img:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current translate-x-0.5 text-[#0A1628]" />
                </div>
              </div>

              {/* Bottom tag bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                <span className="px-3 py-1 rounded-lg bg-[#0A1628]/95 border border-[#00C9A7]/50 text-[#00E5BE] font-bold flex items-center gap-1.5 shadow-md">
                  <Video className="w-3.5 h-3.5 text-[#00C9A7]" />
                  <span>Video Prezentacija</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#C9A84C] text-[#0A1628] font-extrabold shadow-md">
                  Paket 900 KM ▶
                </span>
              </div>
            </a>
            
            <div className="mt-3 flex items-center justify-between w-full max-w-[480px] px-1 text-[11px] font-mono text-[#F5F0E8]/70">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="text-[#00E5BE] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Pokreni video prezentaciju</span>
              </button>
              <a
                href="https://postimg.cc/cK52rgww"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A84C] hover:underline flex items-center gap-1"
              >
                <span>Prikaži sliku (Postimg)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Information & Package Content (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-md uppercase">
                USLUGA PO MJERI
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0F2038] border border-[#00C9A7]/40 text-[#00E5BE] font-mono text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>B&H Assistant d.o.o. Zenica</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/60 text-[#C9A84C] font-mono text-xs font-bold">
                Cijena paketa: 900 KM
              </span>
            </div>

            {/* Main Title & Catchphrase */}
            <div>
              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight leading-tight">
                SPECIJALNA PONUDA!
              </h2>
              <p className="text-base sm:text-lg text-[#00E5BE] font-medium mt-2 leading-snug">
                Internet stranica Vašeg biznisa treba da radi za Vas! To je investicija koja se otplaćuje – BH Asistent Vam je kreira, Vi odlučujete!
              </p>
            </div>

            {/* Package Items Card */}
            <div className="rounded-2xl bg-[#0A1628]/80 border border-[#00C9A7]/30 p-4 sm:p-5 space-y-3.5 shadow-inner">
              <h3 className="font-syne font-bold text-sm sm:text-base text-[#F5F0E8] flex items-center gap-2 border-b border-[#1A3152] pb-2">
                <TrendingUp className="w-4 h-4 text-[#C9A84C]" />
                <span>Šta sve dobijate u paketu za 900 KM?</span>
              </h3>

              <div className="space-y-3">
                {packageItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F0E8]/90">
                      <div className="mt-0.5 p-1 rounded-lg bg-[#00C9A7]/15 text-[#00C9A7] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-[#F5F0E8] font-semibold">{item.title}</strong>
                        <span className="text-[#F5F0E8]/80"> – {item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Value Proposition */}
            <p className="text-xs sm:text-sm font-medium text-[#F5F0E8]/90 italic border-l-2 border-[#C9A84C] pl-3 py-1">
              Pretvorite trošak izrade web stranice u pametnu investiciju koja radi za vas i vraća uloženi novac.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Contact Button */}
              <a
                href="#kontakt"
                onClick={handleContactClick}
                className="px-6 py-3.5 rounded-2xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs sm:text-sm tracking-wider shadow-lg shadow-[#00C9A7]/30 transition-all hover:scale-105 flex items-center gap-2 min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-[#0A1628]" />
                <span>Javite se sada i rezervišite svoj termin!</span>
                <ArrowRight className="w-4 h-4 text-[#0A1628]" />
              </a>

              {/* Video Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="px-5 py-3.5 rounded-2xl bg-[#0F2038] hover:bg-[#1A3152] text-[#F5F0E8] border border-[#00C9A7]/40 hover:border-[#00C9A7] font-syne font-bold text-xs sm:text-sm tracking-wider transition-all hover:scale-105 flex items-center gap-2 min-h-[48px]"
              >
                <Play className="w-4 h-4 fill-current text-[#00C9A7]" />
                <span>Video Prezentacija</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Video Presentation Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video Prezentacija - Specijalna Ponuda"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1A3152] bg-[#0A1628]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00C9A7]/20 text-[#00C9A7]">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-base sm:text-lg text-[#F5F0E8] flex items-center gap-2">
                    <span>SPECIJALNA PONUDA — Video Prezentacija</span>
                  </h3>
                  <p className="text-[11px] font-mono text-[#00C9A7]">
                    B&H Assistant d.o.o. Zenica • Paket izrade web stranice za 900 KM
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-xl bg-[#1A3152]/80 hover:bg-rose-500/20 text-[#F5F0E8]/70 hover:text-rose-400 border border-[#1A3152] transition-colors"
                aria-label="Zatvori video prezentaciju"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-3 sm:p-5 bg-black flex items-center justify-center">
              <video
                src={IMAGES.specijalnaPonudaVideo}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[60vh] rounded-xl object-contain shadow-2xl"
              >
                Vaš internet preglednik ne podržava direktnu reprodukciju HTML5 videa.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0A1628] border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-3">
              <a
                href={IMAGES.specijalnaPonudaVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00C9A7] hover:text-[#00E5BE] flex items-center gap-1.5 font-mono underline underline-offset-4"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Otvori direktan link videa (.mp4)</span>
              </a>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1A3152] hover:bg-[#00C9A7] text-[#F5F0E8] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors ml-auto"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
