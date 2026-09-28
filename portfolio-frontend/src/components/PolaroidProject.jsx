import React from 'react';
import { sounds } from '../utils/soundEffects';
import './PolaroidProject.css';

export default function PolaroidProject({ project, onSelectProject }) {
  const handleClick = () => {
    sounds.playFolderOpen();
    if (onSelectProject) onSelectProject(project);
  };

  return (
    <article
      className="polaroid shadow-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      title={`Click to inspect ${project.title}`}
    >
      <div className="polaroid-pin-tape" aria-hidden="true" />
      <div className="polaroid-image">
        {project.image ? (
          <img src={project.image} alt={project.title} className="polaroid-real-img" loading="lazy" />
        ) : (
          <div className="polaroid-placeholder">
            <span className="play-icon">▶</span>
          </div>
        )}
        <div className="polaroid-hover-badge">
          <span>INSPECT ARCHITECTURE 🔍</span>
        </div>
      </div>

      <div className="polaroid-caption">
        <h3 className="polaroid-title">{project.title}</h3>
        <p className="polaroid-meta">{project.role} &bull; {project.engineUsed || 'C++'}</p>
        {project.tags && (
          <div className="polaroid-mini-tags">
            {project.tags.slice(0, 3).map((t, i) => (
              <span key={i} className="mini-tag">{t}</span>
            ))}
          </div>
        )}
        <div className="polaroid-action-link">
          <span>View Blueprint &amp; Telemetry &rarr;</span>
        </div>
      </div>
    </article>
  );
}
