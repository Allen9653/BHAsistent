import React from 'react';
import { ShopAffiliateSection } from '../components/ShopAffiliateSection';
import { KasperskyPromoSection } from '../components/KasperskyPromoSection';
import { PageSeo } from '../components/PageSeo';

export const ShopPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full min-h-[70vh] space-y-12">
      <PageSeo />
      <ShopAffiliateSection />
      <KasperskyPromoSection />
    </div>
  );
};

export default ShopPage;
