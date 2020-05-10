import { WeaponName } from "../../types/weapon";
import { Weapon } from "./weapon";

// TODO
export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update() {
    this.attack()
  }

  private attack() {
    this.children.iterate((w: any) => {
      w.attack()
    })
  }

  make(x: number, y: number, name: WeaponName) {
    this.add(new Weapon(this.scene, x, y, name))
  }
}
