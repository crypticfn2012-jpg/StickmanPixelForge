# Stickman Showdown — PixelForge

A lightweight HTML5 stickman fighting prototype built for browser play, using a simple single-page structure similar to the existing Penguin Plunge web project.

## Run locally
Open `index.html` in a modern browser, or serve this folder with any static HTTP server. No build step or external game engine is required.

## Current playable features
- 1-player versus CPU combat with Chill, Balanced, and Tough difficulty
- Local 2-player combat on one keyboard
- Movement, jumping, quick punch, heavy kick, blocking, dash, knockback, hit stun, and health bars
- Best-of-1 / best-of-3 match setting, round wins, restart flow
- Responsive layout and PixelForge branding
- CrazyGames SDK v3 script, initialization, loading-stop, and gameplay start/stop lifecycle calls with standalone fallback

## Controls
**Player 1:** A/D move, W jump, F punch, R heavy kick, hold G to block, Shift to dash.

**Player 2 (Local 2P):** Left/Right arrows move, Up jumps, K punches, L heavy kicks, hold O to block.

## CrazyGames multiplayer status
The SDK is initialized where available, but **real online matchmaking and synchronized combat are not implemented in this prototype**. The CrazyGames SDK does not magically make two clients share game state: online play needs a supported multiplayer/matchmaking/signalling transport and a room/lifecycle design. The Online button intentionally reports this limitation instead of showing a fake connected state. Configure and test the chosen online service and CrazyGames submission requirements before advertising online play or submitting as a multiplayer game.

## Next steps
1. Choose/enable a multiplayer transport and room flow compatible with the target CrazyGames distribution.
2. Synchronize player inputs/state and authoritative round results; add reconnect and disconnect handling.
3. Test SDK integration in the CrazyGames preview environment and complete the current platform submission checklist.
