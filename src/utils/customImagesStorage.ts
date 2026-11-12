/**
 * Custom Images Registry & Storage
 * 
 * Allows administrator/owner to upload authentic, original company images
 * for each IT Service and Product, persisting them in localStorage.
 * Google AdSense prioritizes genuine, authentic photos over AI-generated images.
 */

const STORAGE_KEY = 'bh_custom_images_registry_v1';
const EVENT_NAME = 'bh-custom-images-updated';

export function getAllCustomImages(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Failed to parse custom images registry:', err);
    return {};
  }
}

export function getCustomImage(id: string): string | null {
  const images = getAllCustomImages();
  return images[id] || null;
}

export function setCustomImage(id: string, imageData: string): void {
  if (typeof window === 'undefined') return;
  try {
    const images = getAllCustomImages();
    images[id] = imageData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id, imageData } }));
  } catch (err) {
    console.error('Failed to save custom image:', err);
    throw new Error('Pohrana slike nije uspjela. Moguće je da je slika prevelika za memoriju preglednika.');
  }
}

export function removeCustomImage(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const images = getAllCustomImages();
    if (images[id]) {
      delete images[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id, removed: true } }));
    }
  } catch (err) {
    console.warn('Failed to remove custom image:', err);
  }
}

export function onCustomImagesChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

/**
 * Compresses an image File using an offscreen canvas to keep size under ~150-300KB
 * ensuring safe localStorage persistence and fast Core Web Vitals loading.
 */
export async function processAndCompressImage(file: File, maxWidth = 1200, maxHeight = 800, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Greška pri čitanju datoteke slike'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Format slike nije prepoznat'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer webp with fallback to jpeg
        try {
          const compressed = canvas.toDataURL('image/webp', quality);
          resolve(compressed);
        } catch {
          const compressedJpeg = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedJpeg);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
