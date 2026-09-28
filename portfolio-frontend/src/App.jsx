import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fallbackProjects, personal, contact } from './siteConfig';
import ProfileHero from './components/ProfileHero';
import SkillTreeLayout from './components/SkillTreeLayout';
import DesktopLayout from './components/DesktopLayout';
import PolaroidProject from './components/PolaroidProject';
import RippedNote from './components/RippedNote';
import BackgroundRocket from './components/BackgroundRocket';
import CelestialStarBackground from './components/CelestialStarBackground';
import ProjectModal from './components/ProjectModal';
import DossierModal from './components/DossierModal';
import MouseScrollIndicator from './components/MouseScrollIndicator';
import { sounds } from './utils/soundEffects';
import './App.css';

function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loadState, setLoadState] = useState('loading');
  const [activeSection, setActiveSection] = useState('hero');
  const [navScrolled, setNavScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('om_portfolio_theme') || 'dark';
  });
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const sectionRefs = useRef({});

  const setSectionRef = useCallback((id) => (el) => {
    sectionRefs.current[id] = el;
  }, []);

  // ── Apply theme to <html> ──────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('om_portfolio_theme', theme);
  }, [theme]);

  // ── Toast Notification Dispatcher ──────────────────────────────
  const showToast = useCallback((message, icon = '✦') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // ── Toggle Theme ───────────────────────────────────────────────
  const toggleTheme = () => {
    sounds.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(
      nextTheme === 'dark'
        ? 'Night Studio: Obsidian Star Trails active! 🌌'
        : 'Daylight Studio: Dawn Twilight active! ☀️'
    );
  };

  // ── Toggle Sound FX ────────────────────────────────────────────
  const toggleAudio = () => {
    const unmuted = sounds.toggleMute();
    setIsSoundMuted(!unmuted);
    showToast(unmuted ? 'Sound FX Enabled 🔊' : 'Sound FX Muted 🔇');
  };

  // ── Fetch projects from API with fallback ───────────────────────
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
            ? data.data.map((p, idx) => ({
                ...fallbackProjects[idx % fallbackProjects.length],
                ...p,
              }))
            : fallbackProjects;

        if (!controller.signal.aborted) {
          setProjects(nextProjects);
          setLoadState('ready');
        }
      } catch {
        if (controller.signal.aborted) return;
        setProjects(fallbackProjects);
        setLoadState('offline');
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
    const onScroll = () => setNavScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    sounds.playClick();
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderProjectsAsArtifacts = () =>
    projects.map((proj, idx) =>
      idx % 2 === 0 ? (
        <div key={proj.id} className="bento-item bento-overdrive">
          <PolaroidProject project={proj} onSelectProject={setSelectedProject} />
        </div>
      ) : (
        <div key={proj.id} className="bento-item bento-nebula">
          <RippedNote project={proj} onSelectProject={setSelectedProject} />
        </div>
      )
    );

  return (
    <div className="narrative-layout">
      {/* ── Toast Notifications ─────────────────────────────── */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span className="toast-icon">{toast.icon}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* ── Floating Navigation Bar ─────────────────────────── */}
      <nav className={`floating-nav ${navScrolled ? 'nav-scrolled' : ''}`} id="main-nav">
        <button
          className="nav-logo-btn"
          onClick={() => scrollTo('hero')}
          title="Jump to Top"
        >
          <span className="nav-logo-icon">🎮</span>
          <span className="nav-logo-text">{personal.name}</span>
          <span className="nav-role-badge">DEV</span>
        </button>

        <div className="nav-links">
          {[
            ['hero', 'Terminal & ID'],
            ['skills', 'Skill Tree'],
            ['projects', 'Desk & Projects'],
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

        <div className="nav-controls">
          {/* Audio FX Toggle */}
          <button
            className={`nav-control-btn ${!isSoundMuted ? 'control-active' : ''}`}
            onClick={toggleAudio}
            title={isSoundMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound Effects"
          >
            {isSoundMuted ? '🔇' : '🔊'}
          </button>

          {/* Theme Mode Toggle */}
          <button
            className="nav-control-btn nav-theme-pill"
            onClick={toggleTheme}
            title={`Current: ${theme === 'dark' ? 'Night Studio (Cosmic Starfield)' : 'Daylight Studio (Dawn Twilight)'} • Click to switch`}
            aria-label="Toggle Color Theme"
          >
            <span className="theme-pill-icon">{theme === 'dark' ? '🌌' : '☀️'}</span>
            <span className="theme-pill-text">{theme === 'dark' ? 'NIGHT' : 'DAY'}</span>
          </button>

          {/* Resume Dossier Quick Trigger */}
          <button
            className="nav-dossier-pill"
            onClick={() => {
              sounds.playFolderOpen();
              setIsDossierOpen(true);
            }}
            title="Inspect Dossier & Resume"
          >
            <span>📁</span> Resume
          </button>
        </div>
      </nav>

      <CelestialStarBackground />
      <BackgroundRocket />

      {/* ── Section 1: Hero (Terminal + Studio Badge) ───────── */}
      <section
        className="narrative-section section-hero"
        ref={setSectionRef('hero')}
        id="section-hero"
      >
        <ProfileHero
          onOpenProject={setSelectedProject}
          onOpenDossier={() => setIsDossierOpen(true)}
          onToast={showToast}
        />
      </section>

      {/* ── Section 2: Skill Tree Progression ────────────────── */}
      <section
        className="narrative-section section-skills"
        ref={setSectionRef('skills')}
        id="section-skills"
      >
        <SkillTreeLayout onToast={showToast} />
      </section>

      {/* ── Section 3: Workbench Desk & Projects ─────────────── */}
      <section
        className="narrative-section section-projects"
        ref={setSectionRef('projects')}
        id="section-projects"
      >
        <DesktopLayout
          onOpenDossier={() => setIsDossierOpen(true)}
          onToast={showToast}
        >
          {renderProjectsAsArtifacts()}
        </DesktopLayout>
      </section>

      {/* ── Interactive Modals ───────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {isDossierOpen && (
        <DossierModal
          onClose={() => setIsDossierOpen(false)}
          onToast={showToast}
        />
      )}

      {/* ── Floating Scroll Progress & Mouse Animation HUD ── */}
      {navScrolled && (
        <MouseScrollIndicator
          targetId="hero"
          onToast={showToast}
          variant="floating"
        />
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="site-footer" id="site-footer">
        <div className="footer-inner">
          <div className="footer-status-pill">
            <span className="footer-pulse-dot" />
            <span>
              OPEN FOR GAME ENGINE &amp; GAMEPLAY ENGINEERING ROLES &bull;{' '}
              {loadState === 'ready' ? 'API LIVE' : 'DATA READY'}
            </span>
          </div>

          <p className="footer-brand">
            🎮 {personal.fullName} &mdash; {personal.title}
          </p>

          <p className="footer-quote">
            &ldquo;Building low-latency physics simulations, cache-friendly architecture, and unforgettable game feel.&rdquo;
          </p>

          <div className="footer-links">
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
            >
              GitHub
            </a>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${contact.email}`}
              onClick={() => sounds.playClick()}
            >
              Email ({contact.email})
            </a>
            <button
              className="footer-dossier-link"
              onClick={() => {
                sounds.playFolderOpen();
                setIsDossierOpen(true);
              }}
            >
              Confidential Dossier
            </button>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} {personal.fullName}. Engineered with React 19 &bull; Direct3D/Unity Mindset.
            </p>
            <button
              className="footer-back-to-top"
              onClick={() => scrollTo('hero')}
              title="Return to Top"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
