import React from 'react';
import { ContactAndImpressum } from '../components/ContactAndImpressum';
import { PageSeo } from '../components/PageSeo';

export const ContactPage: React.FC = () => {
  return (
    <div className="relative pt-16 pb-12 w-full min-h-screen-mobile text-white">
      <PageSeo />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
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
        <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-6 md:p-10 shadow-2xl">
          <ContactAndImpressum />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
