import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Trash2, Check, AlertCircle } from 'lucide-react';
import { processAndCompressImage, setCustomImage, removeCustomImage } from '../utils/customImagesStorage';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  itemType: 'usluga' | 'proizvod';
  currentImage?: string | null;
  onImageSaved?: (newImage: string | null) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  itemId,
  itemTitle,
  itemType,
  currentImage,
  onImageSaved
}) => {
  const [activeMode, setActiveMode] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(currentImage || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPreviewSrc(currentImage || null);
      setImageUrl('');
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, currentImage]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Odabrana datoteka mora biti slika (PNG, JPG, WEBP).');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const compressed = await processAndCompressImage(file);
      setPreviewSrc(compressed);
    } catch (err: any) {
      setErrorMessage(err.message || 'Greška pri obradi slike.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (!imageUrl.trim()) {
      setErrorMessage('Molimo unesite ispravan URL slike.');
      return;
    }
    setErrorMessage(null);
    setPreviewSrc(imageUrl.trim());
  };

  const handleSave = () => {
    if (!previewSrc) {
      setErrorMessage('Niste odabrali niti unijeli novu sliku.');
      return;
    }
    try {
      setCustomImage(itemId, previewSrc);
      setSuccessMessage('Originalna slika je uspješno sačuvana!');
      if (onImageSaved) {
        onImageSaved(previewSrc);
      }
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'Neuspjelo spremanje slike.');
    }
  };

  const handleResetToDefault = () => {
    removeCustomImage(itemId);
    setPreviewSrc(null);
    setImageUrl('');
    setSuccessMessage('Slika je vraćena na podrazumijevanu.');
    if (onImageSaved) {
      onImageSaved(null);
    }
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#0F2038] border border-[#1A3152] rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5 text-[#F5F0E8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1A3152] pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C9A7] block mb-1">
              Upravljanje Slikom • {itemType === 'usluga' ? 'IT Usluga' : 'Digitalni Proizvod'}
            </span>
            <h3 className="font-syne font-bold text-lg text-white">
              {itemTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8]/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AdSense E-E-A-T Notice */}
        <div className="p-3 rounded-xl bg-[#0A1628] border border-[#00C9A7]/30 flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-[#00C9A7] shrink-0 mt-0.5" />
          <p className="text-[#F5F0E8]/80 leading-relaxed font-sans">
            <strong className="text-[#00C9A7]">Google AdSense & E-E-A-T preporuka:</strong> Za maksimalno povjerenje i brže odobrenje oglasa, koristite stvarne, autentične fotografije Vaše firme, projekata i radnog procesa umjesto generisanih AI ilustracija.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex rounded-xl bg-[#0A1628] p-1 border border-[#1A3152]">
          <button
            onClick={() => setActiveMode('file')}
            className={`flex-1 py-2 rounded-lg font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'file'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow'
                : 'text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload sa računara / mobitela</span>
          </button>
          <button
            onClick={() => setActiveMode('url')}
            className={`flex-1 py-2 rounded-lg font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'url'
                ? 'bg-[#00C9A7] text-[#0A1628] shadow'
                : 'text-[#F5F0E8]/70 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Unos URL-a slike</span>
          </button>
        </div>

        {/* Action Controls */}
        {activeMode === 'file' ? (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full py-6 px-4 border-2 border-dashed border-[#1A3152] hover:border-[#00C9A7]/60 rounded-2xl bg-[#0A1628] hover:bg-[#12233c] transition-all flex flex-col items-center justify-center gap-2 group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#0F2038] border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="font-syne font-bold text-xs text-white">
                {isProcessing ? 'Optimizacija slike...' : 'Kliknite da odaberete originalnu sliku'}
              </span>
              <span className="text-[10px] font-mono text-[#F5F0E8]/60">
                Podržano: JPG, PNG, WEBP (automatska web optimizacija)
              </span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#C9A84C] block">
              Javni URL slike (npr. https://...):
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://vaša-domena.com/slika.jpg"
                className="flex-1 bg-[#0A1628] border border-[#1A3152] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C9A7]"
              />
              <button
                onClick={handleApplyUrl}
                className="px-4 py-2.5 bg-[#1A3152] hover:bg-[#00C9A7] hover:text-[#0A1628] rounded-xl font-syne font-bold text-xs transition-colors"
              >
                Učitaj
              </button>
            </div>
          </div>
        )}

        {/* Live Preview */}
        {previewSrc && (
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#00C9A7] block">
              Pregled odabrane slike:
            </span>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] relative group">
              <img
                src={previewSrc}
                alt={itemTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 font-mono text-[9px] text-[#00C9A7]">
                Originalna Slika
              </div>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-sans">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1A3152]">
          {currentImage ? (
            <button
              onClick={handleResetToDefault}
              className="px-3.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-950/60 border border-red-500/30 text-red-300 font-syne font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Ukloni sliku</span>
            </button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#0A1628] hover:bg-[#1A3152] text-[#F5F0E8]/70 hover:text-white font-syne font-bold text-xs transition-colors"
            >
              Otkaži
            </button>
            <button
              onClick={handleSave}
              disabled={!previewSrc || isProcessing}
              className="px-5 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00E5BE] disabled:opacity-50 text-[#0A1628] font-syne font-bold text-xs transition-all shadow-md shadow-[#00C9A7]/20 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Sačuvaj Sliku</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
