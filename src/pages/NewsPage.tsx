import React from 'react';
import { NewsSection } from '../components/NewsSection';
import { NewsFeed } from '../components/NewsFeed';
import { PageSeo } from '../components/PageSeo';

interface NewsPageProps {
  onOpenAdmin: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenAdmin }) => {
  return (
    <div className="relative pt-16 pb-16 w-full min-h-screen-mobile text-white">
      <PageSeo />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium tracking-wide uppercase">
            Aktuelnosti i CMS
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
            Novosti, IT Trendovi i Objava Sadržaja
          </h1>
          <p className="text-lg text-slate-300">
            Pratite najnovije objave, tehnološke trendove, postignuća i dešavanja unutar ekosistema B&H Assistant d.o.o.
          </p>
        </div>

        {/* Glavne sekcije novosti i feed-a */}
        <div className="relative z-10 space-y-12">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-6 md:p-8 shadow-2xl">
            <NewsSection onOpenAdmin={onOpenAdmin} />
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-6 md:p-8 shadow-2xl">
            {/* Kurirani NewsFeed (IT Trendovi, Postignuća, Zajednica, Sigurnost) */}
            <NewsFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
