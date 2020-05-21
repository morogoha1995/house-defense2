import { Weapon } from "./weapon"
import { ExtensiveName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"

// incomplete
export class Extensive extends Weapon {
  private isInRangeEvenOne = false
  private attackCollision: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene, x: number, y: number, name: ExtensiveName) {
    super(scene, x, y, name)

    this.bullet
      .setAlpha(0.6)
      .setOrigin(0.5, 1)
      .setDepth(5)

    this.attackCollision = scene.add.circle(x, y, 50, 0x000000, 0.5)
    this.attackCollision.setOrigin(0.5, 1)

    scene.physics.world.enable(this.attackCollision)
  }

  update(eg: EnemyGroup) {
    this.isInRangeEvenOne = false

    eg.children.iterate((e: any) => {
      if (!this.isInRangeEvenOne && this.isInRange(e)) {
        this.rotate(e)
        this.isInRangeEvenOne = true

        if (this.isReloaded())
          if (this.scene.physics.overlap(this.attackCollision, e)) {
            console.log("Hited")
            e.damaged(this.atk)
          }
      }
    })

    this.bullet.setVisible(this.isInRangeEvenOne)
  }

  private rotate(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90
    console.log(rad, deg)

    const b = this.bullet
    b.setAngle(deg)

    /*
    const rLeft = this.x - b.width
    const rTop = this.y - b.height
    const rRight = this.x + b.width
    const rBottom = this.y + b.height

    if (newX >= rLeft && newX + this.attackCollision.radius <= rRight)
      this.attackCollision.x = x

    if (newY >= rTop && newY + this.attackCollision.radius <= rBottom)
      this.attackCollision.y = y

      */
  }
}
