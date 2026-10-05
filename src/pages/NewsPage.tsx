import React from 'react';
import { NewsSection } from '../components/NewsSection';
import { PageSeo } from '../components/PageSeo';

interface NewsPageProps {
  onOpenAdmin: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenAdmin }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[70vh]">
      <PageSeo />
      <NewsSection onOpenAdmin={onOpenAdmin} />
    </div>
  );
};

export default NewsPage;
