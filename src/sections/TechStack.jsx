import Section from "../layout/Section";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function TechStack() {
  const techStacks = [
    {
      name: "React",
      imgPath: "/techIcons/react.png",
      position: { "--x": "12%", "--y": "12%", "--r": "3deg" },
    },
    {
      name: "Next JS",
      imgPath: "/techIcons/Next.js.png",
      position: { "--x": "35%", "--y": "6%", "--r": "2deg" },
    },
    {
      name: "Tailwind",
      imgPath: "/techIcons/Tailwind CSS.png",
      position: { "--x": "59%", "--y": "12%", "--r": "-2deg" },
    },
    {
      name: "Javascript",
      imgPath: "/techIcons/JavaScript.png",
      position: { "--x": "82%", "--y": "8%", "--r": "4deg" },
    },
    {
      name: "Astro",
      imgPath: "/techIcons/Astro.png",
      position: { "--x": "24%", "--y": "42%", "--r": "2deg" },
    },
    {
      name: "Vue",
      imgPath: "/techIcons/Vue.js.png",
      position: { "--x": "47%", "--y": "45%", "--r": "-4deg" },
    },
    {
      name: "TypeScript",
      imgPath: "/techIcons/TypeScript.png",
      position: { "--x": "72%", "--y": "41%", "--r": "2deg" },
    },
    {
      name: "Nuxt JS",
      imgPath: "/techIcons/nuxtjs.png",
      position: { "--x": "12%", "--y": "71%", "--r": "-4deg" },
    },
    {
      name: "MongoDB",
      imgPath: "/techIcons/mongodb.png",
      position: { "--x": "36%", "--y": "69%", "--r": "8deg" },
    },
    {
      name: "Figma",
      imgPath: "/techIcons/Figma.png",
      position: { "--x": "61%", "--y": "73%", "--r": "-5deg" },
    },
    {
      name: "Postgres",
      imgPath: "/techIcons/postgres.png",
      position: { "--x": "82%", "--y": "69%", "--r": "-7deg" },
    },
  ];

  const stageRef = useRef(null);

  // config, dulu ini dari slider, sekarang dijadikan konstanta aja
  const radius = 200;
  const maxScale = 1.5;
  const dur = 0.35;

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const cards = gsap.utils.toArray(".tech-card", stage);

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
            gsap.utils.mapRange(0, radius, 1, 0, d),
          );

          gsap.to(card, {
            scale: 1 + (maxScale - 1) * p,
            duration: dur,
            overwrite: true,
            ease: "power2.out",
          });
        });
      }

      function handleMouseLeave() {
        cards.forEach((card) => {
          gsap.to(card, {
            scale: 1,
            duration: dur * 2,
            overwrite: true,
            ease: "power2.out",
          });
        });
      }

      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);

      // ini penting: useGSAP nggak otomatis lepas event listener biasa,
      // jadi kita bersihkan manual pas komponen unmount
      return () => {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(cards);
      };
    },
    { scope: stageRef },
  );

  return (
    <Section className="px-6">
      <div className="w-full h-full max-h-screen overflow-hidden flex flex-col gap-10 items-center py-20">
        <h2 className="text-5xl text-neuton font-bold">Tech Stack</h2>
        <div className="stage" id="stage" ref={stageRef}>
          <div className="tech-grid">
            {techStacks.map((tech) => (
              <div key={tech.name} className="tech-card" style={tech.position}>
                <div className="card-icon">
                  <img src={tech.imgPath} alt={tech.name} />
                </div>
                <span className="card-title">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
