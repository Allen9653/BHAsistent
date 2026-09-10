import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Scale, CheckCircle2, ShieldCheck, AlertCircle, Building2, Mail, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#00C9A7]">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Početna</span>
          </Link>
          <span className="text-[#F5F0E8]/40">/</span>
          <span className="text-[#F5F0E8]/70">Uslovi Korištenja</span>
        </div>

        {/* Header */}
        <header className="space-y-4 border-b border-[#1A3152] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] font-mono text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Pravni okvir i opći uslovi poslovanja</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight">
            Opći Uslovi Korištenja Platforme
          </h1>
          <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed font-sans">
            Dobrodošli na zvaničnu web platformu društva <strong className="text-[#F5F0E8]">{COMPANY_INFO.fullLegalName}</strong>. Pristupom i korištenjem ove web stranice prihvatate sljedeće opće uslove.
          </p>
          <p className="text-xs font-mono text-[#00C9A7]">
            Zadnja izmjena: {new Date().toLocaleDateString('bs-BA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Legal Identity */}
        <section className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-[#C9A84C]">
            <Building2 className="w-5 h-5" />
            <h2 className="font-syne font-bold text-base text-[#F5F0E8]">
              Pravni identitet pružaoca usluga
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-[#0A1628] p-4 rounded-xl border border-[#1A3152]">
            <p><strong className="text-[#00C9A7]">Firma:</strong> {COMPANY_INFO.fullLegalName}</p>
            <p><strong className="text-[#C9A84C]">Grad:</strong> {COMPANY_INFO.city}, BiH</p>
            <p><strong className="text-[#C9A84C]">JIB:</strong> {COMPANY_INFO.jib}</p>
            <p><strong className="text-[#C9A84C]">MBS:</strong> {COMPANY_INFO.mbs}</p>
            <p className="sm:col-span-2"><strong className="text-[#00C9A7]">Sjedište:</strong> {COMPANY_INFO.address}</p>
            <p><strong className="text-[#00C9A7]">Zvanični e-mail:</strong> {COMPANY_INFO.email}</p>
            <p><strong className="text-[#00C9A7]">Telefon:</strong> {COMPANY_INFO.phone}</p>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00C9A7]" />
              <span>1. Autorska prava i intelektualno vlasništvo</span>
            </h2>
            <p>
              Cjelokupan sadržaj dostupan na ovoj stranici, uključujući softverska rješenja, baze podataka, izvorne kodove, logotipe, grafičke elemente, tekstove i digitalne alate (BH Konver, BH PapirFinder, Ornamenti Bosne, magazin SCENA+, ZENTAXI, GUMMI projekti), isključivo je intelektualno vlasništvo firme B&H ASSISTANT d.o.o. Zenica ili njenih licencnih partnera.
            </p>
            <p>
              Zabranjeno je svako neovlašteno kopiranje, distribucija, dekompiliranje ili komercijalna eksploatacija bilo kojeg dijela sistema bez prethodne pismene saglasnosti.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00C9A7]" />
              <span>2. Korištenje digitalnih alata i e-Usluga</span>
            </h2>
            <p>
              Korisnici mogu koristiti digitalne kalkulatore i vodiče u skladu sa njihovom namjenom. Dokumenti i obrasci preuzeti putem BH PapirFinder-a potiču iz javno dostupnih općinskih registara i namijenjeni su olakšavanju administrativnih procedura građanima i privredi.
            </p>
            <div className="flex items-start gap-2 bg-[#0F2038] p-4 rounded-xl border border-[#1A3152]">
              <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
              <span>Edukativna bojanka Gummi je besplatno dostupna za privatnu i neprofitnu školsku ili porodičnu edukaciju.</span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#C9A84C]" />
              <span>3. Ograničenje odgovornosti</span>
            </h2>
            <p>
              B&H ASSISTANT d.o.o. Zenica ulaže maksimalne stručne napore kako bi osigurala tačnost, ažurnost i kontinuitet svih informacija i kalkulatora. Ipak, platforma se pruža po principu „viđeno-dostupno” (<em>as is</em>) bez implicitnih garancija za specifične poslovne odluke korisnika.
            </p>
            <p>
              Za pravne poslove sa trećim stranama (npr. vanjski partneri, affiliate edukacije preko platforme Alison) važe uslovi korištenja tih eksternih servisa.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#00C9A7]" />
              <span>4. Nadležnost i rješavanje sporova</span>
            </h2>
            <p>
              Za ove Uslove korištenja mjerodavno je pravo Bosne i Hercegovine. U slučaju eventualnih nesporazuma, strane će nastojati spor riješiti mirnim putem i pregovorima, a u suprotnom je nadležan stvarno nadležni sud u Zenici.
            </p>
          </section>

          <section className="space-y-3 bg-[#0F2038] p-6 rounded-2xl border border-[#1A3152]">
            <h2 className="font-syne font-bold text-base text-[#F5F0E8]">
              5. Pitanja i pravni upiti
            </h2>
            <p className="text-xs text-[#F5F0E8]/80">
              Ukoliko imate bilo kakva pitanja vezana za ove uslove korištenja ili saradnju sa društvom, možete nas kontaktirati:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <span className="text-[#F5F0E8]/40">•</span>
              <span className="text-[#F5F0E8]/80">{COMPANY_INFO.phone}</span>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
};

export default TermsPage;
