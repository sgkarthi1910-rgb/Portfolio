import React, { useEffect, useRef } from 'react';
import saturnUrl from '../assets/saturn_planet.png';
import galaxyUrl from '../assets/andromeda_galaxy.png';

// Scientifically accurate stellar spectral classes (Morgan-Keenan System)
// Realistic deep-space color temperatures: dignified, crystalline, non-saturated
const SPECTRAL_CLASSES = [
  { class: 'O', color: '#c7d9fe', core: '#ffffff', glow: 'rgba(199, 217, 254, 0.40)', weight: 0.10 },
  { class: 'B', color: '#dbeafe', core: '#ffffff', glow: 'rgba(219, 234, 254, 0.35)', weight: 0.18 },
  { class: 'A', color: '#ffffff', core: '#ffffff', glow: 'rgba(255, 255, 255, 0.45)', weight: 0.28 },
  { class: 'F', color: '#f8fafc', core: '#ffffff', glow: 'rgba(248, 250, 252, 0.30)', weight: 0.20 },
  { class: 'G', color: '#fef3c7', core: '#fffdf5', glow: 'rgba(254, 243, 199, 0.35)', weight: 0.14 },
  { class: 'K', color: '#fed7aa', core: '#fff7ed', glow: 'rgba(254, 215, 170, 0.30)', weight: 0.07 },
  { class: 'M', color: '#fecdd3', core: '#fff1f2', glow: 'rgba(254, 205, 211, 0.25)', weight: 0.03 }
];

