import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const FooterBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // 1. Intersection Observer: Only run animation when footer is in or near viewport (Performance optimization)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '150px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 2. Mouse tracking for subtle ambient cursor glow in footer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Canvas particle network animation matching hero style
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const colors = [
      'rgba(0, 201, 167, ', // Turquoise #00C9A7
      'rgba(201, 168, 76, ', // Warm Gold #C9A84C
      'rgba(56, 189, 248, ', // Sky Blue #38BDF8
    ];

    const initDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      // Lightweight particle count: 20 on mobile, up to 36 on large screens
      const count = Math.floor(Math.min(Math.max((width * height) / 30000, 18), 36));
      particles = [];

      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * 0.28;
        const vy = (Math.random() - 0.5) * 0.28;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 1.4 + 0.9,
          color,
          // Extremely muted alpha (0.10 - 0.25) to preserve 100% text readability
          alpha: Math.random() * 0.15 + 0.1,
          pulseSpeed: Math.random() * 0.015 + 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw and update particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulse alpha gently
        const currentAlpha = p.alpha + Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.05;
        const clampedAlpha = Math.max(0.04, Math.min(0.3, currentAlpha));

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.fill();

        // Connect nearby nodes with delicate whisper-lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 110;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 201, 167, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(() => {
      initDimensions();
    });

    resizeObserver.observe(container);
    initDimensions();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 1. Muted Canvas Network (Turquoise & Gold Nodes) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70"
      />

      {/* 2. Ambient Cursor Light Glow in Footer */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-10 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00C9A7 0%, #C9A84C 35%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3. Deep Geometric Matrix Grid (Subtle Hero Resonance) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#00C9A7 1px, transparent 1px), radial-gradient(#C9A84C 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* 4. Bosnian Stećak Geometric Heritage Ornaments (Subtle vector reliefs across footer width) */}
      <div className="absolute inset-0 flex items-center justify-around opacity-[0.07] animate-stecak-pulse pointer-events-none">
        {/* Left Ornament Motif: Solar Rosette */}
        <svg
          viewBox="0 0 500 500"
          className="w-[380px] h-[380px] max-w-full stroke-[#00C9A7] fill-none -translate-x-12 sm:translate-x-0"
        >
          <defs>
            <linearGradient id="footerStecakGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00C9A7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Stećak Concentric Solar Circles & Rays */}
          <circle cx="250" cy="250" r="160" stroke="url(#footerStecakGrad1)" strokeWidth="1.2" strokeDasharray="10 6" />
          <circle cx="250" cy="250" r="120" stroke="#C9A84C" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="80" stroke="#00C9A7" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="40" stroke="#C9A84C" strokeWidth="1.2" />

          {/* Solar Star Radiance */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="250"
              y1="250"
              x2={250 + 160 * Math.cos((deg * Math.PI) / 180)}
              y2={250 + 160 * Math.sin((deg * Math.PI) / 180)}
              stroke="#00C9A7"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          ))}
        </svg>

        {/* Right Ornament Motif: Architectural Stećak Arch & Cross Ribbons */}
        <svg
          viewBox="0 0 500 500"
          className="w-[420px] h-[420px] max-w-full stroke-[#C9A84C] fill-none hidden sm:block translate-x-16"
        >
          <defs>
            <linearGradient id="footerStecakGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00C9A7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Heritage Archway Geometry */}
          <rect x="80" y="80" width="340" height="340" rx="28" stroke="url(#footerStecakGrad2)" strokeWidth="1.2" strokeDasharray="12 6" />
          <rect x="110" y="110" width="280" height="280" rx="20" stroke="#00C9A7" strokeWidth="0.75" strokeOpacity="0.5" />

          {/* Stećak Fleur-de-lis / Lily stylized points */}
          {[
            { cx: 140, cy: 140 },
            { cx: 360, cy: 140 },
            { cx: 140, cy: 360 },
            { cx: 360, cy: 360 },
          ].map((pt, idx) => (
            <circle key={idx} cx={pt.cx} cy={pt.cy} r="18" stroke="#C9A84C" strokeWidth="1" />
          ))}

          <path
            d="M 250,110 L 250,390 M 110,250 L 390,250"
            stroke="#00C9A7"
            strokeWidth="0.8"
            strokeDasharray="6 4"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* 5. Deep Contrast Vignette Mask (Guarantees 100% WCAG AAA Text Readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-footer,#081120)]/85 via-[var(--brand-footer,#081120)]/60 to-[var(--brand-footer,#081120)]/90 pointer-events-none" />

      {/* 6. Top Shimmer Accent Line on Footer Border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C9A7]/40 via-[#C9A84C]/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default FooterBackground;
