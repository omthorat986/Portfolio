import React from 'react';
import TerminalBio from './TerminalBio';
import StudioBadge from './StudioBadge';
import PokeballSticker from './PokeballSticker';
import CarSticker from './CarSticker';
import MouseScrollIndicator from './MouseScrollIndicator';
import { sounds } from '../utils/soundEffects';
import './ProfileHero.css';

export default function ProfileHero({ onOpenProject, onOpenDossier, onToast }) {
  const handleItemClick = (name, toastMsg) => {
    sounds.playMechanicalClick();
    if (onToast) onToast(toastMsg || `${name} sticker inspected! 🎮`);
  };

  return (
    <section className="profile-hero" id="hero-section">
      <div className="hero-content">
        <div className="hero-left module-terminal">
          <TerminalBio
            onOpenProject={onOpenProject}
            onOpenDossier={onOpenDossier}
            onToast={onToast}
          />
        </div>
        <div className="hero-right module-badge">
          <StudioBadge onOpenDossier={onOpenDossier} />
        </div>
      </div>

      {/* ── Realistic Die-Cut Pokéball Sticker ── */}
      <PokeballSticker onToast={onToast} />

      {/* ── Cyber Racer Supercar Die-Cut Sticker ── */}
      <CarSticker onToast={onToast} />

      {/* ── Companion Pixel Sprite Vinyl Sticker ── */}
      <div
        className="pixel-sprite hero-diecut-sticker"
        role="button"
        tabIndex={0}
        title="8-Bit Ghost Companion Sticker (Click to pet)"
        onClick={() => handleItemClick('Companion Sprite', 'Pixel Companion: "Beep boop! Ready to code!" 👾')}
        onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('Companion Sprite', 'Pixel Companion: "Beep boop! Ready to code!" 👾'); }}
      >
        <span className="sprite-eye eye-left"></span>
        <span className="sprite-eye eye-right"></span>
        <div className="hero-sticker-sheen" aria-hidden="true" />
      </div>

      {/* ── Voxel Grass Block Die-Cut Sticker ── */}
      <div
        className="minecraft-block hero-diecut-sticker"
        role="button"
        tabIndex={0}
        title="Voxel Grass Block Sticker (Click to mine)"
        onClick={() => handleItemClick('Voxel Terrain', 'Mined 1x Voxel Grass Block! [Inventory +1] ⛏️')}
        onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('Voxel Terrain', 'Mined 1x Voxel Grass Block! [Inventory +1] ⛏️'); }}
      >
        <span className="block-pixel p1"></span>
        <span className="block-pixel p2"></span>
        <span className="block-pixel p3"></span>
        <span className="block-pixel p4"></span>
        <div className="hero-sticker-sheen" aria-hidden="true" />
      </div>

      {/* ── Dynamic Mouse Scroll Indicator with Scroll-Driven Animation ── */}
      <MouseScrollIndicator targetId="section-skills" onToast={onToast} variant="hero" />
    </section>
  );
}
