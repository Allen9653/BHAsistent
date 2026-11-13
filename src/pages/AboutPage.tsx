import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { PageSeo } from '../components/PageSeo';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative pt-16 pb-12 w-full min-h-screen-mobile text-white">
      <PageSeo />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium tracking-wide uppercase">
            B&H Assistant d.o.o. Zenica
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
            Inovacije, Tehnologija i Kulturna Baština
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Nova IT i Digital Marketing firma sa adresom u Zenici koja spaja savremena digitalna rješenja, digitalni marketing, besplatne alate za građane, urbani magazin SCENA+ i očuvanje kulturne baštine stećaka.
          </p>
        </div>

        {/* Postojeća AboutSection komponenta u stilizovanoj staklenoj pozadini */}
        <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-6 md:p-10 shadow-2xl">
          <AboutSection />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
