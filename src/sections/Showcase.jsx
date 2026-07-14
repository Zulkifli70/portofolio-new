import Section from "../layout/Section";

export default function Showcase() {
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

  return (
    <Section
      id="projects"
      className="showcase-section relative overflow-hidden bg-blue-200 px-0"
    >
      <div className="container-fluid">
        <div className="horiz-gallery-wrapper">
          <div className="horiz-gallery-strip pr-10">
            <div className="project-wrap flex justify-center items-center">
              <h1 className="font-neuton md:text-5xl font-bold">
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
