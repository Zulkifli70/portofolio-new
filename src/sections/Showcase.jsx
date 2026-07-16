import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText);

export default function Showcase() {
  const containerShowcaseRef = useRef(null);

  const projects = [
    {
      name: "Project 1",
      image: "/project/expense.png",
    },
    {
      name: "Project 2",
      image: "/project/pokemon.png",
    },
    {
      name: "Project 3",
      image: "/project/assembly.png",
    },
    {
      name: "Project 4",
      image: "/project/diary.png",
    },
    {
      name: "Project 5",
      image: "/project/kanban.png",
    },
    {
      name: "Project 6",
      image: "/project/printforge.png",
    },
    {
      name: "Project 7",
      image: "/project/jobtracker.png",
    },
  ];

  useGSAP(() => {
    const split = new SplitText(".title-sec", { type: "words" });

    gsap.from(split.words, {
      x: -150,
      opacity: 0,
      duration: 2,
      ease: "power4",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".title-sec",
        start: "top center",
        toggleActions: "play none none none",
      },
    });
  });

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
              <h1 className="title-sec font-neuton text-5xl md:text-8xl font-bold">
                MY PROJECT SHOWCASE
              </h1>
            </div>
            {projects.map((project) => (
              <div key={project.name} className="project-wrap">
                <img src={project.image} alt={project.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
