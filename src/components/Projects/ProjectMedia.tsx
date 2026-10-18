import type { Project } from "../../data/projects";

const withBase = (src: string) =>
  /^(https?:)?\/\//.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;

/** Real screenshot when supplied, otherwise a clearly-labelled placeholder (never a fake screenshot). */
export function ProjectMedia({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (project.image) {
    const { src, alt, width, height } = project.image;
    return (
      <div className="pmedia__shot">
        <div className="pmedia__chrome" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <img
          className="pmedia__img"
          src={withBase(src)}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }
  return (
    <div
      className="pmedia__art"
      role="img"
      aria-label={`${project.title}: screenshot not added yet`}
    >
      <span className="pmedia__cat" aria-hidden="true">
        {project.category}
      </span>
      <span className="pmedia__ghost" aria-hidden="true">
        {project.title}
      </span>
      <span className="pmedia__badge">Screenshot not added yet</span>
    </div>
  );
}
