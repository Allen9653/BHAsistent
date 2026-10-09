import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Wrench,
  FolderGit2,
  Newspaper,
  GraduationCap,
  Building2,
  CornerDownLeft,
} from 'lucide-react';
import {
  getAllSearchItems,
  filterSearchCatalog,
  SearchCategory,
  SearchItem,
} from '../data/searchIndex';

interface HeaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBojanka?: () => void;
}

const CATEGORY_TABS: { id: SearchCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Sve', icon: Sparkles },
  { id: 'tools', label: 'Alati', icon: Wrench },
  { id: 'projects', label: 'Projekti', icon: FolderGit2 },
  { id: 'articles', label: 'Članci & Magazin', icon: Newspaper },
  { id: 'education', label: 'Edukacija', icon: GraduationCap },
  { id: 'company', label: 'Kompanija', icon: Building2 },
];

const SUGGESTED_QUERIES = [
  'BH Konverter',
  'BH PapirFinder',
  'Ornamenti Bosne',
  'SCENA+ Magazin',
  'Gummi Bojanka',
  'ZENTAXI',
  'Digitalni Alati',
  'O nama',
];

export const HeaderSearchModal: React.FC<HeaderSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenBojanka,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load all searchable items from the catalog
  const catalog = useMemo(() => getAllSearchItems(), []);

  // Filter items in real-time
  const filteredResults = useMemo(() => {
    return filterSearchCatalog(catalog, query, activeCategory);
  }, [catalog, query, activeCategory]);

  // Focus input automatically on open and reset state
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Keyboard navigation inside search results
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0
        );
      } else if (e.key === 'Enter') {
        if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
          e.preventDefault();
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-search-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.id === 'feature-bojanka' && onOpenBojanka) {
      onOpenBojanka();
      return;
    }
    navigate(item.route);
  };

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case 'tools':
        return <Wrench className="w-4 h-4 text-[#00C9A7]" />;
      case 'projects':
        return <FolderGit2 className="w-4 h-4 text-[#C9A84C]" />;
      case 'articles':
        return <Newspaper className="w-4 h-4 text-[#00E5BE]" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#00C9A7]" />;
      case 'company':
        return <Building2 className="w-4 h-4 text-[#C9A84C]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00C9A7]" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-16 bg-[#060D18]/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Brza pretraga platforme B&H Assistant"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[var(--brand-card,#0F2038)] border border-[var(--brand-border,#1A3152)] shadow-2xl overflow-hidden text-[#F5F0E8] flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Search Input Bar */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-[#1A3152] bg-[#0A1628]/90">
            <Search className="w-5 h-5 text-[#00C9A7] shrink-0 mr-3" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pretraži alate, projekte, magazine ili članke..."
              className="w-full bg-transparent text-[#F5F0E8] placeholder-[#F5F0E8]/40 text-sm sm:text-base font-sans outline-none focus:outline-none"
              aria-label="Polje za pretragu"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Očisti unos"
                className="p-1 rounded-lg text-[#F5F0E8]/50 hover:text-[#F5F0E8] transition-colors mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#0F2038] border border-[#1A3152] rounded text-[#F5F0E8]/60 shrink-0">
              ESC
            </kbd>
          </div>

          {/* 2. Interactive Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-2 px-3 border-b border-[#1A3152]/80 bg-[#060D18]/60 overflow-x-auto no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-syne font-semibold transition-all shrink-0 min-h-[36px] ${
                    isActive
                      ? 'bg-[#00C9A7] text-[#0A1628] shadow-md font-bold'
                      : 'text-[#F5F0E8]/70 hover:text-[#00C9A7] hover:bg-[#1A3152]/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0A1628]' : 'text-[#00C9A7]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Search Results & Suggestions Body */}
          <div ref={listRef} className="overflow-y-auto p-3 space-y-2 flex-1 max-h-[55vh]">
            {/* When user has typed and results exist */}
            {filteredResults.length > 0 ? (
              <div className="space-y-1.5">
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50">
                  <span>Rezultati pretrage</span>
                  <span>{filteredResults.length} pronađeno</span>
                </div>

                {filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      data-search-index={index}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 border ${
                        isSelected
                          ? 'bg-[#1A3152]/80 border-[#00C9A7]/50 shadow-lg shadow-[#00C9A7]/5'
                          : 'bg-[#0A1628]/60 border-transparent hover:bg-[#1A3152]/40 hover:border-[#1A3152]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#060D18] border border-[#1A3152] flex items-center justify-center shrink-0 mt-0.5">
                        {getCategoryIcon(item.category)}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        {/* Unboxed Metadata (Zero-pill discipline) */}
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00C9A7]">
                          <span>{item.categoryLabel}</span>
                          {item.badge && (
                            <>
                              <span className="text-[#1A3152]" aria-hidden="true">·</span>
                              <span className="text-[#C9A84C] truncate">{item.badge}</span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-syne font-bold text-sm text-[#F5F0E8] truncate">
                          {item.title}
                        </h4>

                        {/* Description snippet */}
                        <p className="text-xs text-[#F5F0E8]/70 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Direct Links / Action */}
                      <div className="flex items-center gap-2 self-center shrink-0 text-[#00C9A7]">
                        {item.externalUrl ? (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-[#060D18] hover:bg-[#00C9A7]/20 border border-[#1A3152] hover:border-[#00C9A7]/40 text-[#F5F0E8]/60 hover:text-[#00C9A7] transition-all min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Otvori direktan vanjski link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#00C9A7] text-[#0A1628]' : 'text-[#F5F0E8]/30'
                          }`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : query ? (
              /* No Results State */
              <div className="py-12 px-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-center mx-auto text-[#F5F0E8]/40">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-syne font-bold text-base text-[#F5F0E8]">
                  Nema pronađenih rezultata za &quot;{query}&quot;
                </h4>
                <p className="text-xs text-[#F5F0E8]/60 max-w-md mx-auto">
                  Pokušajte sa drugačijim ključnim riječima ili odaberite kategoriju &quot;Sve&quot;.
                </p>
              </div>
            ) : (
              /* Initial State (Suggestions & Popular Links) */
              <div className="space-y-4 py-2">
                <div>
                  <span className="text-[11px] font-mono text-[#F5F0E8]/50 uppercase tracking-wider block mb-2 px-1">
                    Preporučene pretrage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUERIES.map((suggested) => (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => setQuery(suggested)}
                        className="px-3 py-1.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/40 text-xs text-[#F5F0E8]/85 hover:text-[#00C9A7] transition-all min-h-[32px] flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3 text-[#00C9A7]" />
                        <span>{suggested}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#F5F0E8]/50 uppercase tracking-wider block mb-2 px-1">
                    Brzi pristup platformi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/alati');
                      }}
                      className="p-3 rounded-2xl bg-[#0A1628] hover:bg-[#1A3152]/70 border border-[#1A3152] hover:border-[#00C9A7]/40 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#00C9A7] block">Softver & Kalkulatori</span>
                        <span className="font-syne font-bold text-xs text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                          BH Digitalni Alati
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#F5F0E8]/40 group-hover:text-[#00C9A7] group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/scena-magazin');
                      }}
                      className="p-3 rounded-2xl bg-[#0A1628] hover:bg-[#1A3152]/70 border border-[#1A3152] hover:border-[#C9A84C]/40 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#C9A84C] block">Kultura & Magazin ZDK</span>
                        <span className="font-syne font-bold text-xs text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                          SCENA+ Magazin
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#F5F0E8]/40 group-hover:text-[#C9A84C] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Footer Help / Keyboard Hints */}
          <div className="px-4 py-2.5 border-t border-[#1A3152] bg-[#0A1628] flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#0F2038] border border-[#1A3152] rounded">↑↓</kbd> Navigacija
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#0F2038] border border-[#1A3152] rounded flex items-center gap-0.5">
                  <CornerDownLeft className="w-2.5 h-2.5" /> Enter
                </kbd> Otvori
              </span>
            </div>
            <span className="text-[#00C9A7]">B&H Assistant Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HeaderSearchModal;
