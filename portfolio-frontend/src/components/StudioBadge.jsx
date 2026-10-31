import React, { useState } from 'react';
import { personal } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './StudioBadge.css';

export default function StudioBadge({ onOpenDossier }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    sounds.playClick();
    setFlipped(!flipped);
  };

  return (
    <article
      className={`studio-badge shadow-xl ${flipped ? 'badge-flipped' : ''}`}
      onClick={handleClick}
      title="Click badge to inspect credentials"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      <div className="badge-lanyard-strap" aria-hidden="true">
        <div className="strap-metal" />
      </div>

      <div className="badge-lanyard-hole"></div>

      {/* Front Face */}
      <div className="badge-face badge-front">
        <div className="badge-header">
          <span className="badge-logo">🎮 OM THORAT</span>
          <span className="badge-status-pill">DEV PORTFOLIO</span>
        </div>

        <div className="badge-photo-container">
          <div className="badge-photo-frame">
            <img
              src={personal.avatar}
              alt={personal.fullName}
              className="badge-photo-img"
              loading="eager"
            />
            <span className="badge-live-dot" title="Online / Open to Work"></span>
          </div>
        </div>

        <div className="badge-info">
          <h2 className="badge-name">{personal.name}</h2>
          <h3 className="badge-title">{personal.title}</h3>
          <p className="badge-dept">{personal.department}</p>
        </div>

        <div className="badge-footer">
          <div className="barcode" title="Scan ID"></div>
          <div className="badge-footer-meta">
            <span className="badge-id">{personal.badgeId}</span>
            <span className="badge-flip-hint">TAP TO FLIP ↻</span>
          </div>
        </div>
      </div>

      {/* Back Face (Personal Developer Credentials Card) */}
      <div className="badge-face badge-back">
        <div className="badge-header badge-header-back">
          <span>DEVELOPER PASS</span>
          <span>GAME SYSTEMS</span>
        </div>

        <div className="badge-back-content">
          <div className="badge-chip-sim" />
          <h4 className="badge-back-name">{personal.fullName}</h4>
          <p className="badge-back-sub">PERSONAL GAME DEVELOPER PORTFOLIO</p>

          <div className="badge-back-specs">
            <div><span>Primary Stack:</span> C++, C#, Unity</div>
            <div><span>Specialty:</span> Physics &amp; Gameplay Systems</div>
            <div><span>Status:</span> Available For Hire</div>
          </div>

          {onOpenDossier && (
            <button
              className="badge-dossier-btn"
              onClick={(e) => {
                e.stopPropagation();
                sounds.playFolderOpen();
                onOpenDossier();
              }}
            >
              📂 OPEN FULL RESUME &amp; DOSSIER
            </button>
          )}
        </div>

        <div className="badge-footer badge-footer-back">
          <p>OM THORAT &bull; PERSONAL PORTFOLIO &bull; GAME DEVELOPER</p>
        </div>
      </div>
    </article>
  );
}
