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

  // Aggiungi l'emozione alla cronologia
  emotionHistory.push(emotion);
  if (emotionHistory.length > 10) emotionHistory.shift();

  // Calcola l'emozione più frequente nella cronologia
  const mostFrequentEmotion = emotionHistory.sort((a, b) =>
    emotionHistory.filter(v => v === a).length - emotionHistory.filter(v => v === b).length
  ).pop();

  console.log("Espressione:", mostFrequentEmotion);
  window.currentEmotion = mostFrequentEmotion;
}

setupCamera().then(startFaceMesh);

export default class Intro extends Phaser.Scene {
  private lastEmotion: string = "neutro";
  private bg1: Phaser.Physics.Arcade.Sprite;
  private a: integer = 0; 
  private b: integer = 0; 
  private c: integer = 0; 
  private z: boolean = true;

  constructor() {
    super({ key: "Intro" });
  }

  preload(): void {
    this.load.image("bg1", "assets/images/bg/1.png");
  }

  create(): void {
  this.bg1 = this.physics.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, "bg1").setScale(1.3, 1);
  // Creazione della zona interattiva
    let interactiveZone1 = this.add.zone(950, 375, 200, 400).setInteractive(); //zona1 strada centrale
    interactiveZone1.on('pointerdown', () => {
      console.log('Zona interattiva (strada centrale) cliccata!');
      this.scene.start("GamePlay");
    });

    let interactiveZone2 = this.add.zone(300,600, 400, 300).setInteractive(); //zona2 Strada sinistra
    interactiveZone2.on('pointerdown', () => {
      this.scene.start("GamePlay");
      console.log('Zona interattiva (strada sinistra) cliccata!');
    });

    let interactiveZone3 = this.add.zone(1750,600, 300, 300).setInteractive(); //zona3 Strada destra
    interactiveZone3.on('pointerdown', () => {
      this.scene.start("GamePlay");
      console.log('Zona interattiva (strada destra) cliccata!');
    });

  }

  update(): void {
    // Verifica se l'emozione è cambiata e aggiorna il tint dell'NPC
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion && this.z) {
      this.lastEmotion = window.currentEmotion;
    }

    switch (this.lastEmotion) {
      case "triste":
        this.a++;
        break;
      case "neutro":
        this.b++;
        break;
      case "felice":
        this.c++;
        break;
    }

    if (this.a >= 10 || this.b >= 10 || this.c >= 10) {
      this.z = false;
    }
  }
}
