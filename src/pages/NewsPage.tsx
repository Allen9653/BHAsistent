import React from 'react';
import { NewsSection } from '../components/NewsSection';

interface NewsPageProps {
  onOpenAdmin: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onOpenAdmin }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[70vh]">
      <NewsSection onOpenAdmin={onOpenAdmin} />
    </div>
  );
};

export default NewsPage;
