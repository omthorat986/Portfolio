import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import './CarSticker.css';

const CAR_SKINS = [
  {
    id: 'cyber',
    name: 'OVERDRIVE GT-X',
    speed: '312 km/h',
    bodyColor1: '#0f172a',
    bodyColor2: '#0284c7',
    stripeColor: '#38bdf8',
    neonColor: '#00e5ff',
    flameColor: '#38bdf8',
    tag: 'CYBER RACER',
  },
  {
    id: 'crimson',
    name: 'IGNITION RED',
    speed: '345 km/h',
    bodyColor1: '#450a0a',
    bodyColor2: '#dc2626',
    stripeColor: '#facc15',
    neonColor: '#ef4444',
    flameColor: '#f97316',
    tag: 'NITRO V8',
  },
  {
    id: 'stealth',
    name: 'PHANTOM STEALTH',
    speed: '360 km/h',
    bodyColor1: '#052e16',
    bodyColor2: '#16a34a',
    stripeColor: '#4ade80',
    neonColor: '#22c55e',
    flameColor: '#a3e635',
    tag: 'HYPER-DRIVE',
  },
];

export default function CarSticker({ onToast }) {
  const [skinIndex, setSkinIndex] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);

  const currentCar = CAR_SKINS[skinIndex];

  const handleRev = (e) => {
    e.stopPropagation();
    sounds.playMechanicalClick();

    setIsBoosting(true);

    // Audio boost sequence
    sounds.playTone(180, 0.1, 'sawtooth', 0.08);
    setTimeout(() => sounds.playTone(280, 0.15, 'sawtooth', 0.09), 80);
    setTimeout(() => sounds.playTone(420, 0.2, 'sawtooth', 0.1), 160);

    // Cycle to next racer skin on click
    const nextIdx = (skinIndex + 1) % CAR_SKINS.length;
    setSkinIndex(nextIdx);

    if (onToast) {
      onToast(`Boost Activated: ${CAR_SKINS[nextIdx].name} @ ${CAR_SKINS[nextIdx].speed}! 🏎️💨`);
    }

    setTimeout(() => setIsBoosting(false), 650);
  };

  return (
    <div
      className={`car-sticker-wrapper ${isBoosting ? 'car-boosting' : ''}`}
      onClick={handleRev}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRev(e); }}
      title={`Click to rev engine & boost! Current: ${currentCar.name} (${currentCar.speed})`}
      aria-label={`${currentCar.name} Die-Cut Vinyl Car Sticker`}
    >
      {/* Die-Cut Vinyl Sticker Body */}
      <div className="car-diecut-plate">
        <svg
          viewBox="0 0 160 64"
          className="car-sticker-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Body Gradients */}
            <linearGradient id={`carBodyGrad-${currentCar.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentCar.bodyColor1} />
              <stop offset="65%" stopColor={currentCar.bodyColor2} />
              <stop offset="100%" stopColor={currentCar.bodyColor1} />
            </linearGradient>

            {/* Windshield Gradient */}
            <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
            </linearGradient>

            {/* Specular Gloss Gradient */}
            <linearGradient id="carGlossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Wheel Rim Gradient */}
            <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="60%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>

          {/* Underglow Neon Shadow */}
          <ellipse
            cx="80"
            cy="52"
            rx="65"
            ry="6"
            fill={currentCar.neonColor}
            opacity="0.45"
            className="car-underglow"
          />

          {/* Exhaust Jet Flames (visible on boost) */}
          <g className={`exhaust-flames ${isBoosting ? 'flames-active' : ''}`}>
            <path
              d="M 12 40 L 0 42 L 8 44 L -4 46 L 8 47 L 12 48 Z"
              fill={currentCar.flameColor}
              className="flame-outer"
            />
            <path
              d="M 12 41 L 4 43 L 9 44 L 2 45 L 12 46 Z"
              fill="#ffffff"
              className="flame-core"
            />
          </g>

          {/* GT Rear Spoiler Wing */}
          <path
            d="M 8 20 L 26 22 L 24 30 L 14 30 Z"
            fill="#090d16"
          />
          {/* Spoiler Top Plane */}
          <rect
            x="6"
            y="18"
            width="26"
            height="4"
            rx="2"
            fill={currentCar.bodyColor2}
            stroke="#ffffff"
            strokeWidth="0.8"
          />

          {/* Main Aerodynamic Supercar Body Silhouette */}
          <path
            d="M 14 44 
               L 16 34 
               C 22 28, 38 28, 48 24 
               L 66 14 
               C 84 13, 106 14, 118 24 
               L 142 30 
               C 152 32, 156 38, 154 44 
               L 148 48 
               L 134 48 
               C 132 40, 114 40, 112 48 
               L 52 48 
               C 50 40, 32 40, 30 48 
               L 14 48 Z"
            fill={`url(#carBodyGrad-${currentCar.id})`}
            stroke="#ffffff"
            strokeWidth="1.2"
          />

          {/* Racing Livery Side Stripe */}
          <path
            d="M 36 34 L 140 33 L 138 37 L 38 38 Z"
            fill={currentCar.stripeColor}
            opacity="0.9"
          />

          {/* Aerodynamic Cockpit Glass */}
          <path
            d="M 68 16 
               L 112 25 
               L 110 32 
               L 52 32 
               C 56 26, 62 20, 68 16 Z"
            fill="url(#windshieldGrad)"
            stroke="#ffffff"
            strokeWidth="0.8"
          />

          {/* Cockpit Window Pillar */}
          <path
            d="M 82 17 L 86 17 L 78 32 L 74 32 Z"
            fill="#0f172a"
            opacity="0.8"
          />

          {/* Aggressive Headlight LED Bar */}
          <polygon
            points="144,34 153,35 151,39 142,38"
            fill="#00ffff"
            className="headlight-led"
          />

          {/* Rear Taillight Glow */}
          <polygon
            points="15,35 18,35 17,40 14,40"
            fill="#ff1744"
            className="taillight-led"
          />

          {/* Race Number Decal #47 */}
          <text
            x="94"
            y="42"
            fill="#ffffff"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
          >
            47
          </text>

          {/* Front Wheel Assembly */}
          <g transform="translate(123, 46)">
            <circle cx="0" cy="0" r="10.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
            <circle cx="0" cy="0" r="7.5" fill="url(#rimGrad)" />
            {/* 5-Spoke Mag Wheel */}
            <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#cbd5e1" strokeWidth="1.2" />
          </g>

          {/* Rear Wheel Assembly */}
          <g transform="translate(41, 46)">
            <circle cx="0" cy="0" r="10.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
            <circle cx="0" cy="0" r="7.5" fill="url(#rimGrad)" />
            {/* 5-Spoke Mag Wheel */}
            <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#cbd5e1" strokeWidth="1.2" />
          </g>

          {/* Front Carbon Splitter */}
          <path d="M 144 48 L 158 48 L 154 50 L 140 50 Z" fill="#090d16" />

          {/* Curved Specular Sheen across Hood & Roof */}
          <path
            d="M 68 15 C 84 14, 106 15, 116 23 L 138 29 C 130 25, 90 20, 68 15 Z"
            fill="url(#carGlossGrad)"
            pointerEvents="none"
          />
        </svg>

        {/* Die-cut sticker vinyl edge peel lip */}
        <div className="car-peel-corner" aria-hidden="true" />
      </div>

      {/* Hover Telemetry Pill Badge */}
      <div className="car-tooltip">
        <span className="car-tag-badge">{currentCar.tag}</span>
        <span className="car-name-text">{currentCar.name}</span>
        <span className="car-speed-badge">⚡ {currentCar.speed}</span>
      </div>
    </div>
  );
}
