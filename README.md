# Zulkifli Firdausi — Portfolio

Personal portfolio website showcasing frontend development and UI/UX design work.

## Tech Stack

- **React 19** + **Vite 8** — fast SPA with HMR
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **GSAP** — scroll-driven animations, smooth scrolling, text effects
- **Lucide React** — icon library

## Features

- Loading screen with real image-progress tracking
- Infinite horizontal text rails on hero section
- Horizontal-scroll project gallery with detail modals
- Custom cursor with contextual labels
- Mouse-proximity scaling on tech stack icons
- ScrollSmoother for smooth scroll experience
- `prefers-reduced-motion` support

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Structure

```
src/
  components/    — Header, Footer, CustomCursor, LoadingScreen
  sections/      — Hero, About, Showcase, Experience, TechStack
  layout/        — BaseSections, Section wrappers
  animation/     — SmoothScrollPortfolio (ScrollSmoother)
public/
  font/          — Self-hosted Google Fonts (TTF)
  svg/           — Hand-drawn decoration icons
  techIcons/     — Tech stack logos
  project/       — Project thumbnails
  showcase-details/ — Per-project gallery images
```

## License

This project is personal and not open for reuse.
