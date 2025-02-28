import { GameData } from "../GameData";

export default class Boot extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("logo", "assets/images/logoS.png");
  }

  create() {
    // Posizioniamo il logo al centro dello schermo
    this._logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo");
    this._logo.setScale(0.5); // Scala iniziale più piccola

    // Effetto di ingrandimento con un tween
    this.tweens.add({
      targets: this._logo,
      scale: 1.5, // Scala finale
      duration: 3000, 
      ease: "Sine.easeInOut"
    });

    // Dopo 3 secondi, passiamo alla scena "Gameplay"
    this.time.delayedCall(3000, () => {
      console.log("Cambia scena ");
      this.scene.start("Intro");
    });
  }
}
