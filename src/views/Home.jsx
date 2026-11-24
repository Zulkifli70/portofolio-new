import { about } from "../data/portfolio";

export default function Home() {
  return (
    <div className="home">
      {/* <header className="home-top">
        <div className="home-signature">
          <span className="home-signature-name">Zulkifli Firdausi</span>
          <span className="home-signature-role">
            Frontend Developer / UI UX Designer
          </span>
        </div>

        <div className="home-meta">
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span>Based in Indonesia</span>
        </div>
      </header> */}

      <main className="home-main">
        <div className="home-intro">
          {/* Sparkle marks the greeting as an aside, not a live status. */}
          <svg className="home-star" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0.8 9.5 5.3 14 8 9.5 10.7 8 15.2 6.5 10.7 2 8 6.5 5.3Z" />
          </svg>
          <p className="about-text">{about.text}</p>
        </div>

        <div className="home-stage">
          <figure className="home-portrait">
            <img
              className="about-photo"
              src="/aboutme.png"
              alt="Zulkifli Firdausi"
              width="832"
              height="1158"
              fetchPriority="high"
            />
          </figure>

          <h1 className="home-display">
            <span className="home-display-line">ZULKIFLI</span>
            <span className="home-display-line home-display-line--outline">
              FIRDAUSI
            </span>
          </h1>
        </div>
      </main>
    </div>
  );
}
