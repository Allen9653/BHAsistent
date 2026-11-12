import React, { useState } from 'react';
import { AuthorProfileData } from '../types';
import { getAuthorProfile } from '../data/authorsData';
import { SafeImage } from './SafeImage';
import { 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Mail, 
  Globe, 
  Linkedin, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';

interface AuthorProfileProps {
  author?: string;
  authorId?: string;
  publishDate?: string;
  readingTime?: string;
  category?: string;
  showFullDetails?: boolean;
  className?: string;
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({
  author,
  authorId,
  publishDate,
  readingTime,
  category,
  showFullDetails = true,
  className = ''
}) => {
  const profile: AuthorProfileData = getAuthorProfile(authorId || author);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`rounded-2xl bg-gradient-to-br from-[#0F2038] via-[#0A1628] to-[#0F2038] border-2 border-[#1A3152] hover:border-[#00C9A7]/50 transition-all p-5 sm:p-6 shadow-xl ${className}`}
      aria-label="Profil autora i urednička transparentnost"
    >
      {/* Top Header Badge: E-E-A-T Guarantee */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1A3152]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-[11px] font-mono font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00C9A7]" />
          <span>{profile.eeatBadge}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#F5F0E8]/60">
          <span className="flex items-center gap-1 text-[#C9A84C]">
            <Award className="w-3.5 h-3.5" />
            <span>Iskustvo: {profile.experienceYears}</span>
          </span>
          {publishDate && (
            <span className="hidden sm:inline-flex items-center gap-1 border-l border-[#1A3152] pl-2 text-[#F5F0E8]/50">
              <Calendar className="w-3 h-3" />
              <span>{publishDate}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Author Box */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        {/* Avatar with Verified checkmark */}
        <div className="relative shrink-0 mx-auto sm:mx-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#00C9A7]/60 shadow-lg bg-[#0A1628] p-1">
            <SafeImage
              src={profile.avatarUrl || 'https://i.imgur.com/cXebP1B.jpg'}
              alt={profile.name}
              fallbackTitle={profile.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          {profile.verified && (
            <div 
              className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-[#00C9A7] text-[#0A1628] shadow-md border-2 border-[#0A1628]"
              title="Verifikovani stručnjak & autor"
            >
              <CheckCircle2 className="w-4 h-4 fill-[#0A1628] text-[#00C9A7]" />
            </div>
          )}
        </div>

        {/* Bio Info */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="font-syne font-extrabold text-lg sm:text-xl text-[#F5F0E8]">
                {profile.name}
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-[#0A1628] border border-[#1A3152] text-[10px] font-mono text-[#00C9A7] font-semibold">
                Verifikovani Autor
              </span>
            </div>

            <p className="text-xs sm:text-sm font-syne font-bold text-[#00C9A7]">
              {profile.role}
            </p>
            <p className="text-[11px] font-mono text-[#C9A84C]/90">
              {profile.credentials}
            </p>
          </div>

          <p className="text-xs sm:text-[13px] text-[#F5F0E8]/80 font-sans leading-relaxed pt-1">
            {profile.bio}
          </p>

          {/* Location & Metadata Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] font-mono text-[#F5F0E8]/60">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00C9A7]" />
              <span>{profile.location}</span>
            </span>
            {profile.articlesCount && (
              <span className="flex items-center gap-1 border-l border-[#1A3152] pl-2">
                <BookOpen className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>{profile.articlesCount} autorskih članaka i vodiča</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Specialties Tags */}
      {profile.specialties && profile.specialties.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#1A3152]/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50">
            <span className="uppercase tracking-wider">Ključne kompetencije i ekspertiza (E-E-A-T):</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#00C9A7] hover:underline inline-flex items-center gap-1 text-[11px] font-bold"
            >
              <span>{isExpanded ? 'Manje detalja' : 'Urednički standardi'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {profile.specialties.map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#0A1628] border border-[#1A3152] text-[11px] font-mono text-[#F5F0E8]/80 hover:border-[#00C9A7]/40 transition-colors"
              >
                ✓ {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Editorial Trust & Review Policy Drawer */}
      {isExpanded && (
        <div className="mt-4 p-4 rounded-xl bg-[#0A1628] border border-[#00C9A7]/30 space-y-3 animate-fadeIn text-xs text-[#F5F0E8]/80 font-sans">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00C9A7] uppercase">
            <Info className="w-4 h-4 text-[#00C9A7]" />
            <span>AdSense & E-E-A-T Urednička Politika B&H Assistant d.o.o.</span>
          </div>
          <p className="leading-relaxed text-[12px]">
            Svi tekstovi, tutorijali i pravno-finansijski vodiči na portalu <strong>bh-assistant.ba</strong> prolaze dvostruku verifikaciju prije objavljivanja:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-[11px] font-mono text-[#F5F0E8]/70">
            <li><strong>Iskustvo (Experience):</strong> Autori posjeduju praktično terensko iskustvo u bh. IT sektoru i radu sa općinskim organima.</li>
            <li><strong>Ekspertiza (Expertise):</strong> Tehnički i pravni koncepti su usklađeni sa važećim zakonodavstvom BiH i službenim obrascima.</li>
            <li><strong>Autoritativnost (Authoritativeness):</strong> Iza portala stoji registrovano pravno lice B&H ASSISTANT d.o.o. Zenica (JIB: 4219296620005, MBS: 43-01-0177-25).</li>
            <li><strong>Pouzdanost (Trustworthiness):</strong> Korisnički podaci su zaštićeni, nema obmanjujućeg oglašavanja ili 'low-value' automatskog sadržaja.</li>
          </ul>
        </div>
      )}

      {/* Contact & Social Links Bar */}
      <div className="mt-4 pt-3 border-t border-[#1A3152]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          {profile.contactEmail && (
            <a
              href={`mailto:${profile.contactEmail}`}
              className="inline-flex items-center gap-1.5 text-[#00C9A7] hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.contactEmail}</span>
            </a>
          )}
          {profile.websiteUrl && (
            <a
              href={profile.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F5F0E8]/70 hover:text-[#00C9A7]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>bh-assistant.ba</span>
            </a>
          )}
        </div>

        <span className="text-[10px] text-[#F5F0E8]/40">
          Urednički revidirano za AdSense standarde
        </span>
      </div>
    </aside>
  );
};

export default AuthorProfile;
