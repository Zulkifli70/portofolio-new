import Section from "../layout/Section";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Experience — Work experience section with animated reveal.
 *
 * Animations:
 *   1. Title: clip-path wipe reveal from right.
 *   2. Cards: staggered clip-path reveal with alternating directions (right, left, bottom).
 *   3. Card detail rows: staggered slide-in from right.
 *   4. Responsibilities: staggered clip-path line reveal.
 *   All trigger once when their respective elements scroll into view.
 */
export default function Experience() {
  /** Ref to the section for GSAP scoping. */
  const expSectionRef = useRef(null);

  /** Static experience data — company, role, period, responsibilities. */
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
      // ── Title: clip-path wipe reveal ─────────────────────────────────
      gsap.fromTo(
        ".title",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Cards: staggered clip-path reveal with alternating directions ─
      const cards = gsap.utils.toArray(".exp-card");
      const directions = [
        { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },   // from right
        { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },   // from left
        { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },   // from bottom
      ];

      cards.forEach((card, i) => {
        const dir = directions[i % directions.length];

        gsap.fromTo(
          card,
          {
            clipPath: dir.from,
            opacity: 0,
          },
          {
            clipPath: dir.to,
            opacity: 1,
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── Card internals: staggered detail rows ────────────────────────
      const detailRows = gsap.utils.toArray(".exp-card > div > div:last-child > div");
      if (detailRows.length) {
        gsap.fromTo(
          detailRows,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".exp-card",
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ── Responsibilities: staggered line reveal ──────────────────────
      const responsibilities = gsap.utils.toArray(".exp-card li");
      if (responsibilities.length) {
        gsap.fromTo(
          responsibilities,
          { clipPath: "inset(0 100% 0 0)", y: 10 },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".exp-card",
              start: "top 65%",
              toggleActions: "play none none none",
            },
          },
        );
      }
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
              {/* Company name */}
              <div className="w-full">
                <h3 className="text-2xl xl:text-5xl font-neuton font-bold">
                  {exp.company}
                </h3>
              </div>
              {/* Details row: period | position/location/industry | responsibilities */}
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
