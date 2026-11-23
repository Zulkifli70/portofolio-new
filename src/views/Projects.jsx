import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { projects } from "../data/portfolio";
import ProjectCard from "../components/ProjectCard";
import "../components/ProjectCard.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPIES = 3;
const HALF_CYCLES = 20;
const CYCLES = HALF_CYCLES * 2;

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isMobile = () => window.matchMedia("(max-width: 640px)").matches;

/** Projects — looping horizontal showcase with Lenis smooth scroll. */
export default function Projects() {
  const root = useRef(null);
  const wrapper = useRef(null);
  const track = useRef(null);
  const lenisRef = useRef(null);
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  // Deep link: /projects/<slug> opens that project on mount.
  const [selected, setSelected] = useState(() => {
    const slug = window.location.pathname.split("/")[2];
    if (!slug) return null;
    return projects.find((p) => p.name.toLowerCase().includes(slug.replace(/-/g, " "))) ?? null;
  });
  const [activeImage, setActiveImage] = useState(0);
  const [closing, setClosing] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  const finishClose = useCallback(() => {
    setOriginRect(null);
    setClosing(false);
    setSelected(null);
  }, []);

  const close = useCallback(() => {
    if (!selected || closing) return;
    if (reducedMotion() || !originRect) {
      finishClose();
      return;
    }
    setClosing(true);
  }, [selected, closing, originRect, finishClose]);

  const open = (project, el) => {
    setOriginRect(el?.getBoundingClientRect() ?? null);
    setActiveImage(0);
    setClosing(false);
    setSelected(project);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close]);

  useGSAP(
    () => {
      const scroller = root.current.closest(".app-body");
      scroller.classList.add("is-showcase");

      if (reducedMotion()) {
        return () => scroller.classList.remove("is-showcase");
      }

      const cards = [...track.current.querySelectorAll(".project-card")];
      const metrics = { cycle: 0, total: 0, width: 0, centers: [], align: 0 };

      const measure = () => {
        metrics.cycle = cards[projects.length].offsetLeft - cards[0].offsetLeft;
        metrics.total = metrics.cycle * CYCLES;
        metrics.width = wrapper.current.clientWidth;
        metrics.centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);

        // Center one card in the viewport at rest; the loop offsets from there.
        const base = -metrics.cycle;
        let delta = 0;
        let best = Infinity;
        for (const center of metrics.centers) {
          const d = center + base - metrics.width / 2;
          if (Math.abs(d) < best) {
            best = Math.abs(d);
            delta = d;
          }
        }
        metrics.align = -delta;
      };

      const render = (self) => {
        // Wraps both ways because every copy is identical.
        const phase = (self.progress * metrics.total) % metrics.cycle;
        const shift = -metrics.cycle + metrics.align + (isMobile() ? phase : -phase);
        gsap.set(track.current, { x: shift });

        const center = metrics.width / 2;
        cards.forEach((card, i) => {
          const closeness = Math.max(
            0,
            1 - Math.abs(metrics.centers[i] + shift - center) / (metrics.width / 2),
          );
          gsap.set(card, {
            scale: 0.72 + closeness * 0.48,
            opacity: 0.55 + closeness * 0.45,
            filter: `brightness(${1 + closeness * 0.15}) drop-shadow(0 ${8 + closeness * 14}px ${24 + closeness * 40}px rgba(0,0,0,${0.25 + closeness * 0.25}))`,
          });
        });
      };

      measure();

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        scroller,
        pin: true,
        pinType: "fixed",
        start: "top top",
        end: () => `+=${metrics.total}`,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onRefresh: render,
        onUpdate: render,
      });

      const lenis = new Lenis({ wrapper: scroller, content: scroller.firstElementChild });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Start mid-runway so both scroll directions loop. Deferred a frame so
      // the route change's scroll reset cannot overwrite it.
      const startId = requestAnimationFrame(() => {
        lenis.scrollTo(metrics.cycle * HALF_CYCLES, { immediate: true });
        ScrollTrigger.update();
        render(trigger);
      });

      return () => {
        cancelAnimationFrame(startId);
        trigger.kill();
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        lenisRef.current = null;
        scroller.classList.remove("is-showcase");
        gsap.set(track.current, { clearProps: "transform,filter" });
        gsap.set(cards, { clearProps: "transform,opacity,filter" });
      };
    },
    { scope: root },
  );

  // FLIP: modal starts at the clicked card's rect and expands into its layout.
  // Only transform + opacity animate — no width/height or layout per frame.
  useGSAP(
    () => {
      if (!selected || !modalRef.current || !backdropRef.current) return;

      if (reducedMotion()) {
        gsap.set([modalRef.current, backdropRef.current], { clearProps: "all" });
        return;
      }

      const modal = modalRef.current;
      const backdrop = backdropRef.current;
      // Keep the main image visible for continuity; fade the rest in/out.
      const chrome = modal.querySelectorAll(".modal-body, .modal-thumbs, .modal-close");
      const to = modal.getBoundingClientRect();
      const from = originRect;

      // Card rect -> modal rect, expressed as an inverted transform on modal.
      const flip =
        from && from.width > 0 && from.height > 0 && to.width && to.height
          ? {
              x: from.left + from.width / 2 - to.left - to.width / 2,
              y: from.top + from.height / 2 - to.top - to.height / 2,
              scaleX: from.width / to.width,
              scaleY: from.height / to.height,
            }
          : { x: 0, y: 0, scaleX: 0.92, scaleY: 0.92 };

      if (!closing) {
        gsap.set(modal, { ...flip, transformOrigin: "center center" });
        gsap.set(chrome, { opacity: 0 });
        gsap.set(backdrop, { opacity: 0 });

        gsap
          .timeline()
          .to(backdrop, { opacity: 1, duration: 0.24, ease: "none" }, 0)
          .to(modal, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.52, ease: "power3.out" }, 0)
          .to(chrome, { opacity: 1, duration: 0.28, ease: "power2.out", stagger: 0.03 }, 0.16);
        return;
      }

      gsap
        .timeline({ onComplete: finishClose })
        .to(chrome, { opacity: 0, duration: 0.14, ease: "power1.in" }, 0)
        .to(modal, { ...flip, duration: 0.42, ease: "power3.inOut" }, 0)
        .to(backdrop, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.06);
    },
    { dependencies: [selected, closing, originRect, finishClose], revertOnUpdate: true },
  );

  const nudge = (dir) => {
    const lenis = lenisRef.current;
    const cards = track.current?.querySelectorAll(".project-card");
    if (!lenis || !cards || cards.length < 2) return;
    const distance = cards[1].offsetLeft - cards[0].offsetLeft;
    // Mobile arrows map to inverse scroll; desktop keeps original mapping.
    const scrollDir = isMobile() ? -dir : dir;
    lenis.scrollTo(lenis.scroll + scrollDir * distance, { duration: 0.7 });
  };

  return (
    <div className="view projects-view" ref={root}>
      <h1 className="view-title">Projects</h1>
      <div className="projects-stage">
        <div className="projects-horizontal" ref={wrapper}>
          <div className="projects-track" ref={track}>
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              projects.map((project, i) => (
                <ProjectCard
                  key={`${project.name}-${copy}`}
                  project={project}
                  index={i}
                  copy={copy}
                  onClick={(e) => open(project, e.currentTarget)}
                />
              )),
            )}
          </div>
        </div>

        <div className="project-nav">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous project">
            ←
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next project">
            →
          </button>
        </div>
      </div>

      {selected &&
        createPortal(
          <div
            className="modal-backdrop"
            ref={backdropRef}
            onClick={close}
            role="presentation"
          >
            <div
              className="modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={close}
                aria-label="Close project details"
              >
                ✕
              </button>

              <div className="modal-gallery">
                <div className="modal-main">
                  <img src={selected.gallery[activeImage]} alt={selected.name} />
                </div>
                <div className="modal-thumbs">
                  {selected.gallery.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      className="modal-thumb"
                      aria-current={i === activeImage}
                      onClick={() => setActiveImage(i)}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-body">
                <h2 className="modal-title">{selected.name}</h2>
                <p className="modal-desc">{selected.description}</p>

                <div className="tag-row">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                  <span className="badge">{selected.status}</span>
                </div>

                <ul className="feature-list">
                  {selected.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="link-row">
                  <a
                    className="btn"
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website ↗
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={selected.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository ↗
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
