'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, CheckCircle2 } from 'lucide-react';

interface TasksProps {
  onComplete: (taskId: number, taskPoints: number, taskXp: number) => void;
  completedTasks: number[];
}

const tasks = [
  {
    id: 1,
    platform: 'Twitter',
    task: 'Follow @smartwave',
    points: 100,
    icon: Twitter,
    color: 'text-blue-400',
    xp: 50,
  },
  {
    id: 2,
    platform: 'Instagram',
    task: 'Like our latest post',
    points: 150,
    icon: Instagram,
    color: 'text-pink-500',
    xp: 75,
  },
  {
    id: 3,
    platform: 'YouTube',
    task: 'Subscribe to our channel',
    points: 200,
    icon: Youtube,
    color: 'text-red-500',
    xp: 100,
  },
];

export function Tasks({ onComplete, completedTasks }: TasksProps) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 glass-card card-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <task.icon className={`w-8 h-8 ${task.color}`} />
                <div>
                  <h3 className="font-semibold">{task.task}</h3>
                  <p className="text-sm text-gray-400">{task.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-purple-400">{task.points} points</p>
                  <p className="text-sm text-yellow-400">+{task.xp} XP</p>
                </div>
                <Button
                  onClick={() => onComplete(task.id, task.points, task.xp)}
                  disabled={completedTasks.includes(task.id)}
                  className={completedTasks.includes(task.id) 
                    ? "bg-green-500/20 text-green-300"
                    : "bg-purple-600 hover:bg-purple-700"}
                >
                  {completedTasks.includes(task.id) ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    'Complete'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}