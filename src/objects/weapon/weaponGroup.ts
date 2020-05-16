import { EnemyGroup } from "../enemyGroup"

export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update(eg: EnemyGroup) {
    eg.children.iterate((e: any) => {
      this.children.iterate((w: any) => {
        w.update(e)
      })
    })
  }
}
