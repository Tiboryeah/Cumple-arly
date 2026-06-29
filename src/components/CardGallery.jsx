import React from 'react';
import PlushCard from './cards/PlushCard';
import CatCard from './cards/CatCard';
import MusicCard from './cards/MusicCard';
import DrawingCard from './cards/DrawingCard';
import SunsetCard from './cards/SunsetCard';
import FlowerCard from './cards/FlowerCard';
import LetterCard from './cards/LetterCard';
import BtsCard from './cards/BtsCard';
import HairCard from './cards/HairCard';
import CandyCard from './cards/CandyCard';

export default function CardGallery({ isPlaying, onTriggerCandyRain }) {
  return (
    <section className="gallery-section">
      <h2 className="section-title text-center">Tus 10 Cosas Favoritas 🌟</h2>
      <p className="section-subtitle text-center">Haz clic o pasa el mouse por cada tarjeta para interactuar con ellas</p>
      
      <div className="cards-grid">
        <PlushCard />
        <CatCard />
        <MusicCard isPlaying={isPlaying} />
        <DrawingCard />
        <SunsetCard />
        <FlowerCard />
        <LetterCard />
        <BtsCard />
        <HairCard />
        <CandyCard onTriggerCandyRain={onTriggerCandyRain} />
      </div>
    </section>
  );
}
