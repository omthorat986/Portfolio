import React from 'react';
import './StudioBadge.css';

export default function StudioBadge() {
  return (
    <article className="studio-badge shadow-xl">
      <div className="badge-lanyard-hole"></div>
      <div className="badge-header">
        <span className="badge-logo">🎮 INDIE.DEV</span>
        <span className="badge-text">STAFF ACCESS</span>
      </div>
      
      <div className="badge-photo-container">
        {/* Placeholder image; the user can replace this with an actual photo */}
        <div className="badge-photo-placeholder">
          <span className="silhoutte">👤</span>
        </div>
      </div>

      <div className="badge-info">
        <h2 className="badge-name">OM</h2>
        <h3 className="badge-title">Gameplay & Systems Programmer</h3>
        <p className="badge-dept">Engineering Dept // Level 02</p>
      </div>

      <div className="badge-footer">
        {/* CSS simulated barcode */}
        <div className="barcode"></div>
        <span className="badge-id">ID: 0x8F9B2C</span>
      </div>
    </article>
  );
}
