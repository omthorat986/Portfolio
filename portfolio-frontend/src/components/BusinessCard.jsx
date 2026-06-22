import React from 'react';
import { personal, contact } from '../siteConfig';
import './BusinessCard.css';

export default function BusinessCard() {
  return (
    <article className="business-card shadow-lg">
      <div className="card-top-accent"></div>
      <div className="card-body">
        <h1 className="card-name">{personal.name}</h1>
        <h2 className="card-title">Gameplay Programmer</h2>

        <div className="card-divider"></div>

        <div className="card-contact">
          <a href={`mailto:${contact.email}`} className="contact-link">
            <span className="contact-icon">✉</span> {contact.email}
          </a>
          <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">in</span> {contact.linkedinLabel}
          </a>
          <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">&gt;_</span> {contact.githubLabel}
          </a>
          <p><span className="contact-icon">✦</span> available for hire</p>
        </div>
      </div>
    </article>
  );
}
