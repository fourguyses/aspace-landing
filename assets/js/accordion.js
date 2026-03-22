const cards   = gsap.utils.toArray('.accordion-card');
const section = document.getElementById('section-process');

function openCard(index) {
  cards.forEach((card, i) => {
    const body = card.querySelector('.accordion-card__body');
    if (i === index) {
      card.classList.add('is-open');
      gsap.to(body, { height: 'auto', duration: 0.5, ease: 'power2.out' });
    } else {
      card.classList.remove('is-open');
      gsap.to(body, { height: 0, duration: 0.4, ease: 'power2.in' });
    }
  });
}

// Open first card on load
openCard(0);

ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: `+=${cards.length * 400}`,
  pin: true,
  scrub: false,
  onUpdate: (self) => {
    const index = Math.min(
      Math.floor(self.progress * cards.length),
      cards.length - 1
    );
    const currentOpen = cards.findIndex(c => c.classList.contains('is-open'));
    if (index !== currentOpen) openCard(index);
  },
  onLeave: () => openCard(cards.length - 1),
});