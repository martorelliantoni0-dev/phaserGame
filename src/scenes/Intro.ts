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
      key: "Intro",
    });
  }

  preload() {
    this.load.spritesheet("tipa", "assets/images/tipa.png", { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('level-1', 'assets/map/level-1.json');
    this.load.image('tilemap-extruded', 'assets/map/tilemap-extruded.png');
    this.load.image('lampros', 'assets/images/lamprosso.png'); // Carica l'immagine fogliaanomala.png
    this.load.image('lampverdee', 'assets/images/lampverdee.png');
    this.load.image('lampblu', 'assets/images/lampblu.png');
    this.load.image('lamprosa', 'assets/images/lampros.png');
    this.load.image('lampgial', 'assets/images/lampgial.png');
    this.load.image('foglia', 'assets/images/foglia.png');
    this.load.image('spicchiodxgiu', 'assets/images/spicchiodestragiu.png');
    this.load.image('spicchiosxgiu', 'assets/images/spicchiosinistragiu.png');
    this.load.image('spicchiosxsu', 'assets/images/spicchiosinistrasu.png');
    this.load.image('spicchiodxsu', 'assets/images/spicchiodestrasu.png');
    this.physics.world.createDebugGraphic();
  }

  create() {
    this.player = new playerr(this, 470, 930);

    //aggiungere i layer della mappa e il layer delle collisioni
    this.map = this.make.tilemap({ key: "level-1" });
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
      this.collisions.setCollisionByProperty({ collide: true }); // Imposta la collisione per i tile con la proprietà 'collide'
    } else {
      console.error("Layer 'collisions' non trovato!");
    }

    //zoom e camera sulla mappa
    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setScroll(mapWidth / 2 - this.cameras.main.width / 2, mapHeight / 2 - this.cameras.main.height / 2);
    this.cameras.main.setZoom(1);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.centerHitbox = this.physics.add.sprite(573, 140, null).setOrigin(0.5, 0.5);
    this.centerHitbox.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox.setDebug(true, true, 0xff0000);

    const fogliaanomala = this.add.image(this.centerHitbox.x, this.centerHitbox.y, 'lampros');
    fogliaanomala.setOrigin(0.43, 0.54).setDepth(1).setDisplaySize(46,126 );
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala.setVisible(!fogliaanomala.visible);
      },
      loop: true
    });

    this.centerHitbox1 = this.physics.add.sprite(93, 630, null).setOrigin(0.5, 0.5);
    this.centerHitbox1.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox1.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox1.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox1.setDebug(true, true, 0xff0000);

    const fogliaanomala1 = this.add.image(this.centerHitbox1.x, this.centerHitbox1.y, 'lampblu');
    fogliaanomala1.setOrigin(0.5, 0.71).setDepth(1).setDisplaySize(55, 67);
    this.time.addEvent({
      delay: 800,
      callback: () => {
        fogliaanomala1.setVisible(!fogliaanomala1.visible);
      },
      loop: true
    });

    this.centerHitbox2 = this.physics.add.sprite(873, 630, null).setOrigin(0.5, 0.5);
    this.centerHitbox2.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox2.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox2.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox2.setDebug(true, true, 0xff0000);

    const fogliaanomala2 = this.add.image(this.centerHitbox2.x, this.centerHitbox2.y, 'lamprosa');
    fogliaanomala2.setOrigin(0.48, 0.77).setDepth(1).setDisplaySize(57, 61);
    this.time.addEvent({
      delay: 600,
      callback: () => {
        fogliaanomala2.setVisible(!fogliaanomala2.visible);
      },
      loop: true
    });

    this.centerHitbox3 = this.physics.add.sprite(440, 140, null).setOrigin(0.5, 0.5);
    this.centerHitbox3.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox3.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox3.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox3.setDebug(true, true, 0xff0000);

    const fogliaanomala3 = this.add.image(this.centerHitbox3.x, this.centerHitbox3.y, 'lampverdee');
    fogliaanomala3.setOrigin(0.488, 0.475).setDepth(1).setDisplaySize(43, 118);
    this.time.addEvent({
      delay: 800,
      callback: () => {
        fogliaanomala3.setVisible(!fogliaanomala3.visible);
      },
      loop: true
    });

    this.centerHitbox4 = this.physics.add.sprite(380, 93, null).setOrigin(0.5, 0.5);
    this.centerHitbox4.body.setSize(40, 50); // Imposta le dimensioni della hitbox
    this.centerHitbox4.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox4.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox4.setDebug(true, true, 0xff0000);

    this.centerHitbox5 = this.physics.add.sprite(13, 400, null).setOrigin(0.5, 0.5);
    this.centerHitbox5.body.setSize(40, 60); // Imposta le dimensioni della hitbox
    this.centerHitbox5.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox5.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox5.setDebug(true, true, 0xff0000);

    this.centerHitbox6 = this.physics.add.sprite(997, 410, null).setOrigin(0.5, 0.5);
    this.centerHitbox6.body.setSize(50, 50); // Imposta le dimensioni della hitbox
    this.centerHitbox6.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox6.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox6.setDebug(true, true, 0xff0000);

    this.centerHitbox7 = this.physics.add.sprite(923, 660, null).setOrigin(0.5, 0.5);
    this.centerHitbox7.body.setSize(40, 48); // Imposta le dimensioni della hitbox
    this.centerHitbox7.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox7.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox7.setDebug(true, true, 0xff0000);

    this.centerHitbox8 = this.physics.add.sprite(373, 997, null).setOrigin(0.5, 0.5);
    this.centerHitbox8.body.setSize(42, 42); // Imposta le dimensioni della hitbox
    this.centerHitbox8.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox8.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox8.setDebug(true, true, 0xff0000);

    this.centerHitbox9 = this.physics.add.sprite(65, 675, null).setOrigin(0.5, 0.5);
    this.centerHitbox9.body.setSize(33, 43); // Imposta le dimensioni della hitbox
    this.centerHitbox9.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox9.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox9.setDebug(true, true, 0xff0000);

    this.centerHitbox13 = this.physics.add.sprite(632, 990, null).setOrigin(0.5, 0.5);
    this.centerHitbox13.body.setSize(33, 55); // Imposta le dimensioni della hitbox
    this.centerHitbox13.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox13.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox13.setDebug(true, true, 0xff0000);


    this.centerHitbox10 = this.physics.add.sprite(580, 765, null).setOrigin(0.5, 0.5);
    this.centerHitbox10.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox10.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox10.setVisible(false); // Make the hitbox invisible
    this.centerHitbox10.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox10,
      x: 790,
      y: 605,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.centerHitbox11 = this.physics.add.sprite(770, 480, null).setOrigin(0.5, 0.5);
    this.centerHitbox11.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox11.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox11.setVisible(false); // Make the hitbox invisible
    this.centerHitbox11.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox11,
      x: 570,
      y: 320,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.centerHitbox12 = this.physics.add.sprite(240, 480,null).setOrigin(0.5, 0.5);
    this.centerHitbox12.body.setSize(40, 40); // Set the size of the hitbox
    this.centerHitbox12.setImmovable(true); // Make the hitbox immovable
    this.centerHitbox12.setVisible(false); // Make the hitbox invisible
    this.centerHitbox12.setDebug(true, true, 0xff0000);

    // Move the hitbox in a circular path
    this.tweens.add({
      targets: this.centerHitbox12,
      x: 450,
      y: 320,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.centerHitbox14 = this.physics.add.sprite(440, 820, null).setOrigin(0.5, 0.5);
    this.centerHitbox14.body.setSize(20, 80); // Imposta le dimensioni della hitbox
    this.centerHitbox14.setImmovable(true); // Rendi l'oggetto immobile
    this.centerHitbox14.setVisible(false); // Rendi l'oggetto invisibile
    this.centerHitbox14.setDebug(true, true, 0xff0000);

    const fogliaanomala4= this.add.image(this.centerHitbox14.x, this.centerHitbox14.y, 'lampgial');
    fogliaanomala4.setOrigin(0.45, 0.51).setDepth(1).setScale(0.9, 0.92);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala4.setVisible(!fogliaanomala4.visible);
      },
      loop: true
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    let imageDisplayed = false;
    this.physics.add.collider(this.player, this.centerHitbox10, () => {
      if (!imageDisplayed) {
      const image = this.add.image(788,798, 'spicchiodxgiu');
      image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(472, 452);
      imageDisplayed = true;
      }
    });

    let imageDisplayed1 = false;
    this.physics.add.collider(this.player, this.centerHitbox12, () => {
      if (!imageDisplayed1) {
      const image = this.add.image(232,253, 'spicchiosxsu');
      image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(464, 505);
      imageDisplayed1 = true;
      }
    });

    let imageDisplayed2 = false;
    this.physics.add.collider(this.player, this.centerHitbox11, () => {
      if (!imageDisplayed2) {
      const image = this.add.image(789,253.5, 'spicchiodxsu');
      image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(471, 507);
      imageDisplayed2 = true;
      }
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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