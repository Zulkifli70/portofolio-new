import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Letters = ({ word }) =>
  [...word].map((char, i) => (
    <span className="loading-letter" key={i} aria-hidden="true">
      {char}
    </span>
  ));

export default function LoadingScreen() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(q(".loading-meta, .loading-letter, .loading-rule"), {
          autoAlpha: 1,
        });
        gsap.set(q(".loading-rule-fill"), { scaleX: 1 });
        gsap.to(root.current, { autoAlpha: 0, duration: 0.2, delay: 3.5 });
        return;
      }

      gsap
        .timeline()
        .fromTo(
          q(".loading-meta"),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" },
        )
        .fromTo(
          q(".loading-line--solid .loading-letter"),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.25,
        )
        .fromTo(
          q(".loading-line--outline .loading-letter"),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.6,
        )
        .fromTo(
          q(".loading-rule-fill"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          0.8,
        )
        .to(
          q(".loading-wordmark"),
          { y: -12, autoAlpha: 0, duration: 0.25, ease: "power2.in" },
          3.2,
        )
        .to(q(".loading-meta, .loading-rule"), { autoAlpha: 0, duration: 0.25 }, 3.2)
        .to(root.current, { yPercent: -100, duration: 0.45, ease: "power2.inOut" }, 3.25);
    },
    { scope: root },
  );

  return (
    <div
      className="loading-screen"
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loading-meta">
        <span>Portfolio / {new Date().getFullYear()}</span>
        <span>Based in Indonesia</span>
      </div>

      <div className="loading-wordmark" aria-label="Zulkifli Firdausi">
        <div className="loading-line loading-line--solid">
          <Letters word="ZULKIFLI" />
        </div>
        <div className="loading-line loading-line--outline">
          <Letters word="FIRDAUSI" />
        </div>
      </div>

      <div className="loading-rule">
        <div className="loading-rule-fill" />
      </div>
    </div>
  );
}
