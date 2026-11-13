import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ExternalLink,
  Sparkles,
  Volume2,
  Zap,
  LayoutGrid,
  Globe,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../utils/images';

export interface AffiliateBannerItem {
  id: string;
  i18nPrefix?: 'wa' | 'bolt' | 'b44' | 'auto' | 'alison';
  numberLabel: string;
  partnerName: string;
  categoryBadge: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  href: string;
  title: string;
  ariaLabel: string;
  icon: 'audio' | 'bolt' | 'blocks' | 'globe' | 'graduation';
  accentColor: 'cyan' | 'amber' | 'emerald' | 'blue' | 'green';
  bannerShadowClass: string;
  renderSvgBanner: (uid: string) => React.ReactNode;
}

const ACCENT_STYLES: Record<
  AffiliateBannerItem['accentColor'],
  {
    border: string;
    progressBar: string;
    glow: string;
    iconBox: string;
    badge: string;
    link: string;
    ctaBtn: string;
    pillActive: string;
    dotActive: string;
    labelText: string;
  }
> = {
  cyan: {
    border: 'border-cyan-500/30',
    progressBar: 'bg-gradient-to-r from-cyan-400 via-[#00C9A7] to-blue-500',
    glow: 'bg-cyan-500/10',
    iconBox: 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-cyan-500/15',
    badge: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300',
    link: 'text-cyan-300 hover:text-cyan-200',
    ctaBtn: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#06101F] hover:from-cyan-300 hover:to-blue-400 shadow-cyan-500/25',
    pillActive: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold',
    dotActive: 'bg-cyan-400 animate-pulse',
    labelText: 'text-cyan-300',
  },
  amber: {
    border: 'border-amber-500/35',
    progressBar: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500',
    glow: 'bg-amber-500/10',
    iconBox: 'bg-amber-500/15 border-amber-400/40 text-amber-300 shadow-amber-500/15',
    badge: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
    link: 'text-amber-300 hover:text-amber-200',
    ctaBtn: 'bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A1628] hover:from-amber-300 hover:to-orange-400 shadow-amber-500/25',
    pillActive: 'bg-amber-500/20 text-amber-300 border border-amber-400/50 font-bold',
    dotActive: 'bg-amber-400 animate-pulse',
    labelText: 'text-amber-300',
  },
  emerald: {
    border: 'border-emerald-500/35',
    progressBar: 'bg-gradient-to-r from-emerald-400 via-[#00C9A7] to-teal-500',
    glow: 'bg-emerald-500/10',
    iconBox: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 shadow-emerald-500/15',
    badge: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
    link: 'text-emerald-300 hover:text-emerald-200',
    ctaBtn: 'bg-gradient-to-r from-emerald-400 to-[#00C9A7] text-[#041816] hover:from-emerald-300 hover:to-[#00E5BE] shadow-emerald-500/25',
    pillActive: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 font-bold',
    dotActive: 'bg-emerald-400 animate-pulse',
    labelText: 'text-emerald-300',
  },
  blue: {
    border: 'border-blue-500/35',
    progressBar: 'bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500',
    glow: 'bg-blue-500/10',
    iconBox: 'bg-blue-500/15 border-blue-400/40 text-blue-300 shadow-blue-500/15',
    badge: 'bg-blue-500/20 border-blue-400/40 text-blue-300',
    link: 'text-blue-300 hover:text-blue-200',
    ctaBtn: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:from-blue-300 hover:to-indigo-400 shadow-blue-500/25',
    pillActive: 'bg-blue-500/20 text-blue-300 border border-blue-400/50 font-bold',
    dotActive: 'bg-blue-400 animate-pulse',
    labelText: 'text-blue-300',
  },
  green: {
    border: 'border-[#00C9A7]/45',
    progressBar: 'bg-gradient-to-r from-[#00A859] via-[#00C9A7] to-emerald-400',
    glow: 'bg-[#00A859]/15',
    iconBox: 'bg-[#00A859]/20 border-emerald-400/50 text-emerald-300 shadow-emerald-500/20',
    badge: 'bg-[#00A859]/25 border-emerald-400/50 text-emerald-200',
    link: 'text-emerald-300 hover:text-emerald-200',
    ctaBtn: 'bg-gradient-to-r from-[#00A859] to-[#00C9A7] text-white hover:from-emerald-500 hover:to-[#00E5BE] shadow-[#00A859]/30',
    pillActive: 'bg-[#00A859]/25 text-emerald-300 border border-emerald-400/60 font-bold',
    dotActive: 'bg-[#00C9A7] animate-pulse',
    labelText: 'text-emerald-300',
  },
};

