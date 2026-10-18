import { useRef, useState } from "react";
import { SKILL_GROUPS } from "../../data/skills";
import { useReveal } from "../../hooks/useReveal";
import "./Skills.css";

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([SKILL_GROUPS[0].id]));
  useReveal(ref);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <section id="skills" className="skills" ref={ref} aria-labelledby="skills-title">
      <div className="skills__inner">
        <header className="skills__head" data-reveal>
          <p className="skills__label">Skills</p>
          <h2 id="skills-title" className="skills__title">
            The tools I <em>build with</em>.
          </h2>
          <p className="skills__intro">
            A working toolkit, grouped by the part of an application it serves. It is not a ranking
            or a scorecard, just what I use to build.
          </p>
        </header>

        <ul className="skills__list">
          {SKILL_GROUPS.map((group) => {
            const isOpen = open.has(group.id);
            const panelId = `skills-panel-${group.id}`;
            const headId = `skills-head-${group.id}`;
            return (
              <li key={group.id} className={`group${isOpen ? " is-open" : ""}`} data-reveal>
                <h3 className="group__heading">
                  <button
                    type="button"
                    id={headId}
                    className="group__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(group.id)}
                  >
                    <span className="group__title">{group.title}</span>
                    <span className="group__preview">
                      {group.items.map((i) => i.name).join(" · ")}
                    </span>
                    <span className="group__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headId}
                  className="group__panel"
                >
                  <div className="group__panel-inner">
                    <p className="group__summary">{group.summary}</p>
                    <ul className="group__items">
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <span className="item__name">{item.name}</span>
                          <span className="item__note">{item.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="skills__fine">
          I am still building depth in each of these, and the list grows as my projects do.
        </p>
      </div>
    </section>
  );
}
