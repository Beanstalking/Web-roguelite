import Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';

class BootScene extends Phaser.Scene {
  private socket!: Socket;

  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Nothing yet
  }

  create() {
    // Connect to the multiplayer server
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to server with ID:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Temporary text so we know the game is running
    this.add.text(400, 20, 'Connected to server', {
      fontSize: '18px',
      color: '#69cfee',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    // A simple rectangle representing the player (just for now)
    this.add.rectangle(400, 300, 32, 32, 0x69cfee);
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