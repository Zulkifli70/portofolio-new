import { Player } from "@remotion/player";
import { LoadingScreen } from "../remotion/LoadingScreen.jsx";

export default function LoadingOverlay() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-label="Loading portfolio">
      <Player
        component={LoadingScreen}
        durationInFrames={60}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        autoPlay={!reduce}
        initialFrame={reduce ? 30 : 0}
        loop={false}
        controls={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
