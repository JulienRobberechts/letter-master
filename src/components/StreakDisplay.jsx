import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const StreakContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.buttonBg};
  border: 2px solid ${props => props.theme.buttonBorder};
  border-radius: 12px;
  min-width: 120px;
`;

const StreakNumber = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.keyTarget};
`;

const StreakLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.text};
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TotalLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.text};
  opacity: 0.6;
  margin-top: 0.25rem;
`;

function StreakDisplay() {
  const { streak, totalCorrect } = useGame();

  return (
    <StreakContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StreakLabel>Série</StreakLabel>
      <AnimatePresence mode="wait">
        <StreakNumber
          key={streak}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {streak}
        </StreakNumber>
      </AnimatePresence>
      <TotalLabel>{totalCorrect} réussite{totalCorrect !== 1 ? 's' : ''}</TotalLabel>
    </StreakContainer>
  );
}

export default StreakDisplay;
