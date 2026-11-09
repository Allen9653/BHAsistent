import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { COMPANY_SERVICES, DEVELOPMENT_PROJECTS, COMPANY_INFO } from '../data/companyData';
import { getStoredNews, NewsArticle } from '../data/newsData';
import { getAllCustomImages } from '../utils/customImagesStorage';
import { ImageUploadModal } from '../components/ImageUploadModal';
import { PageSeo } from '../components/PageSeo';

export const AdminPage: React.FC = () => {
  const { isAdmin, adminUser, login, logout, isChecking } = useAdminAuth();

  // Login form state
  const [email, setEmail] = useState('alen.jusufovic@skilledbridge.ba');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin dashboard tabs
  const [activeTab, setActiveTab] = useState<'images' | 'articles' | 'company'>('images');
  const [articles, setArticles] = useState<NewsArticle[]>(() => (typeof window !== 'undefined' ? getStoredNews() : []));
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => getAllCustomImages());

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

  const refreshCustomImages = () => {
    setCustomImages(getAllCustomImages());
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
  // VIEW 1: LOGIN FORM (If not logged in)
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
            Ovaj dio stranice namijenjen je isključivo vlasniku i uredništvu portala za sigurno postavljanje originalnih fotografija, uređivanje tekstova i vođenje CMS članaka.
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
                  placeholder="unesite admin email..."
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

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Status Header */}
        <header className="bg-[#0F2038] border border-[#00C9A7]/40 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Prijavljeni ste sa punim administratorskim ovlaštenjima</span>
            </div>
            <h1 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
              Admin Kontrolna Tabla
            </h1>
            <p className="text-xs font-mono text-[#F5F0E8]/75">
              Korisnik: <strong className="text-white">{adminUser?.name || 'Alen Jusufović'}</strong> • ({adminUser?.email || 'Vlasnik'})
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
            onClick={() => setActiveTab('images')}
            className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'images'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow-lg shadow-[#00C9A7]/20'
                : 'bg-[#0F2038] text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Upravljanje Slikama (8 Usluga & Proizvodi)</span>
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
            <span>CMS Članci ({articles.length})</span>
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
        {/* TAB 1: UPRAVLJANJE SLIKAMA                                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'images' && (
          <div className="space-y-8">
            <div className="p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-syne font-bold text-base text-white">
                  Postavljanje i izmjena originalnih fotografija
                </h3>
                <p className="text-xs text-[#F5F0E8]/75 font-sans">
                  Kao vlasnik, ovdje možete u svakom trenutku postaviti Vaše autentične .jpg / .png fotografije. Posjetioci sajta ne mogu mijenjati niti uploadovati slike.
                </p>
              </div>
              <Link
                to="/proizvodi-i-usluge"
                className="px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-colors"
              >
                Idi na Proizvodi & Usluge
              </Link>
            </div>

            {/* 8 IT Usluga */}
            <div className="space-y-4">
              <h3 className="font-syne font-bold text-lg text-[#00C9A7] flex items-center gap-2">
                <Layers className="w-5 h-5" />
                <span>8 IT Usluga Kompanije — Slike i Vizuali</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {COMPANY_SERVICES.map((serv) => {
                  const hasCustom = Boolean(customImages[serv.id]);
                  return (
                    <div
                      key={serv.id}
                      className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                          {hasCustom ? (
                            <img
                              src={customImages[serv.id]}
                              alt={serv.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-[10px] font-mono text-[#F5F0E8]/50">
                              Nema originalne slike
                            </div>
                          )}
                          <span
                            className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                              hasCustom ? 'bg-[#00C9A7] text-[#0A1628]' : 'bg-[#1A3152] text-[#F5F0E8]/70'
                            }`}
                          >
                            {hasCustom ? 'Originalna foto' : 'Standard'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#C9A84C]">0{serv.number}</span>
                          <h4 className="font-syne font-bold text-xs text-white line-clamp-1">
                            {serv.title}
                          </h4>
                          <p className="text-[11px] text-[#F5F0E8]/70 line-clamp-2 mt-0.5">
                            {serv.shortDescription}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setUploadModal({
                            isOpen: true,
                            itemId: serv.id,
                            itemTitle: `Usluga 0${serv.number}: ${serv.title}`,
                            itemType: 'usluga',
                            currentImage: customImages[serv.id] || null
                          })
                        }
                        className="w-full py-2 px-3 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{hasCustom ? 'Promijeni sliku' : 'Postavi sliku'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proizvodi i Razvojni Projekti */}
            <div className="space-y-4 pt-4">
              <h3 className="font-syne font-bold text-lg text-[#C9A84C] flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Softverski Proizvodi i Projekti (BH Konver, PapirFinder, Ornamenti...)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* BH Konver */}
                <div className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                      <img
                        src={customImages['product-bh-konver'] || 'https://i.imgur.com/WIdimeI.jpg'}
                        alt="BH Konver"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-syne font-bold text-sm text-white">BH KONVER</h4>
                    <p className="text-xs text-[#00C9A7] font-mono">www.bh-konver.com</p>
                  </div>
                  <button
                    onClick={() =>
                      setUploadModal({
                        isOpen: true,
                        itemId: 'product-bh-konver',
                        itemTitle: 'BH KONVER (www.bh-konver.com)',
                        itemType: 'proizvod',
                        currentImage: customImages['product-bh-konver'] || null
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{customImages['product-bh-konver'] ? 'Promijeni sliku' : 'Postavi sliku'}</span>
                  </button>
                </div>

                {/* BH PapirFinder */}
                <div className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                      <img
                        src={customImages['product-bh-papirfinder'] || 'https://i.imgur.com/QfHNQIV.jpg'}
                        alt="BH PapirFinder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-syne font-bold text-sm text-white">BH PapirFinder</h4>
                    <p className="text-xs text-[#C9A84C] font-mono">www.papir-finder.com</p>
                  </div>
                  <button
                    onClick={() =>
                      setUploadModal({
                        isOpen: true,
                        itemId: 'product-bh-papirfinder',
                        itemTitle: 'BH PapirFinder (www.papir-finder.com)',
                        itemType: 'proizvod',
                        currentImage: customImages['product-bh-papirfinder'] || null
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{customImages['product-bh-papirfinder'] ? 'Promijeni sliku' : 'Postavi sliku'}</span>
                  </button>
                </div>

                {/* Ornamenti Bosne */}
                <div className="bg-[#0F2038] border border-[#1A3152] rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative">
                      <img
                        src={customImages['product-ornamenti-bosne'] || 'https://i.imgur.com/nWGl9Gf.jpg'}
                        alt="Ornamenti Bosne"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-syne font-bold text-sm text-white">Ornamenti Bosne</h4>
                    <p className="text-xs text-[#00C9A7] font-mono">Stećci & USB Dostava</p>
                  </div>
                  <button
                    onClick={() =>
                      setUploadModal({
                        isOpen: true,
                        itemId: 'product-ornamenti-bosne',
                        itemTitle: 'Ornamenti Bosne (Kodirani Stećci)',
                        itemType: 'proizvod',
                        currentImage: customImages['product-ornamenti-bosne'] || null
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628] font-syne font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{customImages['product-ornamenti-bosne'] ? 'Promijeni sliku' : 'Postavi sliku'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: CMS ČLANCI                                              */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152]">
              <div>
                <h3 className="font-syne font-bold text-base text-white">
                  CMS Upravljanje Člancima & Vijestima
                </h3>
                <p className="text-xs text-[#F5F0E8]/75">
                  Dodajte nove objave, uređujte postojeće ili izbrišite nepotreban sadržaj.
                </p>
              </div>
              <Link
                to="/novosti"
                className="px-4 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Otvori Novosti i Dodaj Članak</span>
              </Link>
            </div>

            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-2xl bg-[#0F2038] border border-[#1A3152] flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0A1628] text-[#00C9A7]">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#F5F0E8]/50">{art.date}</span>
                    </div>
                    <h4 className="font-syne font-bold text-sm text-white">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#F5F0E8]/70 line-clamp-1">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/novosti?clanak=${encodeURIComponent(art.slug || art.id)}`}
                      className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#00C9A7] transition-colors"
                      title="Pregledaj članak"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: PODACI O KOMPANIJI                                     */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'company' && (
          <div className="bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-syne font-bold text-lg text-white">
                Zvanični Pravni Podaci Firme
              </h3>
              <p className="text-xs text-[#F5F0E8]/75">
                Podaci registrovani u sudskom registru i Poreskoj upravi FBiH.
              </p>
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
                <strong className="text-[#C9A84C] block text-[11px] mb-1">JIB (Jedinstveni ID Broj):</strong>
                <span>{COMPANY_INFO.jib}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#C9A84C] block text-[11px] mb-1">MBS (Matični Broj Subjekta):</strong>
                <span>{COMPANY_INFO.mbs}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Sjedište i Adresa:</strong>
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152]">
                <strong className="text-[#00C9A7] block text-[11px] mb-1">Kontakt E-mail i Telefon:</strong>
                <span>{COMPANY_INFO.email} • {COMPANY_INFO.phone}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={uploadModal.isOpen}
        onClose={() => setUploadModal((prev) => ({ ...prev, isOpen: false }))}
        itemId={uploadModal.itemId}
        itemTitle={uploadModal.itemTitle}
        itemType={uploadModal.itemType}
        currentImage={uploadModal.currentImage}
        onImageSaved={() => refreshCustomImages()}
      />
    </div>
  );
};

export default AdminPage;
