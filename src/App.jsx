import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Landing from './components/Landing';
import Header from './components/Header';
import CardGallery from './components/CardGallery';
import { playChimeSynth } from './utils/audio';
import { Heart, Star, Sparkles } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);
  
  // Music Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState('Pausado');
  const audioRef = useRef(null);

  // Confetti/Candy Shower States
  const [candies, setCandies] = useState([]);

  // Set default volume to 25% when element mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, [audioRef.current]);

  // Control Handlers
  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // safety check
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch(err => {
        console.error("Audio play failed on start:", err);
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setStatusText('Pausado');
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch(err => {
        console.error("Audio play failed:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const seekRelative = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0, 
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds)
    );
  };

  // Re-engineered confetti shower using Lucide SVG vectors instead of emojis
  const triggerCandyRain = () => {
    playChimeSynth();
    const numCandies = 35;
    const shapes = ['heart', 'star', 'sparkle', 'circle'];
    const colors = ['#ff758f', '#ff2a7a', '#9d4edd', '#7b2cbf', '#fbb1bd', '#ffffff'];
    
    for (let i = 0; i < numCandies; i++) {
      setTimeout(() => {
        const id = Date.now() + Math.random();
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 95}vw`;
        const scale = Math.random() * 0.6 + 0.7;

        setCandies(prev => [...prev, { id, type, color, left, scale }]);

        // Clean up particle after it falls (3s duration)
        setTimeout(() => {
          setCandies(prev => prev.filter(c => c.id !== id));
        }, 3000);
      }, i * 70);
    }
  };

  return (
    <>
      {/* 1. Animated background particles */}
      <ParticleBackground />

      {/* 2. Welcome Landing Screen */}
      {!started && <Landing onStart={handleStart} />}

      {/* 3. Main content (unlocked on start) */}
      {started && (
        <div id="main-content">
          <Header 
            isPlaying={isPlaying}
            isMuted={isMuted}
            statusText={statusText}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            seekRelative={seekRelative}
          />

          <main className="container">
            <section className="intro-card glass">
              <h2 className="section-title">Para la persona más especial...</h2>
              <p>
                Arly, este rincón de internet fue diseñado especialmente para ti por Tibo, 
                inspirado en tus colores favoritos y cada una de las cosas que hacen brillar tu día. 
                ¡Disfruta de tu música favorita de BTS mientras exploras las sorpresas!
              </p>
            </section>

            <CardGallery 
              isPlaying={isPlaying} 
              onTriggerCandyRain={triggerCandyRain}
            />

            <footer className="glass">
              <p className="cursive">Feliz Cumpleaños, Arly. Con mucho cariño, de parte de Tibo.</p>
            </footer>
          </main>
        </div>
      )}

      {/* HTML5 Audio Element for Local MP3 playback */}
      <audio ref={audioRef} src="/fake_love.mp3" loop prefetch="auto" />

      {/* Global falling shapes confetti layer */}
      {candies.map(c => (
        <span 
          key={c.id} 
          className="falling-candy"
          style={{ left: c.left, color: c.color }}
        >
          <span style={{ display: 'inline-block', transform: `scale(${c.scale})` }}>
            {c.type === 'heart' && <Heart size={24} fill={c.color} stroke="none" />}
            {c.type === 'star' && <Star size={24} fill={c.color} stroke="none" />}
            {c.type === 'sparkle' && <Sparkles size={24} />}
            {c.type === 'circle' && (
              <span style={{ 
                display: 'inline-block', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: c.color, 
                boxShadow: `0 0 10px ${c.color}` 
              }} />
            )}
          </span>
        </span>
      ))}
    </>
  );
}
