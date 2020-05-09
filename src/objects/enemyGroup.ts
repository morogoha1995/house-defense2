import { Enemy } from "./enemy"
import { EnemyName } from "../types/enemy"

export class EnemyGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update(path: Phaser.Curves.Path) {
    this.move(path)
  }

  private move(path: Phaser.Curves.Path) {
    this.children.iterate((e: any) => {
      e.move(path)

      if (e.isDead())
        e.die()
    })
  }

  spawn(name: EnemyName) {
    this.add(new Enemy(this.scene, name))
  }
}
