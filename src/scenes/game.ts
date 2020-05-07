import { Field } from "../objects/field"

class Game extends Phaser.Scene {
  private field!: Field
  private isPlaying = false


  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
  }

  create() {
    this.field = new Field(this)
  }

  update() {
    if (!this.isPlaying)
      return
  }
}

export {
  Game
}
