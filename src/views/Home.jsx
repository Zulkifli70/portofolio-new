import { about } from "../data/portfolio";

export default function Home() {
  return (
    <div className="home">
      <main className="home-main">
        <div className="home-name">
          <h1 className="home-display">
            <span className="home-display-line">ZULKIFLI</span>
            <span className="home-display-line home-display-line--outline">
              FIRDAUSI
            </span>
          </h1>
          {/* 1px pencil rule sits above the name stage — conveyed by CSS background */}
        </div>

        <div className="home-intro">
          {/* Sparkle marks the greeting as an aside, not a live status. */}
          <svg
            className="home-star"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M8 0.8 9.5 5.3 14 8 9.5 10.7 8 15.2 6.5 10.7 2 8 6.5 5.3Z"
            />
          </svg>
          <p className="about-text">
            {about.text}
          </p>
        </div>
      </main>
    </div>
  );
}