import { useState, useCallback } from 'react';
import { LETTERS } from '../utils/constants';

const useLetterGenerator = (mode = 'sequential') => {
  const [index, setIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(LETTERS[0]);
  const [lastLetter, setLastLetter] = useState(null);

  const nextLetter = useCallback(() => {
    if (mode === 'sequential') {
      const nextIndex = (index + 1) % LETTERS.length;
      setIndex(nextIndex);
      setCurrentLetter(LETTERS[nextIndex]);
    } else {
      // Random mode - avoid immediate repeat
      let randomLetter;
      do {
        randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      } while (randomLetter === lastLetter && LETTERS.length > 1);

      setLastLetter(randomLetter);
      setCurrentLetter(randomLetter);
    }
  }, [mode, index, lastLetter]);

  return { currentLetter, nextLetter };
};

export default useLetterGenerator;
