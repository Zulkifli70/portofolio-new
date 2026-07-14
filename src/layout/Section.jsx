import { forwardRef } from "react";

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
