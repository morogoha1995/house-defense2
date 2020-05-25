import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName, ExplosiveName } from "../types/weapon"
import { WeaponGroup } from "../objects/weapon/weaponGroup"
import { Shootable } from "../objects/weapon/shootable"
import { SelectedWeapon } from "../objects/weapon/selectedWeapon"
import { Explosive } from "../objects/weapon/explosive"
import { Extensive } from "../objects/weapon/extensive"

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
    this.field = new Field(this)
    this.weaponGroup = new WeaponGroup(this)
    this.selectedWeapon = new SelectedWeapon(this)
    this.field.bg
      .on("pointermove", (e: any) => this.moveSelectedWeapon(e.x, e.y))
      .on("pointerdown", (e: any) => this.putWeapon(e.x, e.y))

    this.shop = new Shop(this)

    for (const key in this.shop.weapons) {
      const name = <WeaponName>key
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name))
    }

    this.isPlaying = true
  }

  update() {
    if (!this.isPlaying)
      return

    this.checkEnemyDeath()
    this.checkWave()

    this.wave.update(this.time.now, this.field.route)
    this.weaponGroup.update(this.wave.enemyGroup)
  }

  private checkWave() {
    if (this.wave.isToNext())
      this.wave.goToNext(this)
  }

  private checkEnemyDeath() {
    const gold = this.wave.enemyGroup.checkDeath()
    if (gold > 0)
      this.shop.addGold(gold)
  }

  private moveSelectedWeapon(x: number, y: number) {
    if (!this.selectedWeapon.getIsSelected())
      return

    this.selectedWeapon.setPosition(x, y)
    const sw: any = this.selectedWeapon.getWeapon()

    if (!sw)
      return


    this.selectedWeapon.setIsOverlap("toWeapon", this.physics.overlap(sw, this.weaponGroup))

    const tiles = this.field.layer.getTilesWithinWorldXY(Math.floor(sw.body.left), Math.floor(sw.body.top), sw.body.width, sw.body.height)
    let isOverlapToRoute = false
    for (const t of tiles) {
      isOverlapToRoute = t.index === 2 || t.index === 1
      if (isOverlapToRoute)
        break
    }

    this.selectedWeapon.setIsOverlap("toRoute", isOverlapToRoute)

    const alpha = this.selectedWeapon.getIsOverlap() ? 0.3 : 1
    this.selectedWeapon.setAlpha(alpha)
  }

  private buyWeapon(name: WeaponName) {
    if (this.shop.canBuy(name))
      this.selectedWeapon.select(name)
  }

  private putWeapon(x: number, y: number) {
    if (!this.selectedWeapon.getIsSelected())
      return

    this.selectedWeapon.rm()
    if (this.selectedWeapon.getIsOverlap())
      return



    const name = <WeaponName>this.selectedWeapon.name

    let weapon: Explosive | Extensive | Shootable

    if (name === "rocket")
      weapon = new Explosive(this, x, y, name)
    else if (name === "flame")
      weapon = new Extensive(this, x, y, name)
    else
      weapon = new Shootable(this, x, y, name)

    weapon.on("pointerdown", () => {
      const infoWindow = weapon.createInfoWindow()
      infoWindow.openTween()

      infoWindow.getByName("upgradeBtn")
        .on("pointerdown", () => {
          if (infoWindow.inAnims)
            return

          if (weapon.canUpgrade(this.shop.getGold())) {
            infoWindow.upgradeTween()
            this.shop.minusGold(weapon.calcPrice())
            weapon.upgrade()
          } else
            infoWindow.textTween("ゴールドが足りません")
        })

      infoWindow.getByName("sellBtn")
        .on("pointerdown", () => {
          if (infoWindow.inAnims)
            return

          this.shop.addGold(weapon.calcSellPrice())
          weapon.destroy()

          infoWindow.sellTween()
        })
    })

    this.weaponGroup.add(weapon)
    this.shop.minusGold(weapon.getPrice())
  }
}

export {
  Game
}
