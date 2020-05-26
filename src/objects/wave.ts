import { EnemyGroup } from "./enemyGroup"
import { EnemyName } from "../types/enemy"
import { createFontStyle } from "../utils/text"
import { HALF_WIDTH } from "../constants"

export class Wave {
  private current = 1
  private nextSpawn = 0
  private difficulty = 1
  private addPerSpawn = 2000
  private maxSpawnCount = 10
  private spawnCount = 1
  private isStop = false
  enemyGroup: EnemyGroup

  constructor(scene: Phaser.Scene) {
    this.enemyGroup = new EnemyGroup(scene)
  }

  update(time: number, path: Phaser.Curves.Path) {
    if (this.isStop)
      return

    this.spawn(time)
    this.enemyGroup.update(path)
  }

  isToNext(): boolean {
    return this.spawnCount >= this.maxSpawnCount && this.enemyGroup.getLength() <= 0 && !this.isStop
  }

  goToNext(scene: Phaser.Scene) {
    this.isStop = true

    this.current++
    this.nextWaveTextTween(scene)

    scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.isStop = false
        this.spawnCount = 1

        if (this.current % 5 === 0)
          this.upDifficulty()
      }
    })
  }

  private nextWaveTextTween(scene: Phaser.Scene) {
    const text = scene.add.text(280, 120, `${this.current} Wave`, createFontStyle("purple"))
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(30)

    scene.add.tween({
      targets: text,
      duration: 1000,
      x: HALF_WIDTH,
      alpha: 1,
      onComplete: () => scene.add.tween({
        targets: text,
        delay: 500,
        duration: 200,
        alpha: 0,
        onComplete: () => text.destroy()
      })
    })
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
