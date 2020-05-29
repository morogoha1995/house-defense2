export const createFontStyle = (color: string, fontSize = 24, isStroke = true) => {
  const fontStyle: any = {
    color: color,
    fontFamily: "Meiryo",
    fontSize: `${fontSize}px`,
    fontStyle: "bold"
  }

  if (isStroke) {
    fontStyle.stroke = "white"
    fontStyle.strokeThickness = 6
  }

  return fontStyle
}
