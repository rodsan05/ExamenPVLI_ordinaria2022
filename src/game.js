import Boot from "./boot.js";
import Menu from "./menu.js";
import PlayingScene from "./playingscene.js";

window.onload = () => {

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [Boot, Menu, PlayingScene],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    x: 0,
                    y: 100
                }
            }
        }
    };

    new Phaser.Game(config);
};