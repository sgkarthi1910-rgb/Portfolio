import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * PopUpCard: High-performance, physics-driven pop-up card component.
 * Features:
 * - Fluid spring-driven scroll entry ("pop-up" from y: 50, scale: 0.92 -> 1.0)
 * - Ultra-smooth spring-based hover elevation (zero CSS transition collisions)
 * - Dynamic cursor-following ambient spotlight
 * - Stacking isolation to guarantee zero overlying/clipping with neighboring cards
 */
export default function PopUpCard({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  index = 0,
  hoverScale = 1.015,
  interactive = true,
  glowColor = 'purple' // 'purple' | 'cyan' | 'pink' | 'emerald'
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Staggered calculation for organic cascade on scroll
  const computedDelay = delay || (index ? index * 0.09 : 0);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const glowStyles = {
    purple: {
      border: 'hover:border-purple-500/60',
      shadow: 'hover:shadow-[0_20px_45px_-12px_rgba(168,85,247,0.30)]',
      spotlight: 'rgba(168, 85, 247, 0.15)'
    },
    cyan: {
      border: 'hover:border-cyan-400/60',
      shadow: 'hover:shadow-[0_20px_45px_-12px_rgba(56,189,248,0.30)]',
      spotlight: 'rgba(56, 189, 248, 0.15)'
    },
    pink: {
      border: 'hover:border-pink-500/60',
      shadow: 'hover:shadow-[0_20px_45px_-12px_rgba(236,72,153,0.30)]',
      spotlight: 'rgba(236, 72, 153, 0.15)'
    },
    emerald: {
      border: 'hover:border-emerald-400/60',
      shadow: 'hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.30)]',
      spotlight: 'rgba(16, 185, 129, 0.15)'
    }
  };

  const currentGlow = glowStyles[glowColor] || glowStyles.purple;

  const isFullHeight = className.includes('h-full');

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative isolate group/card w-full hover:z-30 ${isFullHeight ? 'h-full' : ''} ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
          scale: 0.97
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        viewport={{ once: true, amount: 0.12, margin: '0px 0px -20px 0px' }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 22,
          mass: 0.75,
          delay: computedDelay
        }}
        whileHover={interactive ? {
          y: -5,
          scale: hoverScale,
          transition: {
            type: "spring",
            stiffness: 380,
            damping: 24,
            mass: 0.6
          }
        } : undefined}
        className={`relative w-full ${isFullHeight ? 'h-full' : ''} rounded-3xl transform-gpu will-change-transform transition-[border-color,box-shadow] duration-300 ${currentGlow.border} ${currentGlow.shadow} ${innerClassName}`}
      >
        {/* Dynamic Interactive Spotlight following cursor */}
        {interactive && isHovered && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-20"
            style={{
              background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${currentGlow.spotlight}, transparent 70%)`
            }}
          />
        )}

        {children}
      </motion.div>
    </div>
  );
}
