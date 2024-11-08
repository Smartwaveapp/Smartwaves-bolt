'use client';

import { MiniGames } from '@/components/MiniGames';
import { toast } from 'sonner';

export default function GamesPage() {
  const handleWin = (points: number) => {
    toast.success(
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold mb-1">Game Won!</span>
        <div className="flex items-center">
          <span>+{points} points</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mini Games</h1>
      <MiniGames onWin={handleWin} />
    </div>
  );
}