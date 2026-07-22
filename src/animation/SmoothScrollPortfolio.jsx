import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * SmoothScrollPortfolio — Wraps page content in GSAP ScrollSmoother for
 * native-like smooth scrolling and sets up horizontal-scrolling project galleries.
 *
 * Responsibilities:
 *   1. Creates a ScrollSmoother instance (smooth: 2 → 2-second catch-up).
 *   2. Finds all `.horiz-gallery-wrapper` sections and pins them while
 *      translating their inner `.horiz-gallery-strip` horizontally.
 *   3. Recalculates scroll distances on resize via `refreshInit`.
 *   4. Triggers a final ScrollTrigger.refresh after window load + next frame
 *      to account for late-loading images.
 *
 * @param {React.ReactNode} children — Page sections to wrap.
 */
export default function SmoothScrollPortfolio({ children }) {
  /** Ref to the outer ScrollSmoother wrapper div (#smooth-wrapper). */
  const wrapperRef = useRef(null);

  /** Ref to the inner content div (#smooth-content) that ScrollSmoother scrolls. */
  const contentRef = useRef(null);

  useGSAP(
    () => {
      // ── ScrollSmoother init ────────────────────────────────────────
      // smooth: 2       → content catches up to scroll in ~2 seconds
      // normalizeScroll → compensates for varying trackpad scroll speeds
      // ignoreMobileResize → prevents jank on iOS virtual keyboard open/close
      // preventDefault  → stops native scroll so GSAP controls everything
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        preventDefault: true,
      });

      // ── Horizontal gallery ScrollTriggers ──────────────────────────
      const removeRefreshHandlers = [];
      const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");

      horizontalSections.forEach((section) => {
        /** The inner strip that slides left; each card is a flex child inside it. */
        const pinWrap = section.querySelector(".horiz-gallery-strip");
        if (!pinWrap) return;

        let pinWrapWidth = 0;
        let horizontalScrollLength = 0;

        /**
         * Recalculates the total horizontal scroll distance.
         * Called on `refreshInit` (resize) so pinned sections stay accurate.
         */
        const refresh = () => {
          pinWrapWidth = pinWrap.scrollWidth;
          horizontalScrollLength = pinWrapWidth - window.innerWidth;
        };

        refresh(); // initial calculation

        // Pin the section and translate the strip left as the user scrolls down.
        gsap.to(pinWrap, {
          scrollTrigger: {
            scrub: true,           // scroll position directly drives the tween
            trigger: section,      // the wrapper triggers pinning
            pin: section,          // pin the whole wrapper in place
            start: "center center",
            end: () => `+=${pinWrapWidth}`, // scroll distance = strip width
            invalidateOnRefresh: true,
          },
          x: () => -horizontalScrollLength,
          ease: "none",
        });

        // Re-register refresh handler per section; track for cleanup.
        ScrollTrigger.addEventListener("refreshInit", refresh);
        removeRefreshHandlers.push(() => {
          ScrollTrigger.removeEventListener("refreshInit", refresh);
        });
      });

      // ── Post-load refresh ──────────────────────────────────────────
      // Images/fonts may still be loading; refresh ScrollTrigger after
      // window.load and one rAF frame to let layout settle.
      const refreshAfterAssets = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshAfterAssets);
      requestAnimationFrame(refreshAfterAssets);

      // ── Cleanup on unmount ──────────────────────────────────────────
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
