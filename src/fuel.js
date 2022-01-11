/**
 * Clase que representa al combustible
 */
export default class Fuel extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, 'fuel');

        this.setDepth(4);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.picked = false;
        this.pickSFX = this.scene.sound.add('pick');
        this.dropSFX = this.scene.sound.add('drop');

        this.scene.physics.add.overlap(this, this.scene.player, () => { this.pick(); });

        this.scene.physics.add.overlap(this, this.scene.spaceShip, () => { this.drop(); });

        this.scene.physics.add.collider(this, this.scene.groundLayer);
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        if (this.picked) {

            this.x = this.scene.player.x;
            this.y = this.scene.player.y;

            this.body.setAllowGravity(false);
        }
    }

    pick() {

        if (!this.picked) {
            this.picked = true;
            this.pickSFX.play();
        }
    }

    drop() {

        if (this.picked) {

            this.dropSFX.play();
            this.scene.spaceShip.addFuel();
            this.scene.createFuel();
            this.destroy();
        }
    }
}