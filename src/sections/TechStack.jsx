import Section from "../layout/Section";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

/**
 * TechStack — Floating tech icons with mouse-proximity scaling.
 *
 * Layout:
 *   - 13 technology cards positioned absolutely via CSS custom properties
 *     (--x, --y, --r) for a scattered, non-grid layout.
 *   - Each card shows an icon + name.
 *
 * Interactions:
 *   - Mouse proximity: cards scale up (to 1.5x) as the cursor approaches,
 *     creating a "magnetic" zoom effect. Scale is inversely proportional to
 *     distance (closer = bigger).
 *   - On mouse leave: all cards smoothly scale back to 1x.
 *   - Title chars slide in from left (SplitText).
 *   - Grid bounces in from below on scroll.
 */
export default function TechStack() {
  /** Static tech stack data — name, icon path, and CSS positioning via custom properties. */
  const techStacks = [
    {
      name: "React",
      imgPath: "/techIcons/react.png",
      position: { "--x": "3%", "--y": "12%", "--r": "3deg" },
    },
    {
      name: "Next JS",
      imgPath: "/techIcons/Next.js.png",
      position: { "--x": "27%", "--y": "6%", "--r": "2deg" },
    },
    {
      name: "Tailwind",
      imgPath: "/techIcons/Tailwind CSS.png",
      position: { "--x": "52%", "--y": "12%", "--r": "-2deg" },
    },
    {
      name: "Javascript",
      imgPath: "/techIcons/JavaScript.png",
      position: { "--x": "75%", "--y": "8%", "--r": "4deg" },
    },
    {
      name: "GSAP",
      imgPath: "/techIcons/gsap.png",
      position: { "--x": "-1%", "--y": "41%", "--r": "-7deg" },
    },
    {
      name: "Astro",
      imgPath: "/techIcons/Astro.png",
      position: { "--x": "20%", "--y": "42%", "--r": "2deg" },
    },
    {
      name: "Vue",
      imgPath: "/techIcons/Vue.js.png",
      position: { "--x": "42%", "--y": "45%", "--r": "-4deg" },
    },
    {
      name: "TypeScript",
      imgPath: "/techIcons/TypeScript.png",
      position: { "--x": "62%", "--y": "41%", "--r": "2deg" },
    },
    {
      name: "Github",
      imgPath: "/techIcons/github.png",
      position: { "--x": "88%", "--y": "41%", "--r": "2deg" },
    },
    {
      name: "Nuxt JS",
      imgPath: "/techIcons/nuxtjs.png",
      position: { "--x": "7%", "--y": "71%", "--r": "-4deg" },
    },
    {
      name: "MongoDB",
      imgPath: "/techIcons/mongodb.png",
      position: { "--x": "30%", "--y": "69%", "--r": "4deg" },
    },
    {
      name: "Figma",
      imgPath: "/techIcons/Figma.png",
      position: { "--x": "56%", "--y": "70%", "--r": "-2deg" },
    },
    {
      name: "Postgres",
      imgPath: "/techIcons/postgres.png",
      position: { "--x": "78%", "--y": "69%", "--r": "-7deg" },
    },
  ];

  /** Ref to the stage container — event listener target for mouse proximity. */
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const cards = gsap.utils.toArray(".tech-card", stage);

      /**
       * Mouse move handler — scales each card based on distance from cursor.
       *
       * Uses `Math.hypot` for Euclidean distance from cursor to card center,
       * then `gsap.utils.mapRange` to map distance (0–200px) → scale (1–1.5).
       * Cards closer to the cursor scale up more.
       *
       * @param {MouseEvent} e
       */
      function handleMouseMove(e) {
        const mx = e.clientX;
        const my = e.clientY;

        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          // Euclidean distance from cursor to card center
          const d = Math.hypot(
            mx - (r.left + r.width / 2),
            my - (r.top + r.height / 2),
          );
          // Map distance 0→200px to scale factor 1→0 (inverted: closer = bigger)
          const p = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(0, 200, 1, 0, d),
          );

          gsap.to(card, {
            scale: 1 + (1.5 - 1) * p, // scale from 1.0 to 1.5 based on proximity
            duration: 0.35,
            overwrite: true,           // kill previous tween for same card
            ease: "power2.out",
          });
        });
      }

      /** Resets all cards back to scale 1 when the mouse leaves the stage. */
      function handleMouseLeave() {
        cards.forEach((card) => {
          gsap.to(card, {
            scale: 1,
            duration: 0.35 * 2,       // slower ease-out for smooth reset
            overwrite: true,
            ease: "power2.out",
          });
        });
      }

      // ── Title character reveal ─────────────────────────────────────
      let titleSplit = SplitText.create(".tech-title", { type: "chars" });

      gsap.from(titleSplit.chars, {
        duration: 1,
        x: -100,
        autoAlpha: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".tech-title",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // ── Grid bounce-in ────────────────────────────────────────────
      gsap.from(".tech-grid", {
        duration: 2.5,
        opacity: 0,
        y: 100,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // ── Mouse listeners ────────────────────────────────────────────
      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);

      // ── Cleanup ────────────────────────────────────────────────────
      return () => {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(cards); // stop all card scale tweens
      };
    },
    { scope: stageRef },
  );

  return (
    <Section ref={stageRef}>
      <div className="w-full h-full max-h-screen overflow-hidden flex flex-col gap-10 pt-35 md:py-20 px-5">
        <h2 className="tech-title text-5xl md:text-7xl xl:text-9xl font-space text-text-primary font-bold border-b-2 border-b-gray-400">
          Tech Stack
        </h2>
        {/* Stage: the mouse-proximity interaction area */}
        <div className="stage self-center" id="stage" ref={stageRef}>
          {/* Tech grid: absolutely-positioned cards scattered via CSS custom properties */}
          <div className="tech-grid">
            {techStacks.map((tech) => (
              <div key={tech.name} className="tech-card" style={tech.position}>
                <div className="card-icon">
                  <img src={tech.imgPath} alt={tech.name} />
                </div>
                <span className="text-xl lg:text-3xl font-neuton text-text-secondary">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
