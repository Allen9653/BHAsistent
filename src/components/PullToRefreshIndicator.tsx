import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  progress: number;
}

export const PullToRefreshIndicator: React.FC<PullToRefreshIndicatorProps> = ({
  pullDistance,
  isRefreshing,
  progress,
}) => {
  if (pullDistance <= 0 && !isRefreshing) return null;

  return (
    <div
      style={{ transform: `translateY(${Math.min(pullDistance, 70)}px)` }}
      className="fixed top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-transform duration-100 ease-out"
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2038]/95 border border-[#00C9A7]/60 text-[#F5F0E8] shadow-2xl shadow-black/80 backdrop-blur-md">
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : { rotate: progress * 240 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : { duration: 0 }}
          className="text-[#00C9A7]"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>

        <span className="text-[11px] font-mono font-bold tracking-wide text-[#F5F0E8]">
          {isRefreshing
            ? 'Osvježavanje podataka...'
            : progress >= 1
            ? 'Otpustite za osvježavanje'
            : 'Povucite za osvježavanje'}
        </span>

        {isRefreshing && (
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C] animate-pulse" />
        )}
      </div>
    </div>
  );
};
