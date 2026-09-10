import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ReturnButton } from './ReturnButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Download, Moon, Sun, Monitor, ChevronRight, Shield, FileText, Cookie, ChevronDown } from 'lucide-react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  // Close mobile menu and dropdowns on location change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: t('nav.pocetna', 'Početna') },
    { path: '/alati', label: t('nav.alati', 'BH Digitalni Alati') },
    { path: '/scena-magazin', label: t('nav.scena', 'Magazin SCENA+') },
    { path: '/o-nama', label: t('nav.onama', 'O Nama & Video') },
    { path: '/novosti', label: t('nav.novosti', 'Novosti & CMS') },
    { path: '/projekti', label: t('nav.projekti', 'Projekti & Partneri') },
    { path: '/shop', label: t('nav.shop', 'SHOP (Edukacija)') },
    { path: '/zajednica', label: t('nav.zajednica', 'Zajednica') },
    { path: '/kontakt', label: t('nav.kontakt', 'Kontakt') },
  ];

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('bh-open-cookie-settings'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Utility Bar (11-12px) - Semantic quick access */}
      <div className="bg-[#060D18] border-b border-[#1A3152]/80 text-[#F5F0E8]/70 text-[11px] font-mono py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#00C9A7] font-semibold hidden sm:inline">
              B&H ASSISTANT d.o.o. Zenica
            </span>
            <span className="hidden sm:inline text-[#1A3152]">|</span>
            <span className="text-[#F5F0E8]/60 text-[10.5px]">
              Službena IT platforma • Zenica, BiH
            </span>
          </div>
          
          <nav aria-label="Brzi pravni linkovi" className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/politika-privatnosti"
              className="hover:text-[#00C9A7] transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#00C9A7]" />
              <span>Privatnost</span>
            </Link>
            <span className="text-[#1A3152]">|</span>
            <Link
              to="/uslovi-koristenja"
              className="hover:text-[#C9A84C] transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-[#C9A84C]" />
              <span>Uslovi</span>
            </Link>
            <span className="text-[#1A3152]">|</span>
            <button
              onClick={openCookieSettings}
              className="hover:text-[#00C9A7] transition-colors flex items-center gap-1"
            >
              <Cookie className="w-3 h-3 text-[#00C9A7]" />
              <span>Kolačići</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Header Bar */}
      <div
        className={`transition-all duration-300 pt-[max(6px,env(safe-area-inset-top))] ${
          isScrolled
            ? 'bg-[var(--brand-navy,#0A1628)]/95 backdrop-blur-md border-b border-[var(--brand-border,#1A3152)] shadow-2xl pb-2'
            : 'bg-[var(--brand-navy,#0A1628)]/85 backdrop-blur-sm border-b border-[#1A3152]/40 pb-2.5'
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

            {/* Semantic Desktop Navigation Links (<nav> -> <ul> -> <li> -> NavLink) */}
            <nav
              role="navigation"
              aria-label="Glavna navigacija"
              className="hidden xl:flex items-center bg-[#0F2038]/80 p-1.5 rounded-2xl border border-[#1A3152]/60 backdrop-blur-sm"
            >
              <ul className="flex items-center gap-1 list-none m-0 p-0">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
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
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action CTAs: Theme Toggle + Language Flags Bar + Dropdown (Includes Bojanka) */}
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

              {/* Dedicated Language Switcher */}
              <LanguageSwitcher variant="navbar" />

              {/* Dropdown Menu for Extra Downloads & Resources (Moved from primary hero view) */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#C9A84C]/50 text-[#F5F0E8] text-xs font-semibold transition-all shrink-0"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Resursi</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#C9A84C] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F2038] border border-[#1A3152] shadow-2xl p-2 z-50 space-y-1 animate-fadeIn">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenBojanka();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1A3152] text-xs text-[#C9A84C] font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Besplatna Gummi Bojanka (PDF)</span>
                    </button>
                    <Link
                      to="/politika-privatnosti"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-[#1A3152] text-xs text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-colors"
                    >
                      Politika Privatnosti (GDPR)
                    </Link>
                    <Link
                      to="/uslovi-koristenja"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-3 py-2 rounded-xl hover:bg-[#1A3152] text-xs text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-colors"
                    >
                      Opći Uslovi Korištenja
                    </Link>
                  </div>
                )}
              </div>

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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                aria-label="Izbornik Navigacije"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#00C9A7]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1628]/98 border-b border-[#1A3152] px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl shadow-2xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          
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

          <nav
            role="navigation"
            aria-label="Mobilna navigacija"
          >
            <ul className="space-y-1 list-none p-0 m-0">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
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
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal and Download items in Mobile Menu */}
          <div className="pt-3 mt-2 border-t border-[#1A3152] space-y-2">
            <button
              onClick={() => {
                onOpenBojanka();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F2038] border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-xs shadow-lg min-h-[44px] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Besplatna Bojanka GUMMI (PDF)</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
              <Link
                to="/politika-privatnosti"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#00C9A7]"
              >
                Privatnost
              </Link>
              <Link
                to="/uslovi-koristenja"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#C9A84C]"
              >
                Uslovi
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
