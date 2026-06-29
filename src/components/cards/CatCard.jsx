import React, { useState, useRef } from 'react';
import { Cat, Footprints } from 'lucide-react';
import Card from '../Card';
import { playPopSynth, playMeowSynth } from '../../utils/audio';

export default function CatCard() {
  const [catPos, setCatPos] = useState({ x: '50%', y: '50%' });
  const [isInside, setIsInside] = useState(false);
  const [paws, setPaws] = useState([]);
  const boxRef = useRef(null);

  const handleMouseMove = (e) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsInside(true);
    setCatPos({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    setCatPos({ x: '50%', y: '50%' });
  };

  const handleBoxClick = (e) => {
    playPopSynth();
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now() + Math.random();
    setPaws(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setPaws(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const triggerMeow = () => {
    playMeowSynth();
    const cat = document.getElementById('cat-avatar');
    if (cat) {
      cat.style.transform = 'translate(-50%, -50%) scale(1.6) rotate(15deg)';
      setTimeout(() => {
        cat.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 350);
    }
  };

  return (
    <Card 
      id="card-gatos" 
      icon={<Cat />} 
      title="2. Los Gatos" 
      desc="Criaturas místicas y adorables que dominan el internet y nuestras vidas."
    >
      <div className="plush-display" style={{ height: '110px', marginBottom: '15px' }}>
        <img 
          id="cat-img" 
          src="/gatitos.png" 
          alt="Gatitos de Arly" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400';
          }}
        />
      </div>

      <div 
        className="cat-playground" 
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleBoxClick}
        style={{ height: '80px' }}
      >
        <div className="cat-sprite" style={{ fontSize: '0.75rem' }}>
          {isInside ? 'Jugando con el gatito' : 'Mueve el cursor aquí para jugar'}
        </div>
        <div 
          className="virtual-cat" 
          id="cat-avatar"
          style={{ 
            left: catPos.x, 
            top: catPos.y,
            transition: isInside ? 'none' : 'left 0.3s ease, top 0.3s ease'
          }}
        >
          <Cat size={22} color="var(--pink-light)" fill="var(--pink-light)" />
        </div>
        {paws.map(p => (
          <span 
            key={p.id} 
            className="floating-paw" 
            style={{ left: `${p.x - 8}px`, top: `${p.y - 8}px` }}
          >
            <Footprints size={16} color="var(--purple-neon)" />
          </span>
        ))}
      </div>
      <button className="action-btn" onClick={triggerMeow} style={{ marginTop: '10px' }}>
        Pedir un maullido
      </button>
    </Card>
  );
}
