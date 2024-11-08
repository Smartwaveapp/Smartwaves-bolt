'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, purple 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
    </motion.div>
  );
}