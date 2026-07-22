/**
 * BaseLayout — Max-width centered container for page sections.
 *
 * Constrains content to `w-max-7xl` and vertically centers it.
 * Sections are stacked vertically via `flex-col`.
 *
 * @param {React.ReactNode} children — Sections to render inside the container.
 * @param {string} [className] — Additional classes merged with the base layout.
 */
export default function BaseLayout({ children, className = "" }) {
  return (
    <div
      className={`w-max-7xl min-h-screen mx-auto flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
}
