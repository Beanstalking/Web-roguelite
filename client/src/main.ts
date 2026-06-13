import Phaser from 'phaser';
import { MenuScene } from './scenes/MenueScene';
import { TacticsScene } from './scenes/TacticsScene';
import { GameOver} from './scenes/GameOver';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 940,
  height: 790,
  parent: 'app',
  backgroundColor: '#1d1d1d',
  scene: [MenuScene, TacticsScene, GameOver],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);