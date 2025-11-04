import { useEffect } from 'react';

/**
 * Custom hook to capture keyboard input (A-Z letters only)
 * @param {Function} onKeyPress - Callback function called with uppercase letter
 */
const useKeyboardInput = (onKeyPress) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      // Filter: A-Z only
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        onKeyPress(key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);
};

export default useKeyboardInput;
