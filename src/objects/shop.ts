import WeaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"

// TODO
export class Shop {
  weaponDatas = WeaponDatas

  constructor(scene: Phaser.Scene) {
    for (let weaponData in this.weaponDatas) {

    }
  }

  buy(scene: Phaser.Scene, name: WeaponName) {
    const weaponData = this.weaponDatas[name]

    //scene.add.sprite()

  }
}
