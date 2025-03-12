import playerr from '../assets/player/moving';

export default class Intro extends Phaser.Scene {
  private player: playerr;
  private _voth = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private world: Phaser.Tilemaps.TilemapLayer;
  private collisions: Phaser.Tilemaps.TilemapLayer;
  private centerHitbox: Phaser.Physics.Arcade.Sprite;
  private centerHitbox1: Phaser.Physics.Arcade.Sprite;
  private centerHitbox2: Phaser.Physics.Arcade.Sprite;
  private centerHitbox3: Phaser.Physics.Arcade.Sprite;
  private centerHitbox4: Phaser.Physics.Arcade.Sprite;
  private centerHitbox5: Phaser.Physics.Arcade.Sprite;
  private centerHitbox6: Phaser.Physics.Arcade.Sprite;
  private centerHitbox7: Phaser.Physics.Arcade.Sprite;
  private centerHitbox8: Phaser.Physics.Arcade.Sprite;
  private centerHitbox9: Phaser.Physics.Arcade.Sprite;
  private centerHitbox10: Phaser.Physics.Arcade.Sprite;
  private centerHitbox11: Phaser.Physics.Arcade.Sprite;
  private centerHitbox12: Phaser.Physics.Arcade.Sprite;
  private centerHitbox13: Phaser.Physics.Arcade.Sprite;
  private centerHitbox14: Phaser.Physics.Arcade.Sprite;


  constructor() {
    super({
      key: "GamePlay",
    });
  }

  preload() {
    this.load.spritesheet("tipa", "assets/images/tipa.png", { frameWidth: 64, frameHeight: 64 });
    this.load.image("ziodonny", "assets/images/phaser.png");
    this.load.image("player", "assets/images/player.png");
    this.load.tilemapTiledJSON('level-0', 'assets/map/level-0.json');
    this.load.image('tilemap-extruded', 'assets/map/tilemap-extruded.png');
    this.load.image('fogliaanomala', 'assets/images/fogliaanomala.png'); // Carica l'immagine fogliaanomala.png
    this.load.image('lampverdee', 'assets/images/lampverdee.png');
    this.load.image('lampblu', 'assets/images/lampblu.png');
    this.load.image('lampros', 'assets/images/lampros.png');
    this.load.image('lampgial', 'assets/images/lampgial.png');
    this.load.image('foglia', 'assets/images/foglia.png');
    this.physics.world.createDebugGraphic();
  }

  create() {
    this.player = new playerr(this, 470, 930);
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
      this.collisions.setDepth(2).setAlpha(1);
      this.collisions.setCollisionByProperty({ colllide: true }); // Imposta la collisione per i tile con la proprietà 'collide'
    } else {
      console.error("Layer 'collisions' non trovato!");
    }

    // Crea un'istanza della classe playerr

    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    this.centerHitbox4 = this.physics.add.sprite(355, 86, null).setOrigin(0.5, 0.5);
    this.centerHitbox4.body.setSize(40, 50); // Imposta le dimensioni della hitbox
    this.centerHitbox4.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox4.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox4.setDebug(true, true, 0xff0000);

    this.centerHitbox5 = this.physics.add.sprite(13, 380, null).setOrigin(0.5, 0.5);
    this.centerHitbox5.body.setSize(40, 60); // Imposta le dimensioni della hitbox
    this.centerHitbox5.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox5.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox5.setDebug(true, true, 0xff0000);

    this.centerHitbox6 = this.physics.add.sprite(932, 386, null).setOrigin(0.5, 0.5);
    this.centerHitbox6.body.setSize(50, 50); // Imposta le dimensioni della hitbox
    this.centerHitbox6.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox6.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox6.setDebug(true, true, 0xff0000);

    this.centerHitbox7 = this.physics.add.sprite(865, 615, null).setOrigin(0.5, 0.5);
    this.centerHitbox7.body.setSize(40, 35); // Imposta le dimensioni della hitbox
    this.centerHitbox7.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox7.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox7.setDebug(true, true, 0xff0000);

    this.centerHitbox8 = this.physics.add.sprite(346, 940, null).setOrigin(0.5, 0.5);
    this.centerHitbox8.body.setSize(42, 42); // Imposta le dimensioni della hitbox
    this.centerHitbox8.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox8.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox8.setDebug(true, true, 0xff0000);

    this.centerHitbox9 = this.physics.add.sprite(60, 628, null).setOrigin(0.5, 0.5);
    this.centerHitbox9.body.setSize(33, 37); // Imposta le dimensioni della hitbox
    this.centerHitbox9.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox9.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox9.setDebug(true, true, 0xff0000);

    this.centerHitbox13 = this.physics.add.sprite(600, 924, null).setOrigin(0.5, 0.5);
    this.centerHitbox13.body.setSize(33, 44); // Imposta le dimensioni della hitbox
    this.centerHitbox13.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox13.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox13.setDebug(true, true, 0xff0000);

    this.centerHitbox14 = this.physics.add.sprite(415, 775, null).setOrigin(0.5, 0.5);
    this.centerHitbox14.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox14.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox14.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox14.setDebug(true, true, 0xff0000);

    this.centerHitbox = this.physics.add.sprite(540, 130, null).setOrigin(0.5, 0.5);
    this.centerHitbox.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox.setDebug(true, true, 0xff0000);

