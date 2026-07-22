import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useRef } from "react";
import { createPortal } from "react-dom"; // renders cursor in document.body (outside scroll container)
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

/**
 * Showcase — Horizontal-scrolling project gallery with custom cursor.
 *
 * Layout:
 *   - A horizontal strip (`.horiz-gallery-strip`) pinned by SmoothScrollPortfolio's
 *     ScrollTrigger, so vertical scroll translates into horizontal movement.
 *   - Each project is a card linking to its live demo.
 *
 * Interactions:
 *   - Custom cursor (black dot) follows the mouse via `gsap.quickTo`.
 *   - On card hover: cursor expands into a pill showing "View project".
 *   - Title text reveals with a SplitText word animation on scroll.
 */
export default function Showcase() {
  /** Ref to the section for GSAP scoping. */
  const containerShowcaseRef = useRef(null);

  /** Ref to the custom cursor element (rendered via portal into document.body). */
  const cursorRef = useRef(null);

  /** Static project data — name, screenshot, and live URL. */
  const projects = [
    {
      name: "Project 1",
      image: "/project/expense.png",
      link: "https://zulk-expense.vercel.app/",
    },
    {
      name: "Project 2",
      image: "/project/pokemon.png",
      link: "https://zulkmemorycard.netlify.app/",
    },
    {
      name: "Project 3",
      image: "/project/assembly.png",
      link: "https://zulkassembly.vercel.app/",
    },
    {
      name: "Project 4",
      image: "/project/diary.png",
      link: "https://zulk-diary.vercel.app/",
    },
    {
      name: "Project 5",
      image: "/project/kanban.png",
      link: "https://zulk-kanban.netlify.app/",
    },
    {
      name: "Project 6",
      image: "/project/printforge.png",
      link: "https://next-project-eta-vert.vercel.app/3d-models",
    },
    {
      name: "Project 7",
      image: "/project/jobtracker.png",
      link: "https://zulk-jobtracker.netlify.app/",
    },
  ];

  useGSAP(
    () => {
      // ── Title word reveal ──────────────────────────────────────────
      const split = new SplitText(".title-sec", { type: "words" });

      gsap.from(split.words, {
        x: -150,
        opacity: 0,
        duration: 3.5,
        ease: "power4",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".title-sec",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // ── Custom cursor ──────────────────────────────────────────────
      const cursor = cursorRef.current;

      /** quickTo creates an optimized tween that reuses the same tween instance
       *  for each mouse move — much more performant than gsap.to per frame. */
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

      /** Tracks mouse position and moves the cursor element. Offset by -8 to center. */
      const handleMouseMove = (e) => {
        xTo(e.clientX - 8);
        yTo(e.clientY - 8);
      };
      window.addEventListener("mousemove", handleMouseMove);

      // ── Card hover: cursor morph ───────────────────────────────────
      // Only targets `.project-card` elements (not the title wrapper).
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card) => {
        /** On hover: expand cursor into a wide pill and show "View project" text. */
        card.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            width: 120,
            height: 40,
            borderRadius: 10,
            duration: 0.35,
            ease: "back.out(1.7)",
          });
          cursor.textContent = "View project";
        });
        /** On leave: shrink cursor back to a small circle and clear text. */
        card.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            width: 16,
            height: 16,
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          cursor.textContent = "";
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerShowcaseRef },
  );

  return (
    <Section
      ref={containerShowcaseRef}
      id="projects"
      className="showcase-section relative overflow-hidden"
    >
      <div className="container-fluid">
        {/* Horizontal gallery wrapper — pinned and translated by SmoothScrollPortfolio */}
        <div className="horiz-gallery-wrapper">
          {/* Horizontal strip: flex row of title + project cards */}
          <div className="horiz-gallery-strip pr-10">
            <div className="project-wrap flex justify-center items-center ml-5">
              <h1 className="title-sec font-space text-5xl lg:text-6xl xl:text-8xl text-text-primary font-bold">
                MY PROJECT SHOWCASE
              </h1>
            </div>
            {projects.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.name}
              >
                <div className="project-wrap project-card bg-surface rounded-2xl">
                  <img src={project.image} alt={project.name} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Custom cursor portal — rendered into document.body so it's outside
          the ScrollSmoother container and isn't affected by transform layers */}
      {createPortal(
        <div
          ref={cursorRef}
          className="fake-cursor"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "black",
            color: "white",
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 999,
          }}
        />,
        document.body,
      )}
    </Section>
  );
}
