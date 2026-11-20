/**
 * Entry point — mounts the React app into the Barba container.
 *
 * Barba owns routing: it intercepts dock links, fetches the next page and
 * swaps the `data-barba="container"` node. React is re-mounted into each new
 * container, then GSAP slides it in horizontally based on dock order.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import barba from "@barba/core";
import gsap from "gsap";
import App from "./App.jsx";
import { NAV } from "./nav";

const normalize = (path = "") => path.replace(/\/+$/, "") || "/";

// Position in the dock → decides slide direction (later page = slide left).
const pageOrder = (path) =>
  NAV.findIndex((n) => n.to === path || (n.to !== "/" && path.startsWith(n.to)));

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let root;
let direction = 1;

const mount = (container) => {
  root?.unmount();
  root = createRoot(container);
  flushSync(() =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );
};

mount(document.querySelector('[data-barba="container"]'));

barba.init({
  preventRunning: true,
  // Active link: change history only, no swap.
  prevent: ({ el }) => el.origin === location.origin && normalize(el.pathname) === normalize(location.pathname),
  transitions: [
    {
      name: "horizontal",
      beforeLeave({ current, trigger }) {
        if (trigger === "back") direction = -1;
        else if (trigger === "forward") direction = 1;
        else {
          const from = pageOrder(normalize(current.url.path));
          const to = pageOrder(normalize(trigger?.getAttribute?.("href") ?? ""));
          direction = to >= from ? 1 : -1;
        }
      },
      leave: ({ current }) =>
        reduced() ||
        gsap.to(current.container, {
          x: -direction * 90,
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.in",
        }),
      enter: ({ next }) => {
        mount(next.container);
        if (reduced()) return;
        return gsap.fromTo(
          next.container,
          { x: direction * 90, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "all",
          },
        );
      },
    },
  ],
});
