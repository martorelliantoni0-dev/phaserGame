import { GameData } from "../GameData";

export default class GamePlay extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private key: Phaser.Types.Input.Keyboard.CursorKeys;
  private erba: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: "GamePlay",
    });
  }

  preload() {
    // Caricamento dello sfondo
    this.load.image("bg7", "assets/images/bg/7.png");
    this.load.image("walk", "assets/images/walk.png");
  }

  create() {
    this.erba = this.physics.add.sprite(this.cameras.main.width/2, this.cameras.main.height / 2, "bg7").setScale(2.4,1.5).setX(960).setY(750);
    this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "walk");
    this.key = this.input.keyboard.createCursorKeys();
    this.erba.setImmovable(true); //non fa muovere lo sprite
    this.physics.add.collider(this.player, this.erba); //aggiunge le collisioni
    this.player.setCollideWorldBounds(true); //limita il player ai limiti dello schermo
    this.physics.world.createDebugGraphic(); // fa vedere le hitbox
    this.erba.body.setSize(800,50); //crea la hitbox 
    this.erba.body.setOffset(0,395); //posizione la hitbox
  }

  update(): void {
    this.player.setVelocity(0);
    if (this.key.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.key.right.isDown) {
      this.player.setVelocityX(160);
    }else if (this.key.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.key.down.isDown) {
      this.player.setVelocityY(160);
    }
  }
}
