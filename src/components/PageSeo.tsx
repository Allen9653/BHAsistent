import React from 'react';
import { useMetaTags, RouteMetaConfig } from '../hooks/useMetaTags';

interface PageSeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

/**
 * PageSeo: Ensures page-level title and meta description are set
 * immediately and uniquely for the rendered page.
 */
export const PageSeo: React.FC<PageSeoProps> = ({ title, description, keywords, canonical }) => {
  const override: Partial<RouteMetaConfig> | undefined = (title || description || keywords || canonical)
    ? {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(keywords ? { keywords } : {}),
        ...(canonical ? { canonical } : {}),
      }
    : undefined;

  useMetaTags(override);
  return null;
};

export default PageSeo;
