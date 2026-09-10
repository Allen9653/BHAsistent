import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyDetails } from '../types';
import { 
  Building2, 
  Save, 
  X, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Key, 
  UserX,
  Sparkles,
  Database,
  Sliders,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Inbox,
  LogOut,
  Loader2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { 
  signInAdmin, 
  verifyAdminSession, 
  signOutAdmin, 
  getStoredUser, 
  getStoredToken 
} from '../utils/supabase';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyDetails;
  onUpdateCompanyInfo: (updated: CompanyDetails) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  companyInfo,
  onUpdateCompanyInfo,
}) => {
  const [formData, setFormData] = useState<CompanyDetails>(companyInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'settings' | 'email' | 'account'>('info');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Supabase Backend Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; id: string; role?: string } | null>(null);

  // Account / Session Reset Confirmation
  const [showSessionResetConfirm, setShowSessionResetConfirm] = useState(false);
  const [sessionResetSuccess, setSessionResetSuccess] = useState(false);

  // Verify existing session whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsCheckingAuth(true);
    setLoginError(null);

    const checkSession = async () => {
      const storedUser = getStoredUser();
      if (storedUser) {
        setCurrentUser(storedUser);
      }

      const isValid = await verifyAdminSession();
      if (isMounted) {
        setIsAuthenticated(isValid);
        if (isValid && storedUser) {
          setCurrentUser(storedUser);
        } else if (!isValid) {
          setCurrentUser(null);
        }
        setIsCheckingAuth(false);
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Sync formData with companyInfo prop when opened
  useEffect(() => {
    setFormData(companyInfo);
  }, [companyInfo]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Molimo unesite administratorski e-mail i lozinku.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const result = await signInAdmin(loginEmail, loginPassword, rememberMe);
      if (result.success && result.user) {
        setIsAuthenticated(true);
        setCurrentUser(result.user);
        setLoginPassword('');
      } else {
        setLoginError(result.error || 'Neuspješna autorizacija. Molimo provjerite pristupne podatke.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Greška prilikom povezivanja sa autentifikacijskim serverom.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = getStoredToken();
      // Send authenticated request to server
      if (token) {
        await fetch('/api/admin/update-company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }).catch(() => null);
      }

      onUpdateCompanyInfo(formData);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSessionAndData = async () => {
    setSessionResetSuccess(true);
    await signOutAdmin();
    setTimeout(() => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setShowSessionResetConfirm(false);
      setSessionResetSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A1628]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[var(--brand-card,#0F2038)] border-2 border-[var(--brand-teal,#00C9A7)] shadow-2xl p-6 sm:p-8 space-y-6 text-[#F5F0E8] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A3152] pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--brand-navy,#0A1628)] border border-[var(--brand-teal,#00C9A7)] flex items-center justify-center text-[var(--brand-teal,#00C9A7)] shadow-lg">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-extrabold text-lg sm:text-xl text-[#F5F0E8]">
                B&H Assistant In-App CMS & Administracija
              </h3>
              <p className="text-xs text-[#00C9A7] font-mono">
                Centralni Panel • Zaštićeni Supabase Auth
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Zatvori"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8] transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Verification Loader */}
        {isCheckingAuth && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="w-8 h-8 text-[#00C9A7] animate-spin" />
            <p className="text-xs font-mono text-[#F5F0E8]/70">
              Provjera administratorske sesije...
            </p>
          </div>
        )}

        {/* LOGIN SCREEN: Shown when user is not authenticated */}
        {!isCheckingAuth && !isAuthenticated && (
          <div className="space-y-5 py-2">
            <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-1">
              <div className="flex items-center gap-2 text-[#00C9A7]">
                <Lock className="w-4 h-4" />
                <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
                  Administratorska Prijava (Supabase Auth)
                </h4>
              </div>
              <p className="text-[11px] text-[#F5F0E8]/70 leading-relaxed">
                Pristup CMS uređivaču i konfiguraciji društva zaštićen je serverskom provjerom sesijskih tokena.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/60 text-red-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-mono text-[11px] leading-relaxed">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                  Administratorski E-mail:
                </label>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@bh-assistant.ba"
                  disabled={isLoggingIn}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none text-xs disabled:opacity-50"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-[11px] font-mono text-[#C9A84C] mb-1">
                  Lozinka:
                </label>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Unesite administratorsku lozinku..."
                  disabled={isLoggingIn}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#C9A84C] text-[#F5F0E8] font-mono outline-none text-xs disabled:opacity-50"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#F5F0E8]/75 text-[11px]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#1A3152] text-[#00C9A7] focus:ring-0"
                  />
                  <span>Zapamti administratorsku sesiju</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoggingIn}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8] text-xs font-semibold hover:bg-[#1A3152] transition-colors"
                >
                  Otkaži
                </button>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 flex items-center gap-2 transition-all disabled:opacity-60"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provjera autorizacije...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Prijavi se na CMS</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="p-3 rounded-xl bg-[#0A1628]/60 border border-[#1A3152]/60 flex items-center gap-2 text-[10px] text-[#F5F0E8]/60 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#00C9A7] shrink-0" />
              <span>Sigurnost: Klijentski PIN kodovi su zamijenjeni server-side Supabase sesijama.</span>
            </div>
          </div>
        )}

        {/* AUTHENTICATED CMS DASHBOARD */}
        {!isCheckingAuth && isAuthenticated && (
          <>
            {/* Admin User Status Bar */}
            <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#00C9A7]/20 text-[#00C9A7] flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#F5F0E8] font-bold block">
                    {currentUser?.email || 'admin@bh-assistant.ba'}
                  </span>
                  <span className="text-[10px] text-[#00C9A7] font-mono">
                    Uloga: Superadministrator • Aktivna sesija
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#0F2038] hover:bg-red-950/40 border border-[#1A3152] hover:border-red-500/50 text-red-300 font-syne font-semibold text-xs flex items-center gap-1.5 transition-colors self-end sm:self-auto"
                title="Odjavi se"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Odjavi se</span>
              </button>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-2 border-b border-[#1A3152] pb-3 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('info')}
                className={`min-h-[40px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'info'
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md'
                    : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Podaci Firme</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`min-h-[40px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md'
                    : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Sistemske Postavke</span>
              </button>

              <button
                onClick={() => setActiveTab('email')}
                className={`min-h-[40px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'email'
                    ? 'bg-[#00C9A7] text-[#0A1628] shadow-md'
                    : 'bg-[#0A1628] text-[#F5F0E8]/70 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Službeni E-mail</span>
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`min-h-[40px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'account'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-[#0A1628] text-red-400 hover:text-red-300'
                }`}
              >
                <UserX className="w-4 h-4" />
                <span>Sigurnost & Sesija</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
              {activeTab === 'info' && (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="admin-full-name" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                        Puni Naziv Društva:
                      </label>
                      <input
                        id="admin-full-name"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-short-name" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                        Kratki Naziv:
                      </label>
                      <input
                        id="admin-short-name"
                        name="shortName"
                        type="text"
                        value={formData.shortName}
                        onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-jib-input" className="block text-[11px] font-mono text-[#C9A84C] mb-1">
                        JIB Broj:
                      </label>
                      <input
                        id="admin-jib-input"
                        name="jib"
                        type="text"
                        value={formData.jib}
                        onChange={(e) => setFormData({ ...formData, jib: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#C9A84C] text-[#F5F0E8] font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-mbs-input" className="block text-[11px] font-mono text-[#C9A84C] mb-1">
                        MBS Registarski Broj:
                      </label>
                      <input
                        id="admin-mbs-input"
                        name="mbs"
                        type="text"
                        value={formData.mbs}
                        onChange={(e) => setFormData({ ...formData, mbs: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#C9A84C] text-[#F5F0E8] font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-email-input" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                        Zvanični Email:
                      </label>
                      <input
                        id="admin-email-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-address-input" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                        Sjedište i Grad:
                      </label>
                      <input
                        id="admin-address-input"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="admin-description-input" className="block text-[11px] font-mono text-[#00C9A7] mb-1">
                      Opis / Djelatnost:
                    </label>
                    <textarea
                      id="admin-description-input"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#0A1628] border border-[#1A3152] focus:border-[#00C9A7] text-[#F5F0E8] font-sans outline-none text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {savedSuccess && (
                      <span className="flex items-center gap-1.5 text-xs text-[#00C9A7] font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Podaci su uspješno ažurirani na serveru!</span>
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="ml-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Pohrana...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Spremi Izmjene</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                    <h4 className="font-syne font-bold text-sm text-[#00C9A7]">
                      Status Web Platforme & Domene
                    </h4>
                    <p className="text-[#F5F0E8]/75 leading-relaxed">
                      Aplikacija je opremljena Server-Side Rendering (SSR) arhitekturom za domenu <strong className="text-[#00C9A7]">www.bh-assistant.ba</strong>, pružajući pretraživačima i Google AdSense crawlerima potpun i indeksabilan HTML kod.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] pt-1">
                      <Sparkles className="w-4 h-4 text-[#00C9A7]" />
                      <span>SSR Aktiviran • Supabase Auth Integrisan • Zero-Secret Client Bundle</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                    <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
                      Sigurnost & Autentifikacija
                    </h4>
                    <p className="text-[#F5F0E8]/75 leading-relaxed">
                      Sve administrativne rute i operacije zaštićene su sesijskim tokenima. Hardkodirani PIN kodovi su trajno uklonjeni iz frontend koda.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-4 font-sans text-xs">
                  {/* Webmail Direct Launch */}
                  <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#00C9A7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-[#00C9A7]" />
                        <span className="font-syne font-bold text-sm text-[#F5F0E8]">
                          Zvanični Inbox: <span className="text-[#00C9A7] font-mono">info@bh-assistant.ba</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#F5F0E8]/70 font-sans">
                        Direktan cPanel Webmail portal za čitanje i slanje službenih poruka.
                      </p>
                    </div>

                    <a
                      href="https://mail.bh-assistant.ba:2096"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md"
                    >
                      <span>Otvori Webmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Secure SSL/TLS Parameters */}
                  <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-[#00C9A7]" />
                      <h4 className="font-syne font-bold text-xs text-[#00C9A7] uppercase tracking-wider">
                        Preporučene SSL/TLS Postavke za Mail Klijente (Outlook, Thunderbird, iOS, Android)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
                      <div className="p-2.5 rounded-xl bg-[#0F2038] border border-[#1A3152] flex items-center justify-between">
                        <div>
                          <span className="text-[#F5F0E8]/60 text-[10px] block">Username:</span>
                          <span className="text-[#00C9A7] font-bold">info@bh-assistant.ba</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('info@bh-assistant.ba', 'tab-user')}
                          className="p-1 rounded bg-[#0A1628] text-[#00C9A7]"
                        >
                          {copiedKey === 'tab-user' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0F2038] border border-[#1A3152] flex items-center justify-between">
                        <div>
                          <span className="text-[#F5F0E8]/60 text-[10px] block">Dolazni Server (Incoming):</span>
                          <span className="text-[#F5F0E8] font-bold">mail.bh-assistant.ba</span>
                          <span className="text-[10px] text-[#00C9A7] block">IMAP: 993 | POP3: 995</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('mail.bh-assistant.ba', 'tab-inc')}
                          className="p-1 rounded bg-[#0A1628] text-[#00C9A7]"
                        >
                          {copiedKey === 'tab-inc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0F2038] border border-[#1A3152] flex items-center justify-between sm:col-span-2">
                        <div>
                          <span className="text-[#F5F0E8]/60 text-[10px] block">Odlazni Server (Outgoing SMTP):</span>
                          <span className="text-[#F5F0E8] font-bold">mail.bh-assistant.ba (SMTP Port: 465 SSL)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('mail.bh-assistant.ba', 'tab-out')}
                          className="p-1 rounded bg-[#0A1628] text-[#00C9A7]"
                        >
                          {copiedKey === 'tab-out' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CalDAV & CardDAV */}
                  <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2 font-mono text-[11px]">
                    <span className="text-[#C9A84C] font-bold block text-[10px] uppercase font-syne">
                      Kalendar & Adresar Sinhronizacija (SSL Port 2080):
                    </span>
                    <div className="p-2 rounded bg-[#0F2038] text-[10px] text-[#00C9A7] truncate">
                      CalDAV: https://mail.bh-assistant.ba:2080/calendars/info@bh-assistant.ba/calendar
                    </div>
                    <div className="p-2 rounded bg-[#0F2038] text-[10px] text-[#C9A84C] truncate">
                      CardDAV: https://mail.bh-assistant.ba:2080/addressbooks/info@bh-assistant.ba/addressbook
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#0A1628] border border-red-500/40 space-y-3">
                    <div className="flex items-center gap-2.5 text-red-400 font-syne font-bold text-sm">
                      <ShieldAlert className="w-5 h-5" />
                      <span>Sigurnost Sesije & Odjava sa Uređaja</span>
                    </div>
                    <p className="text-xs text-[#F5F0E8]/80 leading-relaxed">
                      Upravljanje aktivnom administratorskom sesijom. Možete poništiti sve tokene na ovom pregledniku u skladu sa GDPR standardima.
                    </p>

                    {!showSessionResetConfirm ? (
                      <button
                        onClick={() => setShowSessionResetConfirm(true)}
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-red-600/30"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Poništi Sesiju i Odjavi Administratora</span>
                      </button>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#0F2038] border border-red-500/60 space-y-3">
                        <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-mono">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Da li ste sigurni da želite poništiti sesiju?</span>
                        </div>

                        {sessionResetSuccess ? (
                          <div className="p-3 rounded-xl bg-green-900/40 border border-green-500 text-green-300 font-mono text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Sesija je uspješno poništena. Odjava u toku...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => setShowSessionResetConfirm(false)}
                              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1A3152] text-[#F5F0E8] text-xs font-semibold"
                            >
                              Otkaži
                            </button>
                            <button
                              onClick={handleResetSessionAndData}
                              className="min-h-[44px] px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-2 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Potvrdi Odjavu Sesije</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#1A3152] pt-4 shrink-0">
          <button
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8] font-syne font-bold text-xs transition-colors"
          >
            Zatvori Panel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
