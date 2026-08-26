import React, { useState, useEffect } from 'react';
import { InteractiveParticleCanvas } from './InteractiveParticleCanvas';

export const StecakBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Interactive Cyber Particle Network (Low-opacity interactive particle canvas) */}
      <InteractiveParticleCanvas />

      {/* Dynamic Cursor Light Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, #00C9A7 0%, #C9A84C 40%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Deep Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(#00C9A7 1px, transparent 1px), radial-gradient(#C9A84C 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Main Vector Geometric Stećak Ornaments (Centered & Symmetrical) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35 animate-stecak-pulse">
        <svg
          viewBox="0 0 1000 1000"
          className="w-[900px] h-[900px] max-w-full max-h-full stroke-[#00C9A7] fill-none transition-transform duration-1000 ease-out"
          style={{
            transform: `rotate(${(mousePos.x - 0.5) * 6}deg) translate(${(mousePos.x - 0.5) * 15}px, ${(mousePos.y - 0.5) * 15}px)`
          }}
        >
          <defs>
            <linearGradient id="stecakGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00C9A7" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="stecakGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00C9A7" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Stećak Arch Framing */}
          <rect x="100" y="100" width="800" height="800" rx="40" stroke="url(#stecakGrad1)" strokeWidth="1.5" strokeDasharray="12 6" />
          <rect x="130" y="130" width="740" height="740" rx="30" stroke="#C9A84C" strokeWidth="0.75" strokeOpacity="0.4" />

          {/* Corner Stećak Rosettes */}
          {[
            { x: 180, y: 180 },
            { x: 820, y: 180 },
            { x: 180, y: 820 },
            { x: 820, y: 820 },
          ].map((pt, idx) => (
            <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
              <circle r="35" stroke="url(#stecakGrad1)" strokeWidth="1.5" filter="url(#glow)" />
              <circle r="20" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 2" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                <line
                  key={ang}
                  x1="0"
                  y1="0"
                  x2={35 * Math.cos((ang * Math.PI) / 180)}
                  y2={35 * Math.sin((ang * Math.PI) / 180)}
                  stroke="#00C9A7"
                  strokeWidth="1"
                />
              ))}
            </g>
          ))}

          {/* Central Solar Rosette / Star Circle (Inspiracija: Radimlja i Zgošća) */}
          <g transform="translate(500, 500)">
            <circle r="180" stroke="url(#stecakGrad1)" strokeWidth="2" filter="url(#glow)" />
            <circle r="150" stroke="#C9A84C" strokeWidth="1" strokeDasharray="8 4" />
            <circle r="120" stroke="#00C9A7" strokeWidth="1.5" />
            <circle r="60" stroke="#C9A84C" strokeWidth="2" />
            <circle r="15" fill="#00C9A7" />

            {/* 12 Intertwined Lily/Petal Arcs */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  d="M 0,-60 Q 40,-100 0,-150 Q -40,-100 0,-60 Z"
                  stroke="url(#stecakGrad1)"
                  strokeWidth="1.2"
                />
                <circle cx="0" cy="-165" r="4" fill="#C9A84C" />
              </g>
            ))}

            {/* Geometric Lily Cross Rays */}
            <path d="M -220,0 L 220,0 M 0,-220 L 0,220" stroke="#C9A84C" strokeWidth="1" strokeDasharray="10 5" />
            <path d="M -155,-155 L 155,155 M -155,155 L 155,-155" stroke="#00C9A7" strokeWidth="0.75" />
          </g>

          {/* Side Border Ribbons (Stećak Pletenice) */}
          <path
            d="M 240,100 Q 260,130 280,100 T 320,100 T 360,100 T 400,100 T 440,100 T 480,100 T 520,100 T 560,100 T 600,100 T 640,100 T 680,100 T 720,100 T 760,100"
            stroke="#00C9A7"
            strokeWidth="1.5"
          />
          <path
            d="M 240,900 Q 260,870 280,900 T 320,900 T 360,900 T 400,900 T 440,900 T 480,900 T 520,900 T 560,900 T 600,900 T 640,900 T 680,900 T 720,900 T 760,900"
            stroke="#C9A84C"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Floating Sparkles / Cybernetic Sparks */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#00C9A7] rounded-full blur-[1px] animate-float-slow opacity-60" />
      <div className="absolute top-2/3 right-16 w-3 h-3 bg-[#C9A84C] rounded-full blur-[1px] animate-float-slow opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-[#00C9A7] rounded-full blur-[1px] animate-float-slow opacity-40" style={{ animationDelay: '4s' }} />
    </div>
  );
};
