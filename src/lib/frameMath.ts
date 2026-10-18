export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

/**
 * Normalised progress (0..1) through the WHOLE document:
 *   progress = scrollY / (documentHeight - viewportHeight)
 * Clamped; 0 when the page has no scrollable height; snaps to exactly 1
 * within 1px of the bottom so fractional scroll positions still reach the last frame.
 */
export function progressFromMetrics(
  scrollY: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  const max = documentHeight - viewportHeight;
  if (!(max > 1)) return 0;
  if (scrollY >= max - 1) return 1;
  return clamp(scrollY / max, 0, 1);
}

/** Reads live document metrics (layout viewport height, stable on mobile URL-bar changes). */
export function documentScrollProgress(): number {
  const doc = document.documentElement;
  const height = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0);
  const viewport = doc.clientHeight || window.innerHeight;
  return progressFromMetrics(window.scrollY, height, viewport);
}

/** Maps progress (0..1) to a fractional frame index (0..count-1). */
export const progressToFrame = (progress: number, count: number): number =>
  clamp(progress, 0, 1) * Math.max(0, count - 1);

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** "object-fit: cover" geometry; keeps aspect ratio, `fx`/`fy` pick the kept area. */
export function coverRect(
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number,
  fx = 0.5,
  fy = 0.5,
): Rect {
  const scale = Math.max(dstW / srcW, dstH / srcH);
  const w = srcW * scale;
  const h = srcH * scale;
  return { x: (dstW - w) * fx, y: (dstH - h) * fy, w, h };
}
