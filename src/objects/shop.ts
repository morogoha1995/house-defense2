import weaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"
import { WIDTH, HEIGHT } from "../constants"

// TODO
export class Shop {
  private gold = 500
  private goldText: Phaser.GameObjects.Text
  weapons: { [key: string]: Phaser.GameObjects.Container } = {}

  constructor(scene: Phaser.Scene) {
    // create boxes
    const baseX = 6
    let x = baseX
    let y = HEIGHT - 39
    let col = 0
    const addX = WIDTH / 3
    const addY = 26
    const maxCol = 3

    col++
    this.goldText = scene.add.text(x, y, `${this.gold}`)
    x += addX

    const wds: any = weaponDatas
    for (let key in wds) {
      col++
      const wd = wds[key]

      this.weapons[key] = scene.add.container(x, y,
        [
          scene.add.text(35, 0, `${wd.price}G`)
          ,
          scene.add.image(16, 0, key).setDisplaySize(24, 24)
        ]
      )
        .setSize(addX, addY)
        .setInteractive()

      if (col === maxCol) {
        x = baseX
        y += addY
        col = 0
      } else
        x += addX
    }
  }

  addGold(gold: number) {
    this.gold += gold
  }

  private changeGoldText() {
    this.goldText.setText(`${this.gold}`)
  }

  private getWeaponPrice(name: WeaponName): number {
    const wd = weaponDatas[name]
    return wd.price
  }

  putWeapon(name: WeaponName) {
    this.gold -= this.getWeaponPrice(name)
    this.changeGoldText()
  }

  canBuy(name: WeaponName): boolean {
    return this.gold >= this.getWeaponPrice(name)
  }
}
