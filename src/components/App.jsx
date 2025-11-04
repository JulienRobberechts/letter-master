import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LetterDisplay from './LetterDisplay';
import FeedbackDisplay from './FeedbackDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import AnimationWrapper from './AnimationWrapper';
import GlobalStyles from '../styles/GlobalStyles';
import { GameProvider, useGame } from '../context/GameContext';
import useKeyboardInput from '../hooks/useKeyboardInput';
import useAudioFeedback from '../hooks/useAudioFeedback';

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

const SoundToggle = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.75rem;
  font-size: 1.5rem;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bdbdbd;
  }

  &:active {
    transform: scale(0.95);
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
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { playCorrect, playIncorrect } = useAudioFeedback(soundEnabled);

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

  // Play audio feedback when isCorrect changes
  useEffect(() => {
    if (isCorrect === true) {
      playCorrect();
    } else if (isCorrect === false) {
      playIncorrect();
    }
  }, [isCorrect, playCorrect, playIncorrect]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <AppContainer>
      <SoundToggle onClick={toggleSound} aria-label="Toggle sound">
        {soundEnabled ? '🔊' : '🔇'}
      </SoundToggle>
      <ModeToggle onClick={toggleMode}>
        Mode: {mode === 'sequential' ? 'Sequential' : 'Random'}
      </ModeToggle>
      <MainContent>
        <AnimationWrapper isCorrect={isCorrect}>
          <LetterDisplay letter={targetLetter} />
        </AnimationWrapper>
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
