import { useEffect, useRef, useState } from "react";
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

/** Projects — looping horizontal showcase with Lenis smooth scroll. */
export default function Projects() {
  const root = useRef(null);
  const wrapper = useRef(null);
  const track = useRef(null);

  // Deep link: /projects/<slug> opens that project on mount.
  const [selected, setSelected] = useState(() => {
    const slug = window.location.pathname.split("/")[2];
    if (!slug) return null;
    return projects.find((p) => p.name.toLowerCase().includes(slug.replace(/-/g, " "))) ?? null;
  });
  const [activeImage, setActiveImage] = useState(0);

  useGSAP(
    () => {
      const scroller = root.current.closest(".app-body");
      scroller.classList.add("is-showcase");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        const shift =
          -metrics.cycle + metrics.align + ((self.progress * metrics.total) % metrics.cycle);
        gsap.set(track.current, { x: shift });

        const center = metrics.width / 2;
        cards.forEach((card, i) => {
          const closeness = Math.max(
            0,
            1 - Math.abs(metrics.centers[i] + shift - center) / (metrics.width / 2),
          );
          gsap.set(card, { scale: 0.8 + closeness * 0.35, opacity: 0.6 + closeness * 0.4 });
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
        scroller.classList.remove("is-showcase");
        gsap.set(track.current, { clearProps: "transform" });
        gsap.set(cards, { clearProps: "transform,opacity" });
      };
    },
    { scope: root },
  );

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const open = (project) => {
    setActiveImage(0);
    setSelected(project);
  };

  return (
    <div className="view projects-view" ref={root}>
      <h1 className="view-title">Projects</h1>
      <div className="projects-horizontal" ref={wrapper}>
        <div className="projects-track" ref={track}>
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            projects.map((project, i) => (
              <ProjectCard
                key={`${project.name}-${copy}`}
                project={project}
                index={i}
                copy={copy}
                onClick={() => open(project)}
              />
            )),
          )}
        </div>
      </div>

      {selected &&
        createPortal(
          <div
            className="modal-backdrop"
            onClick={() => setSelected(null)}
            role="presentation"
          >
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelected(null)}
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