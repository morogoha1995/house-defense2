import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName, ShootableName } from "../types/weapon"
import { WeaponGroup } from "../objects/weapon/weaponGroup"
import { Shootable } from "../objects/weapon/shootable"

class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private weaponGroup!: WeaponGroup
  private isPlaying = false
  private shop!: Shop
  private selectedWeapon!: Phaser.GameObjects.Container
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
    this.weaponGroup = new WeaponGroup(this)
    this.selectedWeapon = new Phaser.GameObjects.Container(this)

    this.field.bg
      .on("pointermove", (e: any) => this.moveSelectedWeapon(e.x, e.y))
      .on("pointerdown", (e: any) => this.putWeapon(e.x, e.y))

    for (const key in this.shop.weapons) {
      const name = key as WeaponName
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name, e.x, e.y))
    }

    this.physics.add.collider(this.selectedWeapon, this.field.layer, this.overlapWeaponToTile, undefined, this)


    this.isPlaying = true
  }

  update() {
    console.log(this.isOvetlap)
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
  }

  private overlapWeaponToTile(w: any, _: any) {
    this.isOvetlap = true
    w.setAlpha(0.3)
  }

  private moveSelectedWeapon(x: number, y: number) {
    this.isOvetlap = false
    this.selectedWeapon.setPosition(x, y)
  }

  private buyWeapon(name: WeaponName, x: number, y: number) {
    this.selectedWeapon.removeAll(true)

    this.selectedWeapon = this.shop.buy(this, name, x, y)
  }

  private putWeapon(x: number, y: number) {
    this.selectedWeapon.removeAll(true)
    if (this.isOvetlap)
      return

    const name = this.selectedWeapon.name as ShootableName

    let weapon

    /* TODO
    if (name === "flame")
      console.log()
    else if (name === "rocket")
      console.log()
    */

    weapon = new Shootable(this, x, y, name)

    this.weaponGroup.add(weapon)
  }
}

export {
  Game
}
