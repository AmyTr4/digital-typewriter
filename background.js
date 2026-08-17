//background sparkles
const BG_SPARKLE_COUNT = 90;
const bgSparkleContainer = document.querySelector('.bg-sparkles');

for (let i = 0; i < BG_SPARKLE_COUNT; i++) {
  const sparkle = document.createElement('span');
  sparkle.className = 'bg-sparkle';
  const size = 2 + Math.floor(Math.random() * 3);
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.setProperty('--dur', `${2 + Math.random() * 3}s`);
  sparkle.style.setProperty('--delay', `${Math.random() * 4}s`);
  bgSparkleContainer.appendChild(sparkle);
}

// drifting decor images
const CHARM_IMAGES = [
  { src: 'assets/background-decors/big1.png', size: 45 },
  { src: 'assets/background-decors/big1.png', size: 65 },
  { src: 'assets/background-decors/big1.png', size: 55 },
  { src: 'assets/background-decors/big2.png', size: 40 },
  { src: 'assets/background-decors/big2.png', size: 60 },
  { src: 'assets/background-decors/big2.png', size: 70 },
  { src: 'assets/background-decors/big3.png', size: 50 },
  { src: 'assets/background-decors/big4.png', size: 35 },
  { src: 'assets/background-decors/big4.png', size: 58 },
  { src: 'assets/background-decors/big4.png', size: 66 },
  { src: 'assets/background-decors/big5.png', size: 42 },
  { src: 'assets/background-decors/Layer 5.png', size: 22, wander: true },
  { src: 'assets/background-decors/Layer 5.png', size: 18, wander: true },
  { src: 'assets/background-decors/Layer 6.png', size: 24, wander: true },
  { src: 'assets/background-decors/Layer 6.png', size: 20, wander: true },
  { src: 'assets/background-decors/Layer 7.png', size: 20, wander: true },
  { src: 'assets/background-decors/Layer 7.png', size: 26, wander: true },
  { src: 'assets/background-decors/Layer 9.png', size: 22, wander: true },
  { src: 'assets/background-decors/Layer 9.png', size: 17, wander: true },
  { src: 'assets/background-decors/Layer 10.png', size: 18, wander: true },
  { src: 'assets/background-decors/Layer 10.png', size: 24, wander: true },
  { src: 'assets/background-decors/Layer 12.png', size: 20, wander: true },
  { src: 'assets/background-decors/Layer 12.png', size: 26, wander: true },
  { src: 'assets/background-decors/Layer 13.png', size: 22, wander: true },
  { src: 'assets/background-decors/Layer 13.png', size: 18, wander: true },
  { src: 'assets/background-decors/Layer 14.png', size: 16, wander: true },
  { src: 'assets/background-decors/Layer 14.png', size: 22, wander: true },
  { src: 'assets/background-decors/Layer 15.png', size: 16, wander: true },
  { src: 'assets/background-decors/Layer 15.png', size: 20, wander: true },
  { src: 'assets/background-decors/Layer 16.png', size: 24, wander: true },
  { src: 'assets/background-decors/Layer 16.png', size: 18, wander: true },
  { src: 'assets/background-decors/Layer 17.png', size: 20, wander: true },
  { src: 'assets/background-decors/Layer 17.png', size: 25, wander: true },
  { src: 'assets/background-decors/Layer 18.png', size: 26, wander: true },
  { src: 'assets/background-decors/Layer 18.png', size: 18, wander: true },
];

const KICK_SPEED = 45;
const BOUNCE_DURATION = 0.35;
const BOUNCE_AMPLITUDE = 0.22;
const MAX_FRAME_DT = 0.05;

const viewportWidth = () => window.innerWidth;
const viewportHeight = () => window.innerHeight;

const decorContainer = document.querySelector('.bg-charms');
const decors = [];
 
