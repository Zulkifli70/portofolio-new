/**
 * Portfolio content — single source of truth so the UI can be rebuilt
 * without touching the data.
 */

export const projects = [
  {
    name: "Pokemon Memory Game",
    image: "/project/pokemon.png",
    gallery: [
      "/showcase-details/memory-game/game-home.jpg",
      "/showcase-details/memory-game/game-board.jpg",
      "/showcase-details/memory-game/game-result.jpg",
      "/showcase-details/memory-game/game-result2.jpg",
    ],
    link: "https://zulkmemorycard.netlify.app/",
    repo: "https://github.com/Zulkifli70/memory-card-game",
    status: "Live",
    features: [
      "Score tracking and best-score persistence",
      "Multiple difficulty levels",
      "Flip and match card animations",
    ],
    description:
      "A memory card matching game featuring Pokemon characters. Flip cards to find matching pairs with score tracking and difficulty levels.",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    name: "Assembly Word",
    image: "/project/assembly.png",
    gallery: [
      "/showcase-details/wordle/home.jpg",
      "/showcase-details/wordle/win.jpg",
      "/showcase-details/wordle/lose.jpg",
    ],
    link: "https://zulkassembly.vercel.app/",
    repo: "https://github.com/Zulkifli70/react-ts",
    status: "Live",
    features: [
      "Letter-by-letter word guessing",
      "Visual feedback for correct/incorrect letters",
      "Hints and scoring system",
    ],
    description:
      "Word guessing game inspired by assembly language concepts. Guess the word letter by letter with visual feedback.",
    tags: ["React", "JavaScript", "TailwindCSS"],
  },
  {
    name: "Kanban Board",
    image: "/project/kanban.png",
    gallery: [
      "/showcase-details/kanban/home.jpg",
      "/showcase-details/kanban/showcase.jpg",
    ],
    link: "https://zulk-kanban.netlify.app/",
    repo: "https://github.com/Zulkifli70/kanban-board",
    status: "Live",
    features: [
      "Drag-and-drop between columns",
      "Create, edit, and delete tasks",
      "Local storage persistence",
    ],
    description:
      "Drag-and-drop kanban board for task management. Create, edit, and organize tasks across columns.",
    tags: ["React", "JavaScript", "DnD"],
  },
  {
    name: "Print Forge",
    image: "/project/printforge.png",
    gallery: [
      "/showcase-details/printforge/home.jpg",
      "/showcase-details/printforge/about.jpg",
      "/showcase-details/printforge/showcase.jpg",
    ],
    link: "https://next-project-eta-vert.vercel.app/",
    repo: "https://github.com/Zulkifli70/next-project",
    status: "On Progress",
    features: [
      "Browse and search 3D print models",
      "Customize model options",
      "Responsive marketplace layout",
    ],
    description:
      "3D printing marketplace and design tool. Browse, customize, and download 3D print-ready models.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    name: "Tenzies",
    image: "/project/tenzies.png",
    gallery: [
      "/showcase-details/tenzies/home.jpg",
      "/showcase-details/tenzies/win.jpg",
    ],
    link: "https://zulktenzies.netlify.app/",
    repo: "https://github.com/Zulkifli70/Tenzies",
    status: "Live",
    features: [
      "Roll dice until all match",
      "Freeze dice between rolls",
      "Roll counter and win detection",
    ],
    description:
      "Roll dice until all match. Click to freeze dice at their current value between rolls.",
    tags: ["React", "JavaScript", "CSS"],
  },
];

export const experiences = [
  {
    company: "Jalin Mayantara Indonesia",
    position: "UI UX Designer (Intership)",
    industry: "IT Services",
    period: "2022 - 2023",
    location: "Malang, Indonesia",
    responsibilities: [
      "Conducted user research and stakeholder interviews to gather insights for UI/UX design decisions.",
      "Created wireframes, prototypes, and high-fidelity designs using Figma to visualize and validate user flows.",
      "Collaborated with cross-functional teams to define features and translate them into intuitive user experiences.",
      "Developed and maintained design systems to ensure consistency and serve as guidelines for developers.",
    ],
  },
  {
    company: "Jalin Mayantara Indonesia",
    position: "UI UX Designer (Intership)",
    industry: "IT Services",
    period: "2022 - 2023",
    location: "Malang, Indonesia",
    responsibilities: [
      "Conducted user research and stakeholder interviews to gather insights for UI/UX design decisions.",
      "Created wireframes, prototypes, and high-fidelity designs using Figma to visualize and validate user flows.",
      "Collaborated with cross-functional teams to define features and translate them into intuitive user experiences.",
      "Developed and maintained design systems to ensure consistency and serve as guidelines for developers.",
    ],
  },
];

export const techStacks = [
  { name: "React", imgPath: "/techIcons/react.png" },
  { name: "Next JS", imgPath: "/techIcons/Next.js.png" },
  { name: "Tailwind", imgPath: "/techIcons/Tailwind CSS.png" },
  { name: "Javascript", imgPath: "/techIcons/JavaScript.png" },
  { name: "GSAP", imgPath: "/techIcons/gsap.png" },
  { name: "Astro", imgPath: "/techIcons/Astro.png" },
  { name: "Vue", imgPath: "/techIcons/Vue.js.png" },
  { name: "TypeScript", imgPath: "/techIcons/TypeScript.png" },
  { name: "Github", imgPath: "/techIcons/github.png" },
  { name: "Nuxt JS", imgPath: "/techIcons/nuxtjs.png" },
  { name: "MongoDB", imgPath: "/techIcons/mongodb.png" },
  { name: "Figma", imgPath: "/techIcons/Figma.png" },
  { name: "Postgres", imgPath: "/techIcons/postgres.png" },
];

export const about = {
  heading: "About Me",
  text: "Hello, I'm Zulk, an indonesian frontend developer who enjoys turning ideas into responsive interfaces that feel modern and easy to use. I care about the small details that make a product smoother, from layout rhythm to thoughtful interactions.",
};

export const contact = {
  email: "firdausi.zulkifli@gmail.com",
  github: "https://github.com/Zulkifli70",
  linkedin: "https://www.linkedin.com/in/zulkifli-firdausi",
};
