import React from "react";

/**
 * 3D Showcase Project Card
 * Styled matching portfolio theme with background image, title overlay, and action button.
 */
export default function ProjectCard({ project, index, copy, onClick }) {
  void React;
  return (
    <button
      type="button"
      className="project-card project-card-3d"
      onClick={onClick}
      aria-hidden={copy > 0 || undefined}
      tabIndex={copy > 0 ? -1 : undefined}
    >
      <div className="project-card-inner">
        {/* Background Image */}
        <div className="project-card-bg">
          <img src={project.image} alt={project.name} loading="lazy" />
          <div className="project-card-overlay" />
        </div>

        {/* Card Header / Badge */}
        <div className="project-card-header">
          <span className="project-card-index">0{index + 1}</span>
          {project.status && (
            <span className="project-card-status">{project.status}</span>
          )}
        </div>

        {/* Card Content & Action Footer */}
        <div className="project-card-footer">
          <div className="project-card-info">
            <h3 className="project-card-title">{project.name}</h3>
            {project.tags && project.tags.length > 0 && (
              <p className="project-card-subtitle">{project.tags.slice(0, 2).join(" · ")}</p>
            )}
          </div>
          <div className="project-card-action" aria-label={`View ${project.name}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
