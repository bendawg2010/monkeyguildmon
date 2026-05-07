import { Composition } from "remotion";
import { MonkeyGuildAd } from "./MonkeyGuildAd";

const FPS = 30;
// Extended duration so FriendParade, BigGrid, and the new Featured
// Friends scene (MYSELF + NOTAIM hero shots) all fit cleanly.
const MGM_FRAMES = 64 * FPS; // 64 seconds

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Primary 30-second monkeyguildmon launch ad — landscape */}
      <Composition
        id="MonkeyGuildAd"
        component={MonkeyGuildAd}
        durationInFrames={MGM_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* 9:16 vertical cut for TikTok / Reels / Shorts. Same scenes,
          AbsoluteFill reflows to portrait. */}
      <Composition
        id="MonkeyGuildAdVertical"
        component={MonkeyGuildAd}
        durationInFrames={MGM_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      {/* Square cut for Instagram feed posts. */}
      <Composition
        id="MonkeyGuildAdSquare"
        component={MonkeyGuildAd}
        durationInFrames={MGM_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
