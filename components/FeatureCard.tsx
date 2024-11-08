'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

const colorMap = {
  purple: 'text-purple-500',
  green: 'text-green-500',
  pink: 'text-pink-500',
};

export function FeatureCard({ title, description, icon: Icon, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="p-6 glass-card card-hover group">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring' }}
          className="mb-4"
        >
          <Icon className={`w-12 h-12 ${colorMap[color]} transition-transform group-hover:scale-110`} />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 text-purple-300 group-hover:text-purple-200">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}