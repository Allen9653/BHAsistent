import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Sparkles, CheckCircle2, Award, Zap, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../utils/images';
import { SafeImage } from './SafeImage';

interface KasperskyPromoSectionProps {
  className?: string;
  isCompact?: boolean;
}

export const KASPERSKY_AFFILIATE_URL = 'https://dhwnh.com/g/f6b07970c6fe02eff231e5a65aad3a/?erid=5jtCeReLm1S3Xx3LfA8QF84';

export const KasperskyPromoSection: React.FC<KasperskyPromoSectionProps> = ({
  className = '',
  isCompact = false,
}) => {
  const handleAffiliateClick = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const payload = JSON.stringify({
          partner: 'kaspersky',
          campaign: 'kaspersky_antivirus_cybersecurity',
          timestamp: new Date().toISOString(),
          placement: isCompact ? 'kaspersky_compact_banner' : 'kaspersky_featured_promo',
        });
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track-partner-click', blob);
      }
    } catch {
      // Non-blocking telemetry
    }
  };

  return (
    <div id="kaspersky-promo" className={`w-full max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E2E] via-[#0F2937] to-[#0A1628] border border-[#00A88E]/40 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 hover:border-[#00A88E]/70 group">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00A88E]/15 via-[#00C9A7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#008770]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A88E] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* 1. Kaspersky Visual / Banner (Square 500x500px format, clickable with direct tracking) */}
          <div className="w-full lg:w-5/12 flex flex-col items-center shrink-0">
            <a
              href={KASPERSKY_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAffiliateClick}
              title="Kliknite za aktivaciju ekskluzivnog popusta na zvanični Kaspersky softver"
              className="relative block w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border-2 border-[#00A88E]/40 hover:border-[#00E5BE] shadow-2xl shadow-[#00A88E]/20 transition-all duration-300 hover:scale-[1.02] group/img bg-[#04131A]"
            >
              <SafeImage
                src={IMAGES.kasperskyBanner}
                alt="Kaspersky Antivirus i Kibernetička Sigurnost - Službeni Promo Vizual"
                fallbackTitle="Kaspersky Security"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />

              {/* Overlay Badges */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#00A88E] text-[#0A1628] text-[11px] font-mono font-extrabold tracking-wider shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SLUŽBENI PARTNER
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#0A1628]/90 backdrop-blur-md border border-[#00A88E]/40 text-[#00E5BE] text-[10px] font-mono font-bold">
                  POPUST AKTIVAN 🛡️
                </span>
              </div>

              {/* Hover Click Prompt */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5BE] text-[#0A1628] text-xs font-syne font-extrabold shadow-xl">
                  <span>Kliknite za preuzimanje uz popust</span>
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>

            <div className="flex items-center justify-between w-full max-w-[480px] mt-3 px-1 text-[11px] font-mono text-[#F5F0E8]/50">
              <span className="flex items-center gap-1 text-[#00E5BE]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A88E]" />
                Verifikovan Sigurnosni Certifikat
              </span>
              <span>1024x1024 Izvorna Rezolucija</span>
            </div>
          </div>

          {/* 2. Structured Copywriting (120 words expert text + bullet highlights + CTAs) */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-5 text-center sm:text-left">
            
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A88E]/20 border border-[#00A88E]/50 text-[#00E5BE] text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                DIGITALNA SIGURNOST & ANTIVIRUS
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C9A84C]">
                <Award className="w-3.5 h-3.5" />
                Globalni Lider (400M+ Korisnika)
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight leading-snug group-hover:text-[#00E5BE] transition-colors">
                Kaspersky – Vrhunska Kibernetička Sigurnost i Zaštita Vaših Digitalnih Uređaja
              </h2>
              <p className="text-xs font-mono text-[#00A88E] mt-1 font-semibold">
                Sveobuhvatna prevencija ransomwarea, phishing prevara i zaštita bankovnih računa
              </p>
            </div>

            {/* Core Promotional Text (~120 words tailored for 18-65 years old audience) */}
            <div className="text-sm sm:text-[15px] text-[#F5F0E8]/90 leading-relaxed font-sans space-y-3 bg-[#061420]/60 p-5 rounded-2xl border border-[#1A3152]/70 text-left">
              <p>
                <strong className="text-[#00E5BE] font-semibold">Kaspersky</strong> predstavlja globalni standard u digitalnoj sigurnosti, razvijen s ciljem pružanja sveobuhvatne zaštite od najsofisticiranijih kibernetičkih prijetnji današnjice. Kroz napredne heurističke algoritme, platforma u stvarnom vremenu neutrališe viruse, ransomware ucjenjivački softver i pokušaje krađe identiteta.
              </p>
              <p>
                Stručnjaci ga preporučuju zbog besprijekorne zaštite privatnosti, sigurnih online plaćanja i robusne prevencije 'phishing' napada. Kao višestruko nagrađivani tehnološki lider, Kaspersky uživa povjerenje preko <strong>400 miliona privatnih korisnika i 220.000 kompanija</strong> širom svijeta. Osigurajte stabilnost svojih računara, pametnih uređaja i povjerljivih poslovnih podataka.
              </p>
            </div>

            {/* Key feature pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#F5F0E8]/85 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F2038]/60 border border-[#1A3152]">
                <ShieldCheck className="w-4 h-4 text-[#00A88E] shrink-0" />
                <span>Heuristička zaštita u realnom vremenu</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F2038]/60 border border-[#1A3152]">
                <Lock className="w-4 h-4 text-[#00A88E] shrink-0" />
                <span>Sigurna online kupovina i e-bankarstvo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F2038]/60 border border-[#1A3152]">
                <Zap className="w-4 h-4 text-[#00A88E] shrink-0" />
                <span>Zaštita PC, Mac, iOS i Android uređaja</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F2038]/60 border border-[#1A3152]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88E] shrink-0" />
                <span>Brzo skeniranje bez usporavanja sistema</span>
              </div>
            </div>

            {/* High-Converting CTA Button with Official Tracking URL */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={KASPERSKY_AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAffiliateClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00A88E] via-[#00C9A7] to-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-sm tracking-wide shadow-xl shadow-[#00A88E]/25 hover:shadow-[#00A88E]/50 hover:scale-[1.02] transition-all min-h-[52px]"
              >
                <ShieldCheck className="w-5 h-5 fill-current" />
                <span>Saznaj Više i Ostvari Poseban Popust</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>

              <div className="text-center sm:text-left">
                <span className="text-xs font-mono text-[#00E5BE] block font-semibold">
                  Ekskluzivna partnerska ponuda za posjetioce
                </span>
                <span className="text-[10px] font-mono text-[#F5F0E8]/50">
                  Uključena garancija i tehnička podrška proizvođača
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default KasperskyPromoSection;
