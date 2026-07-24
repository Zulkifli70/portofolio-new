import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

/**
 * Footer — Contact section + social links at the bottom of the page.
 *
 * Animations:
 *   - "Let's Get in Touch" heading: SplitText word reveal from bottom
 *   - Email link: clip-path wipe reveal
 *   - Social icons: staggered bounce-in from below
 *   - Copyright: fade in
 */
function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      // ── Heading: word reveal from bottom ─────────────────────────────
      const headingSplit = SplitText.create(".footer-heading", {
        type: "words",
      });

      gsap.fromTo(
        headingSplit.words,
        { y: 60, opacity: 0, rotationX: -40 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".footer-heading",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Email: clip-path wipe reveal ─────────────────────────────────
      gsap.fromTo(
        ".footer-email",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".footer-email",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Copyright: fade in ───────────────────────────────────────────
      gsap.fromTo(
        ".footer-copy",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-copy",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Social icons: staggered bounce-in ────────────────────────────
      const icons = gsap.utils.toArray(".footer-icon");
      if (icons.length) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.3, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".footer-icons",
              start: "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ── Divider line: scaleX wipe ────────────────────────────────────
      gsap.fromTo(
        ".footer-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".footer-divider",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );

      return () => headingSplit.revert();
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="w-full lg:min-h-60 px-5 flex flex-col font-space">
      <div className="w-full flex flex-col flex-1 border-t-2 border-t-gray-500 gap-5 md:p-5 lg:gap-0 pt-3 lg:pt-0">
        <div className="flex lg:flex-1 justify-between lg:items-center h-2/3">
          <h2 className="footer-heading text-xl text-text-primary lg:text-4xl xl:text-5xl">
            Let's Get in Touch
          </h2>
          <a
            href="mailto:firdausi.zulkifli@gmail.com"
            className="footer-email text-xl lg:text-4xl xl:text-5xl border-b-2 border-b-gray-500"
          >
            firdausi.zulkifli@gmail.com
          </a>
        </div>
        <div className="footer-divider w-full h-px bg-gray-500 my-2" />
        <div className="flex lg:flex-1 justify-between items-center py-5 lg:p-2">
          <h2 className="footer-copy md:text-xl lg:text-2xl text-text-primary">
            {new Date().getFullYear()} - Zulkifli Firdausi
          </h2>
          <div className="footer-icons flex gap-3 xl:gap-10 text-text-primary">
            <a
              href="https://github.com/Zulkifli70"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon flex flex-col justify-center items-center"
            >
              <img
                src="/techIcons/github.png"
                alt="zulkifli github account"
                className="w-10 xl:w-15 object-cover"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/zulkifli-firdausi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon flex flex-col justify-center items-center"
            >
              <img
                src="/techIcons/linkedin.png"
                alt="zulkifli linked in account"
                className="w-10 xl:w-15 object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
