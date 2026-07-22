/**
 * gsap-plugins — One-time GSAP plugin registration.
 *
 * Imported by App.jsx before any component mounts so every plugin is
 * globally available. No component needs to re-register.
 *
 * Plugins:
 *   useGSAP           — React hook that auto-cleans GSAP on unmount.
 *   ScrollTrigger     — pin, scrub, and trigger animations on scroll.
 *   ScrollSmoother    — native-like smooth scrolling for the whole page.
 *   Observer          — cross-browser scroll/touch/pointer event abstraction.
 *   SplitText         — splits text into chars/words/lines for animation.
 *   ScrambleTextPlugin — typewriter-style text scramble effect.
 *   TextPlugin        — simple text replacement animation.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, Observer, SplitText, ScrambleTextPlugin, TextPlugin);
