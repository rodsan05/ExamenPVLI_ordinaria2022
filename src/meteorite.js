/**
 * Clase que representa un meteorito
 */
export default class Meteorite extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, 'meteorite', 0);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.isAlive = true;

        this.speed = config.speed;

        this.explosionSFX = this.scene.sound.add('explosion');

        this.body.setAllowGravity(false);

        this.setDepth(3);

        let randomX = Phaser.Math.Between(0, this.scene.scale.width);
        let randomY = Phaser.Math.Between(1, this.scene.scale.height);

        let vector = new Phaser.Math.Vector2(randomX - this.x, randomY - this.y);
        this.rotation = vector.angle();
        this.scene.physics.moveTo(this, randomX, randomY);

        scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('meteorite', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        this.explosion = scene.anims.create({
            key: 'explosion',
            frames: scene.anims.generateFrameNumbers('meteorite', { start: 2, end: 3 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.physics.add.collider(this, this.scene.groundLayer, () => {

            this.play('explosion');
            this.explosionSFX.play();
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.isAlive = false;
            this.on('animationcomplete', () => { this.destroy(); });
        });

        this.scene.physics.add.overlap(this, this.scene.player, () => { this.scene.playerLose(); });

        this.play('move');
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        if (this.isAlive) {
            if (this.x <= 0) this.x = this.scene.scale.width - 1;
            if (this.x >= this.scene.scale.width) this.x = 1;
        }
    }
}