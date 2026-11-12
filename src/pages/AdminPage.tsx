import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Mail, 
  Check, 
  AlertCircle, 
  LogOut, 
  Image as ImageIcon, 
  FileText, 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Save,
  Globe,
  CheckCircle2,
  X,
  UploadCloud,
  RefreshCw
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { COMPANY_SERVICES, COMPANY_INFO } from '../data/companyData';
import { getStoredNews, saveNewsArticles, NewsArticle } from '../data/newsData';
import { getAllCustomImages, removeCustomImage } from '../utils/customImagesStorage';
import { 
  getAllCustomContent, 
  setCustomContent, 
  ContentOverride,
  getAllTextBlocks,
  setTextBlock,
  resetTextBlock,
  resetAllTextBlocks
} from '../utils/customContentStorage';
import { ImageUploadModal } from '../components/ImageUploadModal';
import { PageSeo } from '../components/PageSeo';

const DEFAULT_KNOWN_BLOCKS: Record<string, { label: string; defaultValue: string; page: string }> = {
  'home.hero.badge': {
    label: 'Početna • Hero Bedž na vrhu',
    defaultValue: 'PRVA SOFTVERSKA I IZDAVAČKA KUĆA U ZENICI',
    page: 'Početna Stranica'
  },
  'home.hero.motto': {
    label: 'Početna • Glavni Moto Firme',
    defaultValue: 'SPAJAMO KULTURE - STVARAMO ŠANSE',
    page: 'Početna Stranica'
  },
  'home.hero.subtitle': {
    label: 'Početna • Hero Podnaslov i Uvod',
    defaultValue: 'B&H Assistant d.o.o. Zenica spaja moderne IT tehnologije, besplatne alate za bh. građane, urbani magazin SCENA+ i kulturnu baštinu stećaka u jedinstven ekosistem.',
    page: 'Početna Stranica'
  },
  'services.hero.title': {
    label: 'Usluge • Glavni Naslov Sekcije',
    defaultValue: 'B2B & IT Usluge Visokih Performansi',
    page: 'Proizvodi i Usluge'
  },
  'services.hero.subtitle': {
    label: 'Usluge • Podnaslov Ponude',
    defaultValue: 'Kompletna digitalna rješenja sa sjedištem u Zenici — od B2B akvizicije kupaca do namjenskog softvera.',
    page: 'Proizvodi i Usluge'
  },
  'free.products.title': {
    label: 'Besplatni Proizvodi • Glavni Naslov',
    defaultValue: 'Besplatni digitalni proizvodi',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.products.subtitle': {
    label: 'Besplatni Proizvodi • Uvodni Podnaslov',
    defaultValue: 'Edukativne publikacije za najmlađe, te profesionalni audio plugini i studijski alati za sve muzičare, producente i kreativce.',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.gummi.title': {
    label: 'Besplatni Proizvodi • Bojanka GUMMI Naslov',
    defaultValue: 'Bojanka GUMMI',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.gummi.desc': {
    label: 'Besplatni Proizvodi • Bojanka GUMMI Opis',
    defaultValue: '"Učimo pisati štampana i pisana slova kroz igru i smijeh." Poklon izdanje za roditelje, vrtiće i škole prilagođeno za kućni printer.',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.multibender.title': {
    label: 'Besplatni Proizvodi • Multiband Delay Naslov',
    defaultValue: 'Multiband Delay & FX',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.multibender.desc': {
    label: 'Besplatni Proizvodi • Multiband Delay Opis',
    defaultValue: 'Audio efekt koji dijeli signal u 3 frekvencijska opsega uz zaseban delay, saturaciju, bitcrushing i detune modul za analogni osjećaj.',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.mturbodelay.title': {
    label: 'Besplatni Proizvodi • MTurboDelay Naslov',
    defaultValue: 'MTurboDelay',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'free.mturbodelay.desc': {
    label: 'Besplatni Proizvodi • MTurboDelay Opis',
    defaultValue: 'Moćni delay plugin sa neograničenim modulacijama (LFO, envelope), emulacijama legendarnih tape/analog uredjaja i multi-tap sekcijom.',
    page: 'Proizvodi i Usluge (Besplatni Resursi)'
  },
  'about.hero.title': {
    label: 'O Nama • Glavni Naslov',
    defaultValue: 'Digitalni Ekosistem B&H Assistant d.o.o.',
    page: 'O Nama'
  },
  'about.hero.subtitle': {
    label: 'O Nama • Podnaslov Prezentacije',
    defaultValue: 'Inovativna softverska i izdavačka kuća iz Zenice. Saznajte više o našoj viziji, pravnim podacima i misiji.',
    page: 'O Nama'
  }
};

export const AdminPage: React.FC = () => {
  const { isAdmin, adminUser, login, logout, isChecking, isEditMode, toggleEditMode } = useAdminAuth();

  // Login form state (default prefilled to owner email requested)
  const [email, setEmail] = useState('alenjusufovic@yahoo.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin dashboard tabs: 'services' | 'articles' | 'images' | 'blocks' | 'company'
  const [activeTab, setActiveTab] = useState<'services' | 'articles' | 'images' | 'blocks' | 'company'>('services');

  // Stored state
  const [articles, setArticles] = useState<NewsArticle[]>(() => (typeof window !== 'undefined' ? getStoredNews() : []));
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => getAllCustomImages());
  const [customContent, setCustomContentState] = useState<Record<string, ContentOverride>>(() => getAllCustomContent());
  const [textBlocks, setTextBlocksState] = useState<Record<string, string>>(() => getAllTextBlocks());
  const [blockSearch, setBlockSearch] = useState('');
  const [editingBlockKey, setEditingBlockKey] = useState<string | null>(null);
  const [editingBlockVal, setEditingBlockVal] = useState<string>('');
  const [newBlockKey, setNewBlockKey] = useState('');
  const [newBlockValue, setNewBlockValue] = useState('');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Local drafts for services to allow editing before saving
  const [serviceDrafts, setServiceDrafts] = useState<Record<string, Partial<ContentOverride>>>({});

  // Article Editor Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle>>({
    published: true,
    author: 'Alen Jusufović, Direktor & Softverski Inženjer',
    category: 'Softver & IT',
    date: new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' })
  });

  // Upload modal state
  const [uploadModal, setUploadModal] = useState<{
    isOpen: boolean;
    itemId: string;
    itemTitle: string;
    itemType: 'usluga' | 'proizvod';
    currentImage?: string | null;
  }>({
    isOpen: false,
    itemId: '',
    itemTitle: '',
    itemType: 'usluga',
    currentImage: null
  });

  useEffect(() => {
    // Populate initial draft states for services
    const initialDrafts: Record<string, Partial<ContentOverride>> = {};
    COMPANY_SERVICES.forEach((srv) => {
      const override = customContent[srv.id];
      initialDrafts[srv.id] = {
        id: srv.id,
        title: override?.title || srv.title,
        shortDescription: override?.shortDescription !== undefined ? override.shortDescription : (srv.shortDescription || ''),
        description: override?.description || srv.description,
        published: override?.published !== false
      };
    });
    setServiceDrafts(initialDrafts);
  }, [customContent]);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3200);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);
    try {
      const res = await login(password, email);
      if (!res.success) {
        setLoginError(res.error || 'Neispravni pristupni podaci.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Greška pri prijavi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshData = () => {
    setCustomImages(getAllCustomImages());
    setCustomContentState(getAllCustomContent());
    setArticles(getStoredNews());
    setTextBlocksState(getAllTextBlocks());
  };

  const handleSaveBlock = (key: string, val: string) => {
    setTextBlock(key, val);
    setTextBlocksState(getAllTextBlocks());
    setEditingBlockKey(null);
    showToast(`Tekstualni blok "${key}" uspješno ažuriran!`);
  };

  const handleResetBlock = (key: string) => {
    resetTextBlock(key);
    setTextBlocksState(getAllTextBlocks());
    showToast(`Blok "${key}" resetovan na zadanu vrijednost.`);
  };

  const handleAddNewBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockKey.trim() || !newBlockValue.trim()) return;
    setTextBlock(newBlockKey.trim(), newBlockValue.trim());
    setTextBlocksState(getAllTextBlocks());
    setNewBlockKey('');
    setNewBlockValue('');
    showToast('Novi tekstualni blok uspješno registrovan!');
  };

  // Save Service Text & Publish Status
  const handleSaveService = (serviceId: string) => {
    const draft = serviceDrafts[serviceId];
    if (!draft) return;
    setCustomContent(serviceId, draft);
    setCustomContentState(getAllCustomContent());
    showToast(`Uspješno sačuvane izmjene za uslugu!`);
  };

  const handleToggleServicePublish = (serviceId: string) => {
    const currentDraft = serviceDrafts[serviceId];
    const newStatus = !(currentDraft?.published !== false);
    const updated = { ...currentDraft, published: newStatus };
    setServiceDrafts((prev) => ({ ...prev, [serviceId]: updated }));
    setCustomContent(serviceId, updated);
    setCustomContentState(getAllCustomContent());
    showToast(newStatus ? 'Usluga je označena kao objavljena!' : 'Usluga je sakrivena (postavljena u nacrt).');
  };

  // Save Article (Create or Edit)
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle.title || !editingArticle.content) {
      alert('Molimo unesite naslov i sadržaj članka.');
      return;
    }

    const currentArticles = getStoredNews();
    const existingIndex = currentArticles.findIndex(
      (a) => a.id === editingArticle.id || (editingArticle.slug && a.slug === editingArticle.slug)
    );

    let updatedList: NewsArticle[];

    if (existingIndex >= 0) {
      // Update existing
      updatedList = [...currentArticles];
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        ...editingArticle,
        title: editingArticle.title!,
        content: editingArticle.content!,
        slug: editingArticle.slug || updatedList[existingIndex].slug,
        excerpt: editingArticle.excerpt || editingArticle.content.slice(0, 160) + '...',
        published: editingArticle.published !== false
      } as NewsArticle;
      showToast('Članak je uspješno ažuriran!');
    } else {
      // Create new
      const newSlug = (editingArticle.slug || editingArticle.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newArticle: NewsArticle = {
        id: editingArticle.id || `news-${Date.now()}`,
        title: editingArticle.title,
        slug: newSlug,
        category: editingArticle.category || 'Softver & IT',
        date: editingArticle.date || new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' }),
        author: editingArticle.author || 'Alen Jusufović, Direktor & Softverski Inženjer',
        excerpt: editingArticle.excerpt || editingArticle.content.slice(0, 160) + '...',
        content: editingArticle.content,
        imageUrl: editingArticle.imageUrl || 'https://i.imgur.com/jf337m3.jpg',
        published: editingArticle.published !== false,
        tags: editingArticle.tags || ['B&H Assistant', 'IT'],
        externalUrl: editingArticle.externalUrl || '',
        ctaText: editingArticle.ctaText || ''
      };

      updatedList = [newArticle, ...currentArticles];
      showToast('Novi članak je uspješno kreiran i sačuvan!');
    }

    saveNewsArticles(updatedList);
    setArticles(updatedList);
    setIsArticleModalOpen(false);
    setEditingArticle({
      published: true,
      author: 'Alen Jusufović, Direktor & Softverski Inženjer',
      category: 'Softver & IT',
      date: new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  };

  const handleToggleArticlePublish = (articleId: string) => {
    const updated = articles.map((a) => {
      if (a.id === articleId) {
        return { ...a, published: !a.published };
      }
      return a;
    });
    saveNewsArticles(updated);
    setArticles(updated);
    showToast('Status objave članka je promijenjen!');
  };

  const handleDeleteArticle = (articleId: string, articleTitle: string) => {
    if (window.confirm(`Da li ste sigurni da želite obrisati članak: "${articleTitle}"?`)) {
      const updated = articles.filter((a) => a.id !== articleId);
      saveNewsArticles(updated);
      setArticles(updated);
      showToast('Članak je uspješno obrisan.');
    }
  };

  const handleRemoveImage = (itemId: string) => {
    if (window.confirm('Želite li ukloniti ovu originalnu sliku i vratiti standardni prikaz?')) {
      removeCustomImage(itemId);
      refreshData();
      showToast('Originalna slika je uklonjena.');
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="text-center space-y-3 font-mono text-[#00C9A7]">
          <div className="w-8 h-8 border-2 border-[#00C9A7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs">Provjera administratorskih prava...</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 1: LOGIN FORM (If not authenticated as admin)
  // ---------------------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center py-16 px-4 sm:px-6 font-sans">
        <PageSeo title="Administratorski Pristup | B&H Assistant d.o.o." noIndex={true} />
        
        <div className="w-full max-w-md bg-[#0F2038] border border-[#1A3152] rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C9A7]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] mx-auto shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-syne font-extrabold text-2xl text-white">
              Administratorski Portal
            </h1>
            <p className="text-xs font-mono text-[#C9A84C]">
              B&H Assistant d.o.o. Zenica • Zaštićena Zona
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8]/75 leading-relaxed font-sans">
            Ovaj dio aplikacije namijenjen je isključivo vlasniku portala za sigurno postavljanje fotografija, uređivanje tekstova usluga i proizvoda, te objavljivanje članaka.
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#F5F0E8]/80 mb-1">
                Administratorski E-mail:
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alenjusufovic@yahoo.com"
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2.5 text-xs text-white outline-none pl-10"
                />
                <Mail className="w-4 h-4 text-[#F5F0E8]/40 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#F5F0E8]/80 mb-1">
                Lozinka / Sigurnosni Kod:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="unesite lozinku..."
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2.5 text-xs text-white outline-none pl-10"
                />
                <Key className="w-4 h-4 text-[#F5F0E8]/40 absolute left-3 top-3" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] disabled:opacity-50 text-[#0A1628] font-syne font-extrabold text-xs tracking-wider transition-all shadow-lg shadow-[#00C9A7]/25 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Provjera autorizacije...' : 'Prijavi se u Admin Režim'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link to="/" className="text-xs font-mono text-[#00C9A7] hover:underline">
              ← Povratak na početnu stranicu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <PageSeo title="Admin Kontrolni Panel | B&H Assistant d.o.o." noIndex={true} />

      {/* Floating Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Status Header */}
        <header className="bg-[#0F2038] border border-[#00C9A7]/40 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Prijavljeni ste sa punim ovlaštenjima</span>
            </div>
            <h1 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
              Admin Kontrolna Tabla & CMS
            </h1>
            <p className="text-xs font-mono text-[#F5F0E8]/75">
              Korisnik: <strong className="text-white">{adminUser?.name || 'Alen Jusufović'}</strong> • (<span className="text-[#00C9A7]">{adminUser?.email || email}</span>)
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              to="/proizvodi-i-usluge"
              className="px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#00C9A7]/40 text-[#00C9A7] font-syne font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pregled Sajta</span>
            </Link>

            <button
              onClick={async () => {
                await logout();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/40 text-red-200 font-syne font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Odjava</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1A3152] gap-2 sm:gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'services'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Usluge & Tekstovi (Save / Edit / Publish)</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'articles'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>CMS Članci & Vijesti ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'images'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Upload Slika ({Object.keys(customImages).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'blocks'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Tekstualni Blokovi (In-Place CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'company'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Podaci o Kompaniji</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: USLUGE & PROIZVODI (TEXT & IMAGE EDIT / SAVE / PUBLISH)*/}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-syne font-bold text-base text-white">
                  Uređivanje Tekstova i Slika za 8 IT Usluga
                </h3>
                <p className="text-xs text-[#F5F0E8]/75 font-sans">
                  Kao vlasnik, možete izmijeniti naziv i kratki opis svake usluge, postaviti sliku, promijeniti status u Objavljeno/Nacrt i kliknuti <strong>Spremi Izmjene</strong>.
                </p>
              </div>
              <button
                onClick={refreshData}
                className="px-3.5 py-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#00C9A7] border border-[#00C9A7]/40 text-xs font-mono flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Osvježi Podatke</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPANY_SERVICES.map((srv) => {
                const draft = serviceDrafts[srv.id] || {};
                const customImg = customImages[srv.id];
                const isPub = draft.published !== false;

                return (
                  <div
                    key={srv.id}
                    className="bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/50 rounded-3xl p-5 space-y-4 shadow-xl transition-all"
                  >
                    {/* Card Top: Number, Publish status, Image actions */}
                    <div className="flex items-center justify-between border-b border-[#1A3152] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#0A1628] text-[#C9A84C] border border-[#1A3152]">
                          0{srv.number}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                            isPub
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                          }`}
                        >
                          {isPub ? 'Objavljeno' : 'Nacrt (Skriveno)'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleServicePublish(srv.id)}
                        className={`text-[11px] font-mono font-semibold px-3 py-1 rounded-lg border transition-colors ${
                          isPub
                            ? 'bg-yellow-950/30 text-yellow-300 border-yellow-500/40 hover:bg-yellow-900/40'
                            : 'bg-emerald-950/30 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                        }`}
                      >
                        {isPub ? 'Prebaci u Nacrt' : 'Objavi Uslugu'}
                      </button>
                    </div>

                    {/* Image row */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] shrink-0">
                        {customImg ? (
                          <img src={customImg} alt={srv.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#F5F0E8]/40 font-mono text-center p-1">
                            Standard foto
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 flex-1">
                        <button
                          type="button"
                          onClick={() =>
                            setUploadModal({
                              isOpen: true,
                              itemId: srv.id,
                              itemTitle: `Usluga 0${srv.number}: ${srv.title}`,
                              itemType: 'usluga',
                              currentImage: customImg || null
                            })
                          }
                          className="w-full py-1.5 px-3 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{customImg ? 'Promijeni Sliku' : 'Upload Slike (.jpg/.png)'}</span>
                        </button>

                        {customImg && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(srv.id)}
                            className="text-[10px] font-mono text-red-400 hover:text-red-300 underline block"
                          >
                            Ukloni originalnu sliku
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editable Fields */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                          Naziv Usluge (Title):
                        </label>
                        <input
                          type="text"
                          value={draft.title || ''}
                          onChange={(e) =>
                            setServiceDrafts((prev) => ({
                              ...prev,
                              [srv.id]: { ...prev[srv.id], title: e.target.value }
                            }))
                          }
                          className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                          Kratki opis za Google AdSense i posjetioce (Short Description):
                        </label>
                        <textarea
                          rows={2}
                          value={draft.shortDescription || ''}
                          onChange={(e) =>
                            setServiceDrafts((prev) => ({
                              ...prev,
                              [srv.id]: { ...prev[srv.id], shortDescription: e.target.value }
                            }))
                          }
                          className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                          Kompletan opis usluge:
                        </label>
                        <textarea
                          rows={3}
                          value={draft.description || ''}
                          onChange={(e) =>
                            setServiceDrafts((prev) => ({
                              ...prev,
                              [srv.id]: { ...prev[srv.id], description: e.target.value }
                            }))
                          }
                          className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-2 border-t border-[#1A3152] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#F5F0E8]/50">
                        Model: {srv.model}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSaveService(srv.id)}
                        className="px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Spremi Izmjene</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: CMS ČLANCI (CREATE / EDIT / PUBLISH / DELETE)          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152]">
              <div>
                <h3 className="font-syne font-bold text-base text-white">
                  CMS Upravljanje Člancima & Novostima
                </h3>
                <p className="text-xs text-[#F5F0E8]/75">
                  Dodajte novi članak, uredite postojeći tekst ili promijenite status objave (Save / Edit / Publish).
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingArticle({
                    id: `news-${Date.now()}`,
                    title: '',
                    slug: '',
                    category: 'Softver & IT',
                    date: new Date().toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' }),
                    author: 'Alen Jusufović, Direktor & Softverski Inženjer',
                    excerpt: '',
                    content: '',
                    published: true,
                    imageUrl: 'https://i.imgur.com/jf337m3.jpg',
                    tags: ['B&H Assistant']
                  });
                  setIsArticleModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#00C9A7]/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Kreiraj Novi Članak</span>
              </button>
            </div>

            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 rounded-2xl bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#0A1628] text-[#00C9A7] border border-[#1A3152]">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#F5F0E8]/50">{art.date}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          art.published !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {art.published !== false ? 'Objavljeno' : 'Nacrt (Skriveno)'}
                      </span>
                    </div>

                    <h4 className="font-syne font-bold text-base text-white">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#F5F0E8]/70 line-clamp-2">
                      {art.excerpt}
                    </p>
                    <span className="text-[10px] font-mono text-[#C9A84C] block">
                      Slug: /{art.slug || art.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {/* Toggle publish */}
                    <button
                      type="button"
                      onClick={() => handleToggleArticlePublish(art.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-colors ${
                        art.published !== false
                          ? 'bg-yellow-950/30 text-yellow-300 border-yellow-500/40 hover:bg-yellow-900/40'
                          : 'bg-emerald-950/30 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                      }`}
                      title={art.published !== false ? 'Prebaci u nacrt' : 'Objavi javno'}
                    >
                      {art.published !== false ? 'Sakrij' : 'Objavi'}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArticle(art);
                        setIsArticleModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] transition-colors"
                      title="Uredi članak"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* View */}
                    <Link
                      to={`/novosti?clanak=${encodeURIComponent(art.slug || art.id)}`}
                      className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#00C9A7] transition-colors"
                      title="Pregledaj članak na sajtu"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(art.id, art.title)}
                      className="p-2 rounded-xl bg-[#0A1628] hover:bg-red-900/40 text-red-400 border border-red-500/30 transition-colors"
                      title="Obriši članak"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CENTRALNA GALERIJA SLIKA & UPLOAD                      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'images' && (
          <div className="space-y-8">
            <div className="p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-syne font-bold text-base text-white">
                  Pregled i Upload Originalnih Fotografija
                </h3>
                <p className="text-xs text-[#F5F0E8]/75">
                  Ukupno postavljenih autorskih fotografija: {Object.keys(customImages).length}. Sve slike možete postaviti ovdje ili direktno na stranicama klikom na ikonicu kamere.
                </p>
              </div>
            </div>

            {/* SEKCIJA 1: BESPLATNI DIGITALNI PROIZVODI (POKLONI & PLUGINI) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="font-syne font-extrabold text-lg text-white">
                  Besplatni Digitalni Proizvodi (Bojanka & Audio Plugini)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 'free-product-gummi',
                    title: 'Bojanka GUMMI',
                    subtitle: 'Društvena odgovornost • Edukativna bojanka za djecu',
                    badge: 'Autorski Poklon',
                    defaultImg: '/images/gummi_bojanka.png'
                  },
                  {
                    id: 'free-product-multibender',
                    title: 'Multiband Delay & FX',
                    subtitle: 'W.A. Production Partner • VST/AU/AAX Plugin',
                    badge: 'Audio Plugin',
                    defaultImg: 'https://archive.org/download/w.-a.-production-bh-assistant/W.A.Production_BH_Assistant.png'
                  },
                  {
                    id: 'free-product-mturbodelay',
                    title: 'MTurboDelay',
                    subtitle: 'MeldaProduction Poklon • Multi-tap & Tape delay',
                    badge: 'Audio Plugin',
                    defaultImg: 'https://archive.org/download/w.-a.-production-bh-assistant/W.A.Production_BH_Assistant.png'
                  }
                ].map((item) => {
                  const img = customImages[item.id] || item.defaultImg;
                  const hasCustom = Boolean(customImages[item.id]);

                  return (
                    <div
                      key={item.id}
                      className="bg-[#0F2038] border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                          {img ? (
                            <img src={img} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-[#F5F0E8]/40 font-mono text-center p-2">
                              Nema slike
                            </div>
                          )}
                          {hasCustom && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                              Originalna foto
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-400">{item.badge}</span>
                          {hasCustom && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(item.id)}
                              className="text-[10px] font-mono text-red-400 hover:text-red-300 underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>

                        <h4 className="font-syne font-bold text-sm text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#F5F0E8]/70 line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setUploadModal({
                            isOpen: true,
                            itemId: item.id,
                            itemTitle: `Besplatni proizvod: ${item.title}`,
                            itemType: 'proizvod',
                            currentImage: customImages[item.id] || null
                          })
                        }
                        className="w-full py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40 font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{hasCustom ? 'Promijeni Sliku' : 'Upload Slike'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEKCIJA 2: GLAVNI SOFTVERSKI PROIZVODI & PROJEKTI */}
            <div className="space-y-4 pt-4 border-t border-[#1A3152]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h4 className="font-syne font-extrabold text-lg text-white">
                  Komercijalni Softverski Proizvodi & Razvojni Projekti
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    id: 'product-bh-konver',
                    title: 'BH KONVER',
                    subtitle: 'Digitalni kalkulator i pravni generator (www.bh-konver.com)',
                    badge: 'Softver'
                  },
                  {
                    id: 'product-bh-papirfinder',
                    title: 'BH PapirFinder',
                    subtitle: 'Centralni registar općinskih obrazaca (www.papir-finder.com)',
                    badge: 'e-Uprava'
                  },
                  {
                    id: 'product-ornamenti-bosne',
                    title: 'Ornamenti Bosne',
                    subtitle: 'Kodirani Stećci • Vektorski digitalni motivi (USB dostava)',
                    badge: 'Baština'
                  },
                  {
                    id: 'project-zentaxi',
                    title: 'ZENTAXI Zenica',
                    subtitle: 'Pametni dispečerski sistem i mobilna aplikacija',
                    badge: 'Razvoj'
                  }
                ].map((item) => {
                  const img = customImages[item.id];
                  const hasCustom = Boolean(img);

                  return (
                    <div
                      key={item.id}
                      className="bg-[#0F2038] border border-[#1A3152] hover:border-sky-500/50 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                          {img ? (
                            <img src={img} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-[#F5F0E8]/40 font-mono text-center p-2">
                              Standardna ilustracija
                            </div>
                          )}
                          {hasCustom && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                              Originalna foto
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-sky-400">{item.badge}</span>
                          {hasCustom && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(item.id)}
                              className="text-[10px] font-mono text-red-400 hover:text-red-300 underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>

                        <h4 className="font-syne font-bold text-sm text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#F5F0E8]/70 line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setUploadModal({
                            isOpen: true,
                            itemId: item.id,
                            itemTitle: `Proizvod: ${item.title}`,
                            itemType: 'proizvod',
                            currentImage: customImages[item.id] || null
                          })
                        }
                        className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{hasCustom ? 'Promijeni Sliku' : 'Upload Slike'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEKCIJA 3: 8 OSNOVNIH IT USLUGA */}
            <div className="space-y-4 pt-4 border-t border-[#1A3152]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C9A7]" />
                <h4 className="font-syne font-extrabold text-lg text-white">
                  8 B2B & IT Usluga Kompanije
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {COMPANY_SERVICES.map((serv) => {
                  const img = customImages[serv.id];
                  return (
                    <div
                      key={serv.id}
                      className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                          {img ? (
                            <img src={img} alt={serv.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-[#F5F0E8]/40 font-mono text-center p-2">
                              Standard foto
                            </div>
                          )}
                          {img && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold shadow">
                              Originalna foto
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#C9A84C]">Usluga 0{serv.number}</span>
                          {img && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(serv.id)}
                              className="text-[10px] font-mono text-red-400 hover:text-red-300 underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <h4 className="font-syne font-bold text-sm text-white line-clamp-1">
                          {serv.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setUploadModal({
                            isOpen: true,
                            itemId: serv.id,
                            itemTitle: `Usluga 0${serv.number}: ${serv.title}`,
                            itemType: 'usluga',
                            currentImage: img || null
                          })
                        }
                        className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{img ? 'Promijeni Sliku' : 'Postavi Sliku'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB: TEKSTUALNI BLOKOVI & IN-PLACE WYSIWYG KONTROLA          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'blocks' && (
          <div className="space-y-6">
            {/* Header info & Edit Mode Switch */}
            <div className="bg-[#0F2038] border border-[#00C9A7]/40 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00C9A7] uppercase tracking-wider font-bold">
                  In-Place WYSIWYG & Upravljanje Tekstovima
                </span>
                <h2 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                  Tekstualni Blokovi na Cijeloj Platformi
                </h2>
                <p className="text-xs text-[#F5F0E8]/75 max-w-2xl">
                  Sve naslove, slogane i paragrafe možete uređivati direktno na javnim stranicama klikom na tekst u <strong>Edit Mode-u</strong> ili centralizovano kroz tabelu ispod.
                </p>
              </div>

              {/* Direct Edit Mode Toggle */}
              <div className="flex items-center gap-3 bg-[#0A1628] border border-[#00C9A7]/40 rounded-2xl px-4 py-3 shadow-lg">
                <Edit3 className={`w-4 h-4 ${isEditMode ? 'text-[#00C9A7] animate-pulse' : 'text-[#F5F0E8]/50'}`} />
                <div className="text-left">
                  <div className="text-xs font-syne font-bold text-white">Režim Uređivanja:</div>
                  <div className="text-[10px] font-mono text-[#00C9A7]">
                    {isEditMode ? 'Aktivno (Kliknite na tekst na sajtu)' : 'Neaktivno'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEditMode ? 'bg-[#00C9A7]' : 'bg-[#1A3152]'
                  }`}
                  role="switch"
                  aria-checked={isEditMode}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#0A1628] shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isEditMode ? 'translate-x-5 bg-white' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Search & Actions Bar */}
            <div className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[240px]">
                <input
                  type="text"
                  value={blockSearch}
                  onChange={(e) => setBlockSearch(e.target.value)}
                  placeholder="Pretraži tekstualne blokove po ključu ili sadržaju..."
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-syne font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Idi na Početnu</span>
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm('Da li ste sigurni da želite poništiti sve izmijenjene tekstualne blokove na zadane vrijednosti?')) {
                      resetAllTextBlocks();
                      setTextBlocksState({});
                      showToast('Svi tekstualni blokovi su vraćeni na fabričke postavke.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-mono transition-colors"
                  title="Vrati sve na fabričke tekstove"
                >
                  Resetuj Sve Blokove
                </button>
              </div>
            </div>

            {/* List of text blocks */}
            {(() => {
              // Combine known keys and custom keys
              const allKeys = Array.from(new Set([
                ...Object.keys(DEFAULT_KNOWN_BLOCKS),
                ...Object.keys(textBlocks)
              ]));

              const filteredKeys = allKeys.filter((k) => {
                const label = DEFAULT_KNOWN_BLOCKS[k]?.label || '';
                const defaultVal = DEFAULT_KNOWN_BLOCKS[k]?.defaultValue || '';
                const currentVal = textBlocks[k] || defaultVal;
                const query = blockSearch.toLowerCase();
                return k.toLowerCase().includes(query) || label.toLowerCase().includes(query) || currentVal.toLowerCase().includes(query);
              });

              return (
                <div className="space-y-4">
                  {filteredKeys.length === 0 ? (
                    <div className="text-center py-12 bg-[#0F2038] rounded-2xl border border-[#1A3152] text-xs font-mono text-[#F5F0E8]/50">
                      Nema pronađenih tekstualnih blokova za unijeti pojam pretrage.
                    </div>
                  ) : (
                    filteredKeys.map((key) => {
                      const meta = DEFAULT_KNOWN_BLOCKS[key];
                      const defaultVal = meta?.defaultValue || '';
                      const isCustomized = textBlocks[key] !== undefined && textBlocks[key] !== defaultVal;
                      const currentValue = textBlocks[key] !== undefined ? textBlocks[key] : defaultVal;
                      const isEditingThis = editingBlockKey === key;

                      return (
                        <div
                          key={key}
                          className="bg-[#0F2038] border border-[#1A3152] hover:border-[#00C9A7]/40 rounded-2xl p-5 space-y-3 transition-all shadow-md"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A3152] pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#00C9A7] bg-[#0A1628] px-2.5 py-1 rounded-lg border border-[#00C9A7]/30">
                                {key}
                              </span>
                              {meta?.page && (
                                <span className="text-[10px] font-mono text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded border border-[#C9A84C]/20">
                                  {meta.page}
                                </span>
                              )}
                              <span className="text-xs font-syne font-semibold text-white">
                                {meta?.label || 'Prilagođeni Blok'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {isCustomized ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                                  Prilagođeni Tekst
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-mono">
                                  Zadano (Default)
                                </span>
                              )}

                              {!isEditingThis && (
                                <button
                                  onClick={() => {
                                    setEditingBlockKey(key);
                                    setEditingBlockVal(currentValue);
                                  }}
                                  className="px-3 py-1 rounded-lg bg-[#0A1628] hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/40 text-xs font-mono font-bold transition-colors flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Uredi</span>
                                </button>
                              )}

                              {isCustomized && !isEditingThis && (
                                <button
                                  onClick={() => handleResetBlock(key)}
                                  className="px-2.5 py-1 rounded-lg bg-red-950/20 hover:bg-red-900/40 text-red-300 border border-red-500/20 text-xs font-mono transition-colors"
                                  title="Vrati na originalni fabrički tekst"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Content or Edit Form */}
                          {isEditingThis ? (
                            <div className="space-y-3 pt-1">
                              <textarea
                                rows={3}
                                value={editingBlockVal}
                                onChange={(e) => setEditingBlockVal(e.target.value)}
                                className="w-full bg-[#0A1628] border-2 border-[#00C9A7] rounded-xl p-3 text-xs sm:text-sm text-white outline-none leading-relaxed"
                              />

                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-[#F5F0E8]/50">
                                  Zadana vrijednost: "{defaultVal.slice(0, 70)}{defaultVal.length > 70 ? '...' : ''}"
                                </span>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingBlockKey(null)}
                                    className="px-3 py-1.5 rounded-lg bg-[#0A1628] text-slate-300 hover:text-white text-xs font-mono"
                                  >
                                    Odustani
                                  </button>
                                  <button
                                    onClick={() => handleSaveBlock(key, editingBlockVal)}
                                    className="px-4 py-1.5 rounded-lg bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-1.5 shadow"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>Sačuvaj Blok</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-[#F5F0E8]/90 font-sans leading-relaxed bg-[#0A1628]/60 p-3 rounded-xl border border-[#1A3152]/40">
                              {currentValue}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })()}

            {/* Form to add a new custom text block key */}
            <div className="bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 space-y-4">
              <h3 className="font-syne font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#00C9A7]" />
                <span>Registruj Novi Tekstualni Blok (Za Bilo Koju Komponentu)</span>
              </h3>
              <form onSubmit={handleAddNewBlock} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    required
                    value={newBlockKey}
                    onChange={(e) => setNewBlockKey(e.target.value)}
                    placeholder="Ključ (npr. contact.form.title)"
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    required
                    value={newBlockValue}
                    onChange={(e) => setNewBlockValue(e.target.value)}
                    placeholder="Tekst koji se prikazuje..."
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center justify-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Dodaj</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: PODACI O KOMPANIJI & SIGURNOSNI PROFIL                 */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'company' && (
          <div className="bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A3152] pb-4">
              <div>
                <h3 className="font-syne font-bold text-lg text-white">
                  Zvanični Pravni Podaci & Administratorski Nalog
                </h3>
                <p className="text-xs text-[#F5F0E8]/75">
                  Podaci o kompaniji B&H Assistant d.o.o. Zenica i statusu aktivne sesije.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                Aktivan Administrator
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Puni Naziv:</strong>
                <span>{COMPANY_INFO.fullLegalName}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Osnivač & Vlasnik:</strong>
                <span>Alen Jusufović, dipl. inž. softvera</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#C9A84C] block text-[11px] mb-1">JIB:</strong>
                <span>{COMPANY_INFO.jib}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#C9A84C] block text-[11px] mb-1">MBS:</strong>
                <span>{COMPANY_INFO.mbs}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Adresa Sjedišta:</strong>
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Prijavljeni Admin E-mail:</strong>
                <span>{adminUser?.email || email}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Article Creation / Edit Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0F2038] border border-[#00C9A7]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1A3152] pb-3">
              <h3 className="font-syne font-bold text-lg text-white">
                {editingArticle.title ? 'Uredi Članak' : 'Kreiraj Novi Članak'}
              </h3>
              <button
                type="button"
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 rounded-xl bg-[#0A1628] text-white hover:text-[#00C9A7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                  Naslov Članka (Title) *
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="Unesite naslov članka..."
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                    Slug / URL Putanja
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    placeholder="primjer-naslova-clanka"
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                    Kategorija
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    placeholder="Softver & IT"
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                  Kratki Sažetak (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  placeholder="Kratki uvod za pregled..."
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                  Kompletan Tekst Članka *
                </label>
                <textarea
                  rows={6}
                  required
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Unesite puni sadržaj članka..."
                  className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2 text-white outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                    URL Slika Članka
                  </label>
                  <input
                    type="text"
                    value={editingArticle.imageUrl || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                    placeholder="https://i.imgur.com/..."
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#00C9A7] uppercase mb-1">
                    Status Objavljivanja
                  </label>
                  <select
                    value={editingArticle.published !== false ? 'true' : 'false'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.value === 'true' })}
                    className="w-full bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] rounded-xl px-4 py-2 text-white outline-none"
                  >
                    <option value="true">Javno Objavljeno (Published)</option>
                    <option value="false">Nacrt (Draft - Skriveno za javnost)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A3152] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0A1628] text-white hover:bg-[#1A3152] text-xs font-mono"
                >
                  Odustani
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Sačuvaj i Objavi Članak</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={uploadModal.isOpen}
        onClose={() => setUploadModal((prev) => ({ ...prev, isOpen: false }))}
        itemId={uploadModal.itemId}
        itemTitle={uploadModal.itemTitle}
        itemType={uploadModal.itemType}
        currentImage={uploadModal.currentImage}
        onImageSaved={() => refreshData()}
      />
    </div>
  );
};

export default AdminPage;
