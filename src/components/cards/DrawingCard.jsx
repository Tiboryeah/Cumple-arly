import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2 } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function DrawingCard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff758f');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
  }, [color]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    playClickSynth();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (newColor) => {
    playClickSynth();
    setColor(newColor);
  };

  return (
    <Card 
      id="card-dibujar" 
      icon={<Palette />} 
      title="4. Dibujar" 
      desc="Darle vida a la imaginación a través de trazos, formas y colores."
    >
      <div className="card-interaction drawing-canvas-area">
        <canvas 
          id="drawing-canvas" 
          width="260" 
          height="150"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="canvas-controls">
          <button 
            className={`color-dot ${color === '#ff758f' ? 'active' : ''}`}
            onClick={() => handleColorChange('#ff758f')}
            style={{ backgroundColor: '#ff758f' }}
            title="Rosa"
          />
          <button 
            className={`color-dot ${color === '#7209b7' ? 'active' : ''}`}
            onClick={() => handleColorChange('#7209b7')}
            style={{ backgroundColor: '#7209b7' }}
            title="Morado"
          />
          <button 
            className={`color-dot ${color === '#ffffff' ? 'active' : ''}`}
            onClick={() => handleColorChange('#ffffff')}
            style={{ backgroundColor: '#ffffff' }}
            title="Blanco"
          />
          <button 
            className="canvas-btn" 
            onClick={clearCanvas}
            title="Limpiar dibujo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}
