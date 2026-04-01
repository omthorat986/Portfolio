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
