export default function Header() {
  return (
    <header className="header w-full flex items-center justify-between py-5 px-6 border-gray-200 fixed top-0 left-0 right-0 z-20">
      <a
        href="#"
        className="logo text-3xl font-semibold text-gray-900 font-monoton"
      >
        Zulk
      </a>

      <nav className="nav flex gap-6">
        <a href="#about" className="text-sm text-gray-900 hover:opacity-60">
          About
        </a>
        <a href="#projects" className="text-sm text-gray-900 hover:opacity-60">
          Projects
        </a>
        <a href="#contact" className="text-sm text-gray-900 hover:opacity-60">
          Contact
        </a>
      </nav>
    </header>
  );
}
