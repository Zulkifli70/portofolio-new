import { useEffect, useRef } from "react";
import gsap from "gsap";

const TRAIL_LENGTH = 15;

// outside the component: stable, not recreated every render
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const lerp = (a, b, n) => a + (b - a) * n;

export default function Home() {
  const inkTextRef = useRef(null);
  const trailRef = useRef(null);

  // --- "Frontend Developer" intro animation ---
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".letter-tspan", {
        attr: { x: -40 }, // transforms don't work on tspan, attr does
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, inkTextRef);
    return () => ctx.revert();
  }, []);

  // --- Ambient Idle: mikro gerakan organik setiap huruf ---
  // Setiap huruf mengapung dengan rotasi dan pergeseran y sangat lemah,
  // seolah-olah mengambang di air. Jalan terus (repeat: -1) tapi sangat lambat
  // sehingga tidak membuat user pusing, dan mati jika user activa interaksi.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const inkText = inkTextRef.current;
    if (!inkText) return;
    const ctx = gsap.context(() => {
      // Gunakan single selector string (comma-separated) karena GSAP toArray
      // tidak menerima multiple args sebagai selector. .letter-tspan sudah mencakup
      // semua tspan di dalam teks, jadi kita gunakan selector yang lebih spesifik.
      const chars = gsap.utils.toArray(
        ".home-ink-text text tspan, .letter-tspan",
      );
      if (chars.length === 0) return;
      chars.forEach((char, i) => {
        // delay per character biar tidak sinkron
        const delay = (i / chars.length) * 4;
        gsap.to(char, {
          rotation: gsap.utils.random(-1.5, 1.5),
          y: gsap.utils.random(-2, 2),
          x: gsap.utils.random(-2, 2),
          duration: gsap.utils.random(6, 12),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay,
        });
      });
    }, inkTextRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // --- Interactive Magnetic: huruf bereaksi pada kursor ---
  // Ketika kursor mendekat, huruf-huruf akan "ditarik" atau "dipusing"
  // arah kursor dengan quickTo (smooth damping), lalu elastik pulang.
  // Efek: repel (menjauh) ketika terlalu dekat, lalu spring balik.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const inkText = inkTextRef.current;
    if (!inkText) return;
    const ctx = gsap.context(() => {
      // Gunakan single selector string (comma-separated) karena GSAP toArray
      // tidak menerima multiple args sebagai selector
      const chars = gsap.utils.toArray(
        ".home-ink-text text tspan, .letter-tspan",
      );
      if (chars.length === 0) return;

      //inisialisasi quickTo ke posisi awal tiap huruf
      const targets = chars.map((ch) => ({
        x: parseFloat(ch.getAttribute("x")) || 0,
        y: parseFloat(ch.getAttribute("y")) || 0,
        //also track rotation for skew effect
        r: 0,
      }));

      const mouse = { x: 0, y: 0 };
      const active = useRef(false);
      const hoverRadius = 120; // jarakaktivasi
      const pushForce = 80; // seberapa kuat huruf dipusing
      const elastic = 0.6; // faktor elastis saat pulang

      const onMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        active.current = true;
      };

      const onLeave = () => {
        active.current = false;
      };

      // Aktifkan event listener setelah render
      const inkTextEl = inkText.querySelector("text");
      if (inkTextEl) {
        inkTextEl.addEventListener("mousemove", onMove);
        inkTextEl.addEventListener("mouseleave", onLeave);
      }

      const tick = () => {
        if (!active.current) {
          // Ketika mouse tidak aktif, pulihkan ke posisi awal dengan elastic
          chars.forEach((ch, i) => {
            const t = targets[i];
            gsap.to(ch, {
              x: t.x,
              y: t.y,
              rotation: t.r,
              duration: 1.2,
              ease: "power2.out",
            });
          });
          requestAnimationFrame(tick);
          return;
        }

        // Hitung jarak mouse ke tengah setiap huruf
        const textRect = inkTextEl.getBBox();
        const centerX = textRect.x + textRect.width / 2;
        const centerY = textRect.y + textRect.height / 2;

        chars.forEach((ch, i) => {
          const tx = parseFloat(ch.getAttribute("x")) || 0;
          const ty = parseFloat(ch.getAttribute("y")) || 0;
          const chCenterX = tx + 50; // aproksimasi lebar huruf
          const chCenterY = ty + 20; // aproksimasi tinggi huruf

          // Jarak dari mouse ke center huruf
          const dx = mouse.x - (chCenterX + centerX);
          const dy = mouse.y - (chCenterY + centerY);
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Jika mouse dalam radius, dorong huruf kebalikannya (repel)
          // jika luar, tarik pelan ke arah mouse
          let targetX = 0,
            targetY = 0;

          if (dist < hoverRadius && dist > 0) {
            // Repel: dorong huruf menjauh dari kursor
            const angle = Math.atan2(dy, dx);
            const repelX = Math.cos(angle) * (hoverRadius - dist) / hoverRadius * pushForce;
            const repelY = Math.sin(angle) * (hoverRadius - dist) / hoverRadius * pushForce;
            targetX = repelX;
            targetY = repelY;
          } else {
            // Tarik pelan ke arah kursor (magnetic)
            const pullForce = 0.15;
            targetX = (mouse.x - centerX - chCenterX) * pullForce;
            targetY = (mouse.y - centerY - chCenterY) * pullForce;
          }

          // Terapkan dengan quickTo damping untuk gerakan halus
          gsap.quickTo(ch, { x: targetX, y: targetY, duration: 1.5, ease: "power3.out" });

          // Opitional: skew berdasarkan arah mouse
          if (dist > 0 && dist < hoverRadius * 1.5) {
            const angle = Math.atan2(dy, dx);
            gsap.set(ch, { rotation: angle * 0.15 });
          }
        });

        requestAnimationFrame(tick);
      };

      // Mulai loop
      requestAnimationFrame(tick);

      return () => {
        if (inkTextEl) {
          inkTextEl.removeEventListener("mousemove", onMove);
          inkTextEl.removeEventListener("mouseleave", onLeave);
        }
        ctx.revert();
      };
    }, inkTextRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // --- Draggable Bonus: user bisa melempar/geser huruf ---
  // Pakai GSAP Draggable dengan inertia untuk menggeser huruf di kanvas
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const inkText = inkTextRef.current;
    if (!inkText) return;
    const ctx = gsap.context(() => {
      // Cek apakah Draggable tersedia
      if (typeof window !== "undefined" && window.Draggable) {
        const chars = gsap.utils.toArray(
          ".home-ink-text text tspan, .letter-tspan",
        );
        if (chars.length === 0) return;

        window.Draggable.create(chars, {
          type: "x,y",
          bounds: inkText,
          inertia: true,
          onDragEnd: () => {
            // optionally reset after throw
          },
        });
      }
      // fallback manual spring jika Draggable tidak ada
      else {
        const chars = gsap.utils.toArray(
          ".home-ink-text text tspan",
          ".letter-tspan",
        );
        if (chars.length === 0) return;

        const mouse = { x: 0, y: 0 };
        const active = useRef(false);

        const onMouseDown = (e) => {
          active.current = true;
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        };

        const onMouseUp = () => {
          active.current = false;
        };

        const onMouseMove = (e) => {
          if (!active.current) return;
          mouse.x = e.clientX;
          mouse.y = e.clientY;

          // geser tiap huruf mengikuti mouse dengan spring
          chars.forEach((ch) => {
            const ax = mouse.x - 50; // offset approximatif
            const ay = mouse.y - 20;
            gsap.to(ch, {
              x: ax,
              y: ay,
              duration: 0.4,
              ease: "power3.out",
            });
          });
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);

        return () => {
          document.removeEventListener("mousedown", onMouseDown);
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        };
      }
    }, inkTextRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="home">
      <main className="home-main">
        <svg
          ref={inkTextRef}
          className="home-ink-text"
          viewBox="0 0 600 220"
          aria-label="Frontend Developer"
        >
          <text
            x="0"
            y="0"
            fill="#262626"
            fontFamily="Syne, system-ui, sans-serif"
            fontWeight="800"
            fontSize="90"
          >
            <tspan x="0" dy="1em" className="letter-tspan">
              Frontend
            </tspan>
            <tspan x="0" dy="1.1em" className="letter-tspan">
              Developer
            </tspan>
          </text>
        </svg>

        <svg
          ref={trailRef}
          className="home-ink-trail"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
          aria-hidden="true"
        >
          {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
            <circle
              key={i}
              cx={-100}
              cy={-100}
              r={Math.max(2, 8 - i * 0.4)}
              fill="#262626"
              opacity={1 - (i / TRAIL_LENGTH) * 0.8}
            />
          ))}
        </svg>
      </main>
    </div>
  );
}