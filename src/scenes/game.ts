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
  private isOvetlap: { [key: string]: boolean } = {
    toWeapon: false,
    toRoute: false,
  }

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
    this.physics.world.enable(this.selectedWeapon)
    this.field.bg
      .on("pointermove", (e: any) => {
        this.moveSelectedWeapon(e.x, e.y)
      })
      .on("pointerdown", (e: any) => this.putWeapon(e.x, e.y))


    for (const key in this.shop.weapons) {
      const name = key as WeaponName
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name, e.x, e.y))
    }

    this.physics.add.overlap(this.selectedWeapon, this.weaponGroup, this.overlapWeapons, undefined, this)

    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
  }

  private overlapWeapons(sw: any, w: any) {
    this.isOvetlap.toWeapon = true
  }

  private moveSelectedWeapon(x: number, y: number) {
    this.isOvetlap.toWeapon = false
    this.selectedWeapon.setPosition(x, y)

    const sw: any = this.selectedWeapon.getByName(this.selectedWeapon.name)

    if (!sw)
      return

    const tile = this.field.layer.getTileAt(Math.floor(sw.body.left / TILE_SIZE), Math.floor(sw.body.bottom / TILE_SIZE))

    const tile2 = this.field.layer.getTileAt(Math.floor(sw.body.right / TILE_SIZE), Math.floor(sw.body.bottom / TILE_SIZE))

    const tile3 = this.field.layer.getTileAt(Math.floor(sw.body.left / TILE_SIZE), Math.floor(sw.body.top / TILE_SIZE))

    const tile4 = this.field.layer.getTileAt(Math.floor(sw.body.right / TILE_SIZE), Math.floor(sw.body.top / TILE_SIZE))

    this.isOvetlap.toRoute = tile.index !== 0 || tile2.index !== 0 || tile3.index !== 0 || tile4.index !== 0

    const alpha = this.isOvetlap.toRoute || this.isOvetlap.toWeapon ? 0.3 : 1
    this.selectedWeapon.setAlpha(alpha)
  }

  private buyWeapon(name: WeaponName, x: number, y: number) {
    this.selectedWeapon.removeAll(true)

    this.selectedWeapon
      .setName(name)
      .add(this.shop.buy(this, name))
      .setPosition(x, y)
      .setSize(TILE_SIZE, TILE_SIZE)
  }

  private putWeapon(x: number, y: number) {
    this.selectedWeapon.removeAll(true)
    if (this.isOvetlap.toWeapon || this.isOvetlap.toRoute)
      return

    const name = this.selectedWeapon.name as ShootableName

    let weapon

    weapon = new Shootable(this, x, y, name)

    this.weaponGroup.add(weapon)
  }
}

export {
  Game
}
