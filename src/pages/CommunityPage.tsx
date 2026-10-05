import React from 'react';
import { SocialCommunitySection } from '../components/SocialCommunitySection';
import { PageSeo } from '../components/PageSeo';

export const CommunityPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh]">
      <PageSeo />
      <SocialCommunitySection />
    </div>
  );
};

export default CommunityPage;
