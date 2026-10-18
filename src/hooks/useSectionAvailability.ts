import { useEffect, useState } from "react";

/**
 * Which of the given section ids currently exist in the DOM. Links to sections
 * that are not built yet stay inert instead of pointing at a broken anchor, and
 * switch on automatically once a later step renders an element with that id.
 */
export function useSectionAvailability(ids: readonly string[]): ReadonlySet<string> {
  const [available, setAvailable] = useState<ReadonlySet<string>>(() => new Set());
  const key = ids.join("|");

  useEffect(() => {
    const check = () => {
      const next = new Set(key.split("|").filter((id) => document.getElementById(id)));
      setAvailable((prev) =>
        prev.size === next.size && [...next].every((id) => prev.has(id)) ? prev : next,
      );
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [key]);

  return available;
}
