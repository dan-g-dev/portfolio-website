import { useEffect, type RefObject } from "react";

/**
 * Fades children marked [data-reveal] in once as they enter the viewport.
 * IntersectionObserver only (no scroll listeners). Skipped for reduced motion,
 * and content stays visible if JS or the observer is unavailable.
 */
export function useReveal(ref: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    root.classList.add("reveal-ready");
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [ref]);
}
