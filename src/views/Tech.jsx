import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { techStacks } from "../data/portfolio";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

const GAP = 4;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function Tech() {
  const stage = useRef(null);

  useGSAP(
    () => {
      const seed = Date.now() % 1000;
      const bubbles = [...stage.current.querySelectorAll(".tech-bubble")];
      if (!bubbles.length) return;

      const setX = bubbles.map((el) => gsap.quickSetter(el, "x", "px"));
      const setY = bubbles.map((el) => gsap.quickSetter(el, "y", "px"));
      const bases = [];
      const radii = [];
      const limits = [];
      const moved = new Set();
      let active = null;

      const draggables = Draggable.create(bubbles, {
        type: "x,y",
        bounds: stage.current,
        edgeResistance: 0.85,
        inertia: true,
        throwResistance: 1600,
        maxDuration: 1.2,
        cursor: "grab",
        activeCursor: "grabbing",
        onPressInit() {
          active = this;
          measure();
        },
        onRelease() {
          if (!this.isThrowing) active = null;
        },
        onThrowComplete() {
          active = null;
        },
        onDrag() {
          moved.add(this);
          resolve();
        },
        onThrowUpdate() {
          moved.add(this);
          resolve();
        },
      });

      const random = (n) => {
        const value = Math.sin((n + seed) * 12.9898) * 43758.5453;
        return value - Math.floor(value);
      };

      function measure() {
        const rect = stage.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;

        bubbles.forEach((el, i) => {
          const box = el.getBoundingClientRect();
          const radius = el.offsetWidth / 2;
          bases[i] = {
            x: box.left + box.width / 2 - cx - draggables[i].x,
            y: box.top + box.height / 2 - cy - draggables[i].y,
          };
          radii[i] = radius;
          limits[i] = {
            minX: -halfW + radius - bases[i].x,
            maxX: halfW - radius - bases[i].x,
            minY: -halfH + radius - bases[i].y,
            maxY: halfH - radius - bases[i].y,
          };
        });

        draggables.forEach((d) => d.applyBounds());
      }

      function place(i) {
        const d = draggables[i];
        d.x = clamp(d.x, limits[i].minX, limits[i].maxX);
        d.y = clamp(d.y, limits[i].minY, limits[i].maxY);
        setX[i](d.x);
        setY[i](d.y);
      }

      function resolve() {
        // shortcut: O(n²) is fine for a few dozen bubbles; use a spatial hash past ~50.
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 0; i < bubbles.length; i++) {
            for (let j = i + 1; j < bubbles.length; j++) {
              const a = draggables[i];
              const b = draggables[j];
              const dx = bases[i].x + a.x - bases[j].x - b.x;
              const dy = bases[i].y + a.y - bases[j].y - b.y;
              const min = radii[i] + radii[j] + GAP;
              const distSq = dx * dx + dy * dy;
              if (distSq >= min * min) continue;

              const dist = Math.sqrt(distSq) || 0.001;
              const overlap = min - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              const aShare = active === a ? 0 : active === b ? 1 : 0.5;
              const bShare = 1 - aShare;

              a.x += nx * overlap * aShare;
              a.y += ny * overlap * aShare;
              b.x -= nx * overlap * bShare;
              b.y -= ny * overlap * bShare;
              if (aShare) moved.add(a);
              if (bShare) moved.add(b);
              place(i);
              place(j);
            }
          }
        }
      }

      function layout() {
        stage.current.style.height = "";
        const initial = stage.current.getBoundingClientRect();
        const size = bubbles[0].offsetWidth;
        const gap = Math.max(12, size * 0.2);
        const cell = size + gap;
        const cols = Math.max(1, Math.floor(initial.width / cell));
        const rows = Math.ceil(bubbles.length / cols);
        const minH = parseFloat(getComputedStyle(stage.current).minHeight) || 0;

        if (rows * cell > minH) stage.current.style.height = `${rows * cell}px`;
        measure();

        const rect = stage.current.getBoundingClientRect();
        const cellW = rect.width / cols;
        const cellH = rect.height / rows;
        const spreadX = Math.max(0, (cellW - size - gap) / 2);
        const spreadY = Math.max(0, (cellH - size - gap) / 2);

        bubbles.forEach((_, i) => {
          const d = draggables[i];
          if (!moved.has(d)) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const rowItems = Math.min(cols, bubbles.length - row * cols);
            const offset = ((cols - rowItems) * cellW) / 2;
            const centerX = -rect.width / 2 + offset + cellW * (col + 0.5);
            const centerY = -rect.height / 2 + cellH * (row + 0.5);
            d.x = centerX - bases[i].x + (random(i * 2) - 0.5) * 2 * spreadX;
            d.y =
              centerY - bases[i].y + (random(i * 2 + 1) - 0.5) * 2 * spreadY;
          }
          place(i);
        });

        draggables.forEach((d) => d.applyBounds());
        resolve();
      }

      layout();
      window.addEventListener("resize", layout);

      return () => {
        window.removeEventListener("resize", layout);
        draggables.forEach((d) => d.kill());
      };
    },
    { scope: stage, dependencies: [techStacks.length], revertOnUpdate: true },
  );

  return (
    <div className="view">
      {/* <h1 className="view-title tech-title">Tech Stack</h1> */}
      <p className="tech-hint">
        Drag the circles around, flick one to play with it.
      </p>
      <div className="tech-stage" ref={stage}>
        {techStacks.map((tech) => (
          <div key={tech.name} className="tech-bubble">
            <img src={tech.imgPath} alt="" loading="lazy" draggable="false" />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
