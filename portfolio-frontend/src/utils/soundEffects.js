// Sound FX synthesizer using Web Audio API (zero external sound files, 0 latency)
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = true; // Respectful default
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    if (!this.muted) {
      this.playPowerUp();
    }
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTone(freq, duration = 0.08, type = 'sine', gainVal = 0.08) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      void 0;
    }
  }

  playClick() {
    this.playTone(800, 0.04, 'triangle', 0.05);
  }

  playHover() {
    this.playTone(320, 0.03, 'sine', 0.03);
  }

  playMechanicalClick() {
    this.playTone(950, 0.03, 'square', 0.04);
  }

  playMouseWheelTick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.playTone(620, 0.015, 'triangle', 0.025);
    } catch {
      void 0;
    }
  }

  playTerminalKey() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const f = 400 + Math.random() * 300;
      this.playTone(f, 0.03, 'sine', 0.04);
    } catch {
      void 0;
    }
  }

  playSuccessChirp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      [440, 554, 659, 880].forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.1, 'triangle', 0.07);
        }, idx * 60);
      });
    } catch {
      void 0;
    }
  }

  playFolderOpen() {
    if (this.muted) return;
    try {
      this.init();
      this.playTone(260, 0.08, 'sawtooth', 0.04);
      setTimeout(() => this.playTone(390, 0.1, 'sine', 0.05), 50);
    } catch {
      void 0;
    }
  }

  playFloppy() {
    if (this.muted) return;
    try {
      this.init();
      this.playTone(180, 0.06, 'square', 0.05);
      setTimeout(() => this.playTone(220, 0.08, 'square', 0.05), 60);
    } catch {
      void 0;
    }
  }

  playPowerUp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      [220, 330, 440, 587, 880].forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.09, 'sine', 0.08);
        }, idx * 50);
      });
    } catch {
      void 0;
    }
  }

  playWeaponSwitch() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.playTone(520, 0.04, 'triangle', 0.06);
      setTimeout(() => this.playTone(780, 0.05, 'square', 0.07), 40);
      setTimeout(() => this.playTone(1040, 0.06, 'sawtooth', 0.05), 80);
    } catch {
      void 0;
    }
  }

  playLaser() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      void 0;
    }
  }

  playRadarPing() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1250, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      void 0;
    }
  }

  playOverdriveTurbo() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      void 0;
    }
  }
}

export const sounds = new SoundManager();
