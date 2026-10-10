import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AFFILIATE_COURSES } from '../data/companyData';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import {
  ExternalLink,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
  Search,
  Zap,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
  Terminal,
  Database,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ShopAffiliateSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  const handleCategorySelect = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  const categories = [
    'Sve',
    'IT & Veb Dizajn',
    'Fotografija & Umjetnost',
    'Digitalna Sigurnost'
  ];

  // In-house and verified official digital products (100% free of affiliate links)
  const productSlides = [
    {
      id: 'bh-konver-lovable',
      badge: 'AUTORSKI SOFTVER • POBJEDNIK 🏆',
      shortName: '01. BH KONVER',
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      title: 'BH KONVER – Kreira Pravne Dokumente, Prevodi i Konvertuje!',
      subtitle: 'Autorska web aplikacija B&H Assistant d.o.o. na domeni bh-konver.lovable.app',
      description: 'Automatizovana izrada ugovora, punomoći, izjava i prevoda u sekundi. Pobjednik natjecanja i izglasana Aplikacija Sedmice sa osiguranim razvojem iOS i Android nativnih aplikacija od tima Lovable.',
      url: 'https://bh-konver.lovable.app/',
      buttonText: 'Pokreni BH KONVER App',
      bannerImg: IMAGES.bhKonverBanner,
      icon: Sparkles,
      bullets: [
        'Kreira standardizovane pravne izjave i konvertuje valute',
        'Zvanični pobjednik natjecanja i izglasana Aplikacija Sedmice',
        'U izradi zvanični iOS & Android app uz podršku platforme Lovable',
        'Brzo, sigurno i 100% besplatno za građane i pravna lica'
      ]
    },
    {
      id: 'bh-papirfinder-atoms',
      badge: 'E-UPRAVA VODIČ • B&H ASSISTANT',
      shortName: '02. PapirFinder',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'BH PapirFinder – Više Ne Ganjate Papire, Oni Dolaze Vama!',
      subtitle: 'E-Uprava i pametni administrativni vodič na domeni bhpapirfinder.atoms.world',
      description: 'Zaboravite šaltere i čekanja u redovima! BH PapirFinder automatski pronalazi i priprema sve potrebne općinske, kantonalne i državne obrasce, takse i procedure direktno za građane i privredu.',
      url: 'https://bhpapirfinder.atoms.world',
      buttonText: 'Otvori BH PapirFinder',
      bannerImg: IMAGES.bhPapirfinderBanner,
      icon: Layers,
      bullets: [
        'Slogan: VIŠE NE GANJATE PAPIRE - ONI DOLAZE VAMA!',
        'Centralni registar obrazaca, taksi i općinskih zahtjeva',
        'Smanjuje birokratiju i štedi vrijeme građanima i privredi',
        'Zvanični softverski proizvod razvijen u Zenici'
      ]
    },
    {
      id: 'stecak-ornamenti-usb',
      badge: 'KULTURNA BAŠTINA • USB DOSTAVA 📦',
      shortName: '03. Ornamenti Bosne',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'Ornamenti Bosne – Kodirani Motivi sa Stećaka na USB Sticku',
      subtitle: 'Digitalna kolekcija baštine u SVG, PNG, HTML i CSS formatima',
      description: 'Autentični vektorski motivi i stilizovani kodovi sa srednjovjekovnih bosanskih stećaka. Jedini digitalni proizvod koji se dostavlja direktno na Vašu adresu na USB memorijskom sticku uz plaćanje po preuzimanju (pouzećem).',
      url: 'https://canva.link/8dwxeack5cwn18l',
      buttonText: 'Istraži Kolekciju Motiva',
      bannerImg: IMAGES.ornamentiBosne,
      icon: ImageIcon,
      bullets: [
        'Vektorski formati spremni za grafički i web dizajn (SVG/PNG)',
        'Dostava na USB Memory Sticku širom Bosne i Hercegovine',
        'Sigurno i jednostavno plaćanje pouzećem po prijemu pošiljke',
        'Kulturno naslijeđe preneseno u savremeni digitalni svijet'
      ]
    },
    {
      id: 'scena-magazin-promo',
      badge: 'SCENA+ PRINT & E-IZDANJE 📖',
      shortName: '04. SCENA+ Magazin',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'SCENA+ Magazin – Spajamo Kulture, Stvaramo Šanse!',
      subtitle: 'Prvi urbani magazin Zeničko-dobojskog kantona sa multimedijalnim izdanjem',
      description: 'Zavirite u prvo štampano i e-izdanje urbanog magazina SCENA+. Otkrijte autentične priče o umjetnosti Danila Kese, craft pivarstvu, gejmingu, kripto revoluciji i privrednim prilikama.',
      url: 'https://canva.link/vxekpnx0ow1xvt9',
      buttonText: 'Prelistaj E-Izdanje Magazina',
      bannerImg: IMAGES.scenaCover,
      icon: BookOpen,
      bullets: [
        'Podijeljeno 300 besplatnih štampanih primjeraka u ZDK',
        'Interaktivni Canva e-čitač i video prezentacija',
        'Kultura, umjetnost, domaći biznis i tehnologija na jednom mjestu',
        'Zvanično izdanje B&H Assistant d.o.o. Zenica'
      ]
    }
  ];

  // Auto slide rotation every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, productSlides.length]);

  const filteredCourses = AFFILIATE_COURSES.filter((course) => {
    const matchesCat = selectedCategory === 'Sve' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeSlide = productSlides[currentSlide];
  const IconComponent = activeSlide.icon;

  return (
    <section id="shop" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Energetic Fluid Glowing Mesh Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00C9A7] rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A84C] rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/50 text-[#00C9A7] text-xs font-mono tracking-wider uppercase shadow-lg shadow-[#00C9A7]/10">
            <ShoppingBag className="w-3.5 h-3.5 text-[#00C9A7]" />
            <span>{t('shop.badge', 'DIGITALNI RESURSI & EDUKACIJSKI CENTAR')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('shop.title', 'Edukativni Centar & Digitalni Proizvodi')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed">
            {t(
              'shop.subtitle',
              'Istražite zvanične digitalne alate, autorska izdanja kulturne baštine i edukativne platforme B&H Assistant d.o.o. Zenica.'
            )}
          </p>
        </div>

        {/* Dynamic High-Tech Carousel for Flagship In-House Digital Products */}
        <div
          className="mb-16 rounded-3xl bg-gradient-to-br from-[#0B1A2F] via-[#0F2038] to-[#06101E] border-2 border-[#00C9A7]/80 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,201,167,0.2)] relative overflow-hidden group transition-all duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cyber Frame Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00C9A7] z-20 pointer-events-none" />

          {/* HUD Top Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#00C9A7]/80 mb-6 pb-3 border-b border-[#1A3152] relative z-20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] font-bold">
                <Terminal className="w-3 h-3 text-[#C9A84C]" />
                SYS: DIGITALNI EKOSISTEM
              </span>
              <span className="hidden sm:inline text-[#F5F0E8]/40">| ZVANIČNI RESURSI B&amp;H ASSISTANT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C9A84C] font-extrabold tracking-widest">
                [ 0{currentSlide + 1} / 0{productSlides.length} ]
              </span>
            </div>
          </div>

          {/* Top Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152] z-20">
            <div
              key={currentSlide}
              className="h-full bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] animate-[progress_6s_linear]"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            />
          </div>

          {/* Watermark Icon */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 pointer-events-none">
            <IconComponent className="w-80 h-80 text-[#00C9A7] animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-syne font-black text-xs uppercase tracking-wider ${activeSlide.tagColor}`}>
                  {activeSlide.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-mono font-bold">
                  AUTORSKI PROIZVOD • B&amp;H ASSISTANT
                </span>
              </div>

              <div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8]">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#00C9A7] mt-1 font-semibold">
                  {activeSlide.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#F5F0E8]/90 leading-relaxed font-sans bg-[#0A1628]/90 p-5 rounded-2xl border border-[#00C9A7]/30 backdrop-blur-md">
                {activeSlide.description}
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#F5F0E8]">
                {activeSlide.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A1628]/70 border border-[#1A3152]">
                    <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Launcher Box */}
            <div className="lg:col-span-4 flex flex-col justify-center items-center text-center space-y-5 bg-[#0A1628]/90 p-6 rounded-2xl border-2 border-[#00C9A7]/50 shadow-[0_0_30px_rgba(0,201,167,0.15)] relative">
              {activeSlide.bannerImg ? (
                <div className="w-full bg-[#0F2038] p-3 rounded-2xl border border-[#00C9A7]/60 flex flex-col items-center justify-center overflow-hidden shadow-lg">
                  <span className="text-[10px] font-mono text-[#00C9A7] font-bold mb-2">SLUŽBENI PROIZVOD</span>
                  <a href={activeSlide.url} target="_blank" rel="noopener noreferrer" className="w-full hover:opacity-90 transition-opacity">
                    <SafeImage
                      src={activeSlide.bannerImg}
                      alt={activeSlide.title}
                      fallbackTitle={activeSlide.title}
                      fallbackSubtitle={activeSlide.subtitle}
                      className="max-w-full h-auto rounded border border-[#1A3152] shadow-md"
                    />
                  </a>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#0F2038] border border-[#00C9A7] p-4 shadow-lg flex items-center justify-center text-[#00C9A7] relative group-hover:scale-110 transition-transform">
                  <IconComponent className="w-10 h-10" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00C9A7] animate-ping" />
                </div>
              )}
              
              <div>
                <h4 className="font-syne font-bold text-lg text-[#F5F0E8]">
                  Direktan Pristup
                </h4>
                <p className="text-xs text-[#F5F0E8]/70 mt-1 font-sans">
                  Klikom otvarate zvanični resurs:
                </p>
              </div>

              <a
                href={activeSlide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(0,201,167,0.4)] hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
              >
                <span>{activeSlide.buttonText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between w-full pt-3 border-t border-[#1A3152]">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)}
                  className="p-2 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#F5F0E8] transition-colors"
                  aria-label="Prethodni proizvod"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[10px] font-mono text-[#F5F0E8]/60">
                  {currentSlide + 1} OD {productSlides.length} PROIZVODA
                </span>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % productSlides.length)}
                  className="p-2 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#F5F0E8] transition-colors"
                  aria-label="Sljedeći proizvod"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8 pt-6 border-t border-[#1A3152] relative z-20">
            {productSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`py-2.5 px-3 rounded-xl text-left text-[11px] font-mono transition-all border ${
                  currentSlide === idx
                    ? 'bg-[#00C9A7] text-[#0A1628] border-[#00C9A7] font-extrabold shadow-[0_0_15px_rgba(0,201,167,0.5)] scale-105'
                    : 'bg-[#0A1628]/80 text-[#F5F0E8]/70 hover:text-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7]/50'
                }`}
              >
                <div className="truncate">{slide.shortName}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#0F2038] p-4 rounded-2xl border border-[#1A3152]">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00C9A7] text-[#0A1628]'
                    : 'bg-[#0A1628] text-[#F5F0E8]/80 hover:text-[#00C9A7] border border-[#1A3152]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0E8]/50" />
            <input
              id="shop-product-search"
              name="productSearch"
              aria-label="Pretraži digitalne resurse"
              type="text"
              placeholder="Pretraži resurse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none"
            />
          </div>
        </div>

        {/* Products & Resources Grid */}
        {isTransitioning ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden space-y-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-shimmer" />
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-[#1A3152]/60 rounded-full w-24" />
                  <div className="h-4 bg-[#1A3152]/40 rounded-full w-20" />
                </div>
                <div className="h-28 bg-[#0A1628] rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="h-6 bg-[#1A3152]/70 rounded-md w-3/4" />
                <div className="h-4 bg-[#1A3152]/40 rounded-md w-full" />
                <div className="h-4 bg-[#1A3152]/40 rounded-md w-2/3" />
                <div className="pt-4 border-t border-[#1A3152]">
                  <div className="h-10 bg-[#1A3152]/60 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isGuruShots = course.id === 'gurushots-yusufowych';

              return (
                <motion.div
                  key={course.id}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: isGuruShots 
                      ? "0 0 35px -5px rgba(201, 168, 76, 0.35)" 
                      : "0 0 35px -5px rgba(0, 201, 167, 0.3)",
                    borderColor: isGuruShots ? "rgba(201, 168, 76, 0.8)" : "rgba(0, 201, 167, 0.7)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    const targetUrl = course.affiliateUrl || (course as any).url;
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={`rounded-3xl bg-[#0F2038] border ${
                    isGuruShots ? 'border-[#C9A84C]/50' : 'border-[#1A3152]'
                  } p-6 flex flex-col justify-between shadow-xl transition-all group cursor-pointer relative overflow-hidden`}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent -translate-x-full animate-shimmer" />
                  </div>

                  {/* Corner Accent */}
                  <div
                    className={`absolute top-0 right-0 w-28 h-28 ${
                      isGuruShots ? 'bg-gradient-to-bl from-[#C9A84C]/15' : 'bg-gradient-to-bl from-[#00C9A7]/10'
                    } to-transparent rounded-bl-full pointer-events-none group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                          isGuruShots
                            ? 'bg-[#0A1628] text-[#C9A84C] border-[#C9A84C]/40'
                            : 'bg-[#0A1628] text-[#00C9A7] border-[#00C9A7]/30'
                        }`}
                      >
                        {course.badge}
                      </span>
                      <span className="text-[10px] font-mono text-[#C9A84C]">
                        {course.category}
                      </span>
                    </div>

                    {/* Visual Preview */}
                    {course.image && (
                      <div className="rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video flex items-center justify-center p-2 group-hover:border-[#00C9A7]/40 transition-colors">
                        <SafeImage
                          src={course.image}
                          alt={course.title}
                          fallbackTitle={course.title}
                          fallbackSubtitle={course.provider}
                          className="max-h-full max-w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <h4
                      className={`font-syne font-bold text-lg text-[#F5F0E8] ${
                        isGuruShots ? 'group-hover:text-[#C9A84C]' : 'group-hover:text-[#00C9A7]'
                      } transition-colors flex items-center justify-between gap-2`}
                    >
                      <span>{course.title}</span>
                      {isGuruShots && <Camera className="w-4 h-4 text-[#C9A84C] shrink-0" />}
                    </h4>

                    <p className="text-xs text-[#F5F0E8]/70 font-sans leading-relaxed">
                      {course.description}
                    </p>

                    <ul className="space-y-1.5 text-[11px] text-[#F5F0E8]/80 font-sans pt-2 border-t border-[#1A3152]">
                      {course.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isGuruShots ? 'bg-[#C9A84C]' : 'bg-[#00C9A7]'
                            }`}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 relative z-10">
                    <a
                      href={course.affiliateUrl || (course as any).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`w-full py-3 px-4 rounded-xl font-syne font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 ${
                        isGuruShots
                          ? 'bg-[#0A1628] hover:bg-[#C9A84C] border border-[#C9A84C]/40 text-[#C9A84C] hover:text-[#0A1628]'
                          : 'bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628]'
                      }`}
                    >
                      <span>{isGuruShots ? 'Otvori Portfolio' : 'Pristupi Resursu'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ShopAffiliateSection;
