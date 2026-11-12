import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  Sparkles,
  Edit3,
  CheckCircle2,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, adminUser, logout, isEditMode, toggleEditMode, pendingCount } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <aside 
      aria-label="Administratorska kontrolna traka"
      className="fixed top-0 left-0 right-0 z-[60] bg-[#07101E]/95 border-b border-[#00C9A7]/50 shadow-2xl backdrop-blur-md px-2.5 sm:px-6 py-1.5 sm:py-2 text-xs font-mono text-[#F5F0E8] transition-all overflow-x-auto no-scrollbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 min-w-max sm:min-w-0">
        {/* Left: Identification & Edit Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#00C9A7]/20 border border-[#00C9A7]/50 flex items-center justify-center text-[#00C9A7]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-syne font-bold text-[#00C9A7] hidden sm:inline">
              ADMIN REŽIM
            </span>
          </div>

          <span className="text-[#F5F0E8]/40 hidden md:inline">|</span>

          {/* EDIT MODE TOGGLE SWITCH */}
          <div className="flex items-center gap-2 bg-[#0A1628] border border-[#1A3152] rounded-xl px-2.5 py-1">
            <Edit3 className={`w-3.5 h-3.5 ${isEditMode ? 'text-[#00C9A7] animate-pulse' : 'text-[#F5F0E8]/50'}`} />
            <span className="text-[11px] font-syne font-semibold">
              Edit Mode:
            </span>
            <button
              type="button"
              onClick={toggleEditMode}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isEditMode ? 'bg-[#00C9A7]' : 'bg-[#1A3152]'
              }`}
              role="switch"
              aria-checked={isEditMode}
              title={isEditMode ? 'Isključi uređivanje uživo' : 'Uključi uređivanje tekstova i slika na stranici'}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#0A1628] shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isEditMode ? 'translate-x-4 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-[10px] font-mono font-bold uppercase ${isEditMode ? 'text-[#00C9A7]' : 'text-[#F5F0E8]/40'}`}>
              {isEditMode ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Pending Changes Badge */}
          {pendingCount > 0 && (
            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-bold">
              <span>{pendingCount} nespremljeno</span>
            </span>
          )}
        </div>

        {/* Right: Quick shortcuts & Admin Portal Link */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            to="/proizvodi-i-usluge"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8] text-[11px] hover:text-[#00C9A7] transition-colors"
          >
            <ImageIcon className="w-3 h-3 text-[#00C9A7]" />
            <span className="hidden sm:inline">Usluge & Slike</span>
          </Link>

          <Link
            to="/novosti"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F2038] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8] text-[11px] hover:text-[#00C9A7] transition-colors"
          >
            <FileText className="w-3 h-3 text-[#00C9A7]" />
            <span className="hidden sm:inline">CMS Članci</span>
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00C9A7]/20 hover:bg-[#00C9A7] text-[#00C9A7] hover:text-[#0A1628] border border-[#00C9A7]/40 text-[11px] font-bold transition-all shadow-sm"
          >
            <Settings className="w-3 h-3" />
            <span>CMS Panel</span>
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
