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

  /**
   * addCompound
   *
   * Generates a new compound in state
   */
  const addCompound = (): void => {
    const newCompound = {
      id: randomstring.generate(8),
      color: unusedColor(),
      concentration: 0,
      molecularWeight: 0,
      symbol: "A",
      name: "",
    }
    dispatch(add(newCompound))
  }

  /**
   * findCompound
   *
   * Finds a compound by its id and returns it - or undefined if the search yields no results
   *
   * @param {string} id
   * @returns Compound | undefined
   */
  const findCompound = (id?: string): Compound | undefined => {
    return compounds.find((c) => c.id === id)
  }

  /**
   * updateCompound
   *
   * Updates target compound with `id`, with the new values specified in `updatedCompound`
   *
   * @param {string} id
   * @param {Compound} updatedCompound
   */
  const updateCompound = (id: string, updatedCompound: Compound): void => {
    dispatch(update({ id, compound: updatedCompound }))
  }

  /**
   * removeCompound
   *
   * Removes compound with `id`. Also removes the compound from every reaction that contains it.
   *
   * @param {string} id
   */
  const removeCompound = (id: string): void => {
    removeCompoundFromReactions(id)
    dispatch(remove({ id }))
  }

  /**
   * removeAllCompounds
   *
   * Removes all compounds from state. This also needs to clear all reactions.
   */
  const removeAllCompounds = (): void => {
    resetReactions()
    dispatch(reset())
  }

  return {
    compounds,
    addCompound,
    findCompound,
    updateCompound,
    removeCompound,
    removeAllCompounds,
  }
}

export default useCompounds
