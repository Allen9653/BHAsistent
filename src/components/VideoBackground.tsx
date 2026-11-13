import React from 'react';

interface VideoBackgroundProps {
  overlayOpacity?: number; // npr. 0.6 ili 0.75 za tamni polutransparentni sloj preko videa
  videoId?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  overlayOpacity = 0.72,
  videoId = 'I9ySTxSZYms',
}) => {
  // YouTube embed URL sa parametrima za autonomnu pozadinu (https://www.youtube.com/watch?v=I9ySTxSZYms)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&rel=0&iv_load_policy=3`;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950"
      aria-hidden="true"
    >
      {/* YouTube IFrame Video koji pokriva cijeli ekran bez crnih ivica */}
      <iframe
        src={embedUrl}
        title="B&H Assistant Tech Background"
        tabIndex={-1}
        className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100dvh] min-w-[177.77dvh] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 opacity-55"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />

      {/* Tamni prelazni sloj (Overlay) koji osigurava čitljivost teksta */}
      <div
        className="absolute inset-0 bg-[#0A1628] transition-opacity duration-500"
        style={{ opacity: overlayOpacity }}
      />

      {/* Suptilni tech grid/mreža preko videa */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
    </div>
  );
};
