// Web Audio API Synthesizers for local interactive sounds without external assets
let audioCtx;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

export function playClickSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.1);
}

export function playPopSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.08);
}

export function playMeowSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'triangle';
  
  // A cat's "meow" starts around 320Hz, sweeps up to 780Hz, then down to 520Hz
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.14);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.4);
  
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.45);
}

export function playChimeSynth() {
  initAudio();
  const now = audioCtx.currentTime;
  const scale = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  
  scale.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const noteTime = now + index * 0.07;
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);
    
    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(noteTime);
    osc.stop(noteTime + 0.25);
  });
}
