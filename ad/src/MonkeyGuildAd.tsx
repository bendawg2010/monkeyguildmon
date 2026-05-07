import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { MonSprite, GameScriptsLoader } from "./MonSprite";

loadInter("normal", { weights: ["400", "700", "900"] });

// 30-second Apple-style launch ad for MONKEYGUILDMON.
// Self-contained — does not iframe the live game, so it can be rendered
// before deploy. All visuals are React/CSS + the in-canvas friend sprite
// names + flavor.
export const MonkeyGuildAd: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const total = durationInFrames;

  // Music: NCS track "RezaDead, prodcrucial - PRETEND" — fades in over the
  // first 0.4s and fades out over the last 0.8s so cuts feel intentional.
  const musicVol = (f: number) =>
    interpolate(
      f,
      [0, fps * 0.4, total - fps * 0.8, total],
      [0, 0.6, 0.6, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a14", overflow: "hidden" }}>
      {/* Loads game data.js + sprites.js + extra_sprites.js exactly once
          and bridges classic-script consts onto window. Must mount before
          any <MonSprite> on the first frame. */}
      <GameScriptsLoader />

      <Audio src={staticFile("pretend.mp3")} loop volume={musicVol} />

      {/* SCENE 1: COLD OPEN — title fades in (0–3s) */}
      <Sequence from={0} durationInFrames={3 * fps}>
        <ColdOpen />
      </Sequence>

      {/* SCENE 2: TAGLINE (3–6s) */}
      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <Tagline />
      </Sequence>

      {/* SCENE 3: STARTERS (6–11s) */}
      <Sequence from={6 * fps} durationInFrames={5 * fps}>
        <StartersScene />
      </Sequence>

      {/* SCENE 4: ALI GAG (11–17s) */}
      <Sequence from={11 * fps} durationInFrames={6 * fps}>
        <AliGiveUpGag />
      </Sequence>

      {/* SCENE 5: FRIEND PARADE — long, slow scroll so every sprite is
           clearly visible (17–37s) */}
      <Sequence from={17 * fps} durationInFrames={20 * fps}>
        <FriendParade />
      </Sequence>

      {/* SCENE 6: BIG GRID — every single sprite at once on a wall, with
           a slow camera ken-burns reveal (37–50s) */}
      <Sequence from={37 * fps} durationInFrames={13 * fps}>
        <BigGridScene />
      </Sequence>

      {/* SCENE 7: FEATURED FRIENDS — Myself + notaim hero shots (50–54s) */}
      <Sequence from={50 * fps} durationInFrames={4 * fps}>
        <FeaturedFriends />
      </Sequence>

      {/* SCENE 8: BATTLE HERO (54–59s) */}
      <Sequence from={54 * fps} durationInFrames={5 * fps}>
        <BattleHero />
      </Sequence>

      {/* SCENE 9: END CARD (59–64s) */}
      <Sequence from={59 * fps} durationInFrames={5 * fps}>
        <EndCard />
      </Sequence>

      {/* Persistent URL watermark, hidden during end card */}
      <UrlWatermark />
    </AbsoluteFill>
  );
};

// ---------- SCENES ----------

