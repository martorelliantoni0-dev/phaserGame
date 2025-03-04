export let GameData: gameData = {
  globals: {
    gameWidth: 1920,
    gameHeight: 1080,
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
    loadingBarY: 630,
  },

  spritesheets: [

  ],

  images: [
    { name: "player", path: "assets/images/player.png"},
    {name: "logo",path: "assets/images/logoS.png"},
    { name: "bg-1", path: "assets/images/bg/1.png" },   
    { name: "walk_1", path: "assets/images/player/walk_1.png" },
    { name: "walk_2", path: "assets/images/player/walk_2.png" },
    { name: "walk_3", path: "assets/images/player/walk_3.png" },
    { name: "walk_4", path: "assets/images/player/walk_4.png" },
    { name: "s1", path: "assets/images/animStrada/s1.png" },
    { name: "s2", path: "assets/images/animStrada/s2.png" },
    { name: "s3", path: "assets/images/animStrada/s3.png" },
    { name: "scelta", path: "assets/images/bg/scelta.png" },
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
  fonts: [{key:"ralewayRegular", path:"assets/fonts/raleway.regular.ttf",type:"truetype"}],
  webfonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],
};
