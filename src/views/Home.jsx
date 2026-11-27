import { useEffect, useRef } from "react";
import gsap from "gsap";

const TRAIL_LENGTH = 15;

// outside the component: stable, not recreated every render
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const lerp = (a, b, n) => a + (b - a) * n;

export default function Home() {
  const inkTextRef = useRef(null);
  const trailRef = useRef(null);

  // --- "Frontend Developer" intro animation ---
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".letter-tspan", {
        attr: { x: -40 }, // transforms don't work on tspan, attr does
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, inkTextRef);
    return () => ctx.revert();
  }, []);

  // --- Cursor trail ---
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const circles = trailRef.current?.querySelectorAll("circle");
    if (!circles?.length) return;

    const mouse = { x: -100, y: -100 };
    const points = Array.from({ length: circles.length }, () => ({
      x: -100,
      y: -100,
    }));
    let started = false;
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!started) {
        // snap on first move so the trail doesn't fly in from the corner
        points.forEach((p) => {
          p.x = mouse.x;
          p.y = mouse.y;
        });
        started = true;
      }
    };

    const tick = () => {
      points.forEach((p, i) => {
        const target = i === 0 ? mouse : points[i - 1];
        p.x = lerp(p.x, target.x, 0.35);
        p.y = lerp(p.y, target.y, 0.35);
        circles[i].setAttribute("cx", p.x);
        circles[i].setAttribute("cy", p.y);
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf); // now cancels the *latest* frame
    };
  }, []);

  return (
    <div className="home">
      <main className="home-main">
        <svg
          ref={trailRef}
          className="home-ink-trail"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
          aria-hidden="true"
        >
          {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
            <circle
              key={i}
              cx={-100}
              cy={-100}
              r={Math.max(2, 8 - i * 0.4)}
              fill="#262626"
              opacity={1 - (i / TRAIL_LENGTH) * 0.8}
            />
          ))}
        </svg>
      </main>
    </div>
  );
}
