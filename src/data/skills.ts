/**
 * Skills data. Starting point = the technologies listed in the Step 4 brief
 * (the original portfolio source was not available to cross-check).
 * Edit freely: add, remove or move items here and the section updates.
 * `note` says what a technology IS (factual), never how proficient I am.
 */
export interface SkillItem {
  name: string;
  note: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  items: readonly SkillItem[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend development",
    summary: "The part of an application people see and use.",
    items: [
      { name: "HTML", note: "Structure and semantics of web pages" },
      { name: "CSS", note: "Layout, styling and responsive design" },
      { name: "JavaScript", note: "Interactivity and logic in the browser" },
      { name: "React", note: "Component-based user interfaces" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
    ],
  },
  {
    id: "backend",
    title: "Backend development",
    summary: "The server-side logic that powers what the interface shows.",
    items: [
      { name: "Node.js", note: "JavaScript runtime for server-side code" },
      { name: "Express.js", note: "Web framework for routes and middleware" },
    ],
  },
  {
    id: "data",
    title: "Databases and APIs",
    summary: "How data is stored, and how the frontend and backend talk to each other.",
    items: [
      { name: "REST APIs", note: "Structured HTTP endpoints between layers" },
      { name: "MySQL", note: "Relational database for structured data" },
    ],
  },
  {
    id: "tools",
    title: "Development tools and workflows",
    summary: "How I keep my work tracked, organised and shareable.",
    items: [
      { name: "Git", note: "Version control for tracking changes" },
      { name: "GitHub", note: "Hosting repositories and collaborating" },
    ],
  },
];
