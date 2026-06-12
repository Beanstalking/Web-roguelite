import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Assets will go here later
  }

  create() {
    this.add.text(400, 300, 'Roguelite Web Game', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  backgroundColor: '#1d1d1d',
  scene: [BootScene],
};

new Phaser.Game(config);