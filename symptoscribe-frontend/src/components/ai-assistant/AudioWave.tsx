"use client";

// src/components/ai-assistant/AudioWave.tsx
import React, { useEffect, useRef } from 'react';

interface AudioWaveProps {
  isActive: boolean;
  color?: string;
}

const AudioWave: React.FC<AudioWaveProps> = ({ 
  isActive,
  color = "#3B82F6" // Bleu par défaut
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frequency = 0;
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      
      // Dessiner l'onde
      ctx.moveTo(0, height / 2);
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.02 + frequency) * 20 * 
          Math.sin(frequency * 0.5) * // Variation d'amplitude
          (1 + Math.sin(x * 0.001 + frequency * 0.2)); // Modulation
        
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      frequency += 0.1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, color]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={60}
      className="opacity-50 canvas"
    />
  );
};

export default AudioWave;