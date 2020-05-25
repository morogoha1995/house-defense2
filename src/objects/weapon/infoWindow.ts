import { HALF_WIDTH, HEIGHT, HALF_HEIGHT } from "../../constants"
import { createFontStyle } from "../../utils/text"

export class InfoWindow extends Phaser.GameObjects.Container {
  private isDuringAnims = false

  constructor(scene: Phaser.Scene, nameText: string, priceText: string, sellPriceText: string) {
    super(scene, HALF_WIDTH, HEIGHT)

    const btnY = 40,
      btnFontSize = 16

    this
      .setDepth(20)
      .setScale(0)
      .add([
        scene.add.rectangle(0, 0, 280, 200, 0x404040, 1)
          .setOrigin(0.5),

        scene.add.text(0, -40, nameText, createFontStyle("teal"))
          .setOrigin(0.5),

        scene.add.image(110, -70, "x")
          .setInteractive()
          .on("pointerdown", () => this.closeTween()),

        scene.add.text(-60, btnY, priceText, createFontStyle("red", btnFontSize))
          .setInteractive()
          .setName("upgradeBtn")
          .setBackgroundColor("blue")
          .setPadding(6, 6, 6, 6)
          .setOrigin(0.5),

        scene.add.text(60, btnY, sellPriceText, createFontStyle("blue", btnFontSize))
          .setInteractive()
          .setName("sellBtn")
          .setPadding(6, 6, 6, 6)
          .setBackgroundColor("green")
          .setOrigin(0.5)
      ])

    scene.add.existing(this)
  }

  openTween() {
    if (this.inAnims)
      return

    this.isDuringAnims = true

    this.scene.add.tween({
      targets: this,
      duration: 200,
      scale: 1,
      y: HALF_HEIGHT,
      onComplete: () => this.isDuringAnims = false
    })
  }

  get inAnims() {
    return this.isDuringAnims
  }

  private handTween(x: number, y: number) {
    if (this.inAnims)
      return

    this.isDuringAnims = true

    const hand = this.scene.add.image(x, y, "hand")

    this.add(hand)

    this.scene.add.tween({
      targets: hand,
      duration: 200,
      angle: 90,
      yoyo: true,
      onComplete: () => this.destroyTween()
    })
  }

  upgradeTween() {
    this.handTween(-100, 10)
  }

  sellTween() {
    this.handTween(20, 10)
  }

  textTween(text: string) {
    if (this.inAnims)
      return

    this.isDuringAnims = true

    const t = this.scene.add.text(0, 0, text, createFontStyle("#202020"))
      .setOrigin(0.5)
      .setAngle(-5)

    this.add(t)

    this.scene.add.tween({
      targets: t,
      duration: 200,
      angle: 5,
      yoyo: true,
      onComplete: () => this.destroyTween()
    })
  }

  private closeTween() {
    if (this.inAnims)
      return

    this.isDuringAnims = true

    this.destroyTween()
  }


  private destroyTween() {
    this.scene.add.tween({
      targets: this,
      duration: 200,
      scale: 0,
      y: HEIGHT,
      onComplete: () => this.destroy()
    })
  }
}
