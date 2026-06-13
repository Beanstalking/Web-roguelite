import { PlayerUnit, type PlayerUnitConfig } from './Player';
import { Knight } from './PlayerUnits/Knight';

import { Enemy, type EnemyConfig } from './Enemy';
import { Slime } from './EnemyUnits/Slime';


export function createPlayerUnit(
  type: string,
  scene: Phaser.Scene,
  col: number,
  row: number,
  tileSize: number,
  offsetX: number,
  offsetY: number
): PlayerUnit | null {
  switch (type) {
    case 'Knight': return new Knight(scene, col, row, tileSize, offsetX, offsetY);
  
    default: return null;
  }
}

export function createEnemyUnit(
  type: string,
  scene: Phaser.Scene,
  col: number,
  row: number,
  tileSize: number,
  offsetX: number,
  offsetY: number
): Enemy | null {
  switch (type) {
    case 'Slime': return new Slime(scene, col, row, tileSize, offsetX, offsetY);
  
    default: return null;
  }
}