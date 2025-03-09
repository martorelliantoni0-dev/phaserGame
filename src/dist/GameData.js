"use strict";
exports.__esModule = true;
exports.GameData = void 0;
exports.GameData = {
    globals: {
        gameWidth: 1040,
        gameHeight: 1040,
        bgColor: "#ffffff",
        debug: false
    },
    preloader: {
        bgColor: "ffffff",
        image: "logo",
        imageX: 1920 / 2,
        imageY: 1080 / 2,
        loadingText: "Caricamento...",
        loadingTextFont: "roboto",
        loadingTextComplete: "Tappa/clicca per iniziare!!",
        loadingTextY: 800,
        loadingBarColor: 0xff0000,
        loadingBarY: 630
    },
    spritesheets: [],
    images: [
        { name: "logo", path: "assets/images/logoS.png" },
        { name: "walk", path: "assets/images/player/walk.png" },
        { name: "spritesheet", path: "assets/images/spritesheet.png" },
        { name: "bg1", path: "assets/images/bg1.jpg" },
    ],
    atlas: [],
    sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
    ],
    videos: [
    // { name: "video", path: "/assets/video/video.mp4" },
    ],
    audios: [
    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
    ],
    scripts: [],
    fonts: [{ key: "ralewayRegular", path: "assets/fonts/raleway.regular.ttf", type: "truetype" }],
    webfonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
    bitmapfonts: []
};
