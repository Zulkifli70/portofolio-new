import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/portfolio";

/** Projects — grid of cards; clicking one opens a detail dialog. */
export default function Projects() {
  // Deep link: /projects/<slug> opens that project on mount.
  const [selected, setSelected] = useState(() => {
    const slug = window.location.pathname.split("/")[2];
    if (!slug) return null;
    return projects.find((p) => p.name.toLowerCase().includes(slug.replace(/-/g, " "))) ?? null;
  });
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const open = (project) => {
    setActiveImage(0);
    setSelected(project);
  };

  return (
    <div className="view">
      <h1 className="view-title">Projects</h1>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <button
            key={project.name}
            type="button"
            className="project-card"
            onClick={() => open(project)}
          >
            <span className="project-thumb">
              <img src={project.image} alt={project.name} loading="lazy" />
            </span>
            <span className="project-meta">
              <span className="project-name">{project.name}</span>
              <span>
                0{i + 1} · {project.status}
              </span>
            </span>
          </button>
        ))}
      </div>

      {selected &&
        createPortal(
          <div
            className="modal-backdrop"
            onClick={() => setSelected(null)}
            role="presentation"
          >
            <div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
              >
                ✕
              </button>

              <div className="modal-gallery">
                <div className="modal-main">
                  <img src={selected.gallery[activeImage]} alt={selected.name} />
                </div>
                <div className="modal-thumbs">
                  {selected.gallery.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      className="modal-thumb"
                      aria-current={i === activeImage}
                      onClick={() => setActiveImage(i)}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-body">
                <h2 className="modal-title">{selected.name}</h2>
                <p className="modal-desc">{selected.description}</p>

                <div className="tag-row">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                  <span className="badge">{selected.status}</span>
                </div>

                <ul className="feature-list">
                  {selected.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="link-row">
                  <a
                    className="btn"
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website ↗
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={selected.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository ↗
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}