import { useRef, useEffect } from "react";
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
      className="header w-max-7xl flex items-center bg-bg justify-between py-2 px-6 fixed top-0 left-0 right-0 z-20"
    >
      <div>
        <a
          href="#hero"
          className="logo text-3xl font-space font-bold text-text-primary"
          onClick={handleClick}
        >
          Zulk
        </a>
      </div>
      <nav
        ref={navRef}
        className="nav text-2xl flex items-center gap-5 font-space"
      >
        <a
          href="#about"
          onClick={handleClick}
          className="text-xl hover:bg-hover px-3 py-4 rounded-2xl font-semibold text-text-primary"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={handleClick}
          className="text-xl hover:bg-hover px-3 py-4 rounded-2xl font-semibold text-text-primary"
        >
          Projects
        </a>
      </nav>
    </header>
  );
}
