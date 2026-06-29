import React from 'react';
import { Candy, Cake, Cookie, Dessert } from 'lucide-react';
import Card from '../Card';

export default function CandyCard({ onTriggerCandyRain }) {
  return (
    <Card 
      id="card-dulces" 
      icon={<Candy />} 
      title="10. Los Dulces" 
      desc="Chocolates, gomitas y paletas. ¡La vida es mejor con un toque dulce!"
    >
      <div className="candy-display" style={{ color: 'var(--pink-light)', display: 'flex', gap: '20px', justifyContent: 'center', margin: '15px 0' }}>
        <Cake size={28} />
        <Cookie size={28} />
        <Dessert size={28} />
      </div>
      <button className="action-btn" onClick={onTriggerCandyRain}>
        ¡Lluvia de Dulces!
      </button>
    </Card>
  );
}
