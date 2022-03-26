// Import original module declarations
import "styled-components"

// And extend it
declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors
    fontSizes: FontSizes
    lineHeights: LineHeights
    getColor: (color: ColorValue) => string
  }
}
