export let GameData: gameData = {
  globals: {
    gameWidth: 1024,
    gameHeight: 1024,
    bgColor: "#000000",
    debug: false
  },

  preloader: {
    bgColor: "ffffff",
    image: "phaser",
    imageX: 1280/ 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "roboto",
    loadingTextComplete: "GIOCA",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  tilemaps: 
  [
    { 
      key: "level-0", 
      path: "assets/map/level-0.json" 
    },{ 
      key: "map", 
      path: "assets/map/map.json" 
    }
  ],

  spritesheets: 
  [

    { 
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png", 
      width: 32, 
      height: 32, 
      spacing: 2,
      frames: 150
    },
    { 
      name: "spritesheet",
      path: "assets/map/spritesheet.png", 
      width: 32, 
      height: 32,
      frames: 48
    },

    { name: "tipa",
       path: "assets/images/tipa.png", 
       width: 58, 
       height: 64, 
       frames: 36 
    },
    //creazione della spritesheet per la mappa

  ],
  images: [
    { name: "ziodonny", path: "assets/images/phaser.png" },
    { name: "statics", path: "assets/map/statics.png" },
    { name: "set1", path: "assets/map/set1.png" },
    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "freedoom", path: "assets/images/freedoom.png" },
    { name: "thelucasart", path: "assets/images/thelucasart.png" },
    { name: "intro-bg", path: "assets/images/intro-bg.jpg" },
    { name: "bg-1", path: "assets/images/bg/1.png" },
    { name: "bg-2", path: "assets/images/bg/2.png" },
    { name: "bg-3", path: "assets/images/bg/3.png" },
    { name: "bg-4", path: "assets/images/bg/4.png" },
    { name: "bg-5", path: "assets/images/bg/5.png" },
    { name: "bg-6", path: "assets/images/bg/6.png" },
    { name: "bg-7", path: "assets/images/bg/7.png" },




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
