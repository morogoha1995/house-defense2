import { WeaponName } from "../../types/weapon"
import weaponDatas from "../../datas/weapon.json"

export class SelectedWeapon extends Phaser.GameObjects.Container {
  private isOverlap: { [key: string]: boolean } = {
    toWeapon: false,
    toRoute: false,
  }
  private isSelected = false

  constructor(scene: Phaser.Scene) {
    super(scene)

    scene.add.existing(this)
  }

  getWeapon() {
    return this.getByName(this.name)
  }

  rm() {
    this.removeAll(true)
    this.isSelected = false
  }

  getIsSelected(): boolean {
    return this.isSelected
  }

  select(name: WeaponName, x: number, y: number) {
    this.rm()
    this.isSelected = true

    this.setPosition(x, y)
    const wd = weaponDatas[name]
    this.name = name
    const sw = this.scene.add
      .sprite(0, 0, name)
      .setDisplaySize(wd.size, wd.size)
      .setName(name)

    this.scene.physics.world.enable(sw)

    this.add([
      this.scene.add
        .circle(0, 0, wd.range, 0xffffff, 0.4)
      ,
      sw
    ])
  }

  getIsOverlap(): boolean {
    return this.isOverlap.toRoute || this.isOverlap.toWeapon
  }

  setIsOverlap(key: string, value: boolean) {
    this.isOverlap[key] = value
  }
}
