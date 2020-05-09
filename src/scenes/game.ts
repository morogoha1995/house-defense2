import { Field } from "../objects/field"
import { EnemyGroup } from "../objects/enemyGroup"

class Game extends Phaser.Scene {
  private field!: Field
  private enemies!: EnemyGroup
  private isPlaying = false


  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
  }

  create() {
    this.field = new Field(this)
    this.enemies = new EnemyGroup(this)
    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.enemies.update(this.field.route)
  }
}

export {
  Game
}
