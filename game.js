const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let chef = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 5,
  dy: 0,
  isJumping: false
};

let groundHeight = canvas.height - 50;
let backgroundX = 0;
let backgroundSpeed = 2;

// Jumping Mechanic
function jump() {
  if (!chef.isJumping) {
    chef.dy = -15;
    chef.isJumping = true;
  }
}

function update() {
  // Background Scroll
  backgroundX -= backgroundSpeed;
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  // Gravity and Ground Collision
  chef.dy += 0.8;  // gravity
  chef.y += chef.dy;

  if (chef.y + chef.height >= groundHeight) {
    chef.y = groundHeight - chef.height;
    chef.dy = 0;
    chef.isJumping = false;
  }

  // Draw Everything
  draw();
  requestAnimationFrame(update);
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Background
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(backgroundX, groundHeight, canvas.width * 2, 50);

  // Draw Chef Character
  ctx.fillStyle = "#FF6347";
  ctx.fillRect(chef.x, chef.y, chef.width, chef.height);
}

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

// Start the Game Loop
update();
