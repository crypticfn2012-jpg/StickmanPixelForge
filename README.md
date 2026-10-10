# Stickman Showdown — PixelForge

A browser stickman fighter prototype with a stripped-back character showcase menu.

## Project structure

- `index.html` — main menu
- `game.html` — current local combat prototype
- `assets/css/style.css` — menu styling
- `assets/js/character.js` — animated stickman and rotatable podium
- `assets/js/crazygames.js` — CrazyGames SDK initialization and profile integration
- `assets/js/menu.js` — menu buttons and profile display
- `assets/images/` — logo and image assets
- `assets/audio/` — sound assets
- `assets/fonts/` — optional local fonts

## Main menu

- Minimal full-screen scene, with no panels or extra menu cards
- Animated stickman on a 3D-style podium
- Drag horizontally to rotate the character/podium
- Play button in the bottom-right corner opens the current combat prototype
- PixelForge mark and small account chip

## CrazyGames profile

The menu initializes CrazyGames SDK v3 when available, reads the current CrazyGames user, and displays their username and profile picture. The optional sign-in button opens CrazyGames' own account prompt. Players can skip sign-in and continue as guests; there is no separate in-game username/password system.

This currently syncs the CrazyGames identity shown in the menu. Cloud progress saving is not implemented yet because this stage has no player progression to save. The game should use the CrazyGames Data module when persistent progression is added.

## Run locally

Serve the repository with any static HTTP server and open `index.html`. The menu falls back to guest mode if the CrazyGames SDK is unavailable.

## Current combat prototype controls

**Player 1:** A/D move, W jump, F punch, R heavy kick, hold G block, Shift dash.

**Player 2 (local):** Left/Right arrows move, Up jumps, K punch, L heavy kick, hold O block.

Online matchmaking and synchronized online combat are not implemented yet.
