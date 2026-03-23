const container = document.getElementById('speedometer');
const valueEl   = document.getElementById('speedo-value');
const TARGET    = 90;

// ─── Build SVG arc ───────────────────────────────────
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '0 0 240 140');

// Arc parameters
const cx = 120, cy = 130, r = 110;
const startAngle = -180, endAngle = 0; // left to right semicircle

function polarToXY(angle, radius) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function describeArc(startAng, endAng) {
  const s = polarToXY(startAng, r);
  const e = polarToXY(endAng, r);
  const large = endAng - startAng > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

// Track (grey background arc)
const track = document.createElementNS('http://www.w3.org/2000/svg', 'path');
track.setAttribute('d', describeArc(startAngle, endAngle));
track.setAttribute('fill', 'none');
track.setAttribute('stroke', 'rgba(255,255,255,0.15)');
track.setAttribute('stroke-width', '8');
track.setAttribute('stroke-linecap', 'round');

// Active arc (white fill)
const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
arc.setAttribute('d', describeArc(startAngle, startAngle)); // starts empty
arc.setAttribute('fill', 'none');
arc.setAttribute('stroke', '#ffffff');
arc.setAttribute('stroke-width', '8');
arc.setAttribute('stroke-linecap', 'round');

svg.appendChild(track);
svg.appendChild(arc);
container.appendChild(svg);

// ─── Animate on scroll ───────────────────────────────
const section = document.getElementById('section-stats');
const obj = { value: 0 };

gsap.to(obj, {
  value: TARGET,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: section,
    start: 'top 70%',
    end: 'centre centre',
    scrub: 1,
  },
  onUpdate: () => {
    const progress = obj.value / 100; // dial goes 0–100 scale
    const currentAngle = startAngle + progress * (endAngle - startAngle);
    arc.setAttribute('d', describeArc(startAngle, currentAngle));
    valueEl.textContent = Math.round(obj.value);
  },
});