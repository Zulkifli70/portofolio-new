import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css";
import About from "./sections/About";
import Showcase from "./sections/Showcase";
import SmoothScrollPortfolio from "./animation/SmoothScrollPortfolio";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";

function App() {
  return (
    <>
      <Header />
      <SmoothScrollPortfolio>
        <BaseLayout>
          <Hero />
          <About />
          <Showcase />
          <Experience />
          <TechStack />
        </BaseLayout>
      </SmoothScrollPortfolio>
    </>
  );
}

export default App;
