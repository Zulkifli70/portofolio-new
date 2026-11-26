---
name: Zulkifli Firdausi Portfolio
description: A monochrome, motion-led print portfolio for a frontend developer and UI/UX designer.
colors:
  paper: "#ededed"
  card: "#f5f5f5"
  ink: "#262626"
  ink-deep: "#171614"
  muted: "#5f5f5f"
  line: "#7f7f7f"
  line-strong: "#5f5f5f"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(3rem, 11vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0em"
  body:
    fontFamily: "Neuton, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0em"
  label:
    fontFamily: "SpaceGrotesk, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
  ui:
    fontFamily: "SpaceGrotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
rounded:
  sm: "4px"
  full: "50%"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.25rem"
  xl: "2rem"
  pad: "clamp(1rem, 3vw, 2.5rem)"
  gutter: "clamp(1rem, 2vw, 1.6rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 1.1rem"
  button-primary-hover:
    backgroundColor: "{colors.line-strong}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 1.1rem"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.7rem"
  dock:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "0.25rem"
    height: "44px"
  project-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "clamp(0.6rem, 1.2vw, 0.85rem)"
  tech-bubble:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: "clamp(6rem, 13vw, 9rem)"
  tech-bubble-hover:
    backgroundColor: "#e6e6e6"
  contact-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0px"
    padding: "0"
---

# Design System: Zulkifli Firdausi Portfolio

## Overview

**Creative North Star: "The Ink-and-Paper Gallery"**

The portfolio behaves like a printed portfolio sheet: one gray paper field, graphite ink, hairline rules, and work framed and hung with generous air. Nothing is tinted and nothing floats on a shadow. Separation comes from hairlines, a single tonal step, inversion, and scale. The giant Syne wordmark supplies the poster voice, Neuton supplies the book voice, and Space Grotesk handles the small printed labels. The interface stays achromatic so project screenshots and technology logos carry all of the color.

Motion is the tactility of the paper. A pixel-grid wipe turns pages, a project card physically becomes its detail view, and the tech stack can be flicked like loose tiles. The grammar is mechanical and controlled: power2/power3 easing, no bounce, no decorative loop. The shell itself never scrolls as a page; each view is a plate in a fixed frame with its own inner scroll, so the identity header, dock, and site mark stay put.

**Key Characteristics:**
- Achromatic chrome: newsprint gray, graphite ink, pencil hairlines. No accent hue.
- Poster-scale display type against book-scale reading type, with no mid-size hero in between.
- Flat surfaces at rest and on hover; depth is tonal and linear, never shadowed.
- A single 4px corner radius on every rectangle; circles only for the tech bubbles.
- Fixed app shell with per-view scrolling and safe-area-aware edges.
- Signature motion: pixel wipe, FLIP modal, proximity-scaled gallery, inertia drag.
- Reduced-motion support is part of the product, not an enhancement.

## Colors

A strictly neutral ink-on-paper palette; the only chroma on screen belongs to project imagery and technology marks.

### Primary
- **Graphite Ink** (#262626): display and headline type, primary button fill, active dock label, contact underlines, and the loading wordmark. It is the single voice of emphasis.
- **Transition Ink** (#171614): the page-transition grid fill only. Slightly deeper than Graphite Ink so the wipe reads as a solid plate before the new page appears.

### Neutral
- **Newsprint Gray** (#ededed): the page field behind every view, the loading screen, the modal surface, and the text color on inverted controls.
- **Soft Paper** (#f5f5f5): dock, project cards, image frames, tech bubbles, and small utility buttons; one step lighter than the page so surfaces separate without a border alone.
- **Faded Graphite** (#5f5f5f): secondary copy, metadata, labels, placeholder arrows, and the stronger hairline variant. Never used for primary reading text.
- **Pencil Rule** (#7f7f7f): 1px hairlines on cards, chips, dock, image frames, and dividers.
- **Faded Graphite** also supplies the primary button's hover fill, so even hover stays inside the neutral ramp.

### Named Rules
**The No Chroma Rule.** The interface holds zero hue. Color enters only through project screenshots and technology logos, never through chrome, states, or focus rings.

**The Inversion Rule.** Interactive emphasis inverts ink and paper, or shifts exactly one tonal step. It never tints, glows, or adds a colored accent.

## Typography

**Display Font:** Syne (with system-ui, sans-serif)
**Body Font:** Neuton (with Georgia, serif)
**UI / Label Font:** SpaceGrotesk (with system-ui, sans-serif)
**Loader Accent:** Fraunces (with Georgia, serif), outline wordmark only

**Character:** A wide geometric display face at poster scale, a bookish old-style serif for sentences, and a neutral grotesk for the small print. The pairing reads printed rather than app-like: headlines are set tight and heavy, body copy is set open and calm, labels are small and tracked out.

### Hierarchy
- **Display** (800, `clamp(3rem, 11vw, 9.5rem)`, 0.78, -0.06em): the home name and loading wordmark, set as stacked lines that fill the available width.
- **Headline** (600, `clamp(2.2rem, 6vw, 5.5rem)`, 0.95, -0.03em): view titles such as "Let's Connect!" and the page-transition label.
- **Title** (600, `clamp(1.05rem, 1.8vw, 1.35rem)`, 1.15): project card titles, modal titles, and experience company names (which scale to `clamp(1.3rem, 2.6vw, 1.9rem)`).
- **Body** (400, 1.15rem, 1.45): Neuton for project descriptions, experience responsibilities, feature lists, and the about text (`clamp(0.95rem, 1.35vw, 1.3rem)`, 1.35).
- **Label** (500, 0.72rem, 0.12em, uppercase): indexes, status, metadata labels, and tags; the smallest step is 0.65rem for badges.
- **UI** (400, 1rem, 1.4): Space Grotesk carries dock links, hints, and general interface copy.

### Named Rules
**The Scale Contrast Rule.** Type is either poster (8–11vw) or print (0.65–1.35rem). A mid-size hero between roughly 2.5rem and 8vw is out of system and competes with the wordmark.

**The Tracking Rule.** Display tightens (-0.03 to -0.06em); labels open up (0.04–0.12em). Never reverse the two.

**The One Accent Rule.** Fraunces appears only in the loading screen's outline wordmark. It is not promoted into page typography.

## Layout

The app is a fixed shell: `100dvh`, flex column, header first, a single scrolling `.app-body`, then a fixed dock bottom-center and a fixed site mark bottom-left. The document body does not scroll. Every view pads with `var(--pad)` (`clamp(1rem, 3vw, 2.5rem)`) plus `env(safe-area-inset-*)` on fixed edges.

- **Home:** two-column grid (`0.8fr / 1.2fr`), intro right-aligned at 38ch in the upper right, name across the bottom in two lines (second line right-aligned). A 1px rule sits above the name stage.
- **Projects:** full-bleed horizontal track with a 4rem mask fade at both edges. The track is pinned and driven by Lenis/ScrollTrigger; the centered card sits at scale 1 and opacity 1 while neighbors fall to 0.84 / 0.6. Card width is `min(92vw, 48rem, 80dvh)`.
- **Experience:** full-width ruled rows, number + company + period on one baseline, three metadata columns, then a numbered Neuton list.
- **Tech:** a free stage of circular tiles laid out on a computed grid, draggable and collidable.
- **Contact:** vertically centered left-aligned stack of display-scale links with 2px underlines.

**Responsive behavior:** at ≤860px the home collapses to one column (name at the bottom), and the project modal becomes one column with a 16/9 main image. At ≤640px the dock becomes a 2.75rem burger that opens a three-column menu, project arrow buttons appear, and the gallery card narrows to `min(84vw, 45rem, 74dvh)`. At ≤520px the home name steps down one size. Safe-area insets are applied at every fixed edge.

### Named Rules
**The One Screen Rule.** The page itself never scrolls. The shell stays fixed and only the view's body scrolls; chrome never scrolls away.

**The Safe-Area Rule.** Every fixed or full-bleed edge accounts for `env(safe-area-inset-*)`. Full-bleed is never edge-to-edge on a notched device.

## Elevation & Depth

Flat by design. There is no `box-shadow` anywhere in the system, at rest or on hover. Depth is conveyed by a single tonal step (Newsprint Gray → Soft Paper), 1px pencil hairlines, ink/paper inversion, scale and opacity in the horizontal gallery, and a flat `rgba(0, 0, 0, 0.55)` scrim behind the project modal. The page transition is a full-screen ink plate, not a shadowed layer.

### Named Rules
**The Flat-By-Default Rule.** No shadows, glows, or blur. If two things need separation, use a hairline or one tonal step; if one needs emphasis, invert it or scale it.

**The Motion-Is-Depth Rule.** Tactility comes from movement (wipe, FLIP, proximity scale, inertia), never from lighting effects.

## Shapes

Every rectangle uses the same 4px radius (`0.25rem`): buttons, chips, dock, cards, image frames, modal, close button, site mark. The only circles are the tech bubbles and the tiny burger dots (50% / 1px radius). Borders are 1px Pencil Rule, with 2px Graphite Ink reserved for contact-link underlines and 1px for the active dock underline. Images clip to the 4px radius with `overflow: hidden`. The silhouette is printed and square-shouldered: no pills, no 12–24px soft radii, no asymmetric corners.

### Named Rules
**The One Radius Rule.** Rectangles get 4px. Circles get 50%. No other corner value is introduced.

## Components

### Buttons
- **Shape:** 4px radius, 1px Graphite Ink border, inline-flex with a 0.45rem gap for the arrow glyph.
- **Primary:** Graphite Ink fill with Newsprint Gray text, 0.6rem × 1.1rem padding, 0.85rem Space Grotesk at 600. Hover shifts the fill to Faded Graphite; no shadow, no lift.
- **Ghost:** transparent fill, Graphite Ink text and border. Hover inverts to ink fill with paper text.
- **Focus:** global 2px Graphite Ink outline with 3px offset; never a colored ring.

### Chips
- **Style:** 1px Pencil Rule border, 4px radius, 0.2rem × 0.7rem padding, 0.72rem label at 0.06em tracking; status badges use 0.65rem and uppercase ink text.
- **State:** tags are static; status badges stay outlined and uppercase. No filled or colored chips exist.

### Cards / Containers
- **Corner Style:** 4px radius on the card and on the image frame inside it.
- **Background:** Soft Paper card on Newsprint Gray page; the image frame falls back to Newsprint Gray.
- **Border:** 1px Pencil Rule; hover and focus-visible shift the card border to Graphite Ink.
- **Internal Padding:** `clamp(0.6rem, 1.2vw, 0.85rem)` with a `clamp(0.65rem, 1.2vw, 0.9rem)` internal gap.
- **Motion:** the arrow translates 2px on hover; the image scales 1.04 inside its frame. No card lift or shadow.

### Inputs / Fields
None implemented. There are no form fields in the product; the only input-like affordance is the copy-to-clipboard email button.

### Navigation
- **Dock:** fixed bottom-center, Soft Paper fill, 1px Pencil Rule border, 4px radius, 0.25rem padding. Links are 0.72rem Space Grotesk at 0.04em tracking, minimum 44px tall, Faded Graphite at rest.
- **Active:** Graphite Ink at 600 with a 1px underline inset 0.85rem from each side.
- **Hover / Focus:** full ink fill with paper text; the active underline flips to paper.
- **Mobile (≤640px):** the dock becomes a 2.75rem square burger with three 15px × 1.5px ink lines, animating to an X with `cubic-bezier(0.16, 1, 0.3, 1)`. The menu opens as a three-column Soft Paper panel above it.
- **Site mark:** fixed bottom-left 2.75rem square, 1px Faded Graphite border, 4px radius, "ZF" in Syne 0.8rem/700 at -0.04em; hover inverts to ink fill.

### Signature Components
- **Entry loader:** stacked Syne solid wordmark plus Fraunces outline wordmark at `clamp(3rem, 11vw, 9.5rem)`, letters staggered 0.045s, a 1px rule whose ink fill scales over 1s, then the whole screen lifts -100% over 1.1s. Total hold is 4.5s.
- **Page transition:** a canvas grid of ~72px cells filled in randomized order with Transition Ink, 0.55s `power2.inOut` in and out, with the target page name in Syne `clamp(2.4rem, 8vw, 7rem)` held between.
- **Horizontal project gallery:** pinned track, Lenis smooth scroll, proximity-driven scale and opacity written with transforms only. The card opens a FLIP modal that expands from the clicked card's rect (0.52s `power3.out`) and collapses back (0.42s `power3.inOut`).
- **Tech bubbles:** circular Soft Paper tiles with 1px Pencil Rule borders, draggable with inertia (edge resistance 0.85, throw resistance 1600, max duration 1.2s) and pairwise collision resolution.
- **Contact links:** display-scale Syne links with a 2px ink underline; hover fades text and underline to Faded Graphite. The email control copies to clipboard and swaps the copy icon for a check with a "Copied" label for 500ms.

## Do's and Don'ts

### Do:
- **Do** keep the interface achromatic; let screenshots and logos be the only color.
- **Do** separate surfaces with 1px hairlines or the Newsprint Gray → Soft Paper step.
- **Do** use the 4px radius on every rectangle and reserve 50% for circles.
- **Do** set display type at poster scale (8–11vw) and reading type at 0.95–1.3rem.
- **Do** use Syne for names and titles, Neuton for sentences, Space Grotesk for labels and UI.
- **Do** uppercase micro-labels with 0.04–0.12em tracking.
- **Do** invert ink and paper for hover emphasis.
- **Do** keep the shell fixed and scroll inside the view.
- **Do** keep interactive targets at least 44px tall and focus outlines visible.
- **Do** respect `prefers-reduced-motion` by removing wipes, gallery scaling, FLIP, and inertia while keeping all content reachable.
- **Do** pad fixed edges with `env(safe-area-inset-*)`.

### Don't:
- **Don't** add shadows, glows, gradients, or glass. The only gradient is the 22% black photo scrim.
- **Don't** add an accent color, tinted state, or colored focus ring.
- **Don't** use pill or large soft radii, or rounded SaaS-style cards.
- **Don't** introduce a mid-size display headline between roughly 2.5rem and 8vw.
- **Don't** promote Fraunces beyond the loading outline wordmark.
- **Don't** animate filter, blur, or drop-shadow per frame; animate transform and opacity only.
- **Don't** make the document body scroll or let the chrome scroll away.
- **Don't** use decorative iconography; the vocabulary is line arrows, check, copy, and close.
- **Don't** drop body text below 0.95rem or labels below 0.65rem.