const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.6, fps * 2.4, fps * 3], [0, 1, 1, 0]);
  const titleY = interpolate(frame, [0, fps * 0.6], [40, 0], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [fps * 0.8, fps * 1.4, fps * 2.4, fps * 3], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, #1a1a3a 0%, #0a0a14 80%)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -6,
            background: "linear-gradient(180deg, #ffd755 0%, #ff9020 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 80px rgba(255, 203, 5, 0.4)",
          }}
        >
          MONKEYGUILDMON
        </div>
        <div
          style={{
            opacity: subOpacity,
            marginTop: 20,
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: 8,
            color: "#a4b3c8",
          }}
        >
          A DISCORD SERVER ADVENTURE
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = [
    { text: "65+ FRIENDS.", color: "#ffd755", at: 0 },
    { text: "1 SERVER.", color: "#5fc8ff", at: 0.7 },
    { text: "1 BIG ADVENTURE.", color: "#7fdc6a", at: 1.4 },
  ];
  return (
    <AbsoluteFill style={{ background: "#0a0a14" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          fontFamily: "Inter",
        }}
      >
        {lines.map((line, i) => {
          const start = line.at * fps;
          const opacity = interpolate(frame, [start, start + fps * 0.3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const slide = interpolate(frame, [start, start + fps * 0.4], [-60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${slide}px)`,
                fontSize: 110,
                fontWeight: 900,
                color: line.color,
                letterSpacing: -2,
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Starter trio showcase: Ali smiley face, Mxrio mario hat, Steel armor
const StartersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });

  const starters = [
    { name: "ali",   flavor: "GIVE UP. WAIT. STRIKE.",   color: "#f0d8a0", id: "NOTALI" },
    { name: "mxrio", flavor: "RED CAP. BIG JUMPS.",      color: "#ed4245", id: "MXRIO" },
    { name: "steel", flavor: "DENTS BUT DOES NOT BREAK.", color: "#9aa0a8", id: "STEEL" },
  ];
  const stagger = 0.5; // seconds between starters

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #1a1a3a 0%, #0a0a14 100%)" }}>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter",
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 700,
          opacity: titleOpacity,
        }}
      >
        Choose your starter.
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          marginTop: 60,
        }}
      >
        {starters.map((s, i) => {
          const start = (1 + i * stagger) * fps;
          const sp = spring({
            frame: frame - start,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          const opacity = interpolate(frame, [start, start + 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${(1 - sp) * 60}px) scale(${0.7 + sp * 0.3})`,
                width: 280,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 280,
                  height: 280,
                  background: `radial-gradient(circle at 30% 30%, ${s.color}33 0%, transparent 70%)`,
                  borderRadius: 24,
                  border: `2px solid ${s.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MonSprite speciesId={s.id} size={220} timeOffset={i * 137} />
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "Inter",
                  fontSize: 44,
                  fontWeight: 900,
                  color: s.color,
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: "#a4b3c8",
                  letterSpacing: 1,
                }}
              >
                {s.flavor}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// The Ali give-up gag — visualizes the 2-turns-of-give-up-then-shrink-ray mechanic
const AliGiveUpGag: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three beats:
  //   0–2s: turn 1 give up — "too much worrrkkkkk"
  //   2–4s: turn 2 give up — "still too much"
  //   4–6s: turn 3 SHRINK RAY unlocks — enemy gets shrunk
  const beat = Math.floor(frame / (2 * fps));
  const titleOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], { extrapolateRight: "clamp" });
  const captions = [
    `ali: too much worrrkkkkk...  Zzz`,
    `ali: nah I'm good...  Zzz`,
    `>>> SHRINK RAY UNLOCKED <<<`,
  ];
  const colors = ["#a4b3c8", "#a4b3c8", "#ffd755"];

  return (
    <AbsoluteFill
      style={{
        background:
          beat === 2
            ? "radial-gradient(circle at 50% 50%, #2a2a6a 0%, #0a0a14 80%)"
            : "linear-gradient(180deg, #1a1a3a 0%, #0a0a14 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: 48,
          fontWeight: 700,
          color: "#ffffff",
          opacity: titleOpacity,
        }}
      >
        Pick ali — your only move is "give up."
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 200,
          marginTop: 40,
        }}
      >
        {/* ali sprite — bigger, with Zzz on first two beats */}
        <div style={{ width: 340, height: 340, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MonSprite speciesId="NOTALI" size={300} />
          {beat < 2 && <FloatingZzz frame={frame} />}
          {beat === 2 && <ShrinkRayBeam frame={frame - 4 * fps} fps={fps} />}
        </div>

        {/* enemy — banana_man (the teddy bear), shrinks in beat 2 */}
        <div
          style={{
            width: 220,
            height: 220,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform:
              beat === 2
                ? `scale(${interpolate(
                    frame,
                    [4 * fps, 5.5 * fps],
                    [1, 0.3],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  )})`
                : "scale(1)",
          }}
        >
          <MonSprite speciesId="BANANA_MAN" size={200} timeOffset={213} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 38,
          fontWeight: 700,
          color: colors[Math.min(beat, 2)],
          letterSpacing: 1,
        }}
      >
        {captions[Math.min(beat, 2)]}
      </div>
    </AbsoluteFill>
  );
};

// Friend names + tier-color pills scroll across the screen
const FriendParade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const title = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });

  // Each entry: [speciesId, displayName] — speciesId is what gets drawn,
  // displayName is the chip label that shows beneath the sprite.
  const friends: Array<[string, string]> = [
    ["NOTALI", "ali"], ["MXRIO", "mxrio"], ["STEEL", "Steel"], ["KARL", "Karl"],
    ["CHRISTIAN", "Christian"], ["LSM253", "LSM253"], ["MYSELF", "Myself"], ["STEEL_GAMER", "Steel (wild)"],
    ["SZS", "szs"], ["AGENTP4", "AgentP4"], ["KAPARKING", "Kaparking"], ["BMAN48", "Bman48"],
    ["NIT", "Nit"], ["ALXROAR", "Alxroar"], ["ENDERLIFE7770", "enderlife7770"],
    ["PENGULITE", "Pengulite"], ["RANGERWILL", "RangerWill"], ["CARRIED", "CARRIED IN MAC"],
    ["KINGBOYS", "Kingboys"], ["_KEE_", "_Kee_"], ["_WISHRAM_", "_WishRam_"],
    ["JUST_MILES", "Just Miles"], ["DUDEGUY", "Dudeguy"], ["IOIO", "ioio"],
    ["BANANA_MAN", "Banana_Man"], ["FORGBEAR1", "forgbear1"], ["POOTALKER789", "pootalker789"],
    ["SUSSYBAKA", "sussybaka"], ["WALKINGGHEAD", "walkingghead"], ["FART_SAUCE9", "Fart_sauce9"],
    ["WART", "wart"], ["SINEED", "Sineed"], ["FRANKIE", "frankie"],
    ["RONIC", "ronic"], ["BLACK_JACK", "Black Jack"], ["WILLIAM_GREGORY", "William Gregory"],
    ["LASERFIRE", "LaserFire"], ["F503N", "F503N"], ["DR_YEET", "dr.yeet"],
    ["FFFOOST", "Fffoost"], ["NOTAIM", "notaim"], ["OANEXITY", "oAnexity"],
    ["EVAN", "Evan"], ["ZYPHON", "zyphon_."], ["SAPWN", "sapwn"], ["SNAIL4", "Snail4"],
    ["ZENI", "Zeni :3"], ["ZENSER48", "zenser48"], ["WEDRFTGJO", "wedrftgjo"],
    ["GEARED", "geared"], ["CAST", "Cast"], ["ADOT", "Adot"], ["IMOH", "imoh"],
    ["DOSEY", "dOsey"], ["EDWIN", "Edwin"], ["BYAE", "byae"], ["BYTE", "Byte"],
    ["CALICSIZED", "calicsized"], ["BUTTKUN", "buttkun"], ["BLU", "blu"],
    ["BENJI_YT", "Benji YT"], ["ALRAYS", "alrays"], ["_1DAM", "1dam"],
    ["FORESTCHAN", "Forestchan"], ["BREEZY", "breezy"], ["LOHR", "Løhr"],
    ["YEEP", "Yeep"], ["JACKY", "Jacky"], ["JAJOONI", "Jajooni"],
    ["MILOSIVIC", "Milosivic"], ["N3GM", "N3gm"], ["QUENER", "quener"],
    ["SEA11", "sea11"], ["TREES", "Trees"], ["WIFI", "wifi"], ["XKING", "xking"],
    ["XL_MATTHEW100", "XL_MATTHEW100"], ["HEADBAND_GUY", "headband guy"],
    ["KOYLY", "Koyly :()"], ["W0RTH", "W0rth"], ["SIGSTICK", "SigStick"],
  ];
  const tiers = ["#ffd755", "#7fdcff", "#7fdc6a", "#ff80c0", "#fee75c"];

  // 3 rows scrolling at different speeds — slow enough that each sprite
  // is on screen for ~1 full second so the viewer can actually see them.
  const third = Math.ceil(friends.length / 3);
  const rows = [friends.slice(0, third), friends.slice(third, third * 2), friends.slice(third * 2)];
  const speeds = [-140, 130, -150];

  return (
    <AbsoluteFill style={{ background: "#0a0a14" }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: 72,
          fontWeight: 900,
          color: "#ffffff",
          opacity: title,
        }}
      >
        The whole monkey guild.
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        {rows.map((row, ri) => {
          const offset = (frame / fps) * speeds[ri];
          return (
            <div key={ri} style={{ position: "relative", height: 200, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  position: "absolute",
                  left: ri % 2 === 0 ? offset : (offset + width),
                  top: 0,
                  whiteSpace: "nowrap",
                  alignItems: "center",
                }}
              >
                {[...row, ...row, ...row].map(([speciesId, name], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "12px 16px",
                      borderRadius: 18,
                      border: `2px solid ${tiers[i % tiers.length]}`,
                      background: `${tiers[i % tiers.length]}22`,
                      minWidth: 140,
                    }}
                  >
                    <MonSprite speciesId={speciesId} size={120} timeOffset={i * 73 + ri * 211} />
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 22,
                        fontWeight: 700,
                        color: tiers[i % tiers.length],
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// BigGridScene — every single sprite rendered at once in a wall, with a
// slow zoom-out so the viewer first sees individual sprites then the
// whole guild.
const BigGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Title fades in/out
  const titleIn = interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: "clamp" });
  const titleOut = interpolate(
    frame,
    [fps * 11, fps * 12.5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const titleOpacity = Math.min(titleIn, titleOut);

  // Slow zoom: starts at 1.4x (cropped, you see ~half), ends at 1.0x (full grid)
  const zoom = interpolate(frame, [0, fps * 13], [1.4, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slight pan top-to-bottom across the zoom
  const panY = interpolate(frame, [0, fps * 13], [-90, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ALL species the user has hand-tuned sprites for. ~80 entries.
  const allMons: string[] = [
    "NOTALI", "MXRIO", "STEEL", "KARL", "CHRISTIAN", "LSM253", "MYSELF",
    "STEEL_GAMER", "SZS", "AGENTP4", "KAPARKING", "BMAN48", "NIT",
    "ALXROAR", "ENDERLIFE7770", "PENGULITE", "RANGERWILL", "CARRIED",
    "KINGBOYS", "_KEE_", "_WISHRAM_", "JUST_MILES", "DUDEGUY", "IOIO",
    "BANANA_MAN", "FORGBEAR1", "POOTALKER789", "SUSSYBAKA", "WALKINGGHEAD",
    "FART_SAUCE9", "WART", "SINEED", "FRANKIE", "RONIC", "BLACK_JACK",
    "WILLIAM_GREGORY", "LASERFIRE", "F503N", "DR_YEET", "FFFOOST", "NOTAIM",
    "OANEXITY", "EVAN", "ZYPHON", "SAPWN", "SNAIL4", "ZENI", "ZENSER48",
    "WEDRFTGJO", "GEARED", "CAST", "ADOT", "IMOH", "DOSEY", "EDWIN",
    "BYAE", "BYTE", "CALICSIZED", "BUTTKUN", "BLU", "BENJI_YT", "ALRAYS",
    "_1DAM", "FORESTCHAN", "BREEZY", "LOHR", "YEEP", "JACKY", "JAJOONI",
    "MILOSIVIC", "N3GM", "QUENER", "SEA11", "TREES", "WIFI", "XKING",
    "XL_MATTHEW100", "HEADBAND_GUY", "KOYLY", "W0RTH", "SIGSTICK",
  ];

  // Aspect-aware grid: figure cols×rows so it fills the canvas nicely
  const aspect = width / height;
  let cols: number;
  if (aspect > 1.5) cols = 12;       // landscape
  else if (aspect > 0.9) cols = 9;   // square
  else cols = 7;                     // vertical
  const rows = Math.ceil(allMons.length / cols);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #1f1f4a 0%, #0a0a14 70%)",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: 64,
          fontWeight: 900,
          color: "#ffffff",
          opacity: titleOpacity,
          zIndex: 5,
          textShadow: "0 4px 20px rgba(0,0,0,0.8)",
        }}
      >
        Every member. {allMons.length} mons.
      </div>

      {/* The grid itself, transformed for zoom + pan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${panY}px) scale(${zoom})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 14,
            padding: 60,
            width: "100%",
            maxWidth: width * 0.96,
          }}
        >
          {allMons.map((id, i) => {
            // Stagger each sprite's appearance so they "pop in" in waves
            const popStart = (i / allMons.length) * fps * 4; // first 4s
            const sp = spring({
              frame: frame - popStart,
              fps,
              config: { damping: 12, stiffness: 220 },
            });
            const alpha = interpolate(frame, [popStart, popStart + fps * 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tierColors = ["#ffd755", "#7fdcff", "#7fdc6a", "#ff80c0", "#fee75c"];
            const tier = tierColors[i % tierColors.length];
            const cellSize = aspect > 1.5 ? 110 : aspect > 0.9 ? 100 : 120;
            return (
              <div
                key={id + i}
                style={{
                  width: cellSize,
                  height: cellSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  border: `1.5px solid ${tier}`,
                  background: `${tier}1a`,
                  opacity: alpha,
                  transform: `scale(${0.6 + sp * 0.4})`,
                }}
              >
                <MonSprite
                  speciesId={id}
                  size={cellSize - 12}
                  timeOffset={i * 53}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// FeaturedFriends — hero shots of Myself + notaim with their names. Two
// of the harder-to-spot friends; this scene gives them their own moment.
const FeaturedFriends: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const featured = [
    {
      id: "MYSELF",
      name: "Myself",
      flavor: "ELECTRIC CRYSTAL · ADMIN/MOD",
      color: "#5cdcff",
    },
    {
      id: "NOTAIM",
      name: "notaim",
      flavor: "DARK FLUFF · GAMER/BOT",
      color: "#c9a4ff",
    },
  ];

  // Title fades in/out across the 4s scene
  const titleIn = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  const titleOut = interpolate(frame, [fps * 3.4, fps * 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = Math.min(titleIn, titleOut);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a3a 0%, #0a0a14 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: 64,
          fontWeight: 900,
          color: "#ffffff",
          opacity: titleOpacity,
        }}
      >
        Featuring…
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 120,
          marginTop: 60,
        }}
      >
        {featured.map((f, i) => {
          const start = (0.5 + i * 0.5) * fps;
          const sp = spring({
            frame: frame - start,
            fps,
            config: { damping: 12, stiffness: 180 },
          });
          const opacity = interpolate(frame, [start, start + 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(frame, [fps * 3.4, fps * 4], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={f.id}
              style={{
                opacity: opacity * fadeOut,
                transform: `translateY(${(1 - sp) * 60}px) scale(${0.7 + sp * 0.3})`,
                width: 360,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 360,
                  height: 360,
                  background: `radial-gradient(circle at 50% 50%, ${f.color}33 0%, transparent 75%)`,
                  borderRadius: 28,
                  border: `3px solid ${f.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 60px ${f.color}55`,
                }}
              >
                <MonSprite speciesId={f.id} size={280} timeOffset={i * 263} />
              </div>
              <div
                style={{
                  marginTop: 22,
                  fontFamily: "Inter",
                  fontSize: 56,
                  fontWeight: 900,
                  color: f.color,
                  letterSpacing: -0.5,
                }}
              >
                {f.name}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: "#a4b3c8",
                  letterSpacing: 1,
                }}
              >
                {f.flavor}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const BattleHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sl = spring({ frame, fps, config: { damping: 15, stiffness: 200 } });

  // Cycle through gym leaders + the champion (Karl) every 0.6s
  const bosses = ["SAPWN", "LSM253", "RONIC", "DR_YEET", "POOTALKER789", "CHRISTIAN", "KARL"];
  const cycleFrame = Math.floor(frame / (fps * 0.6));
  const boss = bosses[cycleFrame % bosses.length];

  // Player side cycles among funny mons too
  const playerSide = ["NOTALI", "MXRIO", "STEEL", "AGENTP4", "BANANA_MAN"];
  const player = playerSide[cycleFrame % playerSide.length];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #5865f2 0%, #1a1a3a 100%)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "0 100px",
          fontFamily: "Inter",
          color: "#ffffff",
          gap: 80,
        }}
      >
        <div style={{ transform: `translateX(${(1 - sl) * -200}px)` }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: "#ffd755" }}>FIGHT</div>
          <div style={{ fontSize: 40, marginTop: 12, color: "#a4b3c8", fontFamily: "monospace" }}>
            SPEAR THRUST · IRON PICKAXE · BAN HAMMER · SHRINK RAY
          </div>
          <div style={{ fontSize: 28, marginTop: 30, color: "#7fdc6a", fontFamily: "monospace" }}>
            HOPLITE WEAPONS + MINECRAFT GEAR
          </div>
          <div style={{ fontSize: 28, marginTop: 6, color: "#7fdc6a", fontFamily: "monospace" }}>
            TYPE-MATCH FOR 2× DAMAGE
          </div>
          {/* mini player sprite chip */}
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 96,
                height: 96,
                background: "rgba(255,215,85,0.12)",
                border: "2px solid #ffd755",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MonSprite speciesId={player} size={84} timeOffset={71} />
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 22, color: "#ffd755" }}>
              YOUR TEAM
            </div>
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${(1 - sl) * 200}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16,
            }}
          >
            <MonSprite speciesId={boss} size={280} timeOffset={frame} />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
            ENEMY · {boss}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 12, stiffness: 180 } });
  const playUrl = "monkeyguildmon.pages.dev";
  const codeUrl = "github.com/bendawg2010/monkeyguildmon";
  const urlOpacity = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const codeOpacity = interpolate(frame, [fps * 1.0, fps * 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [fps * 1.6, fps * 2.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 50%, #1a1a3a 0%, #000 80%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontSize: 160,
          fontWeight: 900,
          letterSpacing: -6,
          background: "linear-gradient(180deg, #ffd755 0%, #ff9020 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${0.5 + sp * 0.5})`,
        }}
      >
        MONKEYGUILDMON
      </div>
      <div
        style={{
          opacity: urlOpacity,
          marginTop: 24,
          padding: "18px 56px",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: 100,
          border: "2px solid rgba(255,203,5,0.8)",
          fontFamily: "monospace",
          fontSize: 48,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{
          width: 18, height: 18, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fff5b3 0%, #ffcb05 45%, #ff8a00 100%)",
          boxShadow: "0 0 10px rgba(255,203,5,0.8)",
        }} />
        ▶ {playUrl}
      </div>
      <div
        style={{
          opacity: codeOpacity,
          marginTop: 16,
          padding: "12px 40px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          borderRadius: 100,
          border: "2px solid rgba(127,220,255,0.6)",
          fontFamily: "monospace",
          fontSize: 32,
          fontWeight: 700,
          color: "#dceaff",
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 30 }}>{"</>"}</span>
        {codeUrl}
      </div>
      <div
        style={{
          opacity: taglineOpacity,
          marginTop: 22,
          fontSize: 28,
          fontWeight: 400,
          color: "#a4b3c8",
          letterSpacing: 2,
        }}
      >
        AVAILABLE NOW · FREE · NO INSTALL · OPEN SOURCE
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 16,
          color: "#5a6378",
          letterSpacing: 1,
          opacity: taglineOpacity,
        }}
      >
        Music: RezaDead × prodcrucial — "PRETEND" · NCS Release
      </div>
    </AbsoluteFill>
  );
};

const UrlWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const endStart = durationInFrames - 4 * fps;
  const opacity = interpolate(
    frame,
    [fps * 0.6, fps * 1.4, endStart - fps * 0.3, endStart],
    [0, 0.92, 0.92, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <>
      {/* Play URL — bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 28,
          opacity,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0,0,0,0.62)",
          backdropFilter: "blur(6px)",
          padding: "10px 18px",
          borderRadius: 100,
          border: "1px solid rgba(255,203,5,0.6)",
          fontFamily: "monospace",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fff5b3 0%, #ffcb05 45%, #ff8a00 100%)",
            boxShadow: "0 0 8px rgba(255,203,5,0.8)",
          }}
        />
        ▶ monkeyguildmon.pages.dev
      </div>
      {/* Source URL — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 28,
          opacity,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0,0,0,0.62)",
          backdropFilter: "blur(6px)",
          padding: "10px 18px",
          borderRadius: 100,
          border: "1px solid rgba(127,220,255,0.5)",
          fontFamily: "monospace",
          color: "#dceaff",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: 18 }}>{"</>"}</span>
        github.com/bendawg2010/monkeyguildmon
      </div>
    </>
  );
};

// ---------- INLINE PIXEL SPRITES (CSS, not canvas) ----------

// Ali — fat blob with smiley face logo
const AliSprite: React.FC<{ big?: boolean }> = ({ big }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame * 0.12) * 4;
  const size = big ? 320 : 220;
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transform: `translateY(${bob}px)`,
      }}
    >
      {/* belly */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "40%",
          width: "76%",
          height: "55%",
          borderRadius: "50%",
          background: "#f0d8a0",
          boxShadow: "inset -10px -10px 20px rgba(160,112,80,0.4)",
        }}
      />
      {/* head */}
      <div
        style={{
          position: "absolute",
          left: "26%",
          top: "8%",
          width: "48%",
          height: "44%",
          borderRadius: "50%",
          background: "#f0d8a0",
        }}
      />
      {/* smiley logo plate */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "14%",
          width: "40%",
          height: "32%",
          borderRadius: "50%",
          background: "#1a1a1c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: size * 0.06, marginBottom: size * 0.02 }}>
          <div style={{ width: size * 0.05, height: size * 0.05, borderRadius: "50%", background: "#fff" }} />
          <div style={{ width: size * 0.05, height: size * 0.05, borderRadius: "50%", background: "#fff" }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "24%",
            transform: "translateX(-50%)",
            width: size * 0.18,
            height: size * 0.10,
            border: `${size * 0.022}px solid #fff`,
            borderTop: "0",
            borderRadius: "0 0 100px 100px",
          }}
        />
      </div>
    </div>
  );
};

