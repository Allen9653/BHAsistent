import React from 'react';
import { SEOHead, SEOHeadProps } from './SEOHead';

export type PageSeoProps = SEOHeadProps;

/**
 * PageSeo: Ensures page-level title and meta description are set
 * immediately and uniquely for the rendered page.
 * Powered by SEOHead for deep canonical and Open Graph dynamic management.
 */
export const PageSeo: React.FC<PageSeoProps> = (props) => {
  return <SEOHead {...props} />;
};

export default PageSeo;
