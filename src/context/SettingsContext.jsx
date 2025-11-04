import { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage('letter-master-sound', true);
  const [letterMode, setLetterMode] = useLocalStorage('letter-master-mode', 'sequential');
  const [theme, setTheme] = useLocalStorage('letter-master-theme', 'light');

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, [setSoundEnabled]);

  const updateLetterMode = useCallback((mode) => {
    if (mode === 'sequential' || mode === 'random') {
      setLetterMode(mode);
    }
  }, [setLetterMode]);

  const updateTheme = useCallback((newTheme) => {
    if (['light', 'dark', 'highContrast'].includes(newTheme)) {
      setTheme(newTheme);
    }
  }, [setTheme]);

  const value = {
    soundEnabled,
    letterMode,
    theme,
    toggleSound,
    setLetterMode: updateLetterMode,
    setTheme: updateTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
