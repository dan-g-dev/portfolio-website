import { SectionLink } from "../SectionLink/SectionLink";
import { CTA_TARGETS } from "../../config/sections";
import "./Hero.css";

const SPECIALTIES = [
  "Full-Stack Development",
  "Backend Development",
  "Problem Solving",
  "Continuous Learning",
] as const;

export function Hero({ available }: { available: ReadonlySet<string> }) {
  return (
    <section id="home" className="hero-section" aria-label="Introduction">
      <div className="hero">
        <div className="hero__content">
          <div className="hero__main">
            <div className="hero__lead">
              <p className="hero__eyebrow">Hi, I&apos;m Daniel Girma</p>
              <h1 className="hero__title">
                <span>Junior</span> <span>Full-Stack</span>{" "}
                <span>
                  Developer<i>.</i>
                </span>
              </h1>
            </div>

            <p className="hero__aside">
              I&apos;m an Information Systems student at Addis Ababa University, building web
              applications and strengthening my full-stack development skills through hands-on
              projects.
            </p>

            <div className="hero__ctas">
              <SectionLink
                id={CTA_TARGETS.primary}
                available={available.has(CTA_TARGETS.primary)}
                className="btn btn--primary"
              >
                Explore My Work <span aria-hidden="true">→</span>
              </SectionLink>
              <SectionLink
                id={CTA_TARGETS.secondary}
                available={available.has(CTA_TARGETS.secondary)}
                className="btn btn--ghost"
              >
                Let&apos;s Connect
              </SectionLink>
            </div>
          </div>

          <ul className="hero__specialties" aria-label="Specialties">
            {SPECIALTIES.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
