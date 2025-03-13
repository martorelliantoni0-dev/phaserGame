//viene importato un riferimento a gamedata per poter usare le variabili globali
import { GameData } from "../GameData";

//creiamo la classe Boot che estende Phaser.Scene
export default class Boot extends Phaser.Scene {
  private _phaser: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("phaser", "assets/images/logo.png");
  }

  create() {
    // Posizioniamo il logo al centro dello schermo
    this._phaser = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "phaser");
    this._phaser.setScale(0.01); // Scala iniziale più piccola

    // Effetto di ingrandimento con un tween
    this.tweens.add({
      targets: this._phaser,
      scale: 0.2, // Scala finale
      duration: 3000, 
      ease: "Sine.easeInOut"
    });

    // Dopo 3 secondi, passiamo alla scena "Gameplay"
    this.time.delayedCall(3000, () => {
      this.scene.stop("Boot");
      this.scene.start("Intro");
    });
  }
}
