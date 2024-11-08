'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Users, Target, Crown, Award, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

const achievements = [
  {
    id: 1,
    title: 'Task Master',
    description: 'Complete 100 daily tasks',
    progress: 65,
    icon: Trophy,
    color: 'text-yellow-400',
    points: 1000,
    rarity: 'Rare',
  },
  {
    id: 2,
    title: 'Social Butterfly',
    description: 'Invite 10 friends to join',
    progress: 30,
    icon: Users,
    color: 'text-blue-400',
    points: 500,
    rarity: 'Common',
  },
  {
    id: 3,
    title: 'Streak Champion',
    description: 'Maintain a 30-day login streak',
    progress: 80,
    icon: Zap,
    color: 'text-purple-400',
    points: 2000,
    rarity: 'Epic',
  },
  {
    id: 4,
    title: 'Point Collector',
    description: 'Earn 10,000 points total',
    progress: 45,
    icon: Star,
    color: 'text-pink-400',
    points: 1500,
    rarity: 'Rare',
  },
  {
    id: 5,
    title: 'Community Leader',
    description: 'Reach top 10 on the leaderboard',
    progress: 20,
    icon: Crown,
    color: 'text-yellow-400',
    points: 3000,
    rarity: 'Legendary',
  },
  {
    id: 6,
    title: 'Game Master',
    description: 'Win 50 mini-games',
    progress: 40,
    icon: Award,
    color: 'text-green-400',
    points: 1000,
    rarity: 'Rare',
  },
];

const rarityColors = {
  Common: 'bg-gray-500/20 text-gray-300',
  Rare: 'bg-blue-500/20 text-blue-300',
  Epic: 'bg-purple-500/20 text-purple-300',
  Legendary: 'bg-yellow-500/20 text-yellow-300',
};

export function Achievements() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAchievementClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    const achievement = achievements.find(a => a.id === id);
    if (achievement && achievement.progress === 100) {
      toast.success(`Achievement unlocked: ${achievement.title}!`);
    }
  };

  return (
    <div className="grid gap-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleAchievementClick(achievement.id)}
          className="cursor-pointer"
        >
          <Card className={`p-6 glass-card transition-all duration-300 ${
            expandedId === achievement.id ? 'ring-2 ring-purple-500' : ''
          }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-lg bg-opacity-20 ${achievement.color.replace('text', 'bg')}`}>
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <Badge variant="secondary" className={rarityColors[achievement.rarity]}>
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                {achievement.points} pts
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
              <Progress 
                value={achievement.progress} 
                className="h-2 bg-purple-500/20" 
              />
            </div>

            {expandedId === achievement.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-purple-500/20"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Medal className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Unlocks special profile badge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">Bonus points multiplier x1.5</span>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}