const SLIDE_INTERVAL_MS = 15000; // 15 seconds right-to-left rotation

export const AFFILIATE_BANNERS: AffiliateBannerItem[] = [
  {
    id: 'wa-production-banner-1',
    i18nPrefix: 'wa',
    numberLabel: '1. WA Production',
    partnerName: 'WA PRODUCTION',
    categoryBadge: 'PARTNERSKI BANER #1 • AUDIO PRODUKCIJA',
    headline: 'WA Production — Pro Audio Alati i Plugini',
    subtext:
      'Istražite profesionalne audio alate, VST/AU/AAX pluginove, templejte i sample pakete za muzičku produkciju.',
    ctaLabel: 'Istraži WA Production',
    href: 'https://waproduction.sjv.io/2R6oJQ',
    title: 'WA Production - Pro Audio Alati i Plugini',
    ariaLabel: 'WA Production - Pro Audio Alati - Istraži',
    icon: 'audio',
    accentColor: 'cyan',
    bannerShadowClass:
      'shadow-[0_4px_12px_rgba(6,182,212,0.22)] hover:shadow-[0_6px_16px_rgba(6,182,212,0.38)] focus-visible:ring-cyan-400',
    renderSvgBanner: (uid: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 234 60"
        role="img"
        aria-label="WA Production - Pro Audio Alati - Istraži"
        className="block w-full h-auto"
      >
        <defs>
          <linearGradient id={`waBg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="55%" stopColor="#131b2e" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id={`waBtn-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {/* Pozadina i okvir */}
        <rect width="234" height="60" rx="8" fill={`url(#waBg-${uid})`} />
        <rect
          x="0.5"
          y="0.5"
          width="233"
          height="59"
          rx="7.5"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.35"
        />
        {/* Dekorativni audio talasi u pozadini */}
        <g opacity="0.18" fill="#22d3ee">
          <rect x="12" y="24" width="2" height="12" rx="1" />
          <rect x="16" y="18" width="2" height="24" rx="1" />
          <rect x="20" y="14" width="2" height="32" rx="1" />
          <rect x="24" y="20" width="2" height="20" rx="1" />
          <rect x="28" y="25" width="2" height="10" rx="1" />
        </g>
        {/* Ikona (Studio Ekvilajzer Bedž) */}
        <rect
          x="9"
          y="13"
          width="34"
          height="34"
          rx="8"
          fill="#0f172a"
          stroke="#06b6d4"
          strokeWidth="1.2"
        />
        <rect x="16" y="26" width="3" height="11" rx="1.5" fill="#22d3ee" />
        <rect x="21.5" y="20" width="3" height="17" rx="1.5" fill="#a855f7" />
        <rect x="27" y="23" width="3" height="14" rx="1.5" fill="#22d3ee" />
        <rect x="32.5" y="28" width="3" height="9" rx="1.5" fill="#38bdf8" />
        {/* Tekstualni dio */}
        <text
          x="50"
          y="20"
          fill="#38bdf8"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.8"
        >
          WA PRODUCTION
        </text>
        <text
          x="50"
          y="34"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="-0.2"
        >
          PRO AUDIO ALATI
        </text>
        <text
          x="50"
          y="46"
          fill="#94a3b8"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8.2"
          fontWeight="500"
        >
          Plugini &amp; Sampleovi
        </text>
        {/* CTA Dugme */}
        <rect x="162" y="17" width="63" height="26" rx="6" fill={`url(#waBtn-${uid})`} />
        <text
          x="193.5"
          y="33.5"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="0.4"
        >
          ISTRAŽI ›
        </text>
      </svg>
    ),
  },
  {
    id: 'boltai-banner-2',
    i18nPrefix: 'bolt',
    numberLabel: '2. BoltAI',
    partnerName: 'BOLTAI',
    categoryBadge: 'PARTNERSKI BANER #2 • AI ASISTENT',
    headline: 'BoltAI — Brži rad uz AI asistenta',
    subtext:
      'Ubrzajte svakodnevni rad, pisanje, kodiranje i analizu uz moćnog AI asistenta prilagođenog za produktivnost.',
    ctaLabel: 'Isprobaj BoltAI',
    href: 'https://boltai.pxf.io/KB6aLN',
    title: 'BoltAI - Brži rad uz AI asistenta',
    ariaLabel: 'BoltAI - Brži rad uz AI - Probaj',
    icon: 'bolt',
    accentColor: 'amber',
    bannerShadowClass:
      'shadow-[0_4px_12px_rgba(245,158,11,0.22)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.38)] focus-visible:ring-amber-400',
    renderSvgBanner: (uid: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 234 60"
        role="img"
        aria-label="BoltAI - Brži rad uz AI - Probaj"
        className="block w-full h-auto"
      >
        <defs>
          <linearGradient id={`boltBg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id={`boltBtn-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        {/* Pozadina i okvir */}
        <rect width="234" height="60" rx="8" fill={`url(#boltBg-${uid})`} />
        <rect
          x="0.5"
          y="0.5"
          width="233"
          height="59"
          rx="7.5"
          fill="none"
          stroke="#f59e0b"
          strokeOpacity="0.4"
        />
        {/* Sjaj u pozadini */}
        <circle cx="26" cy="30" r="22" fill="#f59e0b" opacity="0.1" />
        {/* Ikona (Munja / Bolt Bedž) */}
        <rect
          x="9"
          y="13"
          width="34"
          height="34"
          rx="8"
          fill="#18181b"
          stroke="#fbbf24"
          strokeWidth="1.2"
        />
        <path d="M27.5 18L19.5 31H25.5L24.5 42L32.5 29H26.5L27.5 18Z" fill="#fbbf24" />
        {/* Tekstualni dio */}
        <text
          x="50"
          y="20"
          fill="#fbbf24"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8"
          fontWeight="800"
          letterSpacing="0.8"
        >
          BOLTAI
        </text>
        <text
          x="50"
          y="34"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="-0.2"
        >
          BRŽI RAD UZ AI
        </text>
        <text
          x="50"
          y="46"
          fill="#d1d5db"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8.2"
          fontWeight="500"
        >
          AI Asistent za svaki dan
        </text>
        {/* CTA Dugme */}
        <rect x="163" y="17" width="62" height="26" rx="6" fill={`url(#boltBtn-${uid})`} />
        <text
          x="194"
          y="33.5"
          textAnchor="middle"
          fill="#111827"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="0.4"
        >
          PROBAJ ›
        </text>
      </svg>
    ),
  },
  {
    id: 'base44-banner-3',
    i18nPrefix: 'b44',
    numberLabel: '3. Base44 AI',
    partnerName: 'BASE44 AI',
    categoryBadge: 'PARTNERSKI BANER #3 • NO-CODE AI APP BUILDER',
    headline: 'Base44 — Kreiraj web aplikaciju odmah uz AI',
    subtext:
      'Pretvorite ideju u kompletnu web aplikaciju bez pisanja koda — baza podataka, autentifikacija i hosting uključeni.',
    ctaLabel: 'Započni uz Base44',
    href: 'https://base44.pxf.io/c/6640161/2049275/25619?trafcat=lp',
    title: 'Base44 - Kreiraj web aplikaciju odmah uz AI',
    ariaLabel: 'Base44 - Kreiraj App Odmah - Započni',
    icon: 'blocks',
    accentColor: 'emerald',
    bannerShadowClass:
      'shadow-[0_4px_12px_rgba(16,185,129,0.22)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.38)] focus-visible:ring-emerald-400',
    renderSvgBanner: (uid: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 234 60"
        role="img"
        aria-label="Base44 - Kreiraj App Odmah - Započni"
        className="block w-full h-auto"
      >
        <defs>
          <linearGradient id={`b44Bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`b44Btn-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Pozadina i okvir */}
        <rect width="234" height="60" rx="8" fill={`url(#b44Bg-${uid})`} />
        <rect
          x="0.5"
          y="0.5"
          width="233"
          height="59"
          rx="7.5"
          fill="none"
          stroke="#34d399"
          strokeOpacity="0.4"
        />
        {/* Ikona (AI App Blokovi) */}
        <rect
          x="9"
          y="13"
          width="34"
          height="34"
          rx="8"
          fill="#064e3b"
          stroke="#34d399"
          strokeWidth="1.2"
        />
        <rect x="16" y="20" width="8" height="8" rx="2" fill="#34d399" />
        <rect x="27" y="20" width="8" height="8" rx="2" fill="#a7f3d0" />
        <rect x="16" y="31" width="8" height="8" rx="2" fill="#6ee7b7" />
        <path
          d="M31 31v8M27 35h8"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Tekstualni dio */}
        <text
          x="50"
          y="20"
          fill="#34d399"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8"
          fontWeight="800"
          letterSpacing="0.8"
        >
          BASE44 AI
        </text>
        <text
          x="50"
          y="34"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="10.8"
          fontWeight="800"
          letterSpacing="-0.2"
        >
          KREIRAJ APP ODMAH
        </text>
        <text
          x="50"
          y="46"
          fill="#a7f3d0"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8.2"
          fontWeight="500"
        >
          Web &amp; App bez koda
        </text>
        {/* CTA Dugme */}
        <rect x="160" y="17" width="65" height="26" rx="6" fill={`url(#b44Btn-${uid})`} />
        <text
          x="192.5"
          y="33.5"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="9.2"
          fontWeight="800"
          letterSpacing="0.3"
        >
          ZAPOČNI ›
        </text>
      </svg>
    ),
  },
  {
    id: 'automattic-banner-4',
    i18nPrefix: 'auto',
    numberLabel: '4. Automattic',
    partnerName: 'AUTOMATTIC',
    categoryBadge: 'PARTNERSKI BANER #4 • WORDPRESS & WEB HOSTING',
    headline: 'Automattic — Pokreni profesionalni web i WordPress',
    subtext:
      'Pouzdan WordPress hosting, WooCommerce web shopovi i profesionalna infrastruktura za stabilan rast vašeg poslovanja.',
    ctaLabel: 'Pokreni uz Automattic',
    href: 'https://automattic.pxf.io/yq7d2V',
    title: 'Automattic - Pokreni profesionalni web i WordPress',
    ariaLabel: 'Automattic - Profesionalni Web - Pokreni',
    icon: 'globe',
    accentColor: 'blue',
    bannerShadowClass:
      'shadow-[0_4px_12px_rgba(37,99,235,0.22)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.38)] focus-visible:ring-blue-400',
    renderSvgBanner: (uid: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 234 60"
        role="img"
        aria-label="Automattic - Profesionalni Web - Pokreni"
        className="block w-full h-auto"
      >
        <defs>
          <linearGradient id={`autoBg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c192c" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id={`autoBtn-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        {/* Pozadina i okvir */}
        <rect width="234" height="60" rx="8" fill={`url(#autoBg-${uid})`} />
        <rect
          x="0.5"
          y="0.5"
          width="233"
          height="59"
          rx="7.5"
          fill="none"
          stroke="#60a5fa"
          strokeOpacity="0.4"
        />
        {/* Ikona (Web Globus / WP Stil) */}
        <rect
          x="9"
          y="13"
          width="34"
          height="34"
          rx="8"
          fill="#1e3a8a"
          stroke="#60a5fa"
          strokeWidth="1.2"
        />
        <circle cx="26" cy="30" r="10" fill="none" stroke="#93c5fd" strokeWidth="1.6" />
        <ellipse cx="26" cy="30" rx="4.5" ry="10" fill="none" stroke="#ffffff" strokeWidth="1.3" />
        <line x1="16" y1="30" x2="36" y2="30" stroke="#93c5fd" strokeWidth="1.3" />
        {/* Tekstualni dio */}
        <text
          x="50"
          y="20"
          fill="#60a5fa"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8"
          fontWeight="800"
          letterSpacing="0.8"
        >
          AUTOMATTIC
        </text>
        <text
          x="50"
          y="34"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="10.6"
          fontWeight="800"
          letterSpacing="-0.2"
        >
          PROFESIONALNI WEB
        </text>
        <text
          x="50"
          y="46"
          fill="#bfdbfe"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="8.2"
          fontWeight="500"
        >
          WordPress &amp; Trgovina
        </text>
        {/* CTA Dugme */}
        <rect x="161" y="17" width="64" height="26" rx="6" fill={`url(#autoBtn-${uid})`} />
        <text
          x="193"
          y="33.5"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter,Arial,sans-serif"
          fontSize="9.2"
          fontWeight="800"
          letterSpacing="0.3"
        >
          POKRENI ›
        </text>
      </svg>
    ),
  },
  {
    id: 'alison-banner-5',
    i18nPrefix: 'alison',
    numberLabel: '5. Alison',
    partnerName: 'ALISON',
    categoryBadge: 'EKSKLUZIVNA PREPORUKA • BESPLATNO',
    headline: 'Besplatni univerzitetski kursevi sa EU, SAD i Kanadskim certifikatima!',
    subtext:
      'Unaprijedite svoje vještine uz besplatne online certifikate priznate širom svijeta. Iskoristite priliku i započnite učenje danas.',
    ctaLabel: 'Započni besplatno učenje →',
    href: 'https://alison.com/?utm_source=alison_user&utm_medium=affiliate&utm_campaign=56404529',
    title: 'Alison - Besplatni univerzitetski kursevi sa EU, SAD i Kanadskim certifikatima!',
    ariaLabel: 'Alison Official Logo - Započni besplatno učenje',
    icon: 'graduation',
    accentColor: 'green',
    bannerShadowClass:
      'shadow-[0_6px_18px_rgba(0,168,89,0.28)] hover:shadow-[0_10px_24px_rgba(0,201,167,0.42)] focus-visible:ring-emerald-400',
    renderSvgBanner: () => (
      <div className="w-full bg-white rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-emerald-400/50 shadow-inner min-h-[96px] sm:min-h-[108px]">
        <div className="flex-1 flex items-center justify-center sm:justify-start min-w-0">
          <img
            src={IMAGES.alisonLogo}
            alt="Alison Official Logo"
            className="alison-logo-img h-14 sm:h-16 w-auto max-w-[210px] object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallbackStep) {
                target.dataset.fallbackStep = '1';
                target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Alison_Logo.svg';
              } else if (target.dataset.fallbackStep === '1') {
                target.dataset.fallbackStep = '2';
                target.src = 'https://archive.org/download/remote_rocketship_logo/alison_com_logo.png';
              }
            }}
          />
        </div>
        <div className="hidden sm:flex flex-col items-end text-right shrink-0">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            EU • US • CA
          </span>
          <span className="text-xs font-syne font-extrabold text-slate-900 mt-1.5">
            5,000+ Courses
          </span>
        </div>
      </div>
    ),
  },
];

