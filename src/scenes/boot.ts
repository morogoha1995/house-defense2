class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("house", "assets/imgs/house.png")
      .image("x", "assets/imgs/x.png")
      .image("tile", "assets/imgs/tile.jpg")
      .image("field", "assets/imgs/tile.jpg")
      .image("stone", "assets/imgs/player/stone.png")
      .image("arrow", "assets/imgs/player/arrow.png")
      .image("rifle", "assets/imgs/player/rifle.png")
      .image("soldier", "assets/imgs/enemy/soldier.png")
      .image("boss", "assets/imgs/enemy/boss.png")
      .image("golem", "assets/imgs/enemy/golem.png")
      .image("god", "assets/imgs/enemy/god.png")
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
