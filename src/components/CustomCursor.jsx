import { useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * CustomCursor — Global custom cursor that follows the mouse.
 *
 * Features:
 *   - Small dot by default (16px circle)
 *   - Expands to a pill with "View project" text on hover over
 *     elements with `data-cursor-target="project"` (project cards)
 *   - Rendered via portal into document.body to sit above all transforms
 *
 * Usage: Place once at the root of the app (e.g. in App.jsx).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Optimized mouse-follow using quickTo (reuses tween instance)
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

      const handleMouseMove = (e) => {
        // Offset by half size (8px) to center the dot on cursor
        xTo(e.clientX - 8);
        yTo(e.clientY - 8);
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Find all elements that should trigger cursor expansion
      // Using a data attribute keeps it decoupled from specific class names
      const targets = gsap.utils.toArray("[data-cursor-target]");

      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            width: 120,
            height: 40,
            borderRadius: 10,
            duration: 0.35,
            ease: "back.out(1.7)",
          });
          cursor.textContent = "View project";
        });
        target.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            width: 16,
            height: 16,
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          cursor.textContent = "";
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: cursorRef }, // auto-cleanup on unmount
  );

  return createPortal(
    <div
      ref={cursorRef}
      className="fake-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "black",
        color: "white",
        fontSize: 12,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />,
    document.body,
  );
}