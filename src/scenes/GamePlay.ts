import { GameData } from "../GameData";

export default class GamePlay extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private key: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "GamePlay",
    });
  }

  preload() {
    this.load.spritesheet('walk_1', 'assets/images/player/walk_1.png', {
      frameWidth: 64, 
      frameHeight: 64 
  });
  this.load.spritesheet('walk_2', 'assets/images/player/walk_2.png', {
    frameWidth: 229, 
    frameHeight: 272 
});
this.load.spritesheet('walk_3', 'assets/images/player/walk_3.png', {
  frameWidth: 229, 
  frameHeight: 272 
});
this.load.spritesheet('walk_4', 'assets/images/player/walk_4.png', {
  frameWidth: 229, 
  frameHeight: 272 
});
  }

  create() {
    this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "walk_1")
    this.key = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true); //limita il player ai limiti dello schermo
    this.physics.world.createDebugGraphic(); // fa vedere le hitbox
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walk_1', { start: 0, end: 8 }), 
      frameRate: 10,
      repeat: -1
  });
  }

  update(): void {
    this.player.setVelocity(0);
    if (this.key.left.isDown) {
      this.player.anims.play('walk', true);
      this.player.setVelocityX(-160);
    }else if (this.key.right.isDown) {
      this.player.setVelocityX(160);            
      this.player.anims.play('walk', true);
    }else if (this.key.up.isDown) {
      this.player.setVelocityY(-160);            
      this.player.anims.play('walk', true);
    } else if (this.key.down.isDown) {
      this.player.setVelocityY(160);            
      this.player.anims.play('walk', true);
    }else if(this.key.up){
      this.player.anims.stop();

    }
  }
}
