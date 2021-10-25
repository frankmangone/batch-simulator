import randomstring from "randomstring"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./useStore"
import { add, update, remove, reset } from "../features/compoundsSlice"
import useReactions from "./useReactions"
import { saveToKey } from "../helpers/localStorage"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"
import { STORAGE_KEY } from "../features/compoundsSlice"

/* Types */
import { Compound } from "../types/Compound"

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const compounds = useAppSelector((state) => state.compounds)
  const { resetReactions, removeCompoundFromReactions } = useReactions()

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(compounds, STORAGE_KEY)
  }, [compounds])

  return {
    compounds,

    addCompound: (): void => {
      const newCompound = {
        id: randomstring.generate(8),
        color: COMPOUND_COLORS_CODES[0],
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
