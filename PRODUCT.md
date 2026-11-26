# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers deciding whether to shortlist Zulkifli for a frontend or UI/UX role. Secondary: freelance clients deciding whether to commission design or development work. [Confirmed]

## Product Purpose

Personal portfolio for Zulkifli Firdausi, frontend developer and UI/UX designer based in Indonesia. It shows frontend and UI/UX work so a visitor can judge the person behind it. [Confirmed] Success means the visitor decides to reach out for a role or a commission. [Inferred from the confirmed visitor decisions]

## Positioning

Motion-rich showcase: transitions, the horizontal project gallery, and tactile interaction are the memorable part, not decoration bolted onto a static resume. [Confirmed]

## Operating Context

A client-routed web portfolio with Home, Projects, Experience, Tech, and Contact views. The Projects view is a looping horizontal gallery; each card opens a detail modal with gallery images, feature list, and links to the live site and repository. Projects and experience deep links open a specific item. Contact offers copy-to-clipboard email, GitHub, and LinkedIn. [Observed in code]

## Capabilities and Constraints

- Real content only: no invented testimonials, clients, metrics, pricing, or employment claims. [Confirmed]
- Preserve the real identity and links: name, role, Indonesia base, email, GitHub, LinkedIn as listed in `src/data/portfolio.js`. [Confirmed]
- Motion is part of the identity: page transitions, horizontal project gallery, and `prefers-reduced-motion` support stay. [Confirmed]
- `src/data/portfolio.js` stays the single source for projects, experience, tech stack, About, and contact. [Confirmed]
- Stack in use: React 19, Vite 8, Tailwind CSS v4, GSAP, Lenis; content is authored in JSX/CSS, not a CMS. [Observed in code]

## Brand Commitments

Name: Zulkifli Firdausi. Role line: "Frontend Developer / UI UX Designer". Based in Indonesia. Motion-led expression. [Confirmed]

## Evidence on Hand

Five projects with live URLs, repositories, screenshots, and per-project detail images under `public/project/` and `public/showcase-details/`; one UI/UX design internship at Jalin Mayantara Indonesia (2022–2023, Malang) in `src/data/portfolio.js`; 13 listed technologies; contact links in the same file. No testimonials, client list, usage metrics, or press are present, and future work must not fabricate them. [Observed in code; absence confirmed as a constraint]

## Product Principles

1. Real work only: shipped projects, real links, no invented proof. [Confirmed]
2. Motion carries identity; reduced-motion visitors still get the product. [Confirmed]
3. One content source: `src/data/portfolio.js`. [Confirmed]
4. Recruiter first, client second: make the evidence easy to judge without closing the client path. [Confirmed]

## Accessibility & Inclusion

`prefers-reduced-motion` support is part of the product and must remain. [Confirmed]
