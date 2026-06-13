import { Enemy, type EnemyConfig} from '../Enemy';

const SLIME_CONFIG: EnemyConfig = {
  name: 'Slime',
  maxHealth: 30,
  moveRange: 1,
  damage: 8,
  attackRange: 1,
  spriteColor: 0xff4444,
  textureKey: 'slime1',
};

export class Slime extends Enemy {
  constructor(scene: Phaser.Scene, col: number, row: number, tileSize: number, offsetX: number, offsetY: number) 
  
  {
    super(scene, col, row, SLIME_CONFIG, tileSize, offsetX, offsetY);
  }

  /** Simple AI: move one step towards the player */
  takeTurn(playerCol: number, playerRow: number): void {
    // AI logic will go here – we'll connect it later
    console.log(`Slime at (${this.col},${this.row}) takes turn, player at (${playerCol},${playerRow})`);
  }
}

