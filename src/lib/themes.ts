/********************************************
 * Font sizes                               *
 ********************************************/
const FONT_SIZES: FontSizes = {
  h1: "48.83px",
  h2: "39.06px",
  h3: "31.25px",
  h4: "25px",
  h5: "20px",
  p: "16px",
  sub: "12.8px",
}

/********************************************
 * Line heights                             *
 ********************************************/
const LINE_HEIGHTS: LineHeights = {
  h1: "61.04px",
  h2: "48.83px",
  h3: "39.06px",
  h4: "31.25px",
  h5: "25px",
  p: "20px",
  sub: "16px",
}

/********************************************
 * Colors                                   *
 ********************************************/
const BASE_COLORS: Colors = {
  baseBlack: {
    900: [213, 20, 8], // hsl(213, 20%, 8%)
    800: [213, 20, 12], // hsl(213, 20%, 12%)
    700: [213, 20, 15], // hsl(213, 20%, 18%)
    600: [213, 20, 25], // hsl(213, 20%, 25%)
    500: [213, 20, 40], // hsl(213, 20%, 40%)
    400: [213, 20, 60], // hsl(213, 20%, 60%)
    300: [213, 20, 70], // hsl(213, 20%, 70%)
    200: [213, 20, 85], // hsl(213, 20%, 85%)
    100: [213, 20, 95], // hsl(213, 20%, 95%)
  },

  info: {
    900: [205, 80, 50], // hsl(205, 80%, 50%)
    800: [205, 80, 60], // hsl(205, 80%, 60%)
  },

  success: {
    900: [194, 80, 60], // hsl(194, 80%, 60%)
    800: [194, 80, 65], // hsl(194, 80%, 65%)
  },

  cancel: {
    900: [4, 80, 60], // hsl(4, 80%, 60%)
    800: [4, 80, 65], // hsl(4, 80%, 65%)
  },
}

const LIGHT_THEME_COLORS: Colors = {
  white: {
    900: [100, 100, 100], // hsl(0, 100%, 100%)
  },
  black: {
    900: [0, 0, 0], // hsl(0, 0%, 0%)
  },
  ...BASE_COLORS,
}

const DARK_THEME_COLORS: Colors = {
  white: {
    900: [0, 0, 0], // hsl(0, 0%, 20%)
  },
  black: {
    900: [0, 100, 100], // hsl(0, 100%, 100%)
  },
  ...BASE_COLORS,
}

/********************************************
 * Theme main function                      *
 ********************************************/
export const getTheme = (name?: ThemeName): ThemeObject => {
  switch (name) {
    case "dark":
      return {
        fontSizes: FONT_SIZES,
        lineHeights: LINE_HEIGHTS,
        colors: DARK_THEME_COLORS,
      }
    default:
      return {
        fontSizes: FONT_SIZES,
        lineHeights: LINE_HEIGHTS,
        colors: LIGHT_THEME_COLORS,
      }
  }
}
