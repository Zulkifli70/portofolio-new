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
      position: { "--x": "1%", "--y": "41%", "--r": "-7deg" },
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
    <Section className=" ">
      <div className="w-full h-full max-h-screen overflow-hidden flex flex-col gap-10 pt-35 md:py-20 px-5">
        <h2 className="text-5xl md:text-9xl font-neuton font-black">
          Tech Stack
        </h2>
        <div className="stage self-center" id="stage" ref={stageRef}>
          <div className="tech-grid">
            {techStacks.map((tech) => (
              <div key={tech.name} className="tech-card" style={tech.position}>
                <div className="card-icon">
                  <img src={tech.imgPath} alt={tech.name} />
                </div>
                <span className="text-xl md:text-3xl font-neuton">
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
