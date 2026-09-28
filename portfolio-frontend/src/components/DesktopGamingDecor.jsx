import React, { useState, memo } from 'react';
import { sounds } from '../utils/soundEffects';
import './DesktopGamingDecor.css';

function DesktopGamingDecor({ onToast }) {
  const [isVibrating, setIsVibrating] = useState(false);

  const handleControllerClick = () => {
    sounds.playMechanicalClick ? sounds.playMechanicalClick() : sounds.playClick();
    sounds.playPowerUp();
    setIsVibrating(true);
    if (onToast) onToast('DualSense Wireless: 1000Hz Polling • Haptics active! 🎮');
    setTimeout(() => setIsVibrating(false), 500);
  };

  return (
    <div
      className={`hardware-controller-card ${isVibrating ? 'controller-vibrating' : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleControllerClick}
      title="DualSense Wireless Controller (Click to test haptics & polling)"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleControllerClick(); }}
      aria-label="Hardware Controller Interface"
    >
      <div className="hardware-header">
        <span className="hardware-tag">HARDWARE INPUT</span>
        <span className="hardware-status-dot" title="Active"></span>
      </div>

      <div className="controller-svg-wrapper">
        <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="controller-svg">
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
          <circle cx="36" cy="43" r="3" fill="#00e5ff"/>
          <circle cx="60" cy="43" r="3" fill="#00e5ff"/>
        </svg>
      </div>

      <div className="hardware-info">
        <h4 className="hardware-name">DualSense Wireless</h4>
        <p className="hardware-specs">1000Hz Polling &bull; Dual Haptics &bull; Low Latency</p>
      </div>

      <div className="hardware-action-hint">
        <span>Click to test haptics &rarr;</span>
      </div>
    </div>
  );
}

export default memo(DesktopGamingDecor);
