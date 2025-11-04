import styled from 'styled-components';
import { useSettings } from '../context/SettingsContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Panel = styled.div`
  background-color: ${props => props.theme.panelBg};
  color: ${props => props.theme.panelText};
  border-radius: 12px;
  padding: 2rem;
  min-width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: background-color 0.3s, color 0.3s;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  font-weight: bold;
  color: ${props => props.theme.panelText};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.panelText};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.keyTarget};
    outline-offset: 2px;
  }
`;

const SettingRow = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.panelText};
  margin-bottom: 0.75rem;
`;

const ToggleButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${props => props.$active ? '#4CAF50' : '#e0e0e0'};
  background-color: ${props => props.$active ? '#4CAF50' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#666666'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$active ? '#45a049' : '#bdbdbd'};
    background-color: ${props => props.$active ? '#45a049' : '#f5f5f5'};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioButton = styled.button`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${props => props.$active ? '#2196F3' : '#e0e0e0'};
  background-color: ${props => props.$active ? '#2196F3' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#666666'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$active ? '#1976D2' : '#bdbdbd'};
    background-color: ${props => props.$active ? '#1976D2' : '#f5f5f5'};
  }
`;

const SettingsPanel = ({ onClose }) => {
  const { soundEnabled, letterMode, theme, toggleSound, setLetterMode, setTheme } = useSettings();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Panel>
        <Header>
          <Title>Paramètres</Title>
          <CloseButton onClick={onClose} aria-label="Fermer les paramètres">
            ×
          </CloseButton>
        </Header>

        <SettingRow>
          <SettingLabel>Effets sonores</SettingLabel>
          <ToggleButton
            $active={soundEnabled}
            onClick={toggleSound}
            aria-label={`Son ${soundEnabled ? 'activé' : 'désactivé'}`}
          >
            {soundEnabled ? '🔊 ACTIVÉ' : '🔇 DÉSACTIVÉ'}
          </ToggleButton>
        </SettingRow>

        <SettingRow>
          <SettingLabel>Mode de lettres</SettingLabel>
          <RadioGroup>
            <RadioButton
              $active={letterMode === 'sequential'}
              onClick={() => setLetterMode('sequential')}
              aria-label="Mode séquentiel"
            >
              Séquentiel
            </RadioButton>
            <RadioButton
              $active={letterMode === 'random'}
              onClick={() => setLetterMode('random')}
              aria-label="Mode aléatoire"
            >
              Aléatoire
            </RadioButton>
          </RadioGroup>
        </SettingRow>

        <SettingRow>
          <SettingLabel>Thème</SettingLabel>
          <RadioGroup>
            <RadioButton
              $active={theme === 'light'}
              onClick={() => setTheme('light')}
              aria-label="Thème clair"
            >
              Clair
            </RadioButton>
            <RadioButton
              $active={theme === 'dark'}
              onClick={() => setTheme('dark')}
              aria-label="Thème sombre"
            >
              Sombre
            </RadioButton>
            <RadioButton
              $active={theme === 'highContrast'}
              onClick={() => setTheme('highContrast')}
              aria-label="Thème à contraste élevé"
            >
              Contraste élevé
            </RadioButton>
          </RadioGroup>
        </SettingRow>
      </Panel>
    </Overlay>
  );
};

export default SettingsPanel;
