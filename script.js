const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const fireworks = [];

// Helper function for random numbers
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Create stars
function createStars() {
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      radius: random(1, 3),
      color: `rgba(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)}, 0.8)`,
      twinkleSpeed: random(0.02, 0.05),
    });
  }
}

// Draw stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  });
}

// Update stars
function updateStars() {
  stars.forEach((star) => {
    star.radius += star.twinkleSpeed;
    if (star.radius > 3 || star.radius < 1) {
      star.twinkleSpeed *= -1;
    }
  });
}

// Firework Particle
class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = random(2, 4);
    this.color = color;
    this.dx = random(-3, 3);
    this.dy = random(-3, 3);
    this.life = 100;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.radius -= 0.03;
    this.life -= 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create fireworks
function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height - 300);
  const color = `rgba(${random(100, 255)}, ${random(100, 255)}, ${random(100, 255)}, 1)`;
  for (let i = 0; i < 50; i++) {
    fireworks.push(new FireworkParticle(x, y, color));
  }
}

// Update fireworks
function updateFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const firework = fireworks[i];
    firework.update();
    if (firework.life <= 0 || firework.radius <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

// Draw fireworks
function drawFireworks() {
  fireworks.forEach((firework) => firework.draw());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawFireworks();
  updateStars();
  updateFireworks();

  if (Math.random() < 0.03) {
    createFirework();
  }

  requestAnimationFrame(animate);
}

// Initialize
createStars();
animate();
