export default function BaseLayout({ children }) {
  return (
    <div className="w-max-7xl mx-auto flex flex-col justify-center">
      {children}
    </div>
  );
}
