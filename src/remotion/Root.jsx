import { Composition } from "remotion";
import { LoadingScreen } from "./LoadingScreen.jsx";

export const RemotionRoot = () => (
  <Composition
    id="PortfolioLoader"
    component={LoadingScreen}
    durationInFrames={60}
    fps={30}
    width={1920}
    height={1080}
  />
);
