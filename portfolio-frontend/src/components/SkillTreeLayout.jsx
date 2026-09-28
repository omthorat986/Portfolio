import React, { useEffect, useRef, useState } from 'react';
import { skillLevels } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './SkillTreeLayout.css';

export default function SkillTreeLayout({ onToast }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(skillLevels[1] || skillLevels[0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSelectLevel = (level) => {
    sounds.playClick();
    setSelectedLevel(level);
    if (onToast) onToast(`Unlocked: ${level.title} blueprint! ⚡`);
  };

  const delayClasses = ['node-active', 'node-active-delay-1', 'node-active-delay-2'];

  return (
    <section className="skill-tree-section" ref={sectionRef}>
      <div className="skill-tree-header-wrapper">
        <span className="skill-tree-badge">SYSTEM ARCHITECTURE MAP</span>
        <h2 className="graph-title">Level Progression &amp; Specialization</h2>
        <p className="graph-subtitle">
          Interactive engineering skill tree. Click any node to inspect systems and implementation depth.
        </p>
      </div>

      {/* Decorative Blueprint Game Elements */}
      <div className={`blueprint-decor decor-pacman ${isVisible ? 'decor-fade-in' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 50 10 A 40 40 0 1 1 50 90 L 50 50 Z" />
          <circle cx="50" cy="25" r="5" fill="currentColor" stroke="none" />
          <circle cx="80" cy="50" r="4" fill="currentColor" stroke="none"/>
          <circle cx="100" cy="50" r="4" fill="currentColor" stroke="none"/>
        </svg>
      </div>

      <div className={`blueprint-decor decor-triforce ${isVisible ? 'decor-fade-in-delay-1' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <polygon points="50,10 10,90 90,90" />
          <polygon points="50,90 30,50 70,50" />
        </svg>
      </div>

      <div className={`blueprint-decor decor-tetris ${isVisible ? 'decor-fade-in-delay-2' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="30" y="10" width="25" height="25" />
          <rect x="30" y="35" width="25" height="25" />
          <rect x="30" y="60" width="25" height="25" />
          <rect x="55" y="60" width="25" height="25" />
        </svg>
      </div>

      <div className={`blueprint-decor decor-invader ${isVisible ? 'decor-fade-in' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="currentColor" stroke="none">
          <path d="M 30,20 h40 v10 h-40 z M 20,30 h60 v10 h-60 z M 10,40 h80 v10 h-80 z M 10,50 h20 v10 h-20 z M 40,50 h20 v10 h-20 z M 70,50 h20 v10 h-20 z M 10,60 h80 v10 h-80 z M 30,70 h10 v10 h-10 z M 60,70 h10 v10 h-10 z M 10,80 h20 v10 h-20 z M 70,80 h20 v10 h-20 z" />
        </svg>
      </div>

      <div className="skill-tree-layout-wrapper">
        <div className="skill-tree-container">
          {/* SVG connection path */}
          <svg className="skill-connections" viewBox="0 0 400 760" preserveAspectRatio="none">
            <path
              className={`connection-line ${isVisible ? 'draw-line' : ''}`}
              d="M 200, 85 C 200, 210 100, 250 100, 380 C 100, 500 300, 555 300, 680"
            />
          </svg>

          {/* Nodes */}
          {skillLevels.map((level, idx) => {
            const isSelected = selectedLevel?.level === level.level;
            return (
              <div
                key={idx}
                className={`skill-node level-${idx + 1} ${isVisible ? delayClasses[idx] : ''} ${isSelected ? 'node-selected' : ''}`}
                onClick={() => handleSelectLevel(level)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectLevel(level); }}
              >
                <div className="node-icon">{level.icon}</div>
                <div className="node-content">
                  <div className="node-top-meta">
                    <span className="node-level-tag">LEVEL 0{level.level}</span>
                    <span className="node-mastery-tag">{level.mastery}</span>
                  </div>
                  <h3>{level.title}</h3>
                  <p>{level.subtitle || level.description.slice(0, 70) + '...'}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node System Inspector Panel */}
        {selectedLevel && (
          <aside className="skill-inspector-card shadow-2xl">
            <header className="inspector-header">
              <span className="inspector-badge">LEVEL {selectedLevel.level} DOSSIER</span>
              <span className="inspector-mastery">● {selectedLevel.mastery}</span>
            </header>

            <h3 className="inspector-title">{selectedLevel.title}</h3>
            <p className="inspector-desc">{selectedLevel.description}</p>

            <div className="inspector-tags-section">
              <span className="inspector-label">ENGINEERING CAPABILITIES:</span>
              <div className="inspector-tags">
                {selectedLevel.tags?.map((tag, i) => (
                  <span key={i} className="inspector-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="inspector-milestones">
              <div className="milestone-item">
                <span className="milestone-check">✓</span>
                <span>Deterministic collision &amp; raycasting pipelines</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-check">✓</span>
                <span>Modular combat state machine design</span>
              </div>
              <div className="milestone-item">
                <span className="milestone-check">✓</span>
                <span>Performance-locked 60 FPS frame budgets</span>
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