// Mario-style starter
const MxrioSprite: React.FC = () => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame * 0.15) * 3;
  return (
    <div style={{ width: 220, height: 220, position: "relative", transform: `translateY(${bob}px)` }}>
      {/* overalls body */}
      <div style={{ position: "absolute", left: "26%", top: "44%", width: "48%", height: "38%", background: "#1a3aaa", borderRadius: "10px 10px 18px 18px" }} />
      {/* skin face */}
      <div style={{ position: "absolute", left: "30%", top: "20%", width: "40%", height: "32%", background: "#ffd9a0", borderRadius: "50%" }} />
      {/* red cap */}
      <div style={{ position: "absolute", left: "26%", top: "12%", width: "48%", height: "16%", background: "#ed4245", borderRadius: "100px 100px 0 0" }} />
      {/* cap brim */}
      <div style={{ position: "absolute", left: "20%", top: "26%", width: "60%", height: "5%", background: "#ed4245", borderRadius: "4px" }} />
      {/* M circle */}
      <div
        style={{
          position: "absolute",
          left: "44%",
          top: "14%",
          width: "12%",
          height: "12%",
          background: "#fff",
          borderRadius: "50%",
          color: "#ed4245",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        M
      </div>
      {/* mustache */}
      <div style={{ position: "absolute", left: "32%", top: "40%", width: "36%", height: "5%", background: "#3a2010", borderRadius: 4 }} />
      {/* eyes */}
      <div style={{ position: "absolute", left: "38%", top: "32%", width: "5%", height: "6%", background: "#1a1a1a", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: "57%", top: "32%", width: "5%", height: "6%", background: "#1a1a1a", borderRadius: "50%" }} />
    </div>
  );
};

// Steel armor knight
const SteelSprite: React.FC = () => {
  const frame = useCurrentFrame();
  const glint = (Math.sin(frame * 0.18) + 1) / 2;
  return (
    <div style={{ width: 220, height: 220, position: "relative" }}>
      {/* armor body */}
      <div
        style={{
          position: "absolute",
          left: "22%",
          top: "32%",
          width: "56%",
          height: "55%",
          background: "linear-gradient(135deg, #c8c8d8 0%, #6a6a78 50%, #c8c8d8 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: `${glint * 100}% ${glint * 100}%`,
          borderRadius: "20px 20px 30px 30px",
          border: "3px solid #3a3e44",
        }}
      />
      {/* helm */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "10%",
          width: "40%",
          height: "30%",
          background: "linear-gradient(180deg, #c8c8d8 0%, #6a6a78 100%)",
          borderRadius: "40px 40px 8px 8px",
          border: "3px solid #3a3e44",
        }}
      />
      {/* visor slit */}
      <div style={{ position: "absolute", left: "36%", top: "26%", width: "28%", height: "5%", background: "#5fc8ff", boxShadow: "0 0 8px #5fc8ff" }} />
      {/* plume */}
      <div style={{ position: "absolute", left: "44%", top: "0%", width: "12%", height: "14%", background: "#ed4245", borderRadius: "50% 50% 4px 4px" }} />
      {/* sword (right side) */}
      <div style={{ position: "absolute", left: "78%", top: "20%", width: "5%", height: "60%", background: "#dadcee" }} />
      <div style={{ position: "absolute", left: "73%", top: "62%", width: "15%", height: "4%", background: "#a07050" }} />
    </div>
  );
};

