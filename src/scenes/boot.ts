class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {

    this.load
      .image("x", "assets/imgs/x.png")
      .image("hand", "assets/imgs/hand.png")
      .image("stone", "assets/imgs/weapon/stone.png")
      .image("arrow", "assets/imgs/weapon/arrow.png")
      .image("rifle", "assets/imgs/weapon/rifle.png")
      .image("soldier", "assets/imgs/enemy/soldier.png")
      .image("rocket", "assets/imgs/weapon/rocket.png")
      .image("flame", "assets/imgs/weapon/flame.png")
      .image("ghost", "assets/imgs/enemy/ghost.png")
      .image("golem", "assets/imgs/enemy/golem.png")
      .image("god", "assets/imgs/enemy/god.png")
      .image("stoneBullet", "assets/imgs/weapon/bullet/stone-bullet.png")
      .image("arrowBullet", "assets/imgs/weapon/bullet/arrow-bullet.png")
      .image("rifleBullet", "assets/imgs/weapon/bullet/rifle-bullet.png")
      .image("rocketBullet", "assets/imgs/weapon/bullet/rocket-bullet.png")
      .image("flameBullet", "assets/imgs/weapon/bullet/flame-bullet.png")
      .spritesheet("tileset", "assets/imgs/tileset.png", { frameWidth: 32, frameHeight: 32 })

  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
