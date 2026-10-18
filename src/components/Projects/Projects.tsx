import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../../data/projects";
import { useReveal } from "../../hooks/useReveal";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectShowcase } from "./ProjectShowcase";
import "./Projects.css";

const HASH_PREFIX = "#project-";
const LABELS = ["Full-Stack Development", "Web Applications", "Problem Solving"] as const;

/**
 * Gallery + detail dialog. Opening a project pushes a history entry
 * (#project-<id>) so the browser Back button closes it; a direct link to
 * #project-<id> opens it on load.
 */
export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  const pushed = useRef(false);
  useReveal(ref);

  const set = useCallback((id: string | null) => {
    activeRef.current = id;
    setActiveId(id);
  }, []);

  const open = useCallback(
    (id: string) => {
      window.history.pushState({ project: id }, "", `${HASH_PREFIX}${id}`);
      pushed.current = true;
      set(id);
    },
    [set],
  );

  const close = useCallback(() => {
    if (!activeRef.current) return; // already closed (idempotent)
    if (pushed.current) {
      pushed.current = false;
      window.history.back(); // popstate below clears the state
    } else {
      window.history.replaceState(null, "", "#projects");
      set(null);
    }
  }, [set]);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.startsWith(HASH_PREFIX)
        ? window.location.hash.slice(HASH_PREFIX.length)
        : null;
      return id && PROJECTS.some((p) => p.id === id) ? id : null;
    };
    const initial = fromHash();
    if (initial) {
      window.history.replaceState({ project: initial }, "", `${HASH_PREFIX}${initial}`);
      set(initial);
    }
    const onPop = (e: PopStateEvent) => {
      const id = (e.state as { project?: string } | null)?.project ?? fromHash();
      pushed.current = Boolean(id) && pushed.current;
      set(id && PROJECTS.some((p) => p.id === id) ? id : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [set]);

  const active = PROJECTS.find((p) => p.id === activeId) ?? null;

  return (
    <section id="projects" className="projects" ref={ref} aria-labelledby="projects-title">
      <div className="projects__inner">
        <header className="projects__head">
          <p className="projects__label" data-reveal>
            Selected Work / 2024–2026
          </p>
          <h2 id="projects-title" className="projects__title" data-reveal>
            Things I&apos;ve <em>built</em>.
          </h2>
          <div className="projects__lead" data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}>
            <p className="projects__sub">Ideas turned into working applications.</p>
            <p className="projects__intro">
              A collection of projects exploring full-stack development, practical problem-solving,
              and building useful digital experiences.
            </p>
            <ul className="projects__tags" aria-label="Focus areas">
              {LABELS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </header>

        <ul className="projects__list">
          {PROJECTS.map((project) => (
            <ProjectShowcase key={project.id} project={project} onOpen={open} />
          ))}
        </ul>
      </div>

      <ProjectDetails project={active} onClose={close} />
    </section>
  );
}
