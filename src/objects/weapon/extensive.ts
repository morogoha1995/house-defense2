import { Weapon } from "./weapon"
import { ExtensiveName } from "../../types/weapon"
import { Enemy } from "../enemy"
import { TILE_SIZE } from "../../constants"

export class Extensive extends Weapon {
  constructor(scene: Phaser.Scene, x: number, y: number, name: ExtensiveName) {
    super(scene, x, y, name)

    this.bullet
      .setAlpha(0.6)
      .setOrigin(0.5, 1)
  }

  update(e: Enemy) {
    if (this.canAttack(e))
      this.attack(e)
  }

  private attack(e: Enemy) {
    const x = e.body.center.x
    const y = e.body.center.y
    const rad = Phaser.Math.Angle.Between(this.x, this.y, x, y)
    const deg = Phaser.Math.RadToDeg(rad) + 90

    const b = this.bullet
    b
      .setAngle(deg)
      .setVisible(true)
      .setDepth(5)

    this.calcNextAttack()
  }
}
