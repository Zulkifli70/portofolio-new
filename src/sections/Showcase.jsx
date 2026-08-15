import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Showcase — Horizontal-scrolling project gallery.
 *
 * Layout:
 *   - A horizontal strip (`.horiz-gallery-strip`) pinned by ScrollTrigger,
 *     so vertical scroll translates into horizontal movement.
 *   - Title + project cards in a flex row.
 *
 * Animations:
 *   - Title words reveal on scroll (SplitText).
 *   - Horizontal scroll via ScrollTrigger (pin + x translation).
 */
export default function Showcase() {
  const containerShowcaseRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  /** Static project data — name, screenshot, and live URL. */
  const projects = [
    {
      name: "Pokemon Memory Game",
      image: "/project/pokemon.png",
      link: "https://zulkmemorycard.netlify.app/",
      repo: "https://github.com/zulk/pokemon-memory",
      description: "A memory card matching game featuring Pokemon characters. Flip cards to find matching pairs with score tracking and difficulty levels.",
      tags: ["React", "JavaScript", "CSS"],
    },
    {
      name: "Assembly Word",
      image: "/project/assembly.png",
      link: "https://zulkassembly.vercel.app/",
      repo: "https://github.com/zulk/assembly-word",
      description: "Word guessing game inspired by assembly language concepts. Guess the word letter by letter with visual feedback.",
      tags: ["React", "JavaScript", "Tailwind"],
    },
    {
      name: "Kanban Board",
      image: "/project/kanban.png",
      link: "https://zulk-kanban.netlify.app/",
      repo: "https://github.com/zulk/kanban-board",
      description: "Drag-and-drop kanban board for task management. Create, edit, and organize tasks across columns.",
      tags: ["React", "JavaScript", "DnD"],
    },
    {
      name: "Print Forge",
      image: "/project/printforge.png",
      link: "https://next-project-eta-vert.vercel.app/",
      repo: "https://github.com/zulk/print-forge",
      description: "3D printing marketplace and design tool. Browse, customize, and download 3D print-ready models.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      name: "Tenzies",
      image: "/project/tenzies.png",
      link: "https://zulktenzies.netlify.app/",
      repo: "https://github.com/zulk/tenzies",
      description: "Roll dice until all match. Click to freeze dice at their current value between rolls.",
      tags: ["React", "JavaScript", "CSS"],
    },
  ];

  useGSAP(
    () => {
      // ── Title word reveal ──────────────────────────────────────────
      const split = new SplitText(".title-sec", { type: "words" });

      gsap.from(split.words, {
        y: -150,
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

      // ── Horizontal gallery ScrollTrigger ───────────────────────────
      // Pin the wrapper and translate the inner strip horizontally as
      // the user scrolls vertically. This logic was moved from
      // SmoothScrollPortfolio to keep component-specific logic together.
      const horizontalSections = gsap.utils.toArray(
        ".horiz-gallery-wrapper",
        containerShowcaseRef.current,
      );

      const removeRefreshHandlers = [];

      horizontalSections.forEach((section) => {
        const pinWrap = section.querySelector(".horiz-gallery-strip");
        if (!pinWrap) return;

        let pinWrapWidth = 0;
        let horizontalScrollLength = 0;

        const refresh = () => {
          pinWrapWidth = pinWrap.scrollWidth;
          horizontalScrollLength = pinWrapWidth - window.innerWidth;
        };

        refresh();

        gsap.to(pinWrap, {
          scrollTrigger: {
            scrub: true,
            trigger: section,
            pin: section,
            start: "center center",
            end: () => `+=${pinWrapWidth}`,
            invalidateOnRefresh: true,
          },
          x: () => -horizontalScrollLength,
          ease: "none",
        });

        ScrollTrigger.addEventListener("refreshInit", refresh);
        removeRefreshHandlers.push(() => {
          ScrollTrigger.removeEventListener("refreshInit", refresh);
        });
      });

      // Return cleanup function for useGSAP
      return () => {
        removeRefreshHandlers.forEach((remove) => remove());
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
        {/* Horizontal gallery wrapper — pinned and translated by ScrollTrigger */}
        <div className="horiz-gallery-wrapper">
          {/* Horizontal strip: flex row of title + project cards */}
          <div className="horiz-gallery-strip pr-10">
            <div
              className="project-wrap flex justify-center items-center ml-5"
              data-cursor-target
            >
              <h1 className="title-sec font-space text-5xl lg:text-6xl xl:text-8xl text-text-primary font-bold">
                MY PROJECT SHOWCASE
              </h1>
            </div>
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-wrap project-card bg-surface rounded-2xl cursor-pointer"
                data-cursor-target
                data-cursor-label="View Project"
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.image} alt={project.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
          <div
            className="bg-surface rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              ✕
            </button>

            {/* Images section */}
            <div className="flex gap-3 p-4">
              {/* Main image */}
              <div className="flex-1 rounded-xl overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 w-24">
                <div className="rounded-lg overflow-hidden bg-muted aspect-square">
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="rounded-lg overflow-hidden bg-muted aspect-square">
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="rounded-lg overflow-hidden bg-muted aspect-square">
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover opacity-60" />
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="px-6 pb-6">
              {/* Tags + Links */}
              <div className="flex items-center justify-between mt-2 mb-4">
                <div className="flex gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    link Website
                  </a>
                  <a
                    href={selectedProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    link repo
                  </a>
                </div>
              </div>

              {/* Title + Description */}
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {selectedProject.name}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </Section>
  );
}
