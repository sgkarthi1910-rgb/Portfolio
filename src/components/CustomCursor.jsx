import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Only enable on desktop devices with precision pointer
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let isVisible = false;
    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const ring = { x: -100, y: -100, vx: 0, vy: 0 };
    let animationFrame;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        ring.x = e.clientX;
        ring.y = e.clientY;
        if (container) container.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (container) container.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (container) container.style.opacity = '1';
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-hover') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        isHoveredRef.current = true;
      } else {
        isHoveredRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    const animate = () => {
      if (isVisible) {
        mouse.x += (mouse.targetX - mouse.x) * 0.75;
        mouse.y += (mouse.targetY - mouse.y) * 0.75;

        const dx = mouse.targetX - ring.x;
        const dy = mouse.targetY - ring.y;
        ring.vx = ring.vx * 0.70 + dx * 0.082;
        ring.vy = ring.vy * 0.70 + dy * 0.082;
        ring.x += ring.vx;
        ring.y += ring.vy;

        const speed = Math.hypot(ring.vx, ring.vy);
        const stretch = Math.min(speed * 0.016, 0.22);
        const angle = Math.atan2(ring.vy, ring.vx);

        const isHov = isHoveredRef.current;
        const ringScale = isHov ? 1.4 : 1.0;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouse.targetX}px, ${mouse.targetY}px, 0) scale(${isHov ? 0.35 : 1})`;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) rotate(${angle}rad) scale(${ringScale * (1 + stretch)}, ${ringScale * (1 - stretch * 0.5)})`;
          ringRef.current.style.borderColor = isHov ? 'rgba(56, 189, 248, 0.95)' : 'rgba(192, 132, 252, 0.60)';
          ringRef.current.style.backgroundColor = isHov ? 'rgba(56, 189, 248, 0.10)' : 'rgba(168, 85, 247, 0.03)';
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none opacity-0 transition-opacity duration-200"
      style={{ touchAction: 'none' }}
    >
      {/* Precision Photon Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_5px_rgba(56,189,248,0.6)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      {/* Inertial Gravitational Lensing Target Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-400/50 shadow-[0_0_5px_rgba(56,189,248,0.18)] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center transition-[border-color,background-color] duration-150"
      >
        <div className="absolute -top-1 w-[1px] h-1.5 bg-cyan-400/70" />
        <div className="absolute -bottom-1 w-[1px] h-1.5 bg-cyan-400/70" />
        <div className="absolute -left-1 h-[1px] w-1.5 bg-cyan-400/70" />
        <div className="absolute -right-1 h-[1px] w-1.5 bg-cyan-400/70" />
      </div>
    </div>
  );
}
