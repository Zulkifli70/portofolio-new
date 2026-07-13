import Header from "./components/Header";
import BaseLayout from "./layout/BaseSections";
import Hero from "./sections/Hero";
import "./App.css";

function App() {
  return (
    <BaseLayout>
      <Header />
      <Hero />
    </BaseLayout>
  );
}

export default App;