interface AffiliateBannerCarouselProps {
  banners?: AffiliateBannerItem[];
  className?: string;
}

export const AffiliateBannerCarousel: React.FC<AffiliateBannerCarouselProps> = ({
  banners = AFFILIATE_BANNERS,
  className = '',
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleTick, setCycleTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const total = banners.length;

  const advanceRightToLeft = useCallback(() => {
    setCurrentIndex((prev) => (total > 0 ? (prev + 1) % total : 0));
    setCycleTick((prev) => prev + 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (total > 0 ? (prev - 1 + total) % total : 0));
    setCycleTick((prev) => prev + 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [total]);

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
    setCycleTick((prev) => prev + 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  // Auto-advance every 15 seconds moving right-to-left
  useEffect(() => {
    if (isPaused || total === 0) return;

    startTimeRef.current = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_INTERVAL_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_INTERVAL_MS) {
        advanceRightToLeft();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isPaused, total, cycleTick, advanceRightToLeft]);

  if (total === 0) return null;

  const activeBanner = banners[currentIndex] || banners[0];
  const theme = ACCENT_STYLES[activeBanner.accentColor];
  const prefix =
    activeBanner.i18nPrefix ||
    (activeBanner.id.includes('wa-production')
      ? 'wa'
      : activeBanner.id.includes('boltai')
      ? 'bolt'
      : activeBanner.id.includes('base44')
      ? 'b44'
      : activeBanner.id.includes('automattic')
      ? 'auto'
      : activeBanner.id.includes('alison')
      ? 'alison'
      : undefined);

  const activeCategoryBadge = prefix
    ? t(`aff.${prefix}.cat`, activeBanner.categoryBadge)
    : activeBanner.categoryBadge;
  const activeHeadline = prefix
    ? t(`aff.${prefix}.head`, activeBanner.headline)
    : activeBanner.headline;
  const activeSubtext = prefix
    ? t(`aff.${prefix}.sub`, activeBanner.subtext)
    : activeBanner.subtext;
  const activeCtaLabel = prefix
    ? t(`aff.${prefix}.cta`, activeBanner.ctaLabel)
    : activeBanner.ctaLabel;

  return (
    <section
      aria-label="Partnerski i affiliate baneri"
      aria-roledescription="carousel"
      className={`w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#081220] via-[#0F2038] to-[#0A1628] border shadow-2xl transition-colors duration-300 ${theme.border}`}
      >
        {/* Top 15-second progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A1628] z-30">
          <div
            className={`h-full transition-all duration-100 ease-linear ${theme.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle background glow */}
        <div
          className={`absolute -right-12 -top-12 w-64 h-64 rounded-full blur-3xl pointer-events-none ${theme.glow}`}
        />
        <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left / Right Controls */}
        <div className="relative px-6 sm:px-10 lg:px-12 py-7 sm:py-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeBanner.id}-${cycleTick}`}
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row items-center justify-between gap-7 lg:gap-10 relative z-10"
            >
              {/* Left Info Column */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 flex-1 min-w-0">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center shrink-0 shadow-xl ${theme.iconBox}`}
                >
                  {activeBanner.icon === 'bolt' ? (
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : activeBanner.icon === 'blocks' ? (
                    <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : activeBanner.icon === 'globe' ? (
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : activeBanner.icon === 'graduation' ? (
                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : (
                    <Volume2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>

                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span
                      className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${theme.badge}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {activeCategoryBadge}
                    </span>
                    <span className="text-xs font-mono text-[#F5F0E8]/60">
                      {t('aff.partnerTag', 'Affiliate Partner • B&H Assistant')}
                    </span>
                  </div>

                  <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8] leading-snug">
                    {activeHeadline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#F5F0E8]/80 max-w-2xl leading-relaxed">
                    {activeSubtext}
                  </p>
                </div>
              </div>

              {/* Right Column: Enlarged Partner Logo Banner Showcase + Prominent CTA */}
              <div className="banner-visual-wrapper w-full sm:w-[360px] lg:w-[390px] flex flex-col items-center lg:items-end gap-3.5 shrink-0">
                <a
                  href={activeBanner.href}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  title={activeHeadline}
                  aria-label={activeHeadline}
                  className={`block w-full rounded-xl overflow-hidden hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ${activeBanner.bannerShadowClass}`}
                >
                  {activeBanner.renderSvgBanner(`${activeBanner.id}-${cycleTick}`)}
                </a>

                <a
                  href={activeBanner.href}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-syne font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02] min-h-[44px] ${theme.ctaBtn}`}
                >
                  <span>{activeCtaLabel}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#050D18]/90 border-t border-[#1A3152]/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {banners.map((banner, idx) => {
              const active = currentIndex === idx;
              const pillTheme = ACCENT_STYLES[banner.accentColor];
              return (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    active
                      ? pillTheme.pillActive
                      : 'bg-[#0A1628] text-[#F5F0E8]/60 hover:text-[#F5F0E8] border border-[#1A3152]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? pillTheme.dotActive : 'bg-[#1A3152]'
                    }`}
                  />
                  <span>{banner.numberLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono text-[#F5F0E8]/65">
            <span className={`text-[11px] ${theme.labelText}`}>
              {t('aff.rotation', 'Rotacija s desna na lijevo • 15s')}
            </span>
            <span className="text-[#1A3152]">|</span>
            <span>
              <strong className="text-[#F5F0E8]">{currentIndex + 1}</strong> / {total}
            </span>

            <button
              type="button"
              onClick={goToPrev}
              aria-label={t('aff.prev', 'Prethodni baner')}
              className="p-1.5 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-cyan-300 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? t('aff.play', 'Pokreni') : t('aff.pause', 'Pauziraj')}
              title={isPaused ? t('aff.play', 'Pokreni') : t('aff.pause', 'Pauziraj')}
              className="p-1.5 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-cyan-300 transition-colors"
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-[#00C9A7]" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={advanceRightToLeft}
              aria-label={t('aff.next', 'Sljedeći baner')}
              className="p-1.5 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-cyan-300 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateBannerCarousel;
