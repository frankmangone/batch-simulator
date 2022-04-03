import React, { createContext, useContext, useState } from "react"
import { ThemeProvider as SCThemeProvider } from "styled-components"
import { getTheme } from "@lib/themes"
import buildHSLString from "@lib/color/buildHSLString"

interface ContextValues {
  setLightTheme: () => void
  setDarkTheme: () => void
  getColor: (value: ColorValue) => string
  theme: ThemeObject
}

const defaultValue = {
  setLightTheme: () => {},
  setDarkTheme: () => {},
  getColor: (_value: ColorValue) => "",
  theme: {} as ThemeObject,
}

/**
 * Context & Hook
 */
const ThemeContext = createContext(defaultValue)

export const useTheme = (): ContextValues => {
  return useContext(ThemeContext)
}

/**
 * Provider component (for ContextProvider.tsx)
 *
 * The theme context provides both the ability to switch between different themes
 * and the ability to use theme values in styled components through `props.theme`
 * (thanks to styled-components' ThemeProvider)
 */
export const ThemeProvider: React.FC = (props) => {
  const { children } = props
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("light")

  const setLightTheme = () => setCurrentTheme("light")
  const setDarkTheme = () => setCurrentTheme("dark")
  const theme = getTheme(currentTheme)

  /**
   * getColor
   *
   * A helper function to help choose colors in a more concise and understandable manner.
   * It can take one of two values:
   * - A color name i.e. "primary"
   * - An object with keys:
   *  {
   *    name: string
   *    shade?: number
   *    opacity?: string
   *  }
   *
   * @param value
   */
  const getColor = (value: ColorValue): string => {
    if (typeof value !== "string") {
      const { name, shade = 900, opacity = 100 } = value
      const hsl: ColorHSL = theme.colors[name][shade]
      return buildHSLString(hsl, opacity)
    }

    const hsl: ColorHSL = theme.colors[value][900]
    return buildHSLString(hsl, 100)
  }

  const contextValue = {
    setLightTheme,
    setDarkTheme,
    getColor,
    theme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <SCThemeProvider theme={{ ...getTheme(currentTheme), getColor }}>
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  )
}
