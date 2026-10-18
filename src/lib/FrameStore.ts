/**
 * Asset loading for the frame sequence. No React, no rendering.
 *
 * Strategy (keeps memory and main-thread work bounded):
 *  1. Frame 0 is fetched first, then every `keyStep`-th frame, then the rest,
 *     in the background with limited concurrency.
 *  2. Fetched frames are kept as compressed Blobs (small).
 *  3. Only keyframes plus a window of `windowRadius` frames around the current
 *     frame are decoded to bitmaps; everything else is decoded on demand and
 *     evicted again. A full-size decoded sequence would need gigabytes.
 *  4. `nearest()` always returns the closest decoded frame, so the canvas never
 *     goes blank while the window catches up.
 */
export interface DecodedFrame {
  image: CanvasImageSource;
  width: number;
  height: number;
  close(): void;
}

export interface FrameStoreOptions {
  count: number;
  urlFor: (index: number) => string;
  keyStep?: number;
  windowRadius?: number;
  concurrency?: number;
  onChange: () => void;
  onFatal: () => void;
}

async function decode(blob: Blob): Promise<DecodedFrame> {
  if (typeof createImageBitmap === "function") {
    const bmp = await createImageBitmap(blob);
    return { image: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return { image: img, width: img.naturalWidth, height: img.naturalHeight, close: () => {} };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export class FrameStore {
  private readonly count: number;
  private readonly urlFor: (i: number) => string;
  private readonly keyStep: number;
  private readonly radius: number;
  private readonly concurrency: number;
  private readonly onChange: () => void;
  private readonly onFatal: () => void;

  private blobs: (Blob | undefined)[];
  private decoded = new Map<number, DecodedFrame>();
  private decoding = new Set<number>();
  private failed = new Set<number>();
  private controller = new AbortController();
  private focus = 0;
  private disposed = false;
  private fatalSent = false;

  constructor(opts: FrameStoreOptions) {
    this.count = opts.count;
    this.urlFor = opts.urlFor;
    this.keyStep = opts.keyStep ?? 16;
    this.radius = opts.windowRadius ?? 6;
    this.concurrency = opts.concurrency ?? 6;
    this.onChange = opts.onChange;
    this.onFatal = opts.onFatal;
    this.blobs = new Array(opts.count);
  }

  private isKey = (i: number): boolean => i % this.keyStep === 0 || i === this.count - 1;

  private fatal(): void {
    if (this.fatalSent || this.disposed) return;
    this.fatalSent = true;
    this.onFatal();
  }

  private markFailed(i: number): void {
    this.failed.add(i);
    if (i === 0 || this.failed.size > this.count * 0.25) this.fatal();
  }

  async start(): Promise<void> {
    await this.load(0);
    const keys: number[] = [];
    const rest: number[] = [];
    for (let i = 1; i < this.count; i++) (this.isKey(i) ? keys : rest).push(i);
    const order = [...keys, ...rest];
    let next = 0;
    const worker = async () => {
      while (!this.disposed) {
        const idx = order[next++];
        if (idx === undefined) return;
        await this.load(idx);
      }
    };
    await Promise.all(Array.from({ length: this.concurrency }, worker));
  }

  private async load(i: number): Promise<void> {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(this.urlFor(i), { signal: this.controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        this.blobs[i] = await res.blob();
        this.decodeIfNeeded(i);
        return;
      } catch {
        if (this.disposed) return;
      }
    }
    this.markFailed(i);
  }

  private decodeIfNeeded(i: number): void {
    const blob = this.blobs[i];
    if (this.disposed || !blob || this.decoded.has(i) || this.decoding.has(i)) return;
    if (!this.isKey(i) && Math.abs(i - this.focus) > this.radius) return;
    this.decoding.add(i);
    decode(blob)
      .then((frame) => {
        this.decoding.delete(i);
        if (this.disposed || (!this.isKey(i) && Math.abs(i - this.focus) > this.radius + 2)) {
          frame.close();
          return;
        }
        this.decoded.set(i, frame);
        this.onChange();
      })
      .catch(() => {
        this.decoding.delete(i);
        this.markFailed(i);
      });
  }

  /** Tell the store which frame is current so it can decode/evict around it. */
  setFocus(i: number): void {
    if (i === this.focus) return;
    this.focus = i;
    for (const [k, frame] of this.decoded) {
      if (!this.isKey(k) && Math.abs(k - i) > this.radius + 2) {
        frame.close();
        this.decoded.delete(k);
      }
    }
    for (let j = Math.max(0, i - this.radius); j <= Math.min(this.count - 1, i + this.radius); j++) {
      this.decodeIfNeeded(j);
    }
  }

  get(i: number): DecodedFrame | undefined {
    return this.decoded.get(i);
  }

  /** Closest decoded frame to `i`, so we never draw nothing. */
  nearest(i: number): DecodedFrame | undefined {
    for (let d = 0; d < this.count; d++) {
      const f = this.decoded.get(i - d) ?? this.decoded.get(i + d);
      if (f) return f;
    }
    return undefined;
  }

  dispose(): void {
    this.disposed = true;
    this.controller.abort();
    this.decoded.forEach((f) => f.close());
    this.decoded.clear();
    this.decoding.clear();
    this.blobs = [];
  }
}
