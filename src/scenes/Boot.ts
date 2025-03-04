import Phaser from "phaser";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { GameData } from "../GameData";

// --- Dichiarazione globale per TypeScript ---
declare global {
  interface Window {
    currentEmotion?: string;
  }
}

// --- FaceMesh Setup ---
const videoElement: HTMLVideoElement = document.createElement("video");
videoElement.autoplay = true;
document.body.appendChild(videoElement);

async function setupCamera(): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
  videoElement.srcObject = stream;
  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => resolve();
  });
}

async function startFaceMesh(): Promise<void> {
  const faceMesh = new FaceMesh({
    locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  faceMesh.onResults(onFaceDetected);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
  });

  camera.start();
}

let emotionHistory: string[] = [];

function onFaceDetected(results: any): void {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

  const keypoints = results.multiFaceLandmarks[0];

  const leftMouth = keypoints[61];
  const rightMouth = keypoints[291];
  const topMouth = keypoints[13];
  const bottomMouth = keypoints[14];

  const mouthWidth = Math.abs(rightMouth.x - leftMouth.x);
  const mouthHeight = Math.abs(topMouth.y - bottomMouth.y);

  let emotion: string = "neutro";
  if (mouthHeight / mouthWidth > 0.3) {
    emotion = "felice";
  } else if (mouthHeight / mouthWidth < 0.1) {
    emotion = "triste";
  }

  emotionHistory.push(emotion);
  if (emotionHistory.length > 10) emotionHistory.shift();

  const mostFrequentEmotion = emotionHistory.sort((a, b) =>
    emotionHistory.filter(v => v === a).length - emotionHistory.filter(v => v === b).length
  ).pop();

  console.log("Espressione:", mostFrequentEmotion);
  window.currentEmotion = mostFrequentEmotion;
}

setupCamera().then(startFaceMesh);

export default class Boot extends Phaser.Scene {
  private lastEmotion: string = "neutro";
  private bg1: Phaser.Physics.Arcade.Sprite;
  private a: number = 0;
  private b: number = 0;
  private c: number = 0;
  private z: boolean = true;
  private _logo: Phaser.GameObjects.Image;
  private sprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: "Boot" });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("logo", "assets/images/logoS.png");
    this.load.spritesheet('anim', 'assets/images/bganim/spritesheet1.png', {
      frameWidth: 1565,
      frameHeight: 1136
    });
  }

  create(): void {
    this._logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.5);
    this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "anim").setVisible(false).setScale(1.3,1);
    this.anims.create({
      key: 'animBG',
      frames: this.anims.generateFrameNumbers('anim', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0
    });
    this.tweens.add({
      targets: this._logo,
      scale: 1.5,
      duration: 3000,
      ease: "Sine.easeInOut"
    });
    this.time.delayedCall(3400, () => {
      this.sprite.setVisible(true);
      this.sprite.anims.play("animBG", true);
    });
    let interactiveZone1 = this.add.zone(950, 375, 200, 400).setInteractive();
    interactiveZone1.on('pointerdown', () => {
      console.log('Zona interattiva (strada centrale) cliccata!');
      this.scene.start("GamePlay");
    });
    let interactiveZone2 = this.add.zone(300,600, 400, 300).setInteractive();
    interactiveZone2.on('pointerdown', () => {
      this.scene.start("GamePlay");
      console.log('Zona interattiva (strada sinistra) cliccata!');
    });
    let interactiveZone3 = this.add.zone(1750,600, 300, 300).setInteractive();
    interactiveZone3.on('pointerdown', () => {
      this.scene.start("GamePlay");
      console.log('Zona interattiva (strada destra) cliccata!');
    });
  }

  update(): void {
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion ) {
      this.lastEmotion = window.currentEmotion;
    }
    switch (this.lastEmotion) {
      case "triste":
         this.a++;
         if (this.a >= 10) {
          this.z = false;
         }
         break;
      case "neutro":
         this.b++;
          if (this.b >= 10) {
            this.z = false;
          }
          break;
      case "felice": 
        this.c++;
        if (this.c >= 10) {
          this.z = false;
        }
        break;
    }
  }
}
