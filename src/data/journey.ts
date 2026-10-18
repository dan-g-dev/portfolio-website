/**
 * Education & learning journey. Only facts supplied by Daniel are included:
 * no certificates are claimed for Evangadi Tech or Geez Sec, and no dates are
 * given where none were provided (Evangadi Tech has no period listed).
 */
export interface Education {
  institution: string;
  program: string;
  started: string;
  status: string;
}

export interface JourneyEntry {
  id: string;
  organisation: string;
  title: string;
  /** Short label for the left meta column, e.g. a period. */
  when: string;
  kind: string;
  summary: string;
  listLabel?: string;
  list?: readonly string[];
}

export const EDUCATION: Education = {
  institution: "Addis Ababa University",
  program: "Information Systems",
  started: "2023",
  status: "Undergraduate student",
};

export const JOURNEY: readonly JourneyEntry[] = [
  {
    id: "evangadi",
    organisation: "Evangadi Tech",
    title: "Full-Stack Development Training",
    when: "Training programme",
    kind: "Hands-on learning",
    summary:
      "Learned web development through hands-on projects, working with both frontend and backend technologies.",
    listLabel: "Projects built",
    list: [
      "E-commerce application",
      "Netflix-inspired application",
      "Auto garage management application",
    ],
  },
  {
    id: "udacity",
    organisation: "Udacity",
    title: "Accenture Programming Fundamentals Nanodegree",
    when: "Completed November 2024",
    kind: "Completed credential",
    summary:
      "Completed this Nanodegree in November 2024, adding structured programming fundamentals alongside my hands-on projects.",
  },
  {
    id: "geezsec",
    organisation: "Geez Sec",
    title: "Cybersecurity Training",
    when: "January – February 2024",
    kind: "Short training",
    summary:
      "A short training period with exposure to the fundamentals of ethical hacking and the skills around it.",
    listLabel: "Exposure to",
    list: [
      "Ethical hacking fundamentals",
      "Linux",
      "Python",
      "Bash",
      "Networking",
      "Reconnaissance",
      "Scanning",
    ],
  },
];
