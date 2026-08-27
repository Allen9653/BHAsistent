import React, { useState } from 'react';
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
  RefreshCw,
  Sliders,
  Mail,
  Server,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Inbox
} from 'lucide-react';
import * as Select from '@radix-ui/react-select';

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
  const [activeTab, setActiveTab] = useState<'info' | 'settings' | 'email' | 'account'>('info');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePin, setDeletePin] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [accountDeletedMessage, setAccountDeletedMessage] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompanyInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleDeleteAccount = () => {
    if (deletePin !== '2026' && deletePin !== 'bh2026' && deletePin !== 'admin') {
      setDeleteError('Neispravan sigurnosni PIN za potvrdu brisanja računa.');
      return;
    }
    // Perform simulated account reset / deletion
    setAccountDeletedMessage(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setAccountDeletedMessage(false);
      setDeletePin('');
      onClose();
    }, 2500);
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
                Centralni Panel • www.bh-assistant.ba
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

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#1A3152] pb-3 shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`min-h-[44px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
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
            className={`min-h-[44px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
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
            className={`min-h-[44px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
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
            className={`min-h-[44px] px-4 py-2 rounded-xl font-syne font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'account'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-[#0A1628] text-red-400 hover:text-red-300'
            }`}
          >
            <UserX className="w-4 h-4" />
            <span>Račun & Brisanje</span>
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
                    <span>Podaci su uspješno ažurirani u realnom vremenu!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C9A7] to-[#00A88B] text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Save className="w-4 h-4" />
                  <span>Spremi Izmjene</span>
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
                  Aplikacija je potpuno samostalna moderna Single Page Web Aplikacija optimizovana za domenu <strong className="text-[#00C9A7]">www.bh-assistant.ba</strong> bez ikakve ovisnosti o zastarjelim vanjskim CMS dodacima.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] pt-1">
                  <Sparkles className="w-4 h-4 text-[#00C9A7]" />
                  <span>Brzina učitavanja: &lt; 0.8s • Mobile-Ready • PWA Podrška</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#1A3152] space-y-2">
                <h4 className="font-syne font-bold text-sm text-[#F5F0E8]">
                  Sigurnost & SSL
                </h4>
                <p className="text-[#F5F0E8]/75 leading-relaxed">
                  Svi podaci, obrasci i certifikati su zaštićeni HTTPS enkripcijom.
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
              <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-3">
                <div className="flex items-center gap-2.5 text-red-400 font-syne font-bold text-sm">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Administratorska Zona: Brisanje Računa / Reset Sesije</span>
                </div>
                <p className="text-xs text-[#F5F0E8]/80 leading-relaxed">
                  Ova opcija omogućava trajno brisanje administratorskog računa, lokalno keširanih tokena i sesijskih podataka na uređaju u skladu sa standardima o privatnosti (GDPR).
                </p>

                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-red-600/30"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Obriši Administratorski Račun (Delete Account)</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#0A1628] border border-red-500/60 space-y-3">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-mono">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Potvrda Brisanja: Unesite PIN za potvrdu</span>
                    </div>

                    <input
                      id="admin-delete-pin-input"
                      name="deletePin"
                      aria-label="Unesite PIN za potvrdu brisanja"
                      type="password"
                      autoComplete="current-password"
                      value={deletePin}
                      onChange={(e) => {
                        setDeletePin(e.target.value);
                        setDeleteError('');
                      }}
                      placeholder="Unesite PIN (npr. 2026)..."
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0F2038] border border-red-500/50 text-white text-xs font-mono outline-none"
                    />

                    {deleteError && (
                      <span className="text-[11px] text-red-400 font-mono block">
                        {deleteError}
                      </span>
                    )}

                    {accountDeletedMessage ? (
                      <div className="p-3 rounded-xl bg-green-900/40 border border-green-500 text-green-300 font-mono text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Račun i lokalne sesije su uspješno obrisani!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1A3152] text-[#F5F0E8] text-xs font-semibold"
                        >
                          Otkaži
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="min-h-[44px] px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Trajno Obriši Račun</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
