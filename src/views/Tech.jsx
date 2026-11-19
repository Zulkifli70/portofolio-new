import { techStacks } from "../data/portfolio";

export default function Tech() {
  return (
    <div className="view">
      <h1 className="view-title">Tech Stack</h1>
      <div className="tech-grid">
        {techStacks.map((tech) => (
          <div key={tech.name} className="tech-item">
            <img src={tech.imgPath} alt="" loading="lazy" />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
