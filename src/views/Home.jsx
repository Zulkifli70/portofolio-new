import { about, projects } from "../data/portfolio";

/**
 * Home hero, set as a printed portfolio plate: a masthead rule on top,
 * a short lede with portrait in the middle, and FRONTEND DEVELOPER as the
 * poster title pinned to the bottom edge.
 */
export default function Home() {
  return (
    <main className="hero">
      <header className="hero-masthead">
        <p className="hero-label">Portfolio</p>
        <p className="hero-label">Zulkifli Firdausi</p>
      </header>

      <div className="hero-stage">
        <div className="hero-copy">
          <p className="hero-lede">{about.short}</p>
          <p className="hero-note">Based in Malang, Indonesia</p>
          <a className="btn hero-cta" href="/projects">
            See {projects.length} projects
          </a>
        </div>

        <figure className="hero-portrait">
          <img
            src="/aboutme.png"
            alt="Zulkifli Firdausi"
            width="832"
            height="1158"
            fetchPriority="high"
          />
        </figure>
      </div>

      <h1 className="hero-title">
        <span className="hero-title-line">FRONTEND</span>{" "}
        <span className="hero-title-line hero-title-line--right">
          DEVELOPER
        </span>
      </h1>
    </main>
  );
}
