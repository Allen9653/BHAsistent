import React, { useState, useEffect } from 'react';
import { Play, Pause, X, ExternalLink, Globe, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, Volume2, RefreshCw } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';

interface BhKonverVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BhKonverVideoModal: React.FC<BhKonverVideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "1. Naslovna Stranica i Izbor Pravnih Izjava",
      desc: "Korisnici prvo vide čist sučelje sa odabirom izjava (Izjava o identitetu, poklonu, prebivalištu) prilagođenih zakonu BiH.",
      highlight: "Mobilna i Desktop Odzivnost"
    },
    {
      title: "2. Generator Pravnih Dokumenata & PDF Izvoz",
      desc: "Brza popuna podataka pod materijalnom i kaznenom odgovornošću bez potrebe za fizičkim odlaskom u notar ili općinu.",
      highlight: "Maksimalna Privatnost Podataka"
    },
    {
      title: "3. Višejezični Mod & Priprema za Zvaničnu Domenu",
      desc: "U toku je prošiđenje kompletnog prijevoda (Engleski, Njemački, Turski, Ćirilica) na cijelu aplikaciju uoči zakupa domene www.bh-konver.ba.",
      highlight: "Kominiciramo sa Lovable Platformom"
    }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/95 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1A3152] bg-[#0A1628]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00C9A7]/20 text-[#00C9A7]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-syne font-extrabold text-lg text-[#F5F0E8] flex items-center gap-2">
                <span>BH KONVER — Promotivni Prezentacijski Video</span>
                <span className="px-2 py-0.5 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] text-[10px] font-mono">
                  VIDEO DEMO
                </span>
              </h3>
              <p className="text-xs text-[#C9A84C] font-mono">
                Pregled korisničkog iskustva i plan razvoja za www.bh-konver.ba
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player & Presentation Screen */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Main Video Frame Box */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#1A3152] bg-[#0A1628] aspect-video group shadow-2xl">
            {/* Background Thumbnail Image */}
            <SafeImage
              src={IMAGES.bhKonverMockup}
              alt="BH Konver Promo Video Demo Screen"
              fallbackTitle="BH KONVER"
              fallbackSubtitle="Video Prezentacija & Demo"
              className="w-full h-full object-cover"
            />

            {/* Simulated Live Play Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent flex flex-col justify-between p-6">
              
              {/* Top Video Status Tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1628]/80 backdrop-blur-md border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>PREZENTACIJA PROJEKTA</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#F5F0E8]/80 bg-[#0A1628]/80 px-3 py-1 rounded-full border border-[#1A3152]">
                  <Volume2 className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>HD 1080p Video</span>
                </div>
              </div>

              {/* Center Play Pause Button */}
              <div className="self-center flex flex-col items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] flex items-center justify-center shadow-xl shadow-[#00C9A7]/40 hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-[#0A1628]" /> : <Play className="w-7 h-7 fill-[#0A1628] ml-1" />}
                </button>
                <span className="text-xs font-mono text-[#F5F0E8] font-bold bg-[#0A1628]/90 px-3 py-1 rounded-full border border-[#1A3152]">
                  {isPlaying ? 'Video se reprodukuje (Simulacija sučelja)' : 'Pauzirano - Kliknite za nastavak'}
                </span>
              </div>

              {/* Bottom Video Progress & Slide Info */}
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-[#0A1628]/90 backdrop-blur-md border border-[#00C9A7]/40 text-xs">
                  <div className="flex items-center justify-between text-[#C9A84C] font-mono font-bold mb-1">
                    <span>{slides[activeSlide].title}</span>
                    <span className="text-[10px] text-[#00C9A7]">{slides[activeSlide].highlight}</span>
                  </div>
                  <p className="text-[#F5F0E8]/90 font-sans">
                    {slides[activeSlide].desc}
                  </p>
                </div>

                {/* Timeline Progress Bar */}
                <div className="w-full bg-[#1A3152] h-1.5 rounded-full overflow-hidden flex">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-full transition-all duration-500 flex-1 border-r border-[#0A1628] ${
                        idx === activeSlide ? 'bg-[#00C9A7]' : idx < activeSlide ? 'bg-[#00C9A7]/50' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Info & Status Update regarding Translations & Launch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Prezentacijski Zaključci */}
            <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#00C9A7] font-syne font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Šta Prikazuje Ovaj Video?</span>
              </div>
              <p className="text-[#F5F0E8]/80 leading-relaxed font-sans">
                Snimak predstavlja kompletan tok generisanja pravnih izjava pod kaznenom odgovornošću, pretvaranje jedinica i jednostavnost rada sa dokumentima u Bosni i Hercegovini.
              </p>
            </div>

            {/* Box 2: Plan Nadogradnje & Zvanična Domena */}
            <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#C9A84C]/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#C9A84C] font-syne font-bold text-sm">
                <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
                <span>Završna Nadogradnja Prijevoda</span>
              </div>
              <p className="text-[#F5F0E8]/80 leading-relaxed font-sans">
                Prijevodi (Engleski, Njemački, Turski, Ćirilica) se trenutno kompletiraju na svim podstranicama u saradnji sa razvojnim timom. Slijedi zakup zvanične domene <strong className="text-[#00C9A7]">www.bh-konver.ba</strong> i lansiranje u produkciju!
              </p>
            </div>

          </div>

          {/* Action Footer Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1A3152]">
            <span className="text-xs font-mono text-[#F5F0E8]/60">
              Razvijeno u sklopu IT alata B&H Assistant d.o.o. Zenica
            </span>
            <a
              href="https://bh-konver.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-[#00C9A7]/20 transition-all hover:scale-105"
            >
              <span>Otvori Testnu BH KONVER Aplikaciju</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
