import { useEffect, useRef, type KeyboardEvent } from "react";
import type { Project } from "../../data/projects";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectMedia } from "./ProjectMedia";

interface Props {
  project: Project | null;
  onClose: () => void;
}

/**
 * Detail view as a native modal <dialog>: focus is trapped, the page behind is
 * inert, Escape closes it, and focus returns to the button that opened it.
 */
export function ProjectDetails({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const last = useRef<Project | null>(null);
  if (project) last.current = project;
  const shown = project ?? last.current;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-modal", Boolean(project));
    return () => document.documentElement.classList.remove("has-modal");
  }, [project]);

  // Keep Tab / Shift+Tab cycling inside the dialog instead of leaving it for the browser UI.
  const trapTab = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={ref}
      onKeyDown={trapTab}
      className="pdlg"
      aria-labelledby="pdlg-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // backdrop click
      }}
    >
      {shown && (
        <article className="pdlg__inner">
          <div className="pdlg__bar">
            <p className="pdlg__bar-cat">{shown.category}</p>
            <button type="button" className="pdlg__close" onClick={onClose} aria-label="Close project details">
              <span aria-hidden="true">Close</span>
              <span className="pdlg__x" aria-hidden="true" />
            </button>
          </div>

          <div className="pdlg__media">
            <ProjectMedia project={shown} eager />
          </div>

          <header className="pdlg__head">
            <h2 id="pdlg-title" className="pdlg__title">
              {shown.title}
              {shown.nativeName && (
                <span className="project__native" lang="am">
                  {shown.nativeName}
                </span>
              )}
            </h2>
            <p className="pdlg__tagline">{shown.tagline}</p>
          </header>

          <div className="pdlg__grid">
            <section aria-labelledby="pd-overview" className="pdlg__col pdlg__col--wide">
              <h3 id="pd-overview" className="pdlg__h">Overview</h3>
              <p className="pdlg__p">{shown.description}</p>

              <h3 className="pdlg__h">Key features</h3>
              <ul className="pdlg__list">
                {shown.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <h3 className="pdlg__h">How it is built</h3>
              <ul className="pdlg__list">
                {shown.implementation.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            <aside aria-label="Technology and status" className="pdlg__col">
              <h3 className="pdlg__h">Technology stack</h3>
              <dl className="pdlg__stack">
                {shown.stack.map((g) => (
                  <div key={g.label}>
                    <dt>{g.label}</dt>
                    <dd>{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>

              {shown.notes.length > 0 && (
                <>
                  <h3 className="pdlg__h">Status and limitations</h3>
                  <ul className="pdlg__list pdlg__list--notes">
                    {shown.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="pdlg__links">
                <ProjectLinks project={shown} variant="modal" />
              </div>
            </aside>
          </div>
        </article>
      )}
    </dialog>
  );
}
