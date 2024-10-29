const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentScene = "game"; // Toggle between 'game' and 'restaurant'
let chef = { x: 50, y: 300, width: 50, height: 50, vy: 0, onGround: false };
let groundX = 0;
let stats = { money: 1000, customers: 50 };

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (currentScene === "game") {
    drawGameScene();
  } else if (currentScene === "restaurant") {
    drawRestaurantScene();
  }
  requestAnimationFrame(gameLoop);
}

// Game scene (running path)
function drawGameScene() {
  // Draw ground
  ctx.fillStyle = "#3b3a3a";
  ctx.fillRect(groundX, canvas.height - 50, canvas.width * 2, 50);
  groundX -= 2;
  if (groundX <= -canvas.width) groundX = 0;

  // Draw chef
  ctx.fillStyle = "#ffbd06";
  ctx.fillRect(chef.x, chef.y, chef.width, chef.height);

  // Apply gravity and jump physics
  chef.vy += 1;
  chef.y += chef.vy;
  if (chef.y + chef.height >= canvas.height - 50) {
    chef.y = canvas.height - 50 - chef.height;
    chef.vy = 0;
    chef.onGround = true;
  }

  // Display 'Go to Restaurant' button
  document.getElementById("toggleScene").innerText = "Go to Restaurant";
}

// Restaurant scene (idle management)
function drawRestaurantScene() {
  // Restaurant background
  ctx.fillStyle = "#d8d2c6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Restaurant title and stats
  ctx.fillStyle = "#3b3a3a";
  ctx.font = "32px Arial";
  ctx.fillText("Your Restaurant", 300, 50);
  ctx.font = "20px Arial";
  ctx.fillText(`Money: $${stats.money}`, 50, 100);
  ctx.fillText(`Customers Served: ${stats.customers}`, 50, 130);

  // Display 'Back to Game' button
  document.getElementById("toggleScene").innerText = "Back to Game";
}

// Toggle between game and restaurant scenes
function toggleScene() {
  currentScene = currentScene === "game" ? "restaurant" : "game";
}

// Jump action
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && chef.onGround) {
    chef.vy = -15; // Jump power
    chef.onGround = false;
  }
});

// Start game loop
gameLoop();
