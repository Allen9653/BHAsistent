import React from 'react';
import { motion } from 'motion/react';
import { useLanguage, FlagIcon } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'compact' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage, languages, t } = useLanguage();

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

        {/* 4-Language Grid Toggle (BS / EN / DE / TR) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0A1628] rounded-xl border border-[#1A3152]">
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`relative flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs font-mono font-bold transition-all min-h-[44px] ${
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

  // Compact Variant (e.g. For smaller viewports or sub-bars)
  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center bg-[#0F2038] p-1 rounded-xl border border-[#00C9A7]/40 shadow-inner ${className}`}>
        {languages.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              title={item.name}
              aria-label={`Prebaci jezik na ${item.name}`}
              className={`relative flex items-center gap-1 px-2 py-1 min-h-[34px] rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
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
    );
  }

  // Standard Navbar Variant: Direct 4-language toggle (BS / EN / DE / TR) with active pill animation
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div
        id="navbar-language-switcher"
        className="flex items-center p-0.5 rounded-xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-inner"
        role="group"
        aria-label="Izbor jezika / Language selector"
      >
        {languages.map((langItem) => {
          const isCurrent = language === langItem.code;
          return (
            <button
              key={langItem.code}
              type="button"
              onClick={() => setLanguage(langItem.code)}
              title={`${langItem.name} (${langItem.shortName})`}
              aria-label={`Switch language to ${langItem.name}`}
              aria-pressed={isCurrent}
              className={`relative flex items-center gap-1 px-2 py-1.5 min-h-[34px] rounded-lg text-[11px] font-mono font-bold transition-all duration-200 z-10 ${
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
