import Phaser from 'phaser';
import { createPlayerUnit, createEnemyUnit } from '../entities/UnitRegistry';
import type { PlayerUnit } from '../entities/Player'; 
import type { Enemy } from '../entities/Enemy';


type TurnState = 'player_turn' | 'enemy_turn' | 'game_over';

export class TacticsScene extends Phaser.Scene {

    private readonly CANVAS_W = 940;
    private readonly CANVAS_H = 790;

    // Panel sizes
    private readonly LEFT_PANEL_W = 150;
    private readonly RIGHT_PANEL_W = 150;
    private readonly BOTTOM_PANEL_H = 150;

    // Grid area (calculated)
    private readonly GRID_AREA_X = this.LEFT_PANEL_W;
    private readonly GRID_AREA_Y = 0;
    private readonly GRID_AREA_W = this.CANVAS_W - this.LEFT_PANEL_W - this.RIGHT_PANEL_W;
    private readonly GRID_AREA_H = this.CANVAS_H - this.BOTTOM_PANEL_H;

    // Grid
    private readonly TILE_SIZE = 64;
    private readonly GRID_COLS = Math.floor(this.GRID_AREA_W / this.TILE_SIZE);
    private readonly GRID_ROWS = Math.floor(this.GRID_AREA_H / this.TILE_SIZE);

    // Offsets to centre the grid inside the grid area
    private readonly GRID_OFFSET_X = this.GRID_AREA_X + (this.GRID_AREA_W - this.GRID_COLS * this.TILE_SIZE) / 2;
    private readonly GRID_OFFSET_Y = this.GRID_AREA_Y + (this.GRID_AREA_H - this.GRID_ROWS * this.TILE_SIZE) / 2;

    // Units
    private playerUnits: PlayerUnit[] = [];
    private enemyUnits: Enemy[] = [];
    private statusTexts: Phaser.GameObjects.Text[] = [];
    private selectedPlayerIndex = 0;
    private selectedEnemyIndex: number = -1;
    private enemyStatusTexts: Phaser.GameObjects.Text[] = [];
  

    // State machine
    private turnState: TurnState = 'player_turn';
    private planningStep: 'select' | 'action' | 'moving' = 'select';

    constructor() {
        super({ key: 'TacticsScene' });
    }

    preload() {
        this.load.spritesheet('slime1', '/sprites/Slime1_Idle_body.png', {
            frameWidth: 64,
            frameHeight: 64
        });

    }

    create() {

        this.add.rectangle(
            this.LEFT_PANEL_W / 2,
            this.GRID_AREA_H / 2,
            this.LEFT_PANEL_W,
            this.GRID_AREA_H,
            0xC0C0C0
        );

        this.add.rectangle(
            this.CANVAS_W - this.RIGHT_PANEL_W / 2,
            this.GRID_AREA_H / 2,
            this.RIGHT_PANEL_W,
            this.GRID_AREA_H,
            0xC0C0C0
        );

        this.add.rectangle(
            this.CANVAS_W / 2,
            this.CANVAS_H - this.BOTTOM_PANEL_H / 2,
            this.CANVAS_W,
            this.BOTTOM_PANEL_H,
            0xC0C0C0
        );


        this.drawGrid();
        const knight = createPlayerUnit('Knight', this, 5, 1, this.TILE_SIZE, this.GRID_OFFSET_X, this.GRID_OFFSET_Y);
            if (knight) this.playerUnits.push(knight);

        const slime = createEnemyUnit('Slime', this, 4, 8, this.TILE_SIZE, this.GRID_OFFSET_X, this.GRID_OFFSET_Y);
            if (slime) this.enemyUnits.push(slime);


    }

    private gridToPixel(col: number, row: number) {
        return {
            x: this.GRID_OFFSET_X + col * this.TILE_SIZE + this.TILE_SIZE / 2,
            y: this.GRID_OFFSET_Y + row * this.TILE_SIZE + this.TILE_SIZE / 2,
        };
    }

