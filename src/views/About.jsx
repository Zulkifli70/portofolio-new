import { about } from "../data/portfolio";

export default function About() {
  return (
    <div className="view">
      <h1 className="view-title">About Me</h1>
      <div className="about-grid">
        <p className="about-text">{about.text}</p>
        <img
          className="about-photo"
          src="/aboutme.png"
          alt="Zulkifli Firdausi"
          loading="lazy"
        />
      </div>
    </div>
  );
}
