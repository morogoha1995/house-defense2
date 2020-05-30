import { TitleContainer } from "../objects/titleContainer"

export class End extends Phaser.Scene {
  private wave = 0
  private isMute = false

  constructor() {
    super({ key: "end" })
  }

  init(data: any) {
    this.wave = data.wave || 0
    this.isMute = data.isMute || false
  }

  create() {
    this.sound.play("death")

    this.createEndWindow()
  }

  private createEndWindow() {
    const endWindow = new TitleContainer(this, "陥落...", "crimson", this.sound.mute)

    endWindow.addStartBtn("もう一回")
      .on("pointerdown", () => {
        this.sound.mute = endWindow.getIsMute()
        this.sound.play("start")

        this.add.tween({
          targets: endWindow,
          duration: 500,
          alpha: 0,
          onComplete: () => this.scene.start("game", {
            isPlaying: true,
            isMute: endWindow.getIsMute()
          })
        })
      })

    endWindow.addTweetBtn()
      .on("pointerdown", () => this.tweet())
  }

  private tweet() {
    const url = "https://meisoudev.com/games/house-defense2/"
    const text = `Wave ${this.wave}にて陥落。`

    const tweetURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=家防衛2`

    window.open(tweetURL, "blank")
  }
}
