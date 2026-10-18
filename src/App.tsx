import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./components/Hero/Hero";
import { Journey } from "./components/Journey/Journey";
import { Nav } from "./components/Nav/Nav";
import { PortraitBackground } from "./components/PortraitBackground";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills/Skills";
import { SECTION_IDS } from "./config/sections";
import { useActiveSection } from "./hooks/useActiveSection";
import { useSectionAvailability } from "./hooks/useSectionAvailability";

export default function App() {
  const available = useSectionAvailability(SECTION_IDS);
  const active = useActiveSection(Array.from(available));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {/* One persistent animation layer for the entire document. */}
      <PortraitBackground />
      <Nav available={available} active={active} />
      <main id="main" className="page" tabIndex={-1}>
        <Hero available={available} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <div className="page">
        <Footer />
      </div>
    </>
  );
}
