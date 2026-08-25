import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Check if scrolled below fold (either hero passed or scrollY > 280)
      const heroEl = document.getElementById('pocetna');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setIsVisible(heroBottom <= 80 || scrollY > 280);
      } else {
        setIsVisible(scrollY > 280);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circle progress calculation (radius = 20, perimeter = 2 * PI * 20 ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 30 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="fixed bottom-[max(24px,env(safe-area-inset-bottom))] right-6 z-40"
        >
          <button
            id="scroll-to-top-button"
            type="button"
            onClick={scrollToTop}
            aria-label={t('common.backToTop', 'Nazad na vrh')}
            title={t('common.backToTop', 'Nazad na vrh')}
            className="group relative flex items-center justify-center w-12 h-12 min-h-[44px] min-w-[44px] rounded-2xl bg-[#0A1628]/95 hover:bg-[#00C9A7] border border-[#00C9A7]/40 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] shadow-2xl shadow-black/70 hover:shadow-[#00C9A7]/40 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
          >
            {/* SVG Radial Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
            >
              {/* Background Track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#1A3152]/60 fill-none"
                strokeWidth="2.5"
              />
              {/* Animated Progress Bar */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#00C9A7] group-hover:stroke-[#0A1628] fill-none transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Icon */}
            <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0" />

            {/* Desktop Tooltip */}
            <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl">
              {t('common.backToTop', 'Nazad na vrh')} ({Math.round(scrollProgress)}%)
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
