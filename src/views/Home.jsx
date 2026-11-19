import { about } from "../data/portfolio";

const MENU = [
  { id: "about", label: "About", desc: "Who I am" },
  { id: "projects", label: "Projects", desc: "Selected work" },
  { id: "experience", label: "Experience", desc: "Where I worked" },
  { id: "tech", label: "Tech Stack", desc: "Tools I use" },
  { id: "contact", label: "Contact", desc: "Get in touch" },
];

/** Home — single screen: name, short intro, section menu. No scroll. */
export default function Home({ onNavigate }) {
  return (
    <div className="home">
      <div className="home-top">
        <span>Portfolio — {new Date().getFullYear()}</span>
        <span>Based in Indonesia</span>
      </div>

      <div className="home-main">
        <p className="eyebrow">Frontend Developer / UI UX Designer</p>
        <h1 className="home-name">
          Zulkifli
          <br />
          <em>Firdausi</em>
        </h1>
        <p className="home-lede">{about.text.split(". ")[0]}.</p>
      </div>

      <nav className="home-menu" aria-label="Sections">
        {MENU.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="menu-row"
            onClick={() => onNavigate(item.id)}
          >
            <span className="menu-index">0{i + 1}</span>
            <span className="menu-label">{item.label}</span>
            <span className="menu-desc">{item.desc}</span>
            <span className="menu-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
