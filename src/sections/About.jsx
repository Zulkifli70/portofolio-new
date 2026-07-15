import Section from "../layout/Section";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(".para", { type: "words" });

      gsap.from(split.words, {
        x: 150,
        opacity: 0,
        duration: 2,
        ease: "power4",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".para",
          start: "top center",
          toggleActions: "play none none restart",
        },
      });

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
          start: "center center",
          toggleActions: "play none none restart",
        },
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <Section ref={containerRef} className="overflow-x-clip px-6">
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col gap-15 py-20">
        <h2 className="about font-neuton text-6xl md:text-9xl border-b border-b-gray-400"></h2>
        <p className="para md:self-end absolute top-1/3 font-neuton text-2xl md:text-7xl md:w-2/3">
          Hello, I'm Zulk, an indonesian frontend developer who enjoys turning
          ideas into responsive interfaces that feel modern and easy to use. I
          care about the small details that make a product smoother, from layout
          rhythm to thoughtful interactions.
        </p>
      </div>
    </Section>
  );
}
