import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import './PokeballSticker.css';

const BALL_TYPES = [
  { id: 'poke', name: 'Poké Ball', catchRate: '1.0x', desc: 'Standard issue trainer model' },
  { id: 'great', name: 'Great Ball', catchRate: '1.5x', desc: 'High-performance capture sphere' },
  { id: 'ultra', name: 'Ultra Ball', catchRate: '2.0x', desc: 'Ultra-grade titanium alloy build' },
  { id: 'master', name: 'Master Ball', catchRate: '100%', desc: 'Top-secret prototype. Never fails' },
  { id: 'premier', name: 'Premier Ball', catchRate: '1.0x', desc: 'Commemorative event edition' },
];

export default function PokeballSticker({ onToast }) {
  const [ballIndex, setBallIndex] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  const currentBall = BALL_TYPES[ballIndex];

  const handleClick = (e) => {
    e.stopPropagation();
    sounds.playMechanicalClick();

    setIsWiggling(true);
    setTimeout(() => {
      setIsWiggling(false);
      setIsCaptured(true);
      sounds.playSuccessChirp();

      // Cycle to next ball
      const nextIdx = (ballIndex + 1) % BALL_TYPES.length;
      setBallIndex(nextIdx);

      if (onToast) {
        onToast(`Switched to ${BALL_TYPES[nextIdx].name}! (${BALL_TYPES[nextIdx].desc}) 🔴`);
      }

      setTimeout(() => setIsCaptured(false), 800);
    }, 450);
  };

  return (
    <div
      className={`pokeball-sticker-wrapper ${isWiggling ? 'ball-wiggling' : ''} ${isCaptured ? 'ball-captured' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
      title={`Click to capture or cycle Pokéball! Current: ${currentBall.name}`}
      aria-label={`${currentBall.name} Die-Cut Vinyl Sticker`}
    >
      {/* Die-cut white vinyl border frame */}
      <div className="pokeball-diecut">
        <svg
          viewBox="0 0 100 100"
          className="pokeball-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shading gradients */}
            <radialGradient id="redDomeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="55%" stopColor="#e52d27" />
              <stop offset="100%" stopColor="#8b0000" />
            </radialGradient>

            <radialGradient id="blueDomeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="55%" stopColor="#0052d4" />
              <stop offset="100%" stopColor="#0a235c" />
            </radialGradient>

            <radialGradient id="ultraDomeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#434343" />
              <stop offset="60%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            <radialGradient id="masterDomeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#b06ab3" />
              <stop offset="55%" stopColor="#673ab7" />
              <stop offset="100%" stopColor="#311b92" />
            </radialGradient>

            <radialGradient id="premierDomeGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#f0f3f6" />
              <stop offset="100%" stopColor="#cfd8dc" />
            </radialGradient>

            <radialGradient id="whiteDomeGrad" cx="35%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#eceff1" />
              <stop offset="100%" stopColor="#b0bec5" />
            </radialGradient>

            <radialGradient id="buttonGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#cfd8dc" />
              <stop offset="100%" stopColor="#90a4ae" />
            </radialGradient>

            {/* Specular sheen gradient */}
            <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Shadow filter */}
            <filter id="stickerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Outer Black Border */}
          <circle cx="50" cy="50" r="46" fill="#1e232a" />

          {/* Top Half Dome */}
          {currentBall.id === 'poke' && (
            <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#redDomeGrad)" />
          )}

          {currentBall.id === 'great' && (
            <g>
              <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#blueDomeGrad)" />
              {/* Red Aerodynamic Flanks */}
              <path d="M 18 36 C 26 24 38 18 42 16 L 36 28 C 30 31 22 36 18 36 Z" fill="#f44336" />
              <path d="M 82 36 C 74 24 62 18 58 16 L 64 28 C 70 31 78 36 82 36 Z" fill="#f44336" />
            </g>
          )}

          {currentBall.id === 'ultra' && (
            <g>
              <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#ultraDomeGrad)" />
              {/* Gold Strips */}
              <path d="M 30 10 L 38 10 L 38 48 L 30 48 Z" fill="#ffb300" />
              <path d="M 70 10 L 62 10 L 62 48 L 70 48 Z" fill="#ffb300" />
              <path d="M 38 20 L 62 20 L 62 26 L 38 26 Z" fill="#ffb300" />
            </g>
          )}

          {currentBall.id === 'master' && (
            <g>
              <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#masterDomeGrad)" />
              {/* Pink Domes */}
              <ellipse cx="28" cy="28" rx="8" ry="6" fill="#e91e63" transform="rotate(-20 28 28)" />
              <ellipse cx="72" cy="28" rx="8" ry="6" fill="#e91e63" transform="rotate(20 72 28)" />
              {/* White M Logo */}
              <path d="M 42 18 L 46 28 L 50 20 L 54 28 L 58 18 L 61 18 L 56 32 L 50 24 L 44 32 L 39 18 Z" fill="#ffffff" />
            </g>
          )}

          {currentBall.id === 'premier' && (
            <path d="M 6 50 A 44 44 0 0 1 94 50 Z" fill="url(#premierDomeGrad)" />
          )}

          {/* Bottom Half Dome */}
          <path d="M 6 50 A 44 44 0 0 0 94 50 Z" fill="url(#whiteDomeGrad)" />

          {/* Center Dividing Belt */}
          <rect
            x="6"
            y="46"
            width="88"
            height="8"
            fill={currentBall.id === 'premier' ? '#e52d27' : '#1e232a'}
          />

          {/* Outer Center Ring */}
          <circle cx="50" cy="50" r="14" fill="#1e232a" />
          <circle
            cx="50"
            cy="50"
            r="12"
            fill={currentBall.id === 'premier' ? '#e52d27' : '#2b313a'}
          />

          {/* Center LED Mechanical Button */}
          <circle cx="50" cy="50" r="8" fill="url(#buttonGrad)" />
          <circle cx="50" cy="50" r="4.5" fill="#ffffff" className="pokeball-led" />

          {/* Upper Glass/Gloss Specular Reflection */}
          <path
            d="M 16 38 C 16 20, 32 10, 50 10 C 68 10, 84 20, 84 38 C 70 28, 30 28, 16 38 Z"
            fill="url(#glossGrad)"
            pointerEvents="none"
          />

          {/* Small specular dot */}
          <ellipse cx="32" cy="22" rx="4" ry="2" fill="#ffffff" opacity="0.8" />
        </svg>

        {/* Die-cut sticker vinyl edge peel lip */}
        <div className="pokeball-peel-corner" aria-hidden="true" />
      </div>

      {/* Hover pill badge showing name & catch rate */}
      <div className="pokeball-tooltip">
        <span className="tooltip-name">{currentBall.name}</span>
        <span className="tooltip-rate">{currentBall.catchRate}</span>
      </div>
    </div>
  );
}
