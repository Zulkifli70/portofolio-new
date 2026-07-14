import Section from "../layout/Section";

export default function About() {
  return (
    <Section>
      <div className="w-full h-screen grid items-center pt-20">
        <h2 className="font-neuton text-9xl">About Me</h2>
        <p className="font-neuton text-7xl w-2/3">
          Hello, I'm Zulk, an indonesian frontend developer who enjoys turning
          ideas into resfponsive interaces that feel modern and easy to use. I
          care about the small details that make a product smoother, from layout
          rhythm to thoughtful interactions.
        </p>
      </div>
    </Section>
  );
}
