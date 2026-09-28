import React from 'react';
import { sounds } from '../utils/soundEffects';
import './RippedNote.css';

export default function RippedNote({ project, onSelectProject }) {
  const handleClick = () => {
    sounds.playFolderOpen();
    if (onSelectProject) onSelectProject(project);
  };

  return (
    <article
      className="ripped-note shadow-md"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      title={`Click to inspect ${project.title}`}
    >
      <div className="note-clip-pin" aria-hidden="true" />
      <div className="note-content">
        <div className="note-header-row">
          <h3 className="note-title">{project.title}</h3>
          <span className="note-stamp">PROJECT SPEC</span>
        </div>

        <p className="role-tag">{project.role} &bull; {project.engineUsed}</p>

        <div className="note-body">
          <p>{project.description}</p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="note-bullets">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        <div className="note-footer-action">
          <span>Click to Inspect Full Blueprint &rarr;</span>
        </div>
      </div>
      <div className="ripped-edge" aria-hidden="true"></div>
    </article>
  );
}
