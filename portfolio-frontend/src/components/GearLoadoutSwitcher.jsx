import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import './GearLoadoutSwitcher.css';

const LOADOUTS = [
  {
    id: 'cpp-engine',
    key: '1',
    slot: 'CORE ENGINE ARCHITECTURE',
    name: 'C++20 ENGINE CORE & SIMD OPTIMIZATION',
    category: 'Data-Oriented & Cache-Aligned Architecture',
    icon: '⚡',
    engineBadge: 'C++20 / Direct3D 12',
    accentColor: '#38bdf8',
    themeClass: 'theme-overdrive',
    quote: '"Zero heap fragmentation, cache-line prefetching, and SIMD instruction pipelining."',
    description:
      'High-performance native game engine core powering 15,000+ simultaneous dynamic entities locked at a rock-solid 60 FPS.',
    stats: [
      { label: 'Memory Locality', value: '98%', rank: 'S+' },
      { label: 'Compute Throughput', value: '96%', rank: 'S' },
      { label: 'SIMD Vectorization', value: '94%', rank: 'S' },
      { label: 'Heap Overhead', value: '0% (Linear Arena)', rank: 'EX' },
    ],
    abilityName: 'OVERDRIVE TURBO BENCHMARK',
    abilityIcon: '⚡',
    abilityToast: 'OVERDRIVE ENGAGED: 120 FPS Turbo Mode & SIMD Solver Active! 🚀',
    associatedProjectId: 1,
    projectTitle: 'Project: OVERDRIVE',
  },
  {
    id: 'unity-combat',
    key: '2',
    slot: 'GAMEPLAY & AI SYSTEMS',
    name: 'UNITY COMBAT SYSTEMS & TACTICAL AI',
    category: 'Deterministic Combat Mechanics & AI',
    icon: '🎯',
    engineBadge: 'Unity HDRP / C#',
    accentColor: '#34d399',
    themeClass: 'theme-tactics',
    quote: '"Hierarchical behavior trees, microsecond A* pathfinding, and responsive combat game feel."',
    description:
      'Engineered tactical autonomous squad AI, raycast collision hitboxes, dynamic fog-of-war, and responsive combat loops.',
    stats: [
      { label: 'Combat Game Feel', value: '97%', rank: 'S+' },
      { label: 'AI Decision Nodes', value: '48 Nodes', rank: 'S' },
      { label: 'A* Pathfinding Tick', value: '0.8ms', rank: 'EX' },
      { label: 'State Machine Latency', value: '< 1ms', rank: 'S+' },
    ],
    abilityName: 'DEPLOY TACTICAL SQUAD SCAN',
    abilityIcon: '🎯',
    abilityToast: 'TACTICAL SCAN: Autonomous AI Fleet locked onto coordinates! 🛰️',
    associatedProjectId: 2,
    projectTitle: 'Nebula Tactics',
  },
  {
    id: 'shader-compute',
    key: '3',
    slot: 'GRAPHICS & COMPUTE PIPELINE',
    name: 'HLSL COMPUTE PIPELINE & GPU SHADERS',
    category: 'Volumetric Simulation & GPU Shaders',
    icon: '🔮',
    engineBadge: 'HLSL / GLSL / RenderDoc',
    accentColor: '#f43f5e',
    themeClass: 'theme-shaders',
    quote: '"Parallel matrix transforms, compute particle vortices, and draw call batching under 120/frame."',
    description:
      'Authored GLSL/HLSL compute passes for volumetric weather, turbulence fields, and debugged GPU draw passes with RenderDoc.',
    stats: [
      { label: 'Shader Pass Optimization', value: '95%', rank: 'S+' },
      { label: 'Draw Call Batching', value: '< 120/frame', rank: 'EX' },
      { label: 'Volumetric Precision', value: '94%', rank: 'S' },
      { label: 'RenderDoc Profiling', value: 'Mastered', rank: 'S+' },
    ],
    abilityName: 'CHROMATIC SHADER OVERLOAD',
    abilityIcon: '🌈',
    abilityToast: 'SHADER OVERLOAD: Volumetric compute pass compiled across GPU cores! ✨',
    associatedProjectId: 1,
    projectTitle: 'Compute Shader Pipeline',
  },
];

