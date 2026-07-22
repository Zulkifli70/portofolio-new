import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function LoadingScreen({ children, extraHoldTime = 0 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      // simpan posisi scroll saat ini
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // tambahkan listener untuk touchmove
      const preventTouch = (e) => e.preventDefault();
      document.addEventListener("touchmove", preventTouch, { passive: false });
    } else {
      // ambil posisi scroll yang disimpan dari style "top"
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);

      // hapus listener untuk touchmove
      const preventTouch = (e) => e.preventDefault();
      document.removeEventListener("touchmove", preventTouch);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  useGSAP(
    () => {
      const MIN_DISPLAY_TIME = 3000;
      const startTime = Date.now();
      let progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / MIN_DISPLAY_TIME) * 100, 100);
        setProgress(Math.round(pct));
        if (pct >= 100) clearInterval(progressInterval);
      }, 16);

      gsap.to(".dot", {
        duration: 2,
        text: ".....",
        repeat: -1,
        repeatDelay: 0.1,
        ease: "power1.out",
      });

      const playExit = () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          delay: 2,
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false),
        });
      };

      gsap
        .timeline({ defaults: { duration: 2, ease: "back.inOut" } })
        .from(".para1", { xPercent: -150 })
        .from(".para2", { xPercent: -150 })
        .from(".para3", { xPercent: -150 });

      const allReady = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
        setTimeout(() => {
          setProgress(100);
          setTimeout(playExit, extraHoldTime);
        }, remaining);
      };

      // Wait for ALL content: images (window.load) + fonts
      const waitLoad = new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
      });
      Promise.all([waitLoad, document.fonts.ready]).then(allReady);

      return () => clearInterval(progressInterval);
    },
    { scope: overlayRef },
  );

  return (
    <>
      {/* konten utama selalu ke-render, di "belakang" overlay */}
      {children}

      {/* overlay numpuk di atas, sampai animasi keluar selesai */}
      {isLoading && (
        <div
          ref={overlayRef}
          className="loading-container bg-[#1a1a1a] scrollbar-none"
        >
          <p className="progress-text absolute bottom-5 right-5 font-fraunces text-2xl md:text-5xl xl:text-9xl font-bold text-text-white">
            {progress}%
          </p>
          <div className="absolute top-5 left-5">
            <p className="font-fraunces text-2xl md:text-5xl xl:text-9xl font-bold text-text-white">
              Please Wait<span className="dot"></span>
            </p>
          </div>
          <div className="w-1/2">
            <p className="para1 font-fraunces text-2xl md:text-5xl xl:text-9xl font-bold text-text-white">
              Zulkifli
            </p>
            <p className="para2 font-fraunces text-2xl md:text-5xl xl:text-9xl text-center font-bold text-text-white">
              Firdausi
            </p>
            <p className="para3 font-fraunces text-2xl md:text-5xl xl:text-9xl text-end font-bold text-text-white">
              Portfolio
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
