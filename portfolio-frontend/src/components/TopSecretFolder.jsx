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
      title="Click to view Om Thorat's Developer Resume & Portfolio Dossier"
    >
      <div className="folder-tab">
        <span className="folder-tab-icon">📁</span> RESUME.PDF
      </div>

      <div className="folder-cover">
        <div className="confidential-stamp">DEV DOSSIER</div>

        <div className="folder-label">
          <div className="folder-label-header">
            <span className="folder-seal">★</span>
            <h2>Developer: {personal.fullName}</h2>
          </div>
          <p>Role: {personal.title}</p>
          <p>Stack: C++ / C# / Unity / Direct3D</p>
          <p className="folder-status-tag">STATUS: AVAILABLE FOR HIRE</p>
        </div>

        <button type="button" className="folder-link-btn" title="Open Dossier">
          <span>📄</span> VIEW RESUME &amp; DOSSIER
        </button>
      </div>
    </article>
  );
}
