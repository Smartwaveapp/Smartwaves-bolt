'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gift, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import GameSounds from '@/lib/sounds';

interface SpinGameProps {
  onWin: (points: number) => void;
}

const REWARDS = [
  { type: 'small', points: 100, multiplier: 1 },
  { type: 'medium', points: 250, multiplier: 1.5 },
  { type: 'large', points: 500, multiplier: 2 },
  { type: 'jackpot', points: 1000, multiplier: 3 },
];

const QUESTIONS = [
  {
    question: "What is Web3's main goal?",
    options: ["Decentralization", "Speed", "Security", "Profit"],
    correctAnswer: 0,
  },
  {
    question: "Which cryptocurrency is known as digital gold?",
    options: ["Bitcoin", "Ethereum", "Dogecoin", "Litecoin"],
    correctAnswer: 0,
  },
  {
    question: "What powers NFTs?",
    options: ["AI", "Blockchain", "Cloud", "5G"],
    correctAnswer: 1,
  },
  {
    question: "Which platform introduced Threads?",
    options: ["Meta", "Twitter", "TikTok", "Snapchat"],
    correctAnswer: 0,
  },
  {
    question: "What is the main feature of smart contracts?",
    options: ["Automation", "Storage", "Mining", "Gaming"],
    correctAnswer: 0,
  },
  {
    question: "Which crypto supports smart contracts?",
    options: ["Ethereum", "Bitcoin", "Dogecoin", "Litecoin"],
    correctAnswer: 0,
  },
  {
    question: "What's a key Web3 principle?",
    options: ["Ownership", "Speed", "Cost", "Size"],
    correctAnswer: 0,
  },
  {
    question: "What's the purpose of DeFi?",
    options: ["Financial Freedom", "Gaming", "Social", "Storage"],
    correctAnswer: 0,
  },
];

export function SpinGame({ onWin }: SpinGameProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [spinProgress, setSpinProgress] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [rewardType, setRewardType] = useState('small');
  const [rewardPoints, setRewardPoints] = useState(0);

  const getRandomReward = () => {
    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    return {
      type: REWARDS[randomIndex].type,
      points: REWARDS[randomIndex].points,
    };
  };

  const getRandomQuestion = () => {
    return Math.floor(Math.random() * QUESTIONS.length);
  };

  const handleSpin = async () => {
    if (!canSpin) {
      toast.error('Come back tomorrow for another spin!');
      return;
    }

    setIsSpinning(true);
    setCanSpin(false);
    GameSounds.play('spin');

    const reward = getRandomReward();
    setRewardType(reward.type);
    setRewardPoints(reward.points);

    // Smooth progress animation
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      setSpinProgress(prev => Math.min(prev + increment, 100));
    }

    setTimeout(() => {
      setIsSpinning(false);
      setCurrentQuestion(getRandomQuestion());
      setShowQuestion(true);
      GameSounds.play('click');
    }, 3000);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === QUESTIONS[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Play appropriate sound
    GameSounds.play(correct ? 'correct' : 'lose');

    setTimeout(() => {
      setShowQuestion(false);
      setShowResult(false);
      setSelectedAnswer(null);

      if (correct) {
        const finalPoints = Math.floor(rewardPoints * REWARDS.find(r => r.type === rewardType)!.multiplier);
        onWin(finalPoints);
        
        // Play win sound for rewards
        GameSounds.play('win');
        
        toast.success(
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold mb-1">Perfect! Points Earned!</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>+{finalPoints} points</span>
            </div>
          </div>
        );
      } else {
        toast.error(
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold mb-1">Incorrect Answer!</span>
            <div className="text-sm">No points awarded. Try again tomorrow!</div>
          </div>
        );
      }

      setSpinProgress(0);
    }, 2000);
  };

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Gift className="text-purple-500" />
          <h3 className="font-semibold">Spin to Win</h3>
        </div>
        <Badge variant="secondary" className="bg-purple-500/20">
          Next spin in: {canSpin ? 'Ready!' : '24h'}
        </Badge>
      </div>

      {!showQuestion ? (
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to bonus spin</span>
              <span>{spinProgress}%</span>
            </div>
            <Progress value={spinProgress} className="h-2" />
          </div>

          <AnimatePresence>
            <motion.div
              className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center mb-6"
              animate={isSpinning ? { rotate: 360 * 5 } : {}}
              transition={isSpinning ? { duration: 3, ease: 'easeOut' } : {}}
            >
              <div className="w-40 h-40 rounded-full bg-[#1a1b1e] flex items-center justify-center">
                <Gift className="w-12 h-12 text-purple-400" />
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={handleSpin}
            disabled={isSpinning || !canSpin}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSpinning ? 'Spinning...' : 'Spin to Win!'}
          </Button>

          {!canSpin && !isSpinning && (
            <p className="text-sm text-gray-400 mt-2">
              Complete tasks to earn bonus spins!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">
              {QUESTIONS[currentQuestion].question}
            </h4>
            <p className="text-sm text-gray-400">
              Answer correctly to win points!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {QUESTIONS[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? 'default' : 'outline'}
                className={`h-auto py-4 ${
                  showResult
                    ? index === QUESTIONS[currentQuestion].correctAnswer
                      ? 'bg-green-500/20 text-green-300'
                      : index === selectedAnswer
                      ? 'bg-red-500/20 text-red-300'
                      : ''
                    : ''
                }`}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
              >
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleAnswerSubmit}
            disabled={selectedAnswer === null || showResult}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </Card>
  );
}