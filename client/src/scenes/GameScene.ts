import Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';

export class GameScene extends Phaser.Scene {
  private socket!: Socket;
  private player?: Phaser.Physics.Arcade.Sprite;
  private enemies?: Phaser.Physics.Arcade.Group;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Load sprites, images, audio, etc.
    // this.load.image('player', 'assets/sprites/player.png');
    // this.load.image('enemy', 'assets/sprites/enemy.png');
  }

  create() {
    // Initialize socket connection
   

    // Create game objects
    

    // Setup input
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update(time: number, delta: number) {
    // 1. Move the player based on keys.
    // 2. Check if player overlaps the coin → collect it.
    // 3. If collected, update score, move coin to new random spot.
  }


}
