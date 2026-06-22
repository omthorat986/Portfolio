import React from 'react';
import { personal, contact } from '../siteConfig';
import './TopSecretFolder.css';

export default function TopSecretFolder() {
  return (
    <article className="secret-folder shadow-2xl">
      <div className="folder-tab">RESUME.PDF</div>
      <div className="folder-cover">
        <div className="confidential-stamp">CONFIDENTIAL</div>
        
        <div className="folder-label">
          <h2>Subject: {personal.name}</h2>
          <p>Clearance: Level 4</p>
          <p>Status: ACTIVE DEVELOPER</p>
        </div>
        
        <a href={contact.resumeUrl} className="folder-link-btn" title="Open Dossier">
          ACCESS FILE
        </a>
      </div>
    </article>
  );
}
