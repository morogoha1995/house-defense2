import EnemyDatas from "../datas/enemy.json"
import { EnemyName } from "../types/enemy"


export class Enemy extends Phaser.GameObjects.Sprite {
  private hp: number
  private speed: number
  private gold: number
  private path = {
    t: 0,
    vec: new Phaser.Math.Vector2()
  }

  constructor(scene: Phaser.Scene, name: EnemyName) {
    super(scene, 0, 0, name)

    const enemyData = EnemyDatas[name]

    this.hp = enemyData.hp
    this.speed = enemyData.speed
    this.gold = enemyData.gold

    this.setOrigin(0, 1)

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


  getGold(): number {
    return this.gold
  }
}
