import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { PageSeo } from '../components/PageSeo';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh]">
      <PageSeo />
      <AboutSection />
    </div>
  );
};

export default AboutPage;
