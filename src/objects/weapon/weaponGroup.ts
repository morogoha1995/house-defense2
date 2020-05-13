export class WeaponGroup extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene, { runChildUpdate: true })

    scene.add.existing(this)
    scene.physics.world.enable(this)
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
