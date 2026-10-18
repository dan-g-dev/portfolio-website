# Daniel Girma: portfolio

React + TypeScript + Vite. No runtime dependencies beyond React.

## Run locally

```
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Where to edit content

| What | File |
| --- | --- |
| Email, GitHub, LinkedIn | `src/config/contact.ts` |
| Skills groups and items | `src/data/skills.ts` |
| The five projects (summary, technologies, links, images) | `src/data/projects.ts` |
| Education and learning journey | `src/data/journey.ts` |
| Navigation section ids | `src/config/sections.ts` |

Project images go in `public/projects/` and are referenced as `projects/<file>`.

## Portrait animation

One fixed canvas (`src/components/PortraitBackground`) sits behind the whole page. Frame index =
`scrollY / (documentHeight - viewportHeight)` mapped across all frames. Frames live in
`public/portrait-frames/{lg,md}/` (1600px for desktop, 1200px for screens up to 820px wide).
`scripts/prepare-frames.py` regenerates them from the original JPG sequence.

## Contact form

There is no backend. The form validates, then opens the visitor's email app with a prefilled draft
(`mailto:`); it does not send anything by itself. To receive messages directly, connect a form
service or a small API and replace `buildMailto` in `src/components/Contact/ContactForm.tsx`.
