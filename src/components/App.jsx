import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LetterDisplay from './LetterDisplay';
import FeedbackDisplay from './FeedbackDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import GlobalStyles from '../styles/GlobalStyles';
import { GameProvider, useGame } from '../context/GameContext';
import useKeyboardInput from '../hooks/useKeyboardInput';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem 1rem;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ModeToggle = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976d2;
  }

  &:active {
    background-color: #1565c0;
  }
`;

function GameContent() {
  const {
    targetLetter,
    typedLetter,
    isCorrect,
    mode,
    handleTypedLetter,
    advanceToNextLetter,
    toggleMode,
  } = useGame();

  const [pressedKey, setPressedKey] = useState(null);

  const handleKeyPress = (key) => {
    handleTypedLetter(key);
    setPressedKey(key);
  };

  useKeyboardInput(handleKeyPress, advanceToNextLetter);

  // Clear pressedKey after 300ms
  useEffect(() => {
    if (pressedKey) {
      const timer = setTimeout(() => {
        setPressedKey(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pressedKey]);

  return (
    <AppContainer>
      <ModeToggle onClick={toggleMode}>
        Mode: {mode === 'sequential' ? 'Sequential' : 'Random'}
      </ModeToggle>
      <MainContent>
        <LetterDisplay letter={targetLetter} />
        <FeedbackDisplay
          target={targetLetter}
          typed={typedLetter}
          isCorrect={isCorrect}
        />
      </MainContent>
      <VirtualKeyboard
        pressedKey={pressedKey}
        targetLetter={targetLetter}
      />
    </AppContainer>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <GameProvider>
        <GameContent />
      </GameProvider>
    </>
  );
}

export default App;
