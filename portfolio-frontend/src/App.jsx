import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fallbackProjects, personal, contact } from './siteConfig';
import ProfileHero from './components/ProfileHero';
import SkillTreeLayout from './components/SkillTreeLayout';
import DesktopLayout from './components/DesktopLayout';
import PolaroidProject from './components/PolaroidProject';
import RippedNote from './components/RippedNote';
import BackgroundRocket from './components/BackgroundRocket';
import './App.css';

function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loadState, setLoadState] = useState('loading');
  const [activeSection, setActiveSection] = useState('hero');
  const [navScrolled, setNavScrolled] = useState(false);

  const sectionRefs = useRef({});

  const setSectionRef = useCallback((id) => (el) => {
    sectionRefs.current[id] = el;
  }, []);

  // ── Fetch projects from API ────────────────────────────────────
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
    const projectsEndpoint = `${apiBase.replace(/\/$/, '')}/projects`;
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(projectsEndpoint, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextProjects =
          Array.isArray(data?.data) && data.data.length > 0
            ? data.data
            : fallbackProjects;

        if (!controller.signal.aborted) {
          setProjects(nextProjects);
          setLoadState(
            Array.isArray(data?.data) && data.data.length > 0 ? 'ready' : 'fallback'
          );
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Error fetching projects:', error);
        setProjects(fallbackProjects);
        setLoadState('fallback');
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  // ── IntersectionObserver for section reveals & nav highlight ───
  useEffect(() => {
    const observers = [];
    const sectionIds = ['hero', 'skills', 'projects'];

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('section-visible');
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.15, rootMargin: '-60px 0px 0px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Navbar scroll styling ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const dataLabel =
    loadState === 'loading'
      ? null
      : loadState === 'ready'
      ? 'live data'
      : 'fallback set';

  const renderProjectsAsArtifacts = () =>
    projects.map((proj, idx) =>
      idx % 2 === 0 ? (
        <div key={proj.id} className="bento-item shadow-xl drop-shadow-md">
          <PolaroidProject project={proj} />
        </div>
      ) : (
        <div key={proj.id} className="bento-item shadow-lg rotate-slight">
          <RippedNote project={proj} />
        </div>
      )
    );

  return (
    <div className="narrative-layout">
      {/* ── Floating Navigation ──────────────────────────────── */}
      <nav className={`floating-nav ${navScrolled ? 'nav-scrolled' : ''}`} id="main-nav">
        <span className="nav-logo">🎮 {personal.name}</span>
        <div className="nav-links">
          {[
            ['hero', 'Profile'],
            ['skills', 'Skills'],
            ['projects', 'Projects'],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`nav-link ${activeSection === id ? 'nav-active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Intro Header ─────────────────────────────────────── */}
      <header className="portfolio-intro">
        <div className="intro-copy">
          <p className="intro-eyebrow">Interactive portfolio</p>
          <h1>Game systems, presented like a curated desktop exhibit.</h1>
          <p className="intro-summary">
            A tactile portfolio built around polished UI layers, game-inspired details, and live project data.
          </p>
        </div>
      </header>

      <BackgroundRocket />

      {/* ── Sections ─────────────────────────────────────────── */}
      <section
        className="narrative-section section-hero"
        ref={setSectionRef('hero')}
        id="section-hero"
      >
        <ProfileHero />
      </section>

      <section
        className="narrative-section section-skills"
        ref={setSectionRef('skills')}
        id="section-skills"
      >
        <SkillTreeLayout />
      </section>

      <section
        className="narrative-section section-projects"
        ref={setSectionRef('projects')}
        id="section-projects"
      >
        <DesktopLayout>{renderProjectsAsArtifacts()}</DesktopLayout>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="site-footer" id="site-footer">
        <div className="footer-inner">
          <p className="footer-brand">
            🎮 {personal.fullName} &mdash; {personal.title}
          </p>
          <div className="footer-links">
            <a href={contact.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contact.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${contact.email}`}>Email</a>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {personal.fullName}. Crafted with React &amp; passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
