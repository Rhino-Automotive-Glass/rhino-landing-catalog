'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

const TOTAL_FRAMES = 36;
const DRAG_THRESHOLD = 8; // pixels per frame advance

function generateFrameSVG(frameIndex: number): string {
  const angle = (frameIndex * 360) / TOTAL_FRAMES;
  const rad = (angle * Math.PI) / 180;

  // Simple van/bus silhouette that rotates based on angle
  // We simulate perspective by stretching/compressing the body
  const perspective = Math.cos(rad);
  const sideFacing = Math.sin(rad);
  const absPersp = Math.abs(perspective);
  const absSide = Math.abs(sideFacing);

  // Body dimensions change with rotation
  const bodyWidth = 200 + absSide * 160;
  const bodyHeight = 100 + absPersp * 20;
  const bodyX = 300 - bodyWidth / 2;
  const bodyY = 200 - bodyHeight / 2;

  // Cabin offset
  const cabinWidth = bodyWidth * 0.3;
  const cabinX = sideFacing >= 0 ? bodyX + bodyWidth - cabinWidth - 10 : bodyX + 10;
  const cabinHeight = bodyHeight + 30;
  const cabinY = bodyY - 30;

  // Wheels
  const wheelRadius = 22;
  const wheelY = bodyY + bodyHeight - 5;
  const wheel1X = bodyX + bodyWidth * 0.2;
  const wheel2X = bodyX + bodyWidth * 0.8;

  // Window positions
  const windowCount = Math.max(1, Math.round(absSide * 4));
  const windowWidth = (bodyWidth * 0.5) / windowCount - 6;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg${frameIndex}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f172a"/>
        <stop offset="100%" style="stop-color:#1e293b"/>
      </linearGradient>
      <linearGradient id="body${frameIndex}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#e2e8f0"/>
        <stop offset="100%" style="stop-color:#94a3b8"/>
      </linearGradient>
      <filter id="shadow${frameIndex}">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
      </filter>
    </defs>
    <rect width="600" height="400" fill="url(#bg${frameIndex})"/>

    <!-- Ground line -->
    <ellipse cx="300" cy="${wheelY + wheelRadius + 15}" rx="${bodyWidth * 0.7}" ry="8" fill="#000" opacity="0.2"/>

    <!-- Vehicle body -->
    <g filter="url(#shadow${frameIndex})">
      <!-- Main body -->
      <rect x="${bodyX}" y="${bodyY}" width="${bodyWidth}" height="${bodyHeight}" rx="8" fill="url(#body${frameIndex})"/>

      <!-- Cabin/windshield area -->
      <rect x="${cabinX}" y="${cabinY}" width="${cabinWidth}" height="${cabinHeight}" rx="6" fill="#cbd5e1" opacity="0.9"/>
      <rect x="${cabinX + 4}" y="${cabinY + 4}" width="${cabinWidth - 8}" height="${cabinHeight * 0.6}" rx="4" fill="#38bdf8" opacity="0.5"/>

      <!-- Side windows -->
      ${Array.from({ length: windowCount }, (_, i) => {
        const wx = sideFacing >= 0
          ? bodyX + 15 + i * (windowWidth + 6)
          : bodyX + bodyWidth * 0.45 + i * (windowWidth + 6);
        return `<rect x="${wx}" y="${bodyY + 8}" width="${windowWidth}" height="${bodyHeight * 0.4}" rx="3" fill="#38bdf8" opacity="0.4"/>`;
      }).join('\n      ')}
    </g>

    <!-- Wheels -->
    <circle cx="${wheel1X}" cy="${wheelY}" r="${wheelRadius}" fill="#1e293b"/>
    <circle cx="${wheel1X}" cy="${wheelY}" r="${wheelRadius - 6}" fill="#475569"/>
    <circle cx="${wheel1X}" cy="${wheelY}" r="4" fill="#94a3b8"/>

    <circle cx="${wheel2X}" cy="${wheelY}" r="${wheelRadius}" fill="#1e293b"/>
    <circle cx="${wheel2X}" cy="${wheelY}" r="${wheelRadius - 6}" fill="#475569"/>
    <circle cx="${wheel2X}" cy="${wheelY}" r="4" fill="#94a3b8"/>

    <!-- Angle indicator -->
    <text x="300" y="370" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" fill="#64748b">${angle}°</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function ThreeSixtyViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragStartX = useRef(0);
  const dragFrameStart = useRef(0);
  const frames = useRef<string[]>([]);

  // Generate all frame SVGs once
  useEffect(() => {
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => generateFrameSVG(i));
  }, []);

  // Preload images
  useEffect(() => {
    frames.current.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
    if ('touches' in e) {
      return e.touches[0]?.clientX ?? 0;
    }
    return e.clientX;
  };

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    dragStartX.current = getClientX(e);
    dragFrameStart.current = currentFrame;
  }, [currentFrame]);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = getClientX(e);
    const delta = clientX - dragStartX.current;
    const frameDelta = Math.round(delta / DRAG_THRESHOLD);
    let newFrame = (dragFrameStart.current + frameDelta) % TOTAL_FRAMES;
    if (newFrame < 0) newFrame += TOTAL_FRAMES;

    setCurrentFrame(newFrame);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse/touch up listener
  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  const frameSrc = frames.current[currentFrame] || generateFrameSVG(currentFrame);
  const angleDeg = Math.round((currentFrame / TOTAL_FRAMES) * 360);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-secondary-900 to-primary-950">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-accent-400 uppercase mb-3">
            Vista 360°
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explora el Vehículo
          </h2>
          <p className="text-secondary-300 mt-3 max-w-xl mx-auto">
            Arrastra para girar y ver todas las áreas de cristal que cubrimos.
          </p>
        </div>

        {/* Viewer card */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-2xl rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden select-none"
          style={{ touchAction: 'pan-y' }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Image */}
          <img
            src={frameSrc}
            alt={`Vista del vehículo a ${angleDeg}°`}
            className="w-full h-auto pointer-events-none"
            draggable={false}
          />

          {/* Drag instruction overlay */}
          {!hasInteracted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
              <div className="flex flex-col items-center gap-3 text-white">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-80">
                  <path d="M8 24h32M8 24l8-8M8 24l8 8M40 24l-8-8M40 24l-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-semibold tracking-wider uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  Arrastra para girar
                </span>
              </div>
            </div>
          )}

          {/* Cursor style */}
          <div className={`absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />
        </div>

        {/* Frame indicator dots */}
        <div className="flex items-center justify-center mt-6 gap-1">
          {Array.from({ length: TOTAL_FRAMES }, (_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                i === currentFrame ? 'bg-accent-400 scale-125' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Angle display */}
        <p className="text-center text-secondary-400 text-sm mt-3 font-mono">
          {angleDeg}°
        </p>
      </div>
    </section>
  );
}
