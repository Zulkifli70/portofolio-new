import { useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Header() {
  const navRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href"); // contoh: "#about"

    // Ambil instance ScrollSmoother yang sudah aktif dari SmoothScrollPortfolio
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(target, true, "top top");
    }
  };

  return (
    <header className="header w-max-7xl flex items-center justify-between py-5 px-6 border-gray-200 fixed top-0 left-0 right-0 z-20">
      <div className="bg-white shadow-2xl px-10 py-3 rounded-xl">
        <a
          href="#hero"
          className="logo text-3xl font-neuton font-bold"
          onClick={handleClick}
        >
          Zulk
        </a>
      </div>

      <nav
        ref={navRef}
        className="nav flex gap-6 bg-white shadow-2xl px-10 py-3 rounded-xl"
      >
        <a
          href="#about"
          onClick={handleClick}
          className="text-xl text-gray-900 hover:opacity-60"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={handleClick}
          className="text-xl text-gray-900 hover:opacity-60"
        >
          Projects
        </a>
      </nav>
    </header>
  );
}
