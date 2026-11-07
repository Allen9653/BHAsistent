import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  RefreshCw,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  X,
  Share2,
  Check,
  Filter
} from 'lucide-react';
import { NewsFeedUpdate } from '../types';
import { getStoredNewsFeed } from '../data/newsFeedData';
import { AuthorProfile } from './AuthorProfile';
import { SEOHead } from './SEOHead';

export const NewsFeed: React.FC = () => {
  const [updates, setUpdates] = useState<NewsFeedUpdate[]>(() => getStoredNewsFeed());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshSuccess, setRefreshSuccess] = useState<boolean>(false);
  const [activeUpdate, setActiveUpdate] = useState<NewsFeedUpdate | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Sve Objave', icon: Filter },
    { id: 'it-trends', label: 'IT Trendovi', icon: TrendingUp },
    { id: 'achievements', label: 'Postignuća Firme', icon: Award },
    { id: 'community', label: 'Zajednica & Događaji', icon: Users },
    { id: 'security', label: 'Sigurnost & Zakon', icon: ShieldCheck }
  ];

  const filteredUpdates = useMemo(() => {
    return updates.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.author.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [updates, selectedCategory, searchQuery]);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshSuccess(false);

    setTimeout(() => {
      const refreshed = getStoredNewsFeed();
      setUpdates([...refreshed]);
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3000);
    }, 600);
  };

  const handleShare = (update: NewsFeedUpdate) => {
    const url = window.location.origin + `/#newsfeed-${update.id}`;
    if (navigator.share) {
      navigator.share({
        title: update.title,
        text: update.summary,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'it-trends':
        return <TrendingUp className="w-4 h-4 text-[#00C9A7]" />;
      case 'achievements':
        return <Award className="w-4 h-4 text-[#FFB800]" />;
      case 'community':
        return <Users className="w-4 h-4 text-[#38BDF8]" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00C9A7]" />;
    }
  };

  return (
    <section id="news-feed" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse"></span>
              <span>KONTINUIRANO ODRŽAVANJE & KURACIJA SADRŽAJA</span>
            </div>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] tracking-tight">
              Aktuelnosti: IT Trendovi, Postignuća i Zajednica
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#F5F0E8]/70 max-w-2xl leading-relaxed">
              Redovno ažuriran i stručno kuriran pregled tehnoloških novosti, autorskih priznanja firme B&H Assistant d.o.o. Zenica i aktivnosti u lokalnoj zajednici.
            </p>
          </div>

          {/* Live indicator & Refresh button */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F2038] border border-[#1A3152] text-xs font-mono text-[#F5F0E8]/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Urednički status: Ažurno</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C9A7]/15 hover:bg-[#00C9A7]/25 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              title="Osvježi podatke feeda"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Učitavanje...' : 'Osvježi Feed'}</span>
            </button>
          </div>
        </div>

        {/* Refresh Toast Notification */}
        {refreshSuccess && (
          <div className="mb-6 p-3 rounded-xl bg-[#00C9A7]/15 border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-mono flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Feed je uspješno osvježen. Najnovije objave su sinhronizovane sa bazom.</span>
            </span>
            <span className="text-[10px] opacity-70">Upravo sada</span>
          </div>
        )}

        {/* Controls: Category Tabs & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0F2038]/70 border border-[#1A3152] backdrop-blur-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Filter Buttons */}
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
                placeholder="Pretraži teme, alate ili tagove..."
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

          {/* Results count counter */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50 pt-2 border-t border-[#1A3152]/60">
            <span>Prikazano: <strong className="text-[#00C9A7]">{filteredUpdates.length}</strong> od {updates.length} objava</span>
            {searchQuery && (
              <span>Filtrirano po upitu: "{searchQuery}"</span>
            )}
          </div>
        </div>

        {/* Feed Cards Grid */}
        {filteredUpdates.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0F2038]/40 border border-[#1A3152] space-y-3">
            <Search className="w-8 h-8 text-[#F5F0E8]/30 mx-auto" />
            <p className="text-[#F5F0E8] font-syne font-bold text-base">Nema pronađenih objava za traženi kriterij.</p>
            <p className="text-xs text-[#F5F0E8]/60">Pokušajte promijeniti kategoriju ili ukloniti filter pretrage.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs"
            >
              Poništi Filtere
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((item) => (
              <article
                key={item.id}
                id={`newsfeed-${item.id}`}
                className="group p-6 rounded-2xl bg-gradient-to-br from-[#0F2038] to-[#0A1628] border border-[#1A3152] hover:border-[#00C9A7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00C9A7]/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card Meta Top: Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1628] border border-[#1A3152] text-xs font-mono text-[#F5F0E8]/80">
                      {getCategoryIcon(item.category)}
                      <span className="text-[11px] font-semibold">{item.categoryLabel}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveUpdate(item)}
                    className="font-syne font-bold text-lg text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#F5F0E8]/70 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0A1628]/80 text-[#F5F0E8]/60 border border-[#1A3152]/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-5 border-t border-[#1A3152]/80 flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#00C9A7]" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#C9A84C] font-semibold truncate max-w-[110px]" title={item.author}>
                      {item.author.split(',')[0]}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveUpdate(item)}
                    className="flex items-center gap-1 font-syne font-bold text-xs text-[#00C9A7] hover:text-[#00E5BE] transition-colors cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Opširnije</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal Reader */}
      {activeUpdate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#060D18]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveUpdate(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border border-[#00C9A7]/40 shadow-2xl p-6 sm:p-8 space-y-6 my-auto text-[#F5F0E8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dynamic Open Graph and Canonical headers for Feed update */}
            <SEOHead
              title={`${activeUpdate.title} | B&H Assistant Feed`}
              description={activeUpdate.summary}
              canonical={`https://bh-assistant.ba/#newsfeed-${encodeURIComponent(activeUpdate.id)}`}
              ogType="article"
              author={activeUpdate.author}
              section={activeUpdate.categoryLabel}
              tags={activeUpdate.tags}
            />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1A3152] pb-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono font-semibold">
                    {getCategoryIcon(activeUpdate.category)}
                    <span>{activeUpdate.categoryLabel}</span>
                  </span>
                  {activeUpdate.badge && (
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800]">
                      {activeUpdate.badge}
                    </span>
                  )}
                  <span className="text-xs font-mono text-[#F5F0E8]/50">
                    {activeUpdate.date} • {activeUpdate.readTime} čitanja
                  </span>
                </div>
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#F5F0E8] leading-tight">
                  {activeUpdate.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveUpdate(null)}
                className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#F5F0E8] transition-colors cursor-pointer"
                aria-label="Zatvori prozor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-sm sm:text-base text-[#F5F0E8]/85 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-[#0A1628]/60 border border-[#1A3152] text-xs sm:text-sm text-[#00C9A7] font-mono leading-relaxed">
                <strong>Sažetak:</strong> {activeUpdate.summary}
              </div>

              {activeUpdate.fullContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-[#F5F0E8]/85">
                  {paragraph}
                </p>
              ))}

              {/* E-E-A-T AUTHOR PROFILE SECTION IN MODAL */}
              <div className="mt-6 pt-4 border-t border-[#1A3152]">
                <AuthorProfile
                  author={activeUpdate.author}
                  authorId={activeUpdate.authorId}
                  publishDate={activeUpdate.date}
                  readingTime={activeUpdate.readTime}
                  category={activeUpdate.categoryLabel}
                />
              </div>

              {/* Tags in modal */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeUpdate.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0A1628] text-[#00C9A7] border border-[#1A3152]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1A3152]">
              <button
                onClick={() => handleShare(activeUpdate)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs font-mono text-[#F5F0E8] transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-[#00C9A7]" />
                    <span className="text-[#00C9A7]">Link kopiran!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#00C9A7]" />
                    <span>Podijeli objavu</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                {activeUpdate.linkUrl && (
                  activeUpdate.linkUrl.startsWith('http') ? (
                    <a
                      href={activeUpdate.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-colors shadow-lg shadow-[#00C9A7]/20"
                    >
                      <span>{activeUpdate.linkText || 'Otvori Povezani Resurs'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={activeUpdate.linkUrl}
                      onClick={() => setActiveUpdate(null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-colors shadow-lg shadow-[#00C9A7]/20"
                    >
                      <span>{activeUpdate.linkText || 'Otvori Stranicu'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )
                )}

                <button
                  onClick={() => setActiveUpdate(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-xs font-syne font-bold text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors cursor-pointer"
                >
                  Zatvori
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
