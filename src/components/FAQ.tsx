import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
  Layers,
  Shield,
  FileText,
  Compass
} from 'lucide-react';
import { FAQItem } from '../types';
import { FAQ_DATA } from '../data/faqData';
import { COMPANY_INFO } from '../data/companyData';

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-bh-assistant-mission': true, // Open first by default
    'faq-bh-konver-how-it-works': true
  });

  const categories = [
    { id: 'all', label: 'Sva Pitanja', icon: Filter },
    { id: 'alati', label: 'Digitalni Alati', icon: Layers },
    { id: 'firma', label: 'Firma & Misija', icon: Sparkles },
    { id: 'pravno', label: 'Pravno & Poslovanje', icon: FileText },
    { id: 'sigurnost', label: 'Sigurnost & Privatnost', icon: Shield },
    { id: 'kultura', label: 'Kultura & Magazin', icon: Compass }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  // Structured Data (Schema.org FAQPage) for Google AdSense & SEO indexers
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }, []);

  return (
    <section id="faq" className="py-12 sm:py-16 relative">
      {/* Schema.org FAQPage JSON-LD Injection for Google Knowledge Graph & AdSense Quality Review */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENTNOST & STRUKTURIRANI ODGOVORI</span>
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight">
            Često Postavljana Pitanja (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-[#F5F0E8]/70 leading-relaxed">
            Sveobuhvatni i precizni odgovori o softverskim alatima, registraciji firme B&H Assistant d.o.o. Zenica, zaštiti podataka i kulturnim inicijativama.
          </p>
        </div>

        {/* Controls: Category Filter, Search and Expand/Collapse */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F2038]/70 border border-[#1A3152] backdrop-blur-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-syne font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/20 font-bold'
                        : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-[#1A3152] hover:border-[#00C9A7]/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#F5F0E8]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pretraži odgovore i pojmove..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] focus:outline-none text-xs text-[#F5F0E8] placeholder-[#F5F0E8]/40 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0E8]/40 hover:text-[#F5F0E8] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Subbar: Result count & Expand/Collapse All buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#F5F0E8]/60 pt-2 border-t border-[#1A3152]/60">
            <span>Prikazano: <strong className="text-[#00C9A7]">{filteredFaqs.length}</strong> od {FAQ_DATA.length} pitanja</span>

            <div className="flex items-center gap-3">
              <button
                onClick={expandAll}
                className="hover:text-[#00C9A7] transition-colors cursor-pointer"
              >
                + Otvori Sve
              </button>
              <span className="text-[#1A3152]">|</span>
              <button
                onClick={collapseAll}
                className="hover:text-[#00C9A7] transition-colors cursor-pointer"
              >
                - Zatvori Sve
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0F2038]/40 border border-[#1A3152] space-y-3">
            <HelpCircle className="w-8 h-8 text-[#F5F0E8]/30 mx-auto" />
            <p className="text-[#F5F0E8] font-syne font-bold text-base">Nema pronađenih odgovora za upit "{searchQuery}".</p>
            <p className="text-xs text-[#F5F0E8]/60">Imate specifično pitanje? Naš tim u Zenici stoji vam na raspolaganju.</p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs"
            >
              <span>Kontaktirajte Podršku</span>
              <Mail className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0F2038] border-[#00C9A7]/50 shadow-lg shadow-[#00C9A7]/5'
                      : 'bg-[#0A1628] border-[#1A3152] hover:border-[#1A3152]/80'
                  }`}
                >
                  {/* Accordion Question Header */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isOpen ? 'bg-[#00C9A7] text-[#0A1628]' : 'bg-[#0F2038] text-[#00C9A7] border border-[#1A3152]'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-syne font-bold text-base sm:text-lg text-[#F5F0E8] leading-snug">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-[#00C9A7] uppercase tracking-wider">
                            {faq.categoryLabel}
                          </span>
                          {faq.lastUpdated && (
                            <span className="text-[10px] font-mono text-[#F5F0E8]/40">
                              • Ažurirano: {faq.lastUpdated}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                      isOpen
                        ? 'bg-[#00C9A7]/15 border-[#00C9A7]/40 text-[#00C9A7]'
                        : 'bg-[#0A1628] border-[#1A3152] text-[#F5F0E8]/50'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#1A3152]/60 animate-fadeIn">
                      <div className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed font-sans space-y-3">
                        <p>{faq.answer}</p>

                        {/* Interactive contextual quick links depending on question topic */}
                        {faq.id === 'faq-bh-konver-how-it-works' && (
                          <div className="pt-2">
                            <a
                              href="https://bh-konver.lovable.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00C9A7]/15 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-xs font-semibold hover:bg-[#00C9A7]/25 transition-colors"
                            >
                              <span>Otvori BH Konver (Lovable)</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {faq.id === 'faq-bh-papirfinder-coverage' && (
                          <div className="pt-2">
                            <a
                              href="https://bhpapirfinder.atoms.world/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00C9A7]/15 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-xs font-semibold hover:bg-[#00C9A7]/25 transition-colors"
                            >
                              <span>Pretraži Obrasce na BH PapirFinder</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {faq.id === 'faq-ornamenti-delivery' && (
                          <div className="pt-2">
                            <Link
                              to="/alati"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00C9A7]/15 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-xs font-semibold hover:bg-[#00C9A7]/25 transition-colors"
                            >
                              <span>Naruči Ornamenti Bosne USB Pakovanje</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        )}

                        {/* Tags */}
                        {faq.tags && faq.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {faq.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0A1628] text-[#F5F0E8]/50 border border-[#1A3152]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact & Support Banner at bottom of FAQ */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F2038] via-[#0A1628] to-[#0F2038] border border-[#1A3152] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-syne font-bold text-lg text-[#F5F0E8]">
              Niste pronašli odgovor na Vaše pitanje?
            </h4>
            <p className="text-xs sm:text-sm text-[#F5F0E8]/70">
              Naš inženjerski i pravni tim u Zenici stoji vam na raspolaganju za sve nedoumice i poslovne upite.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs font-mono text-[#F5F0E8] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#00C9A7]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-colors shadow-lg shadow-[#00C9A7]/20"
            >
              <span>Kontakt Forma & Impressum</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
