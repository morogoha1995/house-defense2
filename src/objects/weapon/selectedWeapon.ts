export class SelectedWeapon extends Phaser.GameObjects.Container {
  private isOverlap: { [key: string]: boolean }

  constructor(scene: Phaser.Scene) {
    super(scene)

    this.isOverlap = {
      toWeapon: false,
      toRoute: false,
    }

    scene.physics.world.enable(this)
  }

  getIsOverlap(): boolean {
    return this.isOverlap.toRoute || this.isOverlap.toWeapon
  }

  setIsOverlap(key: string, value: boolean) {
    this.isOverlap[key] = value
  }
}
