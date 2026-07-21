import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(
    () => document.readyState !== "complete",
  );
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef(null);

  useGSAP(
    () => {
      const MIN_DISPLAY_TIME = 3000; // minimal loading tampil (ms)
      const startTime = Date.now();

      // objek dummy yang nilainya kita animasikan dari 0 ke 100
      const counter = { value: 0 };

      // animasikan angka 0 -> 100 selama MIN_DISPLAY_TIME
      const progressTween = gsap.to(counter, {
        value: 100,
        duration: MIN_DISPLAY_TIME / 1000, // GSAP pakai detik, bukan ms
        ease: "power1.inOut",
        onUpdate: () => {
          setProgress(Math.round(counter.value));
        },
      });

      gsap.to(".dot", {
        duration: 2,
        text: ".....",
        repeat: -1,
        repeatDelay: 0.1,
        ease: "power1.out",
      });

      // animasi geser + hapus dari DOM, dipanggil kalau syarat waktu udah terpenuhi
      const playExitAnimation = () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          delay: 2,
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false),
        });
      };

      let tl = gsap.timeline({
        defaults: { duration: 1, ease: "sine.inOut" },
      });
      tl.from(".para1", { xPercent: -150 })
        .from(".para2", { xPercent: -150 })
        .from(".para3", { xPercent: -150 })
        .to(".para1", { xPercent: 150 })
        .to(".para2", { xPercent: 150 })
        .to(".para3", { xPercent: 150 });

      const finishLoading = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);
        setTimeout(() => {
          // pastikan angkanya "nyampe" 100% dulu sebelum overlay geser
          progressTween.progress(1);
          playExitAnimation();
        }, remaining);
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
        <div ref={overlayRef} className="loading-container bg-[#1a1a1a] ">
          <p className="progress-text absolute bottom-5 right-5 font-fraunces text-9xl font-bold text-text-white">
            {progress}%
          </p>
          <div className="absolute top-5 left-5">
            <p className="font-fraunces text-9xl font-bold text-text-white">
              Please Wait<span className="dot"></span>
            </p>
          </div>
          <div className="w-1/2">
            <p className="para1 font-fraunces text-9xl font-bold text-text-white">
              Zulkifli
            </p>
            <p className="para2 font-fraunces text-9xl text-center font-bold text-text-white">
              Firdausi
            </p>
            <p className="para3 font-fraunces text-9xl text-end font-bold text-text-white">
              Portfolio
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
