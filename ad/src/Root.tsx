import { Composition } from "remotion";
import { MonkeyGuildAd } from "./MonkeyGuildAd";

const FPS = 30;
const MGM_FRAMES = 30 * FPS; // 30 seconds

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
