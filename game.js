const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  backgroundColor: '#d8d2c6',
  parent: 'gameCanvas',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 500 }, debug: false }
  },
  scene: [GameScene, RestaurantScene]
};

const game = new Phaser.Game(config);

// Game Scene (Running Path)
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('ground', 'ground.png');  // Placeholder for ground image
    this.load.image('chef', 'chef.png');      // Placeholder for chef image
  }

  create() {
    // Background setup
    this.backgroundX = 0;
    this.ground = this.add.tileSprite(400, 350, 800, 50, 'ground'); // Ground at bottom

    // Character setup
    this.chef = this.physics.add.sprite(50, 300, 'chef').setScale(0.5);
    this.chef.setCollideWorldBounds(true); // Keeps chef in bounds

    // Button to switch to Restaurant Scene
    const button = this.add.text(650, 10, 'Go to Restaurant', { font: '16px Arial', fill: '#ffbd06' });
    button.setInteractive();
    button.on('pointerdown', () => {
      this.scene.start('RestaurantScene');
    });

    // Jump mechanic
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.chef.body.touching.down) {
        this.chef.setVelocityY(-300); // Jump power
      }
    });
  }

  update() {
    // Scroll background
    this.ground.tilePositionX += 2; // Adjust speed as needed
  }
}

// Restaurant Scene
class RestaurantScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RestaurantScene' });
  }

  create() {
    // Restaurant background
    this.add.rectangle(400, 200, 800, 400, 0xd8d2c6);

    // Restaurant title and stats
    this.add.text(300, 50, 'Your Restaurant', { font: '32px Arial', fill: '#3b3a3a' });
    this.add.text(50, 100, 'Money: $1000', { font: '20px Arial', fill: '#3b3a3a' });
    this.add.text(50, 130, 'Customers Served: 50', { font: '20px Arial', fill: '#3b3a3a' });

    // Button to return to Game Scene
    const button = this.add.text(650, 10, 'Back to Game', { font: '16px Arial', fill: '#ffbd06' });
    button.setInteractive();
    button.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