export default function GearLoadoutSwitcher({
  onOpenProject,
  onToast,
  onTurboToggle,
}) {
  const [activeLoadoutIndex, setActiveLoadoutIndex] = useState(0);
  const [abilityFiring, setAbilityFiring] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const activeLoadout = LOADOUTS[activeLoadoutIndex];

  const handleSelectLoadout = (index) => {
    if (index === activeLoadoutIndex) return;
    sounds.playWeaponSwitch();
    setActiveLoadoutIndex(index);
    setPulseKey((k) => k + 1);
    if (onToast) {
      onToast(`[LOADOUT EQUIPPED] ${LOADOUTS[index].name} ⚔️`);
    }
  };

  const handleDeployAbility = () => {
    setAbilityFiring(true);
    setPulseKey((k) => k + 1);

    if (activeLoadout.id === 'cpp-engine') {
      sounds.playOverdriveTurbo();
      if (onTurboToggle) onTurboToggle(true);
      setTimeout(() => {
        if (onTurboToggle) onTurboToggle(false);
      }, 4500);
    } else if (activeLoadout.id === 'unity-combat') {
      sounds.playRadarPing();
    } else {
      sounds.playLaser();
    }

    if (onToast) {
      onToast(activeLoadout.abilityToast, activeLoadout.abilityIcon);
    }

    setTimeout(() => {
      setAbilityFiring(false);
    }, 900);
  };

  const handleInspectProject = () => {
    sounds.playFolderOpen();
    if (onOpenProject) {
      onOpenProject({
        id: activeLoadout.associatedProjectId,
        title: activeLoadout.projectTitle,
      });
    }
  };

  return (
    <div className={`gear-loadout-container ${activeLoadout.themeClass}`} id="gear-loadout">
      {/* Developer Tech Stack Header */}
      <div className="loadout-header">
        <div className="loadout-title-group">
          <span className="loadout-badge-pill">TECH SPECIALIZATIONS</span>
          <h3 className="loadout-main-title">OM THORAT // DEV LOADOUTS &amp; TECH STACK</h3>
        </div>
        <p className="loadout-subtitle">
          Select Om&apos;s active gameplay &amp; engine specialization to inspect architecture specs, benchmarks &amp; live simulations:
        </p>
      </div>

      {/* Loadout Weapon Selection Tabs */}
      <div className="loadout-tabs-row" role="tablist" aria-label="Developer Gear Loadouts">
        {LOADOUTS.map((loadout, idx) => {
          const isActive = idx === activeLoadoutIndex;
          return (
            <button
              key={loadout.id}
              role="tab"
              aria-selected={isActive}
              className={`loadout-tab-btn ${isActive ? 'tab-active' : ''}`}
              onClick={() => handleSelectLoadout(idx)}
            >
              <div className="tab-key-tag">[{loadout.key}]</div>
              <span className="tab-icon">{loadout.icon}</span>
              <div className="tab-text-wrap">
                <span className="tab-slot-label">{loadout.slot}</span>
                <span className="tab-title">{loadout.engineBadge}</span>
              </div>
              {isActive && <span className="tab-active-indicator" />}
            </button>
          );
        })}
      </div>

      {/* Active Weapon Showcase Card */}
      <div
        className={`loadout-card-stage ${abilityFiring ? 'ability-shockwave-active' : ''}`}
        key={pulseKey}
      >
        {/* Holographic scanner line */}
        <div className="loadout-holo-scanline" aria-hidden="true" />

        {/* Top Info Banner */}
        <div className="card-top-row">
          <div className="card-identity">
            <span className="card-slot-tag">{activeLoadout.slot}</span>
            <h4 className="card-weapon-name">
              <span className="weapon-icon-large">{activeLoadout.icon}</span>
              {activeLoadout.name}
            </h4>
            <span className="card-category-tag">{activeLoadout.category}</span>
          </div>

          <div className="card-engine-chip">
            <span className="engine-chip-label">RUNTIME PLATFORM</span>
            <span className="engine-chip-val">{activeLoadout.engineBadge}</span>
          </div>
        </div>

        {/* Weapon Description & Lore */}
        <div className="card-body-row">
          <div className="card-description-col">
            <blockquote className="card-quote">{activeLoadout.quote}</blockquote>
            <p className="card-summary">{activeLoadout.description}</p>
          </div>

          {/* Radar / Stat Bars */}
          <div className="card-stats-col">
            <div className="stats-header">
              <span>SPECIALIZATION METRICS</span>
              <span>CALIBRATED</span>
            </div>
            <div className="stats-list">
              {activeLoadout.stats.map((st) => (
                <div key={st.label} className="stat-row">
                  <div className="stat-label-row">
                    <span className="stat-name">{st.label}</span>
                    <span className="stat-rank-badge">{st.rank}</span>
                  </div>
                  <div className="stat-value-text">{st.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls Dock */}
        <div className="card-actions-dock">
          <button
            className={`deploy-ability-btn ${abilityFiring ? 'btn-firing' : ''}`}
            onClick={handleDeployAbility}
            title="Deploy Special Ability & Sound Effect"
          >
            <span className="ability-btn-icon">{activeLoadout.abilityIcon}</span>
            <span className="ability-btn-text">
              DEPLOY: {activeLoadout.abilityName}
            </span>
          </button>

          <button
            className="inspect-blueprint-btn"
            onClick={handleInspectProject}
            title={`Inspect full blueprints for ${activeLoadout.projectTitle}`}
          >
            <span>📁</span>
            <span>INSPECT BLUEPRINT [{activeLoadout.projectTitle}]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
