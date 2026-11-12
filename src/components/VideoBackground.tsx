import React from 'react';

interface VideoBackgroundProps {
  overlayOpacity?: number; // npr. 0.6 ili 0.7 za tamni polutransparentni sloj preko videa
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ overlayOpacity = 0.75 }) => {
  // YouTube Video ID: I9ySTxSZYms
  const videoId = 'I9ySTxSZYms';
  
  // YouTube embed URL sa parametrima za autonomnu pozadinu:
  // autoplay=1 (pokreni automatski)
  // mute=1 (isključi zvuk obavezno zbog browser politika)
  // controls=0 (sakrij kontrole)
  // loop=1 & playlist=... (ponavljaj u krug)
  // modestbranding=1, rel=0 (čistiji prikaz)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&rel=0&iv_load_policy=3`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* YouTube IFrame Video koji pokriva cijelu pozadinu sa scale efektom da nema crnih ivica */}
      <iframe
        src={embedUrl}
        title="B&H Assistant Tech Background"
        className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 opacity-40"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      
      {/* Tamni prelazni sloj (Overlay) koji osigurava čitljivost teksta */}
      <div 
        className="absolute inset-0 bg-slate-950 transition-opacity duration-500" 
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Opcioni suptilni tech grid/mreža preko videa */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
    </div>
  );
};
