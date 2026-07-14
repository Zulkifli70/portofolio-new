import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css";
import About from "./sections/About";
import Showcase from "./sections/Showcase";

function App() {
  return (
    <BaseLayout>
      <Header />
      <Hero />
      <About />
      <Showcase />
    </BaseLayout>
  );
}

export default App;
