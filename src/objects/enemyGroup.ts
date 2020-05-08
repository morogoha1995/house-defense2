import { Enemy } from "./enemy"

export class EnemyGroup extends Phaser.GameObjects.Group {
  private nextSpawn = 0
  private spawnCountInTheStage = 0

  constructor(scene: Phaser.Scene) {
    super(scene)

    this.nextSpawn = scene.time.now
  }

  update(wave: number, path: Phaser.Curves.Path) {
    this.move(path)

    if (this.scene.time.now > this.nextSpawn)
      this.spawn(wave)
  }

  private move(path: Phaser.Curves.Path) {
    this.children.iterate((e: any) => {
      e.move(path)

      if (e.isDead())
        e.die()
    })
  }

  private spawn(wave: number) {
    const isStrong = this.spawnCountInTheStage > 5
    this.add(new Enemy(this.scene, wave, isStrong))

    this.spawnCountInTheStage++
    this.nextSpawn = this.nextSpawn + 3000
  }
}
