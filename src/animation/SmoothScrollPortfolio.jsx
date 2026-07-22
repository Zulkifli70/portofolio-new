import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function SmoothScrollPortfolio({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        preventDefault: true,
      });

      const removeRefreshHandlers = [];
      const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");

      horizontalSections.forEach((section) => {
        const pinWrap = section.querySelector(".horiz-gallery-strip");
        if (!pinWrap) return;

        let pinWrapWidth = 0;
        let horizontalScrollLength = 0;

        const refresh = () => {
          pinWrapWidth = pinWrap.scrollWidth;
          horizontalScrollLength = pinWrapWidth - window.innerWidth;
        };

        refresh();

        gsap.to(pinWrap, {
          scrollTrigger: {
            scrub: true,
            trigger: section,
            pin: section,
            start: "center center",
            end: () => `+=${pinWrapWidth}`,
            invalidateOnRefresh: true,
          },
          x: () => -horizontalScrollLength,
          ease: "none",
        });

        ScrollTrigger.addEventListener("refreshInit", refresh);
        removeRefreshHandlers.push(() => {
          ScrollTrigger.removeEventListener("refreshInit", refresh);
        });
      });

      const refreshAfterAssets = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshAfterAssets);
      requestAnimationFrame(refreshAfterAssets);

      return () => {
        window.removeEventListener("load", refreshAfterAssets);
        removeRefreshHandlers.forEach((remove) => remove());
        smoother.kill();
      };
    },
    { scope: wrapperRef, dependencies: [] },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
