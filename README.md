# monkeyguildmon

A Pokemon-style game where every member of the monkey guild Discord server is a catchable mon. Hoplite weapons + Minecraft gear as moves. Built in vanilla HTML/CSS/JS — no build step, just open `play.html` (after build) or `index.html` (split source).

**Play it:** [monkeyguildmon.pages.dev](https://monkeyguildmon.pages.dev)

## What's in it

- **83 mons** — 3 starters (ali, mxrio, Steel) + their evolutions + every Discord member from the guild
- **Ali's signature mechanic** — his only move is "give up" (insta-sleep). After 2 give-ups, **SHRINK RAY** unlocks on turn 3
- **Hoplite + Minecraft moves** — Spear Thrust, Shield Bash, Phalanx, Diamond Sword, TNT, Ender Pearl, Ban Hammer, etc.
- **8 types** — Mod / Lurker / Memer / Gamer / Coder / Streamer / Bot / Admin (Discord-themed type chart)
- **5 gym leaders + Champion** — sapwn → LSM253 → ronic → dr.yeet → pootalker789 → Christian → **Karl**
- **11 connected channel-maps** — #general-chat → #lobby → #voice-call → #code-help → #art-showcase → #admin-lounge
- **Custom sprites** for every friend, hand-tuned from their actual Discord PFP
- **Walking + talking SFX, no music** — just chiptune sound effects

## Controls

| Action      | Keyboard                | Touch    |
| ----------- | ----------------------- | -------- |
| Move        | Arrows / WASD           | D-pad    |
| Confirm/A   | Z / Q / Enter           | A button |
| Cancel/B    | X / E / Esc             | B button |
| Quick-heal  | H (in battle)           | —        |
| Fullscreen  | F                       | —        |

## Files

- `index.html` + `css/` + `js/` — the game (just open in any modern browser)
- `ad/` — 30-second Remotion launch ad
  - landscape: `cd ad && npm run render`
  - vertical: `npm run render:vertical`
  - square: `npm run render:square`

## Run locally

```bash
python3 -m http.server 8769
# then open http://localhost:8769/
```

## Save data

Lives in browser localStorage under `monkeyguildmon_save_v1`. Don't clear site data.

## Credits

Game music: none (off by request). Ad music: **RezaDead × prodcrucial — "PRETEND"** ([NCS Release](https://ncs.io)).
