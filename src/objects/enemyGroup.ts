import { Enemy } from "./enemy"
import { EnemyName } from "../types/enemy"

export class EnemyGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update(path: Phaser.Curves.Path) {
    this.children.iterate((e: any) => {
      e.move(path)
    })
  }

  checkDeath(): number {
    let gold = 0

    this.children.each((e: any) => {
      if (e.isDead()) {
        e.destroy()
        gold += e.getGold()
      }
    })

    return gold
  }

  spawn(name: EnemyName) {
    this.add(new Enemy(this.scene, name))
  }
}
