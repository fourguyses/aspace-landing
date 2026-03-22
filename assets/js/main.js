gsap.registerPlugin(ScrollTrigger);

// ─── Lenis — driven ONLY by gsap.ticker (not manual RAF) ───
const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 });

// Sync Lenis scroll position → ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker drives Lenis (single loop, no conflict)
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ─── Section modules ────────────────────────────────────────
import './navbar.js';
import './hero.js';