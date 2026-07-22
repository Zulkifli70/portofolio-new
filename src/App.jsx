import "./gsap-plugins";
import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css";
import About from "./sections/About";
import Showcase from "./sections/Showcase";
import SmoothScrollPortfolio from "./animation/SmoothScrollPortfolio";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen extraHoldTime={2000}>
        <Header />
        <SmoothScrollPortfolio>
          <BaseLayout>
            <Hero />
            <About />
            <Showcase />
            <Experience />
            <TechStack />
            <Footer />
          </BaseLayout>
        </SmoothScrollPortfolio>
      </LoadingScreen>
    </>
  );
}

export default App;
