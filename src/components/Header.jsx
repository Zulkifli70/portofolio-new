import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * Header — Fixed top navigation bar.
 *
 * Features:
 *   - Exposes the CSS variable `--header-h` (header height in px) so other
 *     components (e.g. hero text positioning) can reference it.
 *   - Uses ResizeObserver to keep `--header-h` in sync if the header resizes.
 *   - Nav links use ScrollSmoother.scrollTo() for smooth scrolling instead
 *     of native anchor jumps.
 */
export default function Header() {
  /** Ref to the <nav> element (currently unused for logic, kept for future targeting). */
  const navRef = useRef(null);

  /** Ref to the <header> element — measured by ResizeObserver for `--header-h`. */
  const headerRef = useRef(null);

  // ── Header height → CSS variable ──────────────────────────────────
  // Sets `--header-h` on <html> so CSS can use it (e.g. hero text y-offset).
  // ResizeObserver keeps it accurate if the header resizes (responsive text, etc.).
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    /** Writes the current header height into the `--header-h` CSS variable. */
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${header.offsetHeight}px`,
      );
    };

    setHeaderHeight(); // initial measurement

    const ro = new ResizeObserver(setHeaderHeight);
    ro.observe(header);

    return () => ro.disconnect();
  }, []);

  // ── Scroll-hide: hide on scroll down, show on scroll up ────────────
  // Uses a simple scroll threshold. At the very top the header always
  // shows. Animates via GSAP translate so it stays GPU-friendly.
  useEffect(() => {
    let lastY = window.scrollY;
    const header = headerRef.current;

    const onScroll = () => {
      const y = window.scrollY;
      if (!header) return;
      if (y <= 40) {
        gsap.to(header, { yPercent: 0, duration: 0.3, overwrite: true });
      } else if (y > lastY + 4) {
        gsap.to(header, { yPercent: -110, duration: 0.3, overwrite: true });
      } else if (y < lastY - 4) {
        gsap.to(header, { yPercent: 0, duration: 0.3, overwrite: true });
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Smooth-scroll on nav click ────────────────────────────────────
  /**
   * Intercepts anchor clicks and uses ScrollSmoother.scrollTo() for a
   * smooth animated scroll to the target section instead of a native jump.
   *
   * @param {MouseEvent} e — click event from a nav <a> tag.
   */
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href"); // e.g. "#about"
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top top");
  };

  return (
    <header
      ref={headerRef}
      className="header w-max-7xl flex items-center justify-between py-1.5 px-4 md:py-2 md:px-6 fixed top-0 left-0 right-0 z-20"
    >
      <div>
        <a
          href="#hero"
          className="logo text-2xl md:text-3xl font-space font-bold text-text-primary"
          onClick={handleClick}
        >
          Zulk
        </a>
      </div>
      <nav
        ref={navRef}
        className="nav text-2xl flex items-center gap-2 md:gap-5 font-space"
      >
        <a
          href="#about"
          onClick={handleClick}
          className="text-sm md:text-xl hover:bg-hover px-2 py-2 md:px-3 md:py-4 rounded-2xl font-semibold text-text-primary"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={handleClick}
          className="text-sm md:text-xl hover:bg-hover px-2 py-2 md:px-3 md:py-4 rounded-2xl font-semibold text-text-primary"
        >
          Projects
        </a>
      </nav>
    </header>
  );
}