CHARM_IMAGES.forEach((config)=> {
    const el = document.createElement('img');
    el.src = config.src;
    el.alt = '';
    el.className = 'bg-charm';
    el.draggable = false;
    el.style.width = `${config.size}px`;
    el.style.height = `${config.size}px`;
    decorContainer.appendChild(el);

    const speed = 12 + Math.random() * 14;
    const angle = Math.random() * Math.PI * 2;
    const decor = {
        el,
        x: Math.random() * Math.max(0, viewportWidth() - config.size),
        y: Math.random() * Math.max(0, viewportHeight() - config.size),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: config.size / 2,
        size: config.size,
        wander: !!config.wander,
        bounceTime: 0,
    };
    decors.push(decor);

    el.addEventListener('click', (e) => {
        const cx = decor.x + decor.r;
        const cy = decor.y + decor.r;
        let dx = cx - e.clientX;
        let dy = cy - e.clientY;
        let len = Math.hypot(dx, dy);
        if (len < 0.001) {
        const a = Math.random() * Math.PI * 2;
        dx = Math.cos(a);
        dy = Math.sin(a);
        len = 1;
        }
        decor.vx = (dx / len) * KICK_SPEED;
        decor.vy = (dy / len) * KICK_SPEED;
        decor.bounceTime = BOUNCE_DURATION;
    });
});

function stepMotion(decor, dt, w, h) {
  decor.x += decor.vx * dt;
  decor.y += decor.vy * dt;

  if (decor.wander) {
    if (decor.x > w) decor.x = -decor.size;
    else if (decor.x + decor.size < 0) decor.x = w;
    if (decor.y > h) decor.y = -decor.size;
    else if (decor.y + decor.size < 0) decor.y = h;
    return;
  }

  if (decor.x < 0) { decor.x = 0; decor.vx = -decor.vx; }
  else if (decor.x + decor.size > w) { decor.x = w - decor.size; decor.vx = -decor.vx; }
  if (decor.y < 0) { decor.y = 0; decor.vy = -decor.vy; }
  else if (decor.y + decor.size > h) { decor.y = h - decor.size; decor.vy = -decor.vy; }
}

function resolveCollision(a, b) {
  const dx = (b.x + b.r) - (a.x + a.r);
  const dy = (b.y + b.r) - (a.y + a.r);
  const minD = a.r + b.r;
  const distSq = dx * dx + dy * dy;
  if (distSq >= minD * minD || distSq <= 0.0001) return;

  const dist = Math.sqrt(distSq);
  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = (minD - dist) / 2;
  a.x -= nx * overlap; a.y -= ny * overlap;
  b.x += nx * overlap; b.y += ny * overlap;

  const dot = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (dot < 0) {
    a.vx += dot * nx; a.vy += dot * ny;
    b.vx -= dot * nx; b.vy -= dot * ny;
  }
}

function renderDecor(decor, dt) {
  let scale = 1;
  if (decor.bounceTime > 0) {
    decor.bounceTime = Math.max(0, decor.bounceTime - dt);
    const t = 1 - decor.bounceTime / BOUNCE_DURATION;
    scale = 1 + BOUNCE_AMPLITUDE * Math.sin(t * Math.PI);
  }
  decor.el.style.transform = `translate(${decor.x}px, ${decor.y}px) scale(${scale})`;
}

let decorLastTime = performance.now();
function tickDecors(now) {
  const dt = Math.min(MAX_FRAME_DT, (now - decorLastTime) / 1000);
  decorLastTime = now;
  const w = viewportWidth();
  const h = viewportHeight();

  for (const decor of decors) stepMotion(decor, dt, w, h);

  for (let i = 0; i < decors.length; i++) {
    const a = decors[i];
    if (!a.wander) {
      for (let j = i + 1; j < decors.length; j++) {
        const b = decors[j];
        if (!b.wander) resolveCollision(a, b);
      }
    }
    renderDecor(a, dt);
  }

  requestAnimationFrame(tickDecors);
}

requestAnimationFrame((t) => {
  decorLastTime = t;
  tickDecors(t);
});
