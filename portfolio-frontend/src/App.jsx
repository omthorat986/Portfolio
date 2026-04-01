import React, { useState, useEffect } from 'react';
import ProfileHero from './components/ProfileHero';
import SkillTreeLayout from './components/SkillTreeLayout';
import DesktopLayout from './components/DesktopLayout';
import PolaroidProject from './components/PolaroidProject';
import RippedNote from './components/RippedNote';
import BackgroundRocket from './components/BackgroundRocket';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
    const projectsEndpoint = `${apiBase.replace(/\/$/, '')}/projects`;

      // Fetch project data from existing API endpoint
    fetch(projectsEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          // Provide highly thematic dummy placeholders if API is empty
          setProjects([
            { id: 1, title: 'Project: OVERDRIVE', role: 'Engine Arch.', engineUsed: 'C++ / Direct3D' },
            { id: 2, title: 'Nebula Tactics', role: 'AI Programmer', engineUsed: 'Unity' }
          ]);
        }
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setProjects([
            { id: 1, title: 'Project: OVERDRIVE', role: 'Engine Arch.', engineUsed: 'C++ / Direct3D' },
            { id: 2, title: 'Nebula Tactics', role: 'AI Programmer', engineUsed: 'Unity' }
        ]);
      });
  }, []);

  // Map projects as physical objects
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
      {/* Background layer */}
      <BackgroundRocket />

      {/* Section 1: The Profile Hero */}
      <section className="narrative-section section-hero">
        <ProfileHero />
      </section>

      {/* Section 2: Experience Timeline */}
      <section className="narrative-section section-skills">
        <SkillTreeLayout />
      </section>

      {/* Section 3: The Project Bento Grid */}
      <section className="narrative-section section-projects">
        <DesktopLayout projects={projects}>
          {renderProjectsAsArtifacts()}
        </DesktopLayout>
      </section>
    </div>
  );
}

export default App;
