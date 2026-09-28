import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { sounds } from '../utils/soundEffects';
import './MouseScrollIndicator.css';

function MouseScrollIndicator({
  targetId = 'section-skills',
  onToast,
  variant = 'hero',
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [wheelOffset, setWheelOffset] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const scrollTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastSoundTimeRef = useRef(0);
  const velocityTimerRef = useRef(null);

  // ── Global Scroll & Wheel Event Listeners ───────────────────────
  const updateScrollDynamics = useCallback((delta, isWheelEvent = false) => {
    const dir = delta >= 0 ? 'down' : 'up';
    const magnitude = Math.abs(delta);

    setScrollDirection(dir);
    setIsScrolling(true);
    setScrollVelocity(Math.min(100, magnitude * 2));

    // Continuous wheel rotation simulation (cycles within 0 to -40px)
    setWheelOffset((prev) => {
      const step = dir === 'down' ? 6 : -6;
      const next = prev + step;
      // Loop smoothly within notch repeat distance (40px)
      return ((next % 40) + 40) % 40;
    });

    // Tactile sound effect on scroll tick
    const now = Date.now();
    if (now - lastSoundTimeRef.current > 90 && magnitude > 2) {
      if (sounds.playMouseWheelTick) {
        sounds.playMouseWheelTick();
      }
      lastSoundTimeRef.current = now;
    }

    // Clear previous timeout and schedule idle reset
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollVelocity(0);
    }, 280);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentY / docHeight) * 100)));
      }

      if (Math.abs(delta) > 0.5) {
        updateScrollDynamics(delta, false);
      }
      lastScrollYRef.current = currentY;
    };

    const handleWheel = (e) => {
      // Capture wheel tick even if scrolled to boundary
      if (Math.abs(e.deltaY) > 0.5) {
        updateScrollDynamics(e.deltaY, true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (velocityTimerRef.current) clearTimeout(velocityTimerRef.current);
    };
  }, [updateScrollDynamics]);

  // ── Click Action Handler ───────────────────────────────────────
  const handleClick = (e) => {
    e.preventDefault();
    sounds.playMechanicalClick ? sounds.playMechanicalClick() : sounds.playClick();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 220);

    if (onToast) {
      onToast('Mouse Input: Optical 1000Hz • Direct3D precision scroll! 🖱️');
    }

    if (variant === 'floating') {
      // If floating, click returns to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={`mouse-scroll-container ${isHero ? 'mouse-hero-variant' : 'mouse-floating-variant'} ${
        isScrolling ? 'is-scrolling' : ''
      } ${isPressed ? 'is-pressed' : ''} direction-${scrollDirection}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick(e);
      }}
      title={isHero ? 'Click to glide to developer systems (or scroll down)' : 'Scroll progress & Return to top'}
      aria-label={isHero ? 'Scroll to explore mouse indicator' : 'Floating scroll progress mouse'}
    >
      {/* ── Outer Shell & Hardware Mouse Device ── */}
      <div className="mouse-device">
        {/* Optical Sensor Underglow (illuminates surface underneath) */}
        <div
          className="mouse-optical-flare"
          style={{
            opacity: isScrolling ? 0.95 : 0.45,
            transform: isScrolling ? 'scale(1.2)' : 'scale(1)',
          }}
          aria-hidden="true"
        />

        {/* Chassis Body */}
        <div className="mouse-chassis">
          {/* Top Button Shell with Left/Right Split */}
          <div className="mouse-buttons-row">
            <div className={`mouse-btn btn-left ${isPressed ? 'btn-active-pressed' : ''}`}>
              <span className="btn-notch" />
            </div>
            <div className="mouse-btn-divider" />
            <div className="mouse-btn btn-right" />
          </div>

          {/* Mechanical Scroll Wheel Chamber */}
          <div className="mouse-wheel-well">
            <div
              className={`mouse-wheel-cylinder ${isScrolling ? 'wheel-spinning' : ''}`}
              style={{
                transform: `translate(-50%, ${wheelOffset - 20}px)`,
              }}
            >
              {/* Textured wheel tread rungs */}
              <span className="wheel-tread t1" />
              <span className="wheel-tread t2" />
              <span className="wheel-tread t3" />
              <span className="wheel-tread t4" />
              <span className="wheel-tread t5" />
              <span className="wheel-tread t6" />
              <span className="wheel-tread t7" />
            </div>
            {/* Center wheel rim accent */}
            <div className="mouse-wheel-core" />
          </div>

          {/* DPI Switch Button */}
          <div className="mouse-dpi-switch" title="DPI Selector" />

          {/* RGB Edge Accent Strip */}
          <div className="mouse-rgb-rail" aria-hidden="true" />

          {/* Ergonomic Palm Arch */}
          <div className="mouse-palm-curve">
            <span className="mouse-logo-mark">OM</span>
          </div>
        </div>
      </div>

      {/* ── Directional Speed Chevrons (Animate on Scroll) ── */}
      <div className="mouse-scroll-chevrons" aria-hidden="true">
        <span className="scroll-chevron-arrow arr-1">&#x25BE;</span>
        <span className="scroll-chevron-arrow arr-2">&#x25BE;</span>
        <span className="scroll-chevron-arrow arr-3">&#x25BE;</span>
      </div>

      {/* ── Status Caption & Dynamic Feedback ── */}
      <div className="mouse-scroll-caption">
        <span className="mouse-caption-text">
          {isScrolling ? (
            <span className="caption-live-state">
              {scrollDirection === 'down' ? 'SCROLLING DOWN' : 'SCROLLING UP'}
            </span>
          ) : (
            'SCROLL TO EXPLORE'
          )}
        </span>

        {isScrolling && (
          <span className="mouse-speed-chip" title="Hardware Polling Frequency">
            1000Hz
          </span>
        )}
      </div>

      {/* ── Floating Variant Circular Progress Ring ── */}
      {!isHero && (
        <svg className="floating-progress-ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle className="progress-ring-bg" cx="32" cy="32" r="28" />
          <circle
            className="progress-ring-fill"
            cx="32"
            cy="32"
            r="28"
            style={{
              strokeDasharray: 175.9,
              strokeDashoffset: 175.9 - (175.9 * scrollProgress) / 100,
            }}
          />
        </svg>
      )}
    </div>
  );
}

export default memo(MouseScrollIndicator);
