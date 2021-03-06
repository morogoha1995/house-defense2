import { Field } from "../objects/field"
import { Wave } from "../objects/wave"
import { Shop } from "../objects/shop"
import { WeaponName } from "../types/weapon"
import { WeaponGroup } from "../objects/weapon/weaponGroup"
import { Shootable } from "../objects/weapon/shootable"
import { SelectedWeapon } from "../objects/weapon/selectedWeapon"
import { Explosive } from "../objects/weapon/explosive"
import { Extensive } from "../objects/weapon/extensive"
import { InfoWindow } from "../objects/weapon/infoWindow"
import { TitleContainer } from "../objects/titleContainer"

export class Game extends Phaser.Scene {
  private field!: Field
  private wave!: Wave
  private weaponGroup!: WeaponGroup
  private isPlaying = false
  private shop!: Shop
  private selectedWeapon!: SelectedWeapon
  private infoWindow!: InfoWindow

  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isPlaying = data.isPlaying || false
    this.sound.mute = data.isMute || false
  }

  create() {
    this.wave = new Wave(this)
    this.field = new Field(this)
    this.weaponGroup = new WeaponGroup(this)
    this.selectedWeapon = new SelectedWeapon(this)
    this.shop = new Shop(this)
    this.infoWindow = new InfoWindow(this)

    if (!this.isPlaying)
      this.createStartWindow()
    else
      this.addEvents()
  }

  update() {
    if (!this.isPlaying)
      return

    this.wave.update(this.time.now, this.field.route)
    this.weaponGroup.update(this.wave.enemyGroup)

    this.checkEnemyDeath()
    this.checkWave()
    this.checkGameover()
  }

  private createStartWindow() {
    const startWindow = new TitleContainer(this, "家防衛2", "teal", this.sound.mute)

    startWindow.addStartBtn("スタート")
      .on("pointerdown", () => {
        this.sound.mute = startWindow.getIsMute()
        this.sound.play("start")

        this.add.tween({
          targets: startWindow,
          duration: 500,
          alpha: 0,
          onComplete: () => {
            this.isPlaying = true
            this.addEvents()
            startWindow.destroy()
          }
        })
      })
  }

  private addEvents() {
    this.field.bg
      .on("pointermove", (e: any) => this.moveSelectedWeapon(e.x, e.y))
      .on("pointerdown", (e: any) => this.putWeapon(e.x, e.y))

    for (const key in this.shop.weapons) {
      const name = <WeaponName>key
      this.shop.weapons[name].on("pointerdown", (e: any) => this.buyWeapon(name, e.x, e.y))
    }
  }

  private checkWave() {
    if (this.wave.isToNext())
      this.wave.goToNext(this)
  }

  private checkGameover() {
    if (this.wave.enemyGroup.checkGameover()) {
      this.scene.pause()
      this.scene.launch("end", {
        isMute: this.sound.mute,
        wave: this.wave.getCurrent()
      })
    }
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

  private buyWeapon(name: WeaponName, x: number, y: number) {
    if (this.shop.canBuy(name))
      this.selectedWeapon.select(name, x, y)
  }

  private putWeapon(x: number, y: number) {
    if (!this.selectedWeapon.getIsSelected())
      return

    this.selectedWeapon.rm()
    if (this.selectedWeapon.getIsOverlap())
      return

    this.sound.play("buy")

    const name = <WeaponName>this.selectedWeapon.name

    let weapon: Explosive | Extensive | Shootable

    if (name === "rocket")
      weapon = new Explosive(this, x, y, name)
    else if (name === "flame")
      weapon = new Extensive(this, x, y, name)
    else
      weapon = new Shootable(this, x, y, name)

    // Added Events
    weapon.on("pointerdown", () => {
      if (this.infoWindow.inOpen)
        return

      this.infoWindow.setInfo(
        weapon.x,
        weapon.y,
        weapon.getInfoName(),
        weapon.calcPrice(),
        weapon.calcSellPrice()
      )
      this.infoWindow.tween("open")

      this.infoWindow.upgradeBtn
        .on("pointerdown", () => {
          if (this.infoWindow.inAnims)
            return

          if (weapon.canUpgrade(this.shop.getGold())) {
            this.infoWindow.tween("upgrade")
            this.shop.minusGold(weapon.calcPrice())
            weapon.upgrade()
          } else
            this.infoWindow.tween("notEnoughGold")
        })

      this.infoWindow.sellBtn
        .on("pointerdown", () => {
          if (this.infoWindow.inAnims)
            return

          this.shop.addGold(weapon.calcSellPrice())
          weapon.destroy()
          this.infoWindow.tween("sell")
        })
    })

    this.weaponGroup.add(weapon)
    this.shop.minusGold(weapon.getPrice())
  }
}
