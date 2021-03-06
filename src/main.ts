import Phaser from "phaser"
import { Boot } from "./scenes/boot"
import { Game } from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"
import { End } from "./scenes/end"

const determineZoom = (width: number, height: number): number => {
  const zooms = [2, 1.75, 1.5, 1.25]

  for (let zoom of zooms)
    if (width > WIDTH * zoom && height > HEIGHT * zoom)
      return zoom

  return 1
}

window.onload = () => {
  const zoom = determineZoom(window.innerWidth, window.innerHeight)

  new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: 'app',
    zoom: zoom,
    physics: {
      default: "arcade"
    },
    backgroundColor: "#202020",
    scene: [
      Boot,
      Game,
      End
    ]
  })
}
