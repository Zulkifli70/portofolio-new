import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { about, projects } from "../data/portfolio";
import { techIcons } from "../data/techIcons";

gsap.registerPlugin(useGSAP);

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Home hero, set as a printed portfolio plate: a masthead rule on top,
 * a short lede with the stack list in the middle, and FRONTEND DEVELOPER as
 * the poster title pinned to the bottom edge.
 */
export default function Home({ ready = true }) {
  const stack = useRef(null);

  useGSAP(
    () => {
      if (!ready || reduced()) return;

      const items = stack.current.querySelectorAll(".hero-stack-item");
      gsap.from(items, {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.04,
        onComplete() {
          items.forEach((el, i) => {
            gsap.to(el, {
              y: i % 2 ? -4 : 4,
              duration: 3 + (i % 5) * 0.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: (i % 7) * 0.12,
            });
          });
        },
      });
    },
    { scope: stack, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <main className="hero">
      <header className="hero-masthead">
        <p className="hero-label">Portfolio</p>
        <p className="hero-label">Zulkifli Firdausi</p>
      </header>

      <div className="hero-stage">
        <div className="hero-copy">
          <p className="hero-lede">{about.short}</p>
          <p className="hero-note">Based in Malang, Indonesia</p>
          <a className="btn hero-cta" href="/projects">
            See {projects.length} projects
          </a>
        </div>

        <div className="hero-stack" ref={stack}>
          <p className="hero-label">Tech Stack</p>
          <ul className="hero-stack-list">
            {techIcons.map((tech) => (
              <li key={tech.name} className="hero-stack-item">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={tech.path} fill="currentColor" />
                </svg>
                <span>{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h1 className="hero-title">
        <span className="hero-title-line">FRONTEND</span>{" "}
        <span className="hero-title-line hero-title-line--right">
          DEVELOPER
        </span>
      </h1>
    </main>
  );
}
