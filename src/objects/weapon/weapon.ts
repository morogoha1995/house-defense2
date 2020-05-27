import WeaponDatas from "../../datas/weapon.json"
import { WeaponName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"
import { WIDTH, HEIGHT, HALF_WIDTH, HALF_HEIGHT } from "../../constants"
import { createFontStyle } from "../../utils/text"
import { InfoWindow } from "./infoWindow"

export class Weapon extends Phaser.GameObjects.Image {
  protected enName: string
  protected jaName: string
  protected atk: number
  protected price: number
  protected range: Phaser.GameObjects.Arc
  protected bullet: Phaser.GameObjects.Image
  protected interval: number
  protected nextAttack: number
  private grade = 0

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
      .setDepth(5)

    this.interval = wd.interval
    this.nextAttack = scene.time.now

    this.setInteractive()

    scene.add.existing(this)
    scene.physics.world.enable([this, this.range])
  }

  protected isInRange(e: Enemy): boolean {
    return e.visible && this.scene.physics.overlap(this.range, e)
  }

  getPrice(): number {
    return this.price
  }

  protected calcNextAttack() {
    this.nextAttack = this.scene.time.now + this.interval
  }

  protected isReloaded(): boolean {
    return this.scene.time.now > this.nextAttack
  }

  protected canAttack(e: Enemy): boolean {
    return this.isReloaded() && this.isInRange(e)
  }

  canUpgrade(gold: number): boolean {
    return this.calcPrice() <= gold
  }

  upgrade() {
    this.grade++
    this.price += this.price
    this.atk += this.atk
  }

  getInfoName(): string {
    return this.grade !== 0 ? `${this.jaName} +${this.grade}` : this.jaName
  }

  calcPrice(): number {
    return this.price * (this.grade + 1)
  }

  calcSellPrice(): number {
    return Math.floor(this.price / 2)
  }
}
