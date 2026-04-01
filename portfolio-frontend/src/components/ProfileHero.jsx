import React from 'react';
import TerminalBio from './TerminalBio';
import StudioBadge from './StudioBadge';
import './ProfileHero.css';

export default function ProfileHero() {
  return (
    <section className="profile-hero desk-environment">
      <div className="hero-content">
        <div className="hero-left module-terminal">
          <TerminalBio />
        </div>
        <div className="hero-right module-badge">
          <StudioBadge />
        </div>
      </div>

      <div className="pixel-sprite" aria-hidden="true">
        <span className="sprite-eye eye-left"></span>
        <span className="sprite-eye eye-right"></span>
      </div>

      <div className="pokeball-orb" aria-hidden="true">
        <span className="pokeball-center"></span>
      </div>

      <div className="minecraft-block" aria-hidden="true">
        <span className="block-pixel p1"></span>
        <span className="block-pixel p2"></span>
        <span className="block-pixel p3"></span>
        <span className="block-pixel p4"></span>
      </div>

      <div className="race-car" aria-hidden="true">
        <span className="car-cabin"></span>
        <span className="car-wheel wheel-front"></span>
        <span className="car-wheel wheel-back"></span>
      </div>

      <div className="flair flair-coffee" aria-hidden="true" />
      <div className="flair flair-dice" aria-hidden="true" />

      <div className="scroll-indicator">
        <span className="mouse">
          <span className="wheel"></span>
        </span>
        <p>Scroll to Explore</p>
      </div>
    </section>
  );
}
