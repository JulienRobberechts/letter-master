import { useState, useCallback } from 'react';
import styled from 'styled-components';
import LetterDisplay from './LetterDisplay';
import FeedbackDisplay from './FeedbackDisplay';
import GlobalStyles from '../styles/GlobalStyles';
import { getRandomLetter } from '../utils/constants';
import useKeyboardInput from '../hooks/useKeyboardInput';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;

function App() {
  const [targetLetter] = useState(() => getRandomLetter());
  const [typedLetter, setTypedLetter] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleKeyPress = useCallback((key) => {
    setTypedLetter(key);
    setIsCorrect(key === targetLetter);
  }, [targetLetter]);

  useKeyboardInput(handleKeyPress);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <LetterDisplay letter={targetLetter} />
        <FeedbackDisplay
          target={targetLetter}
          typed={typedLetter}
          isCorrect={isCorrect}
        />
      </AppContainer>
    </>
  );
}

export default App;
