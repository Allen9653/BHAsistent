import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Layers, 
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface PartnerAffiliateItem {
  id: string;
  name: string;
  domain: string;
  category: string;
  badge: string;
  badgeType: 'teal' | 'gold' | 'cyan' | 'purple' | 'emerald';
  description: string;
  highlight: string;
  affiliateUrl: string;
  buttonLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl?: string;
  brandInitials: string;
  brandColor: string; // Hex or Tailwind color style
  accentBorderColor: string;
  bgGradient: string;
}

export const PARTNERS_AFFILIATES_DATA: PartnerAffiliateItem[] = [
  {
    id: 'xpuvo',
    name: 'Mitgo Global Deals',
    domain: 'xpuvo.com',
    category: 'E-Commerce & Popusti',
    badge: 'GLOBALNI POPUSTI 🌟',
    badgeType: 'teal',
    description: 'Ovlašteni B&H Assistant partnerski kanal za ekskluzivne promotivne ponude, kupone i globalne popuste vodećih svjetskih brendova.',
    highlight: 'Provjerene ponude i direktni popusti',
    affiliateUrl: 'https://xpuvo.com/g/ofc53p8nisfe02eff231e94db72a90/',
    buttonLabel: 'Istraži Ponude',
    icon: Globe,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/xpuvo.com_raina_tours_logo.png',
    brandInitials: 'XP',
    brandColor: '#00C9A7',
    accentBorderColor: 'hover:border-[#00C9A7]',
    bgGradient: 'from-[#00C9A7]/10 to-transparent'
  },
  {
    id: 'alison',
    name: 'Alison Edukacija',
    domain: 'alison.com',
    category: 'Online Edukacija',
    badge: '100% BESPLATNO & DIPLOME',
    badgeType: 'gold',
    description: 'Besplatni certificirani online kursevi iz IT-ja, biznisa, menadžmenta i stranih jezika sa međunarodno priznatim diplomama.',
    highlight: 'Predavači sa svjetskih univerziteta',
    affiliateUrl: 'https://alison.com/?utm_source=alison_user&utm_medium=affiliate&utm_campaign=56404529',
    buttonLabel: 'Upiši Kurseve',
    icon: GraduationCap,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/alison_com_logo.png',
    brandInitials: 'AL',
    brandColor: '#00AA6C',
    accentBorderColor: 'hover:border-[#00AA6C]',
    bgGradient: 'from-[#00AA6C]/10 to-transparent'
  },
  {
    id: 'remoterocketship',
    name: 'Remote Rocketship',
    domain: 'remoterocketship.com',
    category: 'Remote Poslovi & Karijera',
    badge: 'RAD OD KUĆE U BIH & SVIJETU',
    badgeType: 'teal',
    description: 'Vodeća platforma za pronalazak provjerenih remote poslova i fleksibilnog rada od kuće u IT-ju, marketingu i administraciji.',
    highlight: 'Direktne inostrane i EU/SAD pozicije',
    affiliateUrl: 'https://remoterocketship.com/?ref=posaoodkuce',
    buttonLabel: 'Pregledaj Poslove',
    icon: Briefcase,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/remote_rocketship_logo.png',
    brandInitials: 'RR',
    brandColor: '#3B82F6',
    accentBorderColor: 'hover:border-[#3B82F6]',
    bgGradient: 'from-[#3B82F6]/10 to-transparent'
  },
  {
    id: 'rzekl',
    name: 'Admitad & Mitgo Gateway',
    domain: 'rzekl.com',
    category: 'Digitalna Mreža & Partneri',
    badge: 'VERIFIKOVANI GATEWAY 🌐',
    badgeType: 'gold',
    description: 'Zvanično obnovljeni i verifikovani gateway B&H Assistant d.o.o. sa pristupom stotinama svjetskih oglašivača i servisa.',
    highlight: 'Verifikovan Mitgo ID: fe02eff231',
    affiliateUrl: 'https://rzekl.com/g/1e8d114494fe02eff23116525dc3e8/',
    buttonLabel: 'Pristupi Portalu',
    icon: ShieldCheck,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/rzekl.com_logo.png',
    brandInitials: 'AD',
    brandColor: '#C9A84C',
    accentBorderColor: 'hover:border-[#C9A84C]',
    bgGradient: 'from-[#C9A84C]/10 to-transparent'
  },
  {
    id: 'monday',
    name: 'monday.com Work OS',
    domain: 'monday.com',
    category: 'Produktivnost & Menadžment',
    badge: 'WORK OS & KANBAN',
    badgeType: 'cyan',
    description: 'Vodeća platforma za upravljanje projektima, timsku koordinaciju, vizuelne Kanban table i automatizaciju radnih procesa.',
    highlight: '200+ integracija i besplatan start',
    affiliateUrl: 'https://try.monday.com/platforma-za-sve',
    buttonLabel: 'Isprobaj monday.com',
    icon: Layers,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/monday_com_logo.png',
    brandInitials: 'M.',
    brandColor: '#FF3D57',
    accentBorderColor: 'hover:border-[#FF3D57]',
    bgGradient: 'from-[#FF3D57]/10 to-transparent'
  },
  {
    id: 'tryhackme',
    name: 'TryHackMe Cyber Lab',
    domain: 'tryhackme.com',
    category: 'Sajber Sigurnost & IT',
    badge: 'CYBER SECURITY & LABS',
    badgeType: 'purple',
    description: 'Interaktivno učenje sajber sigurnosti, etičkog hakovanja i mrežnih tehnologija kroz praktične virtuelne laboratorije u browseru.',
    highlight: 'Lična virtuelna mašina u pretraživaču',
    affiliateUrl: 'https://tryhackme.com/',
    buttonLabel: 'Pokreni Cyber Lab',
    icon: Terminal,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/try_hackMe_logo.png',
    brandInitials: 'THM',
    brandColor: '#A855F7',
    accentBorderColor: 'hover:border-[#A855F7]',
    bgGradient: 'from-[#A855F7]/10 to-transparent'
  },
  {
    id: 'atoms',
    name: 'Atoms.dev AI Platform',
    domain: 'atoms.dev',
    category: 'AI & Cloud Tehnologije',
    badge: 'PRETVORI IDEJU U PROIZVOD',
    badgeType: 'emerald',
    description: 'Inovativna AI i cloud platforma za brzo kreiranje, testiranje i skaliranje pametnih web aplikacija i autonomnih agenata.',
    highlight: 'Brz razvoj softvera i AI rješenja',
    affiliateUrl: 'https://atoms.dev/?utm_source=affiliate&via=pretvori-ideju-u-realnost',
    buttonLabel: 'Istraži Atoms.dev',
    icon: Cpu,
    logoUrl: 'https://archive.org/download/remote_rocketship_logo/atoms_dev_logo.png',
    brandInitials: 'AT',
    brandColor: '#10B981',
    accentBorderColor: 'hover:border-[#10B981]',
    bgGradient: 'from-[#10B981]/10 to-transparent'
  }
];

