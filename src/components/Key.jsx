import styled from 'styled-components';

const KeyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$isPressed ? props.theme.keyPressedText : props.theme.keyText};
  background-color: ${props => props.$isPressed ? props.theme.keyPressed : props.theme.keyBg};
  border-radius: 8px;
  border: 2px solid ${props => props.theme.keyBorder};
  box-shadow: ${props =>
    props.$isTarget ? `0 0 10px ${props.theme.keyTarget}` : '0 2px 4px rgba(0, 0, 0, 0.1)'
  };
  user-select: none;
  cursor: default;
  transition: all 0.15s ease;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

const Key = ({ letter, isPressed, isTarget }) => {
  return (
    <KeyButton
      $isPressed={isPressed}
      $isTarget={isTarget}
      role="button"
      aria-label={`Key ${letter}`}
    >
      {letter}
    </KeyButton>
  );
};

export default Key;
