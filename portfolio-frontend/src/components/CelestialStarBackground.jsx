import React, { useEffect, useRef, useState, memo } from 'react';
import './CelestialStarBackground.css';

function CelestialStarBackground() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [themeMode, setThemeMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  // Track theme changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setThemeMode(current);
      if (physicsRef.current) {
        physicsRef.current.isLightMode = current === 'light';
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Dynamic state for celestial physics
  const physicsRef = useRef({
    rotationAngle: 0,
    targetAngle: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    lastScrollTime: 0,
    mouseX: 0,
    mouseY: 0,
    parallaxX: 0,
    parallaxY: 0,
    meteors: [],
    lastMeteorTime: 0,
    stars: [],
    width: 0,
    height: 0,
    dpr: 1,
    isLightMode: document.documentElement.getAttribute('data-theme') === 'light',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Starfield Initialization ─────────────────────────────────
    const initStars = (width, height) => {
      const originX = width * 0.04;
      const originY = height * 0.96;
      const maxRadius = Math.hypot(width - originX, originY) + 320;

      const starCount = Math.min(340, Math.floor((width * height) / 3400));
      const stars = [];

      const colorPaletteDark = [
        { r: 255, g: 255, b: 255 }, // Pure starlight white
        { r: 180, g: 235, b: 255 }, // Celestial cyan
        { r: 215, g: 242, b: 255 }, // Diamond ice blue
        { r: 255, g: 238, b: 205 }, // Warm stellar gold
        { r: 140, g: 215, b: 255 }, // Deep atmospheric blue
      ];

      for (let i = 0; i < starCount; i++) {
        // Distribute radii with higher density outward to match photograph
        const radius = 40 + Math.pow(Math.random(), 0.85) * (maxRadius - 40);
        // Angle covers the visible upper quadrant from bottom-left (approx -PI/2 to PI/4)
        const baseAngle = -Math.PI * 0.65 + Math.random() * (Math.PI * 0.95);
        const color = colorPaletteDark[Math.floor(Math.random() * colorPaletteDark.length)];
        const baseAlpha = 0.35 + Math.random() * 0.65;
        const trailLength = 0.038 + Math.random() * 0.092; // Length of the starlight arc
        const widthPx = 0.9 + Math.random() * 1.8;
        const twinkleRate = 0.6 + Math.random() * 2.0;

        stars.push({
          radius,
          baseAngle,
          color,
          baseAlpha,
          trailLength,
          widthPx,
          twinkleRate,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      return stars;
    };

    // ── Resize Handler ───────────────────────────────────────────
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      physicsRef.current.width = width;
      physicsRef.current.height = height;
      physicsRef.current.dpr = dpr;
      physicsRef.current.stars = initStars(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Scroll & Wheel Dynamics ──────────────────────────────────
    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - (physicsRef.current.lastScrollTime || now));
      const delta = currentY - physicsRef.current.lastScrollY;

      // Calculate instantaneous scroll velocity
      const velocity = Math.min(60, (Math.abs(delta) / dt) * 15);
      physicsRef.current.scrollVelocity = velocity;

      // Rotate celestial vault based on scroll position + momentum
      // Rotating clockwise when scrolling down, counter-clockwise when scrolling up
      physicsRef.current.targetAngle += delta * 0.0014;

      physicsRef.current.lastScrollY = currentY;
      physicsRef.current.lastScrollTime = now;
    };

    const handleWheel = (e) => {
      physicsRef.current.targetAngle += e.deltaY * 0.0008;
      physicsRef.current.scrollVelocity = Math.min(
        50,
        physicsRef.current.scrollVelocity + Math.abs(e.deltaY) * 0.1
      );
    };

    // ── Mouse Parallax ───────────────────────────────────────────
    const handleMouseMove = (e) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      physicsRef.current.mouseX = normX;
      physicsRef.current.mouseY = normY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Main Render & Animation Loop ─────────────────────────────
    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min(50, time - lastTime) / 1000;
      lastTime = time;

      const p = physicsRef.current;
      const { width, height, dpr, stars, isLightMode } = p;

      if (!width || !height) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Smooth celestial rotation (spring interpolation)
      // Constant slow majestic ambient cosmic rotation
      p.targetAngle += 0.02 * dt;
      p.rotationAngle += (p.targetAngle - p.rotationAngle) * 0.08;

      // Decay scroll velocity smoothly
      p.scrollVelocity *= 0.94;

      // Smooth mouse parallax
      p.parallaxX += (p.mouseX * 25 - p.parallaxX) * 0.05;
      p.parallaxY += (p.mouseY * 20 - p.parallaxY) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Celestial origin anchored at left-bottom (as requested)
      const originX = width * 0.04 + p.parallaxX;
      const originY = height * 0.96 + p.parallaxY;

      // ── Sky Horizon Atmosphere Gradient ─────────────────────────
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isLightMode) {
        // Twilight / Golden Hour Astrophotography for Light Mode
        skyGrad.addColorStop(0, '#101e30');
        skyGrad.addColorStop(0.5, '#1e344e');
        skyGrad.addColorStop(0.82, '#355270');
        skyGrad.addColorStop(1, '#577291');
      } else {
        // Pitch-Black Deep Night Sky for Dark Mode (Matches Photograph)
        skyGrad.addColorStop(0, '#030611');
        skyGrad.addColorStop(0.55, '#071020');
        skyGrad.addColorStop(0.85, '#101f34');
        skyGrad.addColorStop(1, '#182b46');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Celestial focal glow at bottom-left
      const focalGlow = ctx.createRadialGradient(
        originX, originY, 10,
        originX, originY, Math.min(width, height) * 0.95
      );
      if (isLightMode) {
        focalGlow.addColorStop(0, 'rgba(235, 175, 110, 0.22)');
        focalGlow.addColorStop(0.45, 'rgba(100, 160, 220, 0.12)');
        focalGlow.addColorStop(1, 'transparent');
      } else {
        focalGlow.addColorStop(0, 'rgba(90, 170, 255, 0.24)');
        focalGlow.addColorStop(0.4, 'rgba(40, 95, 170, 0.10)');
        focalGlow.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = focalGlow;
      ctx.fillRect(0, 0, width, height);

      // ── Draw Rotating Star Trails ────────────────────────────────
      // Velocity multiplier stretches trails dynamically during scroll
      const velocityStretch = 1 + p.scrollVelocity * 0.06;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAngle = star.baseAngle + p.rotationAngle;
        const trailArc = star.trailLength * velocityStretch;

        // Twinkle modulation
        const twinkle = 0.8 + 0.2 * Math.sin(time * 0.002 * star.twinkleRate + star.twinklePhase);
        const alpha = Math.min(1, star.baseAlpha * twinkle * (1 + p.scrollVelocity * 0.02));

        const startAngle = currentAngle - trailArc;
        const endAngle = currentAngle;

        // Draw the curved starlight arc trail
        ctx.beginPath();
        ctx.arc(originX, originY, star.radius, startAngle, endAngle, false);
        ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`;
        ctx.lineWidth = star.widthPx;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright star core at the leading head of the trail
        const headX = originX + star.radius * Math.cos(endAngle);
        const headY = originY + star.radius * Math.sin(endAngle);

        if (headX >= -10 && headX <= width + 10 && headY >= -10 && headY <= height + 10) {
          ctx.beginPath();
          ctx.arc(headX, headY, star.widthPx * 0.95, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.35)})`;
          ctx.fill();
        }
      }

      // ── Periodic Meteor / Shooting Star Streaks ──────────────────
      if (time - p.lastMeteorTime > 3600 + Math.random() * 3800) {
        p.lastMeteorTime = time;
        // Spawn meteor in the upper sky shooting downward-right
        const startX = width * (0.15 + Math.random() * 0.7);
        const startY = height * (0.05 + Math.random() * 0.35);
        const angle = Math.PI * 0.28 + (Math.random() - 0.5) * 0.15;
        const speed = 750 + Math.random() * 500;
        const length = 120 + Math.random() * 160;

        p.meteors.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length,
          life: 1.0,
          decay: 1.2 + Math.random() * 0.8,
        });
      }

      // Render & update active meteors
      for (let i = p.meteors.length - 1; i >= 0; i--) {
        const m = p.meteors[i];
        m.life -= m.decay * dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;

        if (m.life <= 0) {
          p.meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.vx / 800) * m.length;
        const tailY = m.y - (m.vy / 800) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'rgba(180, 230, 255, 0)');
        meteorGrad.addColorStop(0.65, `rgba(200, 240, 255, ${0.45 * m.life})`);
        meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${0.95 * m.life})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright nucleus
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.shadowColor = '#80e5ff';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isLight = themeMode === 'light';

  return (
    <div className={`celestial-viewport ${isLight ? 'mode-light' : 'mode-dark'}`} aria-hidden="true">
      {/* ── Rotating Starfield Canvas ── */}
      <canvas ref={canvasRef} className="celestial-canvas" />

      {/* ── Atmospheric Mountain Horizon Silhouette (Matching Photograph) ── */}
      <div className="mountain-horizon-container">
        {/* Soft atmospheric horizon glow right above mountain crests */}
        <div className="horizon-atmospheric-haze" />

        <svg
          className="mountain-silhouettes-svg"
          viewBox="0 0 1600 360"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Distant mountain ridge gradient */}
            <linearGradient id="backMountainGradDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#142138" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#080e1c" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="backMountainGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#223246" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#162232" stopOpacity="0.98" />
            </linearGradient>

            {/* Foreground mountain ridge gradient (crisp dark silhouettes) */}
            <linearGradient id="frontMountainGradDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a101f" stopOpacity="1" />
              <stop offset="60%" stopColor="#050810" stopOpacity="1" />
              <stop offset="100%" stopColor="#020408" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="frontMountainGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#141d2a" stopOpacity="1" />
              <stop offset="60%" stopColor="#0d141e" stopOpacity="1" />
              <stop offset="100%" stopColor="#080c13" stopOpacity="1" />
            </linearGradient>

            {/* Desert floor light glow filter */}
            <filter id="headlightGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Layer 1: Distant rolling mountain peaks */}
          <path
            d="M0 240
               C180 200, 320 220, 480 250
               C640 280, 800 230, 960 210
               C1120 190, 1300 230, 1460 250
               C1520 258, 1560 262, 1600 265
               L1600 360 L0 360 Z"
            fill={isLight ? 'url(#backMountainGradLight)' : 'url(#backMountainGradDark)'}
          />

          {/* Layer 2: Foreground rugged mountain (prominent left mountain from photo) */}
          <path
            d="M0 260
               C60 220, 120 170, 220 185
               C300 198, 380 260, 520 280
               C680 300, 820 290, 940 300
               C1100 310, 1240 270, 1360 280
               C1460 288, 1540 310, 1600 320
               L1600 360 L0 360 Z"
            fill={isLight ? 'url(#frontMountainGradLight)' : 'url(#frontMountainGradDark)'}
          />

          {/* Ground vehicle headlights / camp lights on desert floor (from photo) */}
          <ellipse
            cx="980"
            cy="338"
            rx="18"
            ry="4"
            fill="#ffffff"
            opacity="0.9"
            filter="url(#headlightGlow)"
          />
          <ellipse cx="980" cy="338" rx="8" ry="2.5" fill="#fffbe8" opacity="1" />

          <ellipse
            cx="1380"
            cy="332"
            rx="14"
            ry="3.5"
            fill="#ffffff"
            opacity="0.85"
            filter="url(#headlightGlow)"
          />
          <ellipse cx="1380" cy="332" rx="6" ry="2" fill="#e8f4ff" opacity="0.95" />
        </svg>

        {/* Deep grounding vignette along bottom edge */}
        <div className="mountain-ground-vignette" />
      </div>
    </div>
  );
}

export default memo(CelestialStarBackground);
