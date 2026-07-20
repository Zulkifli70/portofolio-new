// components/LoadingScreen.jsx
import { useState, useEffect } from "react";

function LoadingScreen({ children }) {
  // cek document.readyState LANGSUNG pas nentuin nilai awal state
  const [isLoading, setIsLoading] = useState(
    () => document.readyState !== "complete",
  );

  useEffect(() => {
    // kalau pas render pertama ternyata udah "complete",
    // isLoading udah false dari awal, jadi gak perlu ngapa-ngapain lagi
    if (document.readyState === "complete") return;

    const handleLoad = () => setIsLoading(false);
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}

export default LoadingScreen;
