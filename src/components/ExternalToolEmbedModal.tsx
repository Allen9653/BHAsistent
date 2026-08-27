import React, { useState } from 'react';
import { ExternalLink, RefreshCw, X, ShieldAlert, Sparkles, Monitor } from 'lucide-react';

interface ExternalToolEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  externalUrl: string;
  futureDomain?: string;
  badge?: string;
}

export const ExternalToolEmbedModal: React.FC<ExternalToolEmbedModalProps> = ({
  isOpen,
  onClose,
  title,
  externalUrl,
  futureDomain,
  badge = 'BESPLATNI ALAT',
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#0F2038] border border-[#1A3152] w-full max-w-6xl h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Modal Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#1A3152] flex flex-wrap items-center justify-between gap-3 bg-[#0A1628]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7]">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-bold text-sm sm:text-base text-[#F5F0E8]">{title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00C9A7]/15 text-[#00C9A7] text-[10px] font-mono font-bold">
                  {badge}
                </span>
              </div>
              {futureDomain && (
                <p className="text-[11px] font-mono text-[#F5F0E8]/50">
                  Planirana domena: <span className="text-[#C9A84C] font-semibold">{futureDomain}</span> (Trenutno: {new URL(externalUrl).hostname})
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] font-syne font-bold text-xs shadow-md transition-all"
            >
              <span>Otvori u Novom Tabu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] border border-[#1A3152] text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors"
              title="Zatvori prozor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="flex-1 relative bg-[#060D17]">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs text-[#00C9A7] font-mono bg-[#060D17] z-10 p-6 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#00C9A7]" />
              <span className="font-bold text-sm text-[#F5F0E8]">Povezivanje sa alatom ({new URL(externalUrl).hostname})...</span>
              <p className="text-xs text-[#F5F0E8]/60 max-w-md">
                Učitava se radna verzija alata sa razvojnog servera. Ukoliko se prozor ne učita odmah zbog zaštite pretraživača, kliknite na dugme "Otvori u Novom Tabu".
              </p>
            </div>
          )}

          <iframe
            src={externalUrl}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
            loading="lazy"
            onLoad={() => setIframeLoading(false)}
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Bottom Footer Notice */}
        <div className="px-5 py-2.5 bg-[#0A1628] border-t border-[#1A3152] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#F5F0E8]/60 gap-2">
          <div className="flex items-center gap-1.5 text-[#C9A84C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alat B&H Assistant d.o.o. Zenica • Podrška zajednici i besplatna e-uprava</span>
          </div>
          <span>B&H Assistant Ecosystem © 2026</span>
        </div>

      </div>
    </div>
  );
};

export default ExternalToolEmbedModal;
