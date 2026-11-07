import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, ExternalLink, CheckCircle2, Youtube } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';

interface ArticleVideoPlayerProps {
  videoFileName?: string;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  onOpenModal?: () => void;
}

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export const ArticleVideoPlayer: React.FC<ArticleVideoPlayerProps> = ({
  videoFileName = "Prezentacijski Video",
  videoUrl,
  posterUrl = IMAGES.bhKonverMockup,
  title = "Video Prezentacija",
  onOpenModal
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const ytId = extractYouTubeId(videoUrl);
  const isYouTube = Boolean(ytId);

  const togglePlay = () => {
    if (isYouTube) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setHasError(false);
        }).catch(() => {
          setHasError(true);
          setIsPlaying(true);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (onOpenModal) {
      onOpenModal();
    }
  };

  const youtubeEmbedUrl = ytId 
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
    : "https://www.youtube.com/embed/e24nm0AjfgE?autoplay=1&rel=0";

  const resolvedVideoSrc = videoUrl || (videoFileName && !videoFileName.endsWith('.mp4') ? videoFileName : undefined);

  return (
    <div className="my-6 rounded-2xl overflow-hidden border-2 border-[#00C9A7]/40 bg-[#0A1628] shadow-2xl space-y-0 group">
      {/* Video Player Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F2038] border-b border-[#1A3152]">
        <div className="flex items-center gap-2">
          {isYouTube ? (
            <Youtube className="w-4 h-4 text-[#FF0000]" />
          ) : (
            <Film className="w-4 h-4 text-[#00C9A7]" />
          )}
          <span className="text-xs font-syne font-bold text-[#F5F0E8] line-clamp-1">
            {title || "Priloženi Video Snimak"}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[10px] font-bold shrink-0 hidden sm:inline">
            {isYouTube ? "YouTube HD" : videoFileName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#00C9A7] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
          <span>HD Video</span>
        </div>
      </div>

      {/* Video Container Frame */}
      <div className="relative aspect-video bg-[#050B14] overflow-hidden flex items-center justify-center">
        {isPlaying ? (
          isYouTube ? (
            <iframe
              className="w-full h-full border-0"
              src={youtubeEmbedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : resolvedVideoSrc && !hasError ? (
            <video
              ref={videoRef}
              src={resolvedVideoSrc}
              poster={posterUrl}
              controls={isPlaying}
              autoPlay
              onEnded={() => setIsPlaying(false)}
              onError={() => setHasError(true)}
              className="w-full h-full object-contain"
            >
              Vaš pretraživač ne podržava direktnu HTML5 video reprodukciju.
            </video>
          ) : (
            <iframe
              className="w-full h-full border-0"
              src={youtubeEmbedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )
        ) : null}

        {/* Poster / Interactive Simulated Video Screen when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent flex flex-col justify-between p-4 sm:p-6">
            <SafeImage
              src={posterUrl}
              alt={title}
              fallbackTitle={title}
              fallbackSubtitle="Video player poster"
              className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
              containerClassName="absolute inset-0 -z-10"
            />
            
            <div className="flex items-center justify-between">
              <div className="px-3 py-1 rounded-full bg-[#0A1628]/90 backdrop-blur-md border border-[#00C9A7]/40 text-[#00C9A7] text-xs font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{isYouTube ? "Zvanični Video Prikaz" : videoFileName}</span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#0A1628]/80 text-[#C9A84C] font-mono text-xs">
                {isYouTube ? "YouTube Prezentacija" : "Zvanična Prezentacija"}
              </span>
            </div>

            {/* Central Play Button */}
            <div className="self-center flex flex-col items-center gap-3 my-auto">
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-[#00C9A7] hover:bg-[#00E5BE] text-[#0A1628] flex items-center justify-center shadow-2xl shadow-[#00C9A7]/50 hover:scale-110 transition-transform group-hover:scale-105"
                title="Pokreni video snimak"
              >
                <Play className="w-8 h-8 fill-[#0A1628] ml-1" />
              </button>
              <span className="text-xs font-syne font-bold text-[#F5F0E8] bg-[#0A1628]/90 px-4 py-1.5 rounded-full border border-[#00C9A7]/40 backdrop-blur-md text-center">
                Kliknite za pokretanje video prezentacije
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#F5F0E8]/80 bg-[#0A1628]/90 px-4 py-2 rounded-xl border border-[#1A3152] backdrop-blur-md">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7]" />
                <span className="truncate">
                  {isYouTube ? "Izvor: YouTube HD Video" : `Format: MP4 | Autor: B&H Assistant Redakcija`}
                </span>
              </div>
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00C9A7] hover:underline flex items-center gap-1 font-bold shrink-0 ml-2"
                >
                  <span>Gledaj direktno</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="p-3 bg-[#0F2038] border-t border-[#1A3152] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#00C9A7] hover:bg-[#00C9A7]/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {!isYouTube && (
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        <div className="flex-1 text-center font-mono text-[11px] text-[#F5F0E8]/70 truncate px-2">
          {isYouTube ? (
            <span className="text-[#F5F0E8]">YouTube: <strong className="text-[#00C9A7]">{title}</strong></span>
          ) : (
            <span>Datoteka: <strong className="text-[#00C9A7]">{videoFileName}</strong></span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#0F2038] hover:bg-[#1A3152] text-[#00C9A7] border border-[#00C9A7]/40 font-syne font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">YouTube Link</span>
            </a>
          )}

          <button
            onClick={handleFullscreen}
            className="p-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-[#F5F0E8]/80 hover:text-[#00C9A7] transition-colors"
            title="Cijeli ekran"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleVideoPlayer;
