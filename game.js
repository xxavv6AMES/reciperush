// Configuration for Phaser Game
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  backgroundColor: '#d8d2c6',
  parent: 'gameCanvas', // Automatically places the canvas inside this div
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 500 }, debug: false }
  },
  scene: [GameScene, RestaurantScene] // Adds both scenes to Phaser's Scene Manager
};

// Initialize Phaser Game
const game = new Phaser.Game(config);

// Game Scene - Running Path
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Load assets for the game scene
    this.load.image('ground', 'ground.png'); // Placeholder ground image
    this.load.image('chef', 'chef.png');     // Placeholder chef image
  }

  create() {
    // Set up scrolling ground as a tile sprite
    this.ground = this.add.tileSprite(400, 375, 800, 50, 'ground');
    this.ground.setOrigin(0.5, 0.5);

    // Chef character with physics and bound constraints
    this.chef = this.physics.add.sprite(50, 300, 'chef').setScale(0.5);
    this.chef.setCollideWorldBounds(true);

    // Set up jump mechanic
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.chef.body.touching.down) {
        this.chef.setVelocityY(-300); // Jump power
      }
    });

    // Button to switch to the restaurant screen
    this.createButton('Go to Restaurant', 650, 10, () => {
      this.scene.start('RestaurantScene');
    });
  }

  update() {
    // Scroll the ground to create a running path effect
    this.ground.tilePositionX += 2;
  }

  // Helper to create button text elements
  createButton(text, x, y, callback) {
    const button = this.add.text(x, y, text, { font: '16px Arial', fill: '#ffbd06' });
    button.setInteractive();
    button.on('pointerdown', callback);
  }
}

// Restaurant Scene
class RestaurantScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RestaurantScene' });
  }

  create() {
    // Background setup for restaurant
    this.add.rectangle(400, 200, 800, 400, 0xd8d2c6);

    // Display restaurant title and stats
    this.add.text(300, 50, 'Your Restaurant', { font: '32px Arial', fill: '#3b3a3a' });
    this.add.text(50, 100, 'Money: $1000', { font: '20px Arial', fill: '#3b3a3a' });
    this.add.text(50, 130, 'Customers Served: 50', { font: '20px Arial', fill: '#3b3a3a' });

    // Button to return to the game screen
    this.createButton('Back to Game', 650, 10, () => {
      this.scene.start('GameScene');
    });
  }

  // Helper to create button text elements
  createButton(text, x, y, callback) {
    const button = this.add.text(x, y, text, { font: '16px Arial', fill: '#ffbd06' });
    button.setInteractive();
    button.on('pointerdown', callback);
  }
}
