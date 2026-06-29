import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function LetterCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = (e) => {
    e.stopPropagation();
    playClickSynth();
    setIsOpen(!isOpen);
  };

  return (
    <Card 
      id="card-cartas" 
      icon={<Mail />} 
      title="7. Las Cartas" 
      desc="Palabras sinceras escritas desde el alma. Abre tu sobre de cumpleaños."
    >
      <div className="card-interaction letter-interaction">
        <div 
          className="envelope-wrapper"
          onClick={toggleEnvelope}
        >
          <div className={`envelope ${isOpen ? 'open' : ''}`}>
            <div className="flap"></div>
            <div className="pocket"></div>
            <div className="letter">
              <div className="letter-content">
                <h4 className="cursive">Querida Arly,</h4>
                <p>
                  En este día tan especial, quiero desearte el más feliz de los cumpleaños. 
                  Que tu vida esté siempre llena de música, dulces, hermosos atardeceres y momentos inolvidables. 
                  Eres una persona maravillosa y mereces todo lo mejor del universo.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Heart size={16} fill="var(--pink-light)" stroke="none" />
                  <p className="cursive text-right" style={{ fontSize: '1.2rem', margin: 0 }}>
                    Con mucho cariño, Tibo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="action-btn" onClick={toggleEnvelope}>
          {isOpen ? 'Cerrar Carta' : 'Abrir Carta'}
        </button>
      </div>
    </Card>
  );
}
