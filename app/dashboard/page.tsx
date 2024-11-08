'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Trophy, Star, Gift, Crown, Award, Target, 
  Flame, Share2, Users, CheckCircle2 
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti } from '@/components/Confetti';
import { DailyRewards } from '@/components/DailyRewards';
import { Leaderboard } from '@/components/Leaderboard';
import { Achievements } from '@/components/Achievements';
import { MiniGames } from '@/components/MiniGames';
import { Tasks } from '@/components/Tasks';

export default function DashboardPage() {
  const [points, setPoints] = useState(2750);
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(350);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((xp / (level * 1000)) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [xp, level]);

  const completeTask = async (taskId: number, taskPoints: number, taskXp: number) => {
    if (completedTasks.includes(taskId)) {
      toast.error('Task already completed!');
      return;
    }

    try {
      setCompletedTasks([...completedTasks, taskId]);
      setPoints(points + taskPoints);
      setXp(xp + taskXp);
      setShowConfetti(true);
      
      toast.success(
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">+{taskPoints}</span>
            points earned!
          </div>
          <div className="flex items-center text-sm text-yellow-400">
            <Star className="w-4 h-4 mr-1" />
            +{taskXp} XP
          </div>
        </div>
      );

      if (xp + taskXp >= level * 1000) {
        setTimeout(() => {
          setLevel(level + 1);
          toast.success(
            <div className="flex items-center">
              <Crown className="text-yellow-400 mr-2" />
              Level Up! You're now level {level + 1}
            </div>
          );
        }, 1000);
      }

      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Error updating task completion:', error);
      toast.error('Failed to complete task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#13111C,#171717)]">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 border-2 border-purple-500">
              <div className="bg-purple-500 w-full h-full flex items-center justify-center">
                <Crown className="text-white w-6 h-6" />
              </div>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Welcome back, Player!</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  Level {level}
                </Badge>
                <div className="flex items-center">
                  <Flame className="w-4 h-4 text-orange-400 mr-1" />
                  {streak} Day Streak
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Invite Friends
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 glass-card">
              <h3 className="font-semibold mb-4">Level Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>XP Progress</span>
                  <span>{xp}/{level * 1000} XP</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-2 bg-purple-500/20" 
                />
              </div>
            </Card>

            <DailyRewards streak={streak} onClaim={() => {}} />

            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="mb-6 bg-purple-500/10 p-1">
                <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-500">
                  Daily Tasks
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="games" className="data-[state=active]:bg-purple-500">
                  Mini Games
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tasks">
                <Tasks onComplete={completeTask} completedTasks={completedTasks} />
              </TabsContent>

              <TabsContent value="achievements">
                <Achievements />
              </TabsContent>

              <TabsContent value="games">
                <MiniGames onWin={(points) => setPoints(points + points)} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6 glass-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500" />
                  <h3 className="font-semibold">Your Points</h3>
                </div>
                <span className="text-2xl font-bold gradient-text">{points}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to reward</span>
                  <span>{points}/5000</span>
                </div>
                <Progress 
                  value={(points / 5000) * 100} 
                  className="h-2 bg-purple-500/20" 
                />
              </div>
            </Card>

            <Card className="p-6 glass-card">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="text-yellow-500" />
                <h3 className="font-semibold">Leaderboard</h3>
              </div>
              <ScrollArea className="h-[300px] pr-4">
                <Leaderboard />
              </ScrollArea>
            </Card>

            <Card className="p-6 glass-card">
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="text-purple-500" />
                <h3 className="font-semibold">Available Rewards</h3>
              </div>
              <Button
                onClick={() => {
                  if (points >= 5000) {
                    toast.success('Reward redemption initiated! Check your wallet for details.');
                  } else {
                    toast.error('Not enough points to redeem!');
                  }
                }}
                disabled={points < 5000}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Redeem $SMAV Tokens
              </Button>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Available at 5,000 points
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}