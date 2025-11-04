// Letter array A-Z
export const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Get random letter from A-Z
export const getRandomLetter = () => {
  const randomIndex = Math.floor(Math.random() * LETTERS.length);
  return LETTERS[randomIndex];
};
