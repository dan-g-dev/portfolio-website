import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT } from "../../config/contact";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const MAX_MESSAGE = 1200; // keeps the mailto: link within common length limits
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least a couple of sentences.";
  return e;
}

export function buildMailto(v: Values): string {
  const body = `${v.message.trim()}\r\n\r\n${v.name.trim()}\r\n${v.email.trim()}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(v.subject.trim())}&body=${encodeURIComponent(body)}`;
}

const FIELDS: { id: Field; label: string; type?: string; autoComplete?: string }[] = [
  { id: "name", label: "Name", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "subject", label: "Subject" },
];

/**
 * No backend or form service is configured, so this does NOT send anything.
 * It validates, then opens the visitor's email app with a prefilled draft;
 * the visitor still has to press Send there.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setOpened(false);
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onBlur = (field: Field) => {
    const msg = validate(values)[field];
    setErrors((er) => ({ ...er, [field]: msg }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (["name", "email", "subject", "message"] as Field[]).find((f) => found[f]);
    if (first) {
      setOpened(false);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setOpened(true);
    window.location.href = buildMailto(values);
  };

  const describe = (f: Field) => (errors[f] ? `${f}-error` : undefined);

  return (
    <form ref={formRef} className="cform" onSubmit={onSubmit} noValidate>
      <p className="cform__note">
        This form opens your email app with the message prefilled. It does not send the message
        automatically, so you still need to press Send there.
      </p>

      {FIELDS.map(({ id, label, type, autoComplete }) => (
        <div className="cform__field" key={id}>
          <label htmlFor={`c-${id}`}>{label}</label>
          <input
            id={`c-${id}`}
            name={id}
            type={type ?? "text"}
            autoComplete={autoComplete}
            value={values[id]}
            onChange={onChange}
            onBlur={() => onBlur(id)}
            aria-required="true"
            aria-invalid={errors[id] ? true : undefined}
            aria-describedby={describe(id)}
          />
          {errors[id] && (
            <p id={`${id}-error`} className="cform__error">
              {errors[id]}
            </p>
          )}
        </div>
      ))}

      <div className="cform__field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          maxLength={MAX_MESSAGE}
          value={values.message}
          onChange={onChange}
          onBlur={() => onBlur("message")}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
        />
        <div className="cform__meta">
          {errors.message ? (
            <p id="message-error" className="cform__error">
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="cform__count">
            {values.message.length}/{MAX_MESSAGE}
          </span>
        </div>
      </div>

      <button type="submit" className="cform__submit">
        Send Message <span aria-hidden="true">→</span>
      </button>

      <p className="cform__status" role="status" aria-live="polite">
        {opened && (
          <>
            Your email app should now open with a draft addressed to {CONTACT.email}. Nothing has
            been sent yet; press Send in your email app. If nothing opened, email me directly at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </>
        )}
      </p>
    </form>
  );
}
