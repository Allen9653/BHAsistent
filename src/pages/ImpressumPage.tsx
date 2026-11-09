import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  FileText, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Sparkles, 
  Scale, 
  ExternalLink,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { AUTHORS_DATA } from '../data/authorsData';
import { PageSeo } from '../components/PageSeo';

export const ImpressumPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const leadEditor = AUTHORS_DATA['alen-jusufovic'];
  const editorialBoard = AUTHORS_DATA['redakcija-bh-assistant'];

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#F5F0E8] py-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <PageSeo />
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="space-y-4 border-b border-[#1A3152] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] font-mono text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Impresum & Urednički Standardi (E-E-A-T)</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight">
            Impresum, Uredništvo & Etički Kodeks
          </h1>
          <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed font-sans">
            Službeni podaci o izdavaču, uredničkoj strukturi magazina SCENA+, CMS novosti, digitalnih alata i standardima autorske odgovornosti društva <strong className="text-[#F5F0E8]">{COMPANY_INFO.fullLegalName}</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#C9A84C]">
            <span>Usklađeno sa Google Publisher smjernicama</span>
            <span>•</span>
            <span>Ažurirano: {new Date().toLocaleDateString('bs-BA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* 1. Pravni Podaci o Izdavaču i Registraciji */}
        <section className="bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#1A3152] pb-4">
            <div className="flex items-center gap-2.5 text-[#00C9A7]">
              <Scale className="w-5 h-5" />
              <h2 className="font-syne font-extrabold text-lg text-[#F5F0E8]">
                1. Registracija i Pravni Podaci Izdavača
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] text-[11px] font-mono font-bold">
              CompanyWall Verifikovano
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-[#0A1628] p-5 rounded-2xl border border-[#1A3152]">
            <p><strong className="text-[#00C9A7]">Puni pravni naziv:</strong> {COMPANY_INFO.fullLegalName}</p>
            <p><strong className="text-[#C9A84C]">Skraćeni naziv:</strong> {COMPANY_INFO.name}</p>
            <p><strong className="text-[#C9A84C]">Jedinstveni ID broj (JIB):</strong> {COMPANY_INFO.jib}</p>
            <p><strong className="text-[#C9A84C]">Matični registarski broj (MBS):</strong> {COMPANY_INFO.mbs}</p>
            <p><strong className="text-[#00C9A7]">Sjedište i adresa:</strong> {COMPANY_INFO.address}</p>
            <p><strong className="text-[#00C9A7]">Registarski sud:</strong> Općinski sud u Zenici, BiH</p>
            <p><strong className="text-[#00C9A7]">Službeni e-mail:</strong> {COMPANY_INFO.email}</p>
            <p><strong className="text-[#00C9A7]">Kontakt telefon:</strong> {COMPANY_INFO.phone}</p>
            <p className="sm:col-span-2 text-[#F5F0E8]/70">
              <strong className="text-[#C9A84C]">Djelatnosti:</strong> Računarsko programiranje, savjetovanje u IT sektoru, izdavanje softvera i magazina, e-trgovina i digitalne usluge.
            </p>
          </div>
        </section>

        {/* 2. Urednički Tim & Autorska Struktura (E-E-A-T) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-[#C9A84C]">
            <User className="w-5 h-5 text-[#00C9A7]" />
            <h2 className="font-syne font-extrabold text-xl text-[#F5F0E8]">
              2. Uredništvo i Ključna Autorska Odgovornost
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Glavni urednik i inženjer */}
            <div className="p-6 rounded-3xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00C9A7]/20 border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] font-syne font-extrabold text-lg">
                  AJ
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-lg text-[#F5F0E8]">
                    Alen Jusufović
                  </h3>
                  <p className="text-xs font-mono text-[#00C9A7]">
                    {leadEditor.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans">
                {leadEditor.bio}
              </p>
              <div className="pt-2 border-t border-[#1A3152] text-xs font-mono space-y-1 text-[#F5F0E8]/60">
                <p>Kvalifikacije: <strong className="text-[#C9A84C]">{leadEditor.credentials}</strong></p>
                <p>E-mail: <a href={`mailto:${leadEditor.contactEmail}`} className="text-[#00C9A7] underline">{leadEditor.contactEmail}</a></p>
              </div>
            </div>

            {/* Stručni kolegij */}
            <div className="p-6 rounded-3xl bg-[#0F2038] border border-[#1A3152] space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] font-syne font-extrabold text-lg">
                  BA
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-lg text-[#F5F0E8]">
                    Redakcija B&H Assistant
                  </h3>
                  <p className="text-xs font-mono text-[#C9A84C]">
                    {editorialBoard.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#F5F0E8]/80 leading-relaxed font-sans">
                {editorialBoard.bio}
              </p>
              <div className="pt-2 border-t border-[#1A3152] text-xs font-mono space-y-1 text-[#F5F0E8]/60">
                <p>Nadležnost: <strong className="text-[#00C9A7]">Provjera činjenica, pravni obrasci, magazin SCENA+</strong></p>
                <p>Kontakt: <a href="mailto:info@bh-assistant.ba" className="text-[#00C9A7] underline">info@bh-assistant.ba</a></p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Urednički Principi, Provjera Činjenica i Politika Ispravki */}
        <section className="bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 text-[#00C9A7]">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-syne font-extrabold text-lg text-[#F5F0E8]">
              3. Urednički Standardi i Novinarski Kodeks (Fact-Checking & Ethics)
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed font-sans">
            <div className="space-y-2">
              <h3 className="font-syne font-bold text-sm text-[#00C9A7] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7]" />
                <span>Politika provjere činjenica (Fact-Checking Policy)</span>
              </h3>
              <p className="text-xs text-[#F5F0E8]/80 leading-relaxed pl-6">
                Svaki objavljeni članak, vodič kroz administrativne takse, analiza zakonskih propisa i pregled tehnoloških alata podliježe provjeri iz primarnih izvora (Službeni listovi BiH i entiteta, registri javne uprave, zvanična saopštenja nadležnih ministarstava). Ne objavljujemo nepotvrđene glasine niti senzacionalistički sadržaj.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-syne font-bold text-sm text-[#00C9A7] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7]" />
                <span>Politika ispravki grešaka (Corrections Policy)</span>
              </h3>
              <p className="text-xs text-[#F5F0E8]/80 leading-relaxed pl-6">
                Ukoliko se u objavljenom tekstu ili bazi obrazaca utvrdi činjenična ili tehnička greška, redakcija bez odlaganja pristupa korekciji uz transparentnu napomenu na dnu članka sa datumom i opisom izmjene. Čitaoci mogu prijaviti uočene nepravilnosti direktno na <a href="mailto:info@bh-assistant.ba" className="text-[#00C9A7] underline">info@bh-assistant.ba</a>.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-syne font-bold text-sm text-[#C9A84C] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C9A84C]" />
                <span>Transparentnost o sponzorisanom sadržaju i partnerstvima</span>
              </h3>
              <p className="text-xs text-[#F5F0E8]/80 leading-relaxed pl-6">
                Svi sponzorisani tekstovi, komercijalna partnerstva (npr. B2B saradnja sa SkilledBridge d.o.o.) i plaćeni oglasi jasno su i vidljivo označeni etiketama „Sponzorisani sadržaj”, „B2B Partner” ili „Oglas”. Komercijalni partneri nemaju uticaj na nezavisnost uredničkih recenzija i tehničkih analiza.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Linkovi na Pravne Stranice i Kontakt */}
        <section className="p-6 rounded-3xl bg-[#0A1628] border border-[#1A3152] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
              Povezani pravni dokumenti
            </h4>
            <p className="text-xs text-[#F5F0E8]/60 font-mono">
              Pročitajte našu Politiku Privatnosti (GDPR) i Opće Uslove Korištenja.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/politika-privatnosti"
              className="px-4 py-2 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#00C9A7] text-xs font-syne font-bold transition-colors"
            >
              Politika Privatnosti
            </Link>
            <Link
              to="/uslovi-koristenja"
              className="px-4 py-2 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#C9A84C] text-xs font-syne font-bold transition-colors"
            >
              Uslovi Korištenja
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ImpressumPage;
