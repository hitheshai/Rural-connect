import { Language } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, lang: Language, onEnd?: () => void): boolean {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this device');
      return false;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Map language
    if (lang === 'kn') {
      utterance.lang = 'kn-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95; // Slightly slower for clear rural comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeakingState = true;
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.error('Failed to trigger speech:', err);
      return false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  // Voice Recognition (Speech-to-Text)
  public startListening(
    lang: Language,
    onResult: (transcript: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): { stop: () => void } | null {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech recognition is not supported in this browser. Please type your query.');
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (lang === 'kn') recognition.lang = 'kn-IN';
      else if (lang === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        onError(event.error || 'Voice error. Please try again.');
      };

      recognition.onend = () => {
        onEnd();
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch {
            // ignore
          }
        },
      };
    } catch (e: any) {
      onError(e?.message || 'Could not start microphone');
      return null;
    }
  }
}

export const speechService = new SpeechService();
