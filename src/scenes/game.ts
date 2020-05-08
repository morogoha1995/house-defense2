import { Field } from "../objects/field"
import { Enemy } from "../objects/enemy"

class Game extends Phaser.Scene {
  private field!: Field
  private enemies!: Phaser.GameObjects.Group
  private nextEnemySpawn = 0
  private isPlaying = false


  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
  }

  create() {
    this.field = new Field(this)
    this.enemies = this.add.group()
    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.updateEnemy()
  }

  private updateEnemy() {
    this.enemies.children.iterate((e: any) => {
      e.move(this.field.route)
    })

    if (this.time.now > this.nextEnemySpawn)
      this.enemies.add(new Enemy(this, 0, false))
  }
}

export {
  Game
}
