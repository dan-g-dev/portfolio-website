import { useRef } from "react";
import { CONTACT, CV_URL } from "../../config/contact";
import { useReveal } from "../../hooks/useReveal";
import { ContactForm } from "./ContactForm";
import "./Contact.css";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="contact" className="contact" ref={ref} aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__intro" data-reveal>
          <p className="contact__label">Contact</p>
          <h2 id="contact-title" className="contact__title">
            Have a project or <em>opportunity</em> in mind?
          </h2>
          <p className="contact__text">
            I&apos;m open to software development internship opportunities, meaningful projects,
            and collaborations where I can contribute, learn, and grow.
          </p>

          <div className="contact__actions">
            <a className="cbtn cbtn--primary" href={`mailto:${CONTACT.email}`}>
              Email Me <span aria-hidden="true">→</span>
            </a>
            <a
              className="cbtn cbtn--ghost"
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Daniel Girma's CV, PDF (opens in a new tab)"
            >
              View CV <span aria-hidden="true">↗</span>
            </a>
            <a
              className="cbtn cbtn--ghost"
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              className="cbtn cbtn--ghost"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              className="cbtn cbtn--ghost"
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram (opens in a new tab)"
            >
              Telegram <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="contact__direct">
            {CONTACT.name} · {CONTACT.role}
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>

        <div className="contact__formwrap" data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
