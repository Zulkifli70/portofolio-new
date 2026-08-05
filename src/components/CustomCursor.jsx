import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * CustomCursor — Global custom cursor that follows the mouse.
 *
 * Features:
 *   - Small dot by default (16px circle)
 *   - Breathes (gentle scale pulse) on hover over
 *     elements with `data-cursor-target` (project cards)
 *   - Rendered via portal into document.body to sit above all transforms
 *
 * Usage: Place once at the root of the app (e.g. in App.jsx).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [label, setLabel] = useState("");

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Optimized mouse-follow using quickTo (reuses tween instance)
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

      const handleMouseMove = (e) => {
        const rect = cursor.getBoundingClientRect();
        xTo(e.clientX - rect.width / 2);
        yTo(e.clientY - rect.height / 2);
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Find all elements that should trigger cursor changes
      const targets = document.querySelectorAll("[data-cursor-target]");

      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => {
          const newLabel = target.dataset.cursorLabel || "";
          setLabel(newLabel);
          if (newLabel) {
            gsap.to(cursor, {
              scale: 1,
              width: 140,
              height: 40,
              borderRadius: 20,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(cursor, {
              scale: 2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              transformOrigin: "center center",
            });
          }
        });
        target.addEventListener("mouseleave", () => {
          setLabel("");
          gsap.killTweensOf(cursor, "scale,width,height,borderRadius");
          gsap.set(cursor, {
            scale: 1,
            width: 16,
            height: 16,
          });
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: cursorRef },
  );

  return createPortal(
    <div
      ref={cursorRef}
      className="fake-cursor border border-text-primary text-text-primary"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: 10,
        background: label ? "white" : "black",
        color: label ? "black" : "white",
        fontSize: 12,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {label}
    </div>,
    document.body,
  );
}
