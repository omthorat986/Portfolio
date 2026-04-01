import React from 'react';
import './PolaroidProject.css';

export default function PolaroidProject({ project }) {
  // Try to use a video thumbnail or fallback to a stylized colored div based on the title
  return (
    <article className="polaroid shadow-lg">
      <div className="polaroid-image">
        {project.videoUrl ? (
          <div className="polaroid-placeholder" style={{ backgroundColor: '#2d3436' }}>
            <span className="play-icon">▶</span>
          </div>
        ) : (
          <div className="polaroid-placeholder" />
        )}
      </div>
      <div className="polaroid-caption">
        <h3>{project.title}</h3>
        <p>{project.role} | {project.engineUsed || 'N/A'}</p>
        {project.videoUrl && (
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
        )}
      </div>
    </article>
  );
}
