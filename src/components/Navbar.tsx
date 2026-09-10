import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ReturnButton } from './ReturnButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Menu,
  X,
  Download,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  Shield,
  FileText,
  Cookie,
  ChevronDown,
  Users,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenBojanka: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin: _onOpenAdmin,
  onOpenBojanka,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language: _language, t } = useLanguage();
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

  // Close mobile menu and dropdown on location change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Handle click outside dropdown and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 1. Primary 5 Desktop Navigation Items
  const primaryNavItems = [
    { path: '/', label: t('nav.pocetna', 'Početna'), exact: true },
    { path: '/alati', label: t('nav.alati', 'Alati') },
    { path: '/scena-magazin', label: t('nav.scena', 'Magazin') },
    { path: '/o-nama', label: t('nav.onama', 'O nama') },
    { path: '/kontakt', label: t('nav.kontakt', 'Kontakt') },
  ];

  // 2. Secondary Items (Available in "Više" dropdown on Desktop & in Drawer on Mobile)
  const secondaryNavItems = [
    { path: '/novosti', label: t('nav.novosti', 'Novosti & Najave'), desc: 'IT vijesti, projekti i saopštenja' },
    { path: '/projekti', label: t('nav.projekti', 'Projekti & Partnerstva'), desc: 'ZENTAXI, GUMMI i inovacije' },
    { path: '/shop', label: t('nav.shop', 'SHOP & Edukacija'), desc: 'Alison besplatni certifikovani kursevi' },
    { path: '/politika-privatnosti', label: 'Politika Privatnosti (GDPR)', desc: 'Zaštita podataka i prava korisnika' },
    { path: '/uslovi-koristenja', label: 'Uslovi Korištenja', desc: 'Pravni okvir i uslovi poslovanja' },
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
      {/* 1. Thin Utility Bar (11-12px) - Semantics & Legal Links */}
      <div className="bg-[#060D18] border-b border-[#1A3152]/80 text-[#F5F0E8]/70 text-[11px] font-mono py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#00C9A7] font-semibold hidden sm:inline">
              B&H ASSISTANT d.o.o. Zenica
            </span>
            <span className="hidden sm:inline text-[#1A3152]">|</span>
            <span className="text-[#F5F0E8]/60 text-[10.5px]">
              Službena IT platforma • Zenica, BiH
            </span>
          </div>

          <nav aria-label="Pravni linkovi i postavke" className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/politika-privatnosti"
              className="hover:text-[#00C9A7] transition-colors flex items-center gap-1 min-h-[24px] focus-visible:ring-1 focus-visible:ring-[#00C9A7] rounded"
            >
              <Shield className="w-3 h-3 text-[#00C9A7]" />
              <span>Politika privatnosti</span>
            </Link>
            <span className="text-[#1A3152]" aria-hidden="true">·</span>
            <Link
              to="/uslovi-koristenja"
              className="hover:text-[#C9A84C] transition-colors flex items-center gap-1 min-h-[24px] focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded"
            >
              <FileText className="w-3 h-3 text-[#C9A84C]" />
              <span>Uslovi korištenja</span>
            </Link>
            <span className="text-[#1A3152]" aria-hidden="true">·</span>
            <button
              onClick={openCookieSettings}
              type="button"
              className="hover:text-[#00C9A7] transition-colors flex items-center gap-1 min-h-[24px] focus-visible:ring-1 focus-visible:ring-[#00C9A7] rounded"
              aria-label="Otvori postavke kolačića"
            >
              <Cookie className="w-3 h-3 text-[#00C9A7]" />
              <span>Kolačići</span>
            </button>
          </nav>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--brand-navy,#0A1628)]/95 backdrop-blur-md border-b border-[var(--brand-border,#1A3152)] shadow-2xl py-2'
            : 'bg-[var(--brand-navy,#0A1628)]/90 backdrop-blur-sm border-b border-[#1A3152]/50 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Brand Identity & Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {location.pathname !== '/' && (
                <div className="hidden sm:block">
                  <ReturnButton variant="navbar" />
                </div>
              )}

              <Link
                to="/"
                className="flex items-center gap-3 group text-left shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C9A7] rounded-xl p-0.5"
                title="B&H Assistant d.o.o. Zenica - Početna"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C9A7] via-[#0F2038] to-[#C9A84C] p-[1.5px] shadow-lg shadow-[#00C9A7]/20 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                  <SafeImage
                    src={IMAGES.logo}
                    alt="B&H Assistant Logotip"
                    fallbackTitle="B&H"
                    priority={true}
                    className="w-full h-full object-cover rounded-[9px]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-syne font-extrabold text-lg sm:text-xl text-[#F5F0E8] tracking-tight block group-hover:text-[#00C9A7] transition-colors leading-tight">
                    B&H ASSISTANT
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider block font-medium">
                    D.O.O. ZENICA · IT SOLUTIONS
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Primary Navigation (5 Primary Items + "Više" Dropdown) */}
            <nav
              role="navigation"
              aria-label="Glavna navigacija"
              className="hidden lg:flex items-center bg-[#0F2038]/80 p-1.5 rounded-2xl border border-[#1A3152]/70 backdrop-blur-sm shadow-inner"
            >
              <ul className="flex items-center gap-1 list-none m-0 p-0">
                {primaryNavItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) =>
                        `px-3.5 py-2 rounded-xl text-xs font-syne font-semibold min-h-[40px] transition-all duration-200 flex items-center justify-center ${
                          isActive
                            ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/25 font-bold scale-[1.02]'
                            : 'text-[#F5F0E8]/85 hover:text-[#00C9A7] hover:bg-[#1A3152]/60'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                {/* "Više" (More) Secondary Dropdown */}
                <li className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    aria-label="Prikaži dodatne rubrike i resurse"
                    className={`flex items-center gap-1 px-3 py-2 min-h-[40px] rounded-xl text-xs font-syne font-semibold transition-all duration-200 ${
                      isDropdownOpen
                        ? 'bg-[#1A3152] text-[#00C9A7] border border-[#00C9A7]/40'
                        : 'text-[#F5F0E8]/85 hover:text-[#00C9A7] hover:bg-[#1A3152]/60'
                    }`}
                  >
                    <span>Više</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#C9A84C] transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[#00C9A7]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Box */}
                  {isDropdownOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0A1628] border border-[#1A3152] shadow-2xl p-2 z-50 space-y-1 animate-fadeIn backdrop-blur-xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono text-[#00C9A7] uppercase tracking-wider font-semibold border-b border-[#1A3152]/60">
                        Dodatne rubrike
                      </div>
                      {secondaryNavItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#0F2038] text-xs text-[#F5F0E8] hover:text-[#00C9A7] transition-colors flex flex-col group"
                        >
                          <span className="font-syne font-semibold group-hover:translate-x-0.5 transition-transform">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-[#F5F0E8]/60 font-sans mt-0.5">
                            {item.desc}
                          </span>
                        </Link>
                      ))}

                      <div className="pt-1 mt-1 border-t border-[#1A3152]/60">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onOpenBojanka();
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#0F2038] text-xs text-[#C9A84C] font-syne font-semibold flex items-center gap-2 transition-colors group"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C9A84C] group-hover:scale-110 transition-transform" />
                          <span>Besplatna Gummi Bojanka (PDF)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>

            {/* Right: Theme Toggle + Language Switcher + SINGLE CTA ("Zajednica") */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Dark / Light / System Mode Toggle */}
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  title={`Tema: ${theme || 'system'}`}
                  aria-label="Promijeni temu (svijetla / tamna)"
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#00C9A7] transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#00C9A7]"
                >
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : theme === 'light' ? (
                    <Sun className="w-4 h-4 text-[#C9A84C]" />
                  ) : (
                    <Monitor className="w-4 h-4 text-[#00C9A7]" />
                  )}
                </button>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher variant="navbar" />

              {/* Clean Single CTA: Zajednica */}
              <Link
                to="/zajednica"
                id="nav-cta-zajednica"
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] hover:from-[#00DFB8] hover:to-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs tracking-wide shadow-lg shadow-[#00C9A7]/20 hover:shadow-[#00C9A7]/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 focus-visible:ring-2 focus-visible:ring-[#00C9A7]"
              >
                <Users className="w-4 h-4 text-[#0A1628]" />
                <span>{t('nav.zajednica', 'Zajednica')}</span>
              </Link>
            </div>

            {/* Mobile Header Controls (< 1024px) */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              {/* Compact Language Selector */}
              <LanguageSwitcher variant="compact" />

              {/* Theme toggle */}
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Promijeni temu"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#00C9A7]"
                >
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4 text-[#C9A84C]" />
                  )}
                </button>
              )}

              {/* Hamburger Button with semantic aria attributes */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#F5F0E8] hover:text-[#00C9A7] focus-visible:ring-2 focus-visible:ring-[#00C9A7] transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#00C9A7]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (< 1024px) */}
      {/* Kept in DOM using CSS transition to allow prerender crawlers and screen readers access */}
      <div
        id="mobile-navigation-drawer"
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0A1628]/98 border-b border-[#1A3152] backdrop-blur-2xl shadow-2xl ${
          mobileMenuOpen
            ? 'max-h-[85vh] opacity-100 visible py-4'
            : 'max-h-0 opacity-0 invisible py-0 pointer-events-none'
        }`}
      >
        <div className="px-4 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Mobile Language Selector */}
          <LanguageSwitcher variant="mobile" />

          {/* Primary 5 Navigation Links */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[11px] font-mono text-[#00C9A7] uppercase tracking-wider font-semibold">
              Glavna navigacija
            </div>
            <nav role="navigation" aria-label="Mobilna navigacija">
              <ul className="space-y-1.5 list-none p-0 m-0">
                {primaryNavItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
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
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0A1628]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#F5F0E8]/40" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Secondary Links */}
          <div className="space-y-1 pt-2 border-t border-[#1A3152]/70">
            <div className="px-2 pb-1 text-[11px] font-mono text-[#C9A84C] uppercase tracking-wider font-semibold">
              Dodatne rubrike
            </div>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {secondaryNavItems.map((item) => (
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
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0A1628]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#F5F0E8]/40" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Single Mobile CTA Button */}
          <div className="pt-2">
            <Link
              to="/zajednica"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-bold text-sm shadow-lg shadow-[#00C9A7]/25 active:scale-[0.99] transition-transform"
            >
              <Users className="w-4 h-4" />
              <span>Pridruži se Zajednici</span>
              <Sparkles className="w-3.5 h-3.5 text-[#0A1628]" />
            </Link>
          </div>

          {/* Download Free Bojanka PDF (Subtle secondary action) */}
          <button
            type="button"
            onClick={() => {
              onOpenBojanka();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0F2038] border border-[#C9A84C]/40 text-[#C9A84C] font-syne font-semibold text-xs min-h-[44px] hover:bg-[#1A3152] transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Besplatna Bojanka GUMMI (PDF)</span>
          </button>

          {/* Legal Links below CTA */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A3152] text-[11px] font-mono">
            <Link
              to="/politika-privatnosti"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 px-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#00C9A7] min-h-[44px] flex items-center justify-center hover:border-[#00C9A7]/40"
            >
              Privatnost
            </Link>
            <Link
              to="/uslovi-koristenja"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 px-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#C9A84C] min-h-[44px] flex items-center justify-center hover:border-[#C9A84C]/40"
            >
              Uslovi
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
