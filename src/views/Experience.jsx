import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <div className="view">
      <h1 className="view-title">Experience</h1>

      {experiences.map((exp) => (
        <article key={exp.company}>
          <h2 className="exp-company">{exp.company}</h2>

          <dl className="exp-meta">
            <div>
              <dt>Period</dt>
              <dd>{exp.period}</dd>
            </div>
            <div>
              <dt>Position</dt>
              <dd>{exp.position}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{exp.location}</dd>
            </div>
          </dl>

          <ul className="exp-list">
            {exp.responsibilities.map((item, i) => (
              <li key={item}>
                <span className="num">0{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
