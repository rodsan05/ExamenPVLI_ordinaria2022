import Fuel from "./fuel.js";
import Meteorite from "./meteorite.js";
import Player from "./player.js";
import SpaceShip from "./spaceship.js";

/**
 * Escena
 * @extends Phaser.Scene
 */
export default class PlayingScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'playingscene' });
    }

    /**
     * Init de la escena
     * @param {object} datos 
     */
    init(datos) {

        this.maxFuel = datos.maxFuel;
        this.meteorDelay = datos.meteorDelay;
    }

    /**
     * Create de la escena
     */
    create() {

        this.createTilemap();

        let playerConfig = {

            x: 20,
            y: this.scale.height - 8,
            speed: 100
        };
        this.player = new Player(this, playerConfig);

        this.physics.add.collider(this.player, this.groundLayer);

        let spaceShipConfig = {

            x: 176,
            y: this.scale.height-8,
            maxFuel: this.maxFuel
        };
        this.spaceShip = new SpaceShip(this, spaceShipConfig);

        this.spawnOffset = 30;
        this.createFuel();

        //sonidos
        this.loseSFX = this.sound.add('lose');

        let timer = this.time.addEvent({

            delay: this.meteorDelay,
            callback: this.createMeteorite,
            callbackScope: this,
            loop: true
        });
    }

    createFuel() {

        let randomX = Phaser.Math.Between(this.spawnOffset, this.scale.width - this.spawnOffset);
        let randomY = Phaser.Math.Between(0, this.scale.height - this.spawnOffset);

        let fuelConfig = {
            x: randomX,
            y: randomY
        };
        new Fuel(this, fuelConfig);
    }

    createMeteorite() {

        let randomX = Phaser.Math.Between(this.spawnOffset, this.scale.width - this.spawnOffset);

        let meteorConfig = {
            x: randomX,
            y: 0,
            speed: 50
        };

        new Meteorite(this, meteorConfig);
    }

    /**
       * Método que crea el tilemap y las capas de este
       */
    createTilemap() {

        this.map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 8,
            tileHeight: 8
        });
        const tileset1 = this.map.addTilesetImage('patrones', 'tileset');

        this.groundLayer = this.map.createLayer('ground', [tileset1]);

        this.groundLayer.setCollision([1, 2, 3]);
    }

    backToMenu() {

        this.scene.start('menu');
    }

    playerLose() {

        this.loseSFX.play()
        this.scene.start('menu');
    }
}