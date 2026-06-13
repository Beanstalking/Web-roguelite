import { PlayerUnit, type PlayerUnitConfig } from '../Player';

const KNIGHT_CONFIG: PlayerUnitConfig = {
  name: 'Knight',
  maxHealth: 50,
  moveRange: 2,
  damage: 10,
  attackRange: 1,
  spriteColor: 0xff4000,
};

export class Knight extends PlayerUnit {
  constructor(scene: Phaser.Scene, col: number, row: number, tileSize: number, offsetX: number, offsetY: number) 
  
  {
    super(scene, col, row, KNIGHT_CONFIG, tileSize, offsetX, offsetY);
  }
}
