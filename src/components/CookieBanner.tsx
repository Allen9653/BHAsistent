import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cookie, Check, X, Sliders, ChevronDown, ChevronUp, Lock, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  consented: boolean;
}

const STORAGE_KEY = 'bh_assistant_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: '',
    consented: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Small delay for smooth entry experience
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch (e) {
        setIsVisible(true);
      }
    }

    // Global listener to reopen cookie banner from footer/links
    const handleReopen = () => {
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('bh-open-cookie-settings', handleReopen);
    return () => {
      window.removeEventListener('bh-open-cookie-settings', handleReopen);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated = {
      ...prefs,
      essential: true,
      timestamp: new Date().toISOString(),
      consented: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPreferences(updated);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      consented: true,
    });
  };

  const handleAcceptEssentialOnly = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      consented: true,
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-live="polite"
        aria-label="Postavke privatnosti i kolačića"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center"
      >
        <div className="w-full max-w-4xl bg-[#0F2038]/95 backdrop-blur-xl border-2 border-[#00C9A7]/40 rounded-3xl shadow-2xl p-6 sm:p-8 pointer-events-auto text-[#F5F0E8] space-y-5 relative overflow-hidden ring-1 ring-[#00C9A7]/20">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Main Top Content */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/50 flex items-center justify-center text-[#00C9A7] shrink-0 shadow-lg">
                <Cookie className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] uppercase tracking-wider">
                    GDPR & PRIVATNOST
                  </span>
                  <span className="text-[11px] font-mono text-[#C9A84C]">
                    bh-assistant.ba
                  </span>
                </div>
                <h3 className="font-syne font-extrabold text-lg sm:text-xl text-[#F5F0E8]">
                  Poštujemo Vašu Privatnost i Podatke
                </h3>
                <p className="text-xs text-[#F5F0E8]/75 font-sans leading-relaxed max-w-2xl">
                  B&H Assistant d.o.o. Zenica koristi neophodne tehničke kolačiće za ispravan rad platforme, te opcionalne analitičke i partnerske (affiliate) kolačiće radi poboljšanja korisničkog iskustva i pružanja ekskluzivnih partnerskih pogodnosti.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons on Desktop */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none min-h-[44px] px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#00C9A7]/20 hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>Prihvati Sve</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="flex-1 md:flex-none min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 text-[#F5F0E8] font-syne font-bold text-xs transition-all flex items-center justify-center"
              >
                <span>Samo Neophodni</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCustomize(!showCustomize)}
                aria-expanded={showCustomize}
                className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#C9A84C] hover:text-[#FFD700] font-syne font-bold text-xs transition-all flex items-center justify-center gap-1"
                title="Prilagodi postavke kolačića"
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Prilagodi</span>
                {showCustomize ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Granular Customization Drawer */}
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-[#1A3152] space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                
                {/* 1. Essential */}
                <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#00C9A7]" />
                      <span className="font-syne font-bold text-sm text-[#F5F0E8]">Neophodni Kolačići</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00C9A7]/20 text-[#00C9A7] font-bold">
                      Uvijek Aktivni
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F5F0E8]/70 leading-relaxed">
                    Potrebni za rad navigacije, jezičkih postavki (BS/EN), sigurnosti i osnovnih funkcionalnosti portala.
                  </p>
                </div>

                {/* 2. Analytics */}
                <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                      <span className="font-syne font-bold text-sm text-[#F5F0E8]">Analitika & Rad</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#1A3152] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00C9A7]"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#F5F0E8]/70 leading-relaxed">
                    Pomažu nam da razumijemo kako posjetioci koriste web platformu radi optimizacije brzine i sadržaja.
                  </p>
                </div>

                {/* 3. Marketing & Affiliate */}
                <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00C9A7]" />
                      <span className="font-syne font-bold text-sm text-[#F5F0E8]">Partneri & Affiliate</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#1A3152] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-[#F5F0E8]/70 leading-relaxed">
                    Omogućavaju ispravno evidentiranje promotivnih popusta i kupona kod partnera (Mitgo, Admitad, monday.com).
                  </p>
                </div>

              </div>

              {/* Save custom selections */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-[#F5F0E8]/50 font-mono">
                  Službeni kontakt: <span className="text-[#00C9A7]">info@bh-assistant.ba</span>
                </p>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="min-h-[40px] px-6 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-all shadow-md"
                >
                  Spremi Moje Postavke
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
