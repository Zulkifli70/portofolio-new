import { useRef } from "react";
import Section from "../layout/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ChevronDown } from "lucide-react";

/**
 * Hero — Opening section with a zoom-on-scroll photo and infinite scrolling text.
 *
 * Layout:
 *   - A centered photo frame that grows wider/taller as the user scrolls down.
 *   - Two text rails ("Zulkifli Firdausi", "Frontend Developer", "UI UX DESIGNER")
 *     that loop horizontally at different speeds/directions via `horizontalLoop`.
 *   - An Observer listener that makes the text scroll speed respond to the user's
 *     scroll velocity (faster scroll → faster text).
 *
 * Responsive:
 *   - Desktop (≥768px): photo zooms to 70vw × 83vh while pinned.
 *   - Mobile: no zoom pin, text rails still loop.
 */
export default function Hero() {
  /** Ref to the entire <Section> for ScrollTrigger scoping. */
  const sectionRef = useRef(null);

  /** Ref to the photo frame <div> — animated via GSAP to grow on scroll. */
  const frameRef = useRef(null);

  /** Ref to the pin wrapper that ScrollTrigger pins during the zoom effect. */
  const pinWrapperRef = useRef(null);

  // ── Photo zoom on scroll ──────────────────────────────────────────
  // On desktop only: pins the hero section and scrubs the photo from
  // its initial small size to 70vw × 83vh as the user scrolls.
  useGSAP(
    () => {
      const frame = frameRef.current;
      const heroSection = sectionRef.current;
      if (!frame || !heroSection) return undefined;

      // MatchMedia ensures this only runs on desktop (≥768px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(frame, {
          width: "70vw",
          height: "83vh",
          borderRadius: 5,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=100%", // pin for one full viewport of scroll
            scrub: true, // scroll position drives the zoom
            pin: pinWrapperRef.current,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(".scroll", {
        y: 10,
        duration: 0.6,
        ease: "power1.inOut",
        repeat: -1, // -1 = ulang terus tanpa henti
        yoyo: true, // bikin animasi bolak-balik (turun-naik-turun-naik)
        repeatDelay: 0.2, // jeda dikit tiap siklus (opsional)
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] },
  );

  // ── Infinite horizontal text loops + scroll-linked speed ───────────
  // Creates looping horizontal text rails. Each rail scrolls its text
  // endlessly. An Observer makes the scroll speed respond to the user's
  // scroll velocity (scrolling down = speed up, scrolling up = reverse).
  useGSAP(() => {
    // Wait for fonts to load so text widths are accurate
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        /**
         * Each rail gets a horizontalLoop timeline and a direction multiplier.
         * - `tl`: the GSAP timeline that loops the text horizontally.
         * - `scrollDirection`: 1 for forward rails, -1 for reverse rails.
         *   Determines whether scrolling down speeds up or reverses the loop.
         */
        const loops = gsap.utils.toArray(".hero-text-rail").map((rail) => {
          const isReverse = rail.dataset.direction === "reverse";

          return {
            tl: horizontalLoop(rail.querySelectorAll("h4"), {
              repeat: -1,
              paddingRight: 60,
              speed: 0.5,
              reversed: isReverse,
            }),
            scrollDirection: isReverse ? -1 : 1,
          };
        });

        // Observer listens for scroll/touch/pointer Y-axis movement
        const observer = Observer.create({
          onChangeY(self) {
            let factor = 2.5;
            if (self.deltaY < 0) {
              factor *= -1; // reverse speed when scrolling up
            }
            loops.forEach(({ tl, scrollDirection }) => {
              const scrollFactor = factor * scrollDirection;

              // Quick speed-up on scroll, then ease back to base speed
              gsap
                .timeline({
                  defaults: {
                    ease: "none",
                  },
                })
                .to(tl, {
                  timeScale: scrollFactor * 1.5, // spike speed
                  duration: 0.2,
                  overwrite: true,
                })
                .to(
                  tl,
                  { timeScale: scrollFactor / 1.5, duration: 1 }, // ease back
                  "+=0.3",
                );
            });
          },
        });

        return () => {
          observer.kill();
          loops.forEach(({ tl }) => tl.kill());
        };
      });
    });
  });

  /** Text content repeated in each scrolling rail. */
  const heroText = [
    "Zulkifli Firdausi",
    "Frontend Developer",
    "UI UX DESIGNER",
  ];

  /**
   * Renders a single horizontal text rail.
   * @param {string} direction - "forward" (default) or "reverse" for opposite scroll.
   * @returns {JSX.Element} A <div> rail containing <h4> text elements.
   */
  const renderRail = (direction = "forward") => (
    <div className="rail hero-text-rail" data-direction={direction}>
      {heroText.map((text) => (
        <h4 key={text}>{text}</h4>
      ))}
    </div>
  );

  /**
   * horizontalLoop — Creates an infinitely looping horizontal scroll timeline.
   *
   * Positions items in a horizontal row, then builds a timeline that:
   *   1. Moves each item leftward until it reaches the start position.
   *   2. Instantly jumps it to the end (right side) via `fromTo`.
   *   3. Repeats for a seamless infinite loop.
   *
   * This is a GSAP utility pattern for marquee/ticker effects.
   *
   * @param {Element[]} items — DOM elements to loop (e.g. <h4> nodes in a rail).
   * @param {Object} [config] — Configuration options.
   * @param {number}  [config.repeat=-1]      — Number of repeats (-1 = infinite).
   * @param {boolean} [config.paused=false]    — Start paused if true.
   * @param {number}  [config.speed=1]         — Pixels-per-second speed multiplier.
   * @param {number}  [config.paddingRight=0]  — Extra right padding in px.
   * @param {boolean} [config.reversed=false]  — Start reversed if true.
   * @param {boolean|number} [config.snap=1]   — Snap interval or false to disable.
   * @returns {gsap.core.Timeline} The looping timeline with .next(), .previous(), .toIndex() helpers.
   */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        // When reversed timeline completes, jump to end to prevent jump-back
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [], // label times for each item's start position
      widths = [], // measured pixel width of each item
      xPercents = [], // initial xPercent for each item
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    // Measure each item's width and compute its starting xPercent
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent"),
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });

    // Total pixel width of all items end-to-end (for seamless wrapping)
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    // Build the looping timeline: each item slides left, then teleports right
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }

    /**
     * Navigates to a specific item index, taking the shortest path around
     * the loop (forward or backward).
     *
     * @param {number} index — Target item index.
     * @param {Object} [vars] — Additional tween vars.
     * @returns {gsap.core.Tween} The tween to the target index.
     */
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    // Attach helper methods to the timeline for external control
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;

    // Initialize timeline at start
    tl.progress(1, true).progress(0, true);

    // If reversed, trigger the reverse and let the timeline play backward
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  return (
    <Section
      id="hero"
      ref={sectionRef}
      className="hero-section relative isolate overflow-hidden "
    >
      {/* Pin wrapper — ScrollTrigger pins this div while the photo zooms */}
      <div ref={pinWrapperRef} className="hero-pin-wrapper bg-bg">
        <div
          ref={frameRef}
          className="hero-photo-frame shadow-2xl shadow-gray-950"
        >
          <img
            src="/zulk-photo.png"
            alt="zulkifli firdausi photo"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Top text rail — offset upward, also exclusion blend, pointer-events disabled */}
        <div
          className="scrolling-text hero-copy hero-copy-top"
          aria-hidden="true"
        >
          {renderRail("reverse")}
        </div>
        {/* Mid Top text rail — offset upward, also exclusion blend, pointer-events disabled */}
        <div
          className="scrolling-text hero-copy hero-copy-mid-top"
          aria-hidden="true"
        >
          {renderRail()}
        </div>

        {/* Mid text rail — offset upward, also exclusion blend, pointer-events disabled */}
        <div
          className="scrolling-text hero-copy hero-copy-mid"
          aria-hidden="true"
        >
          {renderRail("reverse")}
        </div>

        {/* Mid text rail — offset upward, also exclusion blend, pointer-events disabled */}
        <div
          className="scrolling-text hero-copy hero-copy-mid-bot"
          aria-hidden="true"
        >
          {renderRail()}
        </div>

        {/* Bottom text rail — white text with exclusion blend for contrast */}
        <div className="scrolling-text hero-copy hero-copy-base">
          {renderRail("reverse")}
        </div>

        <div className="absolute flex flex-col items-center bottom-18 lg:bottom-5 left-1/2 -translate-x-1/2">
          <h3 className="font-space text-md">Scroll Down</h3>
          <ChevronDown className="scroll" />
        </div>
      </div>
    </Section>
  );
}
