import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <div className="view">
      <h1 className="view-title">Experience</h1>

      <ol className="exp-timeline">
        {experiences.map((exp, index) => (
          <li key={`${exp.company}-${index}`} className="exp-card">
            <div className="exp-head">
              <span className="exp-index">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="exp-company">{exp.company}</h2>
              <span className="exp-period">{exp.period}</span>
            </div>

            <dl className="exp-meta">
              <div>
                <dt>Position</dt>
                <dd>{exp.position}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{exp.industry}</dd>
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
          </li>
        ))}
      </ol>
    </div>
  );
}
