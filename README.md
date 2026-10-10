# Stickman Showdown — PixelForge

A browser-based stickman fighting game made by PixelForge. The UI, hand-drawn fighter renderer, combat simulation, progression, quests, cosmetics, save handling and CrazyGames hooks are in `index.html`. Local art and sound effects are in `assets/images/` and `assets/audio/`.

## Game systems

- **Career climb:** Fight your way through 12 CPU opponents, from the back alley through the parking lot and pro ring to a moon arena. Winning a CPU match unlocks the next opponent; losing means you can rematch.
- **Distinct opponents:** All-rounders, quick speedsters, heavy long-reach sluggers, bruisers, counter fighters and the final champion use different speed, reach, stamina, health, damage and recovery settings.
- **Stamina:** Punches, kicks, jump and dash consume stamina. Holding block drains it. Stamina regenerates over time; low stamina lowers damage and slows movement, so repeatedly attacking is less effective than timing actions and recovering.
- **Upgrades:** Reach, footwork, stamina, toughness and strength can each be upgraded to level 3. Boosts are deliberately capped.
- **Quests:** Three daily challenges track clean hits, dashes and match wins. Career milestones track match wins, total hits, dashes, cosmetics and progress through the venues. Rewards pay coins and are saved.
- **Cosmetics:** Headwear, face details, auras and hand wraps can be bought with earned coins and equipped in separate slots. Coins, unlocks, upgrades and career progress use the existing CrazyGames Data module when available, with local storage as the fallback.
- **Modes:** VS CPU career mode and same-device local two-player. Online matchmaking is not implemented.
- **Audio:** Uses the actual supplied MP3s in `assets/audio/` for lobby music, button clicks, punches, kicks, movement impacts and knockout cues.
- **Lobby:** The original hand-drawn fighter renderer is used for idle, punch, kick, block and movement poses. No external sprite-sheet downloads are required for the character.

## Arenas

The career uses the supplied local assets:

- `assets/images/Alleywaybg.jpg` — the first three fights
- `assets/images/parkinglotbg.jpg` — the next three
- `assets/images/probg.jpg` — the professional circuit
- The final venue is drawn in canvas as a moon arena

The lobby continues to use `LobbyBg.jpg`; the between-match loader uses `LoadingScreen.jpg`.

## Controls

**Player 1:** A/D move, W jump/flip, F punch, R kick, hold G to block, Shift dash.

**Player 2 (local mode):** Left/Right arrows move, Up jump/flip, K punch, L kick, hold O to block, Right Ctrl dash.

Press **P** to pause. Return to the lobby from the pause or result screen.

## CrazyGames integrations and setup

The game uses the CrazyGames SDK v3 loader already in `index.html`. The following items need Developer Portal configuration before production behaviour can be fully enabled:

- **Leaderboard:** The score-submission adapter uses `CrazyGames.SDK.user.submitScore()` and the client-side AES-GCM flow from the SDK documentation. Set `CG_LEADERBOARD_ENCRYPTION_KEY` near the career systems code to the same 32-byte base64 key configured in the Developer Portal, and enable the leaderboard for the game. CrazyGames currently supports one leaderboard per game, so the global score is career wins; in-game records show both wins and defeats.
- **In-game purchases:** The UI deliberately keeps real-money coin packs disabled. CrazyGames IAP is invite-only and requires an approved Xsolla project, product SKUs, and correct order/inventory validation. Set up the project and its checkout flow before enabling `CG_IAP_CONFIG`; do not mark a purchase complete or grant paid currency before the order is confirmed.
- **Banners:** A responsive banner is requested from the SDK while the lobby is visible and cleared when leaving it. The game handles unavailable/unfilled banners without blocking gameplay. Test this in CrazyGames Preview; banners may not be available during Basic Launch.

References:
- https://docs.crazygames.com/sdk/leaderboards/
- https://docs.crazygames.com/sdk/in-game-purchases/
- https://docs.crazygames.com/sdk/banners/

## Run locally

From this folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. Local testing skips the CrazyGames SDK when launched as `file://`; use localhost or CrazyGames Preview to check platform integrations.

## Release checks

Before submitting or updating the live build, test the game in CrazyGames Preview at both desktop and mobile viewports. Verify stamina depletion/recovery, each enemy archetype, venue unlocking, upgrades, each daily quest and career milestone, cosmetic slot switching, persistence, sound, mobile controls, leaderboard key configuration, and banner behaviour. Real-money purchases remain disabled until the CrazyGames/Xsolla setup is completed.
