import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimationWrapper = ({ children, isCorrect }) => {
  const successAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 }
  };

  const glowAnimation = {
    filter: [
      'drop-shadow(0 0 0px #4CAF50)',
      'drop-shadow(0 0 30px #4CAF50)',
      'drop-shadow(0 0 0px #4CAF50)'
    ],
    transition: { duration: 0.5 }
  };

  return (
    <Wrapper
      animate={isCorrect === true ? { ...successAnimation, ...glowAnimation } : {}}
    >
      {children}
    </Wrapper>
  );
};

export default AnimationWrapper;
