import styled from 'styled-components';
import Key from './Key';
import { KEYBOARD_LAYOUT } from '../utils/constants';

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.4rem;
  }
`;

const KeyboardRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const VirtualKeyboard = ({ pressedKey, targetLetter }) => {
  return (
    <KeyboardContainer>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <KeyboardRow key={rowIndex}>
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              isPressed={pressedKey === letter}
              isTarget={targetLetter === letter}
            />
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};

export default VirtualKeyboard;
