export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene, { runChildUpdate: true })
  }

  update() {
    this.attack()
  }

  private attack() {
    this.children.iterate((w: any) => {
      w.attack()
    })
  }
}
