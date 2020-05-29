import { HALF_WIDTH, HALF_HEIGHT, WIDTH } from "../constants";
import { createFontStyle } from "../utils/text";

export class TitleContainer extends Phaser.GameObjects.Container {
  private isMute = false

  constructor(scene: Phaser.Scene, text: string, color: string) {
    super(scene, HALF_WIDTH, HALF_HEIGHT)

    this
      .add(
        scene.add
          .text(0, -140, text, createFontStyle(color, 36))
          .setOrigin(0.5)
      )
      .setAlpha(0)
    this.addSoundBtn()

    scene.add.existing(this)
    scene.add.tween({
      targets: this,
      duration: 500,
      alpha: 1
    })
  }

  getIsMute(): boolean {
    return this.isMute
  }

  addStartBtn(text: string): Phaser.GameObjects.Text {
    const quarterWidth = HALF_WIDTH / 2
    return this.addBtn(text, -quarterWidth, 0, "teal", "skyblue")
  }

  private addSoundBtn(): Phaser.GameObjects.Text {
    return this.addBtn("音", HALF_WIDTH / 2, 0, "salmon", "lime")
      .on("pointerdown", () => this.isMute = !this.isMute)
  }

  addTweetBtn(): Phaser.GameObjects.Text {
    return this.addBtn("ツイートする", 0, 100, "royalblue", "#00acee")
  }


  private addBtn(text: string, x: number, y: number, color: string, bgColor: string): Phaser.GameObjects.Text {
    const btn = this.scene.add.text(x, y, text, createFontStyle(color))
      .setOrigin(0.5)
      .setPadding(6, 6, 6, 6)
      .setBackgroundColor(bgColor)
      .setInteractive()

    this.add(btn)

    return btn
  }
}
