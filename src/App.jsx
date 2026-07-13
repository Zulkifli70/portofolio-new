import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css";
import About from "./sections/About";

function App() {
  return (
    <BaseLayout>
      <Header />
      <Hero />
      <About />
    </BaseLayout>
  );
}

export default App;
