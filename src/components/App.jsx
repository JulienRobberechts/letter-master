import { useState } from 'react';
import styled from 'styled-components';
import LetterDisplay from './LetterDisplay';
import GlobalStyles from '../styles/GlobalStyles';
import { getRandomLetter } from '../utils/constants';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;

function App() {
  const [targetLetter] = useState(() => getRandomLetter());

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <LetterDisplay letter={targetLetter} />
      </AppContainer>
    </>
  );
}

export default App;
