import randomstring from "randomstring"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../useStore"
import { add, update, remove, reset } from "@features/compoundsSlice"
import useReactions from "./useReactions"
import { saveToKey } from "@lib/localStorage"
import buildHSLString from "@lib/color/buildHSLString"

/* Constants */
import { STORAGE_KEY } from "@features/compoundsSlice"

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const compounds = useAppSelector((state) => state.compounds)
  const { resetReactions, removeCompoundFromReactions } = useReactions()

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(compounds, STORAGE_KEY)
  }, [compounds])

  /**
   * randomCompoundColor
   *
   * Creates a random compound color to be used
   */
  const randomCompoundColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return buildHSLString([hue, 40, 60], 100)
  }

  /**
   * addCompound
   *
   * Generates a new compound in state
   */
  const addCompound = (): void => {
    const newCompound = {
      id: randomstring.generate(8),
      color: randomCompoundColor(),
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
   * rerollCompoundColor
   *
   * Rerolls the color for component with `id`
   *
   * @param {string} id
   */
  const rerollCompoundColor = (id: string): void => {
    const compound = compounds.find((c) => c.id === id) as Compound
    const updatedCompound = { ...compound }
    updatedCompound.color = randomCompoundColor()
    dispatch(update({ id, compound: updatedCompound }))
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
    randomCompoundColor,
    rerollCompoundColor,
    updateCompound,
    removeCompound,
    removeAllCompounds,
  }
}

export default useCompounds
