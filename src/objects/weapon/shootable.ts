import shootableDatas from "../../datas/shootable.json"
import { Weapon } from "./weapon"
import { ShootableName, BulletConfig } from "../../types/weapon"
import { Enemy } from "../enemy"

// TODO
export class Shootable extends Weapon {
  private interval: number
  private nextAttack: number
  private bullet: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, x: number, y: number, name: ShootableName) {
    super(scene, x, y, name)

    const sd = shootableDatas[name]
    this.interval = sd.interval
    this.nextAttack = scene.time.now
    this.bullet = scene.add.image(x, y, `${name}Bullet`)
      .setVisible(false)
      .setOrigin(0.5, 0)
  }

  update(e: Enemy) {
    if (this.canAttack(e))
      this.attack(e)
  }


  // TODO
  attack(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const bullet = this.bullet
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90
    bullet.setPosition(x, y).setAngle(deg).setAlpha(1).setVisible(true)

    e.damaged(this.atk)

    const animationTime = this.interval / 3
    this.scene.add.tween({
      targets: bullet,
      delay: animationTime,
      alpha: 0,
      duration: animationTime,
      onComplete: () => bullet.setVisible(false)
    })

    this.nextAttack = this.scene.time.now + this.interval
  }

  private canAttack(e: Enemy): boolean {
    return this.scene.time.now > this.nextAttack && this.isInRange(e)
  }
}
