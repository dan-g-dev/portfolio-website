export interface SectionDef {
  id: string;
  label: string;
}

/** Order of the navigation. Ids are the anchors later steps must give their <section>s. */
export const SECTIONS: readonly SectionDef[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const CTA_TARGETS = { primary: "projects", secondary: "contact" } as const;
export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id);
