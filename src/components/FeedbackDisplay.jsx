import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Message = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.correct};
`;

const Instruction = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.instructionText};
`;

const ComparisonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const ComparisonLetter = styled.div`
  font-size: 3rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: #ffffff;
  background-color: ${props => props.$isExpected ? props.theme.correct : props.theme.incorrect};
  min-width: 80px;
  text-align: center;
  transition: background-color 0.3s;
`;

const ComparisonLabel = styled.div`
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  color: ${props => props.theme.instructionText};
  font-weight: 600;
`;

const ComparisonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedbackDisplay = ({ target, typed, isCorrect }) => {
  if (isCorrect === null) {
    return (
      <Container>
        <Instruction>Tapez la lettre</Instruction>
      </Container>
    );
  }

  if (isCorrect === true) {
    return (
      <Container role="status" aria-live="polite">
        <Message
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          Correct ! ✓
        </Message>
        <Instruction>Tapez Enter pour une nouvelle lettre</Instruction>
      </Container>
    );
  }

  // isCorrect === false
  return (
    <Container role="status" aria-live="polite">
      <ComparisonContainer>
        <ComparisonItem>
          <ComparisonLetter $isExpected={true}>{target}</ComparisonLetter>
          <ComparisonLabel>Attendu</ComparisonLabel>
        </ComparisonItem>
        <ComparisonItem>
          <ComparisonLetter $isExpected={false}>{typed}</ComparisonLetter>
          <ComparisonLabel>Tapé</ComparisonLabel>
        </ComparisonItem>
      </ComparisonContainer>
    </Container>
  );
};

export default FeedbackDisplay;
