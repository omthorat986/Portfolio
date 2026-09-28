import React from 'react';
import ProfessionalSkills from './ProfessionalSkills';
import TopSecretFolder from './TopSecretFolder';
import FloppyDisk from './FloppyDisk';
import BusinessCard from './BusinessCard';
import StickyNote from './StickyNote';
import DeskStickers from './DeskStickers';
import DesktopGamingDecor from './DesktopGamingDecor';
import './DesktopLayout.css';

export default function DesktopLayout({ children, onOpenDossier, onToast }) {
  return (
    <div className="desk-environment" id="projects-section">
      <div className="desk-header">
        <span className="desk-section-badge">INTERACTIVE WORKBENCH</span>
        <h2 className="desk-title">Developer Workspace &amp; Artifacts</h2>
        <p className="desk-subtitle">
          Physical developer objects, floppy archives, and stickers on Om&apos;s desk. Click to peel stickers, inspect blueprints, or unlock dossier.
        </p>
      </div>

      <main className="bento-grid">
        {/* Module 1: Technical Specs Clipboard (Left Column, Spans 2 Rows) */}
        <div className="bento-item bento-skills">
          <ProfessionalSkills />
        </div>

        {/* Dynamic Project Objects: Project OVERDRIVE (Col 2, Row 1) & Nebula Tactics (Col 3, Row 1) */}
        {children}

        {/* Module 4: Top Secret Resume Folder (Col 2, Row 2) */}
        <div className="bento-item bento-folder">
          <TopSecretFolder onOpenDossier={onOpenDossier} />
        </div>

        {/* Module 5: Hardware Interface (Col 3, Row 2) */}
        <div className="bento-item bento-hardware">
          <DesktopGamingDecor onToast={onToast} />
        </div>

        {/* Module 6: Floppy Disk GitHub Link (Col 1, Row 3) */}
        <div className="bento-item bento-floppy">
          <FloppyDisk onToast={onToast} />
        </div>

        {/* Module 7: Physical Business Card (Col 2, Row 3) */}
        <div className="bento-item bento-card">
          <BusinessCard onToast={onToast} />
        </div>

        {/* Module 8: Interactive Sticky Note Sprint Checklist (Col 3, Row 3) */}
        <div className="bento-item bento-sticky">
          <StickyNote onToast={onToast} />
        </div>

        {/* Module 9: Developer Die-Cut Sticker Pack (Full Width, Row 4) */}
        <div className="bento-item bento-stickers-wrap">
          <DeskStickers onToast={onToast} />
        </div>

        {/* Floating visual flair */}
        <div className="flair flair-coffee" aria-hidden="true" title="Coffee Fuel" />
        <div className="flair flair-keyboard" aria-hidden="true" />
      </main>
    </div>
  );
}
