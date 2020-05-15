import WeaponDatas from "../../datas/weapon.json"
import { WeaponName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { EnemyGroup } from "../enemyGroup"

export class Weapon extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  protected enName = ""
  protected jaName = ""
  protected size = 0
  protected atk = 0
  protected price = 0
  protected range: Phaser.GameObjects.Zone

  constructor(scene: Phaser.Scene, x: number, y: number, name: WeaponName) {
    super(scene, x, y, name)

    const wd = WeaponDatas[name]

    this.enName = name
    this.jaName = wd.ja_name
    this.setDisplaySize(wd.size, wd.size)
    this.atk = wd.atk
    this.price = wd.price
    this.range = scene.add.zone(x, y, wd.range, wd.range)


    scene.add.existing(this)
    scene.physics.world.enable([this, this.range])
  }

  protected isInRange(e: Enemy): boolean {
    return this.scene.physics.world.overlap(this.range, e)
  }
}
