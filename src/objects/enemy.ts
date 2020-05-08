import EnemyDatas from "../datas/enemy.json"


export class Enemy extends Phaser.GameObjects.Sprite {
  private hp = 0
  private speed = 0
  private gold = 0
  private path = {
    t: 0,
    vec: new Phaser.Math.Vector2()
  }

  constructor(scene: Phaser.Scene, stage: number, isStrong: boolean) {
    super(scene, 0, 0, "")

    const enemyName = this.determineName(stage, isStrong)
    const enemyDatas: any = EnemyDatas
    const enemyData = enemyDatas[enemyName]

    this.hp = enemyData.hp
    this.speed = enemyData.speed
    this.gold = enemyData.gold

    this
      .setTexture(enemyName)
      .setOrigin(0, 1)

    scene.add.existing(this)
  }

  move(route: Phaser.Curves.Path) {
    this.path.t += this.speed
    route.getPoint(this.path.t, this.path.vec)
    this.setPosition(this.path.vec.x, this.path.vec.y)
  }

  isDead(): boolean {
    return this.hp <= 0 || this.path.t >= 1
  }

  die() {
    this.setActive(false)
    this.setVisible(false)
  }

  private determineName(stage: number, isStrong: boolean): string {
    const enemies = [
      "soldier",
      "ghost",
      "golem",
      "god"
    ]

    let enemyNumber = 0

    if (stage >= 15)
      enemyNumber += 3
    else if (stage >= 10)
      enemyNumber += 2
    else if (stage >= 5)
      enemyNumber += 1

    if (isStrong && enemyNumber < enemies.length)
      enemyNumber++

    return enemies[enemyNumber]
  }

  getGold(): number {
    return this.gold
  }
}
