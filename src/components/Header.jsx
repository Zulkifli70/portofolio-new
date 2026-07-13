export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-5 px-6 border-b border-gray-200">
      <a href="#" className="text-base font-semibold text-gray-900">
        Zulkifli Firdausi
      </a>

      <nav className="flex gap-6">
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
