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
var playerstate;
(function (playerstate) {
    playerstate[playerstate["idle"] = 0] = "idle";
    playerstate[playerstate["destra"] = 1] = "destra";
    playerstate[playerstate["sinistra"] = 2] = "sinistra";
    playerstate[playerstate["sopra"] = 3] = "sopra";
    playerstate[playerstate["sotto"] = 4] = "sotto";
    playerstate[playerstate["diagonalesottodestra"] = 5] = "diagonalesottodestra";
    playerstate[playerstate["diagonalesottosinistra"] = 6] = "diagonalesottosinistra";
    playerstate[playerstate["diagonalesopradestra"] = 7] = "diagonalesopradestra";
    playerstate[playerstate["diagonalesoprasinistra"] = 8] = "diagonalesoprasinistra";
})(playerstate || (playerstate = {}));
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this, { key: "GamePlay" }) || this;
        _this._playerstate = playerstate.idle;
        _this._speed = 330;
        return _this;
    }
    GamePlay.prototype.preload = function () {
        this.load.spritesheet("player", "assets/images/player/walk.png", { frameWidth: 64, frameHeight: 64 });
    };
    GamePlay.prototype.create = function () {
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "player");
        this.player.body.setSize(35, 58);
        this.player.body.setOffset(13, 13);
        this.physics.world.createDebugGraphic();
        this.player.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, 1920, 1080);
        // Creazione animazioni
        this.anims.create({
            key: "player-running-sinistra",
            frames: this.anims.generateFrameNumbers("player", { start: 9, end: 17 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: "player-running-destra",
            frames: this.anims.generateFrameNumbers("player", { start: 27, end: 35 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: "player-running-sopra",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 8 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: "player-running-sotto",
            frames: this.anims.generateFrameNumbers("player", { start: 18, end: 26 }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: "player-idle",
            frames: [{ key: "player", frame: 18 }],
            frameRate: 9
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.centerOn(0, 0);
    };
    GamePlay.prototype.update = function () {
        var velocityX = 0;
        var velocityY = 0;
        var moving = false;
        if (this.cursors.left.isDown) {
            velocityX = -this._speed;
            this._playerstate = this.cursors.up.isDown
                ? playerstate.diagonalesoprasinistra
                : this.cursors.down.isDown
                    ? playerstate.diagonalesottosinistra
                    : playerstate.sinistra;
            moving = true;
        }
        else if (this.cursors.right.isDown) {
            velocityX = this._speed;
            this._playerstate = this.cursors.up.isDown
                ? playerstate.diagonalesopradestra
                : this.cursors.down.isDown
                    ? playerstate.diagonalesottodestra
                    : playerstate.destra;
            moving = true;
        }
        if (this.cursors.up.isDown) {
            velocityY = -this._speed;
            if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this._playerstate = playerstate.sopra;
            }
            moving = true;
        }
        else if (this.cursors.down.isDown) {
            velocityY = this._speed;
            if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
                this._playerstate = playerstate.sotto;
            }
            moving = true;
        }
        // Normalizzazione della velocità per il movimento diagonale
        var magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (magnitude > 0) {
            velocityX = (velocityX / magnitude) * this._speed;
            velocityY = (velocityY / magnitude) * this._speed;
        }
        this.player.setVelocity(velocityX, velocityY);
        if (!moving) {
            this._playerstate = playerstate.idle;
            this.player.anims.play("player-idle", true);
        }
        else {
            switch (this._playerstate) {
                case playerstate.destra:
                case playerstate.diagonalesopradestra:
                case playerstate.diagonalesottodestra:
                    this.player.anims.play("player-running-destra", true);
                    break;
                case playerstate.sinistra:
                case playerstate.diagonalesoprasinistra:
                case playerstate.diagonalesottosinistra:
                    this.player.anims.play("player-running-sinistra", true);
                    break;
                case playerstate.sopra:
                    this.player.anims.play("player-running-sopra", true);
                    break;
                case playerstate.sotto:
                    this.player.anims.play("player-running-sotto", true);
                    break;
            }
        }
    };
    return GamePlay;
}(Phaser.Scene));
exports["default"] = GamePlay;
