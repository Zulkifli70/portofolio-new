import Section from "../layout/Section";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * TechStack — Floating tech icons with mouse-proximity scaling.
 *
 * Layout:
 *   - 13 technology cards positioned absolutely via CSS custom properties
 *     (--x, --y, --r) for a scattered, non-grid layout.
 *   - Each card shows an icon + name.
 *
 * Animations:
 *   - Title: clip-path wipe reveal from right.
 *   - Cards: staggered bounce-in with random rotation for organic feel.
 *   - Card labels: staggered fade-in after cards land.
 *
 * Interactions:
 *   - Mouse proximity: cards scale up (to 1.5x) as the cursor approaches.
 *   - On mouse leave: all cards smoothly scale back to 1x.
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

      // ── Title: clip-path wipe reveal ─────────────────────────────────
      gsap.fromTo(
        ".tech-title",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".tech-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Cards: staggered bounce-in with rotation ─────────────────────
      // Each card enters individually with a slight random rotation for organic feel
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.3,
            rotation: gsap.utils.random(-30, 30),
          },
          {
            opacity: 1,
            scale: 1,
            rotation: parseFloat(gsap.getProperty(card, "rotate")) || 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: ".tech-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── Card labels: fade in after cards land ────────────────────────
      const labels = gsap.utils.toArray(".tech-card span");
      gsap.fromTo(
        labels,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          delay: 0.8,
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Mouse proximity scale ────────────────────────────────────────
      function handleMouseMove(e) {
        const mx = e.clientX;
        const my = e.clientY;

        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          const d = Math.hypot(
            mx - (r.left + r.width / 2),
            my - (r.top + r.height / 2),
          );
          const p = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(0, 200, 1, 0, d),
          );

          gsap.to(card, {
            scale: 1 + (1.5 - 1) * p,
            duration: 0.35,
            overwrite: true,
            ease: "power2.out",
          });
        });
      }

      function handleMouseLeave() {
        cards.forEach((card) => {
          gsap.to(card, {
            scale: 1,
            duration: 0.7,
            overwrite: true,
            ease: "power2.out",
          });
        });
      }

      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(cards);
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
