import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * SmoothScrollPortfolio — Wraps page content in GSAP ScrollSmoother for
 * native-like smooth scrolling.
 *
 * Responsibilities:
 *   1. Creates a ScrollSmoother instance (smooth: 2 → 2-second catch-up).
 *   2. Triggers a final ScrollTrigger.refresh after window load + rAF
 *      to account for late-loading images/fonts.
 *
 * Note: Horizontal gallery logic moved to Showcase.jsx (component-specific).
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

      // ── Post-load refresh ──────────────────────────────────────────
      // Images/fonts may still be loading; refresh ScrollTrigger after
      // window.load and one rAF frame to let layout settle.
      const refreshAfterAssets = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshAfterAssets);
      requestAnimationFrame(refreshAfterAssets);

      // ── Cleanup on unmount ──────────────────────────────────────────
      return () => {
        window.removeEventListener("load", refreshAfterAssets);
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
