# Stickman Showdown — PixelForge

A single-file HTML5 stickman fighting game. The game UI, animation, CPU opponent, physics, lobby, match flow, CrazyGames integration and progression logic live in **`index.html`**. The five files in `assets/images/` supply the branding and backgrounds.

## Current game

- Black first-load screen with `PixelForgelogo.png` and a loading bar
- Main lobby using `LobbyBg.jpg` and `MainLogo.jpg`
- Rotating podium fighter with idle, punch, kick and flip showcase animations
- Inter-round loading screen using `LoadingScreen.jpg` without the PixelForge loading logo
- Full-screen combat scene using `ArenaBg.jpg`
- Fast run/dash movement, jumps and flips, punch/kick attacks, blocking, hit stun, hit sparks, combos and screen shake
- VS CPU with Chill, Standard and Elite difficulty, or same-device local two-player
- Health bars, round timer, best-of-three match flow, pause/result screens, sound and mobile touch controls
- Optional CrazyGames account sign-in, username/avatar display, match stats, rotating daily missions and a daily streak
- Saves through CrazyGames' Data module when initialized, with browser local storage as a development fallback

## Controls

**Player 1:** A/D move, W jump/flip, F punch, R kick, hold G to block, Shift dash.

**Player 2 (local mode):** Left/Right arrows move, Up jump/flip, K punch, L kick, hold O to block, Right Ctrl dash.

Press **P** to pause. Use the result-screen or pause-screen button to return to the lobby.

## Run locally

Don't double-click `index.html` to test SDK functionality. Open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. VS Code Live Server also works. Direct `file://` mode deliberately skips loading the CrazyGames SDK and runs as guest, avoiding browser file-origin security warnings.

## CrazyGames submission checklist

The SDK is initialized during startup on a supported web origin. For cross-device saves, enable **Progress Save** in the CrazyGames developer portal; the SDK Data module is disabled if that submission option is off.

Before submission, test the uploaded build in CrazyGames Preview. In particular, check the official review viewport sizes (including 907×510), mobile/touch input, player visibility, readable UI, consistent physics at different frame rates, round transitions, account auth, profile loading, saved progress and the browser console. CrazyGames provides fullscreen itself, so this game intentionally has no custom fullscreen button. Keep the first playable action within one click of the initial screen and avoid external game cross-promotions.

The daily challenge rotates between landing hits, dashing and winning a match. Progress and the current streak are saved to create a repeat-play goal without blocking the player from starting a fight.

## Scope

This build provides **local combat**: single-player versus CPU and two players on the same device. Real online matchmaking and synchronized online combat are not implemented. CrazyGames approval is not guaranteed; final acceptance depends on their current gameplay, visual, technical and policy review.
