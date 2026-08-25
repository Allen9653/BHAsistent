import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, FlagIcon } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'compact' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage, languages, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary BS and EN options for instant 1-click toggle
  const primaryLangs: Language[] = ['bs', 'en'];

  if (variant === 'mobile') {
    return (
      <div className={`p-3 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-[#00C9A7]">
          <span className="flex items-center gap-1.5 font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>{t('nav.language', 'Jezik / Language')}</span>
          </span>
          <span className="text-[10px] text-[#C9A84C] font-mono font-semibold">
            {language.toUpperCase()} aktivan
          </span>
        </div>

        {/* BS / EN Quick Toggle Segment */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0A1628] rounded-xl border border-[#1A3152]">
          {primaryLangs.map((langCode) => {
            const isSelected = language === langCode;
            const item = languages.find((l) => l.code === langCode);
            return (
              <button
                key={langCode}
                type="button"
                onClick={() => setLanguage(langCode)}
                className={`relative flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/30'
                    : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:bg-[#1A3152]/60'
                }`}
              >
                <FlagIcon code={langCode} className="w-4 h-3 shrink-0" />
                <span>{item?.shortName || langCode.toUpperCase()}</span>
                <span className="text-[10px] opacity-80">
                  ({langCode === 'bs' ? 'Bosanski' : 'English'})
                </span>
              </button>
            );
          })}
        </div>

        {/* Additional Languages Row (DE, TR) */}
        <div className="pt-1 flex items-center justify-between gap-1.5 text-[11px] text-[#F5F0E8]/60 font-mono">
          <span className="text-[10px] uppercase">Ostali jezici:</span>
          <div className="flex items-center gap-1">
            {languages
              .filter((l) => !primaryLangs.includes(l.code))
              .map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-colors min-h-[36px] ${
                    language === l.code
                      ? 'bg-[#00C9A7] text-[#0A1628] font-bold'
                      : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-[#1A3152]'
                  }`}
                >
                  <FlagIcon code={l.code} className="w-3 h-2.5" />
                  <span>{l.shortName}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact Variant (e.g. For smaller viewports or sub-bars)
  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center bg-[#0F2038] p-1 rounded-xl border border-[#00C9A7]/40 shadow-inner ${className}`}>
        {primaryLangs.map((langCode) => {
          const isSelected = language === langCode;
          const langObj = languages.find((l) => l.code === langCode);
          return (
            <button
              key={langCode}
              type="button"
              onClick={() => setLanguage(langCode)}
              title={langObj?.name}
              aria-label={`Prebaci jezik na ${langObj?.name}`}
              className={`relative flex items-center gap-1 px-2.5 py-1 min-h-[34px] rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                isSelected
                  ? 'bg-[#00C9A7] text-[#0A1628] shadow-sm scale-105'
                  : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:bg-[#1A3152]/60'
              }`}
            >
              <FlagIcon code={langCode} className="w-3.5 h-2.5" />
              <span>{langCode.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Standard Navbar Variant: Smooth Segmented BS/EN Switcher + Dropdown Menu for DE/TR
  return (
    <div ref={dropdownRef} className={`relative inline-flex items-center ${className}`}>
      <div
        id="navbar-language-switcher"
        className="flex items-center p-0.5 rounded-xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-inner"
        role="group"
        aria-label="Izbor jezika / Language selector"
      >
        {/* BS Button */}
        <button
          type="button"
          onClick={() => setLanguage('bs')}
          title="Bosanski / BHS jezik"
          aria-label="Prebaci na Bosanski jezik"
          aria-pressed={language === 'bs'}
          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 min-h-[34px] rounded-lg text-[11px] font-mono font-bold transition-all duration-200 z-10 ${
            language === 'bs'
              ? 'text-[#0A1628]'
              : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8] hover:bg-[#1A3152]/40'
          }`}
        >
          {language === 'bs' && (
            <motion.div
              layoutId="activeLanguagePill"
              className="absolute inset-0 bg-[#00C9A7] rounded-lg shadow-sm shadow-[#00C9A7]/40 -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            />
          )}
          <FlagIcon code="bs" className="w-3.5 h-2.5 shrink-0" />
          <span>BS</span>
        </button>

        {/* EN Button */}
        <button
          type="button"
          onClick={() => setLanguage('en')}
          title="English language"
          aria-label="Switch to English language"
          aria-pressed={language === 'en'}
          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 min-h-[34px] rounded-lg text-[11px] font-mono font-bold transition-all duration-200 z-10 ${
            language === 'en'
              ? 'text-[#0A1628]'
              : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8] hover:bg-[#1A3152]/40'
          }`}
        >
          {language === 'en' && (
            <motion.div
              layoutId="activeLanguagePill"
              className="absolute inset-0 bg-[#00C9A7] rounded-lg shadow-sm shadow-[#00C9A7]/40 -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            />
          )}
          <FlagIcon code="en" className="w-3.5 h-2.5 shrink-0" />
          <span>EN</span>
        </button>

        {/* Dropdown Toggle for all languages (DE, TR, etc.) */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Ostali jezici / More languages"
          aria-label="Otvori listu svih jezika"
          aria-expanded={dropdownOpen}
          className={`px-1.5 py-1.5 min-h-[34px] rounded-lg text-[#F5F0E8]/60 hover:text-[#00C9A7] hover:bg-[#1A3152]/40 transition-colors flex items-center justify-center ${
            language !== 'bs' && language !== 'en' ? 'text-[#00C9A7] font-bold' : ''
          }`}
        >
          {language !== 'bs' && language !== 'en' ? (
            <span className="text-[10px] font-mono uppercase mr-0.5">{language}</span>
          ) : null}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180 text-[#00C9A7]' : ''
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu for All Supported Languages */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-[#0A1628] border border-[#1A3152] shadow-2xl p-1.5 z-50 backdrop-blur-xl"
          >
            <div className="px-2 py-1 border-b border-[#1A3152]/80 mb-1">
              <span className="text-[10px] font-mono uppercase text-[#00C9A7] font-bold tracking-wider">
                Odabir Jezika / Languages
              </span>
            </div>

            <div className="space-y-0.5">
              {languages.map((langItem) => {
                const isActive = language === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    type="button"
                    onClick={() => {
                      setLanguage(langItem.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors text-left ${
                      isActive
                        ? 'bg-[#00C9A7]/15 text-[#00C9A7] font-bold border border-[#00C9A7]/30'
                        : 'text-[#F5F0E8]/80 hover:bg-[#1A3152] hover:text-[#F5F0E8]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FlagIcon code={langItem.code} className="w-4 h-3 shrink-0" />
                      <span>{langItem.name}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#00C9A7]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
