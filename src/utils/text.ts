export const createFontStyle = (color: string, fontSize = 24) => {
  return {
    color: color,
    stroke: "white",
    fontFamily: "Fira code, Meiryo",
    fontSize: `${fontSize}px`,
    fontStyle: "bold",
    strokeThickness: 6
  }
}
