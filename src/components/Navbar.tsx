import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ReturnButton } from './ReturnButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Download, Moon, Sun, Monitor, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenBojanka: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenBojanka,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, languages } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: t('nav.pocetna', 'Početna') },
    { path: '/alati', label: t('nav.alati', 'BH Digitalni Alati') },
    { path: '/scena-magazin', label: t('nav.scena', 'Magazin SCENA+') },
    { path: '/o-nama', label: t('nav.onama', 'O Nama & Video') },
    { path: '/novosti', label: t('nav.novosti', 'Novosti & CMS') },
    { path: '/projekti', label: t('nav.projekti', 'Projekti & Bojanka') },
    { path: '/shop', label: t('nav.shop', 'SHOP (Edukacija)') },
    { path: '/zajednica', label: t('nav.zajednica', 'Zajednica') },
    { path: '/kontakt', label: t('nav.kontakt', 'Kontakt') },
  ];

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[max(8px,env(safe-area-inset-top))] ${
        isScrolled
          ? 'bg-[var(--brand-navy,#0A1628)]/95 backdrop-blur-md border-b border-[var(--brand-border,#1A3152)] shadow-2xl pb-2.5'
          : 'bg-[var(--brand-navy,#0A1628)]/85 backdrop-blur-sm border-b border-[#1A3152]/40 pb-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Company Title */}
          <div className="flex items-center gap-2">
            <ReturnButton variant="navbar" />
            
            <Link
              to="/"
              className="flex items-center gap-3 group text-left shrink-0 min-h-[44px]"
              title="Početna stranica B&H Assistant d.o.o."
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C9A7] via-[#0F2038] to-[#C9A84C] p-[1.5px] shadow-lg shadow-[#00C9A7]/20 group-hover:scale-105 transition-transform overflow-hidden">
                <SafeImage
                  src={IMAGES.logo}
                  alt="B&H Assistant Logotip"
                  fallbackTitle="B&H"
                  priority={true}
                  className="w-full h-full object-cover rounded-[9px]"
                />
              </div>
              <div>
                <span className="font-syne font-extrabold text-xl text-[#F5F0E8] tracking-tight block group-hover:text-[#00C9A7] transition-colors leading-tight">
                  B&H ASSISTANT
                </span>
                <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider block">
                  d.o.o. Zenica • IT Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0F2038]/80 p-1.5 rounded-2xl border border-[#1A3152]/60 backdrop-blur-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-xl text-xs font-semibold min-h-[38px] transition-all duration-200 flex items-center ${
                    isActive
                      ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/20 font-bold'
                      : 'text-[#F5F0E8]/80 hover:text-[#00C9A7] hover:bg-[#1A3152]/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs: Theme Toggle + Language Flags Bar + Free Bojanka Download */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Dark / Light / System Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                title={`Tema: ${theme || 'system'}`}
                className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#00C9A7] transition-colors flex items-center justify-center"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'light' ? <Sun className="w-4 h-4 text-[#C9A84C]" /> : <Monitor className="w-4 h-4" />}
              </button>
            )}

            {/* Dedicated Language Switcher (EN / BS Segmented Control & All Languages) */}
            <LanguageSwitcher variant="navbar" />

            <button
              onClick={onOpenBojanka}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-[#C9A84C]/15 hover:bg-[#C9A84C]/25 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold transition-all hover:scale-105 shrink-0"
              title="Preuzmi besplatnu Gummi bojanku (PDF)"
            >
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>{t('nav.freeBojanka', 'Free Bojanka')}</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="xl:hidden flex items-center gap-1.5">
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Promijeni temu"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#00C9A7]"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#C9A84C]" />}
              </button>
            )}

            {/* Mobile Compact Language Switcher */}
            <LanguageSwitcher variant="compact" />

            <button
              onClick={onOpenBojanka}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold hover:bg-[#C9A84C]/30 transition-colors"
              title="Preuzmi Bojanku GUMMI"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
              aria-label="Izbornik Navigacije"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00C9A7]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1628]/98 border-b border-[#1A3152] px-4 pt-4 pb-6 mt-3 space-y-3 backdrop-blur-2xl shadow-2xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          
          {/* Mobile Language Switcher */}
          <LanguageSwitcher variant="mobile" />

          <div className="px-2 pt-2 pb-1 border-b border-[#1A3152]/60 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#C9A84C] uppercase tracking-wider font-semibold">
              B&H Assistant • Stranice
            </span>
            <span className="text-[10px] font-mono text-[#00C9A7] bg-[#00C9A7]/10 px-2 py-0.5 rounded-full border border-[#00C9A7]/30">
              Navigacija
            </span>
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-sm font-syne font-semibold transition-all min-h-[44px] flex items-center justify-between ${
                  isActive
                    ? 'bg-[#00C9A7] text-[#0A1628] font-bold shadow-md shadow-[#00C9A7]/20'
                    : 'text-[#F5F0E8] hover:bg-[#0F2038] hover:text-[#00C9A7]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-[#0A1628]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#F5F0E8]/30" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-3 mt-2 border-t border-[#1A3152] space-y-2">
            <button
              onClick={() => {
                onOpenBojanka();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#D4B356] text-[#0A1628] font-syne font-bold text-xs shadow-lg min-h-[44px] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t('nav.freeBojanka', 'Free Bojanka')} (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
