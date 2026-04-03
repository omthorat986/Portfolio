import React, { useEffect, useState } from 'react';
import ProfileHero from './components/ProfileHero';
import SkillTreeLayout from './components/SkillTreeLayout';
import DesktopLayout from './components/DesktopLayout';
import PolaroidProject from './components/PolaroidProject';
import RippedNote from './components/RippedNote';
import BackgroundRocket from './components/BackgroundRocket';
import './App.css';

const featuredFallbackProjects = [
  { id: 1, title: 'Project: OVERDRIVE', role: 'Engine Architecture', engineUsed: 'C++ / Direct3D' },
  { id: 2, title: 'Nebula Tactics', role: 'AI Programming', engineUsed: 'Unity' },
];

function App() {
  const [projects, setProjects] = useState(featuredFallbackProjects);
  const [loadState, setLoadState] = useState('loading');

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
    const projectsEndpoint = `${apiBase.replace(/\/$/, '')}/projects`;
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(projectsEndpoint, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextProjects = Array.isArray(data?.data) && data.data.length > 0
          ? data.data
          : featuredFallbackProjects;

        if (!controller.signal.aborted) {
          setProjects(nextProjects);
          setLoadState(Array.isArray(data?.data) && data.data.length > 0 ? 'ready' : 'fallback');
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error('Error fetching projects:', error);
        setProjects(featuredFallbackProjects);
        setLoadState('fallback');
      }
    }

    loadProjects();

    return () => controller.abort();
  }, []);

  const dataLabel = loadState === 'loading' ? 'loading' : loadState === 'ready' ? 'live data' : 'fallback set';

  const renderProjectsAsArtifacts = () => {
    return projects.map((proj, idx) => {
      if (idx % 2 === 0) {
        return (
          <div key={proj.id} className="bento-item shadow-xl drop-shadow-md">
            <PolaroidProject project={proj} />
          </div>
        );
      } else {
        return (
          <div key={proj.id} className="bento-item shadow-lg rotate-slight">
            <RippedNote project={proj} />
          </div>
        );
      }
    });
  };

  return (
    <div className="narrative-layout">
      <header className="portfolio-intro">
        <div className="intro-copy">
          <p className="intro-eyebrow">Interactive portfolio</p>
          <h1>Game systems, presented like a curated desktop exhibit.</h1>
          <p className="intro-summary">
            A tactile portfolio built around polished UI layers, game-inspired details, and live project data.
          </p>
        </div>

        <div className="intro-metrics" aria-label="Portfolio summary">
          <div className="metric-card">
            <span className="metric-value">{projects.length}</span>
            <span className="metric-label">featured projects</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">3</span>
            <span className="metric-label">story sections</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{dataLabel}</span>
            <span className="metric-label">project source</span>
          </div>
        </div>
      </header>

      <BackgroundRocket />

      <section className="narrative-section section-hero">
        <ProfileHero />
      </section>

      <section className="narrative-section section-skills">
        <SkillTreeLayout />
      </section>

      <section className="narrative-section section-projects">
        <DesktopLayout projects={projects}>
          {renderProjectsAsArtifacts()}
        </DesktopLayout>
      </section>
    </div>
  );
}

export default App;
