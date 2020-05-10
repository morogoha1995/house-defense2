import { BulletConfig } from "../../types/weapon"

export class Bullet extends Phaser.GameObjects.Sprite {
  private atk: number
  private speed: number

  constructor(scene: Phaser.Scene, x: number, y: number, name: string, config: BulletConfig) {
    super(scene, x, y, `${name}Bullet`)

    this.atk = config.atk
    this.speed = config.speed
  }
}
