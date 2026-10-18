import { useEffect, useState } from "react";
import { SECTIONS } from "../../config/sections";
import { SectionLink } from "../SectionLink/SectionLink";
import "./Nav.css";

export function Nav({ available, active }: { available: ReadonlySet<string>; active: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <a className="nav__brand" href="#home" onClick={() => setOpen(false)}>
        Daniel Girma
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <nav id="nav-links" className={`nav__links${open ? " is-open" : ""}`} aria-label="Primary">
        <ul>
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <SectionLink
                id={id}
                available={available.has(id)}
                className="nav__link"
                current={active === id}
                onNavigate={() => setOpen(false)}
              >
                {label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
