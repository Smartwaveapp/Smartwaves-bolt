'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dices, Brain } from 'lucide-react';
import { SpinGame } from '@/components/games/SpinGame';
import { WordGame } from '@/components/games/WordGame';

interface MiniGamesProps {
  onWin: (points: number) => void;
}

export function MiniGames({ onWin }: MiniGamesProps) {
  return (
    <Tabs defaultValue="spin" className="w-full">
      <TabsList className="mb-6 bg-purple-500/10 p-1">
        <TabsTrigger value="spin" className="data-[state=active]:bg-purple-500">
          <Dices className="w-4 h-4 mr-2" />
          Spin to Win
        </TabsTrigger>
        <TabsTrigger value="word" className="data-[state=active]:bg-purple-500">
          <Brain className="w-4 h-4 mr-2" />
          Word Challenge
        </TabsTrigger>
      </TabsList>

      <TabsContent value="spin">
        <SpinGame onWin={onWin} />
      </TabsContent>

      <TabsContent value="word">
        <WordGame onWin={onWin} />
      </TabsContent>
    </Tabs>
  );
}