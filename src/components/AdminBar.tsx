import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Image as ImageIcon, FileText, Settings, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <aside 
      aria-label="Administratorska kontrolna traka"
      className="fixed top-0 left-0 right-0 z-50 bg-[#07101E]/95 border-b border-[#00C9A7]/50 shadow-2xl backdrop-blur-md px-3 sm:px-6 py-2 text-xs font-mono text-[#F5F0E8] transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Identification */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#00C9A7]/20 border border-[#00C9A7]/50 flex items-center justify-center text-[#00C9A7]">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="font-syne font-bold text-[#00C9A7]">
            ADMIN REŽIM
          </span>
          <span className="text-[#F5F0E8]/40 hidden sm:inline">|</span>
          <span className="text-[#F5F0E8]/85 hidden sm:inline">
            {adminUser?.name || adminUser?.email || 'Alen Jusufović (Vlasnik)'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-[10px] hidden md:inline">
            Puna prava uređivanja slika i tekstova
          </span>
        </div>

        {/* Right: Quick shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/proizvodi-i-usluge"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8] text-[11px] hover:text-[#00C9A7] transition-colors"
          >
            <ImageIcon className="w-3 h-3 text-[#00C9A7]" />
            <span className="hidden sm:inline">Usluge & Slike</span>
          </Link>

          <Link
            to="/novosti"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8] text-[11px] hover:text-[#00C9A7] transition-colors"
          >
            <FileText className="w-3 h-3 text-[#00C9A7]" />
            <span className="hidden sm:inline">CMS Članci</span>
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00C9A7]/20 hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/40 text-[11px] font-bold transition-all"
          >
            <Settings className="w-3 h-3" />
            <span>Admin Kontrolna Tabla</span>
          </Link>

          <button
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-500/40 text-red-200 text-[11px] transition-colors"
            title="Odjavi se iz administratorskog režima"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Odjava</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
