import React, { useState, useRef } from 'react';
import { Flower } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

// Clean vector SVG Flower component to avoid AI stock/emoji look
const SVGFlower = ({ color }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={color}
    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
  >
    {/* 5 Petals */}
    <circle cx="12" cy="7" r="3.5" />
    <circle cx="7" cy="12" r="3.5" />
    <circle cx="17" cy="12" r="3.5" />
    <circle cx="9" cy="17" r="3.5" />
    <circle cx="15" cy="17" r="3.5" />
    {/* Center core */}
    <circle cx="12" cy="12" r="3" fill="#ffea00" />
  </svg>
);

export default function FlowerCard() {
  const [flowers, setFlowers] = useState([]);
  const gardenRef = useRef(null);
  
  const flowerColors = ['#ff758f', '#ff2a7a', '#9d4edd', '#7b2cbf', '#ffffff', '#fbb1bd'];

  const handleGardenClick = (e) => {
    // Prevent overlaying clicks on existing flowers
    if (e.target.closest('.grown-flower')) return;

    playPopSynth();
    const garden = gardenRef.current;
    if (!garden) return;

    const rect = garden.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const rotate = Math.random() * 60 - 30; // random tilt

    const newFlower = {
      id: Date.now() + Math.random(),
      x: x - 12, // center flower on click
      y: y - 12,
      color,
      rotate
    };

    setFlowers(prev => {
      const updated = [...prev, newFlower];
      if (updated.length > 20) {
        updated.shift();
      }
      return updated;
    });
  };

  return (
    <Card 
      id="card-flores" 
      icon={<Flower />} 
      title="6. Las Flores" 
      desc="Colores y fragancias que iluminan el día de cualquiera."
    >
      <div 
        className="garden-area" 
        ref={gardenRef}
        onClick={handleGardenClick}
      >
        <div className="garden-tip">¡Haz clic aquí para plantar flores!</div>
        {flowers.map(f => (
          <div 
            key={f.id} 
            className="grown-flower" 
            style={{ 
              left: `${f.x}px`, 
              top: `${f.y}px`,
              transform: `rotate(${f.rotate}deg)`,
              '--flower-rotate': `${f.rotate}deg`
            }}
          >
            <SVGFlower color={f.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}
