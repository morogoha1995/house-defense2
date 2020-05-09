import { EnemyGroup } from "./enemyGroup"
import { EnemyName } from "../types/enemy"

export class Wave {
  private current = 1
  private nextSpawn = 0
  private difficulty = 1
  private addPerSpawn = 2000
  private maxSpawnCount = 10
  private spawnCount = 1
  private enemyGroup: EnemyGroup

  constructor(scene: Phaser.Scene) {
    this.enemyGroup = new EnemyGroup(scene)
  }

  update(time: number, path: Phaser.Curves.Path) {
    this.spawn(time)
    this.enemyGroup.update(path)
  }

  private goToNext() {
    this.current++
    this.enemyGroup.clear(true, true)

    if (this.current > 5)
      this.upDifficulty()
  }

  private upDifficulty() {
    if (this.difficulty > 5)
      return

    this.difficulty++
    this.addPerSpawn -= 200
    this.maxSpawnCount += 5
  }

  private spawn(time: number) {
    if (this.spawnCount >= this.maxSpawnCount || time <= this.nextSpawn)
      return


    const enemyName = this.determineEnemyName()
    this.enemyGroup.spawn(enemyName)
    this.spawnCount++
    this.nextSpawn = time + this.addPerSpawn
  }

  private determineEnemyName(): EnemyName {
    const isStrong = this.spawnCount % 3 === 0

    const enemyNames: EnemyName[] = [
      "soldier",
      "ghost",
      "golem",
      "god"
    ]

    let enemyIndex = Math.floor(this.current / 5)

    if (isStrong)
      enemyIndex++

    enemyIndex = Math.min(enemyIndex, enemyNames.length)

    return enemyNames[enemyIndex]
  }
}
