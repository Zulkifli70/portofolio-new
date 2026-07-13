import { useGSAP } from "@gsap/react";
import Section from "../layout/Section";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function Hero() {
  useGSAP(() => {
    const loops = gsap.utils.toArray(".hero-text-rail").map((rail) => {
      const isReverse = rail.dataset.direction === "reverse";

      return {
        tl: horizontalLoop(rail.querySelectorAll("h4"), {
          repeat: -1,
          paddingRight: 60,
          speed: 1.1,
          reversed: isReverse,
        }),
        scrollDirection: isReverse ? -1 : 1,
      };
    });

    const observer = Observer.create({
      onChangeY(self) {
        let factor = 2.5;
        if (self.deltaY < 0) {
          factor *= -1;
        }
        loops.forEach(({ tl, scrollDirection }) => {
          const scrollFactor = factor * scrollDirection;

          gsap
            .timeline({
              defaults: {
                ease: "none",
              },
            })
            .to(tl, {
              timeScale: scrollFactor * 2.5,
              duration: 0.2,
              overwrite: true,
            })
            .to(tl, { timeScale: scrollFactor / 2.5, duration: 1 }, "+=0.3");
        });
      },
    });

    return () => {
      observer.kill();
      loops.forEach(({ tl }) => tl.kill());
    };
  });

  const heroText = [
    "Zulkifli Firdausi",
    "Frontend Developer",
    "Creative Designer",
  ];

  const renderRail = (direction = "forward") => (
    <div className="rail hero-text-rail" data-direction={direction}>
      {heroText.map((text) => (
        <h4 key={text}>{text}</h4>
      ))}
    </div>
  );

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
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
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
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
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }
  return (
    <Section className="hero-section relative isolate overflow-hidden bg-white">
      {/* Foto: TIDAK dibungkus lagi, cuma foto polos + frame */}
      <div className="hero-photo-frame absolute top-1/2 left-1/2 md:h-1/2 w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:w-96 rounded-2xl shadow-2xl shadow-gray-950">
        <img
          src="/zulk-photo.png"
          alt="zulkifli firdausi photo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Teks utama, ditumpuk di atas foto via z-index */}
      <div className="scrolling-text hero-copy hero-copy-base">
        {renderRail()}
      </div>

      <div
        className="scrolling-text hero-copy hero-copy-top"
        aria-hidden="true"
      >
        {renderRail("reverse")}
      </div>
    </Section>
  );
}
