const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Chef Properties
let chef = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 5,
  dy: 0,
  isJumping: false
};

// Game State
let gameScreenVisible = true; // Variable to track if game screen is visible
let groundHeight = canvas.height - 50;
let backgroundX = 0;
let backgroundSpeed = 2;

// Button Properties
const button = { x: canvas.width / 2 - 50, y: canvas.height - 100, width: 100, height: 50 };

// Jumping Mechanic
function jump() {
  if (!chef.isJumping) {
    chef.dy = -15;
    chef.isJumping = true;
  }
}

// Update Game State
function update() {
  if (gameScreenVisible) {
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
  }

  // Draw Everything
  draw();
  requestAnimationFrame(update);
}

// Draw Game Screen
function drawGameScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Background
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(backgroundX, groundHeight, canvas.width * 2, 50);

  // Draw Chef Character
  ctx.fillStyle = "#FF6347";
  ctx.fillRect(chef.x, chef.y, chef.width, chef.height);

  // Draw "Go to Restaurant" Button
  ctx.fillStyle = '#ffbd06'; // Button color
  ctx.fillRect(button.x, button.y, button.width, button.height);
  
  ctx.fillStyle = '#3b3a3a'; // Text color
  ctx.font = '16px Arial';
  ctx.fillText('Go to Restaurant', button.x + 10, button.y + 30);
}

// Draw Restaurant Screen
function drawRestaurantScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Restaurant Background
  ctx.fillStyle = '#d8d2c6'; // Restaurant background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Restaurant Title
  ctx.fillStyle = '#3b3a3a'; // Text color
  ctx.font = '32px Arial';
  ctx.fillText('Your Restaurant', canvas.width / 2 - 100, 50);

  // Display Restaurant Stats (like money, customers, etc.)
  ctx.font = '20px Arial';
  ctx.fillText('Money: $1000', 50, 100);
  ctx.fillText('Customers Served: 50', 50, 130);

  // Draw "Back to Game" Button
  ctx.fillStyle = '#ffbd06'; // Button color
  ctx.fillRect(button.x, button.y, button.width, button.height);
  
  ctx.fillStyle = '#3b3a3a'; // Text color
  ctx.fillText('Back to Game', button.x + 10, button.y + 30);
}

// Draw Function
function draw() {
  if (gameScreenVisible) {
    drawGameScreen();
  } else {
    drawRestaurantScreen();
  }
}

// Event listener for button click
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  if (gameScreenVisible && 
      mouseX > button.x && mouseX < button.x + button.width && 
      mouseY > button.y && mouseY < button.y + button.height) {
    gameScreenVisible = false; // Hide game screen
    drawRestaurantScreen(); // Show restaurant screen
  } else if (!gameScreenVisible && 
             mouseX > button.x && mouseX < button.x + button.width && 
             mouseY > button.y && mouseY < button.y + button.height) {
    gameScreenVisible = true; // Show game screen
  }
});

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

// Start the Game Loop
update();
