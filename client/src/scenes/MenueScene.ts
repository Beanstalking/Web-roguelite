import Phaser from 'phaser';
import { TacticsScene } from './TacticsScene';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Create menu elements here

        const {width, height} = this.scale;
        
        this.add.rectangle(0, 0, width, height , 0x1d1d1d).setOrigin(0); 

        this.add.text(width / 2, height / 4, 'Tactics Game', { 
            font: '64px Courier New', 
            color: '#ffffff' 
        }).setOrigin(0.5);

        this.createButton(width / 2, height / 2, 'Tutorial sandbox', () => {
            this.scene.start("TacticsScene");
        });

        this.createButton(width / 2, height / 2 + 60, 'Options', () => {
            this.scene.start("OptionsScene");
        });


    }

    private createButton(x: number, y: number, text: string, onClick: () => void) {
        const buttonText = this.add.text(x, y, text, {
            font: '20px Courier New',
            color: '#ffffff',
            
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });  
        
        buttonText.on('pointerover', () => {
            buttonText.setStyle({ fill: '#ffcc00' });
        });

        buttonText.on('pointerout', () => {
            buttonText.setStyle({ fill: '#ffffff' });
        });

        buttonText.on('pointerdown', () => {
            
            onClick();
            
        });
    }
}
