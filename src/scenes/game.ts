import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName, ShootableName } from "../types/weapon"
import { WeaponGroup } from "../objects/weapon/weaponGroup"
import { Shootable } from "../objects/weapon/shootable"
import { TILE_SIZE } from "../constants"
import { SelectedWeapon } from "../objects/weapon/selectedWeapon"

class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private weaponGroup!: WeaponGroup
  private isPlaying = false
  private shop!: Shop
  private selectedWeapon!: SelectedWeapon

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
    this.selectedWeapon = new SelectedWeapon(this)
    this.field.bg
      .on("pointermove", (e: any) => {
        this.moveSelectedWeapon(e.x, e.y)
      })
      .on("pointerdown", (e: any) => this.putWeapon(e.x, e.y))


    for (const key in this.shop.weapons) {
      const name = key as WeaponName
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name))
    }

    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.selectedWeapon.update()
    this.wave.update(this.time.now, this.field.route)
    this.weaponGroup.update(this.wave.enemyGroup)
  }

  private moveSelectedWeapon(x: number, y: number) {
    this.selectedWeapon.setPosition(x, y)
    const sw: any = this.selectedWeapon.getWeapon()

    if (!sw)
      return


    this.selectedWeapon.setIsOverlap("toWeapon", this.physics.overlap(sw, this.weaponGroup))

    const top = Math.floor(sw.body.top / TILE_SIZE)
    const right = Math.floor(sw.body.right / TILE_SIZE)
    const bottom = Math.floor(sw.body.bottom / TILE_SIZE)
    const left = Math.floor(sw.body.left / TILE_SIZE)

    const tile = this.field.layer.getTileAt(left, bottom)

    const tile2 = this.field.layer.getTileAt(right, bottom)

    const tile3 = this.field.layer.getTileAt(left, top)

    const tile4 = this.field.layer.getTileAt(right, top)

    if (!tile || !tile2 || !tile3 || !tile4)
      return

    const v = tile.index !== 0 || tile2.index !== 0 || tile3.index !== 0 || tile4.index !== 0

    this.selectedWeapon.setIsOverlap("toRoute", v)

    const alpha = this.selectedWeapon.getIsOverlap() ? 0.3 : 1
    this.selectedWeapon.setAlpha(alpha)
  }

  private buyWeapon(name: WeaponName) {
    const price = this.shop.canBuy(name, 100)
    if (price < 0)
      return

    this.selectedWeapon.select(name)
  }

  private putWeapon(x: number, y: number) {
    this.selectedWeapon.removeAll()
    if (this.selectedWeapon.getIsOverlap())
      return

    const name = <ShootableName>this.selectedWeapon.name

    let weapon

    weapon = new Shootable(this, x, y, name)

    this.weaponGroup.add(weapon)
  }
}

export {
  Game
}
