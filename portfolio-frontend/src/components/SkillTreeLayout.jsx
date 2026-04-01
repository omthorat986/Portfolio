import React, { useEffect, useRef, useState } from 'react';
import './SkillTreeLayout.css';

export default function SkillTreeLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skill-tree-section" ref={sectionRef}>
      <h2 className="graph-title">Level Progression Map</h2>
      
      {/* Decorative Blueprint Game Elements */}
      <div className={`blueprint-decor decor-pacman ${isVisible ? 'decor-fade-in' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* Pacman shape */}
          <path d="M 50 10 A 40 40 0 1 1 50 90 L 50 50 Z" />
          <circle cx="50" cy="25" r="5" fill="currentColor" stroke="none" />
          {/* Pellets */}
          <circle cx="80" cy="50" r="4" fill="currentColor" stroke="none"/>
          <circle cx="100" cy="50" r="4" fill="currentColor" stroke="none"/>
        </svg>
      </div>

      <div className={`blueprint-decor decor-triforce ${isVisible ? 'decor-fade-in-delay-1' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          {/* Master Sword / Triforce inspired wireframe */}
          <polygon points="50,10 10,90 90,90" />
          <polygon points="50,90 30,50 70,50" />
        </svg>
      </div>
      
      <div className={`blueprint-decor decor-tetris ${isVisible ? 'decor-fade-in-delay-2' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          {/* Tetris L-Block */}
          <rect x="30" y="10" width="25" height="25" />
          <rect x="30" y="35" width="25" height="25" />
          <rect x="30" y="60" width="25" height="25" />
          <rect x="55" y="60" width="25" height="25" />
        </svg>
      </div>

      <div className={`blueprint-decor decor-invader ${isVisible ? 'decor-fade-in' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="currentColor" stroke="none">
          {/* Classic 8-bit Space Invader silhouette drawn in SVG rects to mimic blocks */}
          <path d="M 30,20 h40 v10 h-40 z M 20,30 h60 v10 h-60 z M 10,40 h80 v10 h-80 z M 10,50 h20 v10 h-20 z M 40,50 h20 v10 h-20 z M 70,50 h20 v10 h-20 z M 10,60 h80 v10 h-80 z M 30,70 h10 v10 h-10 z M 60,70 h10 v10 h-10 z M 10,80 h20 v10 h-20 z M 70,80 h20 v10 h-20 z" />
        </svg>
      </div>

      <div className={`blueprint-decor decor-dpad ${isVisible ? 'decor-fade-in-delay-1' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          {/* Classic D-Pad */}
          <path d="M 35 15 L 65 15 L 65 35 L 85 35 L 85 65 L 65 65 L 65 85 L 35 85 L 35 65 L 15 65 L 15 35 L 35 35 Z" />
          <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.4" stroke="none" />
          <path d="M 50 20 L 50 30 M 50 80 L 50 70 M 20 50 L 30 50 M 80 50 L 70 50" strokeWidth="2" strokeOpacity="0.5" />
        </svg>
      </div>
      
      <div className="skill-tree-container">
        {/* SVG background connections */}
        <svg className="skill-connections" viewBox="0 0 400 600" preserveAspectRatio="none">
          <path 
            className={`connection-line ${isVisible ? 'draw-line' : ''}`}
            d="M 200, 50 C 200, 150 100, 200 100, 300 C 100, 400 300, 450 300, 550" 
          />
        </svg>

        {/* Nodes */}
        <div className={`skill-node level-1 ${isVisible ? 'node-active' : ''}`}>
          <div className="node-icon">Ⅰ</div>
          <div className="node-content">
            <h3>C# Fundamentals</h3>
            <p>Core C# programming, OOP (classes, constructors, enums), arrays (1D, 2D, jagged), and console-based problem solving.</p>
          </div>
        </div>

        <div className={`skill-node level-2 ${isVisible ? 'node-active-delay-1' : ''}`}>
          <div className="node-icon">Ⅱ</div>
          <div className="node-content">
            <h3>Core Game Systems</h3>
            <p>Building gameplay systems like player mechanics, combat logic, inventory systems, and grid-based movement.</p>
          </div>
        </div>

        <div className={`skill-node level-3 ${isVisible ? 'node-active-delay-2' : ''}`}>
          <div className="node-icon">Ⅲ</div>
          <div className="node-content">
            <h3>Gameplay & Systems Development</h3>
            <p>Developing interactive console-based games and preparing for Unity-based game development.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
