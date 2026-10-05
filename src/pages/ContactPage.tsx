import React from 'react';
import { ContactAndImpressum } from '../components/ContactAndImpressum';
import { PageSeo } from '../components/PageSeo';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 w-full">
      <PageSeo />
      <ContactAndImpressum />
    </div>
  );
};

export default ContactPage;
