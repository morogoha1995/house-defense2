import { Enemy } from "./enemy"

// TODO
export class EnemyGroup extends Phaser.GameObjects.Group {
  private nextSpawn = 0

  constructor(scene: Phaser.Scene) {
    super(scene)
  }

  update(stage: number, path: Phaser.Curves.Path) {
    this.move(path)

    if (this.scene.time.now > this.nextSpawn)
      this.make(stage)
  }

  private move(path: Phaser.Curves.Path) {
    this.children.iterate((e: any) => {
      e.move(path)
    })
  }

  private make(stage: number) {
    //this.add(new Enemy(this.scene, stage))
  }
}
