/**
 * Web Audio API synthesizer for emergency SOS beacon sounds
 * Provides realistic intermittent warning beeps without external audio file dependencies.
 */

class SirenService {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public startSiren() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.initContext();

    const playBeep = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        // Hi-lo frequency pulse for emergency siren
        const now = this.audioCtx.currentTime;
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(587, now + 0.35);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch {
        // Audio policy or silent fallback
      }
    };

    playBeep();
    this.timerId = setInterval(playBeep, 900);
  }

  public stopSiren() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const sirenService = new SirenService();
