import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin, Building2, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Politika Privatnosti i Zaštita Ličnih Podataka (GDPR) | B&H ASSISTANT d.o.o. Zenica';
  }, []);

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb / Back link */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#00C9A7]">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Početna</span>
          </Link>
          <span className="text-[#F5F0E8]/40">/</span>
          <span className="text-[#F5F0E8]/70">Politika Privatnosti</span>
        </div>

        {/* Header */}
        <header className="space-y-4 border-b border-[#1A3152] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] font-mono text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>GDPR & Zaštita ličnih podataka BiH</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight">
            Politika Privatnosti i Zaštita Podataka
          </h1>
          <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed font-sans">
            B&H ASSISTANT d.o.o. Zenica posvećuje maksimalnu pažnju zaštiti privatnosti svojih korisnika, partnera i posjetilaca web stranice <span className="text-[#00C9A7] font-mono">www.bh-assistant.ba</span>.
          </p>
          <p className="text-xs font-mono text-[#C9A84C]">
            Posljednje ažuriranje: {new Date().toLocaleDateString('bs-BA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Company Identity Box */}
        <section className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-[#00C9A7]">
            <Building2 className="w-5 h-5" />
            <h2 className="font-syne font-bold text-base text-[#F5F0E8]">
              1. Voditelj obrade ličnih podataka
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/80 leading-relaxed">
            Voditelj obrade podataka za ovu web platformu i povezane digitalne servise je:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-[#0A1628] p-4 rounded-xl border border-[#1A3152]">
            <p><strong className="text-[#00C9A7]">Puni naziv:</strong> {COMPANY_INFO.fullLegalName}</p>
            <p><strong className="text-[#C9A84C]">Sjedište:</strong> {COMPANY_INFO.city}, BiH</p>
            <p><strong className="text-[#C9A84C]">JIB:</strong> {COMPANY_INFO.jib}</p>
            <p><strong className="text-[#C9A84C]">MBS:</strong> {COMPANY_INFO.mbs}</p>
            <p className="sm:col-span-2"><strong className="text-[#00C9A7]">Adresa:</strong> {COMPANY_INFO.address}</p>
            <p><strong className="text-[#00C9A7]">E-mail:</strong> {COMPANY_INFO.email}</p>
            <p><strong className="text-[#00C9A7]">Telefon:</strong> {COMPANY_INFO.phone}</p>
          </div>
        </section>

        {/* Policy Body */}
        <div className="space-y-8 text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#00C9A7]" />
              <span>2. Koje podatke prikupljamo</span>
            </h2>
            <p>
              Prilikom posjete i korištenja naše platforme možemo prikupljati sljedeće kategorije podataka:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#F5F0E8]/80">
              <li><strong>Tehnički podaci o posjeti:</strong> IP adresa, tip preglednika, operativni sistem, rezolucija ekrana i vrijeme pristupa (putem Google Analytics i Google Tag Managera).</li>
              <li><strong>Podaci dostavljeni putem kontakt formi:</strong> Ime, prezime, e-mail adresa, broj telefona i sadržaj Vašeg upita.</li>
              <li><strong>Podaci o kolačićima (Cookies):</strong> Neophodni funkcionalni kolačići za rad stranice, analitički kolačići i marketinške preference uz Vašu izričitu saglasnost.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00C9A7]" />
              <span>3. Svrha i pravni osnov obrade</span>
            </h2>
            <p>
              Lične podatke obrađujemo isključivo u sljedeće zakonite svrhe:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
                <span><strong>Odgovor na Vaše upite i komunikacija:</strong> Obrada je nužna radi preduzimanja radnji na Vaš zahtjev prije sklapanja ugovora ili realizacije poslovne saradnje.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
                <span><strong>Pružanje digitalnih alata i usluga:</strong> Omogućavanje pristupa našim besplatnim i licenciranim digitalnim alatima (BH Konver, BH PapirFinder).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
                <span><strong>Tehnička stabilnost i sigurnost platforme:</strong> Legitimni interes društva u zaštiti integriteta mrežnih sistema od zloupotreba.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00C9A7]" />
              <span>4. Kolačići (Cookies) i analitički servisi</span>
            </h2>
            <p>
              Web stranica koristi Google Tag Manager i Google Analytics (oznaka <code className="text-[#00C9A7] bg-[#0F2038] px-1.5 py-0.5 rounded">G-XZE9GE0XX4</code>) za anonimizirano mjerenje posjećenosti. Možete u bilo kojem trenutku promijeniti ili opozvati svoje postavke kolačića putem linka u podnožju stranice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C9A84C]" />
              <span>5. Vaša prava u pogledu ličnih podataka</span>
            </h2>
            <p>
              U skladu sa Zakonom o zaštiti ličnih podataka BiH i općim standardima privatnosti (GDPR), imate sljedeća prava:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#F5F0E8]/80">
              <li>Pravo na pristup Vašim podacima i potvrdu o njihovoj obradi.</li>
              <li>Pravo na ispravku netačnih ili nepotpunih podataka.</li>
              <li>Pravo na brisanje („pravo na zaborav”) kada podaci više nisu neophodni.</li>
              <li>Pravo na ograničenje obrade i pravo na ulaganje prigovora.</li>
              <li>Pravo na prenosivost podataka u strukturiranom, mašinski čitljivom formatu.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-[#0F2038] p-6 rounded-2xl border border-[#1A3152]">
            <h2 className="font-syne font-bold text-base text-[#F5F0E8]">
              6. Kontakt za ostvarivanje prava na privatnost
            </h2>
            <p className="text-xs text-[#F5F0E8]/80">
              Za sva pitanja, zahtjeve za pristup, izmjenu ili brisanje ličnih podataka, možete se direktno obratiti našem službeniku za zaštitu podataka:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#00C9A7]/10 hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <span className="text-[#F5F0E8]/40">•</span>
              <span className="text-[#F5F0E8]/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>{COMPANY_INFO.address}</span>
              </span>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
