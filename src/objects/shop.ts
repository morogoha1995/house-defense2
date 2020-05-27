import weaponDatas from "../datas/weapon.json"
import { WeaponName } from "../types/weapon"
import { WIDTH, HEIGHT } from "../constants"
import { createFontStyle } from "../utils/text"

export class Shop {
  private gold = 50
  private goldText: Phaser.GameObjects.Text
  weapons: { [key: string]: Phaser.GameObjects.Container } = {}

  constructor(scene: Phaser.Scene) {
    // create boxes
    const maxCol = 5
    const addX = WIDTH / maxCol
    const addY = 26
    const baseX = addX / 2
    let x = baseX
    let y = HEIGHT - 20
    let col = 0

    this.goldText = scene.add.text(16, y - 45, `所持金: ${this.gold}G`, createFontStyle("orange", 18))
      .setDepth(30)

    const wds: any = weaponDatas
    for (let key in wds) {
      col++
      const wd = wds[key]

      this.weapons[key] = scene.add.container(x, y,
        [
          scene.add.circle(0, 5, 20, 0xFFFFFF, 1),

          scene.add.image(0, -5, key).setDisplaySize(24, 24)
          ,

          scene.add.text(0, 5, `${wd.price}G`, createFontStyle("black", 14, false))
            .setOrigin(0.5, 0)
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

  getGold(): number {
    return this.gold
  }

  addGold(gold: number) {
    this.gold += gold
    this.changeGoldText()
  }

  private changeGoldText() {
    this.goldText.setText(`所持金: ${this.gold}G`)
  }

  minusGold(value: number) {
    this.gold -= value
    this.changeGoldText()
  }

  canBuy(name: WeaponName): boolean {
    const wd = weaponDatas[name]
    return this.gold >= wd.price
  }
}
