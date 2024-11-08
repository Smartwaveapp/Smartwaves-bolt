'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Brain, Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import GameSounds from '@/lib/sounds';

interface WordGameProps {
  onWin: (points: number) => void;
}

const LEVELS = [
  { id: 1, letters: 'SMARTWAVE', minWordLength: 3, targetWords: 5, timeLimit: 60, points: 500, unlocked: true },
  { id: 2, letters: 'BLOCKCHAIN', minWordLength: 4, targetWords: 8, timeLimit: 90, points: 1000, unlocked: false },
  { id: 3, letters: 'METAVERSE', minWordLength: 5, targetWords: 10, timeLimit: 120, points: 2000, unlocked: false },
];

// Simulated dictionary - replace with a real word list API or larger dictionary
const DICTIONARY = new Set([
  'SMART', 'WAVE', 'SAVE', 'WARM', 'TEAM', 'STEAM', 'WASTE',
  'BLOCK', 'CHAIN', 'LOCK', 'COIN', 'GAIN', 'BRAIN', 'RAIN',
  'META', 'VERSE', 'SERVE', 'SEVEN', 'EVER', 'SEVERE', 'RESET',
]);

export function WordGame({ onWin }: WordGameProps) {
  const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentLevel.timeLimit);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      endGame(false);
    }
  }, [timeLeft, isGameActive]);

  const shuffleLetters = (letters: string) => {
    return letters.split('').sort(() => Math.random() - 0.5);
  };

  const initializeGame = (level: typeof LEVELS[0]) => {
    setCurrentLevel(level);
    setShuffledLetters(shuffleLetters(level.letters));
    setTimeLeft(level.timeLimit);
    setIsGameActive(true);
    setCurrentWord('');
    setSelectedLetters([]);
    setFoundWords(new Set());
    GameSounds.play('levelUp');
  };

  const submitWord = () => {
    if (currentWord.length < currentLevel.minWordLength) {
      GameSounds.play('lose');
      toast.error(`Words must be at least ${currentLevel.minWordLength} letters long!`);
      return;
    }

    if (foundWords.has(currentWord)) {
      GameSounds.play('lose');
      toast.error('Word already found!');
      return;
    }

    if (DICTIONARY.has(currentWord)) {
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(currentWord);
      setFoundWords(newFoundWords);

      // Calculate bonus points based on word length
      const lengthBonus = Math.pow(2, currentWord.length - currentLevel.minWordLength);
      const wordPoints = 50 * lengthBonus;

      GameSounds.play('correct');

      toast.success(
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold mb-1">Word Found!</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>+{wordPoints} bonus points</span>
          </div>
        </div>
      );

      // Check if level complete
      if (newFoundWords.size >= currentLevel.targetWords) {
        endGame(true);
      }
    } else {
      GameSounds.play('lose');
      toast.error('Not a valid word!');
    }

    // Reset current word
    setCurrentWord('');
    setSelectedLetters([]);
  };

  const endGame = (won: boolean) => {
    setIsGameActive(false);
    if (won) {
      const timeBonus = Math.floor((timeLeft / currentLevel.timeLimit) * currentLevel.points);
      const wordsBonus = Math.floor(
        (currentLevel.points * 0.5) * 
        (foundWords.size / currentLevel.targetWords)
      );
      const totalPoints = currentLevel.points + timeBonus + wordsBonus;

      GameSounds.play('levelUp');

      onWin(totalPoints);
      toast.success(
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold mb-1">Level Complete!</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>+{totalPoints} points (including time bonus!)</span>
          </div>
        </div>
      );

      if (currentLevel.id < LEVELS.length) {
        LEVELS[currentLevel.id].unlocked = true;
      }
    } else {
      GameSounds.play('lose');
      toast.error('Time\'s up! Try again!');
    }
  };

  const handleLetterClick = (index: number) => {
    if (!isGameActive) return;

    GameSounds.play('click');

    if (selectedLetters.includes(index)) {
      // Deselect letter
      setSelectedLetters(prev => prev.filter(i => i !== index));
      setCurrentWord(prev => prev.slice(0, -1));
    } else {
      // Select letter
      setSelectedLetters(prev => [...prev, index]);
      setCurrentWord(prev => prev + shuffledLetters[index]);
    }
  };

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="text-purple-500" />
          <h3 className="font-semibold">Word Challenge</h3>
        </div>
        {isGameActive && (
          <Badge variant="secondary" className="bg-purple-500/20">
            <Timer className="w-4 h-4 mr-1" />
            {timeLeft}s
          </Badge>
        )}
      </div>

      {!isGameActive ? (
        <div className="grid grid-cols-3 gap-4">
          {LEVELS.map((level) => (
            <Card
              key={level.id}
              className={`p-4 text-center ${
                level.unlocked
                  ? 'cursor-pointer hover:scale-105 transition-transform'
                  : 'opacity-50'
              }`}
              onClick={() => level.unlocked && initializeGame(level)}
            >
              <div className="flex items-center justify-center mb-2">
                {level.unlocked ? (
                  <Star className="w-8 h-8 text-yellow-400" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h4 className="font-semibold mb-1">Level {level.id}</h4>
              <p className="text-sm text-gray-400 mb-2">
                Find {level.targetWords} words
              </p>
              <Badge variant="secondary" className="bg-purple-500/20">
                {level.points} points
              </Badge>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Found: {foundWords.size}/{currentLevel.targetWords} words
            </div>
            <div className="text-sm text-gray-400">
              Min length: {currentLevel.minWordLength}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {shuffledLetters.map((letter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                  selectedLetters.includes(index)
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-500/20 text-purple-300'
                }`}
                onClick={() => handleLetterClick(index)}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold mb-4 min-h-[2.5rem]">
              {currentWord || 'Form a word'}
            </div>
            <Button
              onClick={submitWord}
              disabled={currentWord.length < currentLevel.minWordLength}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Submit Word
            </Button>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Found Words:</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(foundWords).map((word) => (
                <Badge key={word} variant="secondary" className="bg-green-500/20">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}