class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {

    this.load
      .image("x", "assets/imgs/x.png")
      .image("stone", "assets/imgs/player/stone.png")
      .image("arrow", "assets/imgs/player/arrow.png")
      .image("rifle", "assets/imgs/player/rifle.png")
      .image("soldier", "assets/imgs/enemy/soldier.png")
      .image("ghost", "assets/imgs/enemy/ghost.png")
      .image("golem", "assets/imgs/enemy/golem.png")
      .image("god", "assets/imgs/enemy/god.png")
      .spritesheet("tileset", "assets/imgs/tileset.png", { frameWidth: 32, frameHeight: 32 })

  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
