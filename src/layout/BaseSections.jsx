export default function BaseLayout({ children, className = "" }) {
  return (
    <div
      className={`w-max-7xl mx-auto flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
}
