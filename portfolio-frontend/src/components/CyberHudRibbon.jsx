import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import './CyberHudRibbon.css';

export default function CyberHudRibbon({ onToast, turboBoostActive = false }) {
  const [fps, setFps] = useState(60.0);
  const [entityCount, setEntityCount] = useState(15240);
  const [waveSeed, setWaveSeed] = useState(0);

  // Micro-fluctuations for realistic game telemetry feel
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter FPS slightly around 60.0 (or 120 if turbo is active)
      const baseFps = turboBoostActive ? 120.0 : 60.0;
      const jitter = (Math.random() * 0.4 - 0.2);
      setFps(Number((baseFps + jitter).toFixed(1)));

      // Jitter simulated entities slightly
      const entityJitter = Math.floor(Math.random() * 18 - 9);
      setEntityCount((prev) => Math.max(15100, Math.min(15380, prev + entityJitter)));

      setWaveSeed((s) => (s + 1) % 100);
    }, 450);

    return () => clearInterval(interval);
  }, [turboBoostActive]);

  const handleMetricClick = (title, toastMsg) => {
    sounds.playMechanicalClick();
    if (onToast) {
      onToast(toastMsg || `${title} telemetry inspected! ⚡`);
    }
  };

  return (
    <div className={`cyber-hud-ribbon ${turboBoostActive ? 'hud-turbo-mode' : ''}`}>
      <div className="hud-corner-accent hud-corner-tl" />
      <div className="hud-corner-accent hud-corner-tr" />
      <div className="hud-corner-accent hud-corner-bl" />
      <div className="hud-corner-accent hud-corner-br" />

      {/* Top Banner Tag */}
      <div className="hud-top-bar">
        <div className="hud-brand">
          <span className="hud-brand-dot" />
          <span className="hud-brand-title">OM THORAT // ENGINE TELEMETRY</span>
          <span className="hud-engine-tag">D3D12 / UNITY / SIMD</span>
        </div>
        <div className="hud-status-badge">
          <span className="hud-live-indicator" />
          <span className="hud-status-text">
            {turboBoostActive ? '⚡ OVERDRIVE TURBO ENGAGED' : 'LIVE 60 FPS SIMULATION'}
          </span>
        </div>
      </div>

      {/* Telemetry Cells Grid */}
      <div className="hud-grid">
        {/* Metric 1: FPS & Frame Time */}
        <div
          className="hud-cell cell-fps"
          role="button"
          tabIndex={0}
          title="Direct3D 12 Frame Rate (Click to inspect)"
          onClick={() =>
            handleMetricClick(
              'Frame Engine',
              `Target Frame Rate: ${fps} FPS (${(1000 / fps).toFixed(1)}ms frame budget) • D3D12 Render Loop 🎯`
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMetricClick('Frame Engine', `Target Frame Rate: ${fps} FPS • D3D12 Render Loop 🎯`);
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">RENDER PIPELINE</span>
            <span className="hud-cell-tag">V-SYNC LOCK</span>
          </div>
          <div className="hud-cell-value-row">
            <span className="hud-cell-value value-emerald">
              {fps} <span className="hud-unit">FPS</span>
            </span>
            <span className="hud-micro-chip">{(1000 / fps).toFixed(1)}ms</span>
          </div>
          {/* Animated Mini Sparkline SVG */}
          <div className="hud-sparkline-container" aria-hidden="true">
            <svg viewBox="0 0 100 18" className="hud-sparkline-svg">
              <path
                d={`M0,9 Q15,${8 + (waveSeed % 4)} 30,9 T60,${9 - (waveSeed % 3)} T90,9 L100,9`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="95" cy="9" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Metric 2: ECS Entity Simulation */}
        <div
          className="hud-cell cell-entities"
          role="button"
          tabIndex={0}
          title="Dynamic ECS Entities (Click to inspect)"
          onClick={() =>
            handleMetricClick(
              'ECS Entities',
              `Active Simulation: ${entityCount.toLocaleString()} entities in SIMD Data-Oriented memory chunks 👾`
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMetricClick('ECS Entities', `Active Simulation: ${entityCount.toLocaleString()} entities 👾`);
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">ECS ENTITIES</span>
            <span className="hud-cell-tag">PARALLEL</span>
          </div>
          <div className="hud-cell-value-row">
            <span className="hud-cell-value value-cyan">
              {entityCount.toLocaleString()}
            </span>
            <span className="hud-micro-chip">ACTIVE</span>
          </div>
          <div className="hud-cell-sub">SIMD Broadphase Spatial Hash</div>
        </div>

        {/* Metric 3: Memory Arena Allocator */}
        <div
          className="hud-cell cell-memory"
          role="button"
          tabIndex={0}
          title="Linear Memory Allocator (Click to inspect)"
          onClick={() =>
            handleMetricClick(
              'Memory Arena',
              'Memory Allocator: 184MB / 256MB VRAM Linear Arena • Zero heap fragmentation! 🧠'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMetricClick('Memory Arena', 'Memory Allocator: 184MB / 256MB VRAM Linear Arena 🧠');
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">MEMORY ARENA</span>
            <span className="hud-cell-tag">LINEAR</span>
          </div>
          <div className="hud-cell-value-row">
            <span className="hud-cell-value value-amber">184 / 256</span>
            <span className="hud-unit">MB</span>
          </div>
          <div className="hud-progress-track">
            <div className="hud-progress-fill" style={{ width: '72%' }} />
          </div>
        </div>

        {/* Metric 4: Physics Loop */}
        <div
          className="hud-cell cell-physics"
          role="button"
          tabIndex={0}
          title="Fixed Physics Step (Click to inspect)"
          onClick={() =>
            handleMetricClick(
              'Physics Step',
              'Physics Tick Rate: 120Hz Fixed Step with deterministic RK4 numerical integration ⚙️'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMetricClick('Physics Step', 'Physics Tick Rate: 120Hz Fixed Step ⚙️');
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">PHYSICS STEP</span>
            <span className="hud-cell-tag">120Hz</span>
          </div>
          <div className="hud-cell-value-row">
            <span className="hud-cell-value value-purple">8.33</span>
            <span className="hud-unit">ms TICK</span>
          </div>
          <div className="hud-cell-sub">AABB Collisions &bull; Sweep Test</div>
        </div>

        {/* Metric 5: Dev Status & Availability */}
        <div
          className="hud-cell cell-status"
          role="button"
          tabIndex={0}
          title="Om Thorat Developer Status (Click to inspect)"
          onClick={() =>
            handleMetricClick(
              'Developer Status',
              'Om Thorat: Gameplay & Systems Programmer • Open for Hire! 🚀'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMetricClick('Developer Status', 'Om Thorat: Gameplay & Systems Programmer 🚀');
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">DEV AVAILABILITY</span>
            <span className="hud-cell-tag">OPEN</span>
          </div>
          <div className="hud-cell-value-row">
            <span className="hud-cell-value value-emerald-text">READY FOR HIRE</span>
          </div>
          <div className="hud-cell-sub">Available Remote / Worldwide</div>
        </div>

        {/* Metric 6: Equalizer & Audio Channel */}
        <div
          className="hud-cell cell-audio"
          role="button"
          tabIndex={0}
          title="Synthesizer Sound FX Engine (Click to test)"
          onClick={() => {
            sounds.playLaser();
            if (onToast) onToast('Audio Synthesizer: Web Audio API procedural oscillator online! 🔊');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              sounds.playLaser();
              if (onToast) onToast('Audio Synthesizer: Web Audio API procedural oscillator online! 🔊');
            }
          }}
        >
          <div className="hud-cell-header">
            <span className="hud-cell-label">AUDIO SYNTH</span>
            <span className="hud-cell-tag">0 LATENCY</span>
          </div>
          <div className="hud-eq-bars" aria-hidden="true">
            <span className="eq-bar b1" />
            <span className="eq-bar b2" />
            <span className="eq-bar b3" />
            <span className="eq-bar b4" />
            <span className="eq-bar b5" />
          </div>
          <div className="hud-cell-sub">Click for Audio Test Pulse</div>
        </div>
      </div>
    </div>
  );
}
