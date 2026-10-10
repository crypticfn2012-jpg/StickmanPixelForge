# Stickman Showdown — PixelForge

A single-file HTML5 stickman fighting game. The menu, combat code, physics, animation renderer, audio handling, CrazyGames integration and match progression live in **`index.html`**. Local images and sound effects remain in `assets/images/` and `assets/audio/`.

## Current game

- Initial black PixelForge loading screen, with an actual loading bar
- Lobby uses `LobbyBg.jpg`; the title display crops the wordmark from the portrait `MainLogo.jpg` rather than scaling the full poster down to a tiny thumbnail
- Main-menu stickman has a podium and idle/run/jump/roll animation states
- Full-screen fight uses `ArenaBg.jpg`
- Between-match loading uses `LoadingScreen.jpg` without the PixelForge studio logo
- Fast running, dashes, jumps/flips, punch/kick timing, blocking, hit stun, impact sparks, combos, screen shake and knockouts
- VS CPU with Chill/Standard/Elite difficulty, or same-device local two-player mode
- Health bars, round timer, best-of-three matches, pause/result screens and mobile touch controls
- Optional CrazyGames profile sign-in, player name/avatar, match stats and save support
- Audio uses the actual user-supplied MP3s: looping lobby music, button clicks, punches, kicks, ground impacts and knockout sounds. The music starts after the first player interaction to comply with browser autoplay restrictions.
- The lobby UI hides redundant stats/cards and keeps the game title, account/music controls, mode selector and main fight button.

## Character art and licence

The character renderer first tries the separate idle, run, jump and roll sprite strips from **“Simple animated character 16x16” by MScull**, published on OpenGameArt under **CC0** (public domain dedication). The game falls back to the built-in drawn character if a remote image is unavailable.

Source and licence: https://opengameart.org/content/simple-animated-character-16x16

The tiny sprite sheets are currently requested directly from OpenGameArt rather than duplicated into this repository. Before final distribution, it is preferable to vendor those PNGs into `assets/characters/` and point the game at the local copies, so the build has no runtime dependency on a third-party art host.

## Sound files

- `ButtonClicked.mp3` — UI clicks
- `MainMenuMusic.mp3` — lobby music loop
- `Punch.mp3` — punches and blocks
- `kick.mp3` — kicks
- `groundImpact.mp3` — jumping/dashing/landings
- `death.mp3` — knockout / end of round

## Controls

**Player 1:** A/D move, W jump/flip, F punch, R kick, hold G to block, Shift dash.

**Player 2 (local mode):** Left/Right arrows move, Up jump/flip, K punch, L kick, hold O to block, Right Ctrl dash.

Press **P** to pause. Use the result or pause screen to return to the lobby.

## Run locally

Don't double-click `index.html` to test the CrazyGames SDK. From this folder, run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. The SDK is skipped only for `file://` mode, which runs as a guest to avoid browser file-origin warnings. Use localhost or CrazyGames Preview for SDK testing.

## CrazyGames release checklist

- Verify in CrazyGames Preview at the supported review viewports, including 907×510.
- Test the live CC0 sprite fetch, all six MP3 paths, mobile controls, music mute, account prompt, round transitions and browser console.
- Enable Progress Save in the Developer Portal if using CrazyGames' Data module; rely on the module for submitted builds.
- Keep the first playable action within one click of the initial screen. CrazyGames supplies fullscreen controls, so the game does not add a custom fullscreen button.

The current build supports **local combat** (CPU and same-device two-player). It does not implement online matchmaking or synchronized online fights. Approval cannot be guaranteed before the real CrazyGames QA/Preview run.
