export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`w-full min-h-screen px-6 ${className}`}>
      {children}
    </section>
  );
}
