import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  ShieldCheck, 
  Server, 
  Calendar, 
  BookOpen, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Lock, 
  AlertTriangle,
  Send,
  Sparkles,
  Inbox
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface EmailConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailConfigModal: React.FC<EmailConfigModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A1628]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        role="dialog"
        aria-label="Postavke e-mail klijenta"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl rounded-3xl bg-[#0F2038] border-2 border-[#00C9A7] shadow-2xl p-6 sm:p-8 space-y-6 text-[#F5F0E8] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A3152] pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A1628] border border-[#00C9A7] flex items-center justify-center text-[#00C9A7] shadow-lg">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#00C9A7] uppercase">
                  ZVANIČNI INBOX & CLIENT SETUP
                </span>
                <span className="text-[11px] font-mono text-[#C9A84C]">
                  mail.bh-assistant.ba
                </span>
              </div>
              <h3 className="font-syne font-extrabold text-xl text-[#F5F0E8]">
                Konfiguracija E-mail Sandučeta & Webmail
              </h3>
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 text-xs font-sans">
          
          {/* Quick Access Action Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A1628] via-[#12233B] to-[#0A1628] border border-[#00C9A7]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00C9A7]" />
                <span className="font-syne font-bold text-sm text-[#F5F0E8]">
                  Službena E-mail Adresa: <span className="text-[#00C9A7] font-mono">info@bh-assistant.ba</span>
                </span>
              </div>
              <p className="text-[11px] text-[#F5F0E8]/70">
                Pristupite direktno web interfejsu (cPanel Webmail: Roundcube / Horde) ili povežite Outlook, Thunderbird, iOS Mail i Android.
              </p>
            </div>

            <a
              href="https://mail.bh-assistant.ba:2096"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-all flex items-center gap-2 shadow-lg shrink-0"
            >
              <span>Otvori Webmail</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Section 1: Secure SSL/TLS Settings (Recommended) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00C9A7]" />
              <h4 className="font-syne font-bold text-sm text-[#F5F0E8] uppercase tracking-wider">
                Preporučene Sigurne Postavke (Secure SSL/TLS)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
              
              {/* Username */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between">
                <div>
                  <span className="text-[#F5F0E8]/60 block text-[10px]">KORISNIČKO IME (Username):</span>
                  <span className="text-[#00C9A7] font-bold">info@bh-assistant.ba</span>
                </div>
                <button
                  onClick={() => copyToClipboard('info@bh-assistant.ba', 'username')}
                  className="p-1.5 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] transition-colors"
                  title="Kopiraj"
                >
                  {copiedKey === 'username' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Password info */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between">
                <div>
                  <span className="text-[#F5F0E8]/60 block text-[10px]">LOZINKA (Password):</span>
                  <span className="text-[#C9A84C] font-bold">Postavljena lozinka email računa</span>
                </div>
                <Lock className="w-4 h-4 text-[#C9A84C]" />
              </div>

              {/* Incoming Server */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between">
                <div>
                  <span className="text-[#F5F0E8]/60 block text-[10px]">DOLAZNI POSLUŽITELJ (Incoming):</span>
                  <span className="text-[#F5F0E8] font-bold">mail.bh-assistant.ba</span>
                  <div className="text-[10px] text-[#00C9A7] mt-0.5">
                    IMAP Port: <strong className="text-white">993</strong> | POP3 Port: <strong className="text-white">995</strong>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('mail.bh-assistant.ba', 'incoming')}
                  className="p-1.5 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] transition-colors"
                  title="Kopiraj"
                >
                  {copiedKey === 'incoming' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Outgoing Server */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between">
                <div>
                  <span className="text-[#F5F0E8]/60 block text-[10px]">ODLAZNI POSLUŽITELJ (Outgoing SMTP):</span>
                  <span className="text-[#F5F0E8] font-bold">mail.bh-assistant.ba</span>
                  <div className="text-[10px] text-[#00C9A7] mt-0.5">
                    SMTP Port: <strong className="text-white">465</strong> (SSL Autentifikacija)
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('mail.bh-assistant.ba', 'outgoing')}
                  className="p-1.5 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] transition-colors"
                  title="Kopiraj"
                >
                  {copiedKey === 'outgoing' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Section 2: Calendar & Contacts (CalDAV & CardDAV) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-syne font-bold text-sm text-[#F5F0E8] uppercase tracking-wider">
                Sinhronizacija Kalendara & Kontakata (CalDAV / CardDAV)
              </h4>
            </div>

            <div className="space-y-2.5 font-mono text-[11px]">
              
              {/* CalDAV Calendar */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-[#F5F0E8]/60 block text-[10px]">cPanel CalDAV Kalendar URL (SSL Port 2080):</span>
                  <span className="text-[#00C9A7] font-bold select-all truncate block">
                    https://mail.bh-assistant.ba:2080/calendars/info@bh-assistant.ba/calendar
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard('https://mail.bh-assistant.ba:2080/calendars/info@bh-assistant.ba/calendar', 'caldav')}
                  className="p-1.5 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] shrink-0 transition-colors"
                  title="Kopiraj CalDAV URL"
                >
                  {copiedKey === 'caldav' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* CardDAV Address Book */}
              <div className="p-3.5 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-[#F5F0E8]/60 block text-[10px]">cPanel CardDAV Adresar URL (SSL Port 2080):</span>
                  <span className="text-[#C9A84C] font-bold select-all truncate block">
                    https://mail.bh-assistant.ba:2080/addressbooks/info@bh-assistant.ba/addressbook
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard('https://mail.bh-assistant.ba:2080/addressbooks/info@bh-assistant.ba/addressbook', 'carddav')}
                  className="p-1.5 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] text-[#C9A84C] shrink-0 transition-colors"
                  title="Kopiraj CardDAV URL"
                >
                  {copiedKey === 'carddav' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[11px] text-[#F5F0E8]/70 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
            <p>
              Svi dolazni upiti poslani kroz kontakt forme na <strong className="text-white">www.bh-assistant.ba</strong> se automatski usmjeravaju na <strong className="text-[#00C9A7]">info@bh-assistant.ba</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1A3152] pt-4 shrink-0">
          <span className="text-[11px] font-mono text-[#F5F0E8]/50">
            B&H Assistant d.o.o. Zenica • Sistem Pošte
          </span>
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs transition-all shadow-md"
          >
            Zatvori Postavke
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfigModal;
