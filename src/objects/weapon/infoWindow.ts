import { HALF_WIDTH, HEIGHT, HALF_HEIGHT } from "../../constants"
import { createFontStyle } from "../../utils/text"

export class InfoWindow extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, nameText: string, priceText: string, sellPriceText: string) {
    super(scene, HALF_WIDTH, HEIGHT)

    const btnY = 40

    this
      .setDepth(20)
      .setScale(0)
      .add([
        scene.add.rectangle(0, 0, 280, 200, 0x202020, 1)
          .setOrigin(0.5),

        scene.add.text(0, -40, nameText, createFontStyle("teal"))
          .setOrigin(0.5),

        scene.add.image(100, -60, "x")
          .setInteractive()
          .on("pointerdown", () => { this.closeTween() }),

        scene.add.text(-60, btnY, priceText, createFontStyle("red"))
          .setInteractive()
          .setName("upgradeBtn")
          .setBackgroundColor("blue")
          .setOrigin(0.5),

        scene.add.text(60, btnY, sellPriceText, createFontStyle("blue"))
          .setInteractive()
          .setName("sellBtn")
          .setBackgroundColor("green")
          .setOrigin(0.5)
      ])

    scene.add.existing(this)
  }

  openTween() {
    this.scene.add.tween({
      targets: this,
      duration: 200,
      scale: 1,
      y: HALF_HEIGHT
    })
  }

  closeTween() {
    this.scene.add.tween({
      targets: this,
      duration: 200,
      scale: 0,
      y: HEIGHT,
      onComplete: () => this.destroy()
    })
  }
}
