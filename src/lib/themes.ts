/********************************************
 * Colors                                   *
 ********************************************/
const BASE_COLORS: Colors = {
  cold: {
    900: [192, 100, 32], // hsl(192, 100%, 32%)
  },
  hydration: {
    900: [194, 59, 54], // hsl(194, 59%, 54%)
  },
  oxygen: {
    900: [193, 85, 85], // hsl(193, 85%, 85%)
  },
  nourishment: {
    900: [170, 54, 32], // hsl(170, 54%, 32%)
  },
  rest: {
    900: [150, 56, 85], // hsl(150, 56%, 85%)
  },
  light: {
    900: [1, 97, 63], // hsl(1, 97%, 63%)
  },
  heat: {
    900: [14, 98, 65], // hsl(14, 98%, 65%)
  },
  movement: {
    900: [358, 92, 80], // hsl(358, 92%, 80%)
  },

  restoreCore: {
    900: [198, 92, 24], // hsl(198, 92%, 24%)
  },
  doMore: {
    900: [201, 60, 47], // hsl(201, 60%, 47%)
  },
  blueLight: {
    900: [201, 70, 78], // hsl(201, 70%, 78%)
  },
  quiet: {
    900: [201, 89, 14], // hsl(201, 89%, 14%)
  },
  summit: {
    900: [200, 55, 96], // hsl(200, 55%, 96%)
  },
  grey: {
    900: [199, 15, 51], // hsl(199, 15%, 51%)
  },
  darkerGrey: {
    900: [202, 16, 39], // hsl(202, 16%, 39%)
  },
  blueGrey: {
    900: [201, 29, 66], // hsl(201, 29%, 66%)
  },

  k90: {
    900: [270, 2, 25], // hsl(270, 2%, 25%)
  },

  error: {
    900: [1, 97, 63], // hsl(0, 60%, 50%)
  },

  snackbarRed: {
    900: [0, 100, 85], // hsl(0, 100%, 85%)
  },

  snackbarYellow: {
    900: [31, 100, 85], // hsl(31, 100%, 85%)
  },

  snackbarGreen: {
    900: [110, 100, 85], // hsl(110, 100%, 85%)
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
        colors: DARK_THEME_COLORS,
      }
    default:
      return {
        colors: LIGHT_THEME_COLORS,
      }
  }
}
