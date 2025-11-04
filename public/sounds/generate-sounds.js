// Public domain sound generator using Web Audio API
// Run this in browser console to generate MP3 files

function generateCorrectSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const duration = 0.3;
  const sampleRate = audioContext.sampleRate;

  // Create buffer
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate pleasant chime (two tones)
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-3 * t);
    data[i] = envelope * (
      Math.sin(2 * Math.PI * 800 * t) * 0.3 +
      Math.sin(2 * Math.PI * 1200 * t) * 0.2
    );
  }

  return buffer;
}

function generateIncorrectSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const duration = 0.2;
  const sampleRate = audioContext.sampleRate;

  // Create buffer
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate gentle buzz (low frequency)
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-5 * t);
    data[i] = envelope * Math.sin(2 * Math.PI * 200 * t) * 0.3;
  }

  return buffer;
}

console.log('To generate sounds, use: generateCorrectSound() and generateIncorrectSound()');
