'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User,
  Settings,
  LogOut,
  Trophy,
  Star,
  Flame
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <Card className="p-6 glass-card">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-purple-500">
            <div className="bg-purple-500 w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">User123</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="bg-purple-500/20">
                Level 5
              </Badge>
              <div className="flex items-center text-orange-400">
                <Flame className="w-4 h-4 mr-1" />
                3 Day Streak
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Level Progress</span>
              <span>350/1000 XP</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-500/10 rounded-lg text-center">
              <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">2,750</div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg text-center">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-300">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}