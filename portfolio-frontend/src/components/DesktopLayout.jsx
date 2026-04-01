import React from 'react';
import './DesktopLayout.css';




import ProfessionalSkills from './ProfessionalSkills';
import TopSecretFolder from './TopSecretFolder';
import FloppyDisk from './FloppyDisk';
import BusinessCard from './BusinessCard';
import StickyNote from './StickyNote';
import DesktopGamingDecor from './DesktopGamingDecor';

export default function DesktopLayout({ children }) {
  return (
    <div className="desk-environment">
      <main className="bento-grid">
        {/* Module: The new Skills Clipboard sits top-left of the desk */}
        <div className="bento-item">
          <ProfessionalSkills />
        </div>

        {/* Module: Top Secret Resume Folder */}
        <div className="bento-item shadow-2xl">
          <TopSecretFolder />
        </div>

        {/* Module: Floppy Disk GitHub Link */}
        <div className="bento-item drop-shadow-md">
          <FloppyDisk />
        </div>
        
        {/* Module: Physical Business Card for Contact Info */}
        <div className="bento-item">
          <BusinessCard />
        </div>

        {/* Module: Casual Sticky Note */}
        <div className="bento-item">
          <StickyNote />
        </div>

        {/* Dynamic Project Objects */}
        {children}
        
        {/* Floating visual flair (Module 3) */}
        <div className="flair flair-coffee" aria-hidden="true" />
        <div className="flair flair-keyboard" aria-hidden="true" />
        
        {/* Added Gaming Decor (PS5 Controller + Pokemon Pixel Art) */}
        <DesktopGamingDecor />
      </main>
    </div>
  );
}
