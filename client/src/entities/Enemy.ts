import Phaser from 'phaser';

export interface EnemyConfig {
    name: string;
    maxHealth: number;
    moveRange: number;
    damage: number;
    attackRange: number; 
    spriteColor: number;
    textureKey: string;
}

export class Enemy {
    public col: number;
    public row: number;
    public health: number;
    public config: EnemyConfig;
    public sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle;;
    protected scene: Phaser.Scene;
    protected tileSize: number;
    protected offsetX: number;
    protected offsetY: number;

    constructor(
        scene: Phaser.Scene,
        col: number,
        row: number,
        config: EnemyConfig,
        tileSize: number,
        offsetX: number,
        offsetY: number
    ) {
        this.scene = scene;
        this.col = col;
        this.row = row;
        this.config = config;
        this.health = config.maxHealth;
        this.tileSize = tileSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        const pos = this.gridToPixel(col, row);

        if (this.scene.textures.exists(config.textureKey)) {
         
            this.sprite = this.scene.add.sprite(pos.x, pos.y, config.textureKey, 0);
  
            this.sprite.setDisplaySize(this.tileSize - 8, this.tileSize - 8);
        } else {

            this.sprite = this.scene.add.rectangle(
                pos.x, pos.y,
                this.tileSize - 8, this.tileSize - 8,
                config.spriteColor
            );
        }
    }

    protected gridToPixel(col: number, row: number) {
        return {
        x: this.offsetX + col * this.tileSize + this.tileSize / 2,
        y: this.offsetY + row * this.tileSize + this.tileSize / 2,
        };
    }

    moveTo(col: number, row: number): Promise<void> {
        return new Promise((resolve) => {
        const target = this.gridToPixel(col, row);
        this.scene.tweens.add({
            targets: this.sprite,
            x: target.x,
            y: target.y,
            duration: 150,
            onComplete: () => {
            this.col = col;
            this.row = row;
            resolve();
            },
        });
        });
    }

    takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);

        // Flash red
        if ('setTint' in this.sprite) {
            this.sprite.setTint(0xff0000);
        } else {
            (this.sprite as Phaser.GameObjects.Rectangle).setFillStyle(0xff0000);
        }

        this.scene.time.delayedCall(100, () => {
            if (this.sprite.active) {
                if ('clearTint' in this.sprite) {
                    this.sprite.clearTint();
                } else {
                    (this.sprite as Phaser.GameObjects.Rectangle).setFillStyle(this.config.spriteColor);
                }
            }
        });
    }

    isAdjacentTo(other: Enemy): boolean {
        return Math.abs(this.col - other.col) <= 1 && Math.abs(this.row - other.row) <= 1;
    }

    takeTurn(playerCol: number, playerRow: number): void {
        console.log(`Enemy at (${this.col},${this.row}) takes turn, player at (${playerCol},${playerRow})`);
    }

    destroy() {
        this.sprite.destroy();
    }
}
