import type { ReactNode } from "react";

interface SectionLinkProps {
  id: string;
  available: boolean;
  className?: string;
  current?: boolean;
  children: ReactNode;
  onNavigate?: () => void;
}

/** A real anchor when the target exists; otherwise a disabled button (no broken anchor). */
export function SectionLink({ id, available, className = "", current, children, onNavigate }: SectionLinkProps) {
  if (available) {
    return (
      <a className={className} href={`#${id}`} aria-current={current ? "true" : undefined} onClick={onNavigate}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={`${className} is-disabled`} disabled title="Coming soon">
      {children}
    </button>
  );
}
