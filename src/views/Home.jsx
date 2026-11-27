<<<<<<< HEAD
import { about } from "../data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";

=======
>>>>>>> 99f228374c96473d182d3c5b97d55844dca19121
export default function Home() {
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- SVG "Frontend Developer" letters animation ---
  useEffect(() => {
    if (reduced()) return;
    const chars = gsap.utils.toArray(
      ".home-ink-text text tspan",
    );
    if (chars.length === 0) return;
    gsap.from(chars, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    });
  }, [reduced]);

  // --- Ink trail: circle follows cursor with a fading tail ---
  const trailRef = useRef([]);
  useEffect(() => {
    if (reduced()) return;
    const maxTrail = 15;
    const trailEl = document.querySelector(".home-ink-trail");
    if (!trailEl) return;
    const circle = document.querySelector(
      ".home-ink-trail circle",
    );
    if (!circle) return;

    let mouseX = 0,
      mouseY = 0;
    let targetX = 0,
      targetY = 0;

    const lerp = (a, b, n) =>
      a + (b - a) * n;

    const updateCircle = () => {
      targetX = mouseX;
      targetY = mouseY;
      circle.setAttribute("cx", String(targetX));
      circle.setAttribute("cy", String(targetY));
      // add current position to trail ref
      trailRef.current?.unshift({
        x: targetX,
        y: targetY,
        alpha: 1,
      });
      if (trailRef.current?.length > maxTrail)
        trailRef.current?.pop();
      // update trail circles in DOM
      const trailEls = document.querySelectorAll(
        ".home-ink-trail .trail-circle",
      );
      trailEls.forEach((el, i) => {
        const t = trailRef.current?.[i + 1];
        if (!t) return;
        el.setAttribute("cx", String(t.x));
        el.setAttribute("cy", String(t.y));
        const alpha = 1 - (i / maxTrail) * 0.8;
        el.style.opacity = String(alpha);
      });
      // recursively update
      requestAnimationFrame(updateCircle);
    };

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // start the trail loop
    const raf = requestAnimationFrame(updateCircle);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

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
<<<<<<< HEAD

        {/* SVG "Frontend Developer" ink letters */}
        <svg
          className="home-ink-text"
          viewBox="0 0 400 100"
          aria-label="Frontend Developer"
        >
          <text
            x="0"
            y="80"
            fill="#262626"
            fontFamily="Syne, system-ui, sans-serif"
            fontWeight="800"
            fontSize="clamp(3rem, 11vw, 9.5rem)"
          >
            <tspan x="0" dy="1.2em" className="letter-tspan">
              Frontend
            </tspan>
            <tspan x="0" dy="1.2em" className="letter-tspan">
              Developer
            </tspan>
          </text>
        </svg>

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
=======
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
>>>>>>> 99f228374c96473d182d3c5b97d55844dca19121
        </div>

        {/* Ink trail SVG */}
        <svg
          className="home-ink-trail"
          style={{position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%'}}
          aria-hidden="true"
        >
          <circle
            className="home-ink-trail-circle"
            r="8"
            fill="#262626"
            opacity="0.8"
          />
          {trailRef.current?.length > 0 &&
            trailRef.current?.map((_, i) => (
              <circle
                key={i}
                className="trail-circle"
                r="4"
                fill="#262626"
                opacity={1 - (i / 15) * 0.8}
              />
            ))}
        </svg>
      </main>
    </div>
  );
}
