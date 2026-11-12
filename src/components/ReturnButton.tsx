import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CornerUpLeft, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReturnButtonProps {
  variant?: 'navbar' | 'floating' | 'inline';
  className?: string;
  label?: string;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({
  variant = 'navbar',
  className = '',
  label
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [referrerHost, setReferrerHost] = useState<string | null>(null);
  const [hasHistory, setHasHistory] = useState<boolean>(false);

  useEffect(() => {
    // Check if referrer exists and is not the current host
    if (typeof document !== 'undefined' && document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        if (refUrl.origin !== window.location.origin) {
          setReferrerHost(refUrl.hostname.replace(/^www\./, ''));
        }
      } catch {
        // Invalid URL ignore
      }
    }

    if (typeof window !== 'undefined' && window.history.length > 1) {
      setHasHistory(true);
    }
  }, [location.pathname]);

  const handleReturn = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If external referrer exists and user wants to go back to source site
    if (document.referrer && referrerHost) {
      try {
        window.location.href = document.referrer;
        return;
      } catch {
        // Fallback
      }
    }

    // Standard browser back if history exists
    if (window.history.length > 1 && location.pathname !== '/') {
      navigate(-1);
    } else {
      // Return to homepage or top
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buttonText = label || (
    referrerHost 
      ? `${t('nav.returnTo', 'Vrati se na')} ${referrerHost}` 
      : t('nav.return', 'Nazad / Return')
  );

  if (variant === 'floating') {
    return (
      <aside aria-label="Navigacija nazad">
        <button
          onClick={handleReturn}
          id="btn-floating-return"
          title={referrerHost ? `Vrati se na izvornu stranicu: ${referrerHost}` : "Vrati se nazad na prethodnu stranicu (Return)"}
          aria-label={referrerHost ? `Vrati se na ${referrerHost}` : "Vrati se nazad"}
          className={`fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-2xl bg-[#0F2038]/95 hover:bg-[#00C9A7] border border-[#00C9A7]/50 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs tracking-wider shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 group ${className}`}
        >
          <div className="w-5 h-5 rounded-lg bg-[#00C9A7]/20 group-hover:bg-[#0A1628]/20 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          </div>
          <span className="font-sans font-semibold text-[11px]">
            {buttonText}
          </span>
        </button>
      </aside>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleReturn}
        id="btn-inline-return"
        className={`px-4 py-2 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7] text-[#00C9A7] font-syne font-bold text-xs transition-all flex items-center gap-2 ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{buttonText}</span>
      </button>
    );
  }

  // Default: Navbar variant
  return (
    <button
      onClick={handleReturn}
      id="btn-navbar-return"
      title={referrerHost ? `Vrati se na ${referrerHost}` : "Vrati se na prethodnu stranicu (Return)"}
      aria-label="Vrati se nazad"
      className={`min-h-[40px] px-3 py-1.5 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7] border border-[#00C9A7]/40 hover:border-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm group ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
      <span className="hidden sm:inline font-mono text-[11px]">
        {referrerHost ? `← ${referrerHost}` : '← Return'}
      </span>
      <span className="sm:hidden font-mono text-[11px]">←</span>
    </button>
  );
};
