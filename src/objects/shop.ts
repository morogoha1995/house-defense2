import weaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"
import { WIDTH, HEIGHT } from "../constants"

// TODO
export class Shop {
  private gold = 0
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

  addGold(gold: number) {
    this.gold += gold
  }

  // 返り値は購入に成功したかのboolean
  buy(name: WeaponName): boolean {
    const wd = weaponDatas[name]
    const price = wd.price

    if (this.gold >= price) {
      this.gold -= price
      return true
    } else
      return false
  }
}
