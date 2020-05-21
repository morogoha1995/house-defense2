import { Weapon } from "./weapon"
import { ExtensiveName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"

export class Extensive extends Weapon {
  constructor(scene: Phaser.Scene, x: number, y: number, name: ExtensiveName) {
    super(scene, x, y, name)

    this.bullet
      .setAlpha(0.6)
      .setOrigin(0.5, 1)
  }

  update(eg: EnemyGroup) {
    let isInRangeEvenOne = false

    eg.children.iterate((e: any) => {
      if (this.canAttack(e))
        this.attack(e)

      if (this.isInRange(e))
        isInRangeEvenOne = true
    })

    this.bullet.setVisible(isInRangeEvenOne)
  }

  private attack(e: Enemy) {
    e.damaged(this.atk)

    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90

    const b = this.bullet
    b
      .setAngle(deg)
      .setDepth(5)

    this.calcNextAttack()
  }
}
