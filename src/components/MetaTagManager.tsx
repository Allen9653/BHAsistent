import React from 'react';
import { useMetaTags, RouteMetaConfig } from '../hooks/useMetaTags';

interface MetaTagManagerProps {
  overrideConfig?: Partial<RouteMetaConfig>;
}

/**
 * Dynamic Meta-Tag Generator Component
 * Automatically updates document title, description, keywords, canonical URLs,
 * Open Graph, Twitter Cards, and JSON-LD schema based on the current active route.
 */
export const MetaTagManager: React.FC<MetaTagManagerProps> = ({ overrideConfig }) => {
  useMetaTags(overrideConfig);
  return null;
};

export default MetaTagManager;
