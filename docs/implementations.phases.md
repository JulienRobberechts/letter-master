# Letter Master - Implementation Phases

## Architecture Overview

### Tech Stack
- **Build Tool:** Vite 5.x (fast HMR, modern ESM-based builds)
- **Framework:** React 18.2+ (concurrent features, automatic batching)
- **Styling:** styled-components 6.x (CSS-in-JS, theming)
- **Animations:** Framer Motion 11.x (declarative animations)
- **State Management:** React Context API + custom hooks
- **Persistence:** localStorage API
- **Audio:** Web Audio API / HTML5 Audio

### Application Architecture

```
src/
├── components/
│   ├── App.jsx                 # Root component, providers
│   ├── LetterDisplay.jsx       # Target letter display
│   ├── VirtualKeyboard.jsx     # On-screen QWERTY keyboard
│   ├── Key.jsx                 # Individual keyboard key
│   ├── FeedbackDisplay.jsx     # Comparison feedback (correct/incorrect)
│   ├── SettingsPanel.jsx       # Settings UI
│   └── AnimationWrapper.jsx    # Success animation container
├── hooks/
│   ├── useKeyboardInput.js     # Keyboard event handling
│   ├── useLetterGenerator.js   # Letter generation logic
│   ├── useAudioFeedback.js     # Sound management
│   └── useLocalStorage.js      # Settings persistence
├── context/
│   ├── GameContext.jsx         # Game state (target, typed, mode)
│   ├── SettingsContext.jsx     # Settings (sound, theme, mode)
│   └── ThemeContext.jsx        # Theme provider
├── styles/
│   ├── theme.js                # Theme definitions
│   └── GlobalStyles.js         # Global CSS reset
├── assets/
│   └── sounds/                 # Audio files (public domain)
├── utils/
│   └── constants.js            # QWERTY layout, letter arrays
└── main.jsx                    # Entry point
```

### State Management Strategy

**GameContext:**
- `targetLetter` - Current letter to type
- `typedLetter` - User's input
- `isCorrect` - Match status
- `letterIndex` - Position in sequence
- `mode` - 'sequential' | 'random'

**SettingsContext:**
- `soundEnabled` - Audio toggle
- `theme` - 'light' | 'dark' | 'high-contrast'
- `letterMode` - 'sequential' | 'random'

**Local Component State:**
- Pressed key tracking (VirtualKeyboard)
- Animation states (AnimationWrapper)
- Panel visibility (SettingsPanel)

---

## Phase 1: Foundation + Basic Letter Display

### Objectives
- Initialize project with Vite
- Setup React with basic structure
- Display single uppercase letter
- Establish styling foundation

### Tasks
1. **Project Initialization**
   ```bash
   npm create vite@latest letter-master -- --template react
   cd letter-master
   npm install
   npm install styled-components
   ```

2. **File Structure**
   - Create `src/components/App.jsx`
   - Create `src/components/LetterDisplay.jsx`
   - Create `src/styles/GlobalStyles.js`
   - Create `src/utils/constants.js`

3. **Components to Build**

   **App.jsx:**
   - Root component
   - Manage `targetLetter` state
   - Initialize with random letter (A-Z)

   **LetterDisplay.jsx:**
   - Receive `letter` prop
   - Styled container (large, centered)
   - High-contrast typography

   **GlobalStyles.js:**
   - CSS reset
   - Box-sizing, margins
   - Font family (sans-serif, readable)

   **constants.js:**
   - Export `LETTERS = ['A', 'B', ..., 'Z']`
   - Export `getRandomLetter()` utility

4. **Styling Approach**
   - Large letter display: `font-size: 8rem`
   - Center: flexbox layout
   - High contrast: `#000` on `#fff`
   - Border/shadow for depth

### Deliverable
- App runs on `npm run dev`
- Single random letter visible on screen
- Clean, centered layout
- Refresh shows different letter

### Tests (Manual)
- [x] Letter A-Z displayed
- [x] Centered vertically/horizontally
- [x] Readable at arm's length
- [x] Page refresh changes letter

### Status
✅ COMPLETED

**Completed:** 2025-11-04

**Implementation Notes:**
- Vite project initialized with React template
- styled-components installed and configured
- Created file structure as specified
- LetterDisplay component with 8rem font, centered flexbox layout
- GlobalStyles with CSS reset and base styles
- constants.js with LETTERS array and getRandomLetter() utility
- App.jsx manages targetLetter state, initialized with random letter
- Build verified successful (223.44 kB bundle)

