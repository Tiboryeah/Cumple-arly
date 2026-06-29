import React, { useRef } from 'react';

export default function Card({ id, icon, title, desc, children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // tilt max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'none';
  };

  return (
    <div 
      className="card glass" 
      id={id} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glow"></div>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-interaction">
        {children}
      </div>
    </div>
  );
}
