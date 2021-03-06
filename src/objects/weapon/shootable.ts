import { Weapon } from "./weapon"
import { ShootableName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"

export class Shootable extends Weapon {
  private ballistic: Phaser.GameObjects.Line

  constructor(scene: Phaser.Scene, x: number, y: number, name: ShootableName) {
    super(scene, x, y, name)

    this.bullet
      .setOrigin(0.5, 0)
      .setScale(2)
    this.ballistic = scene.add.line(0, 0, 0, 0, 0)
      .setVisible(false)
      .setStrokeStyle(1, 0x333333)
  }

  update(eg: EnemyGroup) {
    eg.children.iterate((e: any) => {
      if (this.canAttack(e))
        this.attack(e)
    })
  }


  private attack(e: Enemy) {
    e.damaged(this.atk)

    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90

    const b = this.bullet
    b
      .setPosition(x, y)
      .setAngle(deg)
      .setAlpha(1)
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
