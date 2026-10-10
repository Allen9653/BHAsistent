import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  HelpCircle,
  Clock,
  Trash2,
  ChevronRight,
  Filter,
  CheckCircle2,
  Share2,
  Layers
} from 'lucide-react';
import {
  getAllSearchItems,
  filterSearchCatalog,
  normalizeSearchString,
  SearchCategory,
  SearchItem,
} from '../data/searchIndex';
import { SafeImage } from './SafeImage';

export interface SiteWideSearchProps {
  variant?: 'section' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
  onOpenBojanka?: () => void;
  initialQuery?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

const CATEGORY_TABS: {
  id: SearchCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  { id: 'all', label: 'Sve', icon: Sparkles, color: '#00C9A7' },
  { id: 'tools', label: 'Digitalni Alati', icon: Wrench, color: '#00C9A7' },
  { id: 'articles', label: 'Članci & Magazin', icon: Newspaper, color: '#00E5BE' },
  { id: 'projects', label: 'Projekti & Inovacije', icon: FolderGit2, color: '#C9A84C' },
  { id: 'faq', label: 'Česta Pitanja (FAQ)', icon: HelpCircle, color: '#00C9A7' },
  { id: 'education', label: 'Edukacija & Shop', icon: GraduationCap, color: '#C9A84C' },
  { id: 'company', label: 'O Kompaniji & Autori', icon: Building2, color: '#00C9A7' },
];

const POPULAR_SEARCHES = [
  'BH Konver',
  'BH PapirFinder',
  'Ornamenti Bosne',
  'SCENA+ Magazin',
  'Alen Jusufović',
  'Gummi Bojanka',
  'Pravne Izjave',
  'CompanyWall Bonitet',
  'Lovable Pobjednik',
  'ZENTAXI'
];

const RECENT_SEARCHES_KEY = 'bh_assistant_recent_searches_v1';

export const SiteWideSearch: React.FC<SiteWideSearchProps> = ({
  variant = 'section',
  isOpen = true,
  onClose,
  onOpenBojanka,
  initialQuery = '',
  className = '',
  title = 'Brza Pretraga Platforme',
  subtitle = 'Pronađite digitalne alate, autorske članke, inovativne projekte i odgovore na sva pitanja o B&H Assistant platformi.'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load searchable catalog
  const catalog = useMemo(() => getAllSearchItems(), []);

  // Filtered results
  const filteredResults = useMemo(() => {
    return filterSearchCatalog(catalog, query, activeCategory);
  }, [catalog, query, activeCategory]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const saveRecentSearch = useCallback((term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm || cleanTerm.length < 2) return;
    try {
      const updated = [cleanTerm, ...recentSearches.filter((s) => s.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  }, [recentSearches]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {}
  };

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    if (variant === 'modal' && !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (variant === 'modal' && onClose) {
          e.preventDefault();
          onClose();
        } else if (query) {
          e.preventDefault();
          setQuery('');
        }
      } else if (e.key === 'ArrowDown') {
        if (filteredResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
        }
      } else if (e.key === 'ArrowUp') {
        if (filteredResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
        }
      } else if (e.key === 'Enter') {
        if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
          e.preventDefault();
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, variant, onClose, query, filteredResults, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-search-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Focus input automatically when modal opens
  useEffect(() => {
    if (variant === 'modal' && isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [variant, isOpen]);

  const handleSelect = (item: SearchItem) => {
    if (query.trim()) {
      saveRecentSearch(query);
    }
    if (variant === 'modal' && onClose) {
      onClose();
    }
    if (item.id === 'feature-bojanka' && onOpenBojanka) {
      onOpenBojanka();
      return;
    }
    if (item.route.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = item.route.replace('/#', '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
        return <GraduationCap className="w-4 h-4 text-[#C9A84C]" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-[#00C9A7]" />;
      case 'company':
        return <Building2 className="w-4 h-4 text-[#00C9A7]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00C9A7]" />;
    }
  };

  // Highlight matching query words
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim() || !text) return text;
    const normText = normalizeSearchString(text);
    const normHighlight = normalizeSearchString(highlight);
    const idx = normText.indexOf(normHighlight);
    if (idx === -1) return text;

    const start = text.substring(0, idx);
    const match = text.substring(idx, idx + highlight.length);
    const end = text.substring(idx + highlight.length);

    return (
      <span>
        {start}
        <mark className="bg-[#00C9A7]/25 text-[#00C9A7] font-semibold px-0.5 rounded">
          {match}
        </mark>
        {end}
      </span>
    );
  };

  // ----------------------------------------------------
  // Inner Search Content Rendered in Both Variants
  // ----------------------------------------------------
  const renderSearchInterface = (isModal: boolean) => (
    <div className={`space-y-4 ${isModal ? 'p-4 sm:p-6' : 'p-6 sm:p-8'}`}>
      {/* 1. Header & Live Accessibility Counter */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#1A3152] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30 mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>INTERAKTIVNA PRETRAGA PLATFORME</span>
          </div>
          <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8]">
            {title}
          </h3>
          <p className="text-xs text-[#F5F0E8]/70 max-w-2xl font-sans mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Live Counter (Announced via aria-live) */}
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#F5F0E8]/80 shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
          <span>
            {query.trim()
              ? `${filteredResults.length} od ${catalog.length} rezultata`
              : `${catalog.length} stavki u bazi`}
          </span>
        </div>
      </div>

      {/* 2. Search Input Field */}
      <div className="relative" role="search">
        <div className="relative flex items-center bg-[#0A1628] border-2 border-[#1A3152] focus-within:border-[#00C9A7] rounded-2xl p-2 sm:p-2.5 transition-all shadow-inner group">
          <div className="p-2 text-[#00C9A7] shrink-0">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 group-focus-within:scale-110 transition-transform" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Unesite pojam: npr. BH Konver, PapirFinder, magazin, porezi, autor..."
            aria-label="Pretražite platformu po nazivu alata, članka ili projekta"
            aria-autocomplete="list"
            className="w-full bg-transparent text-[#F5F0E8] placeholder-[#F5F0E8]/40 text-sm sm:text-base font-sans outline-none px-2"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Očisti unos pretrage"
              className="p-2 rounded-xl text-[#F5F0E8]/50 hover:text-[#F5F0E8] hover:bg-[#1A3152] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[10px] font-mono text-[#F5F0E8]/50 shrink-0">
            <span>Navigacija:</span>
            <kbd className="px-1 py-0.5 rounded bg-[#0A1628] text-[#00C9A7]">↑↓</kbd>
            <kbd className="px-1 py-0.5 rounded bg-[#0A1628] text-[#00C9A7]">Enter</kbd>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist">
        {CATEGORY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          const count =
            tab.id === 'all'
              ? catalog.length
              : catalog.filter((i) => i.category === tab.id).length;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-syne font-bold transition-all shrink-0 min-h-[38px] ${
                isActive
                  ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20 scale-[1.02]'
                  : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-[#00C9A7] hover:bg-[#1A3152] border border-[#1A3152]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#0A1628]/30 text-[#0A1628]' : 'bg-[#1A3152] text-[#F5F0E8]/50'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Popular & Recent Query Suggestions (Shown when input is clean) */}
      {!query && (
        <div className="space-y-3 pt-2">
          {recentSearches.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00C9A7]" />
                  <span>Nedavne pretrage</span>
                </span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="hover:text-[#F5F0E8] transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Očisti</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs font-mono text-[#00C9A7] hover:border-[#00C9A7]/40 transition-all flex items-center gap-1.5"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-[11px] font-mono text-[#F5F0E8]/50 uppercase tracking-wider block mb-2">
              Popularne pretrage & ključni pojmovi
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#0A1628]/80 hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/40 text-xs text-[#F5F0E8]/85 hover:text-[#00C9A7] transition-all min-h-[34px] flex items-center gap-1.5"
                >
                  <Search className="w-3 h-3 text-[#00C9A7]" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Results List Container */}
      <div
        ref={listRef}
        role="region"
        aria-label="Rezultati pretrage"
        className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1"
      >
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={item.id}
                data-search-index={index}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`p-4 rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border ${
                  isSelected
                    ? 'bg-[#1A3152]/90 border-[#00C9A7] shadow-lg shadow-[#00C9A7]/10 scale-[1.005]'
                    : 'bg-[#0A1628]/70 border-[#1A3152] hover:bg-[#1A3152]/50 hover:border-[#00C9A7]/40'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#060D18] border border-[#1A3152] flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#00C9A7] font-semibold">{item.categoryLabel}</span>
                      {item.badge && (
                        <>
                          <span className="text-[#1A3152]" aria-hidden="true">·</span>
                          <span className="text-[#C9A84C] font-medium">{item.badge}</span>
                        </>
                      )}
                      {item.author && (
                        <>
                          <span className="text-[#1A3152]" aria-hidden="true">·</span>
                          <span className="text-[#F5F0E8]/50">{item.author}</span>
                        </>
                      )}
                      {item.date && (
                        <>
                          <span className="text-[#1A3152]" aria-hidden="true">·</span>
                          <span className="text-[#F5F0E8]/40">{item.date}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="font-syne font-bold text-sm sm:text-base text-[#F5F0E8] leading-tight group-hover:text-[#00C9A7] transition-colors">
                      {renderHighlightedText(item.title, query)}
                    </h4>

                    {/* Excerpt / Description */}
                    <p className="text-xs text-[#F5F0E8]/70 line-clamp-2 leading-relaxed">
                      {renderHighlightedText(item.description, query)}
                    </p>

                    {/* Tags preview */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {item.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-[#F5F0E8]/50 bg-[#060D18] px-2 py-0.5 rounded border border-[#1A3152]/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-[#060D18] hover:bg-[#00C9A7]/20 border border-[#1A3152] hover:border-[#00C9A7]/40 text-[#F5F0E8]/70 hover:text-[#00C9A7] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Otvori direktnu vezu u novom tabu"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-syne font-bold transition-all min-h-[40px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#00C9A7] text-[#0A1628] shadow-md'
                        : 'bg-[#1A3152] text-[#F5F0E8] hover:bg-[#00C9A7] hover:text-[#0A1628]'
                    }`}
                  >
                    <span>Pregledaj</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty state */
          <div className="py-12 px-4 text-center space-y-3 bg-[#0A1628]/40 border border-[#1A3152] rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-[#060D18] border border-[#1A3152] flex items-center justify-center mx-auto text-[#F5F0E8]/40">
              <Search className="w-6 h-6 text-[#00C9A7]" />
            </div>
            <h4 className="font-syne font-bold text-base text-[#F5F0E8]">
              Nema pronađenih rezultata za &quot;{query}&quot;
            </h4>
            <p className="text-xs text-[#F5F0E8]/60 max-w-md mx-auto leading-relaxed">
              Pokušajte sa sinonimom ili kraćom ključnom riječju. Možete odabrati i kategoriju &quot;Sve&quot; kako biste pretražili cjelokupnu bazu alata i članaka.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs hover:bg-[#00E5BE] transition-colors"
              >
                Prikaži Sve Stavke
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // Output Variant: Modal
  // ----------------------------------------------------
  if (variant === 'modal') {
    if (!isOpen) return null;

    return (
      <AnimatePresence>
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-14 bg-[#060D18]/90 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Brza pretraga platforme B&H Assistant"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-3xl rounded-3xl bg-[var(--brand-card,#0F2038)] border-2 border-[#00C9A7]/40 shadow-2xl overflow-hidden text-[#F5F0E8] flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori pretragu"
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] hover:border-[#00C9A7]/40 text-[#F5F0E8]/70 hover:text-[#00C9A7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {renderSearchInterface(true)}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // ----------------------------------------------------
  // Output Variant: Embedded Section
  // ----------------------------------------------------
  return (
    <section
      id="site-search"
      className={`relative rounded-3xl bg-[#0F2038]/90 border border-[#1A3152] shadow-2xl backdrop-blur-xl overflow-hidden ${className}`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

      {renderSearchInterface(false)}
    </section>
  );
};

export default SiteWideSearch;
