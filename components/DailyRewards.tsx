'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Calendar, Star, Flame, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';

interface DailyRewardsProps {
  streak: number;
  onClaim: () => void;
}

const rewards = [
  { day: 1, points: 100, bonus: false, claimed: false },
  { day: 2, points: 200, bonus: false, claimed: false },
  { day: 3, points: 300, bonus: false, claimed: false },
  { day: 4, points: 400, bonus: false, claimed: false },
  { day: 5, points: 500, bonus: false, claimed: false },
  { day: 6, points: 600, bonus: false, claimed: false },
  { day: 7, points: 1000, bonus: true, claimed: false },
];

export function DailyRewards({ streak, onClaim }: DailyRewardsProps) {
  const [canClaim, setCanClaim] = useState(true);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  const handleClaim = (day: number, points: number, bonus: boolean) => {
    if (!canClaim) {
      toast.error('Come back tomorrow for your next reward!');
      return;
    }

    setShowRewardAnimation(true);
    setCanClaim(false);
    
    const totalPoints = bonus ? points * 2 : points;
    
    setTimeout(() => {
      onClaim();
      setShowRewardAnimation(false);
      toast.success(
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold mb-1">Daily Reward Claimed!</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>+{totalPoints} points</span>
          </div>
        </div>
      );
    }, 1000);
  };

  return (
    <Card className="p-6 glass-card relative overflow-hidden">
      <AnimatePresence>
        {showRewardAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-purple-500/20 backdrop-blur-sm z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear" }}
              className="text-6xl"
            >
              🎁
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="text-purple-500" />
          <h3 className="font-semibold">Daily Rewards</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium">
            {streak} Day Streak
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.day}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${index < streak ? 'opacity-50' : ''}`}
          >
            <Card 
              className={`p-4 text-center cursor-pointer transition-transform hover:scale-105 ${
                reward.bonus ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'glass-card'
              }`}
              onClick={() => handleClaim(reward.day, reward.points, reward.bonus)}
            >
              <div className="text-sm font-semibold mb-2">Day {reward.day}</div>
              <Gift className={`w-6 h-6 mx-auto mb-2 ${
                reward.bonus ? 'text-yellow-400' : 'text-purple-400'
              }`} />
              <div className="text-sm font-bold text-purple-400">
                {reward.points}p
              </div>
              {reward.bonus && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full animate-pulse">
                    BONUS
                  </span>
                </div>
              )}
              {index < streak && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        {canClaim ? (
          "Click a reward to claim it!"
        ) : (
          "Come back tomorrow for your next reward!"
        )}
      </div>
    </Card>
  );
}