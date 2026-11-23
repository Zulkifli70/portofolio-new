/**
 * App — picks the view from the current URL.
 *
 * Client-side routing: internal dock links push history and update state,
 * so the page changes without a reload. The browser back/forward buttons
 * are handled via `popstate`.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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

const readPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

const PANELS = 6;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [path, setPath] = useState(readPath);
  const [navOpen, setNavOpen] = useState(false);
  const bodyRef = useRef(null);
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const busyRef = useRef(false);
  const dockRef = useRef(null);

  useEffect(() => () => timelineRef.current?.kill(), []);

  useEffect(() => {
    if (!navOpen) return;
    const onClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    window.addEventListener("pointerdown", onClickOutside);
    return () => window.removeEventListener("pointerdown", onClickOutside);
  }, [navOpen]);

  // Panels wipe up right-to-left, swap the page while covered, then wipe out.
  const transitionTo = (apply) => {
    if (reduced()) {
      apply();
      return;
    }

    const overlay = overlayRef.current;
    const panels = overlay.querySelectorAll(".page-transition-panel");
    const stagger = { each: 0.045, from: "end" };

    timelineRef.current?.kill();
    busyRef.current = true;
    timelineRef.current = gsap
      .timeline({
        onComplete: () => {
          busyRef.current = false;
          gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(panels, { yPercent: 100 });
        },
      })
      .set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
      .fromTo(
        panels,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.42, ease: "power3.inOut", stagger },
      )
      .add(() => {
        apply();
        bodyRef.current?.scrollTo(0, 0);
      })
      .to(panels, { yPercent: -100, duration: 0.42, ease: "power3.inOut", stagger });
  };

  const navigate = (event, to) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    if (to === path || busyRef.current) return;
    transitionTo(() => {
      history.pushState(null, "", to);
      setPath(to);
    });
  };

  useEffect(() => {
    const onPop = () => {
      // Kill any in-flight click transition so history wins.
      if (busyRef.current) {
        timelineRef.current?.kill();
        busyRef.current = false;
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      }
      transitionTo(() => setPath(readPath()));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const View = PAGES[path] ?? (path.startsWith("/projects/") ? Projects : Home);

  return (
    <div className="app">
      <div className="app-body" ref={bodyRef}>
        <View />
      </div>

      <nav
        className={navOpen ? "dock is-open" : "dock"}
        aria-label="Pages"
        ref={dockRef}
      >
        <div className="dock-menu">
          {NAV.map((item) => {
            const isActive = item.end ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={(event) => {
                  setNavOpen(false);
                  navigate(event, item.to);
                }}
                className={isActive ? "dock-link is-active" : "dock-link"}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="dock-toggle"
          onClick={() => setNavOpen((v) => !v)}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </nav>

      <div className="page-transition" ref={overlayRef} aria-hidden="true">
        {Array.from({ length: PANELS }, (_, i) => (
          <div className="page-transition-panel" key={i} />
        ))}
      </div>
    </div>
  );
}