**Files Created:**
- `src/utils/constants.js`
- `src/styles/GlobalStyles.js`
- `src/components/LetterDisplay.jsx`
- `src/components/App.jsx`

**No Issues**

---

## Phase 2: Keyboard Input + Feedback

### Objectives
- Capture keyboard events
- Compare typed vs target letter
- Show visual feedback (correct/incorrect)
- Display both letters when incorrect

### Tasks
1. **Install/Setup**
   - No new dependencies

2. **Files to Create**
   - `src/components/FeedbackDisplay.jsx`
   - `src/hooks/useKeyboardInput.js`

3. **Components to Build**

   **useKeyboardInput.js:**
   ```javascript
   // Hook signature
   const useKeyboardInput = (onKeyPress) => {
     // Listen to document.addEventListener('keydown')
     // Filter: A-Z only (uppercase conversion)
     // Call onKeyPress(key)
     // Cleanup on unmount
   }
   ```

   **App.jsx (Update):**
   - Add `typedLetter` state
   - Add `isCorrect` state
   - Use `useKeyboardInput` hook
   - Compare `typedLetter === targetLetter`
   - Pass data to FeedbackDisplay

   **FeedbackDisplay.jsx:**
   - Props: `target`, `typed`, `isCorrect`
   - Display logic:
     - `isCorrect === null`: Show instruction ("Type the letter")
     - `isCorrect === true`: Show success message ("Correct!")
     - `isCorrect === false`: Show both letters side-by-side
       - Expected letter: green background
       - Typed letter: red background
   - Include small note: "Expected vs Typed"

