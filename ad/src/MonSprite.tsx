/**
 * MonSprite — renders any monkeyguildmon species sprite live via the
 * actual game's drawMon() function on a <canvas>.
 *
 * Loads the game scripts (data.js, sprites.js, extra_sprites.js) once
 * per render via delayRender, then on every frame redraws the canvas
 * with the current Remotion frame translated into the game's `time`.
 *
 * This makes the ad consistent with the actual game — every PFP-matched
 * sprite the user sees in the ad is the same one they'll see in the
 * game.
 */
import {
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React, { useEffect, useRef, useState } from "react";

// Window globals exposed by the loaded game scripts.
declare global {
  interface Window {
    SpriteRenderer?: {
      drawMon: (
        ctx: CanvasRenderingContext2D,
        speciesId: string,
        x: number,
        y: number,
        size: number,
        time: number
      ) => void;
    };
    SPECIES?: Record<string, unknown>;
    FRIENDS?: unknown[];
    drawMon?: (
      ctx: CanvasRenderingContext2D,
      speciesId: string,
      x: number,
      y: number,
      size: number,
      time: number
    ) => void;
    __mgmExtraSprites?: Record<string, unknown>;
    __mgmGameScriptsReady?: Promise<void>;
  }
}

/**
 * Singleton script loader — loads the game scripts once, then injects an
 * inline classic <script> that copies the script-scope `const`s
 * (SpriteRenderer, SPECIES, FRIENDS) onto `window`. Necessary because
 * webpack-bundled components live in module scope and can't see top-level
 * `const` from classic scripts.
 */
function loadGameScripts(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.__mgmGameScriptsReady) return window.__mgmGameScriptsReady;
  window.__mgmGameScriptsReady = (async () => {
    const scripts = [
      "game/data.js",
      "game/sprites.js",
      "game/extra_sprites.js",
    ];
    for (const src of scripts) {
      await new Promise<void>((res, rej) => {
        const s = document.createElement("script");
        s.src = staticFile(src);
        s.async = false;
        s.onload = () => res();
        s.onerror = () => rej(new Error(`failed: ${src}`));
        document.head.appendChild(s);
      });
    }
    // Bridge: classic-script top-level `const`s aren't on window. This
    // inline classic <script> runs in the same scope as the loaded
    // scripts, so it can see them and re-expose them on window.
    await new Promise<void>((res, rej) => {
      const bridge = document.createElement("script");
      bridge.text = `
        try {
          if (typeof SpriteRenderer !== "undefined") {
            window.SpriteRenderer = SpriteRenderer;
            window.drawMon = SpriteRenderer.drawMon.bind(SpriteRenderer);
          }
          if (typeof SPECIES !== "undefined") window.SPECIES = SPECIES;
          if (typeof FRIENDS !== "undefined") window.FRIENDS = FRIENDS;
          window.__mgmBridgeOk = true;
        } catch (e) {
          window.__mgmBridgeError = e && e.message;
        }
      `;
      bridge.onload = () => res();
      bridge.onerror = () => rej(new Error("bridge script failed"));
      document.head.appendChild(bridge);
      // Inline scripts execute synchronously on append; resolve next tick
      setTimeout(() => res(), 0);
    });
    if (!window.drawMon) {
      // eslint-disable-next-line no-console
      console.error(
        "MonSprite bridge: window.drawMon not set. Bridge error:",
        // @ts-expect-error debug only
        window.__mgmBridgeError
      );
    }
  })();
  return window.__mgmGameScriptsReady;
}

interface MonSpriteProps {
  speciesId: string;
  /** Canvas pixel size — defaults to 128. */
  size?: number;
  /** Optional inline style override. */
  style?: React.CSSProperties;
  /** Optional time offset (ms) so paired sprites don't bob in sync. */
  timeOffset?: number;
}

/**
 * GameScriptsLoader — ONE instance of this component should be mounted
 * near the top of the ad. It owns the single delayRender handle for
 * loading the game scripts. MonSprite instances DON'T call delayRender
 * themselves — they just check if `window.drawMon` is available and
 * draw if it is. Without this, mounting 240+ MonSprites each with their
 * own delayRender creates so many handles that Remotion frame-render
 * times explode and hit the 30s timeout.
 */
export const GameScriptsLoader: React.FC = () => {
  const [, setReady] = useState(false);
  const [handle] = useState(() => delayRender("game-scripts:loader"));

  useEffect(() => {
    let cancelled = false;
    loadGameScripts()
      .then(() => {
        if (cancelled) return;
        setReady(true);
        continueRender(handle);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error("GameScriptsLoader: failed to load", e);
        continueRender(handle);
      });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return null;
};

export const MonSprite: React.FC<MonSpriteProps> = ({
  speciesId,
  size = 128,
  style,
  timeOffset = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Subscribe to the singleton load promise without delayRender — when
  // scripts finish loading we flip `ready` to trigger a redraw.
  const [ready, setReady] = useState<boolean>(() => Boolean(window.drawMon));

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    loadGameScripts()
      .then(() => {
        if (cancelled) return;
        if (window.drawMon) setReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    if (!window.drawMon) return;
    const time = (frame / fps) * 1000 + timeOffset;
    try {
      window.drawMon(ctx, speciesId, 0, 0, size, time);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("drawMon failed for", speciesId, e);
    }
  }, [ready, frame, fps, size, speciesId, timeOffset]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        display: "block",
        ...style,
      }}
    />
  );
};

export default MonSprite;
