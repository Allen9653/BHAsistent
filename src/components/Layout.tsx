import React, { useState, lazy, Suspense, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { ReturnButton } from './ReturnButton';
import { ScrollToTop } from './ScrollToTop';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { PullToRefreshIndicator } from './PullToRefreshIndicator';
import { MetaTagManager } from './MetaTagManager';
import { CookieBanner } from './CookieBanner';
import { COMPANY_INFO } from '../data/companyData';
import { CompanyDetails } from '../types';

// Code-split dynamic modals
const BojankaModal = lazy(() =>
  import('./BojankaModal').then((m) => ({ default: m.BojankaModal }))
);
const AdminPortalModal = lazy(() =>
  import('./AdminPortalModal').then((m) => ({ default: m.AdminPortalModal }))
);

const pageTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
};

/**
 * Injects dynamic 'aria-label', 'role', and 'aria-current' attributes to all
 * navigation links and landmark containers based on the current active page.
 */
function injectNavigationAccessibility(currentPath: string) {
  try {
    // 1. Ensure all navigation landmark containers have role="navigation" and descriptive aria-labels
    const navContainers = document.querySelectorAll('nav, [data-nav-container]');
    navContainers.forEach((nav, idx) => {
      if (nav.getAttribute('role') !== 'navigation') {
        nav.setAttribute('role', 'navigation');
      }
      if (!nav.getAttribute('aria-label')) {
        const isHeader = nav.closest('header') !== null;
        const isFooter = nav.closest('footer') !== null;
        const defaultLabel = isHeader
          ? 'Glavna navigacija (Main Navigation)'
          : isFooter
          ? 'Podnožna navigacija (Footer Navigation)'
          : `Navigacija stranice ${idx + 1}`;
        nav.setAttribute('aria-label', defaultLabel);
      }
    });

    // 2. Query all navigation links in nav, header, and footer landmark elements
    const links = document.querySelectorAll<HTMLAnchorElement>(
      'nav a, [role="navigation"] a, header a[href], footer a[href]'
    );

    links.forEach((link) => {
      // Set role="link" if not specified
      if (!link.getAttribute('role')) {
        link.setAttribute('role', 'link');
      }

      const href = link.getAttribute('href');
      if (!href) return;

      // Normalize target path
      let targetPath = href;
      try {
        if (href.startsWith('http://') || href.startsWith('https://')) {
          const url = new URL(href);
          if (url.origin !== window.location.origin) {
            // External link handling
            const baseText = (link.textContent || '').trim().replace(/\s+/g, ' ');
            const extLabel = `${baseText || 'Vanjski resurs'} (Otvori vanjski link / External link)`;
            if (link.getAttribute('aria-label') !== extLabel) {
              link.setAttribute('aria-label', extLabel);
            }
            return;
          }
          targetPath = url.pathname;
        } else {
          targetPath = href.split('?')[0].split('#')[0] || '/';
        }
      } catch {
        targetPath = href;
      }

      // Check if this link corresponds to the current active page
      const isExactMatch = targetPath === currentPath;
      const isRoot = targetPath === '/';
      const isSubPathMatch = !isRoot && currentPath.startsWith(targetPath);
      const hasActiveClass = link.classList.contains('active');
      const isActive = isExactMatch || isSubPathMatch || hasActiveClass;

      const baseText = (link.textContent || '').trim().replace(/\s+/g, ' ');
      const rawTitle = link.getAttribute('title') || '';
      const readableName = baseText || rawTitle || targetPath;

      const targetAriaLabel = isActive
        ? `${readableName} – Trenutno aktivna stranica (Current active page)`
        : `Navigiraj na stranicu: ${readableName} (Navigate to ${readableName})`;

      // Only update if changed to avoid unnecessary DOM thrashing
      if (link.getAttribute('aria-label') !== targetAriaLabel) {
        link.setAttribute('aria-label', targetAriaLabel);
      }

      if (isActive) {
        if (link.getAttribute('aria-current') !== 'page') {
          link.setAttribute('aria-current', 'page');
        }
      } else {
        if (link.hasAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      }
    });
  } catch (err) {
    console.debug('A11y navigation injection error:', err);
  }
}

interface LayoutProps {
  isBojankaOpen: boolean;
  setIsBojankaOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  isBojankaOpen,
  setIsBojankaOpen,
  isAdminOpen,
  setIsAdminOpen,
}) => {
  const location = useLocation();
  const [companyInfo, setCompanyInfo] = useState<CompanyDetails>(COMPANY_INFO);
  const [refreshKey, setRefreshKey] = useState(0);

  // Automatically inject dynamic 'aria-labels' and 'role' attributes to all navigation links
  // based on the current active page for full screen reader compatibility
  useEffect(() => {
    // Inject immediately on path change
    injectNavigationAccessibility(location.pathname);

    // Re-run after brief delays for route transitions and code-split mounts
    const timer1 = setTimeout(() => injectNavigationAccessibility(location.pathname), 100);
    const timer2 = setTimeout(() => injectNavigationAccessibility(location.pathname), 350);

    // Debounced dynamic DOM observer to eliminate INP overhead
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        injectNavigationAccessibility(location.pathname);
      }, 150);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'href'],
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handlePullRefresh = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRefreshKey((prev) => prev + 1);
  }, []);

  const { pullDistance, isRefreshing, progress } = usePullToRefresh({
    onRefresh: handlePullRefresh,
    pullThreshold: 75,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-navy,#0A1628)] text-[var(--brand-text,#F5F0E8)] font-sans overflow-x-hidden selection:bg-[var(--brand-teal,#00C9A7)] selection:text-[#0A1628]">
      
      {/* Dynamic SEO Meta Tags Generator */}
      <MetaTagManager />

      {/* Automatically reset window scroll on every route transition */}
      <ScrollToTop />

      {/* Mobile Native-like Pull to Refresh Indicator */}
      <PullToRefreshIndicator
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        progress={progress}
      />

      {/* Shared Header / Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBojanka={() => setIsBojankaOpen(true)}
      />

      {/* Dynamic Route Content via Outlet */}
      <main className="flex-1 w-full pt-safe-top">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location.pathname}-${refreshKey}`}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer across all pages */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Code-Split Lazy Loaded Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {isBojankaOpen && (
          <BojankaModal
            isOpen={isBojankaOpen}
            onClose={() => setIsBojankaOpen(false)}
          />
        )}

        {isAdminOpen && (
          <AdminPortalModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            companyInfo={companyInfo}
            onUpdateCompanyInfo={(updated) => setCompanyInfo(updated)}
          />
        )}
      </Suspense>

      {/* Floating Return Button (returns to previous site or page) */}
      <ReturnButton variant="floating" />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* GDPR Cookie Consent Banner */}
      <CookieBanner />

    </div>
  );
};

export default Layout;
