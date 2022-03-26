/**
 * buildHSLString
 *
 * @param [ColorHSL] hsl
 * @param [number] opacity
 */
const buildHSLString = (hsl: ColorHSL, opacity: number): string => {
  const [hue, saturation, lightness] = hsl
  if (opacity === 100) return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity / 100})`
}

export default buildHSLString
