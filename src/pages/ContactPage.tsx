import React from 'react';
import { VideoBackground } from '../components/VideoBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactAndImpressum } from '../components/ContactAndImpressum';
import { PageSeo } from '../components/PageSeo';

export const ContactPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col">
      {/* 1. Pozadinski YouTube video sa blagim tamnim slojem (overlay) */}
      <VideoBackground overlayOpacity={0.75} />

      {/* 2. SEO komponente */}
      <PageSeo />

      {/* 3. Navigacija na vrhu */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 4. Centralni sadržaj stranice Kontakt */}
      <main className="relative z-10 flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium tracking-wide uppercase">
            Stupite u kontakt
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
            Kontaktirajte B&H Assistant d.o.o.
          </h1>
          <p className="text-lg text-slate-300">
            Tu smo za sve vaše upite, poslovnu saradnju, razvoj softvera i digitalne usluge u Zenici i široj regiji.
          </p>
        </div>

        {/* Glavna kontakt i impressum forma unutar stilizovanog staklenog kontejnera */}
        <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 md:p-10 shadow-2xl">
          <ContactAndImpressum />
        </div>
      </main>

      {/* 5. Podnožje (Footer) */}
      <div className="relative z-20 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
