import { useRef } from "react";
import { CV_URL } from "../../config/contact";
import { useReveal } from "../../hooks/useReveal";
import "./About.css";

const LAYERS = [
  { name: "Frontend", note: "What people see and use" },
  { name: "Backend", note: "The logic behind it" },
  { name: "Databases", note: "Where the data lives" },
] as const;

const EXPLORING = [
  { name: "AI / ML", note: "How machine learning could make the applications I build more useful." },
  { name: "Cybersecurity", note: "How to build software that is safe to use, and how it gets attacked." },
] as const;

export function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="about" className="about" ref={ref} aria-labelledby="about-title">
      <div className="about__inner">
        <aside className="about__meta" data-reveal>
          <p className="about__label">About</p>
          <p className="about__who">
            <strong>Daniel Girma</strong>
            Information Systems student
            <br />
            Addis Ababa University
          </p>
        </aside>

        <div className="about__body">
          <h2 id="about-title" className="about__title" data-reveal>
            I build web applications that are <em>genuinely useful</em>, and I&apos;m getting better
            at it with every project.
          </h2>

          <div className="about__cols">
            <div className="about__intro">
              <p className="about__lead" data-reveal>
                I&apos;m Daniel Girma, an Information Systems student at Addis Ababa University working
                toward becoming a stronger full-stack developer. I&apos;m drawn to software that solves
                a real problem for the person using it.
              </p>
              <a
                className="about__cv"
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View my CV, PDF (opens in a new tab)"
              >
                View my CV <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="about__text" data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}>
              My experience is practical rather than formal. It comes from building projects by hand,
              running into what breaks, and working out why. That is where most of what I know has
              come from, and it is how I plan to keep learning.
            </p>
          </div>

          <div className="about__stack" data-reveal>
            <p className="about__kicker">What holds my attention</p>
            <p className="about__text">
              How the pieces connect: how a frontend talks to a backend, how the backend reads and
              writes to a database, and how a decision in one layer changes the others.
            </p>
            <ul className="stack">
              {LAYERS.map(({ name, note }) => (
                <li key={name} className="stack__node">
                  <span className="stack__name">{name}</span>
                  <span className="stack__note">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about__pledge" data-reveal>
            <p className="about__pledge-line">I get better by building, so that is what I keep doing.</p>
            <p className="about__text">
              Every project is a chance to learn something I could not get from reading alone, and I
              want my work to keep improving through hands-on practice.
            </p>
          </div>

          <div className="about__more" data-reveal>
            <p className="about__kicker">Also exploring</p>
            <ul className="more">
              {EXPLORING.map(({ name, note }) => (
                <li key={name}>
                  <span className="more__name">{name}</span>
                  <span className="more__note">{note}</span>
                </li>
              ))}
            </ul>
            <p className="about__fine">Areas I am curious about and learning, not ones I claim expertise in yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