function getRandomSpectralStar() {
  const rand = Math.random();
  let cumulative = 0;
  for (const s of SPECTRAL_CLASSES) {
    cumulative += s.weight;
    if (rand <= cumulative) return s;
  }
  return SPECTRAL_CLASSES[2];
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const raRef = useRef(null);
  const decRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let isTabVisible = true;
    let lastTime = performance.now();
    let simTime = 0;

    // Load celestial deep-sky photographic assets
    const saturnImg = new Image();
    saturnImg.src = saturnUrl;

    const galaxyImg = new Image();
    galaxyImg.src = galaxyUrl;

    // Detect mobile / coarse pointer
    const isMobileDevice = () => {
      return (
        window.innerWidth < 768 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
      );
    };

    let isMobile = isMobileDevice();
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasDimensions = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = isMobileDevice();

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasDimensions();

    // Physics camera & mouse state with smooth inertia
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      prevX: width * 0.5,
      prevY: height * 0.35,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false
    };

    const camera = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      scrollY: window.scrollY || 0,
      targetScrollY: window.scrollY || 0
    };

    // Silky Cosmic Comet Slipstream Trail
    const cometTrail = [];
    const maxTrailPoints = 22;

    // Interactive Constellation & Trailing Stardust Particles
    const stardustParticles = [];
    const maxStardust = 35;
    const stardustColors = ['#38bdf8', '#c084fc', '#fef08a', '#ffffff', '#e0e7ff'];

    // Offscreen Canvas Cache for 60/120 FPS hardware-accelerated star blitting
    const spriteCache = {
      starGlows: {}
    };

    const initStarSprites = () => {
      SPECTRAL_CLASSES.forEach((s) => {
        const spriteSize = 32;
        const offCanvas = document.createElement('canvas');
        offCanvas.width = spriteSize;
        offCanvas.height = spriteSize;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return;

        const half = spriteSize / 2;
        const grad = offCtx.createRadialGradient(half, half, 0, half, half, half);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.22, s.color);
        grad.addColorStop(0.55, s.glow);
        grad.addColorStop(1, 'transparent');

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(half, half, half, 0, Math.PI * 2);
        offCtx.fill();

        spriteCache.starGlows[s.class] = offCanvas;
      });
    };

    initStarSprites();

    // Star Collections
    let microStars = [];
    let classifiedStars = [];
    let landmarkStars = [];
    let meteors = [];

    const initStars = () => {
      microStars = [];
      classifiedStars = [];
      landmarkStars = [];
      meteors = [];

      // A: Deep-Field Unresolved Micro-Stars (Milky Way Backdrop)
      const microCount = isMobile
        ? Math.min(Math.floor(width * 0.16), 130)
        : Math.min(Math.floor(width * 0.28), 380);

      for (let i = 0; i < microCount; i++) {
        const u = Math.random();
        const beltY = (u * 0.65 + 0.18) * height + (Math.random() - 0.5) * height * 0.45;

        microStars.push({
          x: Math.random() * width,
          y: beltY,
          size: Math.random() * 0.75 + 0.25,
          alpha: Math.random() * 0.45 + 0.18,
          breatheSpeed: Math.random() * 0.08 + 0.04,
          breathePhase: Math.random() * Math.PI * 2,
          parallaxFactor: Math.random() * 0.012 + 0.004,
          vx: (Math.random() - 0.5) * 0.025,
          vy: (Math.random() - 0.5) * 0.018
        });
      }

      // B: Medium Classified Stars with Physical Morgan-Keenan Spectral Radiance
      const medCount = isMobile
        ? Math.min(Math.floor(width * 0.04), 22)
        : Math.min(Math.floor(width * 0.06), 65);

      for (let i = 0; i < medCount; i++) {
        const spectral = getRandomSpectralStar();
        const depth = Math.random();
        classifiedStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: depth > 0.75 ? Math.random() * 0.9 + 1.1 : Math.random() * 0.6 + 0.6,
          spectral: spectral,
          alpha: Math.random() * 0.35 + 0.45,
          depth: depth,
          breatheSpeed: Math.random() * 0.05 + 0.02,
          breathePhase: Math.random() * Math.PI * 2,
          parallaxFactor: depth * 0.028 + 0.010,
          vx: (Math.random() - 0.45) * 0.035 * (depth + 0.2),
          vy: (Math.random() - 0.5) * 0.025 * (depth + 0.2)
        });
      }

      // C: 2 Prominent Landmark Stars
      const primaryCount = isMobile ? 1 : 2;
      for (let i = 0; i < primaryCount; i++) {
        const spectral = i === 0 ? SPECTRAL_CLASSES[0] : SPECTRAL_CLASSES[4];
        landmarkStars.push({
          x: (0.16 + i * 0.58) * width + (Math.random() - 0.5) * 60,
          y: (0.18 + i * 0.42) * height,
          radius: 1.8,
          spectral: spectral,
          spikeLength: isMobile ? 16 : 24,
          alpha: 0.85,
          parallaxFactor: 0.035,
          vx: 0.01,
          vy: -0.008
        });
      }
    };

    initStars();

    // Occasional Realistic Hypersonic Meteor
    const spawnMeteor = () => {
      if (meteors.length >= 1) return;
      const startX = Math.random() * width * 0.75 + width * 0.15;
      const startY = Math.random() * height * 0.28;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 12 + 16;

      meteors.push({
        x: startX,
        y: startY,
        dx: -Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 120 + 90,
        width: 1.2,
        life: 1.0,
        decay: Math.random() * 0.018 + 0.012,
        color: '#e0f2fe'
      });
    };

    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.40) {
        spawnMeteor();
      }
    }, 8500);

    // Event Handlers
    const handleResize = () => {
      setCanvasDimensions();
      initStarSprites();
      initStars();
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.active = true;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      camera.targetX = (e.clientX - width / 2) * 0.45;
      camera.targetY = (e.clientY - height / 2) * 0.45;

      const raH = ((e.clientX / width) * 24).toFixed(0).padStart(2, '0');
      const raM = Math.floor(((e.clientX / width) * 1440) % 60).toString().padStart(2, '0');
      const raS = Math.floor(((e.clientX / width) * 86400) % 60).toString().padStart(2, '0');
      const decSign = e.clientY < height / 2 ? '+' : '-';
      const decD = Math.floor(Math.abs((height / 2 - e.clientY) / (height / 2)) * 89).toString().padStart(2, '0');
      const decM = Math.floor((Math.abs(e.clientY / height) * 60) % 60).toString().padStart(2, '0');

      if (raRef.current) raRef.current.textContent = `${raH}h ${raM}m ${raS}s`;
      if (decRef.current) decRef.current.textContent = `${decSign}${decD}° ${decM}′ 14″`;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleMouseEnter = () => {
      if (!isMobile) mouse.active = true;
    };

    const handleScroll = () => {
      camera.targetScrollY = window.scrollY || window.pageYOffset || 0;
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ==========================================
    // BUTTERY SMOOTH 60/120 FPS RENDERING LOOP
    // ==========================================
    const render = (now) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      simTime += dt;

      // Smooth camera interpolation
      camera.x += (camera.targetX - camera.x) * 0.035;
      camera.y += (camera.targetY - camera.y) * 0.035;
      camera.scrollY += (camera.targetScrollY - camera.scrollY) * 0.055;

      // Mouse tracking
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.48;
      mouse.y += (mouse.targetY - mouse.y) * 0.48;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.speed = Math.hypot(mouse.vx, mouse.vy);

      // Comet trail
      if (!isMobile && mouse.active) {
        const distFromHead = cometTrail.length > 0
          ? Math.hypot(mouse.x - cometTrail[0].x, mouse.y - cometTrail[0].y)
          : 100;

        if (distFromHead > 4.0 || (mouse.speed > 0.5 && distFromHead > 2.0)) {
          cometTrail.unshift({
            x: mouse.x,
            y: mouse.y,
            width: Math.min(Math.max(mouse.speed * 0.70 + 2.2, 3.0), 7.2),
            life: 1.0,
            decay: 0.052
          });

          if (cometTrail.length > maxTrailPoints) {
            cometTrail.pop();
          }
        }

        // Trailing Stardust micro-particle generation
        if (mouse.speed > 0.35 || Math.random() < 0.14) {
          if (stardustParticles.length < maxStardust) {
            const angle = Math.random() * Math.PI * 2;
            const driftSpeed = Math.random() * 0.75 + 0.2;
            stardustParticles.push({
              x: mouse.x + (Math.random() - 0.5) * 14,
              y: mouse.y + (Math.random() - 0.5) * 14,
              vx: Math.cos(angle) * driftSpeed - mouse.vx * 0.12,
              vy: Math.sin(angle) * driftSpeed - mouse.vy * 0.12,
              size: Math.random() * 1.5 + 0.5,
              color: stardustColors[Math.floor(Math.random() * stardustColors.length)],
              life: 1.0,
              maxAlpha: Math.random() * 0.5 + 0.45,
              decay: Math.random() * 0.025 + 0.015
            });
          }
        }
      }

      for (let i = cometTrail.length - 1; i >= 0; i--) {
        const pt = cometTrail[i];
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          cometTrail.splice(i, 1);
        }
      }

      // LAYER 1: Deep Astronomical Obsidian Canvas
      ctx.fillStyle = '#010206';
      ctx.fillRect(0, 0, width, height);

      // LAYER 2: Volumetric Interstellar Nebulae & Dust Lanes (Merged Theme Colors)
      // 2a: Deep Space Cosmic Violet Nebula (Radiating organically from Andromeda)
      const galX = width * (isMobile ? 0.24 : 0.20) - camera.x * 0.005;
      const galY = height * (isMobile ? 0.32 : 0.26) - (camera.y * 0.005 + camera.scrollY * 0.015);

      const nebGrad1 = ctx.createRadialGradient(
        galX,
        galY,
        15,
        galX,
        galY,
        width * (isMobile ? 0.65 : 0.48)
      );
      nebGrad1.addColorStop(0, 'rgba(168, 85, 247, 0.16)'); // Deep cosmic violet
      nebGrad1.addColorStop(0.35, 'rgba(126, 34, 206, 0.09)');
      nebGrad1.addColorStop(0.70, 'rgba(30, 27, 75, 0.03)');
      nebGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad1;
      ctx.fillRect(0, 0, width, height);

      // 2b: Oxygen-III Electric Cyan Nebula (Top-Right / Saturn Sector)
      const nebGrad2 = ctx.createRadialGradient(
        width * 0.76 - camera.x * 0.012,
        height * 0.28 - camera.scrollY * 0.022,
        30,
        width * 0.76 - camera.x * 0.012,
        height * 0.28 - camera.scrollY * 0.022,
        width * (isMobile ? 0.62 : 0.45)
      );
      nebGrad2.addColorStop(0, 'rgba(56, 189, 248, 0.10)'); // Electric cyan
      nebGrad2.addColorStop(0.45, 'rgba(14, 116, 144, 0.06)');
      nebGrad2.addColorStop(0.80, 'rgba(15, 23, 42, 0.03)');
      nebGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2c: Deep Space Indigo Ambient Veil (Mid-Field Depth)
      const nebGrad3 = ctx.createRadialGradient(
        width * 0.50,
        height * 0.75 - camera.scrollY * 0.025,
        40,
        width * 0.50,
        height * 0.75 - camera.scrollY * 0.025,
        width * 0.55
      );
      nebGrad3.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      nebGrad3.addColorStop(0.55, 'rgba(15, 23, 42, 0.03)');
      nebGrad3.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad3;
      ctx.fillRect(0, 0, width, height);

      // =========================================================================
      // LAYER 3: Deep-Space Andromeda Galaxy (M31) - PERFECT THEME MERGE
      // Deep space celestial backdrop with gentle starlight breathing & organic bloom
      // =========================================================================
      const galBreathe = Math.sin(simTime * 0.16) * 0.03;
      const galScalePulse = 1.0 + Math.sin(simTime * 0.10) * 0.012;
      const baseDrawSize = isMobile ? 320 : 440;
      const drawSize = baseDrawSize * galScalePulse;

      ctx.save();
      ctx.translate(galX, galY);

      // 3.1: Natural Astronomical Inclination (~-26.4 degrees line-of-sight tilt)
      ctx.rotate(-0.461);

      // 3.2: Elliptical Starlight Core Bloom (Seamlessly fuses core into background)
      ctx.save();
      ctx.scale(1.0, 0.58);
      const coreBloom = ctx.createRadialGradient(0, 0, 5, 0, 0, drawSize * 0.44);
      coreBloom.addColorStop(0, 'rgba(254, 243, 199, 0.26)'); // Warm starlight nucleus
      coreBloom.addColorStop(0.25, 'rgba(168, 85, 247, 0.16)'); // Cosmic violet halo
      coreBloom.addColorStop(0.60, 'rgba(56, 189, 248, 0.06)'); // Cyan arm ambiance
      coreBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = coreBloom;
      ctx.beginPath();
      ctx.arc(0, 0, drawSize * 0.44, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3.3: Additive Screen Blending for 100% Seamless Starlight Integration
      // Pure deep space black is 100% transparent; only starlight, dust lanes & arms render
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = Math.max(0.70, Math.min(1.0, 0.90 + galBreathe));

      if (galaxyImg.complete && galaxyImg.naturalWidth > 0) {
        ctx.drawImage(galaxyImg, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      }

      ctx.restore();

      // Reset composite mode
      ctx.globalCompositeOperation = 'source-over';

      // LAYER 4: Deep-Field Unresolved Micro-Stars (Milky Way Stardust)
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < microStars.length; i++) {
        const s = microStars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.018);

        if (px < -5 || px > width + 5 || py < -5 || py > height + 5) continue;

        const breathe = Math.sin(simTime * s.breatheSpeed + s.breathePhase) * 0.06;
        const alpha = Math.max(0.12, Math.min(0.70, s.alpha + breathe));

        ctx.globalAlpha = alpha;
        ctx.fillRect(px, py, s.size, s.size);
      }

      // LAYER 5: Classified Stars with Hardware-Accelerated Sprite Blitting & Constellation Proximity
      const nearbyConstellationStars = [];

      for (let i = 0; i < classifiedStars.length; i++) {
        const s = classifiedStars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        else if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        else if (s.y > height) s.y = 0;

        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.032);

        if (px < -15 || px > width + 15 || py < -15 || py > height + 15) continue;

        let drawX = px;
        let drawY = py;

        if (!isMobile && mouse.active) {
          const dx = mouse.targetX - px;
          const dy = mouse.targetY - py;
          const r2 = dx * dx + dy * dy;
          const softening = 180 * 180;
          const deflection = (3500 * s.depth) / (r2 + softening);
          drawX -= dx * deflection;
          drawY -= dy * deflection;

          // Track proximity for constellation network
          const mDist = Math.hypot(drawX - mouse.targetX, drawY - mouse.targetY);
          if (mDist < 165) {
            nearbyConstellationStars.push({ ...s, drawX, drawY, mDist });
          }
        }

        const breathe = Math.sin(simTime * s.breatheSpeed + s.breathePhase) * 0.07;
        const alpha = Math.max(0.25, Math.min(0.95, s.alpha + breathe));

        const sprite = spriteCache.starGlows[s.spectral.class];
        if (sprite) {
          const glowDiameter = s.radius * 6.5;
          ctx.globalAlpha = alpha * 0.50;
          ctx.drawImage(
            sprite,
            drawX - glowDiameter / 2,
            drawY - glowDiameter / 2,
            glowDiameter,
            glowDiameter
          );
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = s.spectral.core;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // =========================================================================
      // LAYER 5.5: Interactive Constellation Network & Trailing Stardust
      // Subtle starry web connecting cursor to nearby stellar nodes across space gaps
      // =========================================================================
      if (!isMobile && mouse.active && nearbyConstellationStars.length > 0) {
        ctx.save();
        ctx.lineWidth = 0.85;

        for (let i = 0; i < nearbyConstellationStars.length; i++) {
          const s1 = nearbyConstellationStars[i];
          const filamentAlpha = (1 - s1.mDist / 165) * 0.45;

          // 1. Radiant constellation laser filament from cursor to star
          ctx.strokeStyle = `rgba(56, 189, 248, ${filamentAlpha})`;
          ctx.beginPath();
          ctx.moveTo(mouse.targetX, mouse.targetY);
          ctx.lineTo(s1.drawX, s1.drawY);
          ctx.stroke();

          // 2. Luminous constellation nexus ring around the star
          ctx.strokeStyle = `rgba(168, 85, 247, ${filamentAlpha * 0.70})`;
          ctx.beginPath();
          ctx.arc(s1.drawX, s1.drawY, s1.radius * 2.8, 0, Math.PI * 2);
          ctx.stroke();

          // 3. Inter-stellar polygon filaments between nearby stars
          for (let j = i + 1; j < nearbyConstellationStars.length; j++) {
            const s2 = nearbyConstellationStars[j];
            const starDist = Math.hypot(s1.drawX - s2.drawX, s1.drawY - s2.drawY);
            if (starDist < 135) {
              const interAlpha = (1 - starDist / 135) * filamentAlpha * 0.40;
              ctx.strokeStyle = `rgba(192, 132, 252, ${interAlpha})`;
              ctx.beginPath();
              ctx.moveTo(s1.drawX, s1.drawY);
              ctx.lineTo(s2.drawX, s2.drawY);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // Trailing Stardust Particles Simulation
      if (stardustParticles.length > 0) {
        ctx.save();
        for (let i = stardustParticles.length - 1; i >= 0; i--) {
          const p = stardustParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.life -= p.decay;

          if (p.life <= 0) {
            stardustParticles.splice(i, 1);
            continue;
          }

          const currentAlpha = p.life * p.maxAlpha;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 1.1) {
            ctx.globalAlpha = currentAlpha * 0.35;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // =========================================================================
      // LAYER 6: Saturn Planetary System - SCROLL-LINKED ORBIT & 3D PARALLAX TILT
      // As the user navigates through chapters, Saturn glides along an interplanetary
      // orbital vector and its ring perspective tilts dynamically like a flyby camera!
      // =========================================================================
      const maxScroll = Math.max(1, (document.documentElement.scrollHeight || 4500) - height);
      const scrollProgress = Math.min(1, Math.max(0, camera.scrollY / maxScroll));

      // Scroll-Linked Orbital Vector
      const scrollOrbitX = (scrollProgress - 0.25) * (isMobile ? -28 : -115);
      const scrollOrbitY = Math.sin(scrollProgress * Math.PI) * (isMobile ? 22 : 60);

      const planetBaryX = width * (isMobile ? 0.64 : 0.70) - camera.x * 0.015 + scrollOrbitX;
      const planetBaryY = height * (isMobile ? 0.22 : 0.26) - (camera.y * 0.015 + camera.scrollY * 0.022) + scrollOrbitY;
      const planetRevRadiusX = isMobile ? 40 : 105;
      const planetRevRadiusY = isMobile ? 22 : 52;
      const planetRevTilt = -0.22;
      const planetRevSpeed = 0.09;
      const planetRevAngle = simTime * planetRevSpeed;

      // Faint Planetary Orbital Vector Track Ring (Cyan Theme Accent)
      ctx.save();
      ctx.translate(planetBaryX, planetBaryY);
      ctx.rotate(planetRevTilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, planetRevRadiusX, planetRevRadiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.070)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();
      ctx.restore();

      // Parametric Revolution Coordinates with 3D Depth
      const pCos = Math.cos(planetRevAngle);
      const pSin = Math.sin(planetRevAngle);
      const pUnrotX = pCos * planetRevRadiusX;
      const pUnrotY = pSin * planetRevRadiusY;

      const planetOrbitX = pUnrotX * Math.cos(planetRevTilt) - pUnrotY * Math.sin(planetRevTilt);
      const planetOrbitY = pUnrotX * Math.sin(planetRevTilt) + pUnrotY * Math.cos(planetRevTilt);

      const planetX = planetBaryX + planetOrbitX;
      const planetY = planetBaryY + planetOrbitY;

      // Depth Factor linked with orbital flyby progression
      const depthFactor = (1.0 + pSin * 0.12) * (1.0 - scrollProgress * 0.06);
      const baseRadius = isMobile ? 36 : Math.max(48, Math.min(width * 0.060, 72));
      const planetRadius = baseRadius * depthFactor;

      // Scroll-Linked 3D Ring Perspective Tilt:
      // Rotates perspective by ~16° smoothly across the page scroll (Hero → Contact)
      const scrollTiltDelta = (scrollProgress - 0.35) * 0.28;
      const planetTilt = -0.16 + scrollTiltDelta + Math.sin(simTime * 0.08) * 0.02;

      ctx.save();
      ctx.translate(planetX, planetY);

      // 6.1: Ambient Nebula Light Wrap (Cyan/Purple Rim Light behind Saturn)
      const saturnBackdropGlow = ctx.createRadialGradient(
        0, 0, planetRadius * 0.3,
        0, 0, planetRadius * 2.1
      );
      saturnBackdropGlow.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      saturnBackdropGlow.addColorStop(0.45, 'rgba(147, 51, 234, 0.09)');
      saturnBackdropGlow.addColorStop(0.80, 'rgba(15, 23, 42, 0.04)');
      saturnBackdropGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = saturnBackdropGlow;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius * 2.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.rotate(planetTilt);

      // 6.2: Moon satellite orbital calculation (Relative to revolving Saturn)
      const moonAngle = simTime * 0.24;
      const moonOrbitA = planetRadius * 2.15;
      const moonOrbitB = planetRadius * 0.50;
      const moonRelX = Math.cos(moonAngle) * moonOrbitA;
      const moonRelY = Math.sin(moonAngle) * moonOrbitB;
      const isMoonInFront = Math.sin(moonAngle) >= 0;
      const moonRadius = isMobile ? 2.2 : 3.2 * depthFactor;

      const drawMoon = () => {
        ctx.save();
        ctx.translate(moonRelX, moonRelY);
        ctx.beginPath();
        ctx.arc(0, 0, moonRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 243, 199, 0.25)';
        ctx.fill();

        const mGrad = ctx.createRadialGradient(
          -moonRadius * 0.35, -moonRadius * 0.35, moonRadius * 0.05,
          moonRadius * 0.2, moonRadius * 0.2, moonRadius * 1.05
        );
        mGrad.addColorStop(0, '#ffffff');
        mGrad.addColorStop(0.35, '#fef3c7');
        mGrad.addColorStop(0.70, '#78716c');
        mGrad.addColorStop(1, '#020617');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      if (!isMoonInFront) {
        drawMoon();
      }

      // 6.3: Draw Authentic Full Saturn Picture (Complete Globe & Rings)
      const saturnW = planetRadius * 3.6;
      const saturnH = planetRadius * 3.6;

      if (saturnImg.complete && saturnImg.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = Math.max(0.85, Math.min(1.0, 0.96 + pSin * 0.04));
        ctx.drawImage(saturnImg, -saturnW / 2, -saturnH / 2, saturnW, saturnH);

        // 6.4: Cyan / Blue Atmospheric Rayleigh Scattering Rim (Theme Fusion)
        // Wraps the theme's electric cyan starlight softly around the sunlit horizon
        ctx.globalCompositeOperation = 'screen';
        const atmoRim = ctx.createRadialGradient(
          -saturnW * 0.12, -saturnH * 0.10, planetRadius * 0.65,
          -saturnW * 0.09, -saturnH * 0.07, planetRadius * 1.05
        );
        atmoRim.addColorStop(0, 'rgba(56, 189, 248, 0.30)');
        atmoRim.addColorStop(0.40, 'rgba(96, 165, 250, 0.12)');
        atmoRim.addColorStop(1, 'transparent');
        ctx.fillStyle = atmoRim;
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius * 1.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Transit Moon Shadow (Solar Eclipse) on Saturn surface when moon passes in front
      if (isMoonInFront && Math.hypot(moonRelX, moonRelY) < planetRadius * 0.90) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(moonRelX * 0.85, moonRelY * 0.85, moonRadius * 1.2, moonRadius * 0.9, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(1, 2, 6, 0.70)';
        ctx.fill();
        ctx.restore();
      }

      if (isMoonInFront) {
        drawMoon();
      }

      ctx.restore(); // Restore planet translation/rotation

      // LAYER 7: 2 Subtle Landmark Stars with Elegant Optical JWST Spikes
      for (let i = 0; i < landmarkStars.length; i++) {
        const s = landmarkStars[i];
        const px = s.x - camera.x * s.parallaxFactor;
        const py = s.y - (camera.y * s.parallaxFactor + camera.scrollY * 0.038);

        if (px < -30 || px > width + 30 || py < -30 || py > height + 30) continue;

        ctx.save();
        ctx.translate(px, py);

        const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s.radius * 4.0);
        haloGrad.addColorStop(0, '#ffffff');
        haloGrad.addColorStop(0.35, s.spectral.color);
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(0, 0, s.radius * 4.0, 0, Math.PI * 2);
        ctx.globalAlpha = 0.50;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, s.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fill();

        const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];
        ctx.lineWidth = 0.75;

        for (const ang of angles) {
          const endX = Math.cos(ang) * s.spikeLength;
          const endY = Math.sin(ang) * s.spikeLength;

          const spikeGrad = ctx.createLinearGradient(0, 0, endX, endY);
          spikeGrad.addColorStop(0, '#ffffff');
          spikeGrad.addColorStop(0.3, s.spectral.color);
          spikeGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = spikeGrad;
          ctx.globalAlpha = 0.40;
          ctx.stroke();
        }

        ctx.restore();
      }

      // LAYER 8: Silky Cosmic Comet Slipstream (Soft Celestial Ion Ribbon, Zero Glitters)
      if (cometTrail.length >= 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 8a: Soft Outer Ion Glow Wake (Diffuse Cyan/Violet)
        for (let i = 0; i < cometTrail.length - 1; i++) {
          const p1 = cometTrail[i];
          const p2 = cometTrail[i + 1];
          const segProgress = 1 - (i / cometTrail.length);
          const alpha = p1.life * segProgress * 0.25;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = p1.width * 3.2 * segProgress;
          ctx.stroke();
        }

        // 8b: Focused Celestial Core Ribbon (Ice-Cyan into Gentle Cosmic Starlight Violet)
        for (let i = 0; i < cometTrail.length - 1; i++) {
          const p1 = cometTrail[i];
          const p2 = cometTrail[i + 1];
          const segProgress = 1 - (i / cometTrail.length);
          const alpha = p1.life * segProgress * 0.72;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const r = Math.round(186 + (192 - 186) * (1 - segProgress));
          const g = Math.round(230 + (132 - 230) * (1 - segProgress));
          const b = Math.round(253 + (252 - 253) * (1 - segProgress));

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = Math.max(1.2, p1.width * 1.1 * segProgress);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 8c: Subtle Luminous Ion Glow at Cursor Tip
      if (!isMobile && mouse.active && mouse.speed > 0.25) {
        const headRadius = Math.min(16 + mouse.speed * 1.4, 30);
        const headGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, headRadius
        );
        headGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        headGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.10)');
        headGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, headRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // LAYER 9: Occasional Hypersonic Meteor Streak
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        const mGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        mGrad.addColorStop(0, '#ffffff');
        mGrad.addColorStop(0.2, m.color);
        mGrad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = m.life * 0.85;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(headX, headY, m.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = m.life;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010206]">
      {/* Hardware-Accelerated Deep-Space Simulation Canvas */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />

      {/* Deep Sky Astrometry Observatory Telemetry HUD (Desktop Only, Unobtrusive) */}
      <div className="absolute bottom-6 right-8 pointer-events-none hidden xl:flex flex-col text-right text-[11px] font-mono text-slate-500/80 tracking-widest uppercase select-none">
        <div className="flex items-center justify-end gap-2 text-cyan-400/90 font-semibold mb-1">
          <span>DEEP SKY ASTROMETRY // CELESTIAL SURVEY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
        </div>
        <div className="text-[10px] text-slate-400/70 space-y-0.5">
          <div>CELESTIAL BODIES: SATURN SYSTEM • ANDROMEDA GALAXY M31</div>
          <div>RIGHT ASCENSION (α): <span ref={raRef} className="text-purple-300 font-mono">18h 36m 56s</span></div>
          <div>DECLINATION (δ): <span ref={decRef} className="text-cyan-300 font-mono">+38° 47′ 01″</span></div>
          <div>ORBITAL KINEMATICS: <span className="text-emerald-400 font-mono">DUAL CELESTIAL REVOLUTION</span></div>
        </div>
      </div>

      {/* Subtle Cinematic Vignette for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(1, 2, 6, 0.70) 100%)'
        }}
      />
    </div>
  );
}
