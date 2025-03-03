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
    this.load.spritesheet('player', 'assets/images/player.png', {
      frameWidth: 229, 
      frameHeight: 272 
  });
  }

  create() {
    this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "player").setScale(0.5,0.5);
    this.key = this.input.keyboard.createCursorKeys();
    this.erba.setImmovable(true); //non fa muovere lo sprite
    this.physics.add.collider(this.player, this.erba); //aggiunge le collisioni
    this.player.setCollideWorldBounds(true); //limita il player ai limiti dello schermo
    this.physics.world.createDebugGraphic(); // fa vedere le hitbox
    this.erba.body.setSize(800,50); //crea la hitbox 
    this.erba.body.setOffset(0,395); //posizione la hitbox
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), 
      frameRate: 10,
      repeat: -1
  });
  }

  update(): void {
    this.player.setVelocity(0);
    if (this.key.left.isDown) {
      this.player.anims.play('walk', true);
      this.player.setVelocityX(-160);
    } else if(this.key.left.isUp){
      this.player.anims.stop();
    } 
    if (this.key.right.isDown) {
      this.player.setVelocityX(160);            
      this.player.anims.play('walk', true);
    }else if (this.key.up.isDown) {
      this.player.setVelocityY(-160);            
      this.player.anims.play('walk', true);
    } else if (this.key.down.isDown) {
      this.player.setVelocityY(160);            
      this.player.anims.play('walk', true);
    }
  }
}
