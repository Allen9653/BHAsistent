import React from 'react';
import { SEOHead, SEOHeadProps } from './SEOHead';

export interface MetaTagManagerProps {
  overrideConfig?: SEOHeadProps;
}

/**
 * Dynamic Meta-Tag Generator Component
 * Powered by SEOHead to dynamically manage document title, description, keywords,
 * canonical URLs, Open Graph headers, Twitter Cards, and Schema.org JSON-LD
 * based on current active route, language, and route overrides.
 */
export const MetaTagManager: React.FC<MetaTagManagerProps> = ({ overrideConfig }) => {
  return <SEOHead {...overrideConfig} />;
};

export default MetaTagManager;
