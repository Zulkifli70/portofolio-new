import { forwardRef } from "react";

/**
 * Section — Generic full-screen section wrapper.
 *
 * A thin convenience component that renders a <section> with:
 *   - `min-h-screen` so it fills the viewport by default.
 *   - Forwarded ref so parent components (e.g. ScrollTrigger triggers) can
 *     target the section element directly.
 *
 * @param {string}  [id]        — Optional id attribute (used for anchor navigation).
 * @param {string}  [className] — Additional CSS classes merged with the defaults.
 * @param {React.ReactNode} children — Section content.
 * @param {React.Ref} ref — Forwarded ref for DOM access.
 */
const Section = forwardRef(function Section(
  { id, className = "", children },
  ref,
) {
  return (
    <section ref={ref} id={id} className={`w-full min-h-screen ${className}`}>
      {children}
    </section>
  );
});

export default Section;
