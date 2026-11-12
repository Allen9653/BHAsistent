import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getCustomImage, onCustomImagesChange } from '../../utils/customImagesStorage';
import { ImageUploadModal } from '../ImageUploadModal';
import { SafeImage } from '../SafeImage';

interface EditableImageProps {
  imageKey: string;
  defaultSrc: string;
  alt: string;
  title?: string;
  className?: string;
  aspectRatioClass?: string;
  containerClassName?: string;
  itemType?: 'usluga' | 'proizvod';
}

export const EditableImage: React.FC<EditableImageProps> = ({
  imageKey,
  defaultSrc,
  alt,
  title,
  className = 'w-full h-full object-cover',
  aspectRatioClass = 'aspect-video',
  containerClassName = '',
  itemType = 'proizvod'
}) => {
  const { isEditMode } = useAdminAuth();
  const [customSrc, setCustomSrc] = useState<string | null>(() => getCustomImage(imageKey));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsub = onCustomImagesChange(() => {
      setCustomSrc(getCustomImage(imageKey));
    });
    return unsub;
  }, [imageKey]);

  const activeSrc = customSrc || defaultSrc;

  return (
    <div className={`relative group ${aspectRatioClass} ${containerClassName}`}>
      <SafeImage
        src={activeSrc}
        alt={alt}
        className={className}
        fallbackTitle={title || alt}
      />

      {/* Edit Mode Overlay & Trigger */}
      {isEditMode && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          title="Kliknite za zamjenu slike (Upload originalne fotografije)"
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 cursor-pointer z-30 rounded-xl backdrop-blur-sm border-2 border-dashed border-[#00C9A7]"
        >
          <div className="p-3 rounded-full bg-[#00C9A7] text-[#0A1628] shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <span className="mt-2 text-xs font-syne font-bold text-white text-center">
            Zamijeni Sliku
          </span>
          <span className="text-[10px] font-mono text-[#00C9A7] mt-0.5">
            PNG, JPG, WebP (Max 5MB)
          </span>
          {customSrc && (
            <span className="mt-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
              Aktivna autorska slika
            </span>
          )}
        </div>
      )}

      {/* Persistent Badge if custom photo is loaded */}
      {customSrc && !isEditMode && (
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00C9A7]/90 backdrop-blur-md text-[#0A1628] text-[9px] font-mono font-bold shadow pointer-events-none z-10">
          Originalna foto
        </span>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          itemId={imageKey}
          itemTitle={title || alt}
          itemType={itemType}
          currentImage={customSrc}
          onImageSaved={(newUrl) => {
            setCustomSrc(newUrl);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
