import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * LoadingScreen — Full-screen overlay that blocks scroll, shows real image-loading progress,
 * then animates out once ALL resources (images + fonts) are loaded.
 *
 * @param {React.ReactNode} children — Page content rendered behind the overlay.
 * @param {number} extraHoldTime — Extra milliseconds to keep overlay AFTER everything loads
 *   (default 0). Lets you make the splash screen feel "longer" on fast connections.
 */
function LoadingScreen({ children, extraHoldTime = 0 }) {
  // — State —
  const [isLoading, setIsLoading] = useState(true); // true = overlay visible, scroll locked
  const [progress, setProgress] = useState(0); // 0–100 real image-loading percentage
  const overlayRef = useRef(null); // Ref to the overlay DOM node for GSAP

  // — Scroll-lock while loading —
  // When isLoading=true: freezes page at current scroll position (fixed + negative top).
  // When isLoading=false: restores original scroll position and removes touch-move blocker.
  useEffect(() => {
    if (isLoading) {
      const scrollY = window.scrollY; // remember where we were

      // Lock body in place by fixing it and offsetting by the current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Block mobile pull-to-refresh / rubber-band scrolling
      const preventTouch = (e) => e.preventDefault();
      document.addEventListener("touchmove", preventTouch, { passive: false });
    } else {
      const scrollY = document.body.style.top; // retrieve saved position

      // Unlock body and restore normal scrolling
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Restore the user's previous scroll position
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);

      // Remove the touch-move blocker
      const preventTouch = (e) => e.preventDefault();
      document.removeEventListener("touchmove", preventTouch);
    }

    // Cleanup on unmount (safety net — always restore scroll ability)
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  // — GSAP orchestration: real progress + exit animation —
  useGSAP(
    () => {
      // ======== REAL IMAGE-LOADING PROGRESS ========
      // Collect every <img> in the document EXCEPT those inside the loading overlay itself.
      // Count them, then track each one's load/error event.
      const imgs = [...document.querySelectorAll("img")].filter(
        (img) => !img.closest(".loading-container"),
      );
      const total = imgs.length;
      let loaded = 0;

      /**
       * Increments the loaded count and updates the progress % state.
       * Called on each image's `load` or `error` event (or immediately if cached).
       */
      const bump = () => {
        loaded++;
        if (total > 0) setProgress(Math.round((loaded / total) * 100));
      };

      // Register listeners. Already-complete (cached) images are counted immediately.
      imgs.forEach((img) => {
        if (img.complete) bump();
        else {
          img.addEventListener("load", bump, { once: true });
          img.addEventListener("error", bump, { once: true });
        }
      });

      // ======== DECORATIVE ANIMATIONS ========
      const overlay = overlayRef.current;

      // "Please Wait" subtle pulse
      gsap.to(".please-wait", {
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Name reveal — clip-path wipe from left, staggered per line
      const nameTl = gsap.timeline();
      nameTl.fromTo(
        overlay.querySelectorAll(".name-line"),
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.inOut",
        },
      );

      // Subtle floating after reveal
      nameTl.to(
        overlay.querySelectorAll(".name-line"),
        {
          y: -6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1,
        },
        "+=0.3",
      );

      // "Initializing Canvas" fade in
      gsap.from(".init-text", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      });

      // Progress counter
      gsap.from(".progress-text", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.7)",
      });

      // Exit — everything fades up, then overlay slides away
      const playExit = () => {
        gsap
          .timeline()
          .to(
            overlay.querySelectorAll(".name-line, .please-wait, .init-text, .progress-text"),
            {
              y: -30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: "power3.in",
            },
          )
          .to(
            overlay,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
              onComplete: () => setIsLoading(false),
            },
            "-=0.4",
          );
      };

      // ======== WAIT FOR EVERYTHING TO FINISH ========
      /**
       * Forces progress to 100%, waits `extraHoldTime` ms, then triggers exit.
       * This is the "all resources ready" callback.
       */
      const allReady = () => {
        setProgress(100); // safety: ensure 100% even if an image was missed
        setTimeout(playExit, extraHoldTime);
      };

      // window.load = all resources (images, stylesheets, scripts) downloaded
      const waitLoad = new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
      });
      // document.fonts.ready = all @font-face fonts loaded & ready to render
      Promise.all([waitLoad, document.fonts.ready]).then(allReady);
    },
    { scope: overlayRef }, // GSAP auto-cleans selectors inside overlayRef on unmount
  );

  // — Render —
  return (
    <>
      {/* Main page content always renders behind the overlay */}
      {children}

      {/* Overlay: fixed, full-screen, dark background, centered typography */}
      {isLoading && (
        <div
          ref={overlayRef}
          className="loading-container bg-text-primary scrollbar-none p-5"
        >
          {/* "Please Wait" elegant animation (top-left) */}
          <div className="flex w-full justify-between">
            <p className="please-wait font-fraunces text-xl uppercase font-bold text-text-white">
              Please Wait
            </p>
            <p className="font-fraunces text-xl uppercase font-bold text-text-white">
              Personal Portfolio
            </p>
          </div>

          {/* Name lines (center, clip-path reveal by GSAP) */}
          <div className="text-center flex flex-col">
            <p className="name-line font-fraunces text-2xl md:text-5xl xl:text-9xl font-bold text-text-white">
              Zulkifli
            </p>
            <p className="name-line font-fraunces text-2xl md:text-5xl xl:text-9xl font-bold text-text-white">
              Firdausi
            </p>
          </div>

          {/* Progress percentage (bottom-right) */}
          <div className="w-full flex justify-between">
            <p className="init-text text-text-white uppercase text-2xl font-fraunces font-bold">
              Initializing Canvas
            </p>
            <p className="progress-text font-fraunces text-2xl font-bold text-text-white">
              {progress}%
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
