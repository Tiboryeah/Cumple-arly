import React, { useState } from 'react';
import { HeartHandshake, Sparkles } from 'lucide-react';
import Card from '../Card';
import { playClickSynth, playChimeSynth } from '../../utils/audio';

export default function BtsCard() {
  const [isGlowing, setIsGlowing] = useState(false);
  const [stars, setStars] = useState([]);

  const handleToggle = () => {
    if (!isGlowing) {
      playChimeSynth();
      const newStars = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: Math.random() * 80 + 10
      }));
      setStars(prev => [...prev, ...newStars]);
      
      setTimeout(() => {
        setStars(prev => prev.filter(s => !newStars.find(ns => ns.id === s.id)));
      }, 1200);
    } else {
      playClickSynth();
    }
    setIsGlowing(!isGlowing);
  };

  return (
    <Card 
      id="card-bts" 
      icon={<HeartHandshake />} 
      title="8. La Música de BTS" 
      desc="BTS y su increíble ARMY. El sonido y mensaje que inspiran a millones."
    >
      <div className="card-interaction bts-interaction">
        <div className={`bts-army-bomb ${isGlowing ? 'glowing' : ''}`}>
          <div className="bts-logo">
            <span className="left-door"></span>
            <span className="right-door"></span>
          </div>
          <div className="light-glow"></div>
          {stars.map(s => (
            <span 
              key={s.id} 
              className="floating-heart" 
              style={{ left: `${s.x}%`, color: 'var(--purple-neon)' }}
            >
              <Sparkles size={16} />
            </span>
          ))}
        </div>
        <button className="action-btn" onClick={handleToggle}>
          {isGlowing ? 'Apagar Army Bomb' : '¡Encender Army Bomb!'}
        </button>
      </div>
    </Card>
  );
}
