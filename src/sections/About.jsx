import Section from "../layout/Section";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

/**
 * About — "About Me" section with animated text reveals.
 *
 * Animations:
 *   1. Section title uses ScrambleText to reveal "About Me" with a typewriter scramble effect.
 *   2. Paragraph lines clip-path mask reveal from bottom with stagger.
 *   3. Subtle gradient underline sweep on paragraph.
 *   All trigger once when the section scrolls into view.
 */
export default function About() {
  /** Ref to the section container for GSAP scoping and cleanup. */
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ── Title: scramble reveal ───────────────────────────────────────
      gsap.to(".about", {
        duration: 3,
        scrambleText: {
          text: "About Me",
          chars: "lowercase",
          rightToLeft: false,
          tweenLength: false,
        },
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // ── Paragraph: line-by-line clip-path mask reveal ────────────────
      // SplitText into lines so each wrapped line gets its own mask wipe
      const splitPara = SplitText.create(".para", { type: "lines" });

      // Set each line to its own overflow:hidden container for clean masking
      splitPara.lines.forEach((line) => {
        line.style.overflow = "hidden";
      });

      gsap.fromTo(
        splitPara.lines,
        { clipPath: "inset(0 0 100% 0)", y: 30 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".para",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Paragraph: subtle gradient underline sweep ───────────────────
      gsap.fromTo(
        ".para",
        { backgroundSize: "0% 2px" },
        {
          backgroundSize: "100% 2px",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".para",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Revert SplitText on cleanup to restore original DOM
      return () => splitPara.revert();
    },
    { scope: containerRef },
  );

  return (
    <Section id="about" ref={containerRef} className="overflow-x-clip px-6">
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col gap-15 py-20">
        <h2 className="about font-space font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-text-primary border-b-2 border-b-gray-400"></h2>
        <p className="para xl:self-end absolute top-1/3 font-neuton text-2xl text-text-secondary md:text-5xl lg:text-6xl xl:text-7xl xl:w-2/3" style={{ background: "linear-gradient(90deg, var(--color-text-secondary) 0%, transparent 100%)", backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: "0% 2px", paddingBottom: "4px" }}>
          Hello, I'm Zulk, an indonesian frontend developer who enjoys turning
          ideas into responsive interfaces that feel modern and easy to use. I
          care about the small details that make a product smoother, from layout
          rhythm to thoughtful interactions.
        </p>
      </div>
    </Section>
  );
}
