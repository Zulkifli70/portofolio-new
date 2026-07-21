import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(
    () => document.readyState !== "complete",
  );
  const overlayRef = useRef(null);

  useGSAP(
    () => {
      const MIN_DISPLAY_TIME = 3000; // minimal loading tampil (ms)
      const startTime = Date.now();

      // animasi geser + hapus dari DOM, dipanggil kalau syarat waktu udah terpenuhi
      const playExitAnimation = () => {
        gsap.to(overlayRef.current, {
          xPercent: -100,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false),
        });
      };

      const finishLoading = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
        setTimeout(playExitAnimation, remaining);
      };

      if (document.readyState === "complete") {
        finishLoading();
      } else {
        window.addEventListener("load", finishLoading);
        return () => window.removeEventListener("load", finishLoading);
      }
    },
    { scope: overlayRef },
  );

  return (
    <>
      {/* konten utama selalu ke-render, di "belakang" overlay */}
      {children}

      {/* overlay numpuk di atas, sampai animasi keluar selesai */}
      {isLoading && (
        <div ref={overlayRef} className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
