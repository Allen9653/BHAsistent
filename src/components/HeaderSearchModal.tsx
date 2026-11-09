import React from 'react';
import { SiteWideSearch, SiteWideSearchProps } from './SiteWideSearch';

export type HeaderSearchModalProps = Omit<SiteWideSearchProps, 'variant'>;

/**
 * HeaderSearchModal: Site-wide client-side search modal
 * Powered by SiteWideSearch to quickly find tools, articles, magazine topics,
 * projects, FAQs, and company info with keyboard navigation and instant filtering.
 */
export const HeaderSearchModal: React.FC<HeaderSearchModalProps> = (props) => {
  return <SiteWideSearch variant="modal" {...props} />;
};

export default HeaderSearchModal;
