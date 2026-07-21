import Section from "../layout/Section";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin);

export default function Experience() {
  const expSectionRef = useRef(null);

  const experiences = [
    {
      company: "Jalin Mayantara Indonesia",
      position: "UI UX Designer (Intership)",
      industry: "IT Services",
      period: "2022 - 2023",
      location: "Malang, Indonesia",
      responsibilities: [
        "Conducted user research and stakeholder interviews to gather insights for UI/UX design decisions.",
        "Created wireframes, prototypes, and high-fidelity designs using Figma to visualize and validate user flows.",
        "Collaborated with cross-functional teams to define features and translate them into intuitive user experiences.",
        "Developed and maintained design systems to ensure consistency and serve as guidelines for developers.",
      ],
    },
  ];

  useGSAP(
    () => {
      let splitTitle = SplitText.create(".title", { type: "chars" });

      gsap.from(splitTitle.chars, {
        duration: 1,
        x: -100,
        autoAlpha: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".title",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".exp-card", {
        duration: 1,
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: ".exp-card",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: expSectionRef },
  );

  return (
    <Section ref={expSectionRef}>
      <div className="w-full h-full min-h-screen flex flex-col gap-10 px-5 py-20 font-neuton">
        <h2 className="title font-space text-4xl md:text-7xl xl:text-9xl font-semibold text-text-primary border-b-2 border-b-gray-400">
          Experience
        </h2>
        <div className="w-full flex-1 flex-col text-text-secondary">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="exp-card flex flex-col h-full min-h-80 gap-10"
            >
              <div className="w-full">
                <h3 className="text-2xl xl:text-5xl font-neuton font-bold">
                  {exp.company}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row h-full gap-5 xl:gap-40">
                <div className="flex flex-1">
                  <h4 className="text-lg lg:text-2xl font-semibold">
                    {exp.period}
                  </h4>
                </div>
                <div className="flex flex-col gap-5 flex-3">
                  <div className="flex justify-between">
                    <h4 className="text-lg lg:text-xl font-semibold">
                      Position
                    </h4>{" "}
                    <h4 className="text-lg lg:text-xl">{exp.position}</h4>
                  </div>
                  <div className="flex justify-between">
                    <h4 className="text-lg lg:text-xl font-semibold">
                      Location
                    </h4>{" "}
                    <h4 className="text-lg lg:text-xl">{exp.location}</h4>
                  </div>
                  <div className="flex justify-between">
                    <h4 className="text-lg lg:text-xl font-semibold">
                      Industry
                    </h4>{" "}
                    <h4 className="text-lg lg:text-xl">{exp.industry}</h4>
                  </div>
                </div>
                <ul className="flex flex-col gap-5 flex-4">
                  {exp.responsibilities.map((res, index) => (
                    <li className="text-xl" key={index}>
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
