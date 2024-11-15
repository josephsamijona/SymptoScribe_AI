"use client";

// src/components/ai-assistant/VoiceAnimation.tsx
import React, { useEffect, useRef } from 'react';
import styles from './VoiceAnimation.module.css';
interface VoiceAnimationProps {
  isActive: boolean;
  colorStart?: string;
  colorEnd?: string;
}

const VoiceAnimation: React.FC<VoiceAnimationProps> = ({
  isActive,
  colorStart = '#3B82F6',
  colorEnd = '#60A5FA'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const bars = containerRef.current.children;
    let heights = Array.from({ length: bars.length }, () => 20);
    let velocities = Array.from({ length: bars.length }, () => Math.random() * 2 - 1);

    const animate = () => {
      heights = heights.map((height, index) => {
        const newHeight = height + velocities[index];
        if (newHeight > 40 || newHeight < 10) {
          velocities[index] *= -1;
        }
        return newHeight;
      });

      Array.from(bars).forEach((bar, index) => {
        (bar as HTMLElement).style.height = `${heights[index]}px`;
      });

      if (isActive) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isActive]);

  return (
    <div className="flex items-center justify-center h-12 gap-1" ref={containerRef}>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="w-1 bg-gradient-to-t transition-all duration-100 rounded-full"
          style={{
            backgroundImage: `linear-gradient(to top, ${colorStart}, ${colorEnd})`,
            height: '20px'
          }}
        />
      ))}
    </div>
  );
};

// Composant spécial pour l'animation de l'IA qui parle
export const AIVoiceAnimation: React.FC<VoiceAnimationProps> = ({
  isActive,
  colorStart = '#8B5CF6',
  colorEnd = '#A78BFA'
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse" />
      <VoiceAnimation
        isActive={isActive}
        colorStart={colorStart}
        colorEnd={colorEnd}
      />
    </div>
  );
};

export default VoiceAnimation;