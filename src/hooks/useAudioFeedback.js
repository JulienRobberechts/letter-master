import { useRef, useCallback } from 'react';

/**
 * Custom hook for audio feedback using Web Audio API
 * Generates public domain sounds programmatically
 * @param {boolean} enabled - Whether sounds are enabled
 */
const useAudioFeedback = (enabled) => {
  const audioContextRef = useRef(null);

  // Initialize AudioContext lazily
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playCorrect = useCallback(() => {
    if (!enabled) return;

    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Create oscillators for pleasant chime (two harmonious tones)
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set frequencies (C5 and E5 - major third interval)
      osc1.frequency.value = 523.25; // C5
      osc2.frequency.value = 659.25; // E5

      // Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      // Start and stop
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [enabled, getAudioContext]);

  const playIncorrect = useCallback(() => {
    if (!enabled) return;

    try {
      const audioContext = getAudioContext();
      const now = audioContext.currentTime;

      // Create oscillator for gentle buzz
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set low frequency for buzz
      osc.frequency.value = 200;
      osc.type = 'sawtooth';

      // Envelope
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      // Start and stop
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [enabled, getAudioContext]);

  return { playCorrect, playIncorrect };
};

export default useAudioFeedback;
