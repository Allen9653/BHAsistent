import React from 'react';
import { NewsSection } from '../components/NewsSection';
import { NewsFeed } from '../components/NewsFeed';
import { PageSeo } from '../components/PageSeo';

interface NewsPageProps {
  onOpenAdmin: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenAdmin }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[70vh]">
      <PageSeo />
      <NewsSection onOpenAdmin={onOpenAdmin} />
      {/* Sekcija 2: Kurirani NewsFeed (IT Trendovi, Postignuća, Zajednica, Sigurnost) — premješteno sa homepagea */}
      <NewsFeed />
    </div>
  );
};

export default NewsPage;
