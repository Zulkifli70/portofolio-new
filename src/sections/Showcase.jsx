import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useEffect, useRef, useState } from "react";
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
  const [activeImage, setActiveImage] = useState(0);
  const originRef = useRef(null);
  const modalWrapRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    window.__smoother?.paused(!!selectedProject);
    return () => {
      document.body.style.overflow = "";
      window.__smoother?.paused(false);
    };
  }, [selectedProject]);

  /** Animate the modal from the clicked card's rect to center. */
  const animateModal = (fromRect) => {
    const targetRect = modalWrapRef.current.getBoundingClientRect();
    const scaleX = fromRect.width / targetRect.width;
    const scaleY = fromRect.height / targetRect.height;
    const x =
      fromRect.left +
      fromRect.width / 2 -
      (targetRect.left + targetRect.width / 2);
    const y =
      fromRect.top +
      fromRect.height / 2 -
      (targetRect.top + targetRect.height / 2);

    return gsap.fromTo(
      modalWrapRef.current,
      { x, y, scaleX, scaleY, opacity: 0, transformOrigin: "center center" },
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
    );
  };

  const openModal = (project, e) => {
    originRef.current = e.currentTarget.getBoundingClientRect();
    setSelectedProject(project);
    setActiveImage(0);
  };

  const closeModal = () => {
    const origin = originRef.current;
    const targetEl = modalWrapRef.current;
    if (origin && targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const scaleX = origin.width / targetRect.width;
      const scaleY = origin.height / targetRect.height;
      const x =
        origin.left +
        origin.width / 2 -
        (targetRect.left + targetRect.width / 2);
      const y =
        origin.top +
        origin.height / 2 -
        (targetRect.top + targetRect.height / 2);

      gsap.to(modalWrapRef.current, {
        x,
        y,
        scaleX,
        scaleY,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setSelectedProject(null),
      });
    } else {
      setSelectedProject(null);
    }
  };

  useEffect(() => {
    if (!selectedProject || !originRef.current || !modalWrapRef.current) return;
    const tl = animateModal(originRef.current);
    return () => tl.kill();
  }, [selectedProject]);

  /** Static project data — name, screenshot, and live URL. */
  const projects = [
    {
      name: "Pokemon Memory Game",
      image: "/project/pokemon.png",
      gallery: [
        "/project/pokemon.png",
        "/showcase-details/memory-game/game-board.jpg",
        "/showcase-details/memory-game/game-home.jpg",
      ],
      link: "https://zulkmemorycard.netlify.app/",
      repo: "https://github.com/zulk/pokemon-memory",
      status: "Live",
      features: [
        "Score tracking and best-score persistence",
        "Multiple difficulty levels",
        "Flip and match card animations",
      ],
      description:
        "A memory card matching game featuring Pokemon characters. Flip cards to find matching pairs with score tracking and difficulty levels.",
      tags: ["React", "JavaScript", "CSS"],
    },
    {
      name: "Assembly Word",
      image: "/project/assembly.png",
      gallery: [
        "/project/assembly.png",
        "/project/assembly.png",
        "/project/assembly.png",
      ],
      link: "https://zulkassembly.vercel.app/",
      repo: "https://github.com/zulk/assembly-word",
      status: "Live",
      features: [
        "Letter-by-letter word guessing",
        "Visual feedback for correct/incorrect letters",
        "Hints and scoring system",
      ],
      description:
        "Word guessing game inspired by assembly language concepts. Guess the word letter by letter with visual feedback.",
      tags: ["React", "JavaScript", "TailwindCSS"],
    },
    {
      name: "Kanban Board",
      image: "/project/kanban.png",
      gallery: [
        "/project/kanban.png",
        "/project/kanban.png",
        "/project/kanban.png",
      ],
      link: "https://zulk-kanban.netlify.app/",
      repo: "https://github.com/zulk/kanban-board",
      status: "Live",
      features: [
        "Drag-and-drop between columns",
        "Create, edit, and delete tasks",
        "Local storage persistence",
      ],
      description:
        "Drag-and-drop kanban board for task management. Create, edit, and organize tasks across columns.",
      tags: ["React", "JavaScript", "DnD"],
    },
    {
      name: "Print Forge",
      image: "/project/printforge.png",
      gallery: [
        "/project/printforge.png",
        "/project/printforge.png",
        "/project/printforge.png",
      ],
      link: "https://next-project-eta-vert.vercel.app/",
      repo: "https://github.com/zulk/print-forge",
      status: "On Progress",
      features: [
        "Browse and search 3D print models",
        "Customize model options",
        "Responsive marketplace layout",
      ],
      description:
        "3D printing marketplace and design tool. Browse, customize, and download 3D print-ready models.",
      tags: ["Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      name: "Tenzies",
      image: "/project/tenzies.png",
      gallery: [
        "/project/tenzies.png",
        "/project/tenzies.png",
        "/project/tenzies.png",
      ],
      link: "https://zulktenzies.netlify.app/",
      repo: "https://github.com/zulk/tenzies",
      status: "Live",
      features: [
        "Roll dice until all match",
        "Freeze dice between rolls",
        "Roll counter and win detection",
      ],
      description:
        "Roll dice until all match. Click to freeze dice at their current value between rolls.",
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
                onClick={(e) => openModal(project, e)}
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
            onClick={closeModal}
          >
            <div
              ref={modalWrapRef}
              className="bg-surface rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>

              {/* Images section */}
              <div className="flex gap-3 p-4">
                {/* Main image */}
                <div className="flex-1 rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.gallery[activeImage]}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex flex-col justify-center gap-3 w-24">
                  {selectedProject.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-lg overflow-hidden aspect-square cursor-pointer ${
                        i === activeImage
                          ? "ring-2 ring-text-primary"
                          : "opacity-60 hover:opacity-100 transition-opacity"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content section */}
              <div className="px-6 pb-6">
                {/* Tags + Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-hover border border-border/40 text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-text-primary text-text-white hover:bg-text-primary/85 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      Website
                    </a>
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-border/60 text-text-primary hover:bg-hover transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Repository
                    </a>
                  </div>
                </div>

                {/* Title + Status */}
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {selectedProject.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                      selectedProject.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        selectedProject.status === "Live"
                          ? "bg-green-600"
                          : "bg-amber-500 animate-pulse"
                      }`}
                    />
                    {selectedProject.status}
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Key Features */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedProject.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0 text-text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Section>
  );
}
