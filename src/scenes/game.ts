import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName } from "../types/weapon"

class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private isPlaying = false
  private shop!: Shop
  private selectedWeapon!: Phaser.GameObjects.Group
  private isOvetlap = false

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
    this.selectedWeapon = this.add.group()

    this.field.bg.on("pointermove", (e: any) => this.moveSelectedWeapon(e.x, e.y))

    for (const key in this.shop.weapons) {
      const name = key as WeaponName
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name, e.x, e.y))
    }

    this.physics.add.overlap(this.selectedWeapon, this.field.layer, () => this.isOvetlap = true, undefined, this)


    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
  }

  moveSelectedWeapon(x: number, y: number) {
    this.isOvetlap = false
    this.selectedWeapon.children.iterate((w: any) => w.setPosition(x, y))
  }

  buyWeapon(name: WeaponName, x: number, y: number) {
    this.selectedWeapon.clear(true, true)

    this.selectedWeapon.add(this.shop.buy(this, name, x, y))
  }
}

export {
  Game
}
