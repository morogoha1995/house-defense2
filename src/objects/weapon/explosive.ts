import { Weapon } from "./weapon"
import { ExplosiveName } from "../../types/weapon"
import { EnemyGroup } from "../enemyGroup"
import { Enemy } from "../enemy"

export class Explosive extends Weapon {
  private ballistic: Phaser.GameObjects.Line

  constructor(scene: Phaser.Scene, x: number, y: number, name: ExplosiveName) {
    super(scene, x, y, name)

    this.ballistic = scene.add.line(0, 0, 0, 0, 0)
      .setVisible(false)
      .setStrokeStyle(1, 0x333333)

    scene.physics.world.enable(this.bullet)
  }

  update(eg: EnemyGroup) {
    let isAttack = false

    eg.children.each((e: any) => {
      if (this.canAttack(e)) {
        isAttack = true
        this.attack(e)
      }

      if (isAttack)
        if (this.scene.physics.overlap(this.bullet, e))
          e.damaged(this.atk)
    })
  }

  private attack(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90

    const b = this.bullet
    b
      .setPosition(x, y)
      .setAngle(deg)
      .setAlpha(0.6)
      .setVisible(true)

    const ba = this.ballistic
    ba
      .setTo(this.x, this.y, x, y)
      .setAlpha(0.3)
      .setVisible(true)

    const animationTime = this.interval / 4
    this.scene.add.tween({
      targets: [b, ba],
      delay: animationTime,
      alpha: 0,
      duration: animationTime,
      onComplete: () => {
        b.setVisible(false)
        ba.setVisible(false)
      }
    })

    this.calcNextAttack()
  }
}
