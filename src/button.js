/**
 * Clase que representa al botón del menú de inicio del juego
 */
export default class Button extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del botón
     * @param {*} scene Escena a la que pertenece el menú
     * @param {*} config Configuración del botón (x, y, tipo)
     */
    constructor(scene, config) {

        super(scene, config.x, config.y, 'button');

        this.scene.add.existing(this);

        this.setScale(0.1);

        this.type = config.type;
        this.text = this.scene.add.text(this.x, this.y, this.type, { fontFamily: 'Pixeled', fontSize: 32 }).setScale(0.25);
        this.text.setOrigin(0.5);

        this.setInteractive();
        this.on('pointerdown', this.onDown, this);
        this.on('pointerover', this.onOver, this);
        this.on('pointerout', this.onExitOver, this);
    }

    /**
     * Método que se ejecuta al poner el puntero sobre el botón
     */
    onOver() {

        this.setTint(0x999999);
    }

    /**
     * Método que se ejecuta al sacar el puntero del botón
     */
    onExitOver() {

        this.setTint(0xffffff);
    }

    /**
     * Método que se ejecuta cuando el botón ha sido pulsado
     */
    onDown() {

        if (this.type === 'Normal') this.scene.events.emit('normalDiff');
        else if (this.type === 'Facil') this.scene.events.emit('easyDiff');
        else if (this.type === 'Dificil') this.scene.events.emit('hardDiff');
    }

}