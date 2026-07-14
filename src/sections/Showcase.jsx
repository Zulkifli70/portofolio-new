import Section from "../layout/Section";

export default function Showcase() {
  const projects = [
    { name: "Project 1" },
    { name: "Project 2" },
    { name: "Project 3" },
    { name: "Project 4" },
    { name: "Project 5" },
    { name: "Project 6" },
  ];

  return (
    <Section className="relative">
      <div className="w-full min-h-screen py-20 flex items-center overflow-hidden bg-blue-200">
        <div className="horiz-showcase-wrapper showcase-wrapper">
          <div className="horiz-showcase-strip showcase-wrapper">
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-card w-[33vw] flex justify-center items-center border shrink-0"
              >
                {project.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
