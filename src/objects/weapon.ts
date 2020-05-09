import WeaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"

export class Weapon extends Phaser.GameObjects.Sprite {
  private enName: string
  private jaName: string
  private size: number
  private atk: number
  private price: number
  private range: number
  private interval: number

  constructor(scene: Phaser.Scene, x: number, y: number, name: WeaponName) {
    super(scene, x, y, name)

    const wd = WeaponDatas[name]

    this.enName = wd.en_name
    this.jaName = wd.ja_name
    this.size = wd.size
    this.atk = wd.atk
    this.price = wd.price
    this.atk = wd.atk
    this.price = wd.price
    this.range = wd.range
    this.interval = wd.interval
  }
}
