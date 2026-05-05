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

/** Singleton script loader — only loads game scripts once. */
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

export const MonSprite: React.FC<MonSpriteProps> = ({
  speciesId,
  size = 128,
  style,
  timeOffset = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender(`game-scripts:${speciesId}`));

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
        console.error("MonSprite: failed to load game scripts", e);
        continueRender(handle);
      });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    const time = (frame / fps) * 1000 + timeOffset;
    try {
      window.drawMon?.(ctx, speciesId, 0, 0, size, time);
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
