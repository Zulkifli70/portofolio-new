import Section from "../layout/Section";

export default function Experience() {
  const experiences = [
    {
      company: "Jalin Mayantara Indonesia",
      position: "UI UX Designer (Intership)",
      industry: "IT Services & IT Consulting",
      period: "September 2022 - February 2023",
      responsibilities: [
        "Conducted user research and stakeholder interviews to gather insights for UI/UX design decisions.",
        "Created wireframes, prototypes, and high-fidelity designs using Figma to visualize and validate user flows.",
        "Collaborated with cross-functional teams to define features and translate them into intuitive user experiences.",
        "Developed and maintained design systems to ensure consistency and serve as guidelines for developers.",
      ],
    },
  ];
  return (
    <Section>
      <div className="w-full h-full min-h-screen flex flex-col items-center px-5 py-20">
        <h2 className="font-neuton md:text-5xl font-black">Experience</h2>
        <div className="w-full flex-1 bg-amber-100">
          {experiences.map((exp) => (
            <div key={exp.company} className="exp-card">
              {exp.company}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
