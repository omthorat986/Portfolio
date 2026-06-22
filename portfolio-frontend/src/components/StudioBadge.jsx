import React from 'react';
import { personal } from '../siteConfig';
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
        <h2 className="badge-name">{personal.name}</h2>
        <h3 className="badge-title">{personal.title}</h3>
        <p className="badge-dept">{personal.department}</p>
      </div>

      <div className="badge-footer">
        {/* CSS simulated barcode */}
        <div className="barcode"></div>
        <span className="badge-id">{personal.badgeId}</span>
      </div>
    </article>
  );
}
