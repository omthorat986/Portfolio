import React from 'react';
import './BusinessCard.css';

export default function BusinessCard() {
  return (
    <article className="business-card shadow-lg">
      <div className="card-top-accent"></div>
      <div className="card-body">
        <h1 className="card-name">OM</h1>
        <h2 className="card-title">Gameplay Programmer</h2>

        <div className="card-divider"></div>

        <div className="card-contact">
          <a href="mailto:thoratom33@gmail.com" className="contact-link">
            <span className="contact-icon">✉</span> thoratom33@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/om-thorat-623630299" target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">in</span> linkedin.com/in/om-thorat-623630299
          </a>
          <a href="https://github.com/omthorat986" target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">&gt;_</span> github.com/omthorat986
          </a>
          <p><span className="contact-icon">✦</span> available for hire</p>
        </div>
      </div>
    </article>
  );
}
