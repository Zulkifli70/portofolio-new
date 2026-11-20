/**
 * App — portfolio with client-side routing for direct sharing.
 *
 * Uses React Router v6 so URLs like /projects/pokemon-memory-game
 * can be shared directly and the app will navigate to the right view.
 * Keeps original UI layout (floating bottom nav, app-body scroll handling).
 */
import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation, NavLink } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Projects from "./views/Projects";
import Experience from "./views/Experience";
import Tech from "./views/Tech";
import Contact from "./views/Contact";
import "./App.css";

const NAV = [
  { to: "/", label: "Index", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/tech", label: "Tech" },
  { to: "/contact", label: "Contact" },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const bodyRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  // Home menu passes section ID (e.g., "about", "projects") → map to route path
  const onNavigate = (id) => {
    if (id === "home") navigate("/");
    else navigate(`/${id}`);
  };

  return (
    <div className="app">
      <div className="app-body" ref={bodyRef}>
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:project" element={<Projects />} />
          <Route path="*" element={<Home onNavigate={onNavigate} />} />
        </Routes>
      </div>

      <nav className="dock" aria-label="Pages">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "dock-link is-active" : "dock-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}