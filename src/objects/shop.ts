import weaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"
import { WIDTH, HEIGHT } from "../constants"

// TODO
export class Shop {
  weapons: { [key: string]: Phaser.GameObjects.Image } = {}

  constructor(scene: Phaser.Scene) {
    // create boxes
    let x = 6
    let y = HEIGHT - 6
    let col = 0
    const addX = WIDTH / 3
    const addY = 60
    const maxCol = 3

    const wds: any = weaponDatas
    for (let key in wds) {
      col++
      const wd = wds[key]
      scene.add.text(x + 35, y, `${wd.price}G`).setOrigin(0, 1)
      this.weapons[key] = scene.add.image(x, y, key)
        .setOrigin(0, 1)
        .setInteractive()

      if (col === maxCol) {
        x = 0
        y += addY
        col = 0
      } else {
        x += addX
      }
    }
  }

  canBuy(name: WeaponName, gold: number): boolean {
    const wd = weaponDatas[name]
    return gold >= wd.price
  }

  buy(scene: Phaser.Scene, name: WeaponName) {
    const wd = weaponDatas[name]

    const w = scene.add
      .sprite(0, 0, name)
      .setName(name)
      .setDisplaySize(wd.size, wd.size)

    scene.physics.world.enable(w)

    return [
      scene.add
        .circle(0, 0, wd.range, 0xffffff, 0.4)
        .setName("range")
      ,
      w
    ]
  }
}
