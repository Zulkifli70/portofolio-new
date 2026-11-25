import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PAPER = "#ededed";
const INK = "#262626";
const COLS = 12;
const ROWS = 6;
const CELL = 88;
const GAP = 4;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);
const LOOP_FRAMES = 60;
const useLoopFrame = () => useCurrentFrame() % LOOP_FRAMES;
const useScaledFps = () => useVideoConfig().fps * (4 / 3);
const hash = (i) => {
  const x = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const Fonts = () => (
  <style>{`
    @font-face {
      font-family: Syne;
      font-weight: 200 900;
      src: url("${staticFile("font/Syne-VariableFont.ttf")}") format("truetype");
    }
    @font-face {
      font-family: SpaceGrotesk;
      font-weight: 300 700;
      src: url("${staticFile("font/SpaceGrotesk-VariableFont.ttf")}") format("truetype");
    }
  `}</style>
);

const InkGrid = () => {
  const frame = useLoopFrame();
  const fps = useScaledFps();
  const fill = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const clear = interpolate(frame, [0.9 * fps, 1.25 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
        gap: GAP,
        width: COLS * CELL + (COLS - 1) * GAP,
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const t = hash(i);
        const inAlpha = clamp01((fill - t * 0.7) / 0.3);
        const outAlpha = 1 - clamp01((clear - (1 - t) * 0.7) / 0.3);
        return (
          <div
            key={i}
            style={{
              width: CELL,
              height: CELL,
              background: INK,
              opacity: inAlpha * outAlpha,
            }}
          />
        );
      })}
    </div>
  );
};

const Wordmark = () => {
  const frame = useLoopFrame();
  const fps = useScaledFps();
  const enter = interpolate(frame, [0.82 * fps, 1.05 * fps], [0, 1], clamp);
  const leave = interpolate(frame, [1.32 * fps, 1.5 * fps], [1, 0], clamp);
  const opacity = enter * leave;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", lineHeight: 0.85 }}>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: -10,
            color: INK,
          }}
        >
          ZULKIFLI
        </div>
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: -10,
            color: PAPER,
            WebkitTextStroke: `2px ${INK}`,
          }}
        >
          FIRDAUSI
        </div>
      </div>
    </div>
  );
};

const MetaLabel = () => {
  const frame = useLoopFrame();
  const fps = useScaledFps();
  const show =
    interpolate(frame, [0.35 * fps, 0.55 * fps], [0, 1], clamp) *
    interpolate(frame, [0.78 * fps, 0.95 * fps], [1, 0], clamp);
  const progress = interpolate(frame, [0, 0.6 * fps], [0, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        opacity: show,
        color: PAPER,
        fontFamily: "SpaceGrotesk",
        fontSize: 20,
        letterSpacing: 3,
        textTransform: "uppercase",
      }}
    >
      <span>Loading Portfolio</span>
      <span>Portfolio / 2026</span>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -18,
          height: 2,
          background: PAPER,
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -18,
          height: 2,
          background: PAPER,
          scale: `${progress} 1`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};

const Sparkle = () => {
  const frame = useLoopFrame();
  const fps = useScaledFps();
  const enter = interpolate(frame, [1.28 * fps, 1.42 * fps], [0, 1], clamp);
  const scale = interpolate(frame, [1.28 * fps, 1.42 * fps], [0.4, 1], {
    ...clamp,
    easing: Easing.spring({ damping: 200 }),
  });

  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{
        position: "absolute",
        right: 32,
        top: 28,
        width: 28,
        height: 28,
        opacity: enter,
        scale,
        fill: INK,
      }}
    >
      <path d="M8 0.8 9.5 5.3 14 8 9.5 10.7 8 15.2 6.5 10.7 2 8 6.5 5.3Z" />
    </svg>
  );
};

export const LoadingScreen = () => (
  <AbsoluteFill style={{ backgroundColor: PAPER, fontFamily: "SpaceGrotesk" }}>
    <Fonts />
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ position: "relative", width: COLS * CELL + (COLS - 1) * GAP, height: ROWS * CELL + (ROWS - 1) * GAP }}>
        <InkGrid />
        <Wordmark />
        <MetaLabel />
        <Sparkle />
      </div>
    </div>
  </AbsoluteFill>
);
