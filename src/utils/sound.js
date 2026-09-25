// Native Web Audio API Synthesizer & Generative Cosmic Space Ambient Engine
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.droneNodes = null;
    this.droneActive = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    this.init();

    if (this.enabled) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBeep(520, 0.08, 'sine');
      this.startCosmicDrone();
    } else {
      this.stopCosmicDrone();
    }

    return this.enabled;
  }

  /**
   * Generates a warm, ethereal, multi-oscillator cosmic drone
   * using native Web Audio API oscillators, LFO modulation, and resonant filtering.
   */
  startCosmicDrone() {
    if (!this.enabled || this.droneActive) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Master Drone Gain Node with smooth fade-in
      const masterDroneGain = this.ctx.createGain();
      masterDroneGain.gain.setValueAtTime(0.0001, now);
      masterDroneGain.gain.exponentialRampToValueAtTime(0.022, now + 2.5);
      masterDroneGain.connect(this.ctx.destination);

      // Low-pass filter to keep sound warm and oceanic (no harsh frequencies)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, now);
      filter.Q.setValueAtTime(2.5, now);
      filter.connect(masterDroneGain);

      // 1. Deep Sub-bass Foundation (55 Hz - A1)
      const oscSub = this.ctx.createOscillator();
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(55, now);

      // 2. Warm Fundamental Body (110 Hz - A2)
      const oscMid1 = this.ctx.createOscillator();
      oscMid1.type = 'sine';
      oscMid1.frequency.setValueAtTime(110, now);

      // 3. Ethereal Upper Harmonic with subtle detune (220 Hz / 221.3 Hz)
      const oscAir1 = this.ctx.createOscillator();
      oscAir1.type = 'sine';
      oscAir1.frequency.setValueAtTime(220, now);

      const oscAir2 = this.ctx.createOscillator();
      oscAir2.type = 'sine';
      oscAir2.frequency.setValueAtTime(221.3, now); // Gentle binaural beating

      // 4. LFO (Low-Frequency Oscillator) for slow cosmic breathing (0.06 Hz = ~16s cycle)
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.06, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(80, now); // Sweep filter between 280Hz - 440Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Connect all oscillators to warm filter
      oscSub.connect(filter);
      oscMid1.connect(filter);
      oscAir1.connect(filter);
      oscAir2.connect(filter);

      // Start oscillators
      oscSub.start(now);
      oscMid1.start(now);
      oscAir1.start(now);
      oscAir2.start(now);
      lfo.start(now);

      this.droneNodes = {
        oscillators: [oscSub, oscMid1, oscAir1, oscAir2, lfo],
        masterGain: masterDroneGain,
        filter: filter
      };
      this.droneActive = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  stopCosmicDrone() {
    if (!this.droneActive || !this.droneNodes || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const { masterGain, oscillators } = this.droneNodes;

      // Smooth fade-out over 1.2s to prevent pops
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          oscillators.forEach((osc) => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          masterGain.disconnect();
        } catch {}
      }, 1250);

      this.droneActive = false;
      this.droneNodes = null;
    } catch {
      this.droneActive = false;
    }
  }

  playBeep(freq = 440, duration = 0.05, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  hover() {
    this.playBeep(320, 0.03, 'sine');
  }

  click() {
    this.playBeep(640, 0.06, 'triangle');
  }

  success() {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.08, 'sine');
    setTimeout(() => this.playBeep(659.25, 0.08, 'sine'), 80);
    setTimeout(() => this.playBeep(783.99, 0.12, 'sine'), 160);
  }

  matrix() {
    if (!this.enabled) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.playBeep(200 + Math.random() * 600, 0.03, 'sawtooth');
      }, i * 50);
    }
  }
}

export const sound = new SoundFX();
