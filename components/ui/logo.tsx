'use client';

import React from 'react';
import { PaperPlaneIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
      <motion.div
        className="relative z-10"
        initial={{ rotate: -45, x: -50 }}
        animate={{ rotate: 0, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.5
        }}
      >
        <PaperPlaneIcon className="w-10 h-10 text-white" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </div>
  );
}