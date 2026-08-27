import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { getStoredNews, saveNewsArticles, exportNewsForJoomla, normalizeImageUrl } from '../data/newsData';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { Newspaper, Plus, Edit2, Trash2, Download, Search, X, Calendar, User, Tag, Sparkles, CheckCircle2, ChevronRight, Share2, Globe, ShieldCheck, Video, Play, ExternalLink, HardDrive, Package, ArrowRight, ArrowLeft } from 'lucide-react';
import { BhKonverVideoModal } from './BhKonverVideoModal';
import { ArticleVideoPlayer } from './ArticleVideoPlayer';
import { useLanguage } from '../context/LanguageContext';
import { RadixCustomSelect } from './RadixCustomSelect';

interface NewsSectionProps {
  onOpenAdmin?: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onOpenAdmin }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { t } = useLanguage();
  
  // Modals
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setArticles(getStoredNews());
  }, []);

  const handleCategorySelect = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 220);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle.title || !editingArticle.content) {
      alert("Molimo unesite naslov i sadržaj članka.");
      return;
    }

    let updatedList: NewsArticle[];
    if (editingArticle.id) {
      // Edit existing
      updatedList = articles.map(art => art.id === editingArticle.id ? (editingArticle as NewsArticle) : art);
    } else {
      // Create new
      const newArt: NewsArticle = {
        id: `news-${Date.now()}`,
        title: editingArticle.title || '',
        slug: (editingArticle.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: editingArticle.category || 'Saopštenja',
        date: new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' }),
        author: editingArticle.author || 'B&H Assistant Uredništvo',
        excerpt: editingArticle.excerpt || editingArticle.content.slice(0, 150) + '...',
        content: editingArticle.content || '',
        imageUrl: editingArticle.imageUrl || IMAGES.scenaCover,
        published: true,
        tags: editingArticle.tags || ['B&H Assistant', 'Novosti']
      };
      updatedList = [newArt, ...articles];
    }

    setArticles(updatedList);
    saveNewsArticles(updatedList);
    setIsEditorModalOpen(false);
    setEditingArticle({});
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovaj članak?")) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveNewsArticles(updated);
      if (activeArticle?.id === id) {
        setActiveArticle(null);
      }
    }
  };

  const categories = ['Sve', ...Array.from(new Set(['Sajber Sigurnost & IT', 'BH KONVER & IT', 'SCENA+ Magazin', 'ZENTAXI', 'GUMMI Edukacija', 'Saopštenja', ...articles.map(a => a.category)]))];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'Sve' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="novosti" className="py-20 bg-[#0A1628] relative border-t border-[#1A3152]">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono font-bold tracking-wider uppercase">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t('news.badge', 'ZVANIČNA SAOPŠTENJA & VIJESTI')}</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] leading-tight">
              {t('news.title', 'Aktuelnosti & CMS Informator d.o.o.')}
            </h2>
            <p className="text-sm sm:text-base text-[#F5F0E8]/75 font-sans leading-relaxed">
              {t('news.subtitle', 'Pratite novosti iz rada B&H Assistant d.o.o. Zenica, objave za javnost i najave novih autorskih softvera.')}
            </p>
          </div>

          {/* CMS Admin Tools & Joomla Export */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setEditingArticle({
                  category: 'BH KONVER & IT',
                  author: 'Alen Jusufović, B&H Assistant',
                  imageUrl: IMAGES.bhKonverMockup
                });
                setIsEditorModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-[#00C9A7]/20 transition-all hover:scale-105 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj Novi Članak (CMS)</span>
            </button>

            <button
              onClick={() => exportNewsForJoomla(articles)}
              className="px-4 py-2.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#C9A84C]/50 text-[#C9A84C] font-syne font-bold text-xs tracking-wide flex items-center gap-2 transition-all hover:scale-105 min-h-[44px]"
              title="Izvozi objave u JSON format spreman za Joomla CMS import"
            >
              <Download className="w-4 h-4" />
              <span>Joomla CMS Export</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152]">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-syne font-bold transition-all whitespace-nowrap min-h-[40px] ${
                  selectedCategory === cat
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md shadow-[#00C9A7]/20'
                    : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-[#F5F0E8] border border-[#1A3152]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-72">
            <input
              id="news-search-input"
              name="newsSearch"
              aria-label="Pretraži članke"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Pretraži članke..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] text-xs outline-none font-sans"
            />
            <Search className="w-4 h-4 text-[#F5F0E8]/40 absolute left-3 top-3" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-[#F5F0E8]/50">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid with Shimmer Effect */}
        {isTransitioning ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#0F2038] border border-[#1A3152] overflow-hidden shadow-xl p-0 flex flex-col relative"
              >
                {/* Shimmer Skeleton Header */}
                <div className="aspect-[16/9] w-full bg-[#0A1628] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full animate-shimmer" />
                </div>
                {/* Shimmer Skeleton Body */}
                <div className="p-6 space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-shimmer" />
                  <div className="h-4 bg-[#1A3152]/60 rounded-md w-1/3" />
                  <div className="h-6 bg-[#1A3152]/80 rounded-md w-3/4" />
                  <div className="h-3 bg-[#1A3152]/50 rounded-md w-full" />
                  <div className="h-3 bg-[#1A3152]/50 rounded-md w-2/3" />
                  <div className="pt-4 border-t border-[#1A3152] flex justify-between">
                    <div className="h-4 bg-[#1A3152]/60 rounded-md w-24" />
                    <div className="h-4 bg-[#1A3152]/60 rounded-md w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8">
            <Newspaper className="w-12 h-12 text-[#F5F0E8]/30 mx-auto mb-3" />
            <h3 className="font-syne font-bold text-lg text-[#F5F0E8]">Nema pronađenih članaka</h3>
            <p className="text-xs text-[#F5F0E8]/60 mt-1">Pokušajte sa drugim pojmom pretrage ili odaberite drugu kategoriju.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group rounded-2xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/50 overflow-hidden shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Subtle Shimmer Loading Effect Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent -translate-x-full animate-shimmer" />
                </div>

                {/* Image Header */}
                <div className="aspect-[16/9] w-full bg-[#0A1628] relative overflow-hidden z-10">
                  <SafeImage
                    src={normalizeImageUrl(article.imageUrl)}
                    alt={article.title}
                    fallbackTitle={article.title}
                    fallbackSubtitle={article.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1628]/90 backdrop-blur-md border border-[#00C9A7]/40 text-[10px] font-syne font-bold text-[#00C9A7] uppercase z-10">
                    {article.category}
                  </div>
                  {(article.hasVideo || article.id === 'news-1' || article.videoUrl) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (article.videoUrl || article.id === 'news-monday-com') {
                          setActiveArticle(article);
                        } else {
                          setIsVideoModalOpen(true);
                        }
                      }}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-[11px] flex items-center gap-1.5 shadow-lg shadow-[#00C9A7]/30 transition-transform hover:scale-105"
                      title="Pogledajte priloženi video"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#0A1628]" />
                      <span>Video Demo</span>
                    </button>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#F5F0E8]/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[140px]">
                        <User className="w-3.5 h-3.5 text-[#00C9A7]" />
                        {article.author}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setActiveArticle(article)}
                      className="font-syne font-bold text-lg text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors leading-snug line-clamp-2 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#F5F0E8]/75 font-sans leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-[#1A3152] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-syne font-bold text-[#00C9A7] hover:text-[#00E5BE] flex items-center gap-1 transition-colors"
                    >
                      <span>Pročitaj članak</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {article.externalUrl && (
                      <a
                        href={article.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 flex items-center gap-1 transition-colors"
                        title="Zvanični partnerski / eksterni link"
                      >
                        <span>{article.externalUrl.includes('monday') ? 'monday.com ↗' : 'Vanjski Link ↗'}</span>
                      </a>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                          setIsEditorModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors"
                        title="Uredi članak (CMS)"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 rounded-lg bg-[#0A1628] hover:bg-red-950/40 text-[#F5F0E8]/70 hover:text-red-400 transition-colors"
                        title="Obriši članak"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/95 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border border-[#00C9A7]/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1A3152] bg-[#0A1628]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-3 py-1.5 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Nazad / Return</span>
                </button>
                <span className="px-2.5 py-1 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] font-mono font-bold text-[10px] uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-xs font-mono text-[#F5F0E8]/60 hidden sm:inline">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl bg-[#0F2038] text-[#F5F0E8] hover:text-[#00C9A7] transition-colors"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeArticle.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video">
                  <SafeImage
                    src={normalizeImageUrl(activeArticle.imageUrl)}
                    alt={activeArticle.title}
                    fallbackTitle={activeArticle.title}
                    fallbackSubtitle={activeArticle.category}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F5F0E8] mb-3 leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] mb-6 border-b border-[#1A3152] pb-3">
                  <User className="w-4 h-4 text-[#00C9A7]" />
                  <span>Autor: {activeArticle.author}</span>
                </div>

                <div className="text-sm sm:text-base text-[#F5F0E8]/90 font-sans leading-relaxed whitespace-pre-line space-y-4">
                  {activeArticle.content}
                </div>

                {/* External / Affiliate Link CTA Box */}
                {activeArticle.externalUrl && (
                  <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl my-4 ${
                    activeArticle.externalUrl.includes('monday')
                      ? 'bg-gradient-to-r from-[#0F2038] via-[#162C4E] to-[#0F2038] border-[#00C9A7]/60'
                      : 'bg-gradient-to-r from-[#0A1628] via-[#0F2038] to-[#0A1628] border-[#00C9A7]/40'
                  }`}>
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <span className="text-xs font-syne font-bold text-[#F5F0E8]">
                          {activeArticle.externalUrl.includes('monday') ? 'Zvanični Partnerski Link:' : 'Zvanični Link Članka:'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] font-mono text-[11px] font-bold">
                          {activeArticle.externalUrl.includes('monday') ? 'monday.com Free Trial' : 'Vanjski Izvor'}
                        </span>
                      </div>
                      <p className="text-xs text-[#F5F0E8]/80 font-sans">
                        {activeArticle.externalUrl.includes('monday')
                          ? 'Isprobajte Monday.com besplatno, kreirajte svoje prilagođene radne tokove i ubrzajte poslovanje.'
                          : 'Pristupite kompletnom vizuelnom članku i originalnom izdanju na partnerskoj platformi.'}
                      </p>
                    </div>

                    <a
                      href={activeArticle.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/30 transition-all hover:scale-105 shrink-0"
                    >
                      <span>{activeArticle.externalUrl.includes('monday') ? 'Isprobaj Monday.com Besplatno' : 'Otvori Vanjski Link'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Embedded Video Player Component */}
                {(activeArticle.hasVideo || activeArticle.videoFileName || activeArticle.id === 'news-1') && (
                  <div className="space-y-4">
                    <ArticleVideoPlayer
                      videoFileName={activeArticle.videoFileName || "BH.KONVER.VIDEO.pokaz.mp4"}
                      videoUrl={activeArticle.videoUrl}
                      posterUrl={activeArticle.imageUrl}
                      title={activeArticle.title}
                      onOpenModal={() => setIsVideoModalOpen(true)}
                    />
                    <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#0A1628] via-[#0F2038] to-[#0A1628] border-2 border-[#00C9A7]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] shrink-0">
                          <Video className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-syne font-bold text-[#F5F0E8]">Priloženi Prezentacijski Video:</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] font-bold">
                              {activeArticle.videoFileName || "BH.KONVER.VIDEO.pokaz.mp4"}
                            </span>
                          </div>
                          <p className="text-xs text-[#F5F0E8]/75 font-sans">
                            Pregledajte zvanični video demo prikaz BH KONVER alata i funkcije generisanja pravnih izjava.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/20 transition-all hover:scale-105 shrink-0"
                      >
                        <Play className="w-4 h-4 fill-[#0A1628]" />
                        <span>Pokreni Video Demo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ORNAMENTI BOSNE Video & USB Delivery Showcase */}
                {activeArticle.id === 'news-ornaments-of-bosnia-video' && (
                  <div className="space-y-4 my-6">
                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1A3152] shadow-2xl bg-black aspect-video">
                      <iframe
                        className="w-full h-full border-0"
                        src="https://www.youtube.com/embed/CyJx3h3nGyA?rel=0&modestbranding=1"
                        title="ORNAMENTI BOSNE Video Prezentacija"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 via-[#0F2038] to-[#00C9A7]/20 border-2 border-[#C9A84C]/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C9A84C] uppercase">
                        <HardDrive className="w-4 h-4 text-[#00C9A7]" />
                        <span>DOSTAVA NA USB MEMORY STICKU • PLAĆANJE PO PREUZIMANJU</span>
                      </div>
                      <p className="text-xs text-[#F5F0E8] leading-relaxed">
                        Ovo je jedini digitalni proizvod koji se dostavlja direktno na Vašu adresu na USB Memory Sticku uz plaćanje po preuzimanju (pouzećem).
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href="https://youtu.be/CyJx3h3nGyA"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-[#FF0000] text-white font-syne font-bold text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Gledaj na YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href="https://canva.link/8dwxeack5cwn18l"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <span>Otvori E-Katalog (Canva)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeArticle.tags && activeArticle.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#1A3152] mt-8">
                    <Tag className="w-3.5 h-3.5 text-[#00C9A7]" />
                    {activeArticle.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-[#0A1628] border border-[#1A3152] text-[11px] font-mono text-[#F5F0E8]/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0A1628] border-t border-[#1A3152] flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[11px] font-mono text-[#F5F0E8]/60 text-center sm:text-left">
                B&H Assistant d.o.o. CMS Sistem • SCENA+ & Novosti
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] border border-[#00C9A7]/40 text-[#00C9A7] font-syne font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>← Vrati se na novosti (Return)</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-colors"
                >
                  Zatvori
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN CMS CREATE / EDIT MODAL */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1628]/95 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7]/50 shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
              <div className="flex items-center gap-2 text-[#00C9A7]">
                <Edit2 className="w-5 h-5" />
                <h3 className="font-syne font-bold text-lg text-[#F5F0E8]">
                  {editingArticle.id ? 'Uredi Članak (CMS)' : 'Novi Članak / Objava (CMS)'}
                </h3>
              </div>
              <button onClick={() => setIsEditorModalOpen(false)} className="p-1.5 rounded-lg bg-[#0A1628] text-[#F5F0E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs font-sans text-[#F5F0E8]">
              
              <div>
                <label htmlFor="article-title-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Naslov Članka *</label>
                <input
                  id="article-title-input"
                  name="articleTitle"
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="Unesite naslov vijesti ili saopštenja..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="article-category-select" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Kategorija</label>
                  <RadixCustomSelect
                    value={editingArticle.category || 'Saopštenja'}
                    onValueChange={(val) => setEditingArticle({ ...editingArticle, category: val })}
                    options={[
                      { value: 'BH KONVER & IT', label: 'BH KONVER & IT' },
                      { value: 'SCENA+ Magazin', label: 'SCENA+ Magazin' },
                      { value: 'ZENTAXI', label: 'ZENTAXI' },
                      { value: 'GUMMI Edukacija', label: 'GUMMI Edukacija' },
                      { value: 'Saopštenja', label: 'Saopštenja za javnost' },
                    ]}
                  />
                </div>

                <div>
                  <label htmlFor="article-author-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Autor / Redakcija</label>
                  <input
                    id="article-author-input"
                    name="articleAuthor"
                    type="text"
                    value={editingArticle.author || 'Alen Jusufović, B&H Assistant'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="article-image-url-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">URL Slike / Logotipa (Opcionalno)</label>
                  <input
                    id="article-image-url-input"
                    name="articleImageUrl"
                    type="text"
                    value={editingArticle.imageUrl || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                    placeholder="https:// ili /images/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                  />
                </div>

                <div>
                  <label htmlFor="article-external-url-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Affiliate / Vanjski URL (Opcionalno)</label>
                  <input
                    id="article-external-url-input"
                    name="articleExternalUrl"
                    type="text"
                    value={editingArticle.externalUrl || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, externalUrl: e.target.value })}
                    placeholder="https://try.monday.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="article-video-url-input" className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">YouTube Video URL</label>
                  <input
                    id="article-video-url-input"
                    name="articleVideoUrl"
                    type="text"
                    value={editingArticle.videoUrl || ''}
                    onChange={(e) => setEditingArticle({
                      ...editingArticle,
                      videoUrl: e.target.value,
                      hasVideo: Boolean(e.target.value || editingArticle.videoFileName)
                    })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#00C9A7]/40 focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                  />
                </div>

                <div>
                  <label htmlFor="article-video-file-input" className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">Naziv Video Datoteke / MP4 Putanja</label>
                  <input
                    id="article-video-file-input"
                    name="articleVideoFile"
                    type="text"
                    value={editingArticle.videoFileName || ''}
                    onChange={(e) => setEditingArticle({
                      ...editingArticle,
                      videoFileName: e.target.value,
                      hasVideo: Boolean(e.target.value || editingArticle.videoUrl)
                    })}
                    placeholder="Primjer: BH.KONVER.VIDEO.pokaz.mp4"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#00C9A7]/40 focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="article-excerpt-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Kratki Sažetak (Excerpt)</label>
                <textarea
                  id="article-excerpt-input"
                  name="articleExcerpt"
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  placeholder="Kratki pregled sadržaja za karticu članka..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                />
              </div>

              <div>
                <label htmlFor="article-content-input" className="block text-[11px] font-mono text-[#C9A84C] uppercase mb-1">Puni Tekst Članka *</label>
                <textarea
                  id="article-content-input"
                  name="articleContent"
                  rows={6}
                  required
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Napišite puni tekst članka..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] outline-none text-[#F5F0E8]"
                />
              </div>

              <div className="pt-3 border-t border-[#1A3152] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] font-semibold"
                >
                  Otkaži
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold shadow-lg shadow-[#00C9A7]/20"
                >
                  Sačuvaj Članak
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* BH KONVER Video Presentation Modal */}
      <BhKonverVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

    </section>
  );
};
