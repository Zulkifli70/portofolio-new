import Section from "../layout/Section";

export default function Showcase() {
  const projects = [
    {
      name: "Project 1",
      image: "https://assets.codepen.io/16327/portrait-image-1.jpg",
    },
    {
      name: "Project 2",
      image: "https://assets.codepen.io/16327/portrait-image-2.jpg",
    },
    {
      name: "Project 3",
      image: "https://assets.codepen.io/16327/portrait-image-3.jpg",
    },
    {
      name: "Project 4",
      image: "https://assets.codepen.io/16327/portrait-image-4.jpg",
    },
    {
      name: "Project 5",
      image: "https://assets.codepen.io/16327/portrait-image-5.jpg",
    },
    {
      name: "Project 6",
      image: "https://assets.codepen.io/16327/portrait-image-6.jpg",
    },
  ];

  return (
    <Section
      id="projects"
      className="showcase-section relative overflow-hidden bg-blue-200 px-0"
    >
      <div className="container-fluid">
        <div className="horiz-gallery-wrapper">
          <div className="horiz-gallery-strip">
            <div className="project-wrap flex justify-center items-center">
              <h1 className="font-neuton text-5xl font-bold">
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
