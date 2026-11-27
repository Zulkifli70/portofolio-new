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
import Projects from "./views/Projects";
import Experience from "./views/Experience";
import Tech from "./views/Tech";
import Contact from "./views/Contact";
import LoadingScreen, { LOADING_DURATION } from "./components/LoadingScreen";
import { NAV } from "./nav";
import "./App.css";

const PAGES = {
  "/": Home,
  "/projects": Projects,
  "/experience": Experience,
  "/tech": Tech,
  "/contact": Contact,
};

const readPath = () => window.location.pathname.replace(/\/+$/, "") || "/";
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const labelFor = (to) =>
  NAV.find((n) =>
    n.end ? to === "/" : to === n.to || to.startsWith(`${n.to}/`),
  )?.label ?? "Home";

const CELL = 72;
const INK = "#171614";

function buildGrid(w, h) {
  const size = Math.max(44, Math.min(CELL, Math.floor(Math.min(w, h) / 10)));
  const cols = Math.ceil(w / size);
  const rows = Math.ceil(h / size);
  const total = cols * rows;
  const order = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [order[i], order[j]] = [order[j], order[i]];
  }
  const thresholds = new Float32Array(total);
  const denom = Math.max(total - 1, 1);
  for (let rank = 0; rank < total; rank++)
    thresholds[order[rank]] = rank / denom;
  return { cols, rows, size, thresholds, total, w, h };
}

function drawGrid(ctx, grid, p) {
  const { cols, size, thresholds, total, w, h } = grid;
  ctx.clearRect(0, 0, w, h);
  if (p <= 0) return;
  ctx.fillStyle = INK;
  // 70% of timeline spreads cell starts, 30% fades each cell in.
  const spread = 0.72;
  const fade = 1 - spread;
  for (let i = 0; i < total; i++) {
    const local = Math.min(Math.max((p - thresholds[i] * spread) / fade, 0), 1);
    if (local <= 0) continue;
    ctx.globalAlpha = local;
    const x = (i % cols) * size;
    const y = ((i / cols) | 0) * size;
    ctx.fillRect(x, y, size + 1, size + 1);
  }
  ctx.globalAlpha = 1;
}

export default function App() {
  const [path, setPath] = useState(readPath);
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const bodyRef = useRef(null);
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const timelineRef = useRef(null);
  const busyRef = useRef(false);
  const dockRef = useRef(null);

  useEffect(() => {
    if (!loading) return;

    const image = new Image();
    const preload = new Promise((resolve) => {
      image.onload = image.onerror = () => resolve();
      image.src = "/aboutme.png";
    });
    const min = new Promise((resolve) =>
      setTimeout(resolve, LOADING_DURATION * 1000),
    );
    const cap = new Promise((resolve) =>
      setTimeout(resolve, LOADING_DURATION * 1000 + 200),
    );

    Promise.race([Promise.all([document.fonts.ready, preload, min]), cap]).then(
      () => {
        setLoading(false);
      },
    );
  }, [loading]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  useEffect(() => {
    if (!navOpen) return;
    const onClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("pointerdown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [navOpen]);

  // Pixel/grid dissolve: random matrix covers screen, swap page, show target name, dissolve out.
  const transitionTo = (apply, label) => {
    if (reduced()) {
      apply();
      return;
    }

    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const labelEl = labelRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let grid = buildGrid(w, h);
    const state = { p: 0 };
    const render = () => drawGrid(ctx, grid, state.p);

    timelineRef.current?.kill();
    busyRef.current = true;
    labelEl.textContent = label;
    gsap.set(labelEl, { autoAlpha: 0, y: 12 });

    timelineRef.current = gsap
      .timeline({
        onComplete: () => {
          busyRef.current = false;
          ctx.clearRect(0, 0, w, h);
          gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        },
      })
      .set(overlay, { autoAlpha: 1, pointerEvents: "auto" })
      .to(state, {
        p: 1,
        duration: 0.55,
        ease: "power2.inOut",
        onUpdate: render,
      })
      .add(() => {
        apply();
        bodyRef.current?.scrollTo(0, 0);
        grid = buildGrid(w, h); // reshuffle for non-linear dissolve out
      })
      .to(labelEl, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" })
      .to({}, { duration: 0.22 })
      .to(labelEl, { autoAlpha: 0, y: -10, duration: 0.2, ease: "power2.in" })
      .to(
        state,
        { p: 0, duration: 0.55, ease: "power2.inOut", onUpdate: render },
        "<",
      );
  };

  const navigate = (event, to) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button > 0
    )
      return;
    event.preventDefault();
    if (to === path || busyRef.current) return;
    transitionTo(() => {
      history.pushState(null, "", to);
      setPath(to);
    }, labelFor(to));
  };

  useEffect(() => {
    const onPop = () => {
      const to = readPath();
      if (busyRef.current) {
        timelineRef.current?.kill();
        busyRef.current = false;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(labelRef.current, { autoAlpha: 0 });
      }
      transitionTo(() => setPath(to), labelFor(to));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const View = PAGES[path] ?? (path.startsWith("/projects/") ? Projects : Home);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="app" aria-hidden={loading || undefined} inert={loading}>
        <div
          className="app-body"
          ref={bodyRef}
          aria-busy={loading || undefined}
        >
          <View />
        </div>

        <nav
          className={navOpen ? "dock is-open" : "dock"}
          aria-label="Pages"
          ref={dockRef}
        >
          <div className="dock-menu">
            {NAV.map((item) => {
              const isActive = item.end
                ? path === "/"
                : path === item.to || path.startsWith(`${item.to}/`);
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
          <canvas className="page-transition-canvas" ref={canvasRef} />
          <div className="page-transition-label" ref={labelRef} />
        </div>
      </div>
    </>
  );
}
