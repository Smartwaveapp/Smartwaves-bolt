'use client';

import { Tasks } from '@/components/Tasks';
import { DailyRewards } from '@/components/DailyRewards';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TasksPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [streak, setStreak] = useState(3);

  const handleTaskComplete = (taskId: number, taskPoints: number, taskXp: number) => {
    if (completedTasks.includes(taskId)) {
      toast.error('Task already completed!');
      return;
    }

    setCompletedTasks([...completedTasks, taskId]);
    toast.success(
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold mb-1">Task Completed!</span>
        <div className="flex items-center">
          <span>+{taskPoints} points</span>
        </div>
      </div>
    );
  };

  const handleClaimReward = () => {
    toast.success('Daily reward claimed!');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Daily Tasks</h1>
      
      <DailyRewards 
        streak={streak} 
        onClaim={handleClaimReward} 
      />
      
      <Tasks 
        onComplete={handleTaskComplete}
        completedTasks={completedTasks}
      />
    </div>
  );
}