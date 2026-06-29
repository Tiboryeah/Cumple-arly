import React from 'react';
import { Music } from 'lucide-react';
import Card from '../Card';

export default function MusicCard({ isPlaying }) {
  return (
    <Card 
      id="card-musica" 
      icon={<Music />} 
      title="3. Escuchar Música" 
      desc="El mejor escape del mundo, donde cada melodía cuenta una historia."
    >
      <div className="visualizer-container">
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
        <div className={`bar ${isPlaying ? 'playing' : ''}`}></div>
      </div>
      <p className="interaction-hint">
        {isPlaying ? "Sincronizado con la reproducción" : "Reproduce música para ver el ecualizador"}
      </p>
    </Card>
  );
}
