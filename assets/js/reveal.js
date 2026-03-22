gsap.to('#section-proof', {
  yPercent: -100,        // moves fully off screen upward
  ease: 'none',
  scrollTrigger: {
    trigger: '#proof-cta-wrapper',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  }
});