import shootableDatas from "../../datas/shootable.json"
import { Weapon } from "./weapon"
import { ShootableName, BulletConfig } from "../../types/weapon"
import { Enemy } from "../enemy"

// TODO
export class Shootable extends Weapon {
  private interval: number
  private nextAttack: number
  private bullet: Phaser.GameObjects.Image
  private ballistic: Phaser.GameObjects.Line

  constructor(scene: Phaser.Scene, x: number, y: number, name: ShootableName) {
    super(scene, x, y, name)

    const sd = shootableDatas[name]
    this.interval = sd.interval
    this.nextAttack = scene.time.now
    this.bullet = scene.add.image(x, y, `${name}Bullet`)
      .setVisible(false)
      .setOrigin(0.5, 0)
    this.ballistic = scene.add.line(0, 0, 0, 0, 0)
      .setVisible(false)
      .setStrokeStyle(1, 0x333333)
  }

  update(e: Enemy) {
    if (this.canAttack(e))
      this.attack(e)
  }


  // TODO
  attack(e: Enemy) {
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
      .setDepth(5)

    const ba = this.ballistic
    ba
      .setTo(this.x, this.y, x, y)
      .setAlpha(0.6)
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

    this.nextAttack = this.scene.time.now + this.interval
  }

  private canAttack(e: Enemy): boolean {
    return this.scene.time.now > this.nextAttack && this.isInRange(e)
  }
}
