import { Weapon } from "./weapon"
import { ExtensiveName } from "../../types/weapon"

export class Extensive extends Weapon {
  constructor(scene: Phaser.Scene, x: number, y: number, name: ExtensiveName) {
    super(scene, x, y, name)
  }


}
