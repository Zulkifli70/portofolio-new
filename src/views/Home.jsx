export default function Home() {
  return (
    <div className="home">
      <main className="home-main">
        <div className="home-hero">
          <div className="home-identity">
            <span className="home-name">Zulkifli Firdausi</span>
            <span className="home-role">Frontend Developer / UI UX Designer</span>
          </div>
          <div className="home-capabilities">
            <span className="capability-tag">React</span>
            <span className="capability-tag">Tailwind CSS</span>
            <span className="capability-tag">GSAP Animation</span>
            <span className="capability-tag">Design Systems</span>
            <span className="capability-tag">Figma</span>
          </div>
        </div>
        <div className="home-craft">
          <span className="craft-tagline">Turning interfaces into experiences</span>
          <hr className="home-craft-rule" />
          <div className="home-highlights">
            <div className="highlight">
              <span className="highlight-icon" aria-hidden="true">✓</span>
              <span className="highlight-text">Pixel-perfect UI</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon" aria-hidden="true">✓</span>
              <span className="highlight-text">Accessible by design</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon" aria-hidden="true">✓</span>
              <span className="highlight-text">Performance first</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
