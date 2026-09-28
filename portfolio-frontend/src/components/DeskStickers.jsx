import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import './DeskStickers.css';

const STICKERS_DATA = [
  {
    id: 'cpp',
    title: 'C++ 20',
    subtitle: 'ZERO-COST ABSTRACTION',
    icon: '⚡',
    badge: 'CORE ENGINE',
    toastMsg: 'C++20 Memory Safety & Zero-Cost Abstractions ⚙️',
    colorScheme: 'sticker-cpp',
    rotation: '-4deg',
  },
  {
    id: 'fps',
    title: '60 FPS',
    subtitle: 'LOCKED FRAME RATE',
    icon: '🏎️',
    badge: 'PROFILED',
    toastMsg: '60 FPS Lock: No stutter, pure silky gameplay! 🎮',
    colorScheme: 'sticker-fps',
    rotation: '5deg',
  },
  {
    id: 'works',
    title: 'WORKS ON',
    subtitle: 'MY MACHINE™',
    icon: '☕',
    badge: 'QA VERIFIED',
    toastMsg: 'Certified: Works on my machine! 100% bug-free™ ☕',
    colorScheme: 'sticker-works',
    rotation: '-7deg',
  },
];

const LUCARIO_SKINS = [
  {
    id: 'classic',
    name: 'AURA SPHERE',
    sub: 'FIGHTING / STEEL',
    badge: '#448 LUCARIO',
    filter: 'none',
    glowColor: 'rgba(0, 229, 255, 0.75)',
    toastMsg: 'Lucario channeled Aura Sphere! 100% Accuracy Aura Blast! 🐺💥',
  },
  {
    id: 'mega',
    name: 'MEGA LUCARIO',
    sub: 'ADAPTABILITY BOOST',
    badge: 'MEGA EVOLUTION',
    filter: 'hue-rotate(145deg) saturate(1.4) brightness(1.05)',
    glowColor: 'rgba(239, 68, 68, 0.85)',
    toastMsg: 'Lucario Mega Evolved! Adaptability Attack Boost Max! 🐺🔥',
  },
  {
    id: 'shiny',
    name: 'SHINY LUCARIO',
    sub: 'GOLDEN AURA',
    badge: 'RARE SHINY ★',
    filter: 'hue-rotate(65deg) saturate(1.3)',
    glowColor: 'rgba(250, 204, 21, 0.85)',
    toastMsg: 'Wild Shiny Lucario appeared! Golden Aura Shimmer! ✨🐺',
  },
  {
    id: 'storm',
    name: 'AURA STORM',
    sub: 'PLASMA OVERCHARGE',
    badge: 'FINAL SMASH',
    filter: 'hue-rotate(240deg) saturate(1.6) brightness(1.1)',
    glowColor: 'rgba(192, 132, 252, 0.85)',
    toastMsg: 'Lucario unleashed Final Smash: Aura Storm! ⚡🌌',
  },
];

const ECS_STICKER = {
  id: 'ecs',
  title: 'DATA ORIENTED',
  subtitle: 'ECS ARCHITECTURE',
  icon: '🧩',
  badge: 'CACHE ALIGNED',
  toastMsg: 'Cache locality prioritized: 15,000+ entities ticking! 🚀',
  colorScheme: 'sticker-ecs',
  rotation: '6deg',
};

