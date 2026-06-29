import React, { useState } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

export default function Landing({ onStart }) {
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <section id="landing" className={isFading ? 'fade-out' : ''}>
      <div className="landing-content glass">
        <div className="sparkles-container">
          <span className="sparkle" style={{ top: '10%', left: '15%', color: 'var(--pink-light)' }}>
            <Sparkles size={24} />
          </span>
          <span className="sparkle" style={{ top: '25%', right: '15%', color: 'var(--purple-neon)' }}>
            <Heart size={20} fill="var(--purple-neon)" />
          </span>
          <span className="sparkle" style={{ bottom: '20%', left: '20%', color: 'var(--pink-pastel)' }}>
            <Star size={18} fill="var(--pink-pastel)" />
          </span>
        </div>
        <h1 className="glow-text">
          ¡Feliz Cumpleaños,<br />
          <span className="highlight-name">ARLY</span>!
        </h1>
        <p className="subtitle">He preparado un espacio especial con las cosas que más te gustan.</p>
        <p className="from-tibo" style={{ color: 'var(--pink-light)', fontWeight: '600', marginBottom: '30px' }}>
          De parte de Tibo
        </p>

        <div className="gift-box-container" onClick={handleStart}>
          <div className="gift-box">
            <div className="gift-lid"></div>
            <div className="gift-ribbon-v"></div>
            <div className="gift-ribbon-h"></div>
            <div className="gift-box-body"></div>
          </div>
          <p className="gift-hint">Haz clic en el regalo para comenzar</p>
        </div>
      </div>
    </section>
  );
}
