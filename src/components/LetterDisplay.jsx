import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Letter = styled(motion.div)`
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
      <Letter
        key={letter}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {letter}
      </Letter>
    </Container>
  );
};

export default LetterDisplay;
