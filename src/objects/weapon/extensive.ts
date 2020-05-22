import { Weapon } from "./weapon"
import { ExtensiveName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"

// incomplete
export class Extensive extends Weapon {
  private attackCollision: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene, x: number, y: number, name: ExtensiveName) {
    super(scene, x, y, name)

    this.bullet
      .setAlpha(0.6)
      .setOrigin(0.5, 1)
      .setDepth(5)
      .setDisplaySize(100, 110)

    this.attackCollision = scene.add.circle(x, y, 50)
    this.attackCollision.setOrigin(0.5)

    scene.physics.world.enable(this.attackCollision)
  }

  update(eg: EnemyGroup) {
    let isInRangeEvenOne = false
    let isAttack = false

    eg.children.iterate((e: any) => {
      if (!isInRangeEvenOne && this.isInRange(e)) {
        this.rotate(e)
        isInRangeEvenOne = true
      }

      if (this.canAttack(e))
        if (this.scene.physics.overlap(this.attackCollision, e)) {
          e.damaged(this.atk)
          isAttack = true
        }
    })

    this.bullet.setVisible(isInRangeEvenOne)
    if (isAttack)
      this.calcNextAttack()
  }

  private rotate(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90
    this.bullet.setAngle(deg)

    const d = 60
    const newX = this.x + (Math.cos(rad) * d)
    const newY = this.y + (Math.sin(rad) * d)

    this.attackCollision.setPosition(newX, newY)
  }
}
