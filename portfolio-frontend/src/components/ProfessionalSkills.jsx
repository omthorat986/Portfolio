import React, { useState } from 'react';
import { codeSkills, toolSkills } from '../siteConfig';
import { sounds } from '../utils/soundEffects';
import './ProfessionalSkills.css';

export default function ProfessionalSkills() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSkill, setActiveSkill] = useState(null);

  const handleTabChange = (tab) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  const handleSkillHover = (skill) => {
    sounds.playHover();
    setActiveSkill(skill);
  };

  const showLanguages = activeTab === 'all' || activeTab === 'languages';
  const showEngines = activeTab === 'all' || activeTab === 'engines';

  return (
    <article className="skills-clipboard shadow-2xl" tabIndex={0}>
      <div className="clipboard-clip"></div>
      <div className="clipboard-paper">
        <header className="skills-header">
          <h2 className="skills-title">Technical Specs</h2>
          <div className="skills-tab-bar">
            {['all', 'languages', 'engines'].map((tab) => (
              <button
                key={tab}
                className={`skills-tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {showLanguages && (
          <div className="skills-category">
            <h3 className="category-title">[ Languages &amp; Core ]</h3>
            <div className="skills-grid">
              {codeSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`skill-badge-card ${activeSkill?.name === skill.name ? 'skill-highlighted' : ''}`}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="skill-badge-top">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showEngines && (
          <div className="skills-category">
            <h3 className="category-title">[ Engines, Graphics &amp; Tools ]</h3>
            <div className="skills-grid">
              {toolSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`skill-badge-card ${activeSkill?.name === skill.name ? 'skill-highlighted' : ''}`}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="skill-badge-top">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Skill Detail Box */}
        <div className="skill-detail-box">
          <span className="detail-prefix">&gt; </span>
          <span className="detail-text">
            {activeSkill
              ? `${activeSkill.name}: ${activeSkill.desc}`
              : 'Hover or tap any skill node to inspect engineering depth.'}
          </span>
        </div>
      </div>
    </article>
  );
}
