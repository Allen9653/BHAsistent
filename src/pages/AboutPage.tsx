import React from 'react';
import { VideoBackground } from '../components/VideoBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AboutSection } from '../components/AboutSection';
import { PageSeo } from '../components/PageSeo';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col">
      {/* 1. Pozadinski YouTube video sa blagim tamnim slojem (overlay) */}
      <VideoBackground overlayOpacity={0.75} />

      {/* 2. SEO komotnost */}
      <PageSeo />

      {/* 3. Navigacija */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 4. Centralni sadržaj stranice O Nama */}
      <main className="relative z-10 flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium tracking-wide uppercase">
            B&H Assistant d.o.o. Zenica
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
            Inovacije, Tehnologija i Kulturna Baština
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Prva softverska i izdavačka kuća u Zenici koja spaja savremena digitalna rješenja, besplatne alate za građane, urbani magazin SCENA+ i očuvanje kulturne baštine stećaka.
          </p>
        </div>

        {/* Postojeća AboutSection komponenta u stilizovanoj pozadini */}
        <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 md:p-10 shadow-2xl">
          <AboutSection />
        </div>
      </main>

      {/* 5. Podnožje */}
      <div className="relative z-20 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
