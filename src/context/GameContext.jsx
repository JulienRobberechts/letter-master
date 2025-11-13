import { createContext, useContext, useState, useCallback } from 'react';
import useLetterGenerator from '../hooks/useLetterGenerator';
import { useSettings } from './SettingsContext';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const { letterMode } = useSettings();
  const [typedLetter, setTypedLetter] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const { currentLetter: targetLetter, nextLetter } = useLetterGenerator(letterMode);

  const handleTypedLetter = useCallback((letter) => {
    setTypedLetter(letter);
    const correct = letter === targetLetter;
    setIsCorrect(correct);

    if (correct) {
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      setStreak(0);
    }
  }, [targetLetter]);

  const advanceToNextLetter = useCallback(() => {
    if (isCorrect === true) {
      nextLetter();
      setTypedLetter(null);
      setIsCorrect(null);
    }
  }, [isCorrect, nextLetter]);

  const value = {
    targetLetter,
    typedLetter,
    isCorrect,
    streak,
    totalCorrect,
    handleTypedLetter,
    advanceToNextLetter,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
