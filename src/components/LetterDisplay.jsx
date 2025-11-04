import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Letter = styled.div`
  font-size: 8rem;
  font-weight: bold;
  color: #000000;
  background-color: #ffffff;
  padding: 2rem 3rem;
  border-radius: 1rem;
  border: 4px solid #000000;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  user-select: none;
`;

const LetterDisplay = ({ letter }) => {
  return (
    <Container>
      <Letter>{letter}</Letter>
    </Container>
  );
};

export default LetterDisplay;