export default function DeskStickers({ onToast }) {
  const [clickedId, setClickedId] = useState(null);
  const [lucarioSkinIdx, setLucarioSkinIdx] = useState(0);
  const [isLucarioBlasting, setIsLucarioBlasting] = useState(false);
  const [lucarioSlapped, setLucarioSlapped] = useState(false);

  const activeLucarioSkin = LUCARIO_SKINS[lucarioSkinIdx];

  const handleStickerClick = (sticker) => {
    sounds.playMechanicalClick();
    setClickedId(sticker.id);
    setTimeout(() => setClickedId(null), 400);

    if (onToast) {
      onToast(sticker.toastMsg);
    }
  };

  const handleLucarioClick = () => {
    sounds.playPowerUp();
    sounds.playSuccessChirp();

    const nextIdx = (lucarioSkinIdx + 1) % LUCARIO_SKINS.length;
    setLucarioSkinIdx(nextIdx);
    setIsLucarioBlasting(true);
    setLucarioSlapped(true);

    if (onToast) {
      onToast(LUCARIO_SKINS[nextIdx].toastMsg);
    }

    setTimeout(() => setLucarioSlapped(false), 350);
    setTimeout(() => setIsLucarioBlasting(false), 700);
  };

  return (
    <div className="desk-stickers-cluster" aria-label="Developer Desk Stickers">
      <div className="stickers-header-tag">
        <span>DEV STICKER PACK // VINYL DIE-CUT</span>
        <span className="stickers-header-sub">TAP STICKERS FOR HAPTICS &amp; SKINS</span>
      </div>

      <div className="stickers-grid">
        {/* Top Row: Tech Stickers */}
        {STICKERS_DATA.map((sticker) => {
          const isClicked = clickedId === sticker.id;
          return (
            <div
              key={sticker.id}
              className={`diecut-sticker ${sticker.colorScheme} ${isClicked ? 'sticker-slapped' : ''}`}
              style={{ transform: `rotate(${sticker.rotation})` }}
              onClick={() => handleStickerClick(sticker)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStickerClick(sticker); }}
              title={`Click to inspect ${sticker.title} sticker`}
            >
              <div className="sticker-gloss-sheen" aria-hidden="true" />
              <div className="sticker-content-inner">
                <div className="sticker-icon-row">
                  <span className="sticker-emoji">{sticker.icon}</span>
                  <span className="sticker-top-badge">{sticker.badge}</span>
                </div>
                <h4 className="sticker-main-title">{sticker.title}</h4>
                <p className="sticker-sub-title">{sticker.subtitle}</p>
              </div>
              <div className="sticker-peel-lip" aria-hidden="true" />
            </div>
          );
        })}

        {/* ── Lucario Die-Cut Vinyl Sticker (Replacing Purple Gengar) ── */}
        <div
          className={`lucario-diecut-sticker ${lucarioSlapped ? 'sticker-slapped' : ''} ${isLucarioBlasting ? 'is-blasting' : ''}`}
          style={{ '--lucario-glow': activeLucarioSkin.glowColor }}
          onClick={handleLucarioClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLucarioClick(); }}
          title={`Click to unleash Aura Sphere! Current mode: ${activeLucarioSkin.name}`}
          aria-label={`Lucario Die-Cut Sticker: ${activeLucarioSkin.name}`}
        >
          <div className="lucario-img-container">
            <img
              src="./images/lucario_sticker.png"
              alt="Lucario Aura Sphere Die-Cut Vinyl Sticker"
              className="lucario-sticker-img"
              style={{ filter: activeLucarioSkin.filter }}
              loading="lazy"
            />
            {/* Glossy specular reflection sheen */}
            <div className="sticker-gloss-sheen" aria-hidden="true" />
            {/* Aura shockwave blast */}
            <div className="lucario-aura-shockwave" aria-hidden="true" />
            {/* Peel corner */}
            <div className="sticker-peel-lip" aria-hidden="true" />
          </div>

          {/* Hover Skin Badge & Pokédex Tag */}
          <div className="lucario-skin-tag">
            <span className="lucario-skin-badge">{activeLucarioSkin.badge}</span>
            <span className="lucario-skin-name">{activeLucarioSkin.name}</span>
            <span className="lucario-tap-hint">TAP ↻</span>
          </div>
        </div>

        {/* Bottom Right: Data-Oriented ECS Sticker */}
        <div
          className={`diecut-sticker ${ECS_STICKER.colorScheme} ${clickedId === ECS_STICKER.id ? 'sticker-slapped' : ''}`}
          style={{ transform: `rotate(${ECS_STICKER.rotation})` }}
          onClick={() => handleStickerClick(ECS_STICKER)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStickerClick(ECS_STICKER); }}
          title={`Click to inspect ${ECS_STICKER.title} sticker`}
        >
          <div className="sticker-gloss-sheen" aria-hidden="true" />
          <div className="sticker-content-inner">
            <div className="sticker-icon-row">
              <span className="sticker-emoji">{ECS_STICKER.icon}</span>
              <span className="sticker-top-badge">{ECS_STICKER.badge}</span>
            </div>
            <h4 className="sticker-main-title">{ECS_STICKER.title}</h4>
            <p className="sticker-sub-title">{ECS_STICKER.subtitle}</p>
          </div>
          <div className="sticker-peel-lip" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
