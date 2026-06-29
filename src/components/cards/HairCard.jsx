import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Card from '../Card';
import { playChimeSynth } from '../../utils/audio';

export default function HairCard() {
  const [isShining, setIsShining] = useState(false);

  const triggerShine = () => {
    playChimeSynth();
    setIsShining(true);
    
    setTimeout(() => {
      setIsShining(false);
    }, 1200);
  };

  return (
    <Card 
      id="card-cabello" 
      icon={<Sparkles />} 
      title="9. Cabello Planchado" 
      desc="Sentirse segura, fabulosa y lista para conquistar el mundo con un look increíble."
    >
      <div className="card-interaction hair-shine-container">
        <div className="hair-silhouette">
          <div className={`hair-shine ${isShining ? 'shine-sweep' : ''}`} />
        </div>
        <button className="action-btn" onClick={triggerShine}>
          Añadir Brillo Glam
        </button>
      </div>
    </Card>
  );
}
