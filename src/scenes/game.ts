import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName } from "../types/weapon"

class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private isPlaying = false
  private shop!: Shop
  private selectedWeapon: Phaser.GameObjects.Container | null = null


  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
  }

  create() {
    this.wave = new Wave(this)
    this.shop = new Shop(this)
    this.field = new Field(this)

    this.field.bg.on("pointermove", (e: any) => this.moveSelectedWeapon(e.x, e.y))

    for (const key in this.shop.weapons) {
      const name = key as WeaponName
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name, e.x, e.y))
    }


    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
  }

  moveSelectedWeapon(x: number, y: number) {
    if (this.selectedWeapon)
      this.selectedWeapon.setPosition(x, y)
  }

  buyWeapon(name: WeaponName, x: number, y: number) {
    if (this.selectedWeapon) {
      this.selectedWeapon.setActive(false)
      this.selectedWeapon.setVisible(false)
      this.selectedWeapon = null
    }

    this.selectedWeapon = this.shop.buy(this, name, x, y)
  }
}

export {
  Game
}
