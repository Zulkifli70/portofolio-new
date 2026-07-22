import Section from "../layout/Section";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

/**
 * About — "About Me" section with animated text reveals.
 *
 * Animations:
 *   1. Paragraph words slide in from right (x: 150 → 0) with staggered opacity.
 *   2. Section title uses ScrambleText to reveal "About Me" with a typewriter scramble effect.
 *   Both trigger once when the section scrolls into view.
 */
export default function About() {
  /** Ref to the section container for GSAP scoping and cleanup. */
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Split the paragraph into individual words for staggered animation
      const split = new SplitText(".para", { type: "words" });

      // Words slide in from the right with staggered fade-in
      gsap.from(split.words, {
        x: 150,
        opacity: 0,
        duration: 2,
        ease: "power4",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".para",
          start: "top bottom",        // trigger when top of paragraph hits bottom of viewport
          toggleActions: "play none none none", // play once, no reverse
        },
      });

      // Title text scrambles to reveal "About Me" character by character
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

      // Revert SplitText on cleanup to restore original DOM
      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <Section id="about" ref={containerRef} className="overflow-x-clip px-6">
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col gap-15 py-20">
        <h2 className="about font-space font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-text-primary border-b-2 border-b-gray-400"></h2>
        <p className="para xl:self-end absolute top-1/3 font-neuton text-2xl text-text-secondary md:text-5xl lg:text-6xl xl:text-7xl xl:w-2/3">
          Hello, I'm Zulk, an indonesian frontend developer who enjoys turning
          ideas into responsive interfaces that feel modern and easy to use. I
          care about the small details that make a product smoother, from layout
          rhythm to thoughtful interactions.
        </p>
      </div>
    </Section>
  );
}
