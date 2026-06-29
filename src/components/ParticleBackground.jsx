import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    const colours = ['#ff758f', '#ff2a7a', '#9d4edd', '#7b2cbf', '#fbb1bd'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 6 + 2;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
        this.type = Math.random() > 0.5 ? 'bts' : 'heart';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // reset to bottom if out of view
        if (this.y < -20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.bezierCurveTo(
            this.x - this.size, this.y - this.size, 
            this.x - this.size * 1.8, this.y + this.size * 0.5, 
            this.x, this.y + this.size * 2
          );
          ctx.bezierCurveTo(
            this.x + this.size * 1.8, this.y + this.size * 0.5, 
            this.x + this.size, this.y - this.size, 
            this.x, this.y
          );
          ctx.fill();
        } else {
          const hw = this.size * 0.9;
          const hh = this.size * 1.1;
          const gap = hw * 0.22;
          const outerH = hh;
          const innerH = hh * 0.75;

          // Draw Left Door
          ctx.beginPath();
          ctx.moveTo(this.x - hw, this.y - outerH);
          ctx.lineTo(this.x - gap, this.y - innerH);
          ctx.lineTo(this.x - gap, this.y + innerH);
          ctx.lineTo(this.x - hw, this.y + outerH);
          ctx.closePath();
          ctx.fill();

          // Draw Right Door
          ctx.beginPath();
          ctx.moveTo(this.x + gap, this.y - innerH);
          ctx.lineTo(this.x + hw, this.y - outerH);
          ctx.lineTo(this.x + hw, this.y + outerH);
          ctx.lineTo(this.x + gap, this.y + innerH);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}
