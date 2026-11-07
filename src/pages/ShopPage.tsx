import React from 'react';
import { ShopAffiliateSection } from '../components/ShopAffiliateSection';
import { PageSeo } from '../components/PageSeo';

export const ShopPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh] space-y-12">
      <PageSeo />
      <ShopAffiliateSection />
    </div>
  );
};

export default ShopPage;
