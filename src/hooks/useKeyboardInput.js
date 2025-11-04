import { useEffect } from 'react';

/**
 * Custom hook to capture keyboard input (A-Z letters only) and ENTER key
 * @param {Function} onKeyPress - Callback function called with uppercase letter
 * @param {Function} onEnter - Callback function called when ENTER is pressed
 */
const useKeyboardInput = (onKeyPress, onEnter) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      // Handle ENTER key
      if (event.key === 'Enter' && onEnter) {
        onEnter();
        return;
      }

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
  }, [onKeyPress, onEnter]);
};

export default useKeyboardInput;