    private drawGrid() {
        for (let row = 0; row < this.GRID_ROWS; row++) {
            for (let col = 0; col < this.GRID_COLS; col++) {
                const { x, y } = this.gridToPixel(col, row);
                const color = (row + col) % 2 === 0 ? 0x3a3a3a : 0x4a4a4a;
                this.add.rectangle(x, y, this.TILE_SIZE, this.TILE_SIZE, color);
            }
        }
    }

    update() {
        switch (this.turnState) {
            case 'player_turn':
                this.handlePlayerTurn(); 
                break;
            case 'enemy_turn':
                this.handleEnemyTurn();
                break;      
            case 'game_over':
                // Show game over screen or restart option
                break;
        }

    }

    private handlePlayerTurn() {
        if (this.playerUnits.length === 0) 
            return;

        if (this.playerUnits.every(unit => unit.hasActedThisTurn)) {
            this.playerUnits.forEach(unit => unit.hasActedThisTurn = false); 
            this.planningStep = 'select';
            this.turnState = 'enemy_turn';
            return;
        }

        switch (this.planningStep) {
            case 'select':
                this.handleUnitSelection();
                break;
            case 'action':
                this.handleUnitAction();
                break;
            case 'moving':
                // Handle movement animation and logic
                break;  

        }

    }

    private handleUnitSelection() {


        if (!this.input.activePointer.isDown ) return;
        const pointer = this.input.activePointer;
        const col = Math.floor((pointer.x - this.GRID_OFFSET_X) / this.TILE_SIZE);
        const row = Math.floor((pointer.y - this.GRID_OFFSET_Y) / this.TILE_SIZE);
        if (col < 0 || col >= this.GRID_COLS || row < 0 || row >= this.GRID_ROWS) return;

        const Unit = this.playerUnits.find(unit => unit.col === col && unit.row === row && !unit.hasActedThisTurn);

        if (Unit) {
            this.selectedPlayerIndex = this.playerUnits.indexOf(Unit);
            this.planningStep = 'action';
            this.highlightUnit(Unit);
            this.updateStatusPanel(); ;  
        }

        
    }

    private handleUnitAction() {
        if (!this.input.activePointer.isDown) return;
        const pointer = this.input.activePointer;
        const col = Math.floor((pointer.x - this.GRID_OFFSET_X) / this.TILE_SIZE);
        const row = Math.floor((pointer.y - this.GRID_OFFSET_Y) / this.TILE_SIZE);
        if (col < 0 || col >= this.GRID_COLS || row < 0 || row >= this.GRID_ROWS) return;

        const selectedUnit = this.playerUnits[this.selectedPlayerIndex];


    }

    private handlePlayerMovement() {

    }

 

    private handleEnemyTurn() {
    
    }

    private updateStatusPanel() {

        this.statusTexts.forEach(text => text.destroy());
        this.statusTexts = [];

        const selectedUnit = this.playerUnits[this.selectedPlayerIndex];

        const panelX = 10; 
        const panelY = 10;
        const lineHeight = 20;
        const style = { font: '12px Courier New', fill: '#1B263B' };


        const lines = [
            `Name: ${selectedUnit.config.name}`,
            `HP: ${selectedUnit.health}/${selectedUnit.config.maxHealth}`,
            `Move Range: ${selectedUnit.config.moveRange}`,
            `Damage: ${selectedUnit.config.damage}`,
            `Attack Range: ${selectedUnit.config.attackRange}`,
            selectedUnit.hasActedThisTurn ? 'Status: Acted' : 'Status: Ready',
        ];

        lines.forEach((line, index) => {
            const text = this.add.text(panelX, panelY + index * lineHeight, line, style);
            this.statusTexts.push(text);
        });

    }

    private highlightUnit(unit: PlayerUnit | Enemy, color: number = 0x00ff00) {
        if ('setTint' in unit.sprite) {
            unit.sprite.setTint(color);
        } else {
            // It's a Rectangle – change fill colour
            (unit.sprite as Phaser.GameObjects.Rectangle).setFillStyle(color);
        }
    }

    private clearHighlight(unit: PlayerUnit | Enemy) {
        if ('clearTint' in unit.sprite) {
            unit.sprite.clearTint();
        } else {
            // Restore the original colour from the unit's config
            (unit.sprite as Phaser.GameObjects.Rectangle).setFillStyle(unit.config.spriteColor);
        }
    }






    

}