const navbar = document.getElementById('navbar');

// Hero fades out → reveals Section 1
gsap.to('#hero', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: 'top top',
    end: '33% top',
    scrub: true,
  }
});

// Section 1 fades out → reveals Section 2
gsap.to('#section-1', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero-sequence',
    start: '33% top',
    end: '66% top',
    scrub: true,
  }
});

// Navbar collapses as soon as scrolling begins
ScrollTrigger.create({
  trigger: '#hero-sequence',
  start: 'top top',
  onEnter: () => navbar.classList.add('is-collapsed'),
  onLeaveBack: () => {
    gsap.to(navbar, {
      duration: 0.4,
      ease: 'power2.out',
      onStart: () => navbar.classList.remove('is-collapsed'),
    });
  },
});