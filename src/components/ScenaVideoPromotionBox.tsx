import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { SCENA_MAGAZINE } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
  Layers,
  BookOpen,
  Tv,
  Radio,
  Gamepad2,
  Coins,
  Beer,
  Palette,
  Compass,
  CheckCircle2,
  Share2,
  Eye,
  SkipBack,
  SkipForward
} from 'lucide-react';

interface ScenaVideoPromotionBoxProps {
  onOpenReader?: () => void;
  className?: string;
}

interface VideoScene {
  id: number;
  duration: number; // in seconds
  title: string;
  tag: string;
  subtitle: string;
  image: string;
  accentColor: string;
  details: string[];
  description: string;
  badge: string;
}

const CANVA_VIDEO_URL = "https://canva.link/vxekpnx0ow1xvt9";
const CANVA_MAGAZINE_URL = SCENA_MAGAZINE.url || "https://canva.link/8dwxeack5cwn18l";

export const ScenaVideoPromotionBox: React.FC<ScenaVideoPromotionBoxProps> = ({
  onOpenReader,
  className = ''
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'video' | 'canva_embed'>('video');
  const [copiedLink, setCopiedLink] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Scenes recreating the Canva presentation flow
  const scenes: VideoScene[] = [
    {
      id: 1,
      duration: 6,
      title: "SCENA+ Spajamo Kulture Stvaramo Šanse",
      tag: "PRINT & E-IZDANJE",
      subtitle: "Prvo Izdanje • Septembar / Rujan 2026",
      image: IMAGES.scenaCover,
      accentColor: "#C9A84C",
      details: ["300 besplatnih printanih primjeraka", "Distribucija u ZDK & regiji", "Zvanična digitalna e-platforma"],
      description: "Prvi urbani magazin Zeničko-dobojskog kantona koji spaja nezavisnu kulturu, mlade autore, turističke bisere i tehnološki napredak.",
      badge: "NASLOVNICA & UVOD"
    },
    {
      id: 2,
      duration: 6,
      title: "Dani Keso Art: 'Mrak koji svijetli'",
      tag: "KULTURA & VINYL KOLEKCIONARI",
      subtitle: "Ekskluzivni vizuelni esej i intervju",
      image: IMAGES.daniKesoArt,
      accentColor: "#00C9A7",
      details: ["Underground umjetnost Zenice", "Rijetke vinyl ploče & muzička historija", "Autentični autorski radovi"],
      description: "Umjetnički opus Danila Kese donosi jedinstven pogled na urbanu scenu, mrak koji osvjetljava kreativne horizonte i tradiciju muzičkog kolekcionarstva.",
      badge: "KULTURA & UMJETNOST"
    },
    {
      id: 3,
      duration: 6,
      title: "Craft Pivare & Ugostiteljstvo",
      tag: "GASTRO & BIZNIS REVOLUCIJA",
      subtitle: "Nova energija lokalne proizvodnje",
      image: IMAGES.craftPivare,
      accentColor: "#E5A93C",
      details: ["Domaći mikro-proizvođači", "Povezivanje turizma i ugostiteljstva", "Autorski recepti i brending"],
      description: "Kako domaći mikro-proizvođači piva i inovativni ugostitelji kreiraju novu ponudu i oživljavaju noćni život u Bosni i Hercegovini.",
      badge: "LOKALNA SCENA"
    },
    {
      id: 4,
      duration: 6,
      title: "Gaming Parivantanam & Emisija Propuh",
      tag: "OMLADINA & ALTERNATIVNI MEDIJI",
      subtitle: "Glas nove digitalne generacije",
      image: IMAGES.gamingParivantanam,
      accentColor: "#9D4EDD",
      details: ["E-sport i streaming zajednica", "Kultna radijska emisija Propuh", "Nezavisni medijski prostor"],
      description: "Mladi stvaraoci kroz gaming kulturu i radijski eter kreiraju slobodan prostor za dijalog, esport turnire i moderne medijske formate.",
      badge: "MLADI & MEDIJI"
    },
    {
      id: 5,
      duration: 6,
      title: "BCX Krypto & Vlada WWW",
      tag: "FINTECH & DIGITALNA TRANSFORMACIJA",
      subtitle: "Budućnost digitalne ekonomije u BiH",
      image: IMAGES.bcxKrypto,
      accentColor: "#00E5BE",
      details: ["Blockchain tehnologije u BiH", "Digitalizacija javnih servisa", "Prva licencirana krypto mjenjačnica"],
      description: "Stručna analiza implementacije blockchain tehnologija, kripto imovine i transformacije javnih usluga u skladu sa EU standardima.",
      badge: "KRIPTO & IT"
    },
    {
      id: 6,
      duration: 6,
      title: "Endemska Fauna & Žene u Bankarstvu & ZEPS",
      tag: "BAŠTINA & PRIVREDA",
      subtitle: "ZDK ekologija, ekonomija i sajmovi",
      image: IMAGES.fauna,
      accentColor: "#2EC4B6",
      details: ["Zaštićene vrste u ZDK", "Uloga žena u bankarskom sektoru", "Povratak generalnog sajma ZEPS"],
      description: "Prirodno bogatstvo ZDK kantona, učešće i liderstvo žena u finansijama te privredna snaga zeničkog privrednog sajma ZEPS.",
      badge: "BAŠTINA & PRIVREDA"
    },
    {
      id: 7,
      duration: 7,
      title: "Čitajte SCENA+ Online & Narudžba Printa",
      tag: "CANVA INTERAKTIVNI E-READER",
      subtitle: "Dostupno besplatno svim građanima",
      image: IMAGES.scenaCover,
      accentColor: "#C9A84C",
      details: ["Kliknite za pregled na Canva", "Besplatno preuzimanje", "B&H Assistant d.o.o. Izdavaštvo"],
      description: "Prelistajte kompletno interaktivno izdanje na Canva platformi ili poručite svoj fizički primjerak direktno putem B&H Assistant kontakt forme.",
      badge: "PRELISTAJ ODMAH"
    }
  ];

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  // Playback timer & scene synchronization
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && viewMode === 'video') {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const nextTime = prevTime + 0.25 * playbackSpeed;
          if (nextTime >= totalDuration) {
            // Loop back to beginning
            return 0;
          }
          return nextTime;
        });
      }, 250);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalDuration, playbackSpeed, viewMode]);

  // Synchronize current scene based on currentTime
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      accumulated += scenes[i].duration;
      if (currentTime < accumulated) {
        setCurrentSceneIndex(i);
        break;
      }
    }
  }, [currentTime, scenes]);

  // Sound synthesis / audio feedback when unmuted
  const playChime = () => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio context silently ignored if not permitted
    }
  };

  // Video Controls:
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    playChime();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    playChime();
  };

  const handleReturn = () => {
    // Return / rewind 5 seconds or restart
    setCurrentTime((prev) => Math.max(0, prev - 5));
    playChime();
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setIsPlaying(true);
    playChime();
  };

  const handleNextScene = () => {
    const nextIdx = (currentSceneIndex + 1) % scenes.length;
    let targetTime = 0;
    for (let i = 0; i < nextIdx; i++) {
      targetTime += scenes[i].duration;
    }
    setCurrentTime(targetTime);
    playChime();
  };

  const handlePrevScene = () => {
    const prevIdx = (currentSceneIndex - 1 + scenes.length) % scenes.length;
    let targetTime = 0;
    for (let i = 0; i < prevIdx; i++) {
      targetTime += scenes[i].duration;
    }
    setCurrentTime(targetTime);
    playChime();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeScene = scenes[currentSceneIndex] || scenes[0];

  const handleShare = () => {
    navigator.clipboard.writeText(CANVA_VIDEO_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#081220] border-2 border-[#C9A84C]/50 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'p-6 flex flex-col justify-between' : 'p-4 sm:p-6 lg:p-8'
      } ${className}`}
      id="scena-video-box"
    >
      {/* Ambient Neon Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER FRAME (Matching Screenshot & Brand Specs) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#1A3152] pb-4 mb-5">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#0A1628] border border-[#C9A84C]/60 text-[#C9A84C] font-syne font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#C9A84C]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#00C9A7] animate-pulse" />
            <span>PRINT & E-IZDANJE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-[11px] font-bold">
              VIDEO PROMO • CANVA EMITOVANJE
            </span>
            <span className="text-xs font-mono text-[#F5F0E8]/60 hidden md:inline">
              Septembar / Rujan 2026
            </span>
          </div>
        </div>

        {/* Mode Switcher: Emulated Video vs Canva Live Embed */}
        <div className="flex items-center gap-1.5 bg-[#0F2038] p-1 rounded-xl border border-[#1A3152]">
          <button
            onClick={() => setViewMode('video')}
            className={`px-3 py-1 rounded-lg text-xs font-syne font-bold transition-all ${
              viewMode === 'video'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-md'
                : 'text-[#F5F0E8]/70 hover:text-[#00C9A7]'
            }`}
            title="Pokreni reprodukciju videa sa interaktivnim kontrolama"
          >
            <Tv className="w-3.5 h-3.5 inline mr-1" />
            Video Prikaz
          </button>
          <button
            onClick={() => setViewMode('canva_embed')}
            className={`px-3 py-1 rounded-lg text-xs font-syne font-bold transition-all ${
              viewMode === 'canva_embed'
                ? 'bg-[#C9A84C] text-[#0A1628] shadow-md'
                : 'text-[#F5F0E8]/70 hover:text-[#C9A84C]'
            }`}
            title="Otvori direktni Canva prezentacijski iframe"
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1" />
            Canva Embed
          </button>
        </div>
      </div>

      {/* MAIN VIDEO PLAYER DISPLAY AREA */}
      <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-[#1A3152] bg-black/90 shadow-2xl">
        
        {viewMode === 'canva_embed' ? (
          /* CANVA EMBED IFRAME MODE */
          <div className="w-full aspect-video min-h-[360px] sm:min-h-[440px] relative bg-[#0A1628] flex flex-col">
            <iframe
              src={CANVA_VIDEO_URL}
              title="SCENA+ Magazin Canva Video Prezentacija"
              className="w-full h-full border-0 flex-1"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <div className="p-3 bg-[#0F2038] border-t border-[#1A3152] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#F5F0E8]/70 font-mono">
                Direktna Canva Video Prezentacija: <strong className="text-[#00C9A7]">vxekpnx0ow1xvt9</strong>
              </span>
              <a
                href={CANVA_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-[#C9A84C] text-[#0A1628] font-bold font-syne flex items-center gap-1 hover:bg-[#FFD700]"
              >
                <span>Otvori u novom prozoru</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* INTERACTIVE REPRODUCED VIDEO MODE (With Motion, Artwork & Overlays) */
          <div className="relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[420px] md:min-h-[480px] bg-gradient-to-br from-[#050C16] via-[#0A1628] to-[#040A12] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none">
            
            {/* Animated Background Graphics & Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1A3152_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Glowing Neon Neon Frame replicating screenshot */}
            <div className="absolute inset-4 sm:inset-6 rounded-2xl border-2 border-[#00C9A7]/40 pointer-events-none shadow-[0_0_25px_rgba(0,201,167,0.15)]" />

            {/* TOP OVERLAY: Magazine Title & Issue Info */}
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A1628]/90 border border-[#C9A84C] text-[#C9A84C] font-mono text-[10px] font-bold uppercase tracking-wider">
                    {activeScene.badge}
                  </span>
                  <span className="text-[10px] font-mono text-[#00C9A7] bg-[#00C9A7]/10 px-2 py-0.5 rounded-full border border-[#00C9A7]/30">
                    SCENA {currentSceneIndex + 1}/{scenes.length}
                  </span>
                </div>
                <h3 className="font-syne font-black text-lg sm:text-2xl lg:text-3xl text-[#F5F0E8] tracking-tight drop-shadow-md">
                  SCENA<span className="text-[#C9A84C]">+</span>{' '}
                  <span className="text-sm sm:text-lg font-normal text-[#00C9A7] block sm:inline">
                    SPAJAMO KULTURE STVARAMO ŠANSE
                  </span>
                </h3>
              </div>

              {/* Live Playback Indicator */}
              <div className="flex items-center gap-2 bg-[#0A1628]/90 px-3 py-1.5 rounded-xl border border-[#1A3152] backdrop-blur-md">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-[#00C9A7] animate-ping' : 'bg-[#E53E3E]'}`} />
                <span className="text-[11px] font-mono font-bold text-[#F5F0E8]">
                  {isPlaying ? 'EMITOVANJE' : 'PAUZIRANO'}
                </span>
              </div>
            </div>

            {/* CENTER STAGE: Active Scene Visual & Artwork Box with Transitions */}
            <div className="relative z-10 flex-1 my-3 sm:my-4 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
              
              {/* Featured Art / Cover Frame with Neon Border */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative group w-44 sm:w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#00C9A7] shadow-[0_0_30px_rgba(0,201,167,0.3)] bg-[#0A1628] shrink-0"
                >
                  <SafeImage
                    src={activeScene.image}
                    alt={activeScene.title}
                    fallbackTitle={activeScene.title}
                    fallbackSubtitle={activeScene.subtitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-[#0A1628]/90 backdrop-blur-sm border border-[#1A3152]">
                    <span className="text-[9px] font-mono text-[#00C9A7] font-bold block uppercase truncate">
                      {activeScene.tag}
                    </span>
                    <span className="text-[11px] font-syne font-bold text-[#F5F0E8] truncate block">
                      {activeScene.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Scene Narrative & Key Highlights */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeScene.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="max-w-md text-left space-y-2.5 sm:space-y-3 bg-[#0A1628]/85 p-4 sm:p-5 rounded-2xl border border-[#1A3152] backdrop-blur-md"
                >
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] font-mono font-bold uppercase">
                    {activeScene.subtitle}
                  </div>

                  <h4 className="font-syne font-extrabold text-base sm:text-xl text-[#F5F0E8] leading-tight">
                    {activeScene.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#F5F0E8]/85 font-sans leading-relaxed">
                    {activeScene.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-1 pt-1 border-t border-[#1A3152]">
                    {activeScene.details.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs font-mono text-[#00C9A7]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#C9A84C]" />
                        <span className="text-[#F5F0E8]/90">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* BOTTOM TICKER / TOPICS BANNER (Replicating exact bottom row from screenshot) */}
            <div className="relative z-10 bg-[#0F2038]/90 p-2.5 rounded-xl border border-[#1A3152] flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono font-bold text-[#F5F0E8]">
              <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                <span className="text-[#FF4D4D] flex items-center gap-1">
                  <Palette className="w-3 h-3 text-[#FF4D4D]" /> DANILO KESO ART
                </span>
                <span className="text-[#00E5BE] flex items-center gap-1">
                  <Coins className="w-3 h-3 text-[#00E5BE]" /> BCX KRYPTO
                </span>
                <span className="text-[#E5A93C] flex items-center gap-1">
                  <Beer className="w-3 h-3 text-[#E5A93C]" /> CRAFT PIVARE
                </span>
                <span className="text-[#2EC4B6] flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#2EC4B6]" /> ENDEMSKA FAUNA
                </span>
                <span className="text-[#9D4EDD] flex items-center gap-1">
                  <Gamepad2 className="w-3 h-3 text-[#9D4EDD]" /> GAMING PARIVANTANAM
                </span>
                <span className="text-[#C9A84C] flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#C9A84C]" /> EMISIJA PROPUH
                </span>
                <span className="text-[#00C9A7]">ŽENE U BIH</span>
                <span className="text-[#F5F0E8]/70">VLADA & WWW</span>
                <span className="text-[#C9A84C]">ZEPS 2026</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* VIDEO CONTROLLER BAR (STOP, RETURN, PLAY, REWIND, TIMELINE, SPEED, FULLSCREEN) */}
      <div className="relative z-10 mt-4 p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
        
        {/* Timeline Scrubber & Time Display */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#F5F0E8]/70">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#00C9A7]">{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
            <div className="text-[11px] text-[#C9A84C] font-semibold">
              Scena: {activeScene.title}
            </div>
          </div>

          <input
            type="range"
            min="0"
            max={totalDuration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-[#0A1628] rounded-lg appearance-none cursor-pointer accent-[#00C9A7] border border-[#1A3152]"
            aria-label="Vremenska traka videa"
          />
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Main Primary Action Buttons: PLAY / PAUSE, STOP, RETURN */}
          <div className="flex items-center gap-2">
            
            {/* 1. PLAY / PAUSE */}
            <button
              onClick={handlePlayPause}
              className={`px-4 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                isPlaying
                  ? 'bg-[#00C9A7] text-[#0A1628] hover:bg-[#00E5BE]'
                  : 'bg-[#C9A84C] text-[#0A1628] hover:bg-[#FFD700]'
              }`}
              title={isPlaying ? t('video.pause', 'Pauziraj') : t('video.play', 'Pokreni (Play)')}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{t('video.pause', 'Pauza')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t('video.play', 'Pokreni')}</span>
                </>
              )}
            </button>

            {/* 2. STOP BUTTON */}
            <button
              onClick={handleStop}
              className="px-3.5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#E53E3E]/20 border border-[#1A3152] hover:border-[#E53E3E] text-[#F5F0E8] hover:text-[#E53E3E] font-syne font-bold text-xs flex items-center gap-1.5 transition-all"
              title={t('video.stop', 'Stop')}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>{t('video.stop', 'Stop')}</span>
            </button>

            {/* 3. RETURN BUTTON (Vrati se / Rewind) */}
            <button
              onClick={handleReturn}
              className="px-3.5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] font-syne font-bold text-xs flex items-center gap-1.5 transition-all"
              title={t('video.return', 'Vrati na Početak')}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('video.return', 'Vrati Nazad')}</span>
            </button>

            {/* Restart from beginning */}
            <button
              onClick={handleRestart}
              className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#C9A84C] transition-all"
              title={t('video.return', 'Pokreni ispočetka')}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Next scene */}
            <button
              onClick={handleNextScene}
              className="p-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-all"
              title={t('video.nextScene', 'Sljedeća scena')}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary Controls: Audio Sound, Speed, Fullscreen, Canva Link */}
          <div className="flex items-center gap-2">
            
            {/* Speed Selector */}
            <div className="flex items-center bg-[#0A1628] rounded-xl border border-[#1A3152] p-0.5">
              {[1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-[#00C9A7] text-[#0A1628]'
                      : 'text-[#F5F0E8]/60 hover:text-[#F5F0E8]'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (isMuted) playChime();
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                !isMuted
                  ? 'bg-[#00C9A7]/20 border-[#00C9A7] text-[#00C9A7]'
                  : 'bg-[#0A1628] border-[#1A3152] text-[#F5F0E8]/60 hover:text-[#F5F0E8]'
              }`}
              title={isMuted ? "Uključi audio zvučni efekat" : "Isključi zvuk"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Share / Copy Canva Link */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#C9A84C] transition-all"
              title="Kopiraj link Canva prezentacije"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-[#00C9A7]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-all"
              title="Cijeli ekran (Fullscreen)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

      {/* FOOTER CALL-TO-ACTION BUTTONS */}
      <div className="relative z-10 mt-5 pt-4 border-t border-[#1A3152] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C9A84C]/50 shrink-0 bg-[#0A1628]">
            <SafeImage
              src={IMAGES.scenaCover}
              alt="SCENA+ Cover"
              fallbackTitle="SCENA+"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h5 className="font-syne font-bold text-sm text-[#F5F0E8]">
              SCENA+ Magazin • Prvo Izdanje (Septembar / Rujan 2026)
            </h5>
            <p className="text-xs text-[#00C9A7] font-mono">
              B&H Assistant d.o.o. Zenica • Izdavačka i medijska djelatnost
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenReader && (
            <button
              onClick={onOpenReader}
              className="px-4 py-2.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#00C9A7]/40 text-[#00C9A7] font-syne font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Brzi Pregled Stranica</span>
            </button>
          )}

          <a
            href={CANVA_MAGAZINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8973B] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Otvori Magazin na Canva (Full e-Izdanje)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default ScenaVideoPromotionBox;
