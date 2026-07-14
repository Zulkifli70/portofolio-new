import { forwardRef } from "react";

const Section = forwardRef(function Section(
  { id, className = "", children },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`w-full min-h-screen px-6 ${className}`}
    >
      {children}
    </section>
  );
});

export default Section;
