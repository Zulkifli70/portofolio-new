import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useRef } from "react";
import { createPortal } from "react-dom"; // tambahan
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText);

export default function Showcase() {
  const containerShowcaseRef = useRef(null);
  const cursorRef = useRef(null);

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
          markers: true,
          toggleActions: "play none none none",
        },
      });

      const cursor = cursorRef.current;
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

      const handleMouseMove = (e) => {
        xTo(e.clientX - 8);
        yTo(e.clientY - 8);
      };
      window.addEventListener("mousemove", handleMouseMove);

      // hanya card project (yang punya <img>), bukan wrapper judul
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card) => {
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
        <div className="horiz-gallery-wrapper">
          <div className="horiz-gallery-strip pr-10">
            <div className="project-wrap flex justify-center items-center ml-5">
              <h1 className="title-sec font-neuton text-5xl lg:text-6xl xl:text-8xl text-text-primary font-bold">
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
