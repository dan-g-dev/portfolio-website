import { useEffect, useRef, useState } from "react";
import { FrameStore } from "../../lib/FrameStore";
import { coverRect, documentScrollProgress, progressToFrame } from "../../lib/frameMath";
import { useMediaQuery, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import "./PortraitBackground.css";

export type FrameTier = "lg" | "md";

export interface PortraitBackgroundProps {
  frameCount?: number;
  /** URL for a 0-based frame index at a quality tier. Keep referentially stable. */
  frameUrl?: (index: number, tier: FrameTier) => string;
  /** Static frame used before frames load, for reduced motion and on failure. */
  posterIndex?: number;
  focalPoint?: { x: number; y: number };
  /** Per-frame easing toward the scroll position (0..1). */
  smoothing?: number;
  crossfade?: boolean;
}

const defaultFrameUrl = (index: number, tier: FrameTier): string =>
  `${import.meta.env.BASE_URL}portrait-frames/${tier}/frame-${String(index + 1).padStart(4, "0")}.webp`;

/**
 * ONE persistent, fixed, click-through canvas behind the whole page. Frame =
 * whole-document scroll progress, so it never restarts at section boundaries.
 * One scroll listener, no React state on scroll.
 */
export function PortraitBackground({
  frameCount = 240,
  frameUrl = defaultFrameUrl,
  posterIndex = 0,
  focalPoint = { x: 0.5, y: 0.5 },
  smoothing = 0.12,
  crossfade = true,
}: PortraitBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = usePrefersReducedMotion();
  const small = useMediaQuery("(max-width: 820px)");
  const tier: FrameTier = small ? "md" : "lg"; // md = lighter decode cost on phones/tablets
  const [failed, setFailed] = useState(false);
  const animated = !reducedMotion && !failed;

  const live = useRef({ smoothing, crossfade, focalPoint, frameUrl });
  live.current = { smoothing, crossfade, focalPoint, frameUrl };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!animated || !root || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      setFailed(true);
      return;
    }

    let raf = 0;
    let last = 0;
    let disposed = false;
    const readTarget = () => progressToFrame(documentScrollProgress(), frameCount);
    let target = readTarget();
    let current = target;
    let dirty = false; // set by scroll/resize; document metrics are read once per frame, not per event

    const schedule = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(tick);
    };

    const store = new FrameStore({
      count: frameCount,
      urlFor: (i) => live.current.frameUrl(i, tier),
      onChange: schedule,
      onFatal: () => !disposed && setFailed(true),
    });

    const paint = (frame: { image: CanvasImageSource; width: number; height: number }, alpha: number) => {
      const { x, y } = live.current.focalPoint;
      const r = coverRect(frame.width, frame.height, canvas.width, canvas.height, x, y);
      ctx.globalAlpha = alpha;
      ctx.drawImage(frame.image, r.x, r.y, r.w, r.h);
    };

    const draw = () => {
      if (!canvas.width || !canvas.height) return;
      store.setFocus(Math.round(current));
      const lo = Math.floor(current);
      const hi = Math.min(frameCount - 1, lo + 1);
      const f = current - lo;
      const base = store.nearest(lo);
      if (!base) return; // poster stays visible until a frame is decoded
      paint(base, 1);
      if (live.current.crossfade && f > 0.01 && base === store.get(lo)) {
        const next = store.get(hi);
        if (next) paint(next, f);
      }
      ctx.globalAlpha = 1;
      if (canvas.dataset.ready !== "true") canvas.dataset.ready = "true";
    };

    function tick(now: number) {
      raf = 0;
      if (dirty) {
        target = readTarget();
        dirty = false;
      }
      const dt = last ? Math.min(now - last, 64) : 16.667;
      last = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.002) current = target;
      else current += diff * (1 - Math.pow(1 - live.current.smoothing, dt / 16.667));
      draw();
      if (current !== target) raf = requestAnimationFrame(tick);
      else last = 0;
    }

    const refreshTarget = () => {
      dirty = true;
      schedule();
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      target = readTarget();
      draw(); // synchronous: resizing clears the canvas
      if (current !== target) schedule();
    };

    // Viewport size -> canvas size. Content/document height -> recompute progress.
    const viewRO = new ResizeObserver(resizeCanvas);
    viewRO.observe(root);
    const docRO = new ResizeObserver(refreshTarget);
    docRO.observe(document.documentElement);
    docRO.observe(document.body);

    window.addEventListener("scroll", refreshTarget, { passive: true });
    window.addEventListener("load", refreshTarget);
    resizeCanvas();
    void store.start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", refreshTarget);
      window.removeEventListener("load", refreshTarget);
      viewRO.disconnect();
      docRO.disconnect();
      store.dispose();
      delete canvas.dataset.ready;
    };
  }, [animated, frameCount, tier, small]);

  return (
    <>
      <div ref={rootRef} className="pbg" aria-hidden="true">
        <img
          className="pbg__poster"
          src={frameUrl(posterIndex, tier)}
          alt=""
          draggable={false}
          style={{ objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%` }}
        />
        {animated && <canvas ref={canvasRef} className="pbg__canvas" />}
      </div>
      {/* The ONE dark translucent layer for the whole site: above the portrait, below all content. */}
      <div className="pbg-veil" aria-hidden="true">
        <div className="pbg-veil__tint" />
        <div className="pbg-veil__glow" />
        <div className="pbg-veil__scrim" />
      </div>
    </>
  );
}

export default PortraitBackground;
