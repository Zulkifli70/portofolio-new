import { useRef, useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Header() {
  const navRef = useRef(null);
  const headerRef = useRef(null); // tambahin ref ke <header>

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${header.offsetHeight}px`,
      );
    };

    setHeaderHeight(); // set awal

    const ro = new ResizeObserver(setHeaderHeight);
    ro.observe(header);

    return () => ro.disconnect();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href");
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
