import React from 'react';
import { personal, contact } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './BusinessCard.css';

export default function BusinessCard({ onToast }) {
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(contact.email);
    sounds.playSuccessChirp();
    if (onToast) onToast(`Copied ${contact.email} to clipboard! 📋`);
  };

  const handleCopyLinkedIn = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(contact.linkedinUrl);
    sounds.playSuccessChirp();
    if (onToast) onToast(`Copied LinkedIn URL to clipboard! 💼`);
  };

  return (
    <article className="business-card shadow-lg" tabIndex={0}>
      <div className="card-top-accent"></div>
      <div className="card-body">
        <div className="card-header-row">
          <div>
            <h1 className="card-name">{personal.name}</h1>
            <h2 className="card-title">{personal.title}</h2>
          </div>
          <span className="card-available-badge">✦ FOR HIRE</span>
        </div>

        <div className="card-divider"></div>

        <div className="card-contact">
          <div className="card-contact-row">
            <a href={`mailto:${contact.email}`} className="contact-link" onClick={() => sounds.playClick()}>
              <span className="contact-icon">✉</span> {contact.email}
            </a>
            <button
              type="button"
              className="card-copy-btn"
              onClick={handleCopyEmail}
              title="Copy Email Address"
            >
              Copy
            </button>
          </div>

          <div className="card-contact-row">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              onClick={() => sounds.playClick()}
            >
              <span className="contact-icon">in</span> {contact.linkedinLabel}
            </a>
            <button
              type="button"
              className="card-copy-btn"
              onClick={handleCopyLinkedIn}
              title="Copy LinkedIn Link"
            >
              Copy
            </button>
          </div>

          <div className="card-contact-row">
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              onClick={() => sounds.playClick()}
            >
              <span className="contact-icon">&gt;_</span> {contact.githubLabel}
            </a>
          </div>

          <p className="card-footnote">
            <span className="contact-icon">📍</span> Remote &bull; Worldwide Relocation Ready
          </p>
        </div>
      </div>
    </article>
  );
}
