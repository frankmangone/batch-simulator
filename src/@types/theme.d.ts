type ColorHSL = [number, number, number]
type ColorShade = number
type Colors = Record<string, Record<ColorShade, ColorHSL>>

type ThemeObject = {
  colors: Colors
}

type ThemeName = "light" | "dark"
