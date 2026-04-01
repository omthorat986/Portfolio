import React from 'react';
import './RippedNote.css';

export default function RippedNote({ project }) {
  return (
    <article className="ripped-note shadow-md">
      <div className="note-content">
        <h3>{project.title}</h3>
        <p className="role-tag">{project.role} - {project.engineUsed}</p>
        <div className="note-body">
          <p>Key optimizations achieved targeting 60FPS lock under massive entity counts.</p>
        </div>
      </div>
      <div className="ripped-edge"></div>
    </article>
  );
}