export const PartnersAffiliatesSection: React.FC = () => {
  const { t } = useLanguage();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (partnerId: string) => {
    setImageErrors(prev => ({ ...prev, [partnerId]: true }));
  };

  const getBadgeClasses = (type: PartnerAffiliateItem['badgeType']) => {
    switch (type) {
      case 'gold':
        return 'bg-[#C9A84C]/20 border-[#C9A84C]/50 text-[#C9A84C]';
      case 'cyan':
        return 'bg-[#00C9A7]/20 border-[#00C9A7]/50 text-[#00C9A7]';
      case 'purple':
        return 'bg-[#9333EA]/20 border-[#9333EA]/50 text-[#C084FC]';
      case 'emerald':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
      case 'teal':
      default:
        return 'bg-[#00C9A7]/20 border-[#00C9A7]/40 text-[#00C9A7]';
    }
  };

  return (
    <section id="partneri-affiliates" className="w-full py-8">
      <div className="rounded-3xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#12233B] border-2 border-[#00C9A7]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Glow Elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 border-b border-[#1A3152] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] text-[11px] font-mono tracking-wider uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>{t('home.affiliate.badge', 'OVLAŠTENI PARTNERI & AFFILIATE PROGRAM')}</span>
            </div>
            
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight uppercase">
              Naši Partneri & Preporučeni Alati
            </h2>
            
            <p className="text-xs sm:text-sm text-[#F5F0E8]/75 max-w-2xl font-sans leading-relaxed">
              B&H Assistant d.o.o. Zenica sarađuje sa vodećim globalnim tehnološkim, edukativnim i poslovnim platformama. Pristupite ekskluzivnim popustima, radu od kuće, AI rješenjima i certificiranoj edukaciji.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center gap-2 text-xs font-mono text-[#00C9A7]">
              <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
              <span>7 Aktivnih Partnerstava</span>
            </div>
          </div>
        </div>

        {/* Responsive Partners Grid: 1 col (mobile), 2-3 col (tablet), 3-4 col (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 relative z-10">
          {PARTNERS_AFFILIATES_DATA.map((partner) => {
            const IconComponent = partner.icon;
            const badgeClasses = getBadgeClasses(partner.badgeType);
            const hasImgError = imageErrors[partner.id];

            return (
              <motion.div
                key={partner.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`group rounded-2xl bg-[#0A1628]/95 border border-[#1A3152] ${partner.accentBorderColor} p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00C9A7]/10 transition-all backdrop-blur-sm relative overflow-hidden`}
              >
                {/* Top Glowing Indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C9A7]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Top & Body */}
                <div className="space-y-3.5">
                  
                  {/* Badge & Domain Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${badgeClasses}`}>
                      {partner.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F0E8]/50 group-hover:text-[#00C9A7] transition-colors">
                      {partner.domain}
                    </span>
                  </div>

                  {/* Brand Logo Container + Name */}
                  <div className="flex items-start gap-3 pt-1">
                    
                    {/* Brand Logo Box with Archive.org asset and Sleek Initials Fallback */}
                    <div 
                      className="w-12 h-12 rounded-xl bg-[#0F2038] border border-[#1A3152] group-hover:border-[#00C9A7]/70 flex items-center justify-center p-1.5 shrink-0 transition-all shadow-md relative overflow-hidden"
                      style={{
                        boxShadow: `0 4px 14px ${partner.brandColor}20`
                      }}
                    >
                      {partner.logoUrl && !hasImgError ? (
                        <img
                          src={partner.logoUrl}
                          alt={`${partner.name} logo`}
                          onError={() => handleImageError(partner.id)}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <span 
                            className="font-syne font-extrabold text-xs tracking-wider uppercase select-none"
                            style={{ color: partner.brandColor }}
                          >
                            {partner.brandInitials}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="min-w-0">
                      <h3 className="font-syne font-bold text-base text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors truncate">
                        {partner.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#C9A84C] mt-0.5 truncate">
                        {partner.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#F5F0E8]/75 font-sans leading-relaxed line-clamp-3">
                    {partner.description}
                  </p>

                  {/* Highlight Pill */}
                  <div className="p-2.5 rounded-xl bg-[#0F2038]/80 border border-[#1A3152] flex items-center gap-2 text-[11px] text-[#F5F0E8]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7] shrink-0" />
                    <span className="truncate">{partner.highlight}</span>
                  </div>

                </div>

                {/* Card Action Button */}
                <div className="pt-4 mt-4 border-t border-[#1A3152]">
                  <a
                    href={partner.affiliateUrl}
                    target="_blank"
                    rel="sponsored noopener"
                    className="w-full min-h-[42px] px-4 py-2.5 rounded-xl bg-[#0F2038] group-hover:bg-[#00C9A7] border border-[#1A3152] group-hover:border-[#00C9A7] text-[#F5F0E8] group-hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg group-hover:shadow-[#00C9A7]/20"
                  >
                    <span>{partner.buttonLabel}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Transparency & Verification Notice */}
        <div className="mt-8 pt-5 border-t border-[#1A3152] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#F5F0E8]/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00C9A7]" />
            <span>Svi linkovi su verifikovani i sadrže službenu partnersku podršku (rel="sponsored noopener").</span>
          </div>
          <span className="text-[#C9A84C]">B&H Assistant d.o.o. Zenica • Verified Partner Network</span>
        </div>

      </div>
    </section>
  );
};

export default PartnersAffiliatesSection;

