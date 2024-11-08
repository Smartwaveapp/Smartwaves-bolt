'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
}

export function FeatureCard({ title, description, icon: Icon, color, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.5 }}
    >
      <Card className="p-6 glass-card card-hover">
        <div className="mb-4">
          <Icon className={`w-12 h-12 text-${color}-500`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 text-${color}-300`}>{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Card>
    </motion.div>
  );
}