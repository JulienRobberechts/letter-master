import { createContext, useContext, useState, useCallback } from 'react';
import useLetterGenerator from '../hooks/useLetterGenerator';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [mode, setMode] = useState('sequential');
  const [typedLetter, setTypedLetter] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const { currentLetter: targetLetter, nextLetter } = useLetterGenerator(mode);

  const handleTypedLetter = useCallback((letter) => {
    setTypedLetter(letter);
    setIsCorrect(letter === targetLetter);
  }, [targetLetter]);

  const advanceToNextLetter = useCallback(() => {
    if (isCorrect === true) {
      nextLetter();
      setTypedLetter(null);
      setIsCorrect(null);
    }
  }, [isCorrect, nextLetter]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'sequential' ? 'random' : 'sequential'));
  }, []);

  const value = {
    targetLetter,
    typedLetter,
    isCorrect,
    mode,
    handleTypedLetter,
    advanceToNextLetter,
    toggleMode,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
