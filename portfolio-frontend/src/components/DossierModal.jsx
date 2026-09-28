import React, { useEffect } from 'react';
import { personal, contact, dossierData } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './DossierModal.css';

export default function DossierModal({ onClose, onToast }) {
  useEffect(() => {
    sounds.playFolderOpen();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(contact.email);
    sounds.playSuccessChirp();
    if (onToast) onToast(`Copied ${contact.email} to clipboard! 📋`);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="dossier-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dossier-modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <header className="dossier-header">
          <div className="dossier-header-left">
            <span className="dossier-stamp">TOP SECRET // CLASSIFIED</span>
            <span className="dossier-clearance">{dossierData.clearanceLevel}</span>
          </div>
          <button className="dossier-close-btn" onClick={() => { sounds.playClick(); onClose(); }} title="Close (Esc)">
            ✕
          </button>
        </header>

        <div className="dossier-body">
          {/* Dossier ID Header */}
          <div className="dossier-id-block">
            <div className="dossier-id-photo">
              <img src={personal.avatar} alt={personal.fullName} />
              <div className="dossier-barcode-mini" />
            </div>
            <div className="dossier-id-text">
              <h1 className="dossier-name">{personal.fullName}</h1>
              <h2 className="dossier-title">{dossierData.specialization}</h2>
              <p className="dossier-status">● {personal.status}</p>
              <p className="dossier-location">📍 {personal.location}</p>
            </div>
          </div>

          {/* Dossier Executive Summary */}
          <div className="dossier-section">
            <h3 className="dossier-heading">[ SECTION 01: AGENT BRIEFING ]</h3>
            <p className="dossier-text">{dossierData.summary}</p>
          </div>

          {/* Key Competencies */}
          <div className="dossier-section">
            <h3 className="dossier-heading">[ SECTION 02: TECHNICAL COMPETENCIES ]</h3>
            <div className="dossier-competencies-grid">
              {dossierData.keyCompetencies.map((comp, idx) => (
                <div key={idx} className="competency-badge">
                  <span className="comp-bullet">▶</span> {comp}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Experience */}
          <div className="dossier-section">
            <h3 className="dossier-heading">[ SECTION 03: MISSION TIMELINE / EXPERIENCE ]</h3>
            <div className="dossier-timeline">
              {dossierData.experience.map((exp, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-meta">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-role">{exp.role}</h4>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="dossier-section">
            <h3 className="dossier-heading">[ SECTION 04: ACADEMIC CREDENTIALS ]</h3>
            <div className="dossier-edu-card">
              <h4>{dossierData.education.degree}</h4>
              <p>{dossierData.education.focus}</p>
              <span className="edu-honors">✦ {dossierData.education.honors}</span>
            </div>
          </div>
        </div>

        <footer className="dossier-footer">
          <div className="dossier-footer-links">
            <a href={`mailto:${contact.email}`} className="dossier-btn dossier-btn-primary" onClick={() => sounds.playClick()}>
              ✉ Contact via Email
            </a>
            <button className="dossier-btn dossier-btn-secondary" onClick={handleCopyEmail}>
              📋 Copy Email
            </button>
            <button className="dossier-btn dossier-btn-secondary" onClick={handlePrint}>
              🖨 Print / PDF
            </button>
          </div>
          <button className="dossier-btn dossier-btn-ghost" onClick={() => { sounds.playClick(); onClose(); }}>
            Exit Dossier
          </button>
        </footer>
      </div>
    </div>
  );
}
