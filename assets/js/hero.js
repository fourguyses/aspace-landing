const navbar = document.getElementById('navbar');

// Only text starts hidden
gsap.set('#section-1 .hero-panel__content', { opacity: 0 });
gsap.set('#section-2 .hero-panel__content', { opacity: 0 });

// ── Hero → Section-1 (0–33%) ─────────────────────────

// 1. Hero text exits
gsap.to('#hero .hero-panel__content', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: 'top top',
    end: '10% top',
    scrub: true,
  }
});

// 2. Satellite flies right → left during image crossfade
gsap.fromTo('#satellite',
  { x: 0, opacity: 0.5 },
  {
    x: () => -(window.innerWidth * 3.5), // enough for 200% wide image
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero-sequence',
      start: '10% top',
      end: '28% top',
      scrub: true,
    }
  }
);

// Satellite fades out — must complete before section-1 text appears at 30%
gsap.to('#satellite', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '22% top',
    end: '28% top',
    scrub: true,
  }
});

// 3. Hero image fades out — Section-1 reveals beneath
gsap.to('#hero', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '10% top',
    end: '30% top',
    scrub: true,
  }
});

// 4. Section-1 text fades in AFTER image transition completes
gsap.to('#section-1 .hero-panel__content', {
  opacity: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '30% top',
    end: '38% top',
    scrub: true,
  }
});

// 5. Section-1 text exits
gsap.to('#section-1 .hero-panel__content', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '44% top',
    end: '52% top',
    scrub: true,
  }
});

// 6. Section-1 image fades out — starts WITH text exit, not after
gsap.to('#section-1', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '44% top', // ← was 52%, now matches text exit start
    end: '62% top',
    scrub: true,
  }
});

// 7. Section-2 text fades in AFTER image transition completes
gsap.to('#section-2 .hero-panel__content', {
  opacity: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '62% top',
    end: '68% top',
    scrub: true,
  }
});

// 8. Section-2 text stays visible — lingers until 90% before fading
gsap.to('#section-2 .hero-panel__content', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '88% top',
    end: '95% top',
    scrub: true,
  }
});

// ── Navbar ────────────────────────────────────────────
ScrollTrigger.create({
  trigger: '#hero-sequence',
  start: 'top top',
  onEnter:     () => navbar.classList.add('is-collapsed'),
  onLeaveBack: () => navbar.classList.remove('is-collapsed'),
});

// Neural network canvas — fades in with text exit, out before section-2 text
gsap.to('#nn-canvas', {
  opacity: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '44% top',
    end: '50% top',
    scrub: true,
  }
});