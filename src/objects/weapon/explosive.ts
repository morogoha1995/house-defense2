import { Weapon } from "./weapon"
import { ExplosiveName } from "../../types/weapon"

export class Explosive extends Weapon {
  constructor(scene: Phaser.Scene, x: number, y: number, name: ExplosiveName) {
    super(scene, x, y, name)
  }


}
