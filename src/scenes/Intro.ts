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

export default class Intro extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private _playerstate: playerstate = playerstate.idle;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _speed: number = 330; // Velocità del personaggio
  private _voth = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private world: Phaser.Tilemaps.TilemapLayer;
  private collisions: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
    this.load.spritesheet("tipa", "assets/images/tipa.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image("ziodonny", "assets/images/phaser.png");
    this.load.tilemapTiledJSON('level-0', 'assets/map/level-0.json');
    this.load.image('tilemap-extruded', 'assets/map/tilemap-extruded.png');
  }

  create() {
    this.map = this.make.tilemap({ key: "level-0" });
    this.tileset = this.map.addTilesetImage("tilemap-extruded");

    this.world = this.map.createLayer("world", this.tileset, 0, 0);
    if (this.world) {
      this.world.setDepth(1).setAlpha(1);
    } else {
      console.error("Layer 'world' non trovato!");
    }

    this.collisions = this.map.createLayer("collisions", this.tileset, 0, 0);
    if (this.collisions) {
      this.collisions.setDepth(0).setAlpha(1);
      this.collisions.setCollisionByProperty({ colllide: true });
    } else {
      console.error("Layer 'collisions' non trovato!");
    }

    this.player = this.physics.add.sprite(400, 300, "tipa");
    this.player.setFrame(0);
    this.player.setOrigin(0.5, 0.5);
    this.player.setDepth(1); // Imposta la profondità del player sopra la mappa
    this.player.body.setSize(35, 58);
    this.player.body.setOffset(13, 13);

    // Create animations for the player
    this.anims.create({
      key: "player-running-sinistra",
      frames: this.anims.generateFrameNumbers("tipa", { start: 9, end: 17 }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: "player-running-destra",
      frames: this.anims.generateFrameNumbers("tipa", { start: 27, end: 35 }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: "player-running-sopra",
      frames: this.anims.generateFrameNumbers("tipa", { start: 0, end: 8 }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: "player-running-sotto",
      frames: this.anims.generateFrameNumbers("tipa", { start: 18, end: 26 }),
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: "player-idle",
      frames: [{ key: "tipa", frame: 18 }],
      frameRate: 9
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // Imposta la telecamera per seguire il centro della mappa
    this.cameras.main.setZoom(1);
    

    if (this.collisions) {
      this.physics.add.collider(this.player, this.collisions);
    }

    // Cambia il valore di _voth dopo 2 secondi
    this.time.delayedCall(2000, () => {
      this._voth = 1;
    });
  }

  update(time: number, delta: number): void {
    let moving = false;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX -= this._speed;
      if (this.cursors.up.isDown) {
        velocityY -= this._speed;
        this._playerstate = playerstate.diagonalesoprasinistra;
        this.player.anims.play("player-running-sinistra", true);
      } else if (this.cursors.down.isDown) {
        velocityY += this._speed;
        this._playerstate = playerstate.diagonalesottosinistra;
        this.player.anims.play("player-running-sinistra", true);
      } else {
        this._playerstate = playerstate.sinistra;
        this.player.anims.play("player-running-sinistra", true);
      }
      moving = true;
    } else if (this.cursors.right.isDown) {
      velocityX += this._speed;
      if (this.cursors.up.isDown) {
        velocityY -= this._speed;
        this._playerstate = playerstate.diagonalesopradestra;
        this.player.anims.play("player-running-destra", true);
      } else if (this.cursors.down.isDown) {
        velocityY += this._speed;
        this._playerstate = playerstate.diagonalesottodestra;
        this.player.anims.play("player-running-destra", true);
      } else {
        this._playerstate = playerstate.destra;
        this.player.anims.play("player-running-destra", true);
      }
      moving = true;
    } else if (this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      velocityY -= this._speed;
      this._playerstate = playerstate.sopra;
      this.player.anims.play("player-running-sopra", true);
      moving = true;
    } else if (this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      velocityY += this._speed;
      this._playerstate = playerstate.sotto;
      this.player.anims.play("player-running-sotto", true);
      moving = true;
    }
    const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (magnitude > 0) {
      velocityX = (velocityX / magnitude) * this._speed;
      velocityY = (velocityY / magnitude) * this._speed;
    }

    this.player.setVelocity(velocityX, velocityY);

    if (this._voth == 0) {
      this.player.setFrame(0);
      this.time.delayedCall(2000, () => {
        this._voth = 1;
      });
    }
    if (this._voth == 1 && !moving) {
      this.player.setVelocity(0, 0);
      this.player.anims.play("player-idle", true);
    }
  }
}