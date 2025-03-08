enum playerstate {
  idle,
  destra,
  sinistra,
  sopra,
  sotto,
  diagonalesottodestra,
  diagonalesottosinistra,
  diagonalesopradestra,
  diagonalesoprasinistra
}

export default class GamePlay extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private _playerstate: playerstate = playerstate.idle;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _speed: number = 330;

  constructor() {
    super({ key: "GamePlay" });
  }

  preload() {
    this.load.spritesheet("player", "assets/images/player/walk.png", { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    this.player = this.physics.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, "player");
    this.player.body.setSize(35, 58);
    this.player.body.setOffset(13, 12);
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
  }

  update() {
    let velocityX = 0;
    let velocityY = 0;
    let moving = false;

    if (this.cursors.left.isDown) {
      velocityX = -this._speed;
      this._playerstate = this.cursors.up.isDown
        ? playerstate.diagonalesoprasinistra
        : this.cursors.down.isDown
        ? playerstate.diagonalesottosinistra
        : playerstate.sinistra;
      moving = true;
    } else if (this.cursors.right.isDown) {
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
    } else if (this.cursors.down.isDown) {
      velocityY = this._speed;
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this._playerstate = playerstate.sotto;
      }
      moving = true;
    }

    // Normalizzazione della velocità per il movimento diagonale
    const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (magnitude > 0) {
      velocityX = (velocityX / magnitude) * this._speed;
      velocityY = (velocityY / magnitude) * this._speed;
    }

    this.player.setVelocity(velocityX, velocityY);

    if (!moving) {
      this._playerstate = playerstate.idle;
      this.player.anims.play("player-idle", true);
    } else {
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
  }
}
