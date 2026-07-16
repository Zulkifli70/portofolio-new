import Section from "../layout/Section";

export default function Experience() {
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
  return (
    <Section>
      <div className="w-full h-full min-h-screen flex flex-col gap-10 px-5 py-20 font-neuton">
        <h2 className="text-4xl md:text-9xl font-black border-b border-b-gray-400">
          Experience
        </h2>
        <div className="w-full flex-1 flex-col">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="flex flex-col h-full min-h-80 gap-10"
            >
              <div className="w-full">
                <h3 className="text-2xl md:text-5xl font-neuton">
                  {exp.company}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row h-full gap-5 md:gap-40">
                <div className="flex flex-1">
                  <h4 className="text-lg md:text-2xl">{exp.period}</h4>
                </div>
                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-lg md:text-xl font-semibold">
                      Position
                    </h4>{" "}
                    <h4 className="text-lg md:text-xl">{exp.position}</h4>
                  </div>
                  <div className="flex justify-between">
                    <h4 className="text-lg md:text-xl font-semibold">
                      Location
                    </h4>{" "}
                    <h4 className="text-lg md:text-xl">{exp.location}</h4>
                  </div>
                  <div className="flex justify-between">
                    <h4 className="text-lg md:text-xl font-semibold">
                      Industry
                    </h4>{" "}
                    <h4 className="text-lg md:text-xl">{exp.industry}</h4>
                  </div>
                </div>
                <ul className="flex flex-col gap-5 flex-2">
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
