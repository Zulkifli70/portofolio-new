// import { about } from "../data/portfolio";
import { useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(DrawSVGPlugin, useGSAP);

/** Home — single screen: name, short intro, section menu. No scroll. */
export default function Home() {
  const root = useRef(null);

  useGSAP(
    () => {
      const nameLine = root.current.querySelector(".name-line");
      const em = root.current.querySelector(".home-name em");

      // Doodle digambar seperti tinta saat masuk, di-reverse saat keluar.
      const draw = (svg) => {
        const path = svg.querySelector("path");
        const tl = gsap.timeline({
          paused: true,
          onReverseComplete: () => gsap.set(svg, { autoAlpha: 0 }),
          defaults: { duration: 1, ease: "power1.inOut" },
        });
        tl.set(svg, { autoAlpha: 1 }).from(path, { drawSVG: "0% 0%" });
        return tl;
      };

      // Satu target = satu timeline. Hit area = kotak teksnya sendiri.
      const bind = (target, svg) => {
        const tl = draw(svg);
        const enter = () => tl.play();
        const leave = () => tl.reverse();
        target.addEventListener("pointerenter", enter);
        target.addEventListener("pointerleave", leave);
        return () => {
          target.removeEventListener("pointerenter", enter);
          target.removeEventListener("pointerleave", leave);
        };
      };

      const unbind = [
        bind(nameLine, nameLine.querySelector(".doodle--h1")),
        bind(em, em.querySelector(".doodle--em")),
      ];

      return () => unbind.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <div className="home" ref={root}>
      <div className="home-top">
        <span>Portfolio — {new Date().getFullYear()}</span>
        <span>Based in Indonesia</span>
      </div>

      <div className="home-main">
        <p className="eyebrow">Frontend Developer / UI UX Designer</p>
        <h1 className="home-name">
          <span className="name-line">
            Zulkifli
            <svg
              className="doodle doodle--h1"
              viewBox="0 0 300 12"
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 7 C 50 3 90 3 120 7 S 190 11 220 7 S 275 3 297 6" />
            </svg>
          </span>
          <br />
          <em>
            Firdausi
            <svg
              className="doodle doodle--em"
              viewBox="0 0 220 12"
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7 C 35 3 70 4 95 8 C 112 11 108 13 92 11 C 72 9 82 4 112 6 C 145 9 170 4 216 7" />
            </svg>
          </em>
        </h1>
      </div>
    </div>
  );
}
