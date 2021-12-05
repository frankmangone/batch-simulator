import randomstring from "randomstring"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./useStore"
import { add, update, remove, reset } from "../features/compoundsSlice"
import useReactions from "./useReactions"
import { saveToKey } from "../lib/localStorage"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"
import { STORAGE_KEY } from "../features/compoundsSlice"

interface UsedColors {
  [key: string]: boolean
}

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const compounds = useAppSelector((state) => state.compounds)
  const { resetReactions, removeCompoundFromReactions } = useReactions()

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(compounds, STORAGE_KEY)
  }, [compounds])

  const unusedColor = () => {
    const colorKeys = COMPOUND_COLORS_CODES

    // Initialize object to keep track of used colors
    let usedColors: UsedColors = {}
    colorKeys.forEach((key: string) => (usedColors[key] = false))

    // Find currently used colors
    compounds.forEach((compound) => (usedColors[compound.color] = true))

    // Find the first unused color
    let k = 0,
      foundColor
    while (k < colorKeys.length && !foundColor) {
      if (!usedColors[colorKeys[k]]) foundColor = colorKeys[k]
      k++
    }

    return foundColor || "blue1"
  }

  return {
    compounds,

    addCompound: (): void => {
      const newCompound = {
        id: randomstring.generate(8),
        color: unusedColor(),
        concentration: 0,
        molecularWeight: 0,
        symbol: "A",
        name: "",
      }
      dispatch(add(newCompound))
    },

    findCompound: (id?: string): Compound | undefined => {
      return compounds.find((c) => c.id === id)
    },

    updateCompound: (id: string, updatedCompound: Compound): void => {
      dispatch(update({ id, compound: updatedCompound }))
    },

    removeCompound: (id: string): void => {
      removeCompoundFromReactions(id)
      dispatch(remove({ id }))
    },

    removeAllCompounds: (): void => {
      resetReactions()
      dispatch(reset())
    },
  }
}

export default useCompounds
