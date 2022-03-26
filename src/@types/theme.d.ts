type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "sub"

type ColorHSL = [number, number, number]
type ColorShade = number
type Colors = Record<string, Record<ColorShade, ColorHSL>>

type ColorValue =
  | string
  | {
      name: string
      shade?: number
      opacity?: number
    }

type FontSizes = Record<Size, string>
type LineHeights = Record<Size, string>

type ThemeObject = {
  colors: Colors
  fontSizes: FontSizes
  lineHeights: LineHeights
}

type ThemeName = "light" | "dark"
