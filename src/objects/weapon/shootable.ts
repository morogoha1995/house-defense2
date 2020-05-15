import shootableDatas from "../../datas/shootable.json"
import { Weapon } from "./weapon"
import { ShootableName, BulletConfig } from "../../types/weapon"
import { Enemy } from "../enemy"

// TODO
export class Shootable extends Weapon {
  private interval: number
  private nextAttack: number

  constructor(scene: Phaser.Scene, x: number, y: number, name: ShootableName) {
    super(scene, x, y, name)

    const sd = shootableDatas[name]
    this.interval = sd.interval
    this.nextAttack = scene.time.now
  }

  update(e: Enemy) {
    if (this.canAttack(e))
      this.attack(e)
  }


  // TODO
  attack(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const bullet = this.scene.add.sprite(x, y, `${this.enName}Bullet`)
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    bullet.setAngle(Phaser.Math.RadToDeg(rad))

    e.damaged(this.atk)

    this.scene.time.addEvent({ delay: this.interval, callback: () => bullet.destroy() })

    this.nextAttack = this.scene.time.now + this.interval
  }

  private canAttack(e: Enemy): boolean {
    return this.scene.time.now > this.nextAttack && this.isInRange(e)
  }
}
