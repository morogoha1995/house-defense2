import { WeaponName } from "../../types/weapon"
import weaponDatas from "../../datas/weapon.json"

export class SelectedWeapon extends Phaser.GameObjects.Container {
  private isOverlap: { [key: string]: boolean } = {
    toWeapon: false,
    toRoute: false,
  }

  constructor(scene: Phaser.Scene) {
    super(scene)

    scene.add.existing(this)
  }

  update() {
    this.initIsOverlap()
  }

  private initIsOverlap() {
    for (const key in this.isOverlap)
      this.isOverlap[key] = false
  }

  getWeapon() {
    return this.getByName(this.name)
  }

  select(name: WeaponName) {
    this.removeAll(true)

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
        .setName("range")
      ,
      sw
    ])
  }

  getIsOverlap(): boolean {
    return this.isOverlap.toRoute || this.isOverlap.toWeapon
  }

  setIsOverlap(key: string, value: boolean) {
    console.log(key, value)
    this.isOverlap[key] = value
  }
}
