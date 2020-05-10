import { Field } from "../objects/field"
import { Wave } from "../objects/wave"

class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private isPlaying = false


  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
  }

  create() {
    this.field = new Field(this)
    this.wave = new Wave(this)
    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
  }
}

export {
  Game
}
