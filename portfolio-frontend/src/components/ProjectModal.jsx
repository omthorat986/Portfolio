import React, { useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    sounds.playFolderOpen();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="project-modal-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <header className="project-modal-header">
          <div className="modal-header-meta">
            <span className="modal-badge-tag">{project.role || 'Gameplay Engineer'}</span>
            <span className="modal-engine-tag">{project.engineUsed || 'Custom Engine'}</span>
          </div>
          <button className="modal-close-btn" onClick={() => { sounds.playClick(); onClose(); }} title="Close (Esc)">
            ✕
          </button>
        </header>

        <div className="project-modal-media">
          {project.image ? (
            <img src={project.image} alt={project.title} className="modal-project-img" />
          ) : (
            <div className="modal-project-placeholder">
              <span>🎮</span>
            </div>
          )}
          <div className="modal-image-overlay">
            <h2 className="modal-project-title">{project.title}</h2>
          </div>
        </div>

        <div className="project-modal-body">
          <p className="modal-project-desc">{project.description}</p>

          {project.stats && (
            <div className="modal-stats-grid">
              {project.stats.map((st, i) => (
                <div key={i} className="modal-stat-card">
                  <span className="stat-label">{st.label}</span>
                  <span className="stat-value">{st.val}</span>
                </div>
              ))}
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">⚡ Systems & Architecture Highlights</h3>
              <ul className="modal-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tags && (
            <div className="modal-tags">
              {project.tags.map((t, i) => (
                <span key={i} className="modal-tag">{t}</span>
              ))}
            </div>
          )}
        </div>

        <footer className="project-modal-footer">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="modal-btn modal-btn-secondary"
              onClick={() => sounds.playClick()}
            >
              <span>&gt;_</span> GitHub Repository
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="modal-btn modal-btn-primary"
              onClick={() => sounds.playClick()}
            >
              <span>▶</span> Launch Demo / Docs
            </a>
          )}
          <button className="modal-btn modal-btn-ghost" onClick={() => { sounds.playClick(); onClose(); }}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
