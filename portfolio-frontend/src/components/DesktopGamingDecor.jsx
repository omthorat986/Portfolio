import React, { memo } from 'react';
import './DesktopGamingDecor.css';

function DesktopGamingDecor() {
  return (
    <>
      <div className="ps5-controller-decor" aria-hidden="true" title="Gaming Setup">
        {/* Optimized Inline SVG for PS5 Controller silhouette */}
        <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Body */}
          <path d="M85 20 C 95 20, 95 35, 90 50 C 85 65, 75 70, 70 65 C 65 60, 60 40, 50 40 C 40 40, 35 60, 30 65 C 25 70, 15 65, 10 50 C 5 35, 5 20, 15 20 C 25 20, 30 15, 50 15 C 70 15, 75 20, 85 20 Z" fill="#EAEAEA" stroke="#333" strokeWidth="2"/>
          {/* Touchpad shape */}
          <path d="M35 18 C 35 15, 65 15, 65 18 L 62 35 C 62 38, 38 38, 38 35 Z" fill="#2D2D2D" />
          {/* D-Pad */}
          <rect x="23" y="24" width="4" height="12" fill="#555" />
          <rect x="19" y="28" width="12" height="4" fill="#555" />
          {/* Face Buttons */}
          <circle cx="75" cy="24" r="2.5" fill="#555"/>
          <circle cx="81" cy="30" r="2.5" fill="#555"/>
          <circle cx="69" cy="30" r="2.5" fill="#555"/>
          <circle cx="75" cy="36" r="2.5" fill="#555"/>
          {/* Analog Sticks */}
          <circle cx="38" cy="45" r="7" fill="#222"/>
          <circle cx="62" cy="45" r="7" fill="#222"/>
          {/* Highlights */}
          <circle cx="36" cy="43" r="3" fill="#444"/>
          <circle cx="60" cy="43" r="3" fill="#444"/>
        </svg>
      </div>

      <div className="pokemon-sprite-decor" aria-hidden="true" title="Wild 2D Pokemon appeared!">
        {/* Externally fetched raw PNG from PokeAPI - perfectly optimized and lightweight pixel art */}
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" 
          alt="Gengar pixel sprite" 
          width="96" 
          height="96"
          loading="lazy" 
        />
      </div>
    </>
  );
}

export default memo(DesktopGamingDecor);
