/**
 * Clase que representa la nave
 */
export default class SpaceShip extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, 'spaceship');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.winSFX = this.scene.sound.add('win');
        this.setDepth(2);

        this.setOrigin(0.5, 1)

        this.maxFuel = config.maxFuel;
        this.fuel = 0;

        this.body.setAllowGravity(false);
        this.text = this.scene.add.text(this.x, this.y - this.displayHeight*1.2, this.fuel + '/' + this.maxFuel, { fontFamily: 'Pixeled', fontSize: 32 })
        .setScale(0.25)
        .setDepth(10)
        .setOrigin(0.5);
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt);
    }

    addFuel() {

        this.fuel++;
        this.updateText();

        if (this.fuel === this.maxFuel) this.takeOff();
    }

    takeOff() {

        this.winSFX.play();
        let tween = this.scene.tweens.add({
            targets: [ this ],
            y: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: 10
        });

        tween.on('complete', () => { this.scene.backToMenu(); });
    }

    updateText() {

        this.text.setText(this.fuel + '/' + this.maxFuel);
    }
}