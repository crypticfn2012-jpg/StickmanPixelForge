# Stickman Showdown — PixelForge

A full-screen HTML5 stickman fighting game prototype. The game UI, animation, combat physics, CPU opponent, menus and CrazyGames integration are all contained in **one `index.html`**. The `assets/images/` folder supplies the game's artwork.

## Included

- PixelForge logo loading screen with a progress bar
- Inter-round loading screen using `LoadingScreen.jpg`
- Main lobby using `LobbyBg.jpg`, with a rotating stickman on a podium
- Full-screen combat arena using `ArenaBg.jpg`
- Hand-drawn, pose-driven stickman animation: running, jumping flips, dashing, punches, kicks, blocking, hit reactions and knockouts
- Fast, responsive local combat with CPU difficulty settings or local two-player mode
- Health bars, round timer, best-of-three matches, combos, hit sparks, screen shake and lightweight sound effects
- Touch controls on mobile devices
- CrazyGames SDK v3 account prompt and profile name/avatar display
- Match stats saved with the CrazyGames Data module when available, with local browser storage as a development fallback

## Controls

**Player 1:** A/D to move, W to jump and flip, F to punch, R to kick, hold G to block, Shift to dash.

**Player 2 (local mode):** Left/Right arrows to move, Up to jump and flip, K to punch, L to kick, hold O to block, Right Ctrl to dash.

Press Escape to pause. Use the lobby button to leave a match.

## Run locally

Serve the repository with any static HTTP server and open `index.html`. The game uses relative image paths, so keep the `assets/images/` files in place. If the CrazyGames SDK is unavailable, the game remains playable as a guest.

## CrazyGames release checklist

The HTML5 SDK v3 is initialized on the loading screen. Account sign-in is optional, so guests can play too. To enable cross-device saves when submitting, turn on the appropriate **Progress Save** setting in the CrazyGames developer portal; the SDK Data module is disabled when that setting is off. Review the build in CrazyGames Preview and test desktop, touch controls, account sign-in, sound muting, fullscreen, round transitions and the console before submission.

This version implements **local combat** (CPU and same-device two-player). It does not implement online matchmaking or synchronized online fights. Acceptance by CrazyGames cannot be guaranteed; the final review depends on platform QA, polish, performance and compliance with their current requirements.
