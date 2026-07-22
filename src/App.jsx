/**
 * App — Root component and page composition.
 *
 * Renders the full single-page portfolio in this layering order:
 *   1. LoadingScreen  — full-screen overlay that blocks scroll until
 *                       all images + fonts are loaded (with a 2 s hold).
 *   2. Header         — fixed top nav with ScrollSmoother-powered smooth scroll.
 *   3. SmoothScrollPortfolio — wraps all page sections in GSAP ScrollSmoother
 *                              for buttery-smooth scrolling + horizontal gallery.
 *   4. BaseLayout     — max-width centered container for content.
 *   5. Sections       — Hero → About → Showcase → Experience → TechStack → Footer.
 */
import "./gsap-plugins"; // register GSAP plugins once before any component mounts
import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css"; // Tailwind + custom CSS
import About from "./sections/About";
import Showcase from "./sections/Showcase";
import SmoothScrollPortfolio from "./animation/SmoothScrollPortfolio";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen extraHoldTime={2000}>
        <Header />
        <SmoothScrollPortfolio>
          <BaseLayout>
            <Hero />
            <About />
            <Showcase />
            <Experience />
            <TechStack />
            <Footer />
          </BaseLayout>
        </SmoothScrollPortfolio>
      </LoadingScreen>
    </>
  );
}

export default App;
