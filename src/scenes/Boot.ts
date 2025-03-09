import Phaser from "phaser";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { GameData } from "../GameData";

declare global {
  interface Window {
    currentEmotion?: string;
  }
}

// --- FaceMesh Setup ---
const videoElement: HTMLVideoElement = document.createElement("video");
videoElement.autoplay = true;
document.body.appendChild(videoElement);

let emotionHistory: string[] = [];
let emotionCount: number = 0;
let stopTracking: boolean = false;

async function setupCamera(): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
  videoElement.srcObject = stream;
  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => resolve();
  });
}

async function startFaceMesh(): Promise<void> {
  if (stopTracking) return;

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
      if (!stopTracking) {
        await faceMesh.send({ image: videoElement });
      }
    },
    width: 1280,
    height: 720,
  });

  camera.start();
}

function onFaceDetected(results: any): void {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0 || stopTracking) return;

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
  emotionCount++;

  if (emotionCount >= 100) {
    stopTracking = true;
    const mostFrequentEmotion = emotionHistory.sort((a, b) =>
      emotionHistory.filter(v => v === a).length - emotionHistory.filter(v => v === b).length
    ).pop();
    console.log(`Face tracking terminato. Emozione più rilevata: ${mostFrequentEmotion}`);
    return;
  }

  window.currentEmotion = emotion;
}

setupCamera().then(startFaceMesh);

export default class Boot extends Phaser.Scene {
  private lastEmotion: string = "neutro";
  private _logo: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private sprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: "Boot" });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("logo", "assets/images/logoS.png");
    this.load.image("bg1", "assets/images/bg1.jpg");
    this.load.spritesheet("animation", "assets/images/spritesheet.png", {
      frameWidth: 1040, 
      frameHeight: 1040, 
    });
  }

  create(): void {
    this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
    this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false)
    this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.5)
    this.tweens.add({
      targets: this._logo,
      scale: 1.5,
      duration: 3000,
      ease: "Sine.easeInOut",
    });

    this.anims.create({
      key: "playAnimation",
      frames: this.anims.generateFrameNumbers("animation", { 
        start: 0, 
        end: 17,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.time.delayedCall(3500, () => {
      this._logo.setVisible(false);
      this.sprite.setVisible(true);
      this.sprite.anims.play("playAnimation");
      this.sprite.on("animationcomplete", () => {
        console.log("Animazione completata");
        this.bg.setVisible(true);
      });
    });
  }

  update(): void {
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
      this.lastEmotion = window.currentEmotion;
      console.log("Emozione aggiornata:", this.lastEmotion);
    }
  }
}