4. **Styling**
   - Feedback area below letter display
   - Green (#4CAF50) for expected
   - Red (#F44336) for typed
   - Side-by-side comparison: `display: flex; gap: 1rem`
   - Font size: 3rem for comparison letters

### Deliverable
- Type any letter on keyboard
- Correct match: "Correct!" message
- Incorrect match: Both letters shown (green vs red)
- Clear visual distinction

### Tests (Manual)
- [x] Type correct letter → success message
- [x] Type incorrect letter → both letters shown
- [x] Green = expected, Red = typed
- [x] Special keys (Enter, Shift) ignored

### Status
✅ COMPLETED

**Completed:** 2025-11-04

**Implementation Notes:**
- useKeyboardInput hook captures A-Z keypress events, filters non-letter keys
- FeedbackDisplay component with 3 states: null (instruction), correct (success), incorrect (comparison)
- App.jsx updated with typedLetter and isCorrect state management
- Comparison view: green background (#4CAF50) for expected, red (#F44336) for typed
- 3rem font size for comparison letters, clear labels below each
- handleKeyPress callback compares typed vs target letter
- Build verified: 224.96 kB bundle (72.32 kB gzipped)

**Files Created:**
- `src/hooks/useKeyboardInput.js`
- `src/components/FeedbackDisplay.jsx`

**Files Modified:**
- `src/components/App.jsx`

**No Issues**

---

## Phase 3: Virtual Keyboard

### Objectives
- Render QWERTY keyboard on screen
- Highlight keys as user types
- Visual association (key → letter)

### Tasks
1. **Files to Create**
   - `src/components/VirtualKeyboard.jsx`
   - `src/components/Key.jsx`
   - Update `src/utils/constants.js`

2. **Constants Update**
   ```javascript
   // QWERTY layout (3 rows)
   export const KEYBOARD_LAYOUT = [
     ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
     ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
     ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
   ];
   ```

3. **Components to Build**

   **Key.jsx:**
   - Props: `letter`, `isPressed`, `isTarget`
   - Styled button/div
   - States:
     - Default: light gray background
     - `isPressed`: yellow/orange highlight
     - `isTarget`: subtle glow/border
   - Size: 60px × 60px
   - Border-radius: 8px

   **VirtualKeyboard.jsx:**
   - Props: `pressedKey`, `targetLetter`
   - Map `KEYBOARD_LAYOUT` → Key components
   - 3 rows with flexbox
   - Center alignment
   - Gap between keys

   **App.jsx (Update):**
   - Add `pressedKey` state
   - Track last pressed key
   - Pass to VirtualKeyboard
   - Clear `pressedKey` after 300ms (brief highlight)

4. **Styling**
   - Keyboard container: bottom of screen
   - Responsive: scale on mobile
   - Key spacing: `gap: 0.5rem`
   - Pressed state: `background: #FFC107` (amber)
   - Target state: `box-shadow: 0 0 10px #2196F3` (blue glow)

### Deliverable
- QWERTY keyboard visible at bottom
- Type a key → it lights up briefly
- Target letter has subtle glow
- Clear visual feedback

### Tests (Manual)
- [ ] 26 keys arranged in QWERTY layout
- [ ] Press 'A' → 'A' key highlights
- [ ] Target letter has glow effect
- [ ] Highlight clears after brief delay

---

## Phase 4: Letter Navigation (ENTER)

### Objectives
- ENTER key advances to next letter
- Sequential mode (A→B→C...→Z→A)
- Random mode (shuffle)
- Mode toggle

### Tasks
1. **Files to Create**
   - `src/hooks/useLetterGenerator.js`
   - `src/context/GameContext.jsx`

2. **GameContext.jsx:**
   ```javascript
   // State
   - targetLetter
   - typedLetter
   - isCorrect
   - mode: 'sequential' | 'random'
   - letterIndex (for sequential)

   // Actions
   - setTypedLetter(letter)
   - advanceToNextLetter() // Called on ENTER
   - toggleMode()
   ```

3. **useLetterGenerator.js:**
   ```javascript
   const useLetterGenerator = (mode) => {
     const [currentLetter, setCurrentLetter] = useState('A');
     const [index, setIndex] = useState(0);

     const nextLetter = () => {
       if (mode === 'sequential') {
         // Increment index, wrap at 26
       } else {
         // Random letter (avoid repeat)
       }
     };

     return { currentLetter, nextLetter };
   };
   ```

4. **App.jsx (Update):**
   - Wrap in `<GameProvider>`
   - Handle ENTER key in useKeyboardInput
   - Only advance if `isCorrect === true`
   - Reset `typedLetter` and `isCorrect` on advance

5. **UI Addition:**
   - Simple toggle button: "Mode: Sequential" / "Mode: Random"
   - Position: top-right corner
   - Click to switch modes

### Deliverable
- Type correct letter
- Press ENTER → next letter appears
- Sequential mode: A→B→C...
- Random mode: unpredictable order
- Toggle button works

### Tests (Manual)
- [ ] Correct + ENTER → next letter
- [ ] Incorrect + ENTER → no advance
- [ ] Sequential: A→B→C progression
- [ ] Random: different letters
- [ ] Toggle switches modes

---

## Phase 5: Animations

### Objectives
- Install Framer Motion
- Animate correct input (bounce, glow)
- Smooth letter transitions
- Visual celebration

### Tasks
1. **Install**
   ```bash
   npm install framer-motion
   ```

2. **Files to Create**
   - `src/components/AnimationWrapper.jsx`

3. **AnimationWrapper.jsx:**
   ```javascript
   import { motion } from 'framer-motion';

   // Wrap LetterDisplay
   // Trigger animation when isCorrect === true

   const successAnimation = {
     scale: [1, 1.2, 1],
     rotate: [0, 5, -5, 0],
     transition: { duration: 0.5 }
   };

   const glowAnimation = {
     boxShadow: [
       '0 0 0px #4CAF50',
       '0 0 30px #4CAF50',
       '0 0 0px #4CAF50'
     ]
   };
   ```

4. **LetterDisplay.jsx (Update):**
   - Wrap in `<motion.div>`
   - Animate on letter change:
     ```javascript
     <motion.div
       key={letter} // Force re-mount
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 20 }}
     >
     ```

5. **FeedbackDisplay.jsx (Update):**
   - Animate correct message:
     ```javascript
     <motion.div
       initial={{ scale: 0 }}
       animate={{ scale: 1 }}
       transition={{ type: 'spring' }}
     >
       Correct! ✓
     </motion.div>
     ```

### Deliverable
- Correct input → letter bounces/glows
- Smooth transitions between letters
- Success message animates in
- Feels celebratory, not jarring

### Tests (Manual)
- [x] Correct letter triggers bounce
- [x] Glow effect visible
- [x] Letter change is smooth
- [x] Animations don't feel sluggish

### Status
✅ COMPLETED

**Completed:** 2025-11-04

**Implementation Notes:**
- framer-motion 11.x installed (added 3 packages)
- AnimationWrapper.jsx: bounce + glow on correct input (scale, rotate, drop-shadow)
- LetterDisplay.jsx: motion.div with fade + slide transitions (0.3s duration)
- FeedbackDisplay.jsx: spring animation on success message (stiffness: 260, damping: 20)
- Success animation: scale[1→1.2→1], rotate[0→5→-5→0], glow filter (0.5s)
- Letter transitions: opacity 0→1, y -20→0 on enter, reverse on exit
- Build verified: 341.20 kB bundle (110.42 kB gzipped)

**Files Created:**
- `src/components/AnimationWrapper.jsx`

**Files Modified:**
- `src/components/LetterDisplay.jsx`
- `src/components/FeedbackDisplay.jsx`
- `src/components/App.jsx`

**No Issues**

---

## Phase 6: Sound System

### Objectives
- Source public domain sounds
- Play audio on correct/incorrect/keypress
- Toggle sound on/off
- No copyright issues

### Tasks
1. **Asset Sourcing**
   - Find/create public domain sounds:
     - `correct.mp3` - pleasant chime
     - `incorrect.mp3` - gentle buzz
     - `keypress.mp3` - subtle click (optional)
   - Sources: freesound.org (CC0), self-record
   - Place in `src/assets/sounds/`

2. **Files to Create**
   - `src/hooks/useAudioFeedback.js`
   - `src/assets/sounds/correct.mp3`
   - `src/assets/sounds/incorrect.mp3`

3. **useAudioFeedback.js:**
   ```javascript
   const useAudioFeedback = (enabled) => {
     const playCorrect = () => {
       if (!enabled) return;
       const audio = new Audio('/src/assets/sounds/correct.mp3');
       audio.play();
     };

     const playIncorrect = () => {
       if (!enabled) return;
       const audio = new Audio('/src/assets/sounds/incorrect.mp3');
       audio.play();
     };

     return { playCorrect, playIncorrect };
   };
   ```

4. **App.jsx (Update):**
   - Import useAudioFeedback
   - Call `playCorrect()` when `isCorrect === true`
   - Call `playIncorrect()` when `isCorrect === false`

5. **Settings Addition:**
   - Add sound toggle button (top-left)
   - Icon: 🔊 (on) / 🔇 (off)
   - Click to toggle
   - Store in state

### Deliverable
- Correct input → pleasant sound
- Incorrect input → gentle buzz
- Toggle button mutes all sounds
- Audio files are public domain

### Tests (Manual)
- [x] Correct letter plays sound
- [x] Incorrect letter plays sound
- [x] Toggle mutes sounds
- [x] Sounds don't overlap/lag

### Status
✅ COMPLETED

**Completed:** 2025-11-04

**Implementation Notes:**
- Web Audio API used for 100% public domain sound generation (no external files)
- useAudioFeedback.js: programmatic audio synthesis with error handling
- Correct sound: C5 + E5 harmonious chime (523Hz + 659Hz, 0.3s duration)
- Incorrect sound: 200Hz sawtooth buzz (0.2s duration)
- Sound toggle button (top-left): 🔊/🔇 emoji icons
- Envelope shaping: exponential decay for natural sound
- Audio triggered via useEffect on isCorrect state changes
- Lazy AudioContext initialization to avoid autoplay issues
- Build verified: 342.86 kB bundle (110.89 kB gzipped)

**Files Created:**
- `src/hooks/useAudioFeedback.js`
- `public/sounds/generate-sounds.js` (reference only, not used in prod)

**Files Modified:**
- `src/components/App.jsx`

**No Issues**

---

## Phase 7: Settings + Persistence

### Objectives
- Settings panel UI
- Save to localStorage
- Persist: sound toggle, letter mode
- Restore on app load

### Tasks
1. **Files to Create**
   - `src/components/SettingsPanel.jsx`
   - `src/hooks/useLocalStorage.js`
   - `src/context/SettingsContext.jsx`

2. **useLocalStorage.js:**
   ```javascript
   const useLocalStorage = (key, initialValue) => {
     const [value, setValue] = useState(() => {
       const stored = localStorage.getItem(key);
       return stored ? JSON.parse(stored) : initialValue;
     });

     useEffect(() => {
       localStorage.setItem(key, JSON.stringify(value));
     }, [key, value]);

     return [value, setValue];
   };
   ```

3. **SettingsContext.jsx:**
   ```javascript
   // State
   - soundEnabled (useLocalStorage)
   - letterMode (useLocalStorage)
   - theme (useLocalStorage)

   // Actions
   - toggleSound()
   - setLetterMode(mode)
   - setTheme(theme)
   ```

4. **SettingsPanel.jsx:**
   - Floating panel (gear icon to open)
   - Options:
     - Sound: ON/OFF toggle
     - Mode: Sequential/Random radio
     - Theme: Light/Dark/High-contrast (Phase 8)
   - Styled modal/drawer
   - Close button

5. **App.jsx (Update):**
   - Wrap in `<SettingsProvider>`
   - Use context values
   - Remove local toggle buttons (consolidate in panel)

### Deliverable
- Gear icon opens settings panel
- Toggle sound, change mode
- Close panel
- Refresh page → settings persist

### Tests (Manual)
- [ ] Settings panel opens/closes
- [ ] Sound toggle persists
- [ ] Mode selection persists
- [ ] Refresh restores settings

---

## Phase 8: Themes + Accessibility

### Objectives
- Light/Dark/High-contrast themes
- Large fonts, clear contrast
- Theme persistence
- Fully accessible app

### Tasks
1. **Files to Create**
   - `src/context/ThemeContext.jsx`
   - `src/styles/theme.js`

2. **theme.js:**
   ```javascript
   export const themes = {
     light: {
       bg: '#FFFFFF',
       text: '#000000',
       keyBg: '#E0E0E0',
       keyPressed: '#FFC107',
       correct: '#4CAF50',
       incorrect: '#F44336'
     },
     dark: {
       bg: '#121212',
       text: '#FFFFFF',
       keyBg: '#333333',
       keyPressed: '#FFA000',
       correct: '#66BB6A',
       incorrect: '#EF5350'
     },
     highContrast: {
       bg: '#000000',
       text: '#FFFF00',
       keyBg: '#FFFFFF',
       keyPressed: '#FF00FF',
       correct: '#00FF00',
       incorrect: '#FF0000'
     }
   };
   ```

3. **ThemeContext.jsx:**
   - Provide current theme object
   - `setTheme(name)` function
   - Persist to localStorage
   - Wrap in styled-components `<ThemeProvider>`

4. **Component Updates:**
   - All styled-components use `props.theme.*`
   - Example: `color: ${props => props.theme.text};`
   - Replace hardcoded colors

5. **SettingsPanel.jsx (Update):**
   - Add theme selector (3 buttons)
   - Preview color swatch
   - Apply immediately

6. **Accessibility Enhancements:**
   - ARIA labels on all interactive elements
   - `role="button"` on keys
   - `aria-live="polite"` on feedback
   - Focus indicators (keyboard navigation)
   - High-contrast outlines

### Deliverable
- 3 theme options working
- Theme persists across sessions
- High-contrast mode very readable
- App meets WCAG AA standards

### Tests (Manual)
- [ ] Switch to dark theme → changes applied
- [ ] High-contrast theme very clear
- [ ] Theme persists on refresh
- [ ] Keyboard navigation works
- [ ] Screen reader announces feedback

---

## Testing Strategy (Per Phase)

### Manual Testing Checklist
After each phase, verify:
1. **Functionality** - Features work as expected
2. **UI/UX** - Visual design is clear, intuitive
3. **Responsiveness** - Works on mobile (375px) and desktop (1920px)
4. **Browser Compat** - Test in Firefox (primary) + Chrome
5. **Accessibility** - Keyboard navigation, contrast ratios

### Automated Testing (Optional)
- Phase 2+: Add Vitest for hooks/utils
- Phase 8: Add React Testing Library for components
- Focus on business logic (letter generation, comparison)

---

## Deployment Notes

### Build for Production
```bash
npm run build
# Output: dist/ folder
```

### Hosting Options
- **Netlify** - Drag-and-drop `dist/`
- **Vercel** - Connect GitHub repo
- **GitHub Pages** - `gh-pages` branch

### Performance Targets
- First paint: < 1s
- TTI (Time to Interactive): < 2s
- Lighthouse score: 90+

---

## Future Enhancements (Post-Phase 8)

**Not in Scope (per readme.md):**
- Lowercase letters
- Special characters
- Multiple languages
- Difficulty levels
- Scoring/stats
- User accounts

**Potential Polish:**
- Custom sound uploads
- Keyboard layout options (Dvorak, Colemak)
- Touch screen support (on-screen key press)
- Progressive Web App (PWA) features
- Print mode (flash cards)

---

## Summary

Each phase builds on the previous, maintaining a working app at every step. Phases 1-4 establish core functionality, Phases 5-6 add polish, Phases 7-8 complete the experience with persistence and accessibility.

Estimated timeline:
- **Phase 1-2:** 2-3 hours
- **Phase 3-4:** 3-4 hours
- **Phase 5-6:** 2-3 hours
- **Phase 7-8:** 3-4 hours
- **Total:** 10-14 hours for full implementation

This plan prioritizes iterative delivery, allowing user testing and feedback after each phase.
