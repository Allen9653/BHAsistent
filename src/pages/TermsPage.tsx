import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Scale, CheckCircle2, ShieldCheck, AlertCircle, Building2, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { PageSeo } from '../components/PageSeo';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen-mobile bg-transparent text-[#F5F0E8] py-10 sm:py-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <PageSeo />
      <div className="max-w-4xl mx-auto space-y-10">
        
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
              <span>2. Korištenje digitalnih alata, softvera i e-Usluga</span>
            </h2>
            <p>
              Korisnici mogu koristiti digitalne kalkulatore i vodiče u skladu sa njihovom namjenom. Dokumenti i obrasci preuzeti putem BH PapirFinder-a potiču iz javno dostupnih općinskih registara i namijenjeni su olakšavanju administrativnih procedura građanima i privredi.
            </p>
            <p>
              Naši komercijalni softverski proizvodi (BH KONVER na <a href="https://www.bh-konver.com/" target="_blank" rel="noopener noreferrer" className="text-[#00C9A7] underline">www.bh-konver.com</a>, Ornamenti Bosne, magazin SCENA+ i BH PapirFinder dostupan na <a href="https://papir-finder.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#00C9A7] underline">papir-finder.vercel.app</a>) te 8 profesionalnih IT usluga (B2B Lead Generation, Digital PR, Custom Web Setup, Lokalizacija, Vektorska baština, Web Performance/SEO revizija, Mobile App Development i Web-to-App transformacija) regulisani su specifičnim ugovorima i narudžbenicama.
            </p>
            <div className="flex items-start gap-2 bg-[#0F2038] p-4 rounded-xl border border-[#1A3152]">
              <CheckCircle2 className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
              <span>Edukativna bojanka Gummi i prateće e-publikacije besplatno su dostupne za privatnu i neprofitnu školsku ili porodičnu edukaciju (Free Download).</span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-syne font-bold text-lg text-[#F5F0E8] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#C9A84C]" />
              <span>3. Izjava o odricanju pravne i finansijske odgovornosti (Legal & Financial Disclaimer)</span>
            </h2>
            <p>
              B&H ASSISTANT d.o.o. Zenica ulaže maksimalne stručne napore kako bi osigurala tačnost, ažurnost i matematičko-tehničku pouzdanost svih kalkulatora, poreznih algoritama i generatora obrazaca. Ipak, platforma i povezani alati pružaju se po principu „viđeno-dostupno” (<em>as is</em>) u svrhu tehničko-administrativne asistencije i informatičke automatizacije.
            </p>
            <div className="p-4 rounded-xl bg-[#0A1628] border border-[#C9A84C]/40 space-y-2 text-xs">
              <p className="font-bold text-[#C9A84C] uppercase tracking-wider">Važna pravna napomena za korisnike digitalnih alata:</p>
              <p className="text-[#F5F0E8]/80 leading-relaxed">
                Generisane pravne izjave i kalkulatori unutar sistema BH KONVER i BH PapirFinder ne predstavljaju formalno advokatsko, notarsko, sudsko ili ovlašteno porezno savjetovanje. Korisnici su dužni prije podnošenja dokumenata nadležnim državnim ili kantonalnim organima provjeriti tačnost unesenih ličnih i materijalnih podataka. B&H ASSISTANT d.o.o. ne snosi materijalnu ni krivičnu odgovornost za eventualne propuste nastale usljed netačnog unosa podataka od strane korisnika ili izmjena propisa od strane zakonodavnih tijela.
              </p>
            </div>
            <p className="text-xs text-[#F5F0E8]/70">
              Za pravne poslove sa trećim stranama (npr. vanjski partneri, affiliate platforme i eksterni servisi) važe isključivo opći uslovi poslovanja tih eksternih subjekata.
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
    </div>
  );
};

export default TermsPage;
