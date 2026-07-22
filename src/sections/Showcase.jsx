import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useRef } from "react";
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

      // ── Horizontal gallery ScrollTrigger ───────────────────────────
      // Pin the wrapper and translate the inner strip horizontally as
      // the user scrolls vertically. This logic was moved from
      // SmoothScrollPortfolio to keep component-specific logic together.
      const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper", containerShowcaseRef.current);

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
    </Section>
  );
}
