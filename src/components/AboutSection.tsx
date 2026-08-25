import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Heart, 
  Compass, 
  CheckCircle, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Facebook, 
  Play, 
  Sparkles,
  Briefcase,
  Cpu,
  Layers,
  ArrowRight,
  Send,
  MessageSquarePlus,
  Tv
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<'bs' | 'en'>('bs');

  const videos = {
    bs: {
      embedUrl: 'https://www.youtube.com/embed/shBDQQvmZiY?rel=0&modestbranding=1',
      watchUrl: 'https://www.youtube.com/watch?v=shBDQQvmZiY',
      title: 'Poslovni Plan & Finansijski Model',
      tabLabel: 'Poslovni Plan & Finansijski Model',
      badge: 'POSLOVNI PLAN & FINANSIJSKI MODEL (BIH)',
      desc: t('about.videoDesc', 'Pogledajte zvanični prezentacijski video sa detaljnim uvidom u naš trogodišnji poslovni plan, finansijske projekcije i razvojne ciljeve za ekosistem BH KONVER, ZENTAXI i SCENA+.'),
    },
    en: {
      embedUrl: 'https://www.youtube.com/embed/cfGSMJwjmkM?start=4&rel=0&modestbranding=1',
      watchUrl: 'https://www.youtube.com/watch?v=cfGSMJwjmkM',
      title: 'PREZENTACIJA POSLOVNI PLAN NA ENG.',
      tabLabel: 'PREZENTACIJA POSLOVNI PLAN NA ENG.',
      badge: 'PREZENTACIJA POSLOVNI PLAN NA ENG. (ENG)',
      desc: 'Watch the official English video presentation of the B&H Assistant business plan, financial model, and strategic corporate roadmap.',
    },
  };

  return (
    <section id="o-nama" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Ambient Backdrop */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('about.badge', 'B&H ASSISTANT D.O.O. ZENICA')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('about.title', 'Spajamo Digitalne Alate, Multimediju i E-Commerce')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed">
            {t('about.subtitle', 'Pouzdan partner za digitalnu transformaciju privrede, e-upravu, medijsku produkciju i softverska rješenja po mjeri.')}
          </p>
        </div>

        {/* Info Grid: Company Wall Official Card + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Affiliated Top Banner + Official Company Registry Card + Affiliated Ads Bottom */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. TOP AFFILIATED AD SPOT (Above the Cube) */}
            <div className="rounded-2xl bg-gradient-to-r from-[#0F2038] to-[#1A3152] border border-[#00C9A7]/40 p-4 shadow-xl relative overflow-hidden group hover:border-[#00C9A7] transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00C9A7]" />
                  SPONZORISANI AFFILIATE BANER
                </span>
                <span className="text-[10px] font-mono text-[#C9A84C]">Remote Poslovi BiH</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0A1628] border border-[#1A3152] p-1.5 shrink-0">
                  <SafeImage
                    src={IMAGES.remoteRocket}
                    alt="Remote Rocketship Logo"
                    fallbackTitle="Remote"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-syne font-bold text-sm text-[#F5F0E8] truncate group-hover:text-[#00C9A7] transition-colors">
                    Remote Rocketship BiH
                  </h4>
                  <p className="text-[11px] text-[#F5F0E8]/70 line-clamp-1 font-sans">
                    Pronađite plaćene poslove od kuće za EU & SAD kompanije.
                  </p>
                </div>
                <a
                  href="https://tolt.link/remote-poslovi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs shrink-0 transition-transform hover:scale-105 flex items-center gap-1"
                >
                  <span>Poslovi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. MAIN OFFICIAL COMPANY REGISTRY CARD (B&H ASSISTANT D.O.O. ZENICA CUBE) */}
            <div className="rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/40 p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Building2 className="w-32 h-32 text-[#00C9A7]" />
              </div>

              {/* Official Company Logo Visual Artwork */}
              <div className="rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-square max-w-[220px] mx-auto p-2">
                <SafeImage
                  src={IMAGES.logo}
                  alt="B&H ASSISTANT d.o.o. Logo Artwork"
                  fallbackTitle="B&H ASSISTANT d.o.o."
                  fallbackSubtitle="Zenica, BiH"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="border-b border-[#1A3152] pb-4 space-y-1 text-center">
                <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider block font-bold">
                  {t('about.officialBadge', 'REGISTROVANA FIRMA • COMPANY WALL BAZA')}
                </span>
                <h3 className="font-syne font-extrabold text-2xl text-[#F5F0E8]">
                  {COMPANY_INFO.fullLegalName}
                </h3>
                <p className="text-xs font-mono text-[#00C9A7] font-semibold">
                  "{COMPANY_INFO.motto}"
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono text-[#F5F0E8]/80 font-sans">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                  <span className="text-[#F5F0E8]/60">{t('about.cityLabel', 'Sjedište & Grad:')}</span>
                  <span className="text-[#F5F0E8] font-bold">{COMPANY_INFO.city} 72000, BiH</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                  <span className="text-[#F5F0E8]/60">{t('about.jibLabel', 'Jedinstveni ID Broj (JIB):')}</span>
                  <span className="text-[#00C9A7] font-bold font-mono">{COMPANY_INFO.jib}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                  <span className="text-[#F5F0E8]/60">{t('about.mbsLabel', 'Matični Broj Subjekta (MBS):')}</span>
                  <span className="text-[#C9A84C] font-bold font-mono">{COMPANY_INFO.mbs}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                  <span className="text-[#F5F0E8]/60">{t('about.categoryLabel', 'Kategorija Djelatnosti:')}</span>
                  <span className="text-[#F5F0E8] font-bold">{t('about.categoryValue', 'IT Softver, e-Uprava & Mediji')}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#F5F0E8]/60 font-sans text-center">
                {t('about.verifiedNote', 'Svi podaci su verificirani u skladu sa zvaničnim registrima firmi u Bosni i Hercegovini.')}
              </div>
            </div>

            {/* 3. BOTTOM AFFILIATED ADS & PROMO SPOTS (Below the Cube) */}
            <div className="space-y-4">
              
              {/* Ad Card 1: Atoms AI & Tech Cloud */}
              <div className="rounded-2xl bg-[#0F2038] border border-[#1A3152] p-4 shadow-xl hover:border-[#00C9A7]/50 transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1628] border border-[#1A3152] p-1.5 shrink-0">
                    <SafeImage
                      src={IMAGES.atomsDev}
                      alt="Atoms Dev AI Platform"
                      fallbackTitle="Atoms"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#00C9A7] uppercase font-bold tracking-wider block">
                      AFFILIATE PARTNER • AI AGENTI
                    </span>
                    <h4 className="font-syne font-bold text-xs sm:text-sm text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      Atoms - Pretvori Ideju u Realnost
                    </h4>
                    <p className="text-[11px] text-[#F5F0E8]/70 font-sans line-clamp-1">
                      Izgradi pametne AI web aplikacije i agente odmah.
                    </p>
                  </div>
                </div>
                <a
                  href="https://atoms.dev/?utm_source=affiliate&via=pretvori-ideju-u-realnost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/30 font-syne font-bold text-xs shrink-0 transition-colors flex items-center gap-1"
                >
                  <span>Atoms</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Ad Card 2: CloudTalk AI Telephony & Alison Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://cloudtalk.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0F2038] border border-[#1A3152] hover:border-[#C9A84C]/60 transition-all flex flex-col justify-between group shadow-md"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#C9A84C] font-bold uppercase block">
                      AI CALL CENTAR
                    </span>
                    <h5 className="font-syne font-bold text-xs text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                      CloudTalk Telephony
                    </h5>
                    <p className="text-[10px] text-[#F5F0E8]/70 line-clamp-2">
                      Automatizujte korisničku podršku i prodaju uz pametne pozive.
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#1A3152] flex items-center justify-between text-[10px] font-mono text-[#C9A84C]">
                    <span>Isprobaj Free</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                <a
                  href="https://alison.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/60 transition-all flex flex-col justify-between group shadow-md"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#00C9A7] font-bold uppercase block">
                      BESPLATNI KURSEVI
                    </span>
                    <h5 className="font-syne font-bold text-xs text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                      Alison Certifikati
                    </h5>
                    <p className="text-[10px] text-[#F5F0E8]/70 line-clamp-2">
                      Besplatno upišite svjetske certificirane online tečajeve.
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#1A3152] flex items-center justify-between text-[10px] font-mono text-[#00C9A7]">
                    <span>Upiši Kurs</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
              </div>

              {/* Ad Card 3: Interactive Partner/Affiliate Banner Placement Trigger */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#14263F] border border-dashed border-[#00C9A7]/40 text-left space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#00C9A7] text-xs font-syne font-bold">
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Mjesto Za Vašu Affiliated Reklamu</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#00C9A7]/10 text-[#00C9A7] text-[10px] font-mono">
                    DOSTUPNO
                  </span>
                </div>
                <p className="text-[11px] text-[#F5F0E8]/75 font-sans leading-relaxed">
                  Želite plasirati svoj brend, remote ponudu ili edukaciju na B&H Assistant mreži? Kontaktirajte naš tim za partnersko oglašavanje.
                </p>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/30 text-xs font-mono font-bold transition-all"
                >
                  <Send className="w-3 h-3" />
                  <span>Pošaljite Upit za Reklamni Prostor →</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Text Story & Core Pillars & Direct YouTube Presentation Player */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F5F0E8]">
              {t('about.whyTitle', 'Zašto Se Razlikujemo Od Druge IT Scenografije?')}
            </h3>

            <p className="text-sm text-[#F5F0E8]/80 leading-relaxed font-sans">
              {t('about.whyDesc', 'Za razliku od klasičnih autsorsing IT kuća, B&H Assistant d.o.o. gradi vlastiti identitet prožet kulturnim motivima (poput stilizovanih stećaka na našim aplikacijama), kreiranjem korisnih besplatnih alata za bh. građane, te objavom urbanog magazina SCENA+ za afirmaciju mladih talenata Zeničko-dobojskog kantona.')}
            </p>

            {/* YouTube Direct Video Embed: B&H Assistant biznis plan - video */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#1A3152] border-2 border-[#C9A84C] shadow-2xl space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] font-bold uppercase tracking-wider">
                    {videos[selectedVideo].badge}
                  </span>
                </div>

                {/* Language Switcher Tabs for Video */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                  <button
                    onClick={() => setSelectedVideo('bs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      selectedVideo === 'bs'
                        ? 'bg-[#00C9A7] text-[#0A1628] font-bold shadow-md shadow-[#00C9A7]/20'
                        : 'text-[#F5F0E8]/70 hover:text-white'
                    }`}
                  >
                    Bosanski 🇧🇦
                  </button>
                  <button
                    onClick={() => setSelectedVideo('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      selectedVideo === 'en'
                        ? 'bg-[#C9A84C] text-[#0A1628] font-bold shadow-md shadow-[#C9A84C]/20'
                        : 'text-[#F5F0E8]/70 hover:text-white'
                    }`}
                  >
                    English 🇬🇧
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8]">
                  {videos[selectedVideo].title}
                </h4>
                <p className="text-xs text-[#F5F0E8]/80 font-sans leading-relaxed">
                  {videos[selectedVideo].desc}
                </p>
              </div>

              {/* YouTube Responsive Video Container - Standard 16:9 Aspect Ratio */}
              <div className="relative w-full aspect-video aspect-[16/9] rounded-2xl overflow-hidden border border-[#1A3152] shadow-2xl bg-black group">
                <iframe
                  key={selectedVideo}
                  className="absolute inset-0 w-full h-full border-0"
                  src={videos[selectedVideo].embedUrl}
                  title={videos[selectedVideo].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Action Bar with Direct Watch Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#F5F0E8]/70">
                <span className="flex items-center gap-1.5 text-[#00C9A7]">
                  <CheckCircle className="w-4 h-4" />
                  <span>{selectedVideo === 'bs' ? 'Direktan prijenos: Poslovni Plan & Finansijski Model (Bosanski 🇧🇦)' : 'Direct Stream: PREZENTACIJA POSLOVNI PLAN NA ENG. (English 🇬🇧)'}</span>
                </span>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://www.facebook.com/SpajamoKultureStvaramoSanse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/50 font-syne font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Company SB Facebook</span>
                  </a>
                </div>
              </div>

              {/* HIGH-IMPACT PROMINENT YOUTUBE PRESENTATION ACTION CARDS */}
              <div className="mt-6 pt-5 border-t border-[#1A3152] space-y-4">
                <div className="rounded-2xl bg-[#0A1628]/95 border-2 border-red-500/40 p-5 shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                          ZVANIČNI YOUTUBE KANAL PREZENTACIJE
                        </span>
                        <h5 className="font-syne font-bold text-sm sm:text-base text-[#F5F0E8]">
                          Gledajte Prezentacije na YouTube-u u Full HD Rezoluciji
                        </h5>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#F5F0E8]/75 font-sans leading-relaxed">
                    Kompletna video prezentacija poslovnog plana i finansijskog modela B&H Assistant d.o.o. Zenica dostupna je direktno na YouTube platformi na oba jezika:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Button 1: Poslovni Plan & Finansijski Model (Bosanski) */}
                    <a
                      href="https://www.youtube.com/watch?v=shBDQQvmZiY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] border border-[#00C9A7]/40 font-syne font-bold text-xs shadow-lg transition-all hover:scale-[1.02] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current shrink-0 text-[#00C9A7]" />
                        <span className="text-left leading-tight">Poslovni Plan & Finansijski Model (YouTube 🇧🇦)</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    </a>

                    {/* Button 2: PREZENTACIJA POSLOVNI PLAN NA ENG. */}
                    <a
                      href="https://www.youtube.com/watch?v=cfGSMJwjmkM&t=4s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-syne font-bold text-xs shadow-lg shadow-red-600/25 transition-all hover:scale-[1.02] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current shrink-0" />
                        <span className="text-left leading-tight">PREZENTACIJA POSLOVNI PLAN NA ENG. (YouTube 🇬🇧)</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

