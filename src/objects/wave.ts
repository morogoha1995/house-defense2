import { EnemyGroup } from "./enemyGroup"
import { EnemyName } from "../types/enemy"

export class Wave {
  private current = 1
  private nextSpawn = 0
  private difficulty = 1
  private addPerSpawn = 2000
  private maxSpawnCount = 10
  private spawnCount = 1
  enemyGroup: EnemyGroup

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

    if (this.current % 5 === 0)
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
    // 上から弱い順。
    const enemyNames: EnemyName[] = [
      "soldier",
      "ghost",
      "golem",
      "god"
    ]

    // enemyNamesからどの名前を取り出すかの値が代入される。
    // 5ウェーブごとに取り出される敵の位が上がる。
    let enemyIndex = Math.floor(this.current / 5)
    // 生成数が3で割り切れる数の場合、1つ上位の敵を生成する
    if (this.spawnCount % 3 === 0)
      enemyIndex++
    // enemyNamesの要素数を超えないように低い方を代入し直す。
    enemyIndex = Math.min(enemyIndex, enemyNames.length)

    return enemyNames[enemyIndex]
  }
}
