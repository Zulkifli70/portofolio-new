/**
 * App — picks the view from the current URL.
 *
 * Routing is handled by Barba (see main.jsx); App only maps the pathname to a
 * view and renders the floating dock. Dock links are plain anchors so Barba
 * can intercept them.
 */
import Home from "./views/Home";
import About from "./views/About";
import Projects from "./views/Projects";
import Experience from "./views/Experience";
import Tech from "./views/Tech";
import Contact from "./views/Contact";
import { NAV } from "./nav";
import "./App.css";

const PAGES = {
  "/": Home,
  "/about": About,
  "/projects": Projects,
  "/experience": Experience,
  "/tech": Tech,
  "/contact": Contact,
};

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const View = PAGES[path] ?? (path.startsWith("/projects/") ? Projects : Home);

  return (
    <div className="app">
      <div className="app-body">
        <View />
      </div>

      <nav className="dock" aria-label="Pages">
        {NAV.map((item) => {
          const isActive = item.end ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);
          return (
            <a
              key={item.to}
              href={item.to}
              className={isActive ? "dock-link is-active" : "dock-link"}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
