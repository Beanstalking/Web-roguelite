import Phaser from 'phaser';

export interface PlayerUnitConfig {
    name: string;
    maxHealth: number;
    moveRange: number;
    damage: number;
    attackRange: number;
    spriteColor: number;
}

export class PlayerUnit {
    public col: number;
    public row: number;
    public health: number;
    public config: PlayerUnitConfig;
    public sprite: Phaser.GameObjects.Rectangle;
    public hasActedThisTurn = false;
    protected scene: Phaser.Scene;
    protected tileSize: number;
    protected offsetX: number;
    protected offsetY: number;

    constructor(
        scene: Phaser.Scene,
        col: number,
        row: number,
        config: PlayerUnitConfig,
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

        const { x, y } = this.gridToPixel(col, row);
        this.sprite = scene.add.rectangle(
        x, y, tileSize - 8, tileSize - 8, config.spriteColor
        );
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
            }
        });
        });
    }

    takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);
        const original = this.config.spriteColor;
        this.sprite.setFillStyle(0xff0000);
        this.scene.time.delayedCall(100, () => {
        if (this.sprite.active) this.sprite.setFillStyle(original);
        });
    }

    isAdjacentTo(other: PlayerUnit | any): boolean {
        return Math.abs(this.col - other.col) <= 1 && Math.abs(this.row - other.row) <= 1;
    }

    destroy() {
        this.sprite.destroy();
    }
}