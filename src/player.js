/**
 * Clase que representa al jugador
 */
export default class Player extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, 'player', 0);

        this.speed = config.speed;

        this.isWalking = false;
        this.isFlying = false;

        this.setDepth(3);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //animaciones

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: 0
        });
        scene.anims.create({
            key: 'walking',
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.rightArrow = this.scene.input.keyboard.addKey('RIGHT');
        this.leftArrow = this.scene.input.keyboard.addKey('LEFT');
        this.upArrow = this.scene.input.keyboard.addKey('UP');

        this.play('idle');
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        if (this.rightArrow.isDown) {

            this.body.setVelocityX(this.speed);

            if (!this.isWalking && this.body.velocity.y === 0) {
                
                this.play('walking');
                this.isFlying = false;
            }
            this.setFlipX(false);
            this.isWalking = true;
        }
        else if (this.leftArrow.isDown) {

            this.body.setVelocityX(-this.speed);

            if (!this.isWalking && this.body.velocity.y === 0) {

                this.play('walking');
                this.isFlying = false;
            }
            this.setFlipX(true);
            this.isWalking = true;
        }
        else {

            this.body.setVelocityX(0);

            if (this.body.velocity.y === 0) {
                
                this.play('idle');
                this.isFlying = false;
            }
            this.isWalking = false;
        }

        if (this.upArrow.isDown) {

            this.body.setVelocityY(-this.speed/2);

            if (!this.isFlying) this.play('fly');
            this.isFlying = true;
        }

        if (this.x <= 0) this.x = this.scene.scale.width - 1;
        if (this.x >= this.scene.scale.width) this.x = 1;
    }
}