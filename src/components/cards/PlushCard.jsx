import React, { useState } from 'react';
import { Smile, Heart } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

export default function PlushCard() {
  const [hearts, setHearts] = useState([]);

  const spawnHeart = () => {
    playPopSynth();
    const id = Date.now() + Math.random();
    const newHeart = { id, x: Math.random() * 80 + 10 };
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 1200);
  };

  return (
    <Card 
      id="card-peluches" 
      icon={<Smile />} 
      title="1. Los Peluches" 
      desc="Cosas tiernas, suaves y abrazables que llenan el corazón de alegría."
    >
      <div className="plush-display">
        <img 
          id="plush-img" 
          src="/peluche.png" 
          alt="Peluche de Arly" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=400';
          }}
        />
        {hearts.map(h => (
          <span 
            key={h.id} 
            className="floating-heart" 
            style={{ left: `${h.x}%` }}
          >
            <Heart size={20} fill="var(--pink-light)" stroke="none" />
          </span>
        ))}
      </div>
      <button className="action-btn" onClick={spawnHeart}>
        ¡Abrazar peluche!
      </button>
    </Card>
  );
}
