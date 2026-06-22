import React from 'react';
import { codeSkills, toolSkills } from '../siteConfig';
import './ProfessionalSkills.css';

export default function ProfessionalSkills() {
  return (
    <article className="skills-clipboard shadow-2xl">
      <div className="clipboard-clip"></div>
      <div className="clipboard-paper">
        <h2 className="skills-title">Technical Specs</h2>

        <div className="skills-category">
          <h3>[ Languages ]</h3>
          <ul className="skills-list">
            {codeSkills.map((skill, idx) => (
              <li key={idx} className="skill-item">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="skills-category">
          <h3>[ Engines &amp; Tools ]</h3>
          <ul className="skills-list">
            {toolSkills.map((skill, idx) => (
              <li key={idx} className="skill-item">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
