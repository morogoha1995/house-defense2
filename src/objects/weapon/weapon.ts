import WeaponDatas from "../../datas/weapon.json"
import { WeaponName } from "../../types/weapon"

export class Weapon extends Phaser.GameObjects.Sprite {
  protected enName = ""
  protected jaName = ""
  protected size = 0
  protected atk = 0
  protected price = 0
  protected range: number

  constructor(scene: Phaser.Scene, x: number, y: number, name: WeaponName) {
    super(scene, x, y, name)

    const wd = WeaponDatas[name]

    this.enName = wd.en_name
    this.jaName = wd.ja_name
    this.size = wd.size
    this.atk = wd.atk
    this.price = wd.price
    this.range = wd.range
  }

  update() {

  }
}
