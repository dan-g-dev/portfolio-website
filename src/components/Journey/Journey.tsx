import { useRef } from "react";
import { EDUCATION, JOURNEY } from "../../data/journey";
import { useReveal } from "../../hooks/useReveal";
import "./Journey.css";

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="journey" className="journey" ref={ref} aria-labelledby="journey-title">
      <div className="journey__inner">
        <header className="journey__head" data-reveal>
          <p className="journey__label">Education &amp; Journey</p>
          <h2 id="journey-title" className="journey__title">
            How I&apos;ve been <em>learning</em>.
          </h2>
          <p className="journey__intro">
            University study, structured training and hands-on projects, each one adding to how I
            build.
          </p>
        </header>

        <div className="edu" data-reveal>
          <p className="journey__kicker">Education</p>
          <div className="edu__row">
            <h3 className="edu__school">{EDUCATION.institution}</h3>
            <dl className="edu__facts">
              <div>
                <dt>Program</dt>
                <dd>{EDUCATION.program}</dd>
              </div>
              <div>
                <dt>Started</dt>
                <dd>
                  <time dateTime="2023">{EDUCATION.started}</time>
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{EDUCATION.status}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="learn">
          <p className="journey__kicker">Learning journey</p>
          <ul className="steps">
            {JOURNEY.map((e) => (
              <li key={e.id} className="step" data-reveal>
                <div className="step__meta">
                  <p className="step__when">{e.when}</p>
                  <p className="step__kind">{e.kind}</p>
                </div>
                <span className="step__dot" aria-hidden="true" />
                <div className="step__body">
                  <h3 className="step__org">{e.organisation}</h3>
                  <p className="step__title">{e.title}</p>
                  <p className="step__summary">{e.summary}</p>
                  {e.list && e.listLabel && (
                    <div className="step__list">
                      <p className="step__list-label">{e.listLabel}</p>
                      <ul>
                        {e.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
