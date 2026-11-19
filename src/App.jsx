/**
 * App — single-screen portfolio.
 *
 * One view at a time, no page scroll. The home screen lists every section;
 * each section opens full-screen with a small back control.
 */
import { useEffect, useRef, useState } from "react";
import Home from "./views/Home";
import About from "./views/About";
import Projects from "./views/Projects";
import Experience from "./views/Experience";
import Tech from "./views/Tech";
import Contact from "./views/Contact";
import "./App.css";

const VIEWS = {
  about: { label: "About", Component: About },
  projects: { label: "Projects", Component: Projects },
  experience: { label: "Experience", Component: Experience },
  tech: { label: "Tech Stack", Component: Tech },
  contact: { label: "Contact", Component: Contact },
};

export default function App() {
  const [view, setView] = useState("home");
  const bodyRef = useRef(null);

  // Each view starts at the top.
  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [view]);

  const active = VIEWS[view];

  return (
    <div className="app">
      {active && (
        <header className="topbar">
          <button type="button" className="back" onClick={() => setView("home")}>
            ← Index
          </button>
          <span>{active.label}</span>
        </header>
      )}

      <div className="app-body" ref={bodyRef}>
        {view === "home" ? (
          <Home onNavigate={setView} />
        ) : (
          <active.Component />
        )}
      </div>
    </div>
  );
}
