import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, CheckCircle2, MessageSquare, Building, Clock, Server, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { EmailConfigModal } from './EmailConfigModal';

export const ContactAndImpressum: React.FC = () => {
  const { t } = useLanguage();
  const [showEmailConfig, setShowEmailConfig] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Opći Upit',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Create mailto fallback for direct client sending
    const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`[${formData.subject}] Upit sa sajta od ${formData.name}`)}&body=${encodeURIComponent(`Ime pošiljaoca: ${formData.name}\nEmail: ${formData.email}\nKategorija: ${formData.subject}\n\nPoruka:\n${formData.message}`)}`;
    
    setSubmitted(true);
    // Optional fallback trigger
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Opći Upit', message: '' });
    }, 4000);
  };

  return (
    <section id="kontakt" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/30 text-[#00C9A7] text-xs font-mono tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('contact.badge', 'PITAJTE NAS • ZENICA, BIH')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('contact.title', 'Stupite u Kontakt sa B&H Assistant Timom')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed">
            {t('contact.subtitle', 'Spremno odgovaramo na sva vaša pitanja u vezi naših softvera, ponuda, sponzorstava i poslovnih integracija.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8 shadow-2xl relative overflow-hidden">
            {/* Header Graphic Banner */}
            <div className="mb-6 rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628]">
              <SafeImage
                src={IMAGES.posaljitePoruku}
                alt="Pošaljite Poruku Našem Timu"
                fallbackTitle="Pošaljite Poruku"
                fallbackSubtitle="B&H Assistant Tim"
                className="w-full h-auto max-h-48 object-cover"
              />
            </div>

            <h3 className="font-syne font-bold text-2xl text-[#F5F0E8] mb-2">
              Pošaljite Poruku Našem Timu
            </h3>
            <p className="text-xs text-[#F5F0E8]/70 mb-6 font-sans">
              Odgovaramo na sve poslovne i tehničke upite u roku od 24 sata.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#0A1628] border-2 border-[#00C9A7] text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#00C9A7] mx-auto animate-bounce" />
                <h4 className="font-syne font-bold text-xl text-[#F5F0E8]">
                  Hvala Vam na Poruci!
                </h4>
                <p className="text-xs text-[#F5F0E8]/80 max-w-md mx-auto font-sans">
                  Vaša poruka je uspješno poslana timu B&H Assistant d.o.o. Zenica. Kontaktiraćemo Vas uskoro na navedenu e-mail adresu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#F5F0E8]/80 mb-1.5">Ime i Prezime / Firma</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="npr. Marko Marković"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#F5F0E8]/80 mb-1.5">E-mail Adresa</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vasa@adresa.ba"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#F5F0E8]/80 mb-1.5">Kategorija Upita</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none"
                  >
                    <option value="Opći Upit">Opći Upit za B&H Assistant</option>
                    <option value="BH Alati Support">BH Digitalni Alati (Konver, PapirFinder)</option>
                    <option value="SCENA Magazin">Magazin SCENA+ Saradnja</option>
                    <option value="Investicije & Projekti">Investicije / Partnerstvo (ZENTAXI, GUMMI)</option>
                    <option value="Shop & Edukacija">SHOP & Alison Edukacija</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#F5F0E8]/80 mb-1.5">Vaša Poruka</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Napišite Vašu poruku ili prijedlog saradnje..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00C9A7]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Pošalji Poruku Timu</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Details & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Info Card */}
            <div className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-8 shadow-2xl space-y-5">
              <h3 className="font-syne font-bold text-xl text-[#F5F0E8]">
                Direktni Kontakti
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#00C9A7]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F0E8] font-syne">Adresa & Sjedište</h4>
                    <p className="text-[#F5F0E8]/70">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#00C9A7]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#F5F0E8] font-syne">E-mail Adresa</h4>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#00C9A7] hover:underline font-mono text-sm block">
                      {COMPANY_INFO.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowEmailConfig(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1628] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/30 text-[10px] font-mono text-[#00C9A7] transition-all"
                    >
                      <Server className="w-3 h-3" />
                      <span>Postavke Klijenta (IMAP/SMTP/SSL)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#C9A84C]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F0E8] font-syne">Telefon / Infolinija</h4>
                    <p className="text-[#F5F0E8]/70 font-mono">{COMPANY_INFO.phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#1A3152] space-y-3">
                <h4 className="font-syne font-bold text-xs text-[#C9A84C] uppercase tracking-wider">
                  Pratite Nas Na Društvenim Mrežama:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={COMPANY_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0A1628] hover:bg-[#1877F2]/20 border border-[#1A3152] hover:border-[#1877F2] text-[#F5F0E8] text-xs font-semibold flex items-center gap-2.5 transition-all"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    <span>Facebook Stranica</span>
                  </a>

                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0A1628] hover:bg-[#E4405F]/20 border border-[#1A3152] hover:border-[#E4405F] text-[#F5F0E8] text-xs font-semibold flex items-center gap-2.5 transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#E4405F]" />
                    <span>Instagram (@{COMPANY_INFO.instagramHandle})</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Zenica Location Map Graphic Card */}
            <div className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-6 shadow-xl space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#00C9A7]">
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <span>Zenica 72000, Zeničko-dobojski kanton</span>
              </div>
              <p className="text-[11px] text-[#F5F0E8]/70 font-sans">
                Centar poduzetništva, inovacija i kulture u srcu Bosne i Hercegovine.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Email Client Manual Setup & Webmail Modal */}
      <EmailConfigModal
        isOpen={showEmailConfig}
        onClose={() => setShowEmailConfig(false)}
      />
    </section>
  );
};
