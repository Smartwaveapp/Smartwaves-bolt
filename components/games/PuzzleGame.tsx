'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Timer, Trophy, Star, Lock, Brain, 
  Sparkles, Crown, Medal 
} from 'lucide-react';
import { toast } from 'sonner';

interface PuzzleGameProps {
  onWin: (points: number) => void;
}

interface Level {
  id: number;
  size: number;
  timeLimit: number;
  points: number;
  unlocked: boolean;
  requiredLevel?: number;
}

interface PuzzlePiece {
  id: number;
  currentPos: number;
  correctPos: number;
  image: string;
}

const LEVELS: Level[] = [
  { id: 1, size: 3, timeLimit: 60, points: 500, unlocked: true },
  { id: 2, size: 4, timeLimit: 120, points: 1000, unlocked: false, requiredLevel: 2 },
  { id: 3, size: 5, timeLimit: 180, points: 2000, unlocked: false, requiredLevel: 3 },
];

const IMAGES = [
  '/puzzle/crypto-1.jpg',
  '/puzzle/crypto-2.jpg',
  '/puzzle/crypto-3.jpg',
];

export function PuzzleGame({ onWin }: PuzzleGameProps) {
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentLevel.timeLimit);
  const [moves, setMoves] = useState(0);
  const [currentImage, setCurrentImage] = useState(IMAGES[0]);

  const initializeGame = (level: Level) => {
    const size = level.size;
    const totalPieces = size * size;
    const newPieces: PuzzlePiece[] = [];
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    setCurrentImage(randomImage);

    // Create puzzle pieces
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        currentPos: i,
        correctPos: i,
        image: randomImage,
      });
    }

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i].currentPos, newPieces[j].currentPos] = 
      [newPieces[j].currentPos, newPieces[i].currentPos];
    }

    setPieces(newPieces);
    setTimeLeft(level.timeLimit);
    setIsGameActive(true);
    setMoves(0);
  };

  const handlePieceClick = (index: number) => {
    if (!isGameActive) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      const temp = newPieces[index].currentPos;
      newPieces[index].currentPos = newPieces[selectedPiece].currentPos;
      newPieces[selectedPiece].currentPos = temp;
      setPieces(newPieces);
      setSelectedPiece(null);
      setMoves(moves + 1);

      // Check if puzzle is solved
      const isSolved = newPieces.every(piece => piece.currentPos === piece.correctPos);
      if (isSolved) {
        endGame(true);
      }
    }
  };

  const endGame = (won: boolean) => {
    setIsGameActive(false);
    if (won) {
      const timeBonus = Math.floor((timeLeft / currentLevel.timeLimit) * currentLevel.points);
      const movesBonus = Math.floor(
        (currentLevel.points * 0.5) * 
        (1 - (moves / (currentLevel.size * currentLevel.size * 2)))
      );
      const totalPoints = currentLevel.points + timeBonus + movesBonus;

      onWin(totalPoints);
      toast.success(
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold mb-1">Puzzle Completed!</span>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>+{totalPoints} points</span>
            {timeBonus > 0 && (
              <Badge variant="secondary" className="bg-green-500/20">
                Time Bonus: +{timeBonus}
              </Badge>
            )}
            {movesBonus > 0 && (
              <Badge variant="secondary" className="bg-blue-500/20">
                Efficiency Bonus: +{movesBonus}
              </Badge>
            )}
          </div>
        </div>
      );

      if (currentLevel.id < LEVELS.length) {
        LEVELS[currentLevel.id].unlocked = true;
      }
    } else {
      toast.error('Time\'s up! Try again!');
    }
  };

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      endGame(false);
    }
  }, [timeLeft, isGameActive]);

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="text-purple-500" />
          <h3 className="font-semibold">Puzzle Challenge</h3>
        </div>
        {isGameActive && (
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-500/20">
              <Timer className="w-4 h-4 mr-1" />
              {timeLeft}s
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20">
              Moves: {moves}
            </Badge>
          </div>
        )}
      </div>

      {!isGameActive ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LEVELS.map((level) => (
            <motion.div
              key={level.id}
              whileHover={level.unlocked ? { scale: 1.05 } : {}}
              whileTap={level.unlocked ? { scale: 0.95 } : {}}
            >
              <Card
                className={`p-4 text-center ${
                  level.unlocked
                    ? 'cursor-pointer hover:bg-purple-500/10'
                    : 'opacity-50'
                }`}
                onClick={() => level.unlocked && initializeGame(level)}
              >
                <motion.div
                  className="flex items-center justify-center mb-2"
                  animate={level.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {level.unlocked ? (
                    level.id === 1 ? (
                      <Trophy className="w-8 h-8 text-yellow-400" />
                    ) : level.id === 2 ? (
                      <Crown className="w-8 h-8 text-purple-400" />
                    ) : (
                      <Medal className="w-8 h-8 text-pink-400" />
                    )
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                </motion.div>
                <h4 className="font-semibold mb-1">{level.size}x{level.size} Puzzle</h4>
                <p className="text-sm text-gray-400 mb-2">
                  {level.timeLimit}s to complete
                </p>
                <Badge variant="secondary" className="bg-purple-500/20">
                  {level.points} points
                </Badge>
                {!level.unlocked && level.requiredLevel && (
                  <p className="text-xs text-gray-500 mt-2">
                    Unlocks at level {level.requiredLevel}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div 
          className="grid gap-1"
          style={{ 
            gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`,
            aspectRatio: '1/1',
          }}
        >
          {pieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              className={`relative cursor-pointer ${
                selectedPiece === index ? 'ring-2 ring-purple-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePieceClick(index)}
            >
              <div 
                className="w-full h-full bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${piece.image})`,
                  backgroundPosition: `${
                    (piece.correctPos % currentLevel.size) * (100 / (currentLevel.size - 1))
                  }% ${
                    Math.floor(piece.correctPos / currentLevel.size) * (100 / (currentLevel.size - 1))
                  }%`,
                  backgroundSize: `${currentLevel.size * 100}%`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}