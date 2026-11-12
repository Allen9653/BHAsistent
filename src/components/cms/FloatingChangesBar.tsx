import React, { useState } from 'react';
import { Save, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const FloatingChangesBar: React.FC = () => {
  const { isEditMode, pendingCount, savePendingChanges, clearPendingChanges } = useAdminAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isEditMode || pendingCount === 0) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const success = await savePendingChanges();
      if (success) {
        setStatusMessage('Sve izmjene su uspješno spremljene!');
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage('Greška pri spremanju izmjena.');
      }
    } catch {
      setStatusMessage('Greška pri spremanju.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Da li ste sigurni da želite poništiti sve nespremljene izmjene teksta?')) {
      clearPendingChanges();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans animate-bounce-subtle">
      {statusMessage && (
        <div className="bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-white/40">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="bg-[#071328]/95 border-2 border-[#00C9A7] shadow-2xl backdrop-blur-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-white">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C9A7] animate-pulse" />
            <span className="font-syne font-extrabold text-xs sm:text-sm text-white">
              {pendingCount} {pendingCount === 1 ? 'nespremljena izmjena' : 'nespremljene izmjene'}
            </span>
          </div>
          <p className="text-[10px] font-mono text-[#00C9A7]">
            Uređivanje uživo (Inline CMS)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDiscard}
            disabled={isSaving}
            className="px-3 py-2 rounded-xl bg-[#0A1628] hover:bg-red-950/40 text-red-300 border border-red-500/30 text-xs font-mono transition-colors flex items-center gap-1"
            title="Poništi izmjene"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Poništi</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] disabled:opacity-50 text-[#0A1628] font-syne font-extrabold text-xs shadow-lg shadow-[#00C9A7]/30 transition-all hover:scale-105 flex items-center gap-1.5"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Spremanje...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Sačuvaj Izmjene</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
