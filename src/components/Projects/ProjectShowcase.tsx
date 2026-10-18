import type { CSSProperties, PointerEvent } from "react";
import type { Project } from "../../data/projects";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectMedia } from "./ProjectMedia";

const delay = (n: number): CSSProperties => ({ "--d": `${(n * 0.07).toFixed(2)}s` }) as CSSProperties;

interface Props {
  project: Project;
  onOpen: (id: string) => void;
}

/** One editorial row. Alternates sides via CSS (:nth-child), feature rows are larger. */
export function ProjectShowcase({ project, onOpen }: Props) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <li className={`project${project.featured ? " project--featured" : ""}`}>
      <div
        className="pmedia"
        data-reveal
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => onOpen(project.id)}
      >
        <div className="pmedia__tilt">
          <ProjectMedia project={project} />
        </div>
      </div>

      <div className="project__body">
        <p className="project__cat" data-reveal style={delay(0)}>
          {project.category}
        </p>
        <h3 className="project__title" data-reveal style={delay(1)}>
          {project.title}
          {project.nativeName && (
            <span className="project__native" lang="am">
              {project.nativeName}
            </span>
          )}
        </h3>
        <p className="project__tagline" data-reveal style={delay(2)}>
          {project.tagline}
        </p>
        <p className="project__desc" data-reveal style={delay(3)}>
          {project.description}
        </p>

        <ul className="project__tech" aria-label={`${project.title} technologies`}>
          {project.technologies.map((t, i) => (
            <li key={t} data-reveal style={delay(4 + i * 0.5)}>
              {t}
            </li>
          ))}
        </ul>

        <div className="project__actions" data-reveal style={delay(5)}>
          <button
            type="button"
            className="pbtn pbtn--primary"
            onClick={() => onOpen(project.id)}
            aria-haspopup="dialog"
            aria-label={`Explore project: ${project.title}`}
          >
            Explore Project <span className="pbtn__arrow" aria-hidden="true">→</span>
          </button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </li>
  );
}
