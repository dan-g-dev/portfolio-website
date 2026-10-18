import type { Project } from "../../data/projects";

interface Props {
  project: Pick<Project, "title" | "github" | "live">;
  variant?: "row" | "modal";
}

/** External links. A button is rendered only when its URL exists: no dead or "#" links. */
export function ProjectLinks({ project, variant = "row" }: Props) {
  const { title, github, live } = project;
  if (!github && !live) return null;
  return (
    <>
      {live && (
        <a
          className={`plink plink--live plink--${variant}`}
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live demo (opens in a new tab)`}
        >
          Live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {github && (
        <a
          className={`plink plink--code plink--${variant}`}
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} on GitHub (opens in a new tab)`}
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}