    this.centerHitbox1 = this.physics.add.sprite(89, 596, null).setOrigin(0.5, 0.5);
    this.centerHitbox1.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox1.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox1.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox1.setDebug(true, true, 0xff0000);

    this.centerHitbox2 = this.physics.add.sprite(822, 596, null).setOrigin(0.5, 0.5);
    this.centerHitbox2.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox2.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox2.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox2.setDebug(true, true, 0xff0000);

    this.centerHitbox3 = this.physics.add.sprite(413, 130, null).setOrigin(0.5, 0.5);
    this.centerHitbox3.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox3.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox3.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox3.setDebug(true, true, 0xff0000);

    const fogliaanomala = this.add.image(this.centerHitbox.x, this.centerHitbox.y, 'fogliaanomala');
    fogliaanomala.setOrigin(0.5, 0.52).setDepth(1).setScale(0.91, 0.91);
    this.time.addEvent({
      delay: 400,
      callback: () => {
        fogliaanomala.setVisible(!fogliaanomala.visible);
      },
      loop: true
    });

    const fogliaanomala1 = this.add.image(this.centerHitbox1.x, this.centerHitbox1.y, 'lampblu');
    fogliaanomala1.setOrigin(0.5, 0.75).setDepth(1).setScale(0.95, 0.97);
    this.time.addEvent({
      delay: 800,
      callback: () => {
        fogliaanomala1.setVisible(!fogliaanomala1.visible);
      },
      loop: true
    });

    const fogliaanomala2 = this.add.image(this.centerHitbox2.x, this.centerHitbox2.y, 'lampros');
    fogliaanomala2.setOrigin(0.48, 0.82).setDepth(1).setScale(0.94, 0.95);
    this.time.addEvent({
      delay: 600,
      callback: () => {
        fogliaanomala2.setVisible(!fogliaanomala2.visible);
      },
      loop: true
    });

    const fogliaanomala3 = this.add.image(this.centerHitbox3.x, this.centerHitbox3.y, 'lampverdee');
    fogliaanomala3.setOrigin(0.459, 0.45).setDepth(1).setScale(0.88, 0.9);
    this.time.addEvent({
      delay: 200,
      callback: () => {
        fogliaanomala3.setVisible(!fogliaanomala3.visible);
      },
      loop: true
    });

    const fogliaanomala4= this.add.image(this.centerHitbox14.x, this.centerHitbox14.y, 'lampgial');
    fogliaanomala4.setOrigin(0.45, 0.51).setDepth(1).setScale(0.9, 0.92);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala4.setVisible(!fogliaanomala4.visible);
      },
      loop: true
    });

    const fogliaanomala5= this.add.image(this.centerHitbox3.x, this.centerHitbox3.y, 'foglia');
    fogliaanomala4.setOrigin(0.45, 0.51).setDepth(1).setScale(0.9, 0.92);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala5.setVisible(!fogliaanomala5.visible);
      },
      loop: true
    });

    // Imposta la telecamera al centro della mappa
    this.cameras.main.setScroll(mapWidth / 2 - this.cameras.main.width / 2, mapHeight / 2 - this.cameras.main.height / 2);
    this.cameras.main.setZoom(1);

    this.centerHitbox10 = this.physics.add.sprite(540, 725, null).setOrigin(0.5, 0.5);
    this.centerHitbox10.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox10.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox10.setVisible(false); // Make the hitbox invisible
    this.centerHitbox10.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox10,
      x: 750,
      y: 560,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.centerHitbox11 = this.physics.add.sprite(725, 450, null).setOrigin(0.5, 0.5);
    this.centerHitbox11.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox11.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox11.setVisible(false); // Make the hitbox invisible
    this.centerHitbox11.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox11,
      x: 530,
      y: 300,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.centerHitbox12 = this.physics.add.sprite(230, 450,null).setOrigin(0.5, 0.5);
    this.centerHitbox12.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox12.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox12.setVisible(false); // Make the hitbox invisible
    this.centerHitbox12.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox12,
      x: 410,
      y: 300,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    // Aggiungi le collisioni del player con il layer collisions e con le hitbox
    this.physics.add.collider(this.player, this.collisions);
    this.physics.add.collider(this.player, this.centerHitbox);
    this.physics.add.collider(this.player, this.centerHitbox1);
    this.physics.add.collider(this.player, this.centerHitbox2);
    this.physics.add.collider(this.player, this.centerHitbox3);
    this.physics.add.collider(this.player, this.centerHitbox4);
    this.physics.add.collider(this.player, this.centerHitbox5);
    this.physics.add.collider(this.player, this.centerHitbox6);
    this.physics.add.collider(this.player, this.centerHitbox7);
    this.physics.add.collider(this.player, this.centerHitbox8);
    this.physics.add.collider(this.player, this.centerHitbox9);
    this.physics.add.collider(this.player, this.centerHitbox10);
    this.physics.add.collider(this.player, this.centerHitbox11);
    this.physics.add.collider(this.player, this.centerHitbox12);
    this.physics.add.collider(this.player, this.centerHitbox13);
    this.physics.add.collider(this.player, this.centerHitbox14);
    }

  update(time: number, delta: number): void {
    this.player.update();

    if (this._voth == 0) {
      this.player.setFrame(0);
      this.time.delayedCall(2000, () => {
        this._voth = 1;
      });
    }
    if (this._voth == 1 && this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) 
    {
      this.player.anims.play("player-idle", true);
    }
  }
}