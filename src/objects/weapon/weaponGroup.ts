import { WeaponName } from "../../types/weapon";
import { Weapon } from "./weapon";

// TODO
export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)

    scene.add.existing(this)
  }

  update() {
    this.attack()
  }

  private attack() {
    this.children.iterate((w: any) => {
      w.attack()
    })
  }
}
