import EnemyDatas from "../datas/enemy.json"
import { EnemyName } from "../types/enemy"
import { createFontStyle } from "../utils/text"


export class Enemy extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body
  private hp: number
  private speed: number
  private gold: number
  private pathT = 0
  private isDuringHitAnims = false

  constructor(scene: Phaser.Scene, name: EnemyName) {
    super(scene, 0, 0, name)

    const enemyData = EnemyDatas[name]

    this.hp = enemyData.hp
    this.speed = enemyData.speed
    this.gold = enemyData.gold


    this.setOrigin(0.5)
      .setVisible(false)

    scene.add.existing(this)
    scene.physics.world.enable(this)
  }

  move(route: Phaser.Curves.Path) {
    this.pathT += this.speed
    const vec = route.getPoint(this.pathT)
    if (vec)
      this.setPosition(vec.x, vec.y)

    if (!this.visible && this.y <= 352)
      this.setVisible(true)
  }

  damaged(atk: number) {
    this.hp -= atk
    this.damagedAnims()
  }

  private damagedAnims() {
    if (this.isDuringHitAnims || this.isDead())
      return

    this.isDuringHitAnims = true

    this.scene.add.tween({
      targets: this,
      scale: 0.8,
      duration: 60,
      yoyo: true,
      onComplete: () => this.isDuringHitAnims = false
    })
  }

  isDead(): boolean {
    return this.hp <= 0 || this.pathT >= 1
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
      x: this.x + 15,
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
