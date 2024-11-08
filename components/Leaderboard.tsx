'use client';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

const leaderboardData = [
  { id: 1, name: 'CryptoKing', points: 12500, level: 15 },
  { id: 2, name: 'BlockMaster', points: 11200, level: 14 },
  { id: 3, name: 'TokenQueen', points: 10800, level: 13 },
  { id: 4, name: 'Web3Wizard', points: 9500, level: 12 },
  { id: 5, name: 'ChainChamp', points: 8900, level: 11 },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return <span className="text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {leaderboardData.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
        >
          <div className="flex items-center justify-center w-8">
            {getRankIcon(index + 1)}
          </div>
          <Avatar className="w-10 h-10 border-2 border-purple-500">
            <div className="bg-purple-500 w-full h-full flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-400">Level {user.level}</div>
          </div>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
            {user.points.toLocaleString()} pts
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}