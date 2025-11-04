import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Message = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
`;

const Instruction = styled.div`
  font-size: 1.5rem;
  color: #666666;
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
  background-color: ${props => props.$isExpected ? '#4CAF50' : '#F44336'};
  min-width: 80px;
  text-align: center;
`;

const ComparisonLabel = styled.div`
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  color: #666666;
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
        <Instruction>Type the letter</Instruction>
      </Container>
    );
  }

  if (isCorrect === true) {
    return (
      <Container>
        <Message>Correct!</Message>
      </Container>
    );
  }

  // isCorrect === false
  return (
    <Container>
      <ComparisonContainer>
        <ComparisonItem>
          <ComparisonLetter $isExpected={true}>{target}</ComparisonLetter>
          <ComparisonLabel>Expected</ComparisonLabel>
        </ComparisonItem>
        <ComparisonItem>
          <ComparisonLetter $isExpected={false}>{typed}</ComparisonLetter>
          <ComparisonLabel>Typed</ComparisonLabel>
        </ComparisonItem>
      </ComparisonContainer>
    </Container>
  );
};

export default FeedbackDisplay;
