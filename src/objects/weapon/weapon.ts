import WeaponDatas from "../../datas/weapon.json"
import { WeaponName } from "../../types/weapon"
import { Enemy } from "../enemy"

export class Weapon extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body
  protected enName: string
  protected jaName: string
  protected atk: number
  protected price: number
  protected range: Phaser.GameObjects.Arc
  protected bullet: Phaser.GameObjects.Image
  protected interval: number
  protected nextAttack: number

  constructor(scene: Phaser.Scene, x: number, y: number, name: WeaponName) {
    super(scene, x, y, name)

    const wd = WeaponDatas[name]

    this.enName = name
    this.jaName = wd.ja_name
    this.setDisplaySize(wd.size, wd.size)
    this.atk = wd.atk
    this.price = wd.price
    this.range = scene.add.circle(x, y, wd.range)
    this.bullet = scene.add.image(x, y, `${name}Bullet`)
      .setVisible(false)

    this.interval = wd.interval
    this.nextAttack = scene.time.now

    scene.add.existing(this)
    scene.physics.world.enable([this, this.range])
  }

  protected isInRange(e: Enemy): boolean {
    return this.scene.physics.world.overlap(this.range, e)
  }

  getPrice(): number {
    return this.price
  }

  protected calcNextAttack() {
    this.nextAttack = this.scene.time.now + this.interval
  }

  protected canAttack(e: Enemy): boolean {
    return this.scene.time.now > this.nextAttack && this.isInRange(e)
  }
}
