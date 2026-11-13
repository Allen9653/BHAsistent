import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage, FlagIcon } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'compact' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, changeLanguage, languages, t } = useLanguage();
  const [compactOpen, setCompactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!compactOpen) return;
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [compactOpen]);

  const activeLangOption = languages.find((item) => item.code === language) || languages[0];

  if (variant === 'mobile') {
    return (
      <div className={`p-3 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-[#00C9A7]">
          <span className="flex items-center gap-1.5 font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>{t('nav.language', 'Jezik / Language')}</span>
          </span>
          <span className="text-[10px] text-[#C9A84C] font-mono font-semibold">
            {language.toUpperCase()} {t('nav.active', 'aktivan')}
          </span>
        </div>

        {/* 5-Language Responsive Grid Toggle (BS / EN / DE / TR / NL) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1 bg-[#0A1628] rounded-xl border border-[#1A3152]">
          {languages.map((item, index) => {
            const isSelected = language === item.code;
            const isLastOdd = index === languages.length - 1 && languages.length % 2 === 1;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => changeLanguage(item.code)}
                className={`relative flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-mono font-bold transition-all min-h-[44px] touch-manipulation ${
                  isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/30'
                    : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:bg-[#1A3152]/60'
                }`}
              >
                <FlagIcon code={item.code} className="w-4 h-3 shrink-0" />
                <span>{item.shortName}</span>
                <span className="text-[10px] opacity-80 truncate">
                  {item.name.split('/')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact Variant: Dropdown on narrow mobile viewports (<640px) to prevent horizontal overflow, inline pills on sm+
  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className={`relative inline-flex items-center ${className}`}>
        {/* Mobile (<640px) Space-Safe Touch Dropdown */}
        <div className="sm:hidden relative">
          <button
            type="button"
            onClick={() => setCompactOpen((prev) => !prev)}
            aria-expanded={compactOpen}
            aria-haspopup="listbox"
            aria-label={`${t('nav.language', 'Jezik')}: ${activeLangOption.name}`}
            className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-[#0F2038] border border-[#00C9A7]/40 text-[#F5F0E8] text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-inner touch-manipulation active:scale-95 transition-transform"
          >
            <FlagIcon code={activeLangOption.code} className="w-4 h-3 shrink-0" />
            <span>{activeLangOption.shortName}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#00C9A7] transition-transform ${compactOpen ? 'rotate-180' : ''}`} />
          </button>

          {compactOpen && (
            <div
              role="listbox"
              aria-label={t('nav.language', 'Izbor jezika')}
              className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-2xl p-1.5 z-50 space-y-1"
            >
              {languages.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      changeLanguage(item.code);
                      setCompactOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-mono font-bold flex items-center justify-between gap-2 transition-colors touch-manipulation ${
                      isSelected
                        ? 'bg-[#00C9A7] text-[#0A1628]'
                        : 'text-[#F5F0E8]/85 hover:bg-[#1A3152]/70'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <FlagIcon code={item.code} className="w-4 h-3 shrink-0" />
                      <span className="truncate">{item.name.split('/')[0].trim()}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Tablet (640px-1023px) Inline Pills */}
        <div className="hidden sm:inline-flex items-center bg-[#0F2038] p-1 rounded-xl border border-[#00C9A7]/40 shadow-inner">
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => changeLanguage(item.code)}
                title={item.name}
                aria-label={t('nav.switchTo', 'Prebaci jezik na') + ' ' + item.name}
                className={`relative flex items-center gap-1 px-2 py-1 min-h-[36px] rounded-lg text-xs font-mono font-bold transition-all duration-200 touch-manipulation ${
                  isSelected
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-sm scale-105'
                    : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:bg-[#1A3152]/60'
                }`}
              >
                <FlagIcon code={item.code} className="w-3.5 h-2.5" />
                <span>{item.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Standard Navbar Variant: Direct 5-language toggle (BS / EN / DE / TR / NL) with active pill animation
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div
        id="navbar-language-switcher"
        className="flex items-center p-0.5 rounded-xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-inner"
        role="group"
        aria-label={t('nav.language', 'Izbor jezika / Language selector')}
      >
        {languages.map((langItem) => {
          const isCurrent = language === langItem.code;
          return (
            <button
              key={langItem.code}
              type="button"
              onClick={() => changeLanguage(langItem.code)}
              title={`${langItem.name} (${langItem.shortName})`}
              aria-label={t('nav.switchTo', 'Prebaci jezik na') + ' ' + langItem.name}
              aria-pressed={isCurrent}
              className={`relative flex items-center gap-1 px-1.5 xl:px-2 py-1.5 min-h-[34px] rounded-lg text-[11px] font-mono font-bold transition-all duration-200 z-10 touch-manipulation ${
                isCurrent
                  ? 'text-[#0A1628]'
                  : 'text-[#F5F0E8]/75 hover:text-[#F5F0E8] hover:bg-[#1A3152]/40'
              }`}
            >
              {isCurrent && (
                <motion.div
                  layoutId="activeLanguagePill"
                  className="absolute inset-0 bg-[#00C9A7] rounded-lg shadow-sm shadow-[#00C9A7]/40 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <FlagIcon code={langItem.code} className="w-3.5 h-2.5 shrink-0" />
              <span>{langItem.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
