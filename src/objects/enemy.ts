import EnemyDatas from "../datas/enemy.json"
import { EnemyName } from "../types/enemy"
import { createFontStyle } from "../utils/text"


export class Enemy extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body
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

    scene.add.existing(this)
    scene.physics.world.enable(this)
  }

  move(route: Phaser.Curves.Path) {
    this.path.t += this.speed
    route.getPoint(this.path.t, this.path.vec)
    this.setPosition(this.path.vec.x, this.path.vec.y)
  }

  damaged(atk: number) {
    this.hp -= atk
  }

  isDead(): boolean {
    return this.hp <= 0 || this.path.t >= 1
  }

  private getGold(): number {
    return this.gold
  }

  die(): number {
    this.deathAnim()

    return this.getGold()
  }

  private deathAnim() {
    const goldText = this.scene.add.text(this.x, this.y, `+ ${this.gold}G`, createFontStyle("orange"))
      .setScale(0)
      .setOrigin(0.5)

    this.scene.add.tween({
      targets: this,
      angle: 40,
      y: this.y + 10,
      x: this.x + 10,
      alpha: 0,
      duration: 500
    })

    this.scene.add.tween({
      targets: goldText,
      scale: 1,
      y: this.y - 30,
      duration: 400,
      yoyo: true,
      onComplete: () => {
        this.destroy()
        goldText.destroy()
      }
    })
  }
}
