import Button from "./button.js";
/**
 * Escena
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'menu' });
    }

    /**
     * Create de la escena
     */
    create() {

        let buttonConfig = {
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            type: 'Normal'
        };
        new Button(this, buttonConfig);

        buttonConfig = {
            x: this.scale.width / 4,
            y: this.scale.height / 2,
            type: 'Facil'
        };
        new Button(this, buttonConfig);

        buttonConfig = {
            x: this.scale.width / 4 * 3,
            y: this.scale.height / 2,
            type: 'Dificil'
        };
        new Button(this, buttonConfig);

        this.events.on('normalDiff', this.startGameNormal, this);
        this.events.on('easyDiff', this.startGameEasy, this);
        this.events.on('hardDiff', this.startGameHard, this);
    }

    /**
     * Método llamado desde el evento del timer al completarse
     */
    startGameEasy() {

        this.scene.start('playingscene', { maxFuel: 2, meteorDelay: 2000 });
    }

    startGameHard() {

        this.scene.start('playingscene', { maxFuel: 5, meteorDelay: 500 });
    }

    startGameNormal() {

        this.scene.start('playingscene', { maxFuel: 3, meteorDelay: 1000 });
    }
}