import React, { useState, lazy, Suspense, useCallback } from 'react';
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
