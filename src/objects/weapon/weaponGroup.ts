import { EnemyGroup } from "../enemyGroup"

export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update(eg: EnemyGroup) {
    this.children.iterate((w: any) => {
      w.update(eg)
    })
  }
}