// Banana_Man for the battle hero scene
const BananaSprite: React.FC<{ big?: boolean }> = ({ big }) => {
  const frame = useCurrentFrame();
  const wiggle = Math.sin(frame * 0.1) * 6;
  const size = big ? 320 : 200;
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `rotate(${wiggle}deg)` }}>
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "10%",
          width: "80%",
          height: "80%",
          background: "linear-gradient(135deg, #fee75c 0%, #ffeb8a 50%, #f5b020 100%)",
          borderRadius: "70% 30% 50% 50% / 60% 40% 60% 40%",
          transform: "rotate(-30deg)",
          boxShadow: "inset -10px -10px 20px rgba(160,112,80,0.3)",
        }}
      />
      {/* monkey face */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "40%",
          width: "40%",
          height: "30%",
          background: "#7a4828",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "70%", height: "65%", background: "#f5d59a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: size * 0.13, fontFamily: "monospace", marginTop: -size * 0.02 }}>·.·</div>
        </div>
      </div>
    </div>
  );
};

// Generic enemy used in the Ali gag
const EnemySprite: React.FC = () => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame * 0.14) * 4;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", transform: `translateY(${bob}px)` }}>
      {/* generic newbie */}
      <div style={{ position: "absolute", left: "20%", top: "30%", width: "60%", height: "55%", background: "#57f287", borderRadius: "40% 40% 30% 30%" }} />
      <div style={{ position: "absolute", left: "30%", top: "16%", width: "40%", height: "30%", background: "#fee75c", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: "40%", top: "30%", width: "5%", height: "5%", background: "#1a1a1a", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: "55%", top: "30%", width: "5%", height: "5%", background: "#1a1a1a", borderRadius: "50%" }} />
    </div>
  );
};

// Floating Z's for the Ali sleep gag
const FloatingZzz: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        const opacity = 1 - t;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              right: "5%",
              top: `${15 - t * 30}%`,
              fontFamily: "monospace",
              fontSize: 60 + i * 14,
              color: `rgba(160, 180, 220, ${opacity})`,
              fontWeight: 900,
            }}
          >
            z
          </div>
        );
      })}
    </>
  );
};

// Shrink ray beam from Ali to enemy
const ShrinkRayBeam: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < 0) return null;
  const opacity = interpolate(frame, [0, fps * 0.3, fps * 1.4, fps * 1.7], [0, 1, 1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        right: "-200%",
        top: "30%",
        width: "200%",
        height: "16%",
        background: "linear-gradient(90deg, #5fc8ff, #ffd755, #5fc8ff)",
        opacity,
        boxShadow: "0 0 40px #5fc8ff",
        borderRadius: 8,
      }}
    />
  );
};
