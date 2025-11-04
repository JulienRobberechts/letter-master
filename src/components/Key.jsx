import styled from 'styled-components';

const KeyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  background-color: ${props => {
    if (props.$isPressed) return '#FFC107';
    return '#E0E0E0';
  }};
  border-radius: 8px;
  border: 2px solid #CCCCCC;
  box-shadow: ${props =>
    props.$isTarget ? '0 0 10px #2196F3' : '0 2px 4px rgba(0, 0, 0, 0.1)'
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
