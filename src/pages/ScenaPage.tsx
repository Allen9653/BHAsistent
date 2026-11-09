import React from 'react';
import { ScenaMagazineSection } from '../components/ScenaMagazineSection';
import { PageSeo } from '../components/PageSeo';

export const ScenaPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh]">
      <PageSeo />
      <ScenaMagazineSection />
    </div>
  );
};

export default ScenaPage;
