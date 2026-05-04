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

      {/* SCENE 5: FRIEND PARADE (17–23s) */}
      <Sequence from={17 * fps} durationInFrames={6 * fps}>
        <FriendParade />
      </Sequence>

      {/* SCENE 6: BATTLE HERO (23–26s) */}
      <Sequence from={23 * fps} durationInFrames={3 * fps}>
        <BattleHero />
      </Sequence>

      {/* SCENE 7: END CARD (26–30s) */}
      <Sequence from={26 * fps} durationInFrames={4 * fps}>
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
    { name: "ali", flavor: "GIVE UP. WAIT. STRIKE.", color: "#f0d8a0", spr: <AliSprite /> },
    { name: "mxrio", flavor: "RED CAP. BIG JUMPS.", color: "#ed4245", spr: <MxrioSprite /> },
    { name: "steel", flavor: "DENTS BUT DOES NOT BREAK.", color: "#9aa0a8", spr: <SteelSprite /> },
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
                {s.spr}
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
        <div style={{ width: 340, height: 340, position: "relative" }}>
          <AliSprite big />
          {beat < 2 && <FloatingZzz frame={frame} />}
          {beat === 2 && <ShrinkRayBeam frame={frame - 4 * fps} fps={fps} />}
        </div>

        {/* enemy — gets smaller in beat 2 */}
        <div
          style={{
            width: 220,
            height: 220,
            position: "relative",
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
          <EnemySprite />
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

  const friends = [
    "ali", "mxrio", "Steel", "Karl", "Christian", "LSM253", "Myself", "Steel (wild)",
    "szs", "AgentP4", "Kaparking", "Bman48", "Nit", "Alxroar", "enderlife7770",
    "Pengulite", "RangerWill", "CARRIED IN MAC", "Kingboys", "_Kee_", "_WishRam_",
    "Just Miles", "Dudeguy", "ioio", "Banana_Man", "forgbear1", "pootalker789",
    "sussybaka", "walkingghead", "Fart_sauce9", "wart", "Sineed", "frankie",
    "ronic", "Black Jack", "William Gregory", "LaserFire", "F503N", "dr.yeet",
    "Fffoost", "notaim", "oAnexity", "Evan", "zyphon_.", "sapwn", "Snail4",
    "Zeni :3", "zenser48", "wedrftgjo", "geared", "Cast", "Adot", "imoh",
    "dOsey", "Edwin", "byae", "Byte", "calicsized", "buttkun", "blu",
    "Benji YT", "alrays", "1dam", "Forestchan", "breezy", "Løhr", "Yeep",
    "Jacky", "Jajooni", "Milosivic", "N3gm", "quener", "sea11", "Trees",
    "wifi", "xking", "XL_MATTHEW100", "headband guy", "Koyly :()", "W0rth",
  ];
  const tiers = ["#ffd755", "#7fdcff", "#7fdc6a", "#ff80c0", "#fee75c"];

  // 3 rows scrolling at different speeds
  const rows = [friends.slice(0, 26), friends.slice(26, 52), friends.slice(52)];
  const speeds = [-300, 280, -260];

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
            <div key={ri} style={{ position: "relative", height: 120, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  position: "absolute",
                  left: ri % 2 === 0 ? offset : (offset + width),
                  top: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {[...row, ...row, ...row].map((name, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "20px 32px",
                      borderRadius: 100,
                      border: `2px solid ${tiers[i % tiers.length]}`,
                      background: `${tiers[i % tiers.length]}22`,
                      fontFamily: "monospace",
                      fontSize: 40,
                      fontWeight: 700,
                      color: tiers[i % tiers.length],
                    }}
                  >
                    {name}
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

const BattleHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sl = spring({ frame, fps, config: { damping: 15, stiffness: 200 } });

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
        </div>
        <div
          style={{
            transform: `translateX(${(1 - sl) * 200}px)`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 320, height: 320 }}>
            <BananaSprite big />
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
