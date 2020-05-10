import shootableDatas from "../../datas/shootable.json"
import { Weapon } from "./weapon"
import { ShootableName } from "../../types/weapon"
import { Bullet } from "./bullet"

// TODO
export class Shootable extends Weapon {
  private interval: number
  private bulletSpeed: number
  private nextAttack: number
  private bullets: Phaser.GameObjects.Group

  constructor(scene: Phaser.Scene, x: number, y: number, name: ShootableName) {
    super(scene, x, y, name)

    const sd = shootableDatas[name]
    this.interval = sd.interval
    this.bulletSpeed = sd.bulletSpeed
    this.nextAttack = scene.time.now

    this.bullets = scene.add.group()
  }

  // TODO
  attack(ePos: Phaser.Math.Vector2) {
    if (!this.canAttack())
      return

    const bullet = new Bullet(this.scene, this.x, this.y, this.enName, { atk: this.atk, speed: this.bulletSpeed })
    this.bullets.add(bullet)

    this.nextAttack += this.interval
  }

  private canAttack(): boolean {
    return this.scene.time.now > this.nextAttack
  }
}
