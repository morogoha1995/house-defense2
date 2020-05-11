import weaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"
import { WIDTH, HEIGHT } from "../constants"

// TODO
export class Shop {
  weapons: any = {}

  constructor(scene: Phaser.Scene) {
    // create boxes
    let x = 6
    let y = HEIGHT - 6
    let col = 0
    const addX = WIDTH / 3
    const addY = 60
    const maxCol = 3

    console.log(maxCol)

    const wds: any = weaponDatas
    for (const key in wds) {
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

  buy(scene: Phaser.Scene, name: WeaponName, x: number, y: number) {
    const wd = weaponDatas[name]
    const container = scene.add.container(x, y)
    container
      .setName(name)
      .add(
        scene.add
          .circle(0, 0, wd.range, 0xffffff, 0.5)
          .setName("range")
      )
      .add(
        scene.add
          .sprite(0, 0, name)
          .setName(name)
      )

    return container
  }
}
