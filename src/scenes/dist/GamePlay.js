"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        return _super.call(this, {
            key: "GamePlay"
        }) || this;
    }
    GamePlay.prototype.preload = function () {
        this.load.spritesheet('player', 'assets/images/player.png', {
            frameWidth: 229,
            frameHeight: 272
        });
    };
    GamePlay.prototype.create = function () {
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "player").setScale(0.5, 0.5);
        this.key = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true); //limita il player ai limiti dello schermo
        this.physics.world.createDebugGraphic(); // fa vedere le hitbox
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    };
    GamePlay.prototype.update = function () {
        this.player.setVelocity(0);
        if (this.key.left.isDown) {
            this.player.anims.play('walk', true);
            this.player.setVelocityX(-160);
        }
        else if (this.key.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk', true);
        }
        else if (this.key.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('walk', true);
        }
        else if (this.key.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('walk', true);
        }
        else if (this.key.up) {
            this.player.anims.stop();
        }
    };
    return GamePlay;
}(Phaser.Scene));
exports["default"] = GamePlay;
