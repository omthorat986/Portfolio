import React, { useState } from 'react';
import { contact } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './FloppyDisk.css';

export default function FloppyDisk({ onToast }) {
  const [shutterOpen, setShutterOpen] = useState(false);
  const [isStickerPeeling, setIsStickerPeeling] = useState(false);

  const handleMouseEnter = () => {
    setShutterOpen(true);
    sounds.playFloppy();
  };

  const handleMouseLeave = () => {
    setShutterOpen(false);
  };

  const handleCloneCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cmd = `git clone ${contact.githubUrl}.git`;
    navigator.clipboard?.writeText(cmd);
    sounds.playSuccessChirp();
    if (onToast) onToast(`Copied "${cmd}" to clipboard! 💾`);
  };

  const handleStickerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.playMechanicalClick();
    setIsStickerPeeling(!isStickerPeeling);
    if (onToast) {
      onToast(isStickerPeeling ? 'Floppy sticker smoothed down! 🏷️' : 'Floppy sticker corner peeled! 🏷️');
    }
  };

  return (
    <a
      href={contact.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="floppy-link"
      title="Visit Om Thorat's GitHub Repositories"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => sounds.playClick()}
    >
      <article className="floppy-disk shadow-xl">
        {/* Metal sliding shutter */}
        <div className={`floppy-shutter ${shutterOpen ? 'shutter-open' : ''}`}>
          <div className="shutter-slide">
            <span className="shutter-window"></span>
          </div>
        </div>

        {/* Recessed label well */}
        <div className="floppy-label-area">
          <div className="floppy-top-arrows">
            <span>&darr; INSERT FACE UP</span>
          </div>

          {/* ── High-Fidelity Retro Adhesive Sticker ── */}
          <div
            className={`floppy-sticker ${isStickerPeeling ? 'sticker-peeling' : ''}`}
            onClick={handleStickerClick}
            title="Click to interact with sticker label"
          >
            {/* Retro 5-stripe header */}
            <div className="sticker-stripes" aria-hidden="true">
              <span className="stripe stripe-red" />
              <span className="stripe stripe-orange" />
              <span className="stripe stripe-yellow" />
              <span className="stripe stripe-cyan" />
              <span className="stripe stripe-purple" />
            </div>

            {/* Brand & format header */}
            <div className="sticker-brand-row">
              <span className="sticker-brand-name">RETRO-ARCHIVE™</span>
              <span className="sticker-hd-badge">2HD</span>
            </div>

            {/* Ruled lined title area */}
            <div className="sticker-field">
              <span className="sticker-field-tag">TITLE:</span>
              <h3 className="sticker-title">GITHUB://omthorat986</h3>
            </div>

            <div className="sticker-field">
              <span className="sticker-field-tag">SPEC:</span>
              <p className="sticker-content-text">C++ Engine &bull; Unity ECS &bull; D3D12</p>
            </div>

            {/* Bottom row with holographic authenticity seal and capacity */}
            <div className="sticker-bottom-row">
              <div className="sticker-holo-seal" title="Authentic Developer Archive">
                <span className="holo-icon">✦</span>
                <span className="holo-text">VERIFIED</span>
              </div>

              <div className="sticker-meta-data">
                <span className="sticker-capacity">1.44 MB</span>
                <span className="sticker-sectors">80 TRK / 18 SEC</span>
              </div>
            </div>

            {/* Realistic peeling dog-ear corner */}
            <div className="sticker-peel-corner" aria-hidden="true">
              <div className="peel-triangle" />
              <div className="peel-shadow" />
            </div>
          </div>
        </div>

        {/* Quick action button for git clone */}
        <button
          type="button"
          className="floppy-clone-chip"
          onClick={handleCloneCopy}
          title="Copy Git Clone Command to Clipboard"
        >
          <span>$</span> git clone repo
        </button>

        <div className="floppy-bottom-notch"></div>
        <div className="floppy-write-protect" title="Write-protect tab: READ ONLY"></div>
      </article>
    </a>
  );
}
