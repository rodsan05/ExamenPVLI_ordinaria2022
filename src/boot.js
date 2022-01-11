export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'boot' });
    }

    /**
     * Carga de los assets del juego
     */
    preload() {

        //tilemap
        this.load.image('tileset', 'assets/sprites/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/map/tilemap.json');

        // //Sonidos del juego
        this.load.audio('drop', 'assets/sounds/drop.wav');
        this.load.audio('pick', 'assets/sounds/pick.wav');
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.load.audio('lose', 'assets/sounds/lose.wav');
        this.load.audio('win', 'assets/sounds/win.wav');

        // // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/sprites/');

        // //Carga de visuales
        this.load.image('button', 'button.png');
        this.load.image('fuel', 'fuel.png');
        this.load.image('spaceship', 'spaceship.png');        
        this.load.spritesheet('player', 'jetpac.png', { frameWidth: 17, frameHeight: 24 });
        this.load.spritesheet('meteorite', 'meteor.png', { frameWidth: 16, frameHeight: 14 });
    }

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {

        this.scene.start('menu');
    }
}