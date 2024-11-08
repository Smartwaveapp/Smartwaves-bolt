'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Confetti() {
  const [particles, setParticles] = useState(() => generateConfetti(50));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: particle.scale,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: particle.rotation + 360,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: 'easeOut',
          }}
          className="absolute w-4 h-4"
          style={{ backgroundColor: particle.color }}
        />
      ))}
    </div>
  );
}

const generateConfetti = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -20,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['#FFD700', '#FF69B4', '#4B0082', '#9400D3'][Math.floor(Math.random() * 4)],
  }));
};