import React, { memo } from 'react';
import './DesktopGamingDecor.css';

function DesktopGamingDecor() {
  return (
    <>
      <div className="ps5-controller-decor" aria-hidden="true" title="Gaming Setup">
        {/* Inline SVG for PS5 Controller silhouette */}
        <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M85 20 C 95 20, 95 35, 90 50 C 85 65, 75 70, 70 65 C 65 60, 60 40, 50 40 C 40 40, 35 60, 30 65 C 25 70, 15 65, 10 50 C 5 35, 5 20, 15 20 C 25 20, 30 15, 50 15 C 70 15, 75 20, 85 20 Z" fill="#EAEAEA" stroke="#333" strokeWidth="2"/>
          <path d="M35 18 C 35 15, 65 15, 65 18 L 62 35 C 62 38, 38 38, 38 35 Z" fill="#2D2D2D" />
          <rect x="23" y="24" width="4" height="12" fill="#555" />
          <rect x="19" y="28" width="12" height="4" fill="#555" />
          <circle cx="75" cy="24" r="2.5" fill="#555"/>
          <circle cx="81" cy="30" r="2.5" fill="#555"/>
          <circle cx="69" cy="30" r="2.5" fill="#555"/>
          <circle cx="75" cy="36" r="2.5" fill="#555"/>
          <circle cx="38" cy="45" r="7" fill="#222"/>
          <circle cx="62" cy="45" r="7" fill="#222"/>
          <circle cx="36" cy="43" r="3" fill="#444"/>
          <circle cx="60" cy="43" r="3" fill="#444"/>
        </svg>
      </div>

      <div className="pokemon-sprite-decor" aria-hidden="true" title="Wild Gengar appeared!">
        {/* Inline SVG pixel art Gengar — no external CDN dependency */}
        <svg viewBox="0 0 16 16" width="96" height="96" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
          <rect x="4" y="1" width="8" height="1" fill="#6038a0"/>
          <rect x="3" y="2" width="1" height="1" fill="#6038a0"/>
          <rect x="4" y="2" width="2" height="1" fill="#8060c0"/>
          <rect x="6" y="2" width="4" height="1" fill="#6038a0"/>
          <rect x="10" y="2" width="2" height="1" fill="#8060c0"/>
          <rect x="12" y="2" width="1" height="1" fill="#6038a0"/>
          <rect x="2" y="3" width="1" height="1" fill="#6038a0"/>
          <rect x="3" y="3" width="3" height="1" fill="#8060c0"/>
          <rect x="6" y="3" width="4" height="1" fill="#6038a0"/>
          <rect x="10" y="3" width="3" height="1" fill="#8060c0"/>
          <rect x="13" y="3" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="4" width="1" height="1" fill="#6038a0"/>
          <rect x="2" y="4" width="4" height="1" fill="#8060c0"/>
          <rect x="6" y="4" width="1" height="1" fill="#fff"/>
          <rect x="7" y="4" width="2" height="1" fill="#8060c0"/>
          <rect x="9" y="4" width="1" height="1" fill="#fff"/>
          <rect x="10" y="4" width="4" height="1" fill="#8060c0"/>
          <rect x="14" y="4" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="5" width="1" height="1" fill="#6038a0"/>
          <rect x="2" y="5" width="3" height="1" fill="#8060c0"/>
          <rect x="5" y="5" width="2" height="1" fill="#e03030"/>
          <rect x="7" y="5" width="2" height="1" fill="#8060c0"/>
          <rect x="9" y="5" width="2" height="1" fill="#e03030"/>
          <rect x="11" y="5" width="3" height="1" fill="#8060c0"/>
          <rect x="14" y="5" width="1" height="1" fill="#6038a0"/>
          <rect x="0" y="6" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="6" width="5" height="1" fill="#8060c0"/>
          <rect x="6" y="6" width="4" height="1" fill="#6038a0"/>
          <rect x="10" y="6" width="5" height="1" fill="#8060c0"/>
          <rect x="15" y="6" width="1" height="1" fill="#6038a0"/>
          <rect x="0" y="7" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="7" width="2" height="1" fill="#8060c0"/>
          <rect x="3" y="7" width="1" height="1" fill="#fff"/>
          <rect x="4" y="7" width="1" height="1" fill="#8060c0"/>
          <rect x="5" y="7" width="1" height="1" fill="#fff"/>
          <rect x="6" y="7" width="1" height="1" fill="#8060c0"/>
          <rect x="7" y="7" width="2" height="1" fill="#fff"/>
          <rect x="9" y="7" width="1" height="1" fill="#8060c0"/>
          <rect x="10" y="7" width="1" height="1" fill="#fff"/>
          <rect x="11" y="7" width="1" height="1" fill="#8060c0"/>
          <rect x="12" y="7" width="1" height="1" fill="#fff"/>
          <rect x="13" y="7" width="2" height="1" fill="#8060c0"/>
          <rect x="15" y="7" width="1" height="1" fill="#6038a0"/>
          <rect x="0" y="8" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="8" width="15" height="1" fill="#8060c0"/>
          <rect x="0" y="9" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="9" width="3" height="1" fill="#8060c0"/>
          <rect x="4" y="9" width="8" height="1" fill="#6038a0"/>
          <rect x="12" y="9" width="3" height="1" fill="#8060c0"/>
          <rect x="15" y="9" width="1" height="1" fill="#6038a0"/>
          <rect x="1" y="10" width="1" height="1" fill="#6038a0"/>
          <rect x="2" y="10" width="3" height="1" fill="#8060c0"/>
          <rect x="5" y="10" width="6" height="1" fill="#6038a0"/>
          <rect x="11" y="10" width="3" height="1" fill="#8060c0"/>
          <rect x="14" y="10" width="1" height="1" fill="#6038a0"/>
          <rect x="2" y="11" width="1" height="1" fill="#6038a0"/>
          <rect x="3" y="11" width="4" height="1" fill="#8060c0"/>
          <rect x="7" y="11" width="2" height="1" fill="#6038a0"/>
          <rect x="9" y="11" width="4" height="1" fill="#8060c0"/>
          <rect x="13" y="11" width="1" height="1" fill="#6038a0"/>
          <rect x="3" y="12" width="1" height="1" fill="#6038a0"/>
          <rect x="4" y="12" width="3" height="1" fill="#8060c0"/>
          <rect x="7" y="12" width="2" height="1" fill="#6038a0"/>
          <rect x="9" y="12" width="3" height="1" fill="#8060c0"/>
          <rect x="12" y="12" width="1" height="1" fill="#6038a0"/>
          <rect x="4" y="13" width="3" height="1" fill="#6038a0"/>
          <rect x="9" y="13" width="3" height="1" fill="#6038a0"/>
        </svg>
      </div>
    </>
  );
}

export default memo(DesktopGamingDecor);
