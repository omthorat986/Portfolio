import React from 'react';
import { personal } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './TopSecretFolder.css';

export default function TopSecretFolder({ onOpenDossier }) {
  const handleClick = (e) => {
    e.preventDefault();
    sounds.playFolderOpen();
    if (onOpenDossier) onOpenDossier();
  };

  return (
    <article
      className="secret-folder shadow-2xl"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
      title="Click to unlock Om Thorat's Confidential Dossier & Resume"
    >
      <div className="folder-tab">
        <span className="folder-tab-icon">📁</span> DOSSIER.PDF
      </div>

      <div className="folder-cover">
        <div className="confidential-stamp">CONFIDENTIAL</div>

        <div className="folder-label">
          <div className="folder-label-header">
            <span className="folder-seal">★</span>
            <h2>Subject: {personal.name}</h2>
          </div>
          <p>Clearance: Level 4 // Active</p>
          <p>Role: {personal.title}</p>
          <p className="folder-status-tag">STATUS: UNLOCKED FOR HIRE</p>
        </div>

        <button type="button" className="folder-link-btn" title="Open Dossier">
          <span>🔓</span> ACCESS FILE &amp; RESUME
        </button>
      </div>
    </article>
  );
}
