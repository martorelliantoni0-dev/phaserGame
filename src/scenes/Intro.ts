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
document.body.appendChild(videoElement); // Facoltativo: mostra il video

async function setupCamera(): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults(onFaceDetected);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  camera.start();
}

function onFaceDetected(results: any): void {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

  const keypoints = results.multiFaceLandmarks[0];

  // Bocca
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

  console.log("Espressione:", emotion);
  window.currentEmotion = emotion;
}

setupCamera().then(startFaceMesh);

export default class Intro extends Phaser.Scene {
  private npc!: Phaser.GameObjects.Sprite;
  private lastEmotion: string = "neutro";

  constructor() {
    super({ key: "Intro" });
  }

  preload(): void {
    this.load.image("npc", "assets/images/npc.png");
  }

  create(): void {
    this.npc = this.add.sprite(400, 300, "npc").setScale(1.5);
  }

  update(): void {
    // Verifica se l'emozione è cambiata e aggiorna il tint dell'NPC
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
      this.lastEmotion = window.currentEmotion;

      if (this.lastEmotion === "felice") {
        this.npc.setTint(0x00ff00); // Verde per felice
      } else if (this.lastEmotion === "triste") {
        this.npc.setTint(0xff0000); // Rosso per triste
      } else {
        this.npc.clearTint(); // Neutro, torna normale
      }
    }
  }
}