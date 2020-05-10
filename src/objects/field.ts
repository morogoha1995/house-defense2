import { TILE_SIZE, WIDTH } from "../constants"

class Field {
  route: Phaser.Curves.Path
  private map = {
    path: {
      start: { x: 256, y: 384 },
      to: [
        { x: 256, y: 288 },
        { x: 288, y: 288 },
        { x: 288, y: 192 },
        { x: 192, y: 192 },
        { x: 192, y: 320 },
        { x: 128, y: 320 },
        { x: 128, y: 224 },
        { x: 96, y: 224 },
        { x: 32, y: 224 },
        { x: 32, y: 64 },
        { x: 96, y: 64 },
        { x: 96, y: 96 },
        { x: 256, y: 96 },
        { x: 256, y: 32 },
        { x: 160, y: 32 }
      ]
    },
    tiles: [
      [0, 0, 0, 0, 0, 1, 2, 2, 2, 0],
      [0, 2, 2, 2, 0, 0, 0, 0, 2, 0],
      [0, 2, 0, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 2, 2, 2, 2],
      [0, 2, 2, 2, 2, 0, 2, 0, 0, 2],
      [0, 0, 0, 0, 2, 0, 2, 0, 0, 2],
      [0, 0, 0, 0, 2, 0, 2, 0, 2, 2],
      [0, 0, 0, 0, 2, 2, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    ]
  }
  bg: Phaser.GameObjects.Rectangle

  constructor(scene: Phaser.Scene) {
    // route
    this.route = scene.add.path(this.map.path.start.x, this.map.path.start.y)

    for (let to of this.map.path.to)
      this.route.lineTo(to.x, to.y)

    const map = scene.make.tilemap({ data: this.map.tiles, tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    const tiles = map.addTilesetImage("tileset")
    const layer = map.createStaticLayer(0, tiles, 0, 0)
    layer.setCollision([1])

    this.bg = scene.add
      .rectangle(0, 0, WIDTH, TILE_SIZE * this.map.tiles[0].length, 0x000000, 0)
      .setOrigin(0, 0)
      .setInteractive()
  }
}

export {
  Field
}
