import React, { useState } from 'react';
import { Sunset } from 'lucide-react';
import Card from '../Card';

export default function SunsetCard() {
  const [value, setValue] = useState(0);

  const sunBottom = 10 - (value * 0.55);
  const starsOpacity = value / 100;
  const sunOpacity = Math.max(0, 1 - (value / 85));
  
  const p1 = 60 - (value * 0.6);
  const backgroundGradient = `linear-gradient(180deg, 
    rgba(255,158,0, ${1 - value/100}) 0%, 
    rgba(255,0,127, ${1 - (value*0.7)/100}) ${p1}%, 
    rgba(60,9,108, 1) 100%)`;

  return (
    <Card 
      id="card-atardeceres" 
      icon={<Sunset />} 
      title="5. Los Atardeceres" 
      desc="El cielo pintado de tonos rosa y morado. Desliza para ver la magia."
    >
      <div className="card-interaction sunset-slider-container">
        <div className="sunset-bg" style={{ background: backgroundGradient }}>
          <div 
            className="sun" 
            style={{ 
              bottom: `${sunBottom}px`, 
              opacity: sunOpacity
            }}
          />
          <div className="stars-sky" style={{ opacity: starsOpacity }} />
        </div>
        <input 
          type="range" 
          id="sunset-range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => setValue(parseInt(e.target.value))}
          title="Desliza para cambiar de atardecer a noche"
        />
        <span className="range-label">De la Tarde a la Noche</span>
      </div>
    </Card>
  );
}
