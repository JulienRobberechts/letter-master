
# Letter master

### Project Overview

**Project title:** Letter Master
**Goal:** Create a simple, accessible web game built with ReactJS to help children practice QWERTY keyboard recognition and letter typing in a fun and non‑competitive environment.

***

### Core Concept

Letter Master displays a single uppercase letter on a virtual keyboard.
The player presses a key on a physical keyboard:

- If the typed letter differs from the displayed one, both letters appear side by side, and a visual cue highlights the difference between them.
- If the typed letter matches exactly, the app shows an animation celebrating the correct input.
- There are no scores, timers, usernames, or progression — the goal is stress‑free learning.

***

### Functional Requirements

- Display one uppercase letter from A–Z at a time.
- Capture the user’s keyboard input in real time.
- Compare the input letter with the target letter.
- Render appropriate feedback:
    - Incorrect input → display both letters and highlight differences visually.
    - Correct input → trigger an animation (e.g., fade, bounce, glow).
- Generate the next target letter upon the action Enter.
- Include sound or haptic feedback.
- Support Firefox browsers and responsive layouts.
- Use only public domain or original assets (fonts, sounds, illustrations).

***

### Technical Specification

- **Frontend framework:** ReactJS (latest stable version).
- **Styling:** styled‑components.
- **Animation library:** Framer Motion.
- **State management:** React hooks (useState, useEffect).
- **Keyboard event handling:** onKeyDown listener on the document or a specific container.
- **Accessibility:**
    - Large, high‑contrast fonts.
    - Configurable color schemes (light/dark/high‑contrast modes).
    - Audio feedback toggle.

***

### DO NOT

- Add lowercase and special characters. 
- Include language mode (e.g., French or Spanish accented letters).
- Introduce levels (difficulty by speed or number of letters).
- Keep minimal local stats such as total letters practiced.
- Create optional extensions

***

### Design Details

The sucessful target letter change only when the player presses ENTER button.

**Q2.** How should letter differences be visualized when incorrect?
**A2.** Show both letters with color highlights (expected = green, typed = red) and a small note under the keyboard.

**Q3.** What animations are suitable for correct inputs?
**A3.** Gentle bounce, zoom, sparkle, or glowing letter effects that reinforce success positively.

**Q4.** Should the app include sound effects?
**A4.** yes

**Q5.** Should letters be truly random or sequential (A–Z)?
**A5.** Start sequentially to teach systematically, then enable random mode for replayability.

**Q6.** Should the keyboard on screen light up according to the child’s input?
**A6.** YES, That’s highly instructive — highlighting the pressed key improves letter‑to‑key association.

**Q7.** Should the game store last learning settings in localStorage (sound on/off, letter mode)?
**A7.** Yes, for better user experience between sessions.

